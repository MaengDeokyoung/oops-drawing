

export default class Moon {
    constructor() {
        this._context = null;
        this._radius = 0;
        this._x = 0;
        this._y = 0;
        this._color = '';
    }

    static roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        if (typeof stroke === 'undefined') {
            stroke = true;
        }
        if (typeof radius === 'undefined') {
            radius = 5;
        }
        if (typeof radius === 'number') {
            radius = { tl: radius, tr: radius, br: radius, bl: radius };
        } else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
    }

    static init(context, x, y, radius, color) {
        const moon = new Moon();
        moon._context = context;
        moon._radius = radius;
        moon._x = x;
        moon._y = y;
        moon._color = color;
        return moon;
    }

    draw(frames) {

        /*this._context.save();
        this._context.fillStyle = "hsl(60, " + (93 + Math.cos(frames / 23) * 7) + "%, " + (97 + Math.sin(frames / 53) * 3) + "%)";
        this._context.shadowColor = "#fff";
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 50;
        Moon.roundRect(this._context, this._x - this._radius - 30, this._y + Math.cos(frames / 40) * 5 - this._radius - 30, this._radius * 2 + 60, this._radius * 2 + 60, 50, true, false);
        this._context.restore();
         this._context.save();
        this._context.shadowColor = "#fff";
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 50;
        this._context.fillStyle = this._color;
        this._context.lineWidth = 2;
        Moon.roundRect(this._context, this._x - this._radius - 20, this._y + Math.cos(frames / 40) * 5 - this._radius - 20, this._radius * 2 + 40, this._radius * 2 + 40, 40, true, false);
        this._context.restore();
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
        this._context.arc(this._x + 21, this._y + Math.cos(frames / 40) * 5 - 21, 5, 0, 2 * Math.PI, false);
        this._context.fillStyle = "hsl(60, " + (93 + Math.cos(frames / 23) * 7) + "%, " + (97 + Math.sin(frames / 53) * 3) + "%)";
        this._context.shadowColor = "#fff";
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 50;
        this._context.fill();
        this._context.closePath();
        this._context.restore();*/

        this._context.save();
        this._context.beginPath();

        var rect = new Path2D();
        const p = new Path2D("M43.417,100,9.175,90.825,0,56.583V43.417L9.175,9.175,43.417,0H56.583L90.825,9.175,100,43.417V56.583L90.825,90.825,56.583,100ZM48.481,7.5,40.468,8.555,15.3,15.3,8.27,41.53,7.5,47.382v5.57l.684,5.2L15.3,84.7l27.615,7.4,3.034.4h8.1l3.034-.4L84.7,84.7l7.115-26.553.684-5.2V47.381l-.77-5.85L84.7,15.3,59.532,8.555,51.519,7.5ZM45.534,66.667,37.8,62.2l-4.466-7.735V45.534L37.8,37.8l7.735-4.466h8.932L62.2,37.8l4.466,7.735v8.932L62.2,62.2l-7.735,4.466ZM43.29,43.29l-2.456,4.254v4.913L43.29,56.71l4.254,2.456h4.912L56.71,56.71l2.456-4.254V47.544L56.71,43.29l-4.254-2.456H47.544ZM72.827,34.5l-2.321-1.34-1.34-2.321V28.16l1.34-2.321,2.321-1.34h2.679l2.321,1.34,1.34,2.321V30.84l-1.34,2.321L75.506,34.5Z");

        rect.addPath(p, {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: this._x - 50,
            f: this._y - 50 + Math.cos(frames / 40) * 5
        });

        this._context.shadowColor = this._color;
        this._context.shadowOffsetX = 0;
        this._context.shadowOffsetY = 0;
        this._context.shadowBlur = 20;

        this._context.lineWidth = 3;
        this._context.fillStyle = this._color;
        this._context.fill(rect);
        this._context.stroke(rect);
        this._context.closePath();
        this._context.restore();
    }

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

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
}