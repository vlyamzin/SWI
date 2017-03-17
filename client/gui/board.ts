export interface IBoard {
    draw(width: number, height: number);
}

export class Board {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    protected backgroundColor: string = "#000";

    constructor(protected width: number, protected height: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = this.backgroundColor;
        this.draw(width, height);
    }

    /**
     * Draw main game board
     * @param {number} w - width of the board
     * @param {number} h - height of the board
     * */
    public draw(w: number, h: number): void {
        this.canvas.width = w;
        this.canvas.height = h;
        this.context.fillRect(0, 0, w, h);
    }
}