

export default class Moon {
    constructor () {
        this._context = null;
        this._radius = 0;
        this._x = 0;
        this._y = 0;
    }

    static init = (context, x, y, radius) => {
        const moon = new Moon();
        moon._context = context;
        moon._radius = radius;
        moon._x = x;
        moon._y = y;
        return moon;
    };

    draw (frames) {
        this._context.save();
        this._context.beginPath();
        this._context.arc(this._x, this._y + Math.cos(frames / 40) * 5, this._radius, 0, 2 * Math.PI, false);
        this._context.fillStyle = "hsl(60, " + (93 + Math.cos(frames / 23) * 7) + "%, " + (97 + Math.sin(frames / 53) * 3) + "%)";
        this._context.shadowColor = "#fff";
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 50;
        this._context.fill();
        this._context.closePath();
        this._context.restore();

        this._context.save();
        this._context.beginPath();
        this._context.arc(this._x, this._y + Math.cos(frames / 40) * 5, this._radius, 0, 2 * Math.PI, false);
        this._context.lineWidth = 2;
        this._context.stroke();
        this._context.closePath();
        this._context.restore();
    };


    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }
}