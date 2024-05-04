function rand(max) {
  return Math.floor(Math.random() * max);
}

function animKeys(key) {
  if (key.id === "bu") {
    key.style.border = "3px #fff solid";
    key.style.borderTop = "1px #fff solid";
    key.style.borderBottom = "4px #fff solid";
    key.style.transform = "translateY(-2px)";
  }
  if (key.id === "bd") {
    key.style.border = "3px #fff solid";
    key.style.borderBottom = "1px #fff solid";
    key.style.borderTop = "4px #fff solid";
    key.style.transform = "translateY(2px)";
  }
  if (key.id === "bl") {
    key.style.border = "3px #fff solid";
    key.style.borderLeft = "1px #fff solid";
    key.style.borderRight = "4px #fff solid";
    key.style.transform = "translateX(-2px)";
  }
  if (key.id === "br") {
    key.style.border = "3px #fff solid";
    key.style.borderRight = "1px #fff solid";
    key.style.borderLeft = "4px #fff solid";
    key.style.transform = "translateX(2px)";
  }

  //reset
  setTimeout(() => {
    key.style.border = "2px #fff solid";
    key.style.borderTop = "2px #fff solid";
    key.style.borderBottom = "2px #fff solid";
    key.style.borderLeft = "2px #fff solid";
    key.style.borderRight = "2px #fff solid";
    key.style.transform = "translateY(0px)";
    key.style.transform = "translateX(0px)";
  }, "150");
}

let minutes = 0;
let seconds = 0;
let timerInterval;
let timerStarted = false;

function startTimer() {
  if (!timerStarted) {
    timerStarted = true;
    timerInterval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      document.getElementById('timer').innerText = 'Waktu: ' + formattedTime;
    }, 1000);
  }
}
function stopTimer() {
  minutes = 0;
  seconds = 0;
  timerStarted = false;
  clearInterval(timerInterval);
  document.getElementById('timer').innerText = 'Waktu: 00:00';
}

$(document).ready(function () {
  function checkWindowSize() {
    if ($(window).width() <= 319) {
      $("#bu, #bd, #bl, #br").css("display", "block");
      $("#bu, #bd, #bl, #br").prop("disabled", false);
      $("#timer").css({ "font-size": "20px" });
      $("#mazeCanvas").css({ "height": "330px", "width": "330px" });
      $("#mazeContainer").css({ "height": "330px", "width": "330px" });
    }
    else if ($(window).width() <= 320 && $(window).width() <= 480) {
      $("#bu, #bd, #bl, #br").css("display", "block");
      $("#bu, #bd, #bl, #br").prop("disabled", false);
      $("#timer").css({ "font-size": "20px" });
      $("#mazeCanvas").css({ "height": "330px", "width": "330px" });
      $("#mazeContainer").css({ "height": "330px", "width": "330px" });
    }
    else if ($(window).width() <= 481 && $(window).width() <= 768) {
      $("#bu, #bd, #bl, #br").css("display", "block");
      $("#bu, #bd, #bl, #br").prop("disabled", false);
      $("#timer").css({ "font-size": "20px" });
      $("#mazeCanvas").css({ "height": "345px", "width": "345px" });
      $("#mazeContainer").css({ "height": "345px", "width": "345px" });
    }
    else if ($(window).width() <= 769) {
      $("#bu, #bd, #bl, #br").css("display", "block");
      $("#bu, #bd, #bl, #br").prop("disabled", false);
      $("#timer").css({ "font-size": "20px" });
      $("#mazeCanvas").css({ "height": "355px", "width": "355px" });
      $("#mazeContainer").css({ "height": "355px", "width": "355px" });
    }
    else {
      $("#bu, #bd, #bl, #br").css("display", "none");
      $("#bu, #bd, #bl, #br").prop("disabled", false);
      $("#mazeCanvas").css({ "height": "500px", "width": "500px" });
      $("#mazeContainer").css({ "height": "500px", "width": "500px" });
    }
}

  checkWindowSize(); // Check on page load

  $(window).resize(function () {
    checkWindowSize(); // Check on window resize
  });
});

function tutorial() {
  var inputVal = document.getElementById('nama').value;
  if (inputVal.trim() !== '') {
    document.getElementById('inputs').style.display = 'none';
    document.getElementById('tutor').style.display = 'block';
    document.getElementById('inputs').disabled = true;
    document.getElementById('tutor').disabled = false;
  } else {
    alert("Akun Tidak Boleh Kosong ");
  }
}

