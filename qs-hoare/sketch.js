let values = []

//width of each bar
let w = 11;
let states = [];

function setup() {
  createCanvas(windowWidth * .95, windowHeight * .75);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  // frameRate(24);
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let pivotIdx = await partition(arr, start, end);

  await Promise.all(
    [quickSort(arr, start, pivotIdx - 1), quickSort(arr, pivotIdx, end)]
  );
}

async function partition(arr, start, end) {
  //color all the indices of the array that we are currently partioining.
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[Math.floor((start + end) / 2)];

  states[start] = 0;
  states[end] = 2;


  while (start <= end) {
    //increment the start pointer until we find an element
    //that is greater in value than our pivot value
    while (arr[start] < pivotValue) {
      //uncolor start before incrementing
      states[start] = -1;
      start++
      //recolor start after incrementing
      states[start] = 0;
    }
    //decrement the end pointer until we find an element
    //that is lesser in value than our pivotValue
    while (arr[end] > pivotValue) {
      //uncolor end before incrementing
      states[end] = -1;
      end--
      //recolor end after incrementing
      states[end] = 2;
    }
    //we've either exited or never entered our two while loops above
    //which means that we've found a pair of values..
    //one to the left of our partition and one to the right
    //where the value on the left is greater, and the value on the right is lesser than our pivot
    //we perform a swap of these two values as long as start is still <= end
    if (start <= end) {
      await swap(arr, start, end);
      //we're about to move our start and end,
      //let's uncolor our old start and end beore we increment / decrement.
      states[start] = -1;
      states[end] = -1;
      start++
      end--
      //now that we've incremented / decremented start and end,
      //let's recolor them to their distinct color.
      states[start] = 0;
      states[end] = 0;
    }
  }

  //uncolor start and end before returning
  states[start] = -1;
  states[end] = -1;

  return start;
}



//swap logic written in a async helper function to allow await of sleep method
async function swap(arr, a, b) {
  //delays just before swapping, allowing p5 to draw the bars of the array, resulting in visualization.
  await sleep(120);
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

    //start pointer (red)
    if (states[i] == 0) {
      fill('#ff6a53');
      //the portion of the array that is currently being partitioned (purple)
    } else if (states[i] == 1) {
      fill('#8153ff');
      //end pointer (blue)
    } else if (states[i] == 2) {
      fill('#53a3ff');
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