import Wave from './wave.js';
import Moon from './moon.js';
import Ship from './ship.js';

var audio = document.querySelector('audio');

(() => {

    const wave1Amplitude = 10;
    const wave2Amplitude = 10;
    const wave3Amplitude = 10;

    const wave = document.getElementById('wave'),
          waveCtx = wave.getContext('2d', { alpha: false });

    const moon = Moon.init(waveCtx, wave.width / 2, 150, 20, '');

    const wave1 = Wave.init(waveCtx, wave.width, wave.height, 61, 0.005, 7, "rgba(235, 13, 124, .6)", 19, 23);

    const wave2 = Wave.init(waveCtx, wave.width, wave.height, 43, 0.007, 11, "rgba(255, 207, 91, .6)", 29, 31);

    const wave3 = Wave.init(waveCtx, wave.width, wave.height, 33, 0.01, 5, "rgba(29, 135, 226, .6)", 17, 37);

    const ship = Ship.init(waveCtx, wave.width / 2, 0, '#cccccc');

    let frames = 0;

    var dataArray;
    var analyser;

    let play = () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    };
    let startAudio = async () => {
        play();
    };

    document.getElementById('wave').addEventListener('click', () => {
        startAudio();

        var context = new (window.AudioContext || window.webkitAudioContext)();
        var src = context.createMediaElementSource(audio);

        analyser = context.createAnalyser();

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;
        var bufferLength = analyser.frequencyBinCount;

        dataArray = new Uint8Array(bufferLength);
    });
    document.getElementById('wave').addEventListener('touchend', startAudio);

    const drawAll = () => {

        waveCtx.clearRect(0, 0, wave.width, wave.height);

        if (analyser) {
            analyser.getByteFrequencyData(dataArray);

            const adjustedWaveAmplitude = {
                0: 0,
                1: 0,
                2: 0
            };

            for (let j = 0; j < 3; j++) {
                for (let i = 30 * j; i < 30 * (j + 1) + 1; i++) {
                    adjustedWaveAmplitude[j] += dataArray[i];
                }
            }

            wave1.amplitude = wave1Amplitude + adjustedWaveAmplitude[0] / 20;
            wave2.amplitude = wave2Amplitude + adjustedWaveAmplitude[1] / 20;
            wave3.amplitude = wave3Amplitude + adjustedWaveAmplitude[2] / 20;
        }

        waveCtx.fillStyle = "rgb(" + wave2.amplitude / 2 + "," + wave3.amplitude / 2 + "," + wave1.amplitude / 2 + ")";
        ship.color = "rgb(" + wave3.amplitude * 4 + "," + wave1.amplitude / 4 + "," + wave2.amplitude * 4 + ")";
        moon.color = "rgb(" + wave1.amplitude + "," + wave2.amplitude + "," + wave3.amplitude + ")";

        waveCtx.fillRect(0, 0, wave.width, wave.height);
        moon.draw(frames);
        wave1.draw(frames);
        ship.draw(frames);
        ship.shipBottomY = wave2.shipBottomY;
        wave2.draw(frames);
        wave3.draw(frames);

        ship.cosine = wave2.cosine;
        ship.sine = wave2.sine;
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