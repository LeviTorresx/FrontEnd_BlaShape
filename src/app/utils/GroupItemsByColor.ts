import { GroupedItems, Item } from "../types/Item";

export function groupItemsByColor(items: Item[]): GroupedItems[] {
  const map = new Map<string, GroupedItems>();

  for (const item of items) {
    const key = item.color.hex; // agrupación por color

    if (!map.has(key)) {
      map.set(key, {
        key,
        colorHex: item.color.hex,
        colorName: item.color.name || "n/a",
        items: [],
      });
    }

    map.get(key)!.items.push(item);
  }

  return Array.from(map.values());
}