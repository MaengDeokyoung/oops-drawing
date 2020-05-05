export default class Wave {
    constructor () {
        this._context = null;
        this._width = 0;
        this._height = 0;
        this._amplitude = 0;
        this._frequency = 0;
        this._vibrate = 0;
        this._offset = 0;
        this._color = 0;
        this._k1 = 0;
        this._k2 = 0;
        this._shipBottomY = 0;
        this._adjustedMouseX = 0.5;
        this._adjustedMouseY = 0.5;
        this._slideValue = 1;
        this._cosine = 1;
        this._sine = 1
    }

    static init (context, width, height, amplitude, frequency, vibrate, color, k1, k2) {

        const wave = new Wave()

        wave._context = context;
        wave._width = width;
        wave._height = height;
        wave._amplitude = amplitude;
        wave._frequency = frequency;
        wave._vibrate = vibrate;
        wave._offset = wave._height * 4 / 5;
        wave._color = color;
        wave._k1 = k1;
        wave._k2 = k2;

        return wave;
    }

    static getCosineAndSine(x, y) {
        const bevel = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return {
            cosine:  x / bevel,
            sine: y / bevel
        }
    }

    draw (frames) {
        let y;
        let cycleValue;
        let cycleValue2;
        let w = this._width;
        let h = this._height;
        this._offset = h * 5 / 6;

        let adjustedOffset = this._offset - this._amplitude - this._vibrate;

        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = this._color;
        this._context.lineWidth = 4;
        this._context.moveTo(0, h);

        cycleValue = Math.sin(frames / this._k1 / 3);
        cycleValue2 = Math.sin(frames / this._k2 / 3 * Math.PI);

        const lineFraction = this._width / 10;

        let previousX = 0;
        let previousY = 0;

        for (let x = 0; x < w + lineFraction; x += lineFraction) {
            y = Math.sin(x * this._frequency - frames / 20) * this._amplitude * cycleValue2 * this._slideValue;
            y = y - ((x > this._adjustedMouseX && x < w + this._adjustedMouseX) ? (10 * Math.cos((x - this._adjustedMouseX) / this._width * 2 * Math.PI) - 10) * this._adjustedMouseY : 0);
            y = y + (adjustedOffset + this._vibrate * cycleValue);

            this._context.lineTo(x, y);

            if(Math.round(x / lineFraction) === Math.round(w / 2 / lineFraction)) {
                this._shipBottomY = y;
                let cosineAndSine = Wave.getCosineAndSine(x - previousX, y - previousY);
                this._cosine = cosineAndSine.cosine;
                this._sine = cosineAndSine.sine;
            }
            previousX = x;
            previousY = y;
        }

        this._context.lineTo(w, h);
        this._context.lineTo(0, h);
        this._context.stroke();
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    }

    get width() {
        return this._width;
    }

    set width(value) {
        this._width = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    }

    get shipBottomY() {
        return this._shipBottomY;
    }

    set shipBottomY(value) {
        this._shipBottomY = value;
    }

    get adjustedMouseX() {
        return this._adjustedMouseX;
    }

    set adjustedMouseX(value) {
        this._adjustedMouseX = value;
    }

    get adjustedMouseY() {
        return this._adjustedMouseY;
    }

    set adjustedMouseY(value) {
        this._adjustedMouseY = value;
    }

    get slideValue() {
        return this._slideValue;
    }

    set slideValue(value) {
        this._slideValue = value;
    }

    get cosine() {
        return this._cosine;
    }

    set cosine(value) {
        this._cosine = value;
    }

    get sine() {
        return this._sine;
    }

    set sine(value) {
        this._sine = value;
    }


    get amplitude() {
        return this._amplitude;
    }

    set amplitude(value) {
        this._amplitude = value;
    }


    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
}

