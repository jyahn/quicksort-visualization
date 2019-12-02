let values = []

//width of each bar
let w = 12;
let states = [];

function setup() {
  //create a canvas with width 800, height 200
  createCanvas(windowWidth * .95, windowHeight * .75);
  //create an array of size 80 (800 / 10)
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  // frameRate(10);
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let pivotIdx = await partition(arr, start, end);
  //once we've finished a partition, return the state of pivotIdx to be uncolored.
  states[pivotIdx] = -1;

  await Promise.all([quickSort(arr, start, pivotIdx - 1), quickSort(arr, pivotIdx + 1, end)])

  // await quickSort(arr, start, pivotIdx - 1);
  // await quickSort(arr, pivotIdx + 1, end);
}

async function partition(arr, start, end) {

  //color all the indices of the array that we are currently partioining.
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }
  let pivotIdx = start;
  let pivotValue = arr[end];
  //dinstinct color for pivotIdx
  states[pivotIdx] = 0;
  states[end] = 2;

  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      //swap i and pivotIdx if arr[i] is less than pivotValue
      await swap(arr, pivotIdx, i);
      //we're about to move our pivotIdx, let's uncolor our old pivotIdx beore we increment.
      states[pivotIdx] = -1;
      pivotIdx += 1;
      //now that we've incremented pivotIdx, let's recolor it to it's distinct color.
      states[pivotIdx] = 0;
    }
  }
  //at the end of our loop, swap pivotIdx and end
  await swap(arr, pivotIdx, end);

  // uncolor all indices that we've just finished partioning (besides pivotIdx).
  for (let i = start; i < end; i++) {
    if (i != pivotIdx) {
      states[i] = -1;
    }
    states[end] = -1;
  }
  return pivotIdx;
}

//swap logic written in a async helper function to allow await of sleep method
async function swap(arr, a, b) {
  //delays just before swapping, allowing p5 to draw the bars of the array, resulting in visualization.
  await sleep(40);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function draw() {
  background('#545353');

  for (let i = 0; i < values.length; i++) {
    //sets the color used to draw lines and borders around shapes
    stroke(50)

    //the pivotIdx as we scan from left to right (red)
    //(begins at start to ensure we cover every element)
    if (states[i] == 0) {
      fill('#ff6a53');
      //the portion of the array that is currently being partitioned (purple)
    } else if (states[i] == 1) {
      fill('#8153ff');
      //the end of the array currently being partitioned,
      // or the index of the random variable we chose to be the pivotValue. (orange)
    } else if (states[i] == 2) {
      fill('#ffc053');
    }
    //any part of the array that is currently not being partitioned (green)
    else {
      fill('#53ffaf');
    }
    //draw a rectangle at location (i*w, height-values[i]) with 
    // a width of w, and height of values[i]
    rect(i * w, height - values[i], w, values[i]);
    fill('black');
    rect(i * w, height - values[i], w, values[i] * .02);
  }
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }