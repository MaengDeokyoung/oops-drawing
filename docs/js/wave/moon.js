

export default class Moon {
    constructor() {
        this._context = null;
        this._radius = 0;
        this._x = 0;
        this._y = 0;
        this._image = null;
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

    static init(context, x, y, radius, image) {
        const moon = new Moon();
        moon._context = context;
        moon._radius = radius;
        moon._x = x;
        moon._y = y;
        moon._image = image;
        return moon;
    }

    draw(frames) {

        this._context.save();
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
        this._context.fillStyle = '#EB0D7C';
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
        this._context.restore();

        /*        this._context.save();
                this._context.beginPath();
                 this._context.drawImage(this._image, this._x - this._radius , this._y + Math.cos(frames / 40) * 5 - this._radius, 150, 150);
                 this._context.closePath();
                this._context.restore();*/
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
}