(function() {

    const paddleHeight = 150;
    const paddleWidth = 15;
    const speedOfPaddle = 0;

    const positionYpaddle1 = 129.5;
    const positionXpaddle1 = 0;

    const positionYpaddle2 = 129.5;
    const positionXpaddle2 = 585;

    const ball2Radius = 20;

    const ballPosX = 295;
    const ballPosY = 195;
    const ballSpeedY = 0;
    const ballSpeedX = 0;

    const courtWidth = 600;
    const courtHeight = 400;
    const score = 0;

    let gameInterval = null;
    var stopped = false;
    var requestId = 0;

    //создаем панель с кнопкой и счетом
    var section = document.getElementById('section');
    var scorePanel = document.createElement('div');
    scorePanel.id = 'scorePanelId';
    scorePanel.style.cssText = 'width:600px;height:100px;margin:0;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;'
    section.appendChild(scorePanel);

    //создаем кнопку
    var buttonStart = document.createElement('button');
    buttonStart.id = 'btnStart';
    buttonStart.textContent = "Старт!";
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
    canvas.width = '600';
    canvas.height = '400';
    document.getElementById('section').appendChild(canvas);

    window.onload = function() {

        var game = new Game();

        function loop() {
            if (!stopped) {
                game.update();
                game.draw();
                requestId = window.requestAnimationFrame(loop);
            }
        }

        function start() {
            requestId = window.requestAnimationFrame(loop);
            stopped = false;
        }

        function stop() {
            if (requestId) {
                window.cancelAnimationFrame(requestId);
            }
            stopped = true;
        }

        start();


        function Game() {
            var canvasEl = document.getElementById('canvasId');
            this.width = canvas.width;
            this.height = canvas.height;
            this.ctx = canvasEl.getContext("2d");
            var centerX = canvasEl.width / 2;
            var centerY = canvasEl.height / 2;
            this.paddle1 = new Paddle(positionXpaddle1, positionYpaddle1, "green");
            this.paddle2 = new Paddle(positionXpaddle2, positionYpaddle2, "blue");

            //при нажатии на кнопки-происходят события - смещаются рокетки
            document.addEventListener('keydown', function(event) {
                if (event.keyCode == 16 || event.which == 16) { // shift key
                    this.paddle1.speed = -10;
                }
                if (event.keyCode == 17 || event.which == 17) { // ctrl Key
                    this.paddle1.speed = 10;
                }
                if (event.keyCode == 38 || event.which == 38) { // up arrow
                    this.paddle2.speed = -10;
                }
                if (event.keyCode == 40 || event.which == 40) { // down arrow
                    this.paddle2.speed = 10;
                }
            }, false);

            //отпустили кнопку-событие перемещение останавливается
            document.addEventListener('keyup', function(event) {
                if (event.keyCode == 16 || event.which == 16) {
                    this.paddle1.speed = 0;
                }
                if (event.keyCode == 17 || event.which == 17) {
                    this.paddle1.speed = 0;
                }
                if (event.keyCode == 38 || event.which == 38) {
                    this.paddle2.speed = 0;
                }
                if (event.keyCode == 40 || event.which == 40) {
                    this.paddle2.speed = 0;
                }
            }, false);
        }

        Game.prototype.draw = function() {
            // очистить все в полотне canvas
            this.ctx.clearRect(0, 0, this.width, this.height);

            //рисуем корт
            this.ctx.fillStyle = "yelloy";
            this.ctx.fillStyle = '#fffb02';
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.strokeRect(0, 0, this.width, this.height);

            //рисуем рoкетки
            this.paddle1.draw(this.ctx);
            this.paddle2.draw(this.ctx);
        };

        Game.prototype.update = function() {
            if (this.paused)
                return;
            // this.paddle1.y += this.paddle1.speed;
            // this.paddle2.y += this.paddle2.speed;
        };

        //конструктор рокетки
        function Paddle(x, y, color, speedOfPaddle) {
            this.x = x;
            this.y = y;
            this.width = paddleWidth;
            this.height = paddleHeight;
            this.score = score;
            this.speed = speedOfPaddle;
            this.color = color;
        }

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
            this.radius = ball2Radius;

        }

        function draw_ball() {
            ctx.beginPath();
            ctx.arc(centerX, centerY, ball2Radius, 0, Math.PI * 2);
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'red';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.closePath();
            ctx.stroke();
        }



        var ball = new Ball();

        //запуск мяча в разном направлении
        // document.getElementById('btnStart').addEventListener('click', startBall);

        // function startBall() {
        //     ball.cy = 195;
        //     ball.cx = 295;
        //     if (Math.random() < 0.5) {
        //         var side = 1
        //     } else {
        //         var side = -1
        //     }

        //     ball.speedY = Math.random() * 2 + 3; //при старте мяча устанавливвем рандомную скорость по y
        //     ball.speedX = side * (Math.random() * 2 + 3); //при старте мяча устанавливвем рандомную скорость по x с меняющимся напрвлением влево либо право
        // };
        // //при нажатии на кнопки-происходят события - смещаются рокетки
        // document.addEventListener('keydown', function(event) {
        //     if (event.keyCode == 16 || event.which == 16) { // shift key
        //         paddle1.speed = -10;
        //     }
        //     if (event.keyCode == 17 || event.which == 17) { // ctrl Key
        //         paddle1.speed = 10;
        //     }
        //     if (event.keyCode == 38 || event.which == 38) { // up arrow
        //         paddle2.speed = -10;
        //     }
        //     if (event.keyCode == 40 || event.which == 40) { // down arrow
        //         paddle2.speed = 10;
        //     }
        // }, false);

        // //отпустили кнопку-событие перемещение останавливается
        // document.addEventListener('keyup', function(event) {
        //     if (event.keyCode == 16 || event.which == 16) {
        //         paddle1.speed = 0;
        //     }
        //     if (event.keyCode == 17 || event.which == 17) {
        //         paddle1.speed = 0;
        //     }
        //     if (event.keyCode == 38 || event.which == 38) {
        //         paddle2.speed = 0;
        //     }
        //     if (event.keyCode == 40 || event.which == 40) {
        //         paddle2.speed = 0;
        //     }
        // }, false);

        // document.getElementById('btnStart').addEventListener('click', function() {
        //     startGame();
        //     startBall();
        // })

        // function show() {
        //     paddle1.y += paddle1.speed; //нажатие кнопок-сработка события-изменение скорости рокеток-устанавливаем новое положение рокетки равное текщему положениею плюс изменение по скорости
        //     paddle2.y += paddle2.speed;

        //     ball.cy += ball.speedY; //при старте мяча-меняется скорость по X и Y- тем самым меняются позиции мяча по X и Y
        //     ball.cx += ball.speedX;

        //     //если позиция ракеток по y меньше 10-устанавливаем позицию по y  равную 0
        //     if (paddle1.y < 10) {
        //         paddle1.y = 0;
        //     }
        //     if (paddle2.y < 10) {
        //         paddle2.y = 0;
        //     }

        //     //если позиция рокетки по Y  большее или равно растоянию = высота корта минус высота ракетки - устанавливаем позицию по y  равную 400 минус высота рокетки
        //     if (paddle1.y >= courtHeight - paddle1.height) {
        //         paddle1.y = courtHeight - paddle1.height;
        //     }
        //     if (paddle2.y >= courtHeight - paddle2.height) {
        //         paddle2.y = courtHeight - paddle2.height;
        //     }

        //     //если позиция мяча по Y  меньше или равно 0(верхний край) либо больше или равно растоянию=высота поля минус высота мяча(нижний край)
        //     if (ball.cy - ball.radius <= 0 || ball.cy >= courtHeight - ball.radius) {
        //         ball.speedY = -ball.speedY; //меняем скорость  мяча на противоположное число
        //     }

        //     //от левого края до ширина ракетки1
        //     if (ball.cx - 10 <= paddle1.width) {
        //         if (ball.cy > paddle1.y && ball.cy < paddle1.y + paddle1.height) { //мяч находится в рамках высоты рокетки
        //             ball.speedX = -ball.speedX; //меняем скорость на противоположное число-отби 1вает мяч ракетка
        //         } else {
        //             paddle2.score++; //меняется счет
        //             StopFunction();
        //         };
        //     }

        //     //если больше или равно расcтояния = правый край минус ширина рокетки и минус ширина мяча
        //     if (ball.cx > courtWidth - 10 - paddle2.width) {
        //         if (ball.cy > paddle2.y && ball.cy < paddle2.y + paddle2.height) { //мяч находится в рамках высоты рокетки
        //             ball.speedX = -ball.speedX;
        //         } else {
        //             paddle1.score++;
        //             StopFunction();
        //         }
        //     }

        //     document.getElementById('score1').innerHTML = paddle1.score.toString();
        //     document.getElementById('score2').innerHTML = paddle2.score.toString();
        // }
        // startGame();

        // function startGame() {
        //     StopFunction();
        //     gameInterval = setInterval(show, 1000 / 50);
        // }

        // function StopFunction() {
        //     clearInterval(gameInterval);

        // }


    }
}())