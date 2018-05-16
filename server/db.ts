import {Connection} from 'mongoose';
import {game} from './models/game';

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
                console.log("Db connected");
                this._instance = res.connection;
            });

        if (this._instance) {
            console.log(`CouchDB is connected and running under ${constants.dbUrl}:${constants.dbPort}`);
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
    public getGamesList(): Promise<any> {
        return game.find({}, 'name')
            .then((data) => {
                return data.map((item) => {
                    return item.name;
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const db = Db.bootstrap();