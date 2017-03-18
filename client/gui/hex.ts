import {IMapCoord} from './map';

export interface IPoint {
    x: number
    y: number
}



export class Hex {
    private corners: Array<IPoint> = [];
    private shiftX: number;
    private shiftY: number;

    constructor(protected center: IPoint, protected size, protected mapCoords: IMapCoord){
        this.shiftX = Math.sqrt(3)/2 * size;
        this.shiftY = size * 2 * 3/4;

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

    public findNeighborCenterCoords(curHex:IMapCoord, newHex: IMapCoord, oldCenter: IPoint): IPoint {
        let center: IPoint = {
            x: null,
            y: null
        };

        switch (Hex.direction(curHex, newHex)) {
            case 1:
                center.x = oldCenter.x - this.shiftX;
                center.y = oldCenter.y + this.shiftY;
                break;
            case 2:
                center.x = oldCenter.x + this.shiftX * 2;
                center.y = oldCenter.y;
                break;
            case 3:
                center.x = oldCenter.x + this.shiftX;
                center.y = oldCenter.y - this.shiftY;
                break;
            case 4:
                center.x = oldCenter.x - this.shiftX;
                center.y = oldCenter.y - this.shiftY;
                break;
            case 5:
                center.x = oldCenter.x - this.shiftX * 2;
                center.y = oldCenter.y;
                break;
            case 6:
                center.x = oldCenter.x - this.shiftX;
                center.y = oldCenter.y + this.shiftY;
                break;
            case 7:
            default:
                center.x = oldCenter.x + this.shiftX;
                center.y = oldCenter.y + this.shiftY;
        }

        return center;
    }

    private static direction(o: IMapCoord, n: IMapCoord): number {
        if (n.a < o.a && n.b > o.b) {
            return 1;
        }

        if (n.a > o.a && n.b === o.b) {
            return 2
        }

        if (n.a > o.a && n.b < o.b) {
            return 3
        }

        if (n.a === o.a && n.b < o.b) {
            return 4;
        }

        if (n.a < o.a && n.b === o.b) {
            return 5;
        }

        if (n.a < o.a && n.b > o.b) {
            return 6;
        }

        if (n.a === o.a && n.b > o.b) {
            return 7;
        }
    }

    public get getCenter(): IPoint {
        return this.center;
    }

    public get getMapCoords(): IMapCoord {
        return this.mapCoords;
    }
}