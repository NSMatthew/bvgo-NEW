import { Newsletter } from './mergeSort'; 

export function binarySearch(newsletters: Newsletter[], keyword: string): Newsletter | null {
  let start = 0;
  let end = newsletters.length - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const currentTitle = newsletters[mid].title.toLowerCase();
    const target = keyword.toLowerCase();

    if (currentTitle === target) {
      return newsletters[mid];
    } else if (currentTitle < target) {
      start = mid + 1; //pencarian dari setengah newsletter terakhir
    } else {
      end = mid - 1; //pencarian dari setengah newsletter pertama
    }
  }

  return null;
}