/**
 * Guillotine Packing de dos pasadas MEJORADO:
 * - Elimina rotaciones innecesarias
 * - Prioriza orientación natural
 * - Mejor evaluación de espacios
 */

import { Item } from "@/app/types/Item";

type Space = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function GuillotineAlgorithmTwoPass(
  containerWidth: number,
  containerHeight: number,
  itemsIn: Item[],
  kerf = 0,
  relaxation = 5
) {
  const sheets: Item[][] = [];
  const wastes: string[] = [];

  let remaining = sortMixed([...itemsIn]);

  while (remaining.length) {
    // PRIMERA PASADA - Colocación inicial conservadora
    const firstPassResult = guillotineSinglePass(
      containerWidth,
      containerHeight,
      remaining,
      kerf,
      false // primera pasada
    );

    // SEGUNDA PASADA - Solo si hay piezas colocadas
    let finalPlaced = firstPassResult.placed;
    let finalUsedArea = firstPassResult.usedArea;
    
    if (firstPassResult.placed.length > 1) {
      const secondPassResult = guillotineSinglePass(
        containerWidth,
        containerHeight,
        firstPassResult.placed,
        kerf,
        true // segunda pasada
      );
      
      // Solo aceptamos la segunda pasada si mejora el resultado
      if (secondPassResult.usedArea >= firstPassResult.usedArea) {
        finalPlaced = secondPassResult.placed;
        finalUsedArea = secondPassResult.usedArea;
      }
    }

    const notFit = firstPassResult.notFit.filter(item => 
      !finalPlaced.some(placedItem => placedItem.id === item.id)
    );

    const totalArea = containerWidth * containerHeight;
    const wastePerc = (((totalArea - finalUsedArea) / totalArea) * 100).toFixed(2);

    sheets.push(finalPlaced);
    wastes.push(wastePerc);
    remaining = notFit;
  }

  return { sheets, wastes };
}

