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

  const mid = Math.floor(arr.length / 2); //mencari index tengah dari kumpulan newsletter dalam array
  const left = mergeSort(arr.slice(0, mid), sortBy); //mencari dari index 0 sampai index tengah
  const right = mergeSort(arr.slice(mid), sortBy); //mencari dari index tengah sampai akhir

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
    let compare; //hasil pengurutan disimpan disini

    if (sortBy === 'date') {
      compare = left[i].releaseDate.getTime() <= right[j].releaseDate.getTime();
    } else {
      compare = left[i].title.localeCompare(right[j].title) <= 0;
    }

    if (compare) { //membandingkan antara isi dari newsletter yang ada di left dan right
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}