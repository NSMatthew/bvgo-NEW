// lib/mergeSort.ts

export interface Newsletter {
    id: number;
    title: string;
    releaseDate: Date;
  }
  
  // Fungsi merge sort
  export function mergeSort(arr: Newsletter[]): Newsletter[] {
    if (arr.length <= 1) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
  
    return merge(left, right);
  }
  
  // Fungsi merge untuk menggabungkan hasil sort
  function merge(left: Newsletter[], right: Newsletter[]): Newsletter[] {
    let result: Newsletter[] = [];
    let i = 0, j = 0;
  
    while (i < left.length && j < right.length) {
      if (left[i].releaseDate <= right[j].releaseDate) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  
    return result.concat(left.slice(i), right.slice(j));
  }