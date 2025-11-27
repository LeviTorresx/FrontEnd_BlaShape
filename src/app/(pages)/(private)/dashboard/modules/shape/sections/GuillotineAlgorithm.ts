/**
 * Guillotine Packing avanzado:
 * - bestAreaFit para escoger el mejor espacio
 * - prune + merge de espacios
 * - rotación permitida
 * - kerf aplicado correctamente
 */

import { Item } from "@/app/types/Item";

type Space = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function GuillotineAlgorithm(
  containerWidth: number,
  containerHeight: number,
  itemsIn: Item[],
  kerf = 0,
  relaxation = 5
) {
  type Space = { x: number; y: number; width: number; height: number };

  const sheets: Item[][] = [];
  const wastes: string[] = [];

  let remaining = sortMixed([...itemsIn]);

  while (remaining.length) {
    let spaces: Space[] = [
      { x: 0, y: 0, width: containerWidth, height: containerHeight },
    ];
    const placed: Item[] = [];
    let usedArea = 0;

    const notFit: Item[] = [];

    for (const item of remaining) {
      const iw = item.width + kerf;
      const ih = item.height + kerf;

      // ======= BEST FIT: escoger el mejor espacio por área mínima sobrante =======
      let bestIndex = -1;
      let bestRot = false;
      let bestScore = Infinity;

      for (let i = 0; i < spaces.length; i++) {
        const sp = spaces[i];

        const fitsNormal = iw <= sp.width && ih <= sp.height;
        const fitsRot = ih <= sp.width && iw <= sp.height;

        // ORIENTACIÓN NORMAL
        if (fitsNormal) {
          const score = scoreFit(iw, ih, sp, false);
          if (score < bestScore) {
            bestScore = score;
            bestIndex = i;
            bestRot = false;
          }
        }

        // ORIENTACIÓN ROTADA
        if (fitsRot) {
          const score = scoreFit(ih, iw, sp, true);
          if (score < bestScore) {
            bestScore = score;
            bestIndex = i;
            bestRot = true;
          }
        }
      }

      if (bestIndex === -1) {
        notFit.push(item);
        continue;
      }

      // EVITAR ROTACIÓN INNECESARIA EN PRIMER ESPACIO
      if (bestIndex === 0 && spaces.length === 1) {
        const fitsNormal = iw <= spaces[0].width && ih <= spaces[0].height;
        if (fitsNormal) {
          bestRot = false;
        }
      }

      const chosen = spaces[bestIndex];
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

      // ====== DIVISIÓN MEJORADA ======
      spaces.splice(bestIndex, 1);

      const leftoverH = chosen.height - itemH;
      const leftoverW = chosen.width - itemW;

      let first, second;

      // ESTRATEGIA DE DIVISIÓN MEJORADA - priorizar espacios útiles
      if (itemW > itemH * 1.5) {
        // Pieza muy horizontal - cortar horizontal primero para dejar espacio debajo
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
      } else if (itemH > itemW * 1.5) {
        // Pieza muy vertical - cortar vertical primero
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
        // Pieza cuadrada - decidir por sobrante más útil
        if (leftoverH >= leftoverW) {
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
        } else {
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
        }
      }

      // Insertar espacios si tienen área válida (mínimo 10mm para ser útil)
      const minUsefulSize = 10;
      if (first.width >= minUsefulSize && first.height >= minUsefulSize) spaces.push(first);
      if (second.width >= minUsefulSize && second.height >= minUsefulSize) spaces.push(second);

      // ORDENAR ESPACIOS por posición (Y primero, luego X)
      spaces.sort((a, b) => {
        if (a.y !== b.y) return a.y - b.y;
        return a.x - b.x;
      });

      // Limpieza completa de espacios
      spaces = pruneSpaces(spaces);
      spaces = mergeSpaces(spaces);
    }

    const totalArea = containerWidth * containerHeight;
    const wastePerc = (((totalArea - usedArea) / totalArea) * 100).toFixed(2);

    sheets.push(placed);
    wastes.push(wastePerc);
    remaining = notFit;
  }

  return { sheets, wastes };
}

/* ------------------------------------
   Elimina espacios redundantes:
   Si un espacio está completamente dentro otro, se borra.
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

/* ------------------------------------
   Fusiona espacios que se pueden unificar
   (misma X y ancho adyacente o misma Y y alto adyacente)
------------------------------------ */
function mergeSpaces(spaces: any[]) {
  let merged = true;
  while (merged) {
    merged = false;

    for (let i = 0; i < spaces.length; i++) {
      for (let j = i + 1; j < spaces.length; j++) {
        const a = spaces[i];
        const b = spaces[j];

        // Fusion vertical (uno arriba del otro)
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

        // Fusion horizontal (uno al lado del otro)
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

function scoreFit(itemW: number, itemH: number, sp: Space, isRotated: boolean) {
  const areaLeft = sp.width * sp.height - itemW * itemH;
  
  // Penalizar rotación para piezas horizontales
  const aspectRatio = itemW / itemH;
  let rotationPenalty = 0;
  if (isRotated && aspectRatio > 1.8) {
    rotationPenalty = areaLeft * 0.5; // 50% de penalización para rotar piezas horizontales
  }

  // Penalizar espacios muy angostos
  const leftoverW = sp.width - itemW;
  const leftoverH = sp.height - itemH;
  
  let narrowPenalty = 0;
  if (leftoverW > 0 && leftoverW < 20) narrowPenalty += 1000;
  if (leftoverH > 0 && leftoverH < 20) narrowPenalty += 1000;

  // Penalizar mala relación de aspecto
  const itemRatio = itemW / itemH;
  const spaceRatio = sp.width / sp.height;
  const ratioDiff = Math.abs(itemRatio - spaceRatio);
  const ratioPenalty = ratioDiff * 1000;

  return areaLeft + rotationPenalty + narrowPenalty + ratioPenalty;
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