(function() {

    const paddleHeight = 150;
    const paddleWidth = 15;
    const speedOfPaddle = 0;

    const positionYpaddle1 = 129.5;
    const positionXpaddle1 = 0;

    const positionYpaddle2 = 129.5;
    const positionXpaddle2 = 585;

    const ball2Radius = 15;

    const ballPosX = 295;
    const ballPosY = 195;
    const ballSpeedY = 0;
    const ballSpeedX = 0;

    const courtWidth = 600;
    const courtHeight = 400;
    const score = 0;

    var stopped = false;
    var requestId = 0;
    const offset = 10;

    //создаем панель с кнопкой и счетом
    var section = document.getElementById('section');
    var scorePanel = document.createElement('div');
    scorePanel.id = 'scorePanelId';
    scorePanel.style.cssText = 'width:600px;height:100px;margin:0;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;';
    section.appendChild(scorePanel);

    //создаем кнопку
    var buttonStart = document.createElement('button');
    buttonStart.id = 'btnStart';
    buttonStart.textContent = "Старт!";
    buttonStart.style.cssText = 'flex: 0 1 150px;display: flex;flex-direction: column;justify-content: center;align-items: center;height: 35px;background-color: rgb(163, 163, 163);color: #000;font-size: 16px;font-weight: 700; text-transform: uppercase;margin: 0;padding: 10px;border-radius: 10px; outline: none;cursor: pointer;';
    scorePanel.appendChild(buttonStart);

    //создаем счет
    var scoreTable = document.createElement('div');
    scoreTable.innerHTML = `<span id="score1">0</span><span>:</span><span id="score2">0</span>`;
    scoreTable.id = 'table';
    scoreTable.style.cssText = 'margin-left:140px; font-weight:700;';
    scorePanel.appendChild(scoreTable);

    //создаем tag canvas
    var canvas = document.createElement('canvas');
    canvas.id = 'canvasId';
    canvas.width = courtWidth;
    canvas.height = courtHeight;
    document.getElementById('section').appendChild(canvas);

    var game = new Game();

    function loop() {
        if (!stopped) {
            game.update();
            game.draw();
            requestId = window.requestAnimationFrame(loop);
        };
    };

    function startGame() {
        stopGame();
        requestId = window.requestAnimationFrame(loop);
        stopped = false;
    };

    function stopGame() {
        if (requestId) {
            window.cancelAnimationFrame(requestId);
        };
        stopped = true;
    };

    startGame();

    document.getElementById('btnStart').addEventListener('click', function() {
        startGame();
        game.startBall();
    });

    function Game() {
        var canvasEl = document.getElementById('canvasId');
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = canvasEl.getContext("2d");
        this.ball = new Ball();
        this.paddle1 = new Paddle(positionXpaddle1, positionYpaddle1, "green");
        this.paddle2 = new Paddle(positionXpaddle2, positionYpaddle2, "blue");
    };

    Game.prototype.draw = function() {
        // очистить все в полотне canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        //рисуем корт
        this.ctx.fillStyle = '#fffb02';
        this.ctx.strokeStyle = 'black';
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.strokeRect(0, 0, this.width, this.height);

        //рисуем мяч
        this.ball.draw(this.ctx);

        //рисуем рoкетки
        this.paddle1.draw(this.ctx);
        this.paddle2.draw(this.ctx);
    };

    Game.prototype.startBall = function() {
        this.ball.cx = ballPosX;
        this.ball.cy = ballPosY;

        if (Math.random() < 0.5) {
            var side = 1;
        } else {
            var side = -1;
        };
        this.ball.speedY = Math.random() * 2 + 3; //при старте мяча устанавливвем рандомную скорость по y
        this.ball.speedX = side * (Math.random() * 2 + 3); //при старте мяча устанавливвем рандомную скорость по x с меняющимся напрвлением влево либо право
    };

    Game.prototype.update = function() {
        if (this.paused)
            return;

        game.paddle1.y += game.paddle1.speed;
        game.paddle2.y += game.paddle2.speed;

        game.ball.cx += game.ball.speedX;
        game.ball.cy += game.ball.speedY;

        //если позиция ракеток по y меньше 10-устанавливаем позицию по y  равную 0
        if (game.paddle1.y < 10) {
            game.paddle1.y = 0;
        };

        if (game.paddle2.y < 10) {
            game.paddle2.y = 0;
        };

        //если позиция рокетки по Y  большее или равно растоянию = высота корта минус высота ракетки - устанавливаем позицию по y  равную 400 минус высота рокетки
        if (game.paddle1.y >= courtHeight - game.paddle1.height) {
            game.paddle1.y = courtHeight - game.paddle1.height;
        };

        if (game.paddle2.y >= courtHeight - game.paddle2.height) {
            game.paddle2.y = courtHeight - game.paddle2.height;
        };

        //если позиция мяча по Y  меньше или равно 0(верхний край) либо больше или равно растоянию=высота поля минус высота мяча(нижний край)
        if (game.ball.cy - game.ball.diameter <= 0 || game.ball.cy >= courtHeight - game.ball.diameter) {
            game.ball.speedY = -game.ball.speedY; //меняем скорость  мяча на противоположное число
        };

        //от левого края до ширина рокетки1
        if (game.ball.cx - offset <= game.paddle1.width) {
            if (game.ball.cy > game.paddle1.y && game.ball.cy < game.paddle1.y + game.paddle1.height) { //мяч находится в рамках высоты рокетки
                game.ball.speedX = -game.ball.speedX; //меняем скорость на противоположное число-отби 1вает мяч ракетка
            } else {
                game.ball.cx = ball2Radius;
                game.paddle2.score++; //меняется счет
                document.getElementById('score2').innerHTML = game.paddle2.score.toString();
                stopGame();
            };
        };

        //если больше или равно расcтояния = правый край минус ширина рокетки и минус ширина мяча
        if (game.ball.cx > courtWidth - offset - game.paddle2.width) {
            if (game.ball.cy > game.paddle2.y && game.ball.cy < game.paddle2.y + game.paddle2.height) { //мяч находится в рамках высоты рокетки
                game.ball.speedX = -game.ball.speedX;
            } else {
                game.ball.cx = courtWidth - game.ball.diameter;
                game.paddle1.score++;
                document.getElementById('score1').innerHTML = game.paddle1.score.toString();
                stopGame();
            };
        };
    };

    //при нажатии на кнопки-происходят события - смещаются рокетки
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 16 || event.which == 16) { // shift key
            game.paddle1.speed = -10;
        };
        if (event.keyCode == 17 || event.which == 17) { // ctrl Key
            game.paddle1.speed = 10;
        };
        if (event.keyCode == 38 || event.which == 38) { // up arrow
            game.paddle2.speed = -10;
        };
        if (event.keyCode == 40 || event.which == 40) { // down arrow
            game.paddle2.speed = 10;
        };
    }, false);

    //отпустили кнопку-событие перемещение останавливается
    document.addEventListener('keyup', function(event) {
        if (event.keyCode == 16 || event.which == 16) {
            game.paddle1.speed = 0;
        };
        if (event.keyCode == 17 || event.which == 17) {
            game.paddle1.speed = 0;
        };
        if (event.keyCode == 38 || event.which == 38) {
            game.paddle2.speed = 0;
        };
        if (event.keyCode == 40 || event.which == 40) {
            game.paddle2.speed = 0;
        };
    }, false);

    //конструктор рокетки
    function Paddle(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.score = score;
        this.speed = speedOfPaddle;
        this.color = color;
    };

    Paddle.prototype.draw = function(paddle) {
        paddle.fillStyle = this.color;
        paddle.fillRect(this.x, this.y, this.width, this.height);
    };

    //конструктор мяча
    function Ball() {
        this.cx = ballPosX;
        this.cy = ballPosY;
        this.speedX = ballSpeedX;
        this.speedY = ballSpeedY;
        this.diameter = ball2Radius;
    };

    Ball.prototype.draw = function(ball) {
        ball.beginPath();
        ball.arc(this.cx, this.cy, this.diameter, 0, Math.PI * 2);
        ball.fillStyle = 'red';
        ball.fill();
        ball.strokeStyle = 'red';
        ball.lineWidth = 1;
        ball.closePath();
        ball.stroke();
    };

}())