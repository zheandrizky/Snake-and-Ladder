//store the co-ordinates of all the squares.
var squares = new Array();

var canvas = document.getElementById("board");
var context = canvas.getContext("2d");
var contextText = canvas.getContext("2d");
var squareSize = canvas.height / 10;

var _currentPos = [0, 0];
let player = 1;

RenderSquareBoard();
RenderSnakeAndLadders();

// Deklarasi objek Audio
let backgroundMusic = new Audio('prpg-dice-rolling-95182.mp3');

backgroundMusic.loop = true; // Mengatur agar musik diputar secara berulang

// Memainkan musik setelah pengguna berinteraksi dengan halaman
document.body.addEventListener('click', function () {
    backgroundMusic.play();
});

function RenderSquareBoard() {
    var colorA = "white";
    var colorB = "red";

    var initRow = 1; var totalRows = 10; var initcolumn = 1; var totalColumns = 10;

    var x = 0; var y = canvas.height - squareSize;

    var columnNr = 1; var leftToRight = true;
    for (var row = initRow; row <= totalRows; row++) {
        if (leftToRight) {
            x = 0;
        }
        else {
            x = canvas.width - squareSize;
        }

        for (var column = initcolumn; column <= totalColumns; column++) {
            if (columnNr % 2 == 0) {
                context.fillStyle = colorA;
            }
            else if (columnNr % 2 == 1) {
                context.fillStyle = colorB;
            }

            context.fillRect(x, y, squareSize, squareSize);

            squares[columnNr] = x.toString() + ',' + y.toString();

            contextText.font = "15px tahoma";
            context.fillStyle = 'black';
            contextText.fillText(columnNr, x, y + squareSize);

            var x1, y1
            if (leftToRight) {
                x += squareSize;

                x1 = x + (squareSize / 2);
            }
            else {
                x -= squareSize;
                x1 = x - (squareSize / 2);
            }

            y1 = y - (squareSize / 2);

            columnNr++;
        }

        y -= squareSize;
        leftToRight = !leftToRight;
    }
}

function RenderSnakeAndLadders() {
    var img = new Image();
    img.onload = function () {
        context.drawImage(img, 66, 23);
    };
    img.src = "Images/SnakeA.gif";

    var img1 = new Image();
    img1.onload = function () {
        context.drawImage(img1, 66, 166);
    };
    img1.src = "Images/SnakeB.gif";

    var img2 = new Image();
    img2.onload = function () {
        context.drawImage(img2, 57, 166);
    };
    img2.src = "Images/LadderA.gif";

    var img3 = new Image();
    img3.onload = function () {
        context.drawImage(img3, 322, 366);
    };
    img3.src = "Images/LadderA.gif";
}

function initGame() {
    window.location.reload(); 
}

function GenerateRandomNumber(max) {
    
    var rnd = Math.floor(Math.random() * (max + 1))

    if (rnd == 0) {
        rnd = 1; 
    }
    return rnd;
}

function rollDice() {
    var newMove = GenerateRandomNumber(6); 
    document.getElementById(`gotdice${player}`).innerText = `Player ${player} Got: ` + newMove;


    index_pos = player - 1;

    var newPos = _currentPos[index_pos] + newMove; 


   
    if (newPos > 100) {
        newPos = 100 - (newPos - 100);
    }

    _currentPos[index_pos] = newPos;
    
    switch (_currentPos[index_pos]) {
        //ladder
        case 6:
            _currentPos[index_pos] = 46;
            break;
        //ladder
        case 39:
            _currentPos[index_pos] = 79;
            break;
        //snake
        case 99:
            _currentPos[index_pos] = 29;
            break;
        //snake
        case 72:
            _currentPos[index_pos] = 2;
            break;
    }

    RenderSquareBoard()
    var coorintaes_1 = squares[_currentPos[0]].split(',');
    var coorintaes_2 = squares[_currentPos[1]]?.split(',');

    // Menggambar objek dalam bentuk lingkaran
    context.beginPath();
    context.arc(parseInt(coorintaes_1[0]) + squareSize / 2, parseInt(coorintaes_1[1]) + squareSize / 2, squareSize / 3, 0, 2 * Math.PI);
    context.fillStyle = 'blue';
    context.fill();

    // Memainkan suara saat pemain bergerak
    document.getElementById("moveSound").play();

    if (_currentPos[1] > 0) {
        context.beginPath();
        context.arc(parseInt(coorintaes_2[0]) + squareSize / 2, parseInt(coorintaes_2[1]) + squareSize / 2, squareSize / 3, 0, 2 * Math.PI);
        context.fillStyle = 'yellow';
        context.fill();
    }
    
    if (_currentPos[index_pos] == 100) {
      
        document.getElementById("winSound").play();
        alert(`Congratulations, Player ${player} won the game :)`);

        initGame();
    }

    player = (player == 1) ? 2 : 1;

    RenderSnakeAndLadders()
}
