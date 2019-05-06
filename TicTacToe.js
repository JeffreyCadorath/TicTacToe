const boxes = document.querySelectorAll("td");
let player = document.querySelector("#player");
const playerTurnDisplay = document.querySelector("#playerTurnDisplay");
const resetButton = document.querySelector(".resetButton");
let boxesLeftToClick = 9;
let gameOver = false;
let isXTurn = true;

function gameStart() {
  boxClicker(boxes);
}

function reset() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = "";
    isXTurn = true;
    boxes[i].classList.remove("xOut");
    boxes[i].classList.remove("gameOver");
  }
    gameOver = false;
  if (isXTurn) playerTurnDisplay.classList.add("xTurn");
    boxesLeftToClick = 9;
}

function addObjectToBox(box) {
  if (isXTurn)
    addX(box);
  else
    addCircle(box);
}

function boxClicker(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener("click", function() {
      if (emptyBox(this) && gameOver === false) {
        addObjectToBox(this);
        isXTurn = !(isXTurn);
        boxesLeftToClick--;
        displayTurn();
        checkWinner(arr);
      }
    });
    resetButton.addEventListener("click", function() {
      reset();
    })
  }
}

function emptyBox(box) {
  if (box.textContent !== "X" && box.textContent !== "O")
    return true;
  else
    return false;
}

function addX(box) {
    box.classList.add("tic");
    box.textContent = "X";
  }

function addCircle(box) {
    box.classList.add("circle");
    box.textContent = "O";
  }

function displayTurn() {
  if (boxesLeftToClick > 0) {
    player.textContent = (isXTurn) ? "X" : "O";
    playerTurnDisplay.classList.toggle("xTurn");
    playerTurnDisplay.classList.toggle("yTurn");
  } else {
    playerTurnDisplay.textContent = "Draw";
    playerTurnDisplay.classList.add("gameOver");
  }
}

function winCondition(box1, box2, box3) {
  if (box1.textContent === box2.textContent && box1.textContent === box3.textContent &&
  emptyBox(box1) === false) return true;
  else
    return false;
}

function displayWinner(box) {
  playerTurnDisplay.classList.remove("xTurn");
  playerTurnDisplay.classList.remove("yTurn");
  playerTurnDisplay.classList.add("gameOver");
  playerTurnDisplay.textContent = 
  `${box.textContent} wins`;
  gameOver = true;
  if (gameOver = true);
}

function xOut(box1, box2, box3) {
  box1.classList.add("xOut");
  box2.classList.add("xOut");
  box3.classList.add("xOut");
}

function win(box1, box2, box3) {
  displayWinner(box1);
  xOut(box1, box2, box3);
}

function checkWinner(arr) {
  if (winCondition(arr[0], arr[1], arr[2]))
    win(arr[0], arr[1], arr[2]);
  else if (winCondition(arr[3], arr[4], arr[5]))
    win(arr[3], arr[4], arr[5]);
  else if (winCondition(arr[6], arr[7], arr[8]))
    win(arr[6], arr[7], arr[8]);
  else if (winCondition(arr[0], arr[3], arr[6]))
    win(arr[0], arr[3], arr[6]);
  else if (winCondition(arr[1], arr[4], arr[7]))
    win(arr[1], arr[4], arr[7]);
  else if (winCondition(arr[2], arr[5], arr[8]))
    win(arr[2], arr[5], arr[8]);
  else if (winCondition(arr[0], arr[4], arr[8]))
    win(arr[0], arr[4], arr[8]);
  else if (winCondition(arr[2], arr[4], arr[6]))
    win(arr[2], arr[4], arr[6]);
}

gameStart();