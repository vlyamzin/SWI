import {Hex, IPoint} from "./hex"
import {GameMap, IMapCoord} from "./map"
import * as lodash from "lodash";


export interface IBoard {
    draw(width: number, height: number);
}

export class Board {
    protected canvas: HTMLCanvasElement;
    protected context: CanvasRenderingContext2D;
    protected backgroundColor: string = "#000";
    protected boardCenter: IPoint;
    protected hexSize: number;
    protected hexArray: Array<Hex> =[];
    protected mouseIsDown: boolean = false;
    protected prevX: number;
    protected prevY: number;

    constructor(protected width: number, protected height: number) {
        this.canvas = <HTMLCanvasElement>document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = this.backgroundColor;
        this.hexSize = 64;

        this.boardCenter = {
            x: width/2,
            y: height/2
        };
        this.draw(width, height);

        // listen click on the game board
        this.canvas.addEventListener('click', (event) => {
            if (event.shiftKey === false) {
                console.log(this.pixelToHex(event.pageX - this.boardCenter.x, event.pageY - this.boardCenter.y));
            }
        });

        this.canvas.addEventListener('mousedown', (event:MouseEventInit) => {
            this.mouseIsDown = true;
            this.prevX = event.clientX;
            this.prevY = event.clientY;
        });
        this.canvas.addEventListener('mouseup', () => {
            this.mouseIsDown = false;
        });
        this.canvas.addEventListener('mousemove', (event) => {
            if(event.shiftKey && this.mouseIsDown) {
                this.boardCenter.x = this.boardCenter.x + event.movementX * (Math.round(Math.sqrt(Math.pow(this.prevX - event.clientX, 2))/100));
                this.boardCenter.y = this.boardCenter.y + event.movementY* (Math.round(Math.sqrt(Math.pow(this.prevY - event.clientY, 2))/100));
                this.draw();
            }
        })
    }

    /**
     * Draw main game board
     * @param {number} w - width of the board
     * @param {number} h - height of the board
     * */
    public draw(w?: number, h?: number): void {
        this.canvas.width = w || window.innerWidth;
        this.canvas.height = h || window.innerHeight;

        this.hexArray.length = 0;

        let hex: Hex;
        
        for (let i = 0, lenCol = GameMap.sixMemberMap.length; i < lenCol; i += 1) {
            for (let j = 0, lenRow = GameMap.sixMemberMap[i].length; j < lenRow; j += 1) {
                // hex in the center
                if (i === 0) {
                    hex = new Hex(this.boardCenter, this.hexSize, GameMap.sixMemberMap[i][j]);
                    this.hexArray.push(hex);
                } else {
                    // new ring of hexes
                    if (j === 0) {
                        // find first hex from previous ring
                        let startHex = lodash.find(this.hexArray, (h: Hex) => {
                            return h.getMapCoords.a === GameMap.sixMemberMap[i-1][j].a && h.getMapCoords.b === GameMap.sixMemberMap[i-1][j].b;
                        });

                        let newCoords = startHex.findNeighborCenterCoords(GameMap.sixMemberMap[i-1][j], GameMap.sixMemberMap[i][j], startHex.getCenter);
                        hex = new Hex(newCoords, this.hexSize, GameMap.sixMemberMap[i][j]);
                        this.hexArray.push(hex);
                    } else {
                        // hexes in the same ring
                        let newCoords = hex.findNeighborCenterCoords(GameMap.sixMemberMap[i][j-1], GameMap.sixMemberMap[i][j], hex.getCenter);
                        hex = new Hex(newCoords, this.hexSize, GameMap.sixMemberMap[i][j]);
                        this.hexArray.push(hex);
                    }
                } 

                hex.drawHex(this.context);
            }
        }
    }

    /**
     * Transform pixel to the MapCoord object
     * Used to retrieve Hex by coord
     * */
    public pixelToHex(a, b) {
        let _a = a * 2/3 / this.hexSize,
            _b = (-a/3 + Math.sqrt(3)/3 * b) / this.hexSize;

        return Hex.hexRound(<IMapCoord>{a: _a, b: _b});
    }
}