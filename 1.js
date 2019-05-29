(function() {

    const paddleHeight = 150;
    const paddleWidth = 15;
    const speedOfPaddle = 0;
    const positionYpaddle1 = 129.5;
    const positionXpaddle1 = 0;
    const positionYpaddle2 = 129.5;
    const positionXpaddle2 = 585;

    const ball2Radius = 30;


    const ballPosX = 295;
    const ballPosY = 195;
    const ballSpeedY = 0;
    const ballSpeedX = 0;

    const courtWidth = 600;
    const courtHeight = 400;
    const score = 0;

    let gameInterval = null;

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

    // создать svg tag
    const svg_container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_container.setAttribute("width", "600");
    svg_container.setAttribute("height", "400");
    svg_container.id = "containerCourt";
    var section = document.getElementById("section");
    section.appendChild(svg_container);


    //создаем корт
    var court = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    court.id = 'courtId';
    court.setAttribute("width", "600");
    court.setAttribute("height", "400");
    court.setAttribute("fill", "rgba(250, 250, 83, 0.89)");
    court.setAttribute("stroke", "none");
    //court.style.cssText = 'width: 600px;height:400px; margin:0; position:relative; border: solid rgb(95, 92, 92) 1px;  background-color: rgba(250, 250, 83, 0.89);';
    svg_container.appendChild(court);

    //создаем мяч
    var ballElem = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ballElem.id = 'ball';
    ballElem.setAttribute("cx", "295");
    ballElem.setAttribute("cy", "195");
    ballElem.setAttribute("r", "15px");
    ballElem.setAttribute("style", "fill:red;stroke:red; stroke-width:0.6%");
    svg_container.appendChild(ballElem);

    //создаем рокетку1
    var paddle1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paddle1.id = 'paddle1';
    paddle1.setAttribute("width", "15px");
    paddle1.setAttribute("height", "150px");
    paddle1.setAttribute("stroke", "rgb(95, 92, 92)");
    paddle1.setAttribute("stroke-width", "1px");
    paddle1.setAttribute("fill", "green");
    paddle1.setAttribute("y", "129.5");
    paddle1.setAttribute("x", "0");
    svg_container.appendChild(paddle1);

    //создаем рокетку2
    var paddle2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    paddle2.id = 'paddle2';
    paddle2.setAttribute("width", "15px");
    paddle2.setAttribute("height", "150px");
    paddle2.setAttribute("stroke", "rgb(95, 92, 92)");
    paddle2.setAttribute("stroke-width", "1px");
    paddle2.setAttribute("fill", "blue");
    paddle2.setAttribute("y", "129.5px");
    paddle2.setAttribute("x", "585");
    svg_container.appendChild(paddle2);


    //конструктор рокетки
    function Paddle(x, y) {
        this.x = x;
        this.y = y;
        this.width = paddleWidth;
        this.height = paddleHeight;
        this.score = score;
        this.speed = speedOfPaddle;
    }

    var paddle1 = new Paddle(positionXpaddle1, positionYpaddle1);
    var paddle2 = new Paddle(positionXpaddle2, positionYpaddle2);


    //конструктор мяча
    function Ball() {
        this.cx = ballPosX;
        this.cy = ballPosY;
        this.speedX = ballSpeedX;
        this.speedY = ballSpeedY;
        this.radius = ball2Radius;

    }
    var ball = new Ball();

    //запуск мяча в разном направлении
    document.getElementById('btnStart').addEventListener('click', startBall);

    function startBall() {
        ball.cy = 195;
        ball.cx = 295;
        if (Math.random() < 0.5) {
            var side = 1
        } else {
            var side = -1
        }

        ball.speedY = Math.random() * 2 + 3; //при старте мяча устанавливвем рандомную скорость по y
        ball.speedX = side * (Math.random() * 2 + 3); //при старте мяча устанавливвем рандомную скорость по x с меняющимся напрвлением влево либо право
    };

    //при нажатии на кнопки-происходят события - смещаются рокетки
    document.addEventListener('keydown', function(event) {
        if (event.keyCode == 16 || event.which == 16) { // shift key
            paddle1.speed = -10;
        }
        if (event.keyCode == 17 || event.which == 17) { // ctrl Key
            paddle1.speed = 10;
        }
        if (event.keyCode == 38 || event.which == 38) { // up arrow
            paddle2.speed = -10;
        }
        if (event.keyCode == 40 || event.which == 40) { // down arrow
            paddle2.speed = 10;
        }
    }, false);

    //отпустили кнопку-событие перемещение останавливается
    document.addEventListener('keyup', function(event) {
        if (event.keyCode == 16 || event.which == 16) {
            paddle1.speed = 0;
        }
        if (event.keyCode == 17 || event.which == 17) {
            paddle1.speed = 0;
        }
        if (event.keyCode == 38 || event.which == 38) {
            paddle2.speed = 0;
        }
        if (event.keyCode == 40 || event.which == 40) {
            paddle2.speed = 0;
        }
    }, false);

    document.getElementById('btnStart').addEventListener('click', function() {
        startGame();
        startBall();
    })

    function show() {
        paddle1.y += paddle1.speed; //нажатие кнопок-сработка события-изменение скорости рокеток-устанавливаем новое положение рокетки равное текщему положениею плюс изменение по скорости
        paddle2.y += paddle2.speed;

        ball.cy += ball.speedY; //при старте мяча-меняется скорость по X и Y- тем самым меняются позиции мяча по X и Y
        ball.cx += ball.speedX;

        //если позиция ракеток по y меньше 10-устанавливаем позицию по y  равную 0
        if (paddle1.y < 10) {
            paddle1.y = 0;
        }
        if (paddle2.y < 10) {
            paddle2.y = 0;
        }

        //если позиция рокетки по Y  большее или равно растоянию = высота корта минус высота ракетки - устанавливаем позицию по y  равную 400 минус высота рокетки
        if (paddle1.y >= courtHeight - paddle1.height) {
            paddle1.y = courtHeight - paddle1.height;
        }
        if (paddle2.y >= courtHeight - paddle2.height) {
            paddle2.y = courtHeight - paddle2.height;
        }

        //если позиция мяча по Y  меньше или равно 0(верхний край) либо больше или равно растоянию=высота поля минус высота мяча(нижний край)
        if (ball.cy - ball.radius <= 0 || ball.cy >= courtHeight - ball.radius) {
            ball.speedY = -ball.speedY; //меняем скорость  мяча на противоположное число
        }

        //от левого края до ширина ракетки1
        if (ball.cx - 10 <= paddle1.width) {
            if (ball.cy > paddle1.y && ball.cy < paddle1.y + paddle1.height) { //мяч находится в рамках высоты рокетки
                ball.speedX = -ball.speedX; //меняем скорость на противоположное число-отби 1вает мяч ракетка
            } else {
                paddle2.score++; //меняется счет
                StopFunction();
            };
        }

        //если больше или равно расcтояния = правый край минус ширина рокетки и минус ширина мяча
        if (ball.cx > courtWidth - 10 - paddle2.width) {
            if (ball.cy > paddle2.y && ball.cy < paddle2.y + paddle2.height) { //мяч находится в рамках высоты рокетки
                ball.speedX = -ball.speedX;
            } else {
                paddle1.score++;
                StopFunction();
            }

        }

        document.getElementById("paddle1").setAttribute('y', paddle1.y + "px")
        document.getElementById("paddle2").setAttribute('y', paddle2.y + "px")

        document.getElementById("ball").setAttribute('cx', ball.cx + "px")
        document.getElementById("ball").setAttribute('cy', ball.cy + "px")

        document.getElementById('score1').innerHTML = paddle1.score.toString();
        document.getElementById('score2').innerHTML = paddle2.score.toString();
    }
    startGame();

    function startGame() {
        StopFunction();
        gameInterval = setInterval(show, 1000 / 50);
    }

    function StopFunction() {
        clearInterval(gameInterval);

    }


}())