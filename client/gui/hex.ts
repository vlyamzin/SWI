

export interface IPoint {
    x: number
    y: number
}

export class Hex {
    private corners: Array<IPoint> = [];

    constructor(protected center: IPoint, protected size){

        for (let i = 0; i < 6; i += 1) {
            this.corners.push(this.hexCorner(i));
        }
    }

    private hexCorner(i: number): IPoint {
        let angleDeg = 60 * i + 30;
        let angleRad = Math.PI/180 * angleDeg;

        return <IPoint>{
            x: this.center.x + this.size * Math.cos(angleRad),
            y: this.center.y + this.size * Math.sin(angleRad)
        }
    }

    public drawHex(canvas: CanvasRenderingContext2D): void {
        canvas.strokeStyle = '#fff';
        canvas.beginPath();
        this.corners.forEach((corner: IPoint, index: number) => {
            if (index === 0) {
                canvas.moveTo(corner.x, corner.y);
            } else {
                canvas.lineTo(corner.x, corner.y);
            }
        });
        canvas.closePath();
        canvas.stroke();
    }
}