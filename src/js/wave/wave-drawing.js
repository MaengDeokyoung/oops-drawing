import Wave from './wave.js';
import Moon from './moon.js';
import Ship from './ship.js';

const instaImage = new Image();
instaImage.src = './../../img/img_instagram_moon.png';

(() => {

    const wave1Amplitude = 10;
    const wave2Amplitude = 10;
    const wave3Amplitude = 10;


    const wave = document.getElementById('wave'),
        waveCtx = wave.getContext('2d', {alpha: false});

    const moon = Moon.init(waveCtx, wave.width / 2, 150, 20, instaImage);

    const wave1 = Wave.init(waveCtx, wave.width, wave.height,
        61, 0.005, 7, "#3A1D69", 19, 23);

    const wave2 = Wave.init(waveCtx, wave.width, wave.height,
        43, 0.007, 11, "#FFCF5B", 29, 31);

    const wave3 = Wave.init(waveCtx, wave.width, wave.height,
        33, 0.01, 5, "#1D87E2", 17, 37);

    const ship = Ship.init(waveCtx, wave.width / 2, 0);

    let frames = 0;

    var audio = document.querySelector('audio');

    var dataArray;
    var analyser;

    let startAudio = () => {
        audio.currentTime = 0;
        audio.play();

        var context = new AudioContext();
        var src = context.createMediaElementSource(audio);
        analyser = context.createAnalyser();

        src.connect(analyser);
        analyser.connect(context.destination);

        analyser.fftSize = 256;

        var bufferLength = analyser.frequencyBinCount;

        dataArray = new Uint8Array(bufferLength);
    };
    document.getElementById('wave').addEventListener('click', startAudio);
    document.getElementById('wave').addEventListener('touchend', startAudio);




    const drawAll = () => {

        waveCtx.clearRect(0, 0, wave.width, wave.height);
        waveCtx.fillStyle = '#EB0D7C';
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

        if(analyser) {
            analyser.getByteFrequencyData(dataArray);

            const adjustedWaveAmplitude = {
                0: 0,
                1: 0,
                2: 0
            };

            for(let j = 0 ; j < 3 ; j++) {
                for (let i = 30 * j ; i < 30 * (j + 1) + 1; i++) {
                    adjustedWaveAmplitude[j] += dataArray[i];
                }
            }


            wave1.amplitude = wave1Amplitude + adjustedWaveAmplitude[0] / 20;
            wave2.amplitude = wave2Amplitude + adjustedWaveAmplitude[1] / 20;
            wave3.amplitude = wave3Amplitude + adjustedWaveAmplitude[2] / 20;
        }

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