function playgames() {
  document.getElementById('tutor').style.display = 'none';
  document.getElementById('page').style.display = 'block';
  document.getElementById('tutor').disabled = true;
  document.getElementById('page').disabled = false;
  startTimer();
  
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / difficulty;
  if (player != null) {
    draw.redrawMaze(cellSize);
    player.redrawPlayer(cellSize);
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function changeBrightness(factor, sprite) {
  var virtCanvas = document.createElement("canvas");
  virtCanvas.width = 500;
  virtCanvas.height = 500;
  var context = virtCanvas.getContext("2d");
  context.drawImage(sprite, 0, 0, 500, 500);

  var imgData = context.getImageData(0, 0, 500, 500);

  for (let i = 0; i < imgData.data.length; i += 4) {
    imgData.data[i] = imgData.data[i] * factor;
    imgData.data[i + 1] = imgData.data[i + 1] * factor;
    imgData.data[i + 2] = imgData.data[i + 2] * factor;
  }
  context.putImageData(imgData, 0, 0);

  var spriteOutput = new Image();
  spriteOutput.src = virtCanvas.toDataURL();
  virtCanvas.remove();
  return spriteOutput;
}

function displayVictoryMess(moves,formattedTime) {
  let nama = document.getElementById('nama').value;
  let dif = document.getElementById("diffSelect").options[document.getElementById("diffSelect").selectedIndex].text;
  let currentTime = formattedTime || `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById("moves").innerHTML = "<p class='timeclear'>" + currentTime + "</p>" + "<p class='stepclear'>" + moves + " LANGKAH" + "</p>";
  toggleVisablity("Message-Container");
  stopTimer();  

  //input data to excel
  const newData = { nama:nama, moves: moves, time: currentTime};
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'update_csv.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.responseText);
    } else {
      console.error('Terjadi kesalahan saat mengirim permintaan.');
    }
  };
  xhr.onerror = function () {
    console.error('Kesalahan koneksi.');
  };
  xhr.send(JSON.stringify(newData));
}

function toggleVisablity(id) {
  if (document.getElementById(id).style.visibility == "visible") {
    document.getElementById(id).style.visibility = "hidden";
  } else {
    document.getElementById(id).style.visibility = "visible";
  }
}

function Maze(Width, Height) {
  var mazeMap;
  var width = Width;
  var height = Height;
  var startCoord, endCoord;
  var dirs = ["n", "s", "e", "w"];
  var modDir = {
    n: {
      y: -1,
      x: 0,
      o: "s"
    },
    s: {
      y: 1,
      x: 0,
      o: "n"
    },
    e: {
      y: 0,
      x: 1,
      o: "w"
    },
    w: {
      y: 0,
      x: -1,
      o: "e"
    }
  };

  this.map = function() {
    return mazeMap;
  };
  this.startCoord = function() {
    return startCoord;
  };
  this.endCoord = function() {
    return endCoord;
  };

  function genMap() {
    mazeMap = new Array(height);
    for (y = 0; y < height; y++) {
      mazeMap[y] = new Array(width);
      for (x = 0; x < width; ++x) {
        mazeMap[y][x] = {
          n: false,
          s: false,
          e: false,
          w: false,
          visited: false,
          priorPos: null
        };
      }
    }
  }

  function defineMaze() {
    var isComp = false;
    var move = false;
    var cellsVisited = 1;
    var numLoops = 0;
    var maxLoops = 0;
    var pos = {
      x: 0,
      y: 0
    };
    var numCells = width * height;
    while (!isComp) {
      move = false;
      mazeMap[pos.x][pos.y].visited = true;

      if (numLoops >= maxLoops) {
        shuffle(dirs);
        maxLoops = Math.round(rand(height / 8));
        numLoops = 0;
      }
      numLoops++;
      for (index = 0; index < dirs.length; index++) {
        var direction = dirs[index];
        var nx = pos.x + modDir[direction].x;
        var ny = pos.y + modDir[direction].y;

        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          //Check if the tile is already visited
          if (!mazeMap[nx][ny].visited) {
            //Carve through walls from this tile to next
            mazeMap[pos.x][pos.y][direction] = true;
            mazeMap[nx][ny][modDir[direction].o] = true;

            //Set Currentcell as next cells Prior visited
            mazeMap[nx][ny].priorPos = pos;
            //Update Cell position to newly visited location
            pos = {
              x: nx,
              y: ny
            };
            cellsVisited++;
            //Recursively call this method on the next tile
            move = true;
            break;
          }
        }
      }

      if (!move) {
        //  If it failed to find a direction,
        //  move the current position back to the prior cell and Recall the method.
        pos = mazeMap[pos.x][pos.y].priorPos;
      }
      if (numCells == cellsVisited) {
        isComp = true;
      }
    }
  }

  function defineStartEnd() {
    switch (rand(4)) {
      case 0:
        startCoord = {
          x: 0,
          y: 0
        };
        endCoord = {
          x: height - 1,
          y: width - 1
        };
        break;
      case 1:
        startCoord = {
          x: 0,
          y: width - 1
        };
        endCoord = {
          x: height - 1,
          y: 0
        };
        break;
      case 2:
        startCoord = {
          x: height - 1,
          y: 0
        };
        endCoord = {
          x: 0,
          y: width - 1
        };
        break;
      case 3:
        startCoord = {
          x: height - 1,
          y: width - 1
        };
        endCoord = {
          x: 0,
          y: 0
        };
        break;
    }
  }

  genMap();
  defineStartEnd();
  defineMaze();
}

function DrawMaze(Maze, ctx, cellsize, endSprite = null) {
  var map = Maze.map();
  var cellSize = cellsize;
  var drawEndMethod;
  ctx.lineWidth = cellSize / 40;

  this.redrawMaze = function(size) {
    cellSize = size;
    ctx.lineWidth = cellSize / 50;
    drawMap();
    drawEndMethod();
  };

  //change obstacle color
  function drawCell(xCord, yCord, cell) {
    var x = xCord * cellSize;
    var y = yCord * cellSize;
    ctx.strokeStyle = "black"; 
    if (cell.n == false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + cellSize, y);
      ctx.stroke();
    }
    if (cell.s === false) {
      ctx.beginPath();
      ctx.moveTo(x, y + cellSize);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.stroke();
    }
    if (cell.e === false) {
      ctx.beginPath();
      ctx.moveTo(x + cellSize, y);
      ctx.lineTo(x + cellSize, y + cellSize);
      ctx.stroke();
    }
    if (cell.w === false) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + cellSize);
      ctx.stroke();
    }
  }

  function drawMap() {
    for (x = 0; x < map.length; x++) {
      for (y = 0; y < map[x].length; y++) {
        drawCell(x, y, map[x][y]);
      }
    }
  }

  function drawEndFlag() {
    var coord = Maze.endCoord();
    var gridSize = 4;
    var fraction = cellSize / gridSize - 2;
    var colorSwap = true;
    for (let y = 0; y < gridSize; y++) {
      if (gridSize % 2 == 0) {
        colorSwap = !colorSwap;
      }
      for (let x = 0; x < gridSize; x++) {
        ctx.beginPath();
        ctx.rect(
          coord.x * cellSize + x * fraction + 4.5,
          coord.y * cellSize + y * fraction + 4.5,
          fraction,
          fraction
        );
        if (colorSwap) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        }
        ctx.fill();
        colorSwap = !colorSwap;
      }
    }
  }

  function drawEndSprite() {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    var coord = Maze.endCoord();
    ctx.drawImage(
      endSprite,
      2,
      2,
      endSprite.width,
      endSprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }

  function clear() {
    var canvasSize = cellSize * map.length;
    ctx.clearRect(0, 0, canvasSize, canvasSize);
  }

  if (endSprite != null) {
    drawEndMethod = drawEndSprite;
  } else {
    drawEndMethod = drawEndFlag;
  }
  clear();
  drawMap();
  drawEndMethod();
}

function Player(maze, c, _cellsize, onComplete, sprite = null) {
  var ctx = c.getContext("2d");
  var drawSprite;
  var moves = 0;
  drawSprite = drawSpriteCircle;
  if (sprite != null) {
    drawSprite = drawSpriteImg;
  }
  var player = this;
  var map = maze.map();
  var cellCoords = {
    x: maze.startCoord().x,
    y: maze.startCoord().y
  };
  var cellSize = _cellsize;
  var halfCellSize = cellSize / 2;

  this.redrawPlayer = function(_cellsize) {
    cellSize = _cellsize;
    drawSpriteImg(cellCoords);
  };

  function drawSpriteCircle(coord) {
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(
      (coord.x + 1) * cellSize - halfCellSize,
      (coord.y + 1) * cellSize - halfCellSize,
      halfCellSize - 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
      player.unbindKeyDown();
    }
  }

  function drawSpriteImg(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.drawImage(
      sprite,
      0,
      0,
      sprite.width,
      sprite.height,
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
    if (coord.x === maze.endCoord().x && coord.y === maze.endCoord().y) {
      onComplete(moves);
      player.unbindKeyDown();
    }
  }

  function removeSprite(coord) {
    var offsetLeft = cellSize / 50;
    var offsetRight = cellSize / 25;
    ctx.clearRect(
      coord.x * cellSize + offsetLeft,
      coord.y * cellSize + offsetLeft,
      cellSize - offsetRight,
      cellSize - offsetRight
    );
  }


  function check(e) {
    var cell = map[cellCoords.x][cellCoords.y];
    moves++;
    switch (e.keyCode) {
      case 65:
      case 37:// west
        if (cell.w == true) {
          animKeys(bl);
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x - 1,
            y: cellCoords.y
          };
          drawSprite(cellCoords);
        }
        break;
      case 87:
      case 38: // north
        if (cell.n == true) {
          animKeys(bu);
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y - 1
          };
          drawSprite(cellCoords);
        }
        break;
      case 68:
      case 39: // east
        if (cell.e == true) {
          animKeys(br);
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x + 1,
            y: cellCoords.y
          };
          drawSprite(cellCoords);
        }
        break;
      case 83:
      case 40: // south
        if (cell.s == true) {
          animKeys(bd);
          removeSprite(cellCoords);
          cellCoords = {
            x: cellCoords.x,
            y: cellCoords.y + 1
          };
          drawSprite(cellCoords);
        }
        break;
    }
  }

  document.getElementById('bu').addEventListener('click', function () {
    check({ keyCode: 38 });
  });
  document.getElementById('bd').addEventListener('click', function () {
    check({ keyCode: 40 });
  });
  document.getElementById('bl').addEventListener('click', function () {
    check({ keyCode: 37 });
  });
  document.getElementById('br').addEventListener('click', function () {
    check({ keyCode: 39 });
  });
  

  this.bindKeyDown = function() {
    window.addEventListener("keydown", check, false);

    $("#view").swipe({
      swipe: function(
        event,
        direction,
        distance,
        duration,
        fingerCount,
        fingerData
      ) {
        console.log(direction);
        switch (direction) {
          case "up":
            check({
              keyCode: 38
            });
            break;
          case "down":
            check({
              keyCode: 40
            });
            break;
          case "left":
            check({
              keyCode: 37
            });
            break;
          case "right":
            check({
              keyCode: 39
            });
            break;
        }
      },
      threshold: 0
    });
  };

  this.unbindKeyDown = function() {
    window.removeEventListener("keydown", check, false);
    $("#view").swipe("destroy");
  };

  drawSprite(maze.startCoord());

  this.bindKeyDown();
}

var mazeCanvas = document.getElementById("mazeCanvas");
var ctx = mazeCanvas.getContext("2d");
var sprite;
var finishSprite;
var maze, draw, player;
var cellSize;
var difficulty;
// sprite.src = 'media/sprite.png';

window.onload = function() {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }

  //Load and edit sprites
  var completeOne = false;
  var completeTwo = false;
  var isComplete = () => {
    if(completeOne === true && completeTwo === true)
       {
         console.log("Runs");
         setTimeout(function(){
           makeMaze();
         }, 500);         
       }
  };
  sprite = new Image();
  sprite.src =
    "./key.png" +
    "?" +
    new Date().getTime();
  sprite.setAttribute("crossOrigin", " ");
  sprite.onload = function() {
    sprite = changeBrightness(1.5, sprite);
    completeOne = true;
    console.log(completeOne);
    isComplete();
  };

  finishSprite = new Image();
  finishSprite.src = "./home.png"+
  "?" +
  new Date().getTime();
  finishSprite.setAttribute("crossOrigin", " ");
  finishSprite.onload = function() {
    finishSprite = changeBrightness(1.2, finishSprite);
    completeTwo = true;
    console.log(completeTwo);
    isComplete();
  };

};



window.onresize = function () {
  let viewWidth = $("#view").width();
  let viewHeight = $("#view").height();
  if (viewHeight < viewWidth) {
    ctx.canvas.width = viewHeight - viewHeight / 100;
    ctx.canvas.height = viewHeight - viewHeight / 100;
  } else {
    ctx.canvas.width = viewWidth - viewWidth / 100;
    ctx.canvas.height = viewWidth - viewWidth / 100;
  }
  cellSize = mazeCanvas.width / difficulty;
  if (player != null) {
    draw.redrawMaze(cellSize);
    player.redrawPlayer(cellSize);
  }
};

/*
- easy    = 10
-medium   = 15
-hard     = 25
-extreme  = 30
*/
function makeMaze() {
  if (player != undefined) {
    player.unbindKeyDown();
    player = null;
  }
  var e = document.getElementById("diffSelect");
  difficulty = 15;
  cellSize = mazeCanvas.width / difficulty;
  maze = new Maze( difficulty,  difficulty);
  draw = new DrawMaze(maze, ctx, cellSize, finishSprite);
  if (player == null) {
    player = new Player(maze, mazeCanvas, cellSize, displayVictoryMess, sprite);
  }
  if (document.getElementById("mazeContainer").style.opacity < "100") {
    document.getElementById("mazeContainer").style.opacity = "100";
  }
  stopTimer();
}
