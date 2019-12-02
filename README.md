# Quicksort Visualization

An animated visualization of the quicksort algorithm using both Lomuto and Hoare's partition schemes.

Drawn with p5.js library

## Demo

### Quicksort using Lomuto's Partition

![Alt text](/static/qs-lomuto.gif "Quicksort using Lomuto's partition scheme")

### Quicksort using Hoare's Partition

![Alt text](/static/qs-hoare.gif "Quicksort using Hoare's partition scheme")

## Algorithm Implementation

### Quicksort (Lomuto)

```javascript
function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let pivotIdx = partitionLomuto(arr, start, end);

  quickSort(arr, start, pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, end);
}

function partitionLomuto(arr, start, end) {
  let pivotIdx = start;
  let pivotValue = arr[end];

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      //swap i and pivotIdx if arr[i] is less than pivotValue
      swap(arr, pivotIdx, i);
      pivotIdx += 1;
    }
  }
  //at the end of our loop, swap pivotIdx and end
  swap(arr, pivotIdx, end);
  return pivotIdx;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
```

### Quicksort (Hoare)

```javascript
function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let pivotIdx = partitionHoare(arr, start, end);

  quickSort(arr, start, pivotIdx - 1);
  quickSort(arr, pivotIdx, end);
}

function partitionHoare(array, start, end) {
  //choose midpoint as pivot
  // it is crucial that we specify the pivot to be a value here and not an index
  // otherwise, the *value* of the pivot index, *may* change as the array is partitioned..
  // leading to bugs and ultimately, an incorrectly sorted array
  let pivotValue = array[Math.floor((start + end) / 2)];

  while (start <= end) {
    //increment the start pointer until we find an element
    //that is greater in value than our pivot value
    while (array[start] < pivotValue) {
      start++;
    }
    //decrement the end pointer until we find an element
    //that is lesser in value than our pivotValue
    while (array[end] > pivotValue) {
      end--;
    }
    //we've either exited or never entered our two while loops above
    //which means that we've found a pair of values..
    //one to the left of our partition and one to the right
    //where the value on the left is greater, and the value on the right is lesser than our pivot
    //we perform a swap of these two values as long as start is still <= end
    if (start <= end) {
      swap(array, start, end);
      start++;
      end--;
    }
  }
  return start;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
```
