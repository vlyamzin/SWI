import {Schema} from 'mongoose';
import {game} from './game.model';

export interface IPlayer {
    userId: string,
    name: string,
    color: string,
    race: string
}

export interface IPlayerModel {
    schema: Schema,

    createPlayer(gameName: string, player: IPlayer): Promise<IPlayer>,

    getPlayerByUserId(userId: string, gameName: string): Promise<IPlayer>
}

/**
 * @class PLayer
 * @classdesc It is a subdocument for Game Schema. That's why we don't create a separate model instance.
 * All APIs are represented withing class method, not in Mongoose Schema/Model layer
 * */
class Player implements IPlayerModel {
    private readonly _schema: Schema;

    constructor() {
        this._schema = new Schema({
            userId: {
                type: 'string',
                required: true
            },
            name: {
                type: 'string',
                required: true
            },
            color: {
                type: 'string',
                required: true
            },
            race: {
                type: 'string',
                required: true
            }
        }, {_id: false});
    }

    /**
     * Get Player Schema instance
     *
     * @class Player
     * @method schema
     * @getter
     * @return {Schema} A Schema instance
     * @public
     * */
    public get schema(): Schema {
        return this._schema;
    }

    /**
     * Creates a new Player inside a Game model
     *
     * @class Player
     * @method createPlayer
     * @param {string} gameName – The name of the game
     * @param {IPlayer} player – A player data
     * @return {Promise<IPlayer>} Promise with created player
     * */
    public createPlayer(gameName: string, player: IPlayer): Promise<IPlayer> {
        return game.model.findOneAndUpdate(
            {name: gameName},
            {players: player},
            {'new': true}
        )
            .then((game) => {
                return game.players.find(p => p.userId === player.userId)
            })
            .catch((err) => {
                return err;
            })
    }

    /**
     * Returns a player by provided id
     *
     * @class Player
     * @method getPlayerByUserId
     * @param {string} userId – Id of running user
     * @param {IPlayer} gameName – The name of the game
     * @return {Promise<IPlayer>} Promise with a player
     * */
    public getPlayerByUserId(userId: string, gameName: string): Promise<IPlayer> {
        return game.model.findOne(
            {'players.userId': userId, 'name': gameName}
        )
            .then((data) => {
                return data ? data.players[0] : null;
            })
            .catch((err) => {
                return err
            })
    }
}

export const player: IPlayerModel = new Player();