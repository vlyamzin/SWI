import {ITileImage} from '../../gui/tileImages';
import {IPlayerCreateData} from '../services/player.service';

export type UUID = string;

/**
 * @class Player
 * @classdesc A player model
 * */
export class Player {
    private _id: UUID;
    private _name: string;
    private _color: string;
    private _race: number;
    private _runIndex: number;
    private _tileList: Array<ITileImage>;

    constructor(params: IPlayerCreateData) {
        this._id = new Date().getTime().toString();
        this._name = params.name;
        this._color = params.color;
        this._race = Number(params.race);
        this._runIndex = 1;
        this._tileList = params.tileList || [];
    }

    public get raceId(): number {
        return this._race;
    }

    public get tileList() {
        return this._tileList;
    }

    public set tileList(value: Array<ITileImage>) {
        this._tileList = value;
    }
}