export default class Ship {

    constructor() {
        this._context = null;
        this._shipBottomX = 0;
        this._shipBottomY = 0;
        this._cosine = 1;
        this._sine = 0;
    }

    static init(context, shipBottomX, shipBottomY) {
        const ship = new Ship();
        ship._context = context;
        ship._shipBottomX = shipBottomX;
        ship._shipBottomY = shipBottomY;
        return ship;
    }

    getPoint(x, y) {

        let adjustX = x - this._shipBottomX;
        let adjustY = y - this._shipBottomY;

        return [adjustX * this._cosine - adjustY * this._sine + this._shipBottomX,
            adjustX * this._sine + adjustY * this._cosine + this._shipBottomY];
    }


    draw() {
        this._context.save();
        this._context.beginPath();
        this._context.fillStyle = '#ff0000';
        this._context.lineWidth = 4;

        this._context.moveTo(this._shipBottomX, this._shipBottomY);
        this._context.lineTo(...this.getPoint(this._shipBottomX + 80, this._shipBottomY));
        this._context.lineTo(...this.getPoint(this._shipBottomX + 100, this._shipBottomY - 40));
        this._context.lineTo(...this.getPoint(this._shipBottomX - 100, this._shipBottomY - 40));
        this._context.lineTo(...this.getPoint(this._shipBottomX - 80, this._shipBottomY));
        this._context.lineTo(this._shipBottomX, this._shipBottomY);
        this._context.stroke();
        this._context.fill();
        this._context.closePath();
        this._context.restore();
    };

    set shipBottomY (shipBottomY) {
        this._shipBottomY = shipBottomY;
    }

    get shipBottomX() {
        return this._shipBottomX;
    }

    set shipBottomX(value) {
        this._shipBottomX = value;
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
}