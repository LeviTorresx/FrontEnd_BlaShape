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
          const score = scoreFit(iw, ih, sp);
          if (score < bestScore) {
            bestScore = score;
            bestIndex = i;
            bestRot = false;
          }
        }

        // ORIENTACIÓN ROTADA
        if (fitsRot) {
          const score = scoreFit(ih, iw, sp);
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

      if (bestIndex === 0 && spaces.length === 1) {
        // Verificar si cabe sin rotar (como medida de seguridad)
        const fitsNormal =
          item.width + kerf <= spaces[0].width &&
          item.height + kerf <= spaces[0].height;
        if (fitsNormal) {
          bestRot = false; // Forzar no rotación
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

      // ====== División guillotine con prioridad horizontal ======
      spaces.splice(bestIndex, 1);

      // Calculamos sobras horizontales y verticales
      const leftoverH = chosen.height - itemH; // parte inferior
      const leftoverW = chosen.width - itemW; // parte derecha

      let first, second;

      // Decidir si partir horizontal o vertical según qué dejo menos desperdicio
      if (leftoverH <= leftoverW) {
        // Cortar horizontal primero
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
        // Cortar vertical primero
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

      // Insertar espacios si tienen área válida
      if (first.width > 0 && first.height > 0) spaces.push(first);
      if (second.width > 0 && second.height > 0) spaces.push(second);

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

function scoreFit(itemW: number, itemH: number, sp: Space) {
  const areaLeft = sp.width * sp.height - itemW * itemH;

  // Aspect ratio (forma)
  const ir = itemW / itemH;
  const sr = sp.width / sp.height;

  // Penaliza espacios cuya forma no coincide con la forma de la pieza
  const shapePenalty = Math.abs(ir - sr) * 50000;

  return areaLeft + shapePenalty;
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
