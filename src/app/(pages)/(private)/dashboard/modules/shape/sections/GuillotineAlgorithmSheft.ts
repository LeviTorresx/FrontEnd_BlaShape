import { Item } from "@/app/types/Item";

/**
 * Shelf packing (First-Fit Decreasing Height variant)
 * Simpler and often gives decent results for many real sets.
 * kerf applied between items horizontally and vertically.
 */
export function GuillotineAlgorithmSheft(
  containerWidth: number,
  containerHeight: number,
  itemsIn: Item[],
  kerf = 0
) {
  const sheets: Item[][] = [];
  const wastes: string[] = [];

  let remaining = itemsIn
    .map((i) => ({ ...i }))
    .sort((a, b) => b.height - a.height);

  while (remaining.length) {
    const placed: Item[] = [];
    let usedArea = 0;
    let notFit: Item[] = [];

    let yCursor = 0;

    while (remaining.length) {
      // create a new shelf starting at yCursor
      let shelfHeight = 0;
      let xCursor = 0;
      const shelfItems: Item[] = [];

      // iterate copy of remaining to try place on this shelf
      for (let i = 0; i < remaining.length; ) {
        const item = remaining[i];
        const iw = item.width + kerf;
        const ih = item.height + kerf;
        if (iw <= containerWidth - xCursor && yCursor + ih <= containerHeight) {
          // place
          const placedItem: Item = {
            ...item,
            rotated: false,
            x: xCursor,
            y: yCursor,
          };
          shelfItems.push(placedItem);
          placed.push(placedItem);
          usedArea += iw * ih;
          xCursor += iw;
          shelfHeight = Math.max(shelfHeight, ih);
          // remove from remaining
          remaining.splice(i, 1);
        } else {
          i++;
        }
      }

      if (shelfItems.length === 0) {
        // nothing fits in this shelf -> break to avoid infinite loop
        break;
      }

      yCursor += shelfHeight;
      if (yCursor >= containerHeight) break;
    }

    // anything left that didn't fit in this sheet, mark as notFit
    notFit = remaining;
    const totalArea = containerWidth * containerHeight;
    const wastePerc = (((totalArea - usedArea) / totalArea) * 100).toFixed(2);
    sheets.push(placed);
    wastes.push(wastePerc);

    remaining = notFit;
  }

  return { sheets, wastes };
}