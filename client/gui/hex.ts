import {IMapCoord} from '../logic/map';

import {ITileImage} from "./tileImages";

export interface IPoint {
    x: number
    y: number
}

export interface ICube {
    x: number,
    z: number,
    y: number
}

export class Hex {
    private corners: Array<IPoint> = [];
    private readonly shiftX: number;
    private readonly shiftY: number;

    constructor(private center: IPoint, private size, private mapCoords: IMapCoord, private tile: ITileImage){
        this.shiftX = size * 2 * 3/4;
        this.shiftY = Math.sqrt(3)/2 * size;

        for (let i = 0; i < 6; i += 1) {
            this.corners.push(this.hexCorner(i));
        }
    }

    /**
     * Draw a Hex
     *
     * @class Hex
     * @method drawHex
     * @param {CanvasRenderingContext2D} canvas – Instance of Canvas
     * @public
     * */
    public drawHex(canvas: CanvasRenderingContext2D): void {
        canvas.drawImage(this.tile.image, this.corners[3].x, this.corners[4].y, this.size*2, this.size*1.734375);

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

    /**
     * Find coordinates of a center for the next hex based on coordinates of previous one
     *
     * @class Hex
     * @mathod findNeighborCenterCoords
     * @param {IMapCoord} curHex – Coordinates in the GameMap of the previous hex
     * @param {IMapCoord} newHex - Coordinates in the GameMap of the next hex
     * @param {IPoint} oldCenter – X and Y coordinates of the center of the previous hex
     * @return IPoint - X and Y coordinates of the center of the next hex
     * @public
     * */
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

    /**
     * X and Y coordinates of the center of hex
     *
     * @class Hex
     * @method getCenter
     * @return IPoint – X and Y coordinates
     * @public
     * */
    public get getCenter(): IPoint {
        return this.center;
    }

    /**
     * A and B coordinate of hex in Game Map object
     *
     * @class Hex
     * @method getMapCoords
     * @return IMapCoord – A and B coordinate
     * @public
     * */
    public get getMapCoords(): IMapCoord {
        return this.mapCoords;
    }

    /**
     * Convert Hex a,b coordinates to the Cube x,y,z
     *
     * @class Hex
     * @method hexToCube
     * @param {IMapCoord} coord – A and B coordinates in Game Map
     * @return ICube – Cube coordinates x,y,z
     * @public
     * */
    public static hexToCube(coord: IMapCoord): ICube {
        return {
            x: coord.a,
            z: coord.b,
            y: -coord.a-coord.b
        }
    }

    /**
     * Convert Cube x,y,z coordinates to the Hex a,b
     *
     * @class Hex
     * @method cubeToHex
     * @param {ICube} coord – X, Y, Z coordinates of Hex
     * @return IMapCoord – A and B coordinates in Game Map
     * @public
     * */
    public static cubeToHex(coord: ICube): IMapCoord {
        return { a: coord.x, b: coord.z };
    }

    /**
     * Round coordinates of the Hex as Cube to integer
     *
     * @class Hex
     * @method cubeRound
     * @param {ICube} coord – Raw coordinates
     * @return ICube – Rounded coordinates
     * @public
     * @static
     * */
    public static cubeRound(coord: ICube): ICube {
        let rx = Math.round(coord.x),
            ry = Math.round(coord.y),
            rz = Math.round(coord.z);

        let xDiff = Math.abs(rx - coord.x),
            yDiff = Math.abs(ry - coord.y),
            zDiff = Math.abs(rz - coord.z);

        if (xDiff > yDiff && xDiff > zDiff) {
            rx = -ry-rz;
        } else if (yDiff > zDiff) {
            ry = -rx-rz;
        } else {
            rz = -rx-ry;
        }

        return { x: rx, y: ry, z: rz };
    }

    /**
     * Round coordinates of the Hex to integer
     *
     * @class Hex
     * @method hexRound
     * @param {IMapCoord} coord – Raw coordinates
     * @return IMapCoord – Rounded coordinates
     * @public
     * @static
     * */
    public static hexRound(coord: IMapCoord): IMapCoord {
        return Hex.cubeToHex(Hex.cubeRound(Hex.hexToCube(coord)));
    }

    /**
     * Calculate a corner coordinates of Hex
     *
     * @class Hex
     * @method hexCorner
     * @param {Number} i – Vertex number
     * @return IPoint – X and Y coordinates
     * @private
     * */
    private hexCorner(i: number): IPoint {
        let angleDeg = 60 * i;
        let angleRad = Math.PI/180 * angleDeg;

        return <IPoint>{
            x: this.center.x + this.size * Math.cos(angleRad),
            y: this.center.y + this.size * Math.sin(angleRad)
        }
    }

    /**
     * Get a direction for the next sibling hexagon
     *
     * @class Hex
     * @method direction
     * @param {IMapCoord} o – A and B coordinates of the current Hex
     * @param {IMapCoord} n – A and B coordinates of the next Hex
     * @return Number – case of direction
     * @private
     * */
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


}