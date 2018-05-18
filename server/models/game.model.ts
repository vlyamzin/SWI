import {Model, Schema, Document, model} from 'mongoose';

export interface IGame {
    gameNumber: string,
    name: string
}

export interface IGameModel extends Document, IGame {}

/**
 * @class GameModel
 * @classdesc Game model. Contains all information about the running game.
 * */
class GameModel {
    private readonly schema: Schema;
    private _cache: IGame;
    public model: Model<IGameModel>;

    public static template(name?: string) {
        return {
            gameNumber: new Date().getTime().toString(),
            name: name || ''
        }
    }

    constructor() {
        this.schema = new Schema({
            gameNumber: {
                type: 'string',
                unique: true,
                required: true
            },
            name: {
                type: 'string',
                unique: true,
                require: true
            }
        });
        this._cache = null;

        this.model = model<IGameModel>('game', this.schema);
    }

    public get cache() {
        return this._cache;
    }

    public set cache(obj) {
        if (this._cache) {
            throw new Error('There is already cached template. Clear before update.')
        } else {
            this._cache = obj;
        }
    }

    public clearCache() {
        this._cache = null;
    }
}

export const game = new GameModel();
export function gameTemplate(name?: string): IGame {
    return GameModel.template(name);
}