function guillotineSinglePass(
  containerWidth: number,
  containerHeight: number,
  items: Item[],
  kerf: number,
  isSecondPass: boolean
): { placed: Item[]; usedArea: number; notFit: Item[] } {
  type Space = { x: number; y: number; width: number; height: number };

  let spaces: Space[] = [
    { x: 0, y: 0, width: containerWidth, height: containerHeight },
  ];
  
  const placed: Item[] = [];
  let usedArea = 0;
  const notFit: Item[] = [];

  // En segunda pasada, reordenamos las piezas para mejor ajuste
  const itemsToProcess = isSecondPass 
    ? reorderForSecondPass([...items])
    : [...items];

  for (const item of itemsToProcess) {
    const iw = item.width + kerf;
    const ih = item.height + kerf;

    // ======= MEJOR SELECCIÓN DE ESPACIOS =======
    let bestIndex = -1;
    let bestRot = false;
    let bestScore = Infinity;

    for (let i = 0; i < spaces.length; i++) {
      const sp = spaces[i];

      const fitsNormal = iw <= sp.width && ih <= sp.height;
      const fitsRot = ih <= sp.width && iw <= sp.height;

      // PRIMERO probar orientación NORMAL (sin rotación)
      if (fitsNormal) {
        const score = scoreFit(iw, ih, sp, false, isSecondPass);
        // BONUS por orientación natural
        const naturalBonus = isSecondPass ? 50 : 100; // Bonus más alto en primera pasada
        const finalScore = score - naturalBonus;
        
        if (finalScore < bestScore) {
          bestScore = finalScore;
          bestIndex = i;
          bestRot = false;
        }
      }

      // LUEGO probar orientación ROTADA (con mayor penalización)
      if (fitsRot) {
        const score = scoreFit(ih, iw, sp, true, isSecondPass);
        // PENALIZACIÓN más alta por rotación
        const rotationPenalty = isSecondPass ? 200 : 150; // Penalización más alta
        const finalScore = score + rotationPenalty;
        
        if (finalScore < bestScore) {
          bestScore = finalScore;
          bestIndex = i;
          bestRot = true;
        }
      }
    }

    if (bestIndex === -1) {
      notFit.push(item);
      continue;
    }

    // EVITAR ROTACIONES INNECESARIAS EN CASOS ESPECÍFICOS
    const chosen = spaces[bestIndex];
    const fitsNormal = iw <= chosen.width && ih <= chosen.height;
    
    if (fitsNormal && bestRot) {
      // Solo rotar si realmente es necesario (mejora significativa)
      const scoreNormal = scoreFit(iw, ih, chosen, false, isSecondPass);
      const scoreRotated = scoreFit(ih, iw, chosen, true, isSecondPass);
      
      // Solo rotar si la mejora es significativa (más del 20%)
      const improvementThreshold = 0.2;
      const improvement = (scoreNormal - scoreRotated) / scoreNormal;
      
      if (improvement < improvementThreshold) {
        bestRot = false; // Mantener orientación natural
      }
    }

    const itemW = bestRot ? item.height : item.width;
    const itemH = bestRot ? item.width : item.height;

    const placedItem: Item = {
      ...item,
      rotated: bestRot,
      x: chosen.x,
      y: chosen.y,
    };

    placed.push(placedItem);
    usedArea += (itemW + kerf) * (itemH + kerf);

    // ====== DIVISIÓN CONSERVADORA ======
    spaces.splice(bestIndex, 1);

    const leftoverH = chosen.height - itemH;
    const leftoverW = chosen.width - itemW;

    let first, second;

    // ESTRATEGIA DE DIVISIÓN SIMPLE Y CONSISTENTE
    if (leftoverW >= leftoverH) {
      // Dividir verticalmente primero (deja espacio ancho)
      first = {
        x: chosen.x + itemW + kerf,
        y: chosen.y,
        width: leftoverW,
        height: chosen.height,
      };
      second = {
        x: chosen.x,
        y: chosen.y + itemH + kerf,
        width: itemW + kerf,
        height: leftoverH,
      };
    } else {
      // Dividir horizontalmente primero (deja espacio alto)
      first = {
        x: chosen.x,
        y: chosen.y + itemH + kerf,
        width: chosen.width,
        height: leftoverH,
      };
      second = {
        x: chosen.x + itemW + kerf,
        y: chosen.y,
        width: leftoverW,
        height: itemH + kerf,
      };
    }

    // Insertar espacios si tienen área válida
    const minUsefulSize = 10;
    if (first.width >= minUsefulSize && first.height >= minUsefulSize) spaces.push(first);
    if (second.width >= minUsefulSize && second.height >= minUsefulSize) spaces.push(second);

    // ORDENAR ESPACIOS (Y primero, luego X)
    spaces.sort((a, b) => {
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });

    // Limpieza de espacios
    spaces = pruneSpaces(spaces);
    spaces = mergeSpaces(spaces);
  }

  return { placed, usedArea, notFit };
}

function reorderForSecondPass(items: Item[]): Item[] {
  // En segunda pasada, priorizar piezas que podrían beneficiarse de reubicación
  return items.sort((a, b) => {
    // Priorizar piezas rotadas (para intentar desrotarlas)
    if ((a as any).rotated !== (b as any).rotated) {
      return (a as any).rotated ? -1 : 1;
    }
    
    // Luego por relación de aspecto
    const ratioA = Math.max(a.width, a.height) / Math.min(a.width, a.height);
    const ratioB = Math.max(b.width, b.height) / Math.min(b.width, b.height);
    
    if (Math.abs(ratioA - ratioB) > 0.3) {
      return ratioB - ratioA;
    }
    
    // Finalmente por área
    return (b.width * b.height) - (a.width * a.height);
  });
}

