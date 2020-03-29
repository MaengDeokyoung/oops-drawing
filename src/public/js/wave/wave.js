let adjustedMouseX = 0.5;
let adjustedMouseY = 0.5;
let slideValue = 0.5;

(() => {

    const pado = document.getElementById('pado'),
        padoCtx = pado.getContext('2d');

    const moon = document.getElementById('moon'),
        moonCtx = moon.getContext('2d');

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize(){
        pado.width = window.innerWidth;
        pado.height = window.innerHeight;
        moon.width = window.innerWidth;
        moon.height = window.innerHeight;
    }
    fitToWindowSize();

    let frames = 0;

    function drawMoon(){
        moonCtx.beginPath();
        moonCtx.arc(moon.width / 2 + Math.cos(frames / 1500) * (moon.width / 2 - 200), 200 + Math.cos(frames / 40) * 5, 100, 0, 2 * Math.PI, false);
        moonCtx.fillStyle = "hsl(60, " + (93 + Math.cos(frames / 23 ) * 7) + "%, " + (97 + Math.sin(frames / 53) * 3) +"%)";
        moonCtx.shadowColor = "#fff";
        moonCtx.shadowOffsetX = 0;
        moonCtx.shadowOffsetY = 0;
        moonCtx.shadowBlur = 50;
        moonCtx.lineWidth = 5;
        moonCtx.stroke();
        moonCtx.fill();
    }

    function drawPado(width, height, amplitude, frequency, vibrate, offset, color, k1, k2) {

        let y;
        let cycleValue;
        let cycleValue2;
        let w = width;
        let h = height;

        function drawPado() {
            let adjustedOffset = offset - amplitude - vibrate;
            padoCtx.fillStyle = color;
            padoCtx.beginPath();
            padoCtx.moveTo(0, h);
            cycleValue = Math.sin(frames / k1 / 3);
            cycleValue2 = Math.sin(frames / k2 / 3 * Math.PI);

            for (let x = 0; x < w; x++) {
                y = Math.sin(x * frequency - frames / 20) * amplitude * cycleValue2 * slideValue;
                y = y - ((x > adjustedMouseX && x < w + adjustedMouseX) ? (10 * Math.cos((x - adjustedMouseX) / width * 2 * Math.PI) - 10) * adjustedMouseY : 0);
                padoCtx.lineTo(x, y + (adjustedOffset + vibrate * cycleValue));
            }

            padoCtx.lineWidth = 3;

            padoCtx.lineTo(w, h);
            padoCtx.lineTo(0, h);
            padoCtx.stroke();
            padoCtx.fill();
        }

        drawPado();
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function f(m, p){
        return function(x){
            return 1 / Math.sqrt(2 * Math.PI * p * p) * Math.pow(Math.E, - Math.pow((x - m), 2) / (2 * Math.pow(p, 2)));
        }
    }

    let firstX = 0;
    let firstY = 0;
    let isMouseDown = false;

    pado.addEventListener('mousedown', function(e){
        isMouseDown = true;
        firstX = e.clientX;
        firstY = e.clientY;
        cancelAnimationFrame(resetUp);
        cancelAnimationFrame(resetDown);
    }, false);

    pado.addEventListener('mousemove', function(e){
        if(isMouseDown){
            let endX = pado.width / 2 - e.clientX;
            let endY = firstY - e.clientY;
            adjustedMouseY = - endY * 20 / (pado.height / 4);
            adjustedMouseX = - endX;
        }
    }, false);

    pado.addEventListener('mouseup', function(e){
        isMouseDown = false;
        reset();


    }, false);

    pado.addEventListener('mouseout', function(e){
        isMouseDown = false;
        reset();

    }, false);

    pado.addEventListener('touchstart', function(e){
        isMouseDown = true;
        firstX = e.touches[0].clientX;
        firstY = e.touches[0].clientY;
        cancelAnimationFrame(resetUp);
        cancelAnimationFrame(resetDown);
    }, false);

    pado.addEventListener('touchmove', function(e){
        if(isMouseDown){
            let endX = firstX - e.touches[0].clientX;
            let endY = firstY - e.touches[0].clientY;
            adjustedMouseY = - endY * 20 / (pado.height / 4);
            adjustedMouseX = - endX;
            console.log(adjustedMouseX);
        }
    }, false);

    pado.addEventListener('touchend', function(e){
        isMouseDown = false;
        reset();
    }, false);


    function resetUp(){
        if(adjustedMouseY < 0) {
            requestAnimationFrame(resetUp);
            adjustedMouseY+=2;
        }
    }

    function resetDown(){
        if(adjustedMouseY > 0) {
            requestAnimationFrame(resetDown);
            adjustedMouseY-=2;
        }
    }

    function resetLeft(){
        if(adjustedMouseX < 0) {
            requestAnimationFrame(resetLeft);
            adjustedMouseX += 10;
        }
    }

    function resetRight(){
        if(adjustedMouseX > 0) {
            requestAnimationFrame(resetRight);
            adjustedMouseX-= 10;
        }
    }

    function reset(){
        if(adjustedMouseY < 0) {
            resetUp();
        }
        if(adjustedMouseY > 0) {
            resetDown();
        }

        if(adjustedMouseX < 0) {
            resetLeft();
        }
        if(adjustedMouseX > 0) {
            resetRight();
        }
    }

    function drawAll() {
        requestAnimationFrame(drawAll);

        padoCtx.clearRect(0, 0, pado.width, pado.height);
        moonCtx.clearRect(0, 0, moon.width, moon.height);

        drawMoon();
        drawPado(pado.width, pado.height, 101, 0.005, 7, pado.height * 3 / 4, "rgba(71, 78, 161, 1)", 19 ,23);
        drawPado(pado.width , pado.height, 83, 0.01, 11, pado.height * 3 / 4, "rgba(110, 122, 255, 1)", 29, 31);
        drawPado(pado.width, pado.height, 73, 0.007, 5, pado.height * 3 / 4, "rgba(99, 104, 244, 1)", 17, 37);

        frames++;
    }
    drawAll();
})();

