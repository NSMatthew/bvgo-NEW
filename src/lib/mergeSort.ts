export interface Newsletter {
  id: number;
  title: string;
  releaseDate: string; 
}

export type SortBy = 'releaseDate' | 'title';
export type SortOrder = 'asc' | 'desc';

export function mergeSort(
  arr: Newsletter[],
  sortBy: SortBy = 'releaseDate',
  sortOrder: SortOrder = 'desc'
): Newsletter[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), sortBy, sortOrder);
  const right = mergeSort(arr.slice(mid), sortBy, sortOrder);

  return merge(left, right, sortBy, sortOrder);
}

// Fungsi untuk menggabungkan kembali
function merge(
  left: Newsletter[],
  right: Newsletter[],
  selectedsortBy: SortBy,
  selectedsortOrder: SortOrder
): Newsletter[] {
  let result: Newsletter[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    let isLeftFirst: boolean;

    if (selectedsortBy === 'releaseDate') {
      const leftTime = new Date(left[i].releaseDate).getTime();
      const rightTime = new Date(right[j].releaseDate).getTime();
      
      if (selectedsortOrder === 'asc') { 
        isLeftFirst = leftTime <= rightTime;
      } else {
        isLeftFirst = leftTime >= rightTime;
      }
    } else { 
      const leftTitle = left[i].title;
      const rightTitle = right[j].title;
      
      if (selectedsortOrder === 'asc') {
        isLeftFirst = leftTitle.localeCompare(rightTitle) <= 0;
      } else {
        isLeftFirst = leftTitle.localeCompare(rightTitle) >= 0;
      }
    }
 
    if (isLeftFirst) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}