import Wave from './wave.js';
import Moon from './moon.js';
import Ship from './ship.js';

(() => {

    const wave = document.getElementById('wave'),
        waveCtx = wave.getContext('2d', {alpha: false});

    const moon = Moon.init(waveCtx, wave.width / 2, 150, 75);

    const wave1 = Wave.init(waveCtx, wave.width, wave.height,
        61, 0.005, 7, "rgba(71, 78, 161, 1)", 19, 23);

    const wave2 = Wave.init(waveCtx, wave.width, wave.height,
        43, 0.007, 11, "rgba(99, 104, 244, 1)", 29, 31);

    const wave3 = Wave.init(waveCtx, wave.width, wave.height,
        33, 0.01, 5, "rgba(110, 122, 255, 1)", 17, 37);

    const ship = Ship.init(waveCtx, wave.width / 2, 0);

    let frames = 0;

    const drawAll = () => {

        waveCtx.clearRect(0, 0, wave.width, wave.height);
        waveCtx.fillStyle = '#39418f';
        waveCtx.fillRect(0, 0, wave.width, wave.height);

        moon.draw(frames);
        wave1.draw(frames);
        ship.draw(frames);
        ship.shipBottomY = wave2.shipBottomY;
        wave2.draw(frames);
        wave3.draw(frames);

        ship._cosine = wave2._cosine;
        ship._sine = wave2._sine;
        frames++;

        requestAnimationFrame(drawAll);
    };

    window.addEventListener('resize', fitToWindowSize, false);

    function fitToWindowSize() {
        wave.width = window.innerWidth;
        wave.height = window.innerHeight;

        moon._x = wave.width / 2;
        wave1._width = wave.width;
        wave1._height = wave.height;
        wave2._width = wave.width;
        wave2._height = wave.height;
        wave3._width = wave.width;
        wave3._height = wave.height;
        ship._shipBottomX = wave.width / 2;
        ship._shipBottomY = wave2.shipBottomY;
    }

    fitToWindowSize();

    drawAll();


})();

