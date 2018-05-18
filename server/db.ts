import {Connection} from 'mongoose';
import {game} from './models/game.model';

const mongoose = require('mongoose')
    , constants = require('../constants.json');


class Db {
    private _instance: Connection;

    /**
     * Bootstrap the database connector
     *
     * @class Db
     * @method bootstrap
     * @static
     * @public
     * @return {Object} Returns the database connector instance
     */
    public static bootstrap(): Db {
        return new Db();
    }

    constructor() {
        this._instance = mongoose.connect(`mongodb://${constants.dbUserName}:${constants.dbUserPwd}@${constants.dbUrl}`)
            .then((res) => {
                console.log(`MongoDB is connected and running under ${constants.dbUrl}`);
                this._instance = res.connection;
            });
    }

    /**
     * @TODO add return type
     * Returns a list of names of all games stored in CouchDB
     *
     * @class Db
     * @method getGameList
     * @public
     * @return {Promise}
     * */
    public getGamesList(): Promise<any> {
        return game.model.find({}, 'name')
            .then((data) => {
                return data.map((item) => {
                    return item.name;
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /**
     * @TODO add return type
     * Returns a game id based on provided name.
     *
     * @class Db
     * @method getGameIdByName
     * @param {string} name – A game name
     * @return {Promise} – A game id or null
     * @public
     * */
    public getGameIdByName(name: string): Promise<any> {
        return game.model.findOne({name: name}, '_id')
            .then((data) => {
                return data;
            })
    }
}

export const db = Db.bootstrap();