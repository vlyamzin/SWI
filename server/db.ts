import {Connection} from 'mongoose';
import {game, IGame} from './models/game.model';

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
                this._instance = res.connection;
            });
    }

    /**
     * Initialize Database. We have to call any method to attach this module to the server. So
     * use this one for such purposes.
     * */
    public init() {
        if (this._instance) {
            console.log(`MongoDB is connected and running under ${constants.dbUrl}`);
        } else {
            console.log('MongoDB connection is lost');
        }
    }
}

export const db = Db.bootstrap();