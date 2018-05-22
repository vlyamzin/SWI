import {Model, Schema, Document, model} from 'mongoose';
import {IPlayer, player} from './player.model';

export interface IGame {
    gameNumber: string,
    name: string,
    players?: Array<IPlayer>
}

export interface IGameDocument extends Document, IGame {}

export interface IGameModel extends Model<IGameDocument> {
    getGamesList(): Promise<string[]>,
    getGameByName(name: string): Promise<IGame>
}

/**
 * @class GameModel
 * @classdesc Game model. Contains all information about the running game.
 * */
class GameModel {
    private readonly schema: Schema;
    private _cache: IGame;
    public model: IGameModel;

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
            },
            players: [player.schema]
        });
        this._cache = null;

        this.schema.statics.getGamesList = this.getGamesList.bind(this);
        this.schema.statics.getGameByName = this.getGameByName.bind(this);

        this.model = model<IGameDocument, IGameModel>('game', this.schema);
    }

    public set cache(obj) {
        if (this._cache) {
            throw new Error('There is already cached template. Clear before update.')
        } else {
            this._cache = obj;
        }
    }

    /**
     * Returns a list of names of all games stored in CouchDB
     *
     * @class Db
     * @method getGameList
     * @public
     * @return {Promise}
     * */
    private getGamesList(): Promise<string[]> {
        return this.model.find({}, 'name')
            .then((data) => {
                return data.map((item) => {
                    return item.name;
                });
            })
            .catch((err) => {
                console.log(err);
                return err;
            })
    }

    /**
     * Returns a game id based on provided name.
     *
     * @class Db
     * @method getGameByName
     * @param {string} name – A game name
     * @return {Promise} – A game id or null
     * @public
     * */
    private getGameByName(name: string): Promise<IGame> {
        return game.model.findOne({name: name})
            .then((data) => {
                console.log('Test: ' + data);
                if (data) {
                    return data;
                }
            })
            .catch(err => {
                console.log(err);
                return err;
            })
    }
}

export const game = new GameModel();
export function gameTemplate(name?: string): IGame {
    return GameModel.template(name);
}