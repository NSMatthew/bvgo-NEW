export interface Newsletter {
  id: number;
  title: string;
  releaseDate: Date;
}

export type SortBy = 'date' | 'title';
export type SortOrder = 'asc' | 'desc';

// Fungsi utama
export function mergeSort(
  arr: Newsletter[],
  sortBy: SortBy = 'date',
  // 1. TAMBAHKAN PARAMETER KETIGA DENGAN NILAI DEFAULT
  sortOrder: SortOrder = 'desc' // Default: terbaru dulu
): Newsletter[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);

  // 2. TERUSKAN 'sortOrder' KE SETIAP PANGGILAN REKURSIF
  const left = mergeSort(arr.slice(0, mid), sortBy, sortOrder);
  const right = mergeSort(arr.slice(mid), sortBy, sortOrder);

  // 3. TERUSKAN 'sortOrder' KE FUNGSI 'merge'
  return merge(left, right, sortBy, sortOrder);
}

// Fungsi gabung
function merge(
  left: Newsletter[],
  right: Newsletter[],
  sortBy: SortBy,
  // 4. TAMBAHKAN 'sortOrder' SEBAGAI PARAMETER DI SINI JUGA
  sortOrder: SortOrder
): Newsletter[] {
  let result: Newsletter[] = [];
  let i = 0,
    j = 0;

  while (i < left.length && j < right.length) {
    let isLeftFirst: boolean; // Ganti nama 'compare' agar lebih jelas

    // =================================================================
    // 5. INTI PERUBAHAN: LOGIKA PERBANDINGAN MENJADI FLEKSIBEL
    // =================================================================
    if (sortBy === 'date') {
      const leftTime = left[i].releaseDate.getTime();
      const rightTime = right[j].releaseDate.getTime();
      // Cek apakah urutannya ascending atau descending
      if (sortOrder === 'asc') { 
        isLeftFirst = leftTime <= rightTime;
      } else {
        isLeftFirst = leftTime >= rightTime; // Alur pencarian di balik!
      }
    } else { 
      const leftTitle = left[i].title;
      const rightTitle = right[j].title;
      // Cek apakah urutannya ascending atau descending
      if (sortOrder === 'asc') { // A -> Z
        isLeftFirst = leftTitle.localeCompare(rightTitle) <= 0;
      } else { // Z -> A
        isLeftFirst = leftTitle.localeCompare(rightTitle) >= 0; // Operator dibalik!
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