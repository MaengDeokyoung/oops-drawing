let [adjustedMouseX, adjustedMouseY, slideValue] = [0.5, 0.5, 0.5],
    [firstX, firstY] = [0, 0],
    isMouseDown = false;

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