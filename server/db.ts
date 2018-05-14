import {ServerScope} from 'nano';

const nano = require('nano')
    , constants = require('../constants.json');


class Db {
    private readonly _instance: ServerScope;

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
        this._instance = nano(constants.dbUrl + ':' + constants.dbPort);
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
    public getGamesList(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            this._instance.db.list((err, body) => {
                if (err) {
                    reject(err);
                    return;
                }

                /*
                * remove CouchDB internal objects
                * */
                const result = body.filter((name) => {
                    return name[0] !== '_';
                });

                resolve(result);
            });
        })
    }
}

export const db = Db.bootstrap();