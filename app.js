let power = document.getElementById('power-check');
let strict = document.getElementById('strict-check');
let display = document.querySelector('#display div');
let startBtn = document.getElementById('start-btn');
let topLeft = document.getElementById('green-light');
let topRight = document.getElementById('red-light');
let bottomLeft = document.getElementById('yellow-light');
let bottomRight = document.getElementById('blue-light');

let checkPower = false;
let checkStrict = false;
let checkWin = false;
let flash = 0;
let count = 1;
let gamePattern = [];
let playerPattern = [];
let intervalId;
let compTurn;
let gameStarted;


power.addEventListener('click', function () {
  if (power.checked) {
    checkPower = true;
    display.innerHTML = "-";
  }
  else {
    checkPower = false;
    gameStarted = false;
    gamePattern = [];
    display.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
})

strict.addEventListener('click', function () {
  if (strict.checked) checkStrict = true;
  else checkStrict = false;
})

startBtn.addEventListener('click', function () {
  if (checkPower || checkWin) play();
})

function play() {
  clearColor();
  checkPower = false;
  checkWin = false;
  gameStarted = true;
  flash = 0;
  count = 1;
  display.innerHTML = 1;
  gamePattern = [];
  playerPattern = [];
  for (let i = 0; i < 20; i++) {
    gamePattern.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  clearInterval(intervalId);
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  checkPower = false;
  if (flash == count) {
    checkPower = true;
    compTurn = false;
    clearColor();
    clearInterval(intervalId);
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (gamePattern[flash] == 1) one();
      if (gamePattern[flash] == 2) two();
      if (gamePattern[flash] == 3) three();
      if (gamePattern[flash] == 4) four();
      flash++;
    }, 200)
  }
}

function one() {
  let audio = document.getElementById('clip-1');
  audio.play();

  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  let audio = document.getElementById('clip-2');
  audio.play();

  topRight.style.backgroundColor = "tomato";
}

function three() {
  let audio = document.getElementById('clip-3');
  audio.play();

  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  let audio = document.getElementById('clip-4');
  audio.play();

  bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', function () {
  if (checkPower && gameStarted) {
    playerPattern.push(1);
    one();
    checkForMatch();
    if (!checkWin) {
      setTimeout(clearColor, 300);
    }
  }
})

topRight.addEventListener('click', function () {
  if (checkPower && gameStarted) {
    playerPattern.push(2);
    two();
    checkForMatch();
    if (!checkWin) {
      setTimeout(clearColor, 300);
    }
  }
})

bottomLeft.addEventListener('click', function () {
  if (checkPower && gameStarted) {
    playerPattern.push(3);
    three();
    checkForMatch();
    if (!checkWin) {
      setTimeout(clearColor, 300);
    }
  }
})

bottomRight.addEventListener('click', function () {
  if (checkPower && gameStarted) {
    playerPattern.push(4);
    four();
    checkForMatch();
    if (!checkWin) {
      setTimeout(clearColor, 300);
    }
  }
})

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashAllColors() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

function checkForMatch() {
  // check player pattern last element and game pattern's player pattern last elementth index is equal or not 
  let ind = playerPattern.length - 1;
  if (playerPattern[ind] != gamePattern[ind]) {
    clearColor();
    display.innerHTML = "NO!";
    setTimeout(function () {
      display.innerHTML = count;
    }, 200);
    clearInterval(intervalId);
    playerPattern = [];
    compTurn = true;
    flash = 0;
    intervalId = setInterval(gameTurn, 800);

    if (checkStrict) play();
  }
  else {
    if (playerPattern.length == count) {
      count++;
      display.innerHTML = count;
      compTurn = true;
      flash = 0;
      clearInterval(intervalId);
      intervalId = setInterval(gameTurn, 800);
      playerPattern = [];
    }
  }

  // player patter length equals to 5 then invoke win
  if (count == 5) {
    winGame();
    return;
  }
}

function winGame() {
  clearInterval(intervalId);
  flashAllColors();
  display.innerHTML = "WIN!!";
  checkWin = true;
  checkPower = false;
}
