import { Newsletter } from './mergeSort'; 

export function binarySearch(newsletters: Newsletter[], keyword: string): Newsletter | null {
  let low = 0;
  let high = newsletters.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const currentTitle = newsletters[mid].title.toLowerCase();
    const target = keyword.toLowerCase();

    if (currentTitle === target) {
      return newsletters[mid];
    } else if (currentTitle < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return null; // Not found
}