import {Hex, IPoint} from "./hex"
import {GameMap, IMapCoord} from "../logic/map"
import {imageList} from '../index';
import {GameState, IGameStateListener} from '../logic/game-state';
import {Container} from 'typedi';
import {GameStateEnum} from '../common/enums/game-state.enum';
import {filter} from 'rxjs/operators/filter';


export interface IBoard {
    draw(width: number, height: number);
}

/**
 * Creates the main canvas in which the game is running
 * @class
 * @classdesc The main canvas
 * */
export class Board implements IGameStateListener{
    /**
     * @param {Set} – Describes what GameState statuses the class should subscribe for
     * @public
     * */
    GameStateListeners = new Set([
        GameStateEnum.MAP_CREATION,
        GameStateEnum.MAP_HOME_SYSTEM_SELECT
    ]);
    /**
     * @param {HTMLCanvasElement} - The main canvas object
     * @protected
     * */
    protected canvas: HTMLCanvasElement;
    /**
     * @param {CanvasRenderingContext2D} - The main canvas context
     * @protected
     * */
    protected context: CanvasRenderingContext2D;
    /**
     * @param {string} - The default background color
     * @protected
     * */
    protected backgroundColor = "#000";
    protected boardCenter: IPoint;
    protected hexSize: number;
    protected hexArray: Array<Hex> =[];
    protected mouseIsDown = false;
    protected prevX: number;
    protected prevY: number;
    private gameStateService: GameState;
    private gameState: GameStateEnum;

    constructor(protected width: number, protected height: number) {
        this.gameStateService = Container.get(GameState);
        this.canvas = <HTMLCanvasElement>document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = this.backgroundColor;
        this.hexSize = 64;

        this.boardCenter = {
            x: width/2,
            y: height/2
        };
        // this.draw(width, height);

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
        });

        this.canvas.addEventListener('DOMMouseScroll', this.zoom.bind(this),false);
        this.canvas.addEventListener('mousewheel', this.zoom.bind(this),false);
        this.gameStateService.state$
            .pipe(filter((gs: GameStateEnum) => {
                return this.GameStateListeners.has(gs);
            }))
            .subscribe((state) => {
                this.gameState = state;
                this.updateFromState(state);
            })
    }

    /**
     * Draw main game board
     *
     * @class Board
     * @method draw
     * @param {number} w - width of the board
     * @param {number} h - height of the board
     * @public
     * */
    public draw(w?: number, h?: number): void {
        this.canvas.width = w || window.innerWidth;
        this.canvas.height = h || window.innerHeight;

        this.hexArray.length = 0;

        let hex: Hex;
        
        for (let i = 0, lenCol = GameMap.sixMemberMap.length; i < lenCol; i += 1) {
            for (let j = 0, lenRow = GameMap.sixMemberMap[i].length; j < lenRow; j += 1) {
                // let index = Math.floor(Math.random() * (35 - 1) + 1); // temp solution
                // hex in the center
                if (i === 0) {
                    hex = new Hex(this.boardCenter, this.hexSize, GameMap.sixMemberMap[i][j], imageList.imageCollection[0]);
                    this.hexArray.push(hex);
                } else {
                    // new ring of hexes
                    if (j === 0) {
                        // find first hex from previous ring
                        // @TODO use ES6 find instead lodash
                        const startHex = this.hexArray.find( (h: Hex) => {
                            return h.getMapCoords.a === GameMap.sixMemberMap[i-1][j].a && h.getMapCoords.b === GameMap.sixMemberMap[i-1][j].b;
                        });

                        const newCoords = startHex.findNeighborCenterCoords(GameMap.sixMemberMap[i-1][j], GameMap.sixMemberMap[i][j], startHex.getCenter);
                        // hex = new Hex(newCoords, this.hexSize, GameMap.sixMemberMap[i][j]);
                        hex = this.createHex(i, j, newCoords);
                        this.hexArray.push(hex);
                    } else {
                        // hexes in the same ring
                        const newCoords = hex.findNeighborCenterCoords(GameMap.sixMemberMap[i][j-1], GameMap.sixMemberMap[i][j], hex.getCenter);
                        // hex = new Hex(newCoords, this.hexSize, GameMap.sixMemberMap[i][j]);
                        hex = this.createHex(i, j, newCoords);
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
     *
     * @class Board
     * @method pixelToHex
     * @param {Number} a - X coord of pixel
     * @param {Number} b - Y coord of pixel
     * @public
     * @return IMapCoord
     * */
    public pixelToHex(a: number, b: number): IMapCoord {
        const _a = a * 2/3 / this.hexSize,
            _b = (-a/3 + Math.sqrt(3)/3 * b) / this.hexSize;

        return Hex.hexRound(<IMapCoord>{a: _a, b: _b});
    }

    /**
     * Listen for Shift+Mouse Wheel event and change hex size
     *
     * @class Board
     * @method zoom
     * @param {WheelEvent} event - Mouse wheel event
     * @private
     * */
    private zoom(event: WheelEvent): void {
        if (event.shiftKey) {
            /**
             * zoom in/zoom out
             * */
            if (event.deltaY > 0) {
                this.hexSize = this.hexSize * 1.12;
            } else {
                this.hexSize = this.hexSize / 1.12;
            }

            this.draw();
        }
    }

    /**
     * Creates and returns a Hex object from provided parameters. Based on game status can update a Hex's properties
     *
     * @class Board
     * @method createHex
     * @param {number} i – first index in GameMap matrix
     * @param {number} j - second index in GameMap matrix
     * @param {IPoint} coords - pixel (x, y) coordinates of the center of Hex.
     * @return {Hex} – Hex object
     * @private
     * */
    private createHex(i: number, j: number, coords: IPoint): Hex {
        if (this.gameState === GameStateEnum.MAP_HOME_SYSTEM_SELECT) {
            const index = GameMap.sixMemberRaceTiles.findIndex((item) => {
                return item.a === GameMap.sixMemberMap[i][j].a && item.b === GameMap.sixMemberMap[i][j].b;
            });

            return new Hex(coords, this.hexSize, GameMap.sixMemberMap[i][j], null, index >= 0);
        } else {
            return new Hex(coords, this.hexSize, GameMap.sixMemberMap[i][j]);
        }
    }

    /**
     * Manages GameState status and redraws the Board accordingly
     *
     * @class Board
     * @method updateFromState
     * @param {GameStateEnum} state – GameState status
     * @private
     * @experimental
     * */
    private updateFromState(state: GameStateEnum): void {
        switch (state) {
            case GameStateEnum.MAP_CREATION:
                this.draw();
                break;
            case GameStateEnum.MAP_HOME_SYSTEM_SELECT:
                console.log('Board: Start Home System selecting');
                this.draw();
                break;
        }
    }
}
