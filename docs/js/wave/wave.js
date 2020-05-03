(() => {

    const wave = document.getElementById('wave'),
        waveCtx = wave.getContext('2d', {alpha: false});

    let [adjustedMouseX, adjustedMouseY, slideValue] = [0.5, 0.5, 0.5],
        [firstX, firstY] = [0, 0],
        frames = 0,
        isMouseDown = false;

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize() {
        wave.width = window.innerWidth;
        wave.height = window.innerHeight;
    }

    fitToWindowSize();


    const drawMoon = () => {
        waveCtx.save();
        waveCtx.beginPath();
        waveCtx.arc(wave.width / 2 + Math.cos(frames / 1500) * (wave.width / 2 - 200), 200 + Math.cos(frames / 40) * 5, 75, 0, 2 * Math.PI, false);
        waveCtx.fillStyle = "hsl(60, " + (93 + Math.cos(frames / 23) * 7) + "%, " + (97 + Math.sin(frames / 53) * 3) + "%)";
        waveCtx.shadowColor = "#fff";
        waveCtx.shadowOffsetX = 0;
        waveCtx.shadowOffsetY = 0;
        waveCtx.shadowBlur = 50;
        waveCtx.lineWidth = 4;
        waveCtx.stroke();
        waveCtx.fill();
        waveCtx.closePath();
        waveCtx.restore();
    };

    const drawWave = (width, height, amplitude, frequency, vibrate, offset, color, k1, k2) => {

        let y;
        let cycleValue;
        let cycleValue2;
        let w = width;
        let h = height;
        let adjustedOffset = offset - amplitude - vibrate;

        waveCtx.save();
        waveCtx.beginPath();
        waveCtx.fillStyle = color;
        waveCtx.lineWidth = 4;
        waveCtx.moveTo(0, h);
        cycleValue = Math.sin(frames / k1 / 3);
        cycleValue2 = Math.sin(frames / k2 / 3 * Math.PI);

        for (let x = 0; x < w; x++) {
            y = Math.sin(x * frequency - frames / 20) * amplitude * cycleValue2 * slideValue;
            y = y - ((x > adjustedMouseX && x < w + adjustedMouseX) ? (10 * Math.cos((x - adjustedMouseX) / width * 2 * Math.PI) - 10) * adjustedMouseY : 0);
            waveCtx.lineTo(x, y + (adjustedOffset + vibrate * cycleValue));
        }

        waveCtx.lineTo(w, h);
        waveCtx.lineTo(0, h);
        waveCtx.stroke();
        waveCtx.fill();
        waveCtx.closePath();
        waveCtx.restore();
    };

    const drawShip = () => {
        waveCtx.save();
        waveCtx.beginPath();
        waveCtx.fillStyle = '#ff0000';
        waveCtx.lineWidth = 4;
        let bottomCenterX = wave.width / 2;
        let bottomCenterY = wave.height * 4 / 5 - 43;
        waveCtx.moveTo(bottomCenterX, bottomCenterY);
        waveCtx.lineTo(bottomCenterX + 50, bottomCenterY);
        waveCtx.lineTo(bottomCenterX + 60, bottomCenterY - 20);
        waveCtx.lineTo(bottomCenterX - 60, bottomCenterY - 20);
        waveCtx.lineTo(bottomCenterX - 50, bottomCenterY);
        waveCtx.lineTo(bottomCenterX, bottomCenterY);
        waveCtx.stroke();
        waveCtx.fill();
        waveCtx.closePath();
        waveCtx.restore();
    };

    const resetUp = () => {
        if (adjustedMouseY < 0) {
            requestAnimationFrame(resetUp);
            adjustedMouseY += 2;
        }
    };

    const resetDown = () => {
        if (adjustedMouseY > 0) {
            requestAnimationFrame(resetDown);
            adjustedMouseY -= 2;
        }
    };

    const resetLeft = () => {
        if (adjustedMouseX < 0) {
            requestAnimationFrame(resetLeft);
            adjustedMouseX += 10;
        }
    };

    const resetRight = () => {
        if (adjustedMouseX > 0) {
            requestAnimationFrame(resetRight);
            adjustedMouseX -= 10;
        }
    };

    const reset = () => {
        if (adjustedMouseY < 0) {
            resetUp();
        }
        if (adjustedMouseY > 0) {
            resetDown();
        }
        if (adjustedMouseX < 0) {
            resetLeft();
        }
        if (adjustedMouseX > 0) {
            resetRight();
        }
    };

    const waveEvent = {
        'mousedown': (e) => {
            isMouseDown = true;
            firstX = e.clientX;
            firstY = e.clientY;
            cancelAnimationFrame(resetUp);
            cancelAnimationFrame(resetDown);
        },
        'mousemove': (e) => {
            if (isMouseDown) {
                let endX = wave.width / 2 - e.clientX;
                let endY = firstY - e.clientY;
                adjustedMouseY = -endY * 20 / (wave.height / 4);
                adjustedMouseX = -endX;
            }
        },
        'mouseup': (e) => {
            isMouseDown = false;
            reset();
        },
        'mouseout': (e) => {
            isMouseDown = false;
            reset();
        },
        'touchstart': (e) => {
            isMouseDown = true;
            firstX = e.touches[0].clientX;
            firstY = e.touches[0].clientY;
            cancelAnimationFrame(resetUp);
            cancelAnimationFrame(resetDown);
        },
        'touchmove': (e) => {
            if (isMouseDown) {
                let endX = firstX - e.touches[0].clientX;
                let endY = firstY - e.touches[0].clientY;
                adjustedMouseY = -endY * 20 / (wave.height / 4);
                adjustedMouseX = -endX;
                console.log(adjustedMouseX);
            }
        },
        'touchend': (e) => {
            isMouseDown = false;
            reset();
        }
    };

    for(let eventName in waveEvent) {
        window.addEventListener(eventName, waveEvent[eventName], false);
    }


    const drawAll = () => {

        waveCtx.clearRect(0, 0, wave.width, wave.height);

        waveCtx.fillStyle = '#39418f';
        waveCtx.fillRect(0, 0, wave.width, wave.height);

        drawMoon();
        drawWave(wave.width, wave.height, 61, 0.005, 7, wave.height * 4 / 5, "rgba(71, 78, 161, 1)", 19, 23);
        drawShip();

        drawWave(wave.width, wave.height, 43, 0.007, 11, wave.height * 4 / 5, "rgba(99, 104, 244, 1)", 29, 31);
        drawWave(wave.width, wave.height, 33, 0.01, 5, wave.height * 4 / 5, "rgba(110, 122, 255, 1)", 17, 37);

        frames++;

        requestAnimationFrame(drawAll);
    };

    drawAll();
})();