function scoreFit(itemW: number, itemH: number, sp: Space, isRotated: boolean, isSecondPass: boolean) {
  const areaLeft = sp.width * sp.height - itemW * itemH;
  
  const leftoverW = sp.width - itemW;
  const leftoverH = sp.height - itemH;

  // PENALIZACIONES MÁS FUERTES PARA ROTACIÓN
  let rotationPenalty = 0;
  if (isRotated) {
    // Penalización base por rotación
    rotationPenalty = areaLeft * 0.8; // 80% de penalización
    
    // Penalización adicional para piezas muy horizontales/verticales
    const aspectRatio = itemW / itemH;
    if (aspectRatio > 2.0 || aspectRatio < 0.5) {
      rotationPenalty += areaLeft * 0.5; // Penalización adicional del 50%
    }
  }

  // Penalizar espacios muy angostos
  let narrowPenalty = 0;
  if (leftoverW > 0 && leftoverW < 15) narrowPenalty += 2000;
  if (leftoverH > 0 && leftoverH < 15) narrowPenalty += 2000;

  // Bonus por ajustes que crean espacios útiles
  let usefulSpaceBonus = 0;
  if (leftoverW >= 20 && leftoverH >= 20) usefulSpaceBonus -= 1000; // Bonus por espacio útil
  if (leftoverW === 0 || leftoverH === 0) usefulSpaceBonus -= 500; // Bonus por ajuste perfecto en una dimensión

  // Penalizar mala relación de aspecto
  const itemRatio = itemW / itemH;
  const spaceRatio = sp.width / sp.height;
  const ratioDiff = Math.abs(itemRatio - spaceRatio);
  const ratioPenalty = ratioDiff * 800;

  return areaLeft + rotationPenalty + narrowPenalty + ratioPenalty + usefulSpaceBonus;
}

/* ------------------------------------
   Funciones auxiliares (sin cambios)
------------------------------------ */
function pruneSpaces(spaces: any[]) {
  return spaces.filter((s, i) => {
    return !spaces.some(
      (o, j) =>
        i !== j &&
        s.x >= o.x &&
        s.y >= o.y &&
        s.x + s.width <= o.x + o.width &&
        s.y + s.height <= o.y + o.height
    );
  });
}

function mergeSpaces(spaces: any[]) {
  let merged = true;
  while (merged) {
    merged = false;

    for (let i = 0; i < spaces.length; i++) {
      for (let j = i + 1; j < spaces.length; j++) {
        const a = spaces[i];
        const b = spaces[j];

        if (a.x === b.x && a.width === b.width) {
          if (a.y + a.height === b.y) {
            spaces[i] = {
              x: a.x,
              y: a.y,
              width: a.width,
              height: a.height + b.height,
            };
            spaces.splice(j, 1);
            merged = true;
            break;
          }
          if (b.y + b.height === a.y) {
            spaces[i] = {
              x: b.x,
              y: b.y,
              width: b.width,
              height: a.height + b.height,
            };
            spaces.splice(j, 1);
            merged = true;
            break;
          }
        }

        if (a.y === b.y && a.height === b.height) {
          if (a.x + a.width === b.x) {
            spaces[i] = {
              x: a.x,
              y: a.y,
              width: a.width + b.width,
              height: a.height,
            };
            spaces.splice(j, 1);
            merged = true;
            break;
          }
          if (b.x + b.width === a.x) {
            spaces[i] = {
              x: b.x,
              y: b.y,
              width: a.width + b.width,
              height: a.height,
            };
            spaces.splice(j, 1);
            merged = true;
            break;
          }
        }
      }
      if (merged) break;
    }
  }

  return spaces;
}

const sortMixed = (items: Item[]) => {
  return items.sort((a, b) => {
    const areaA = a.width * a.height;
    const areaB = b.width * b.height;

    if (areaA !== areaB) return areaB - areaA;

    const longA = Math.max(a.width, a.height);
    const longB = Math.max(b.width, b.height);
    if (longA !== longB) return longB - longA;

    return b.height - a.height;
  });
};