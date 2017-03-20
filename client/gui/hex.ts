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
        this.shiftX = size * 2 * 3/4;
        this.shiftY = Math.sqrt(3)/2 * size;

        for (let i = 0; i < 6; i += 1) {
            this.corners.push(this.hexCorner(i));
        }
    }

    private hexCorner(i: number): IPoint {
        let angleDeg = 60 * i;
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
            /*
            *      * *
            *     * x *
            *      y *
            * */
            case 1:
                center.x = oldCenter.x - this.shiftX;
                center.y = oldCenter.y + this.shiftY;
                break;
            /*
             *      * *
             *     * * *
             *      x y
             * */
            case 2:
                center.x = oldCenter.x + this.shiftX ;
                center.y = oldCenter.y + this.shiftY;
                break;
            /*
             *      * *
             *     * * y
             *      * x
             * */
            case 3:
                center.x = oldCenter.x + this.shiftX;
                center.y = oldCenter.y - this.shiftY;
                break;
            /*
             *      * y
             *     * * x
             *      * *
             * */
            case 4:
                center.x = oldCenter.x;
                center.y = oldCenter.y - this.shiftY * 2;
                break;
            /*
             *      y x
             *     * * *
             *      * *
             * */
            case 5:
                center.x = oldCenter.x - this.shiftX;
                center.y = oldCenter.y - this.shiftY;
                break;
            /*
             *      x *
             *     y * *
             *      * *
             * */
            case 6:
                center.x = oldCenter.x - this.shiftX;
                center.y = oldCenter.y + this.shiftY;
                break;
            /*
             *      * *
             *     x * *
             *      y *
             * */
            case 7:
            default:
                center.x = oldCenter.x;
                center.y = oldCenter.y + this.shiftY * 2;
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