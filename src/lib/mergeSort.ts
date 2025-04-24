export interface Newsletter {
  id: number;
  title: string;
  releaseDate: Date;
}

export type SortBy = 'date' | 'title';

// Fungsi utama
export function mergeSort(
  arr: Newsletter[],
  sortBy: SortBy = 'date'
): Newsletter[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), sortBy);
  const right = mergeSort(arr.slice(mid), sortBy);

  return merge(left, right, sortBy);
}

// Fungsi gabung
function merge(
  left: Newsletter[],
  right: Newsletter[],
  sortBy: SortBy
): Newsletter[] {
  let result: Newsletter[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    let compare;

    if (sortBy === 'date') {
      compare = left[i].releaseDate.getTime() <= right[j].releaseDate.getTime();
    } else {
      compare = left[i].title.localeCompare(right[j].title) <= 0;
    }

    if (compare) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}