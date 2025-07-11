// src/lib/mergesort.ts

// 1. "BLUEPRINT" DATA DISESUAIKAN DENGAN TABEL SUPABASE
// Hanya properti yang ada di tabel 'newsletters' yang kita definisikan.
export interface Newsletter {
  id: number;
  title: string;
  releaseDate: string; // Kolom 'releaseDate' dari Supabase akan menjadi string
}

// 2. TIPE SORTBY DISESUAIKAN DENGAN NAMA KOLOM
export type SortBy = 'releaseDate' | 'title';
export type SortOrder = 'asc' | 'desc';

// Fungsi utama
export function mergeSort(
  arr: Newsletter[],
  sortBy: SortBy = 'releaseDate', // Default diubah agar sesuai
  sortOrder: SortOrder = 'desc'
): Newsletter[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), sortBy, sortOrder);
  const right = mergeSort(arr.slice(mid), sortBy, sortOrder);

  return merge(left, right, sortBy, sortOrder);
}

// Fungsi gabung
function merge(
  left: Newsletter[],
  right: Newsletter[],
  sortBy: SortBy,
  sortOrder: SortOrder
): Newsletter[] {
  let result: Newsletter[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    let isLeftFirst: boolean;

    // 3. LOGIKA PERBANDINGAN MENGGUNAKAN 'releaseDate'
    if (sortBy === 'releaseDate') {
      const leftTime = new Date(left[i].releaseDate).getTime();
      const rightTime = new Date(right[j].releaseDate).getTime();
      
      if (sortOrder === 'asc') { 
        isLeftFirst = leftTime <= rightTime;
      } else {
        isLeftFirst = leftTime >= rightTime;
      }
    } else { 
      const leftTitle = left[i].title;
      const rightTitle = right[j].title;
      
      if (sortOrder === 'asc') {
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