import {IndexRoute} from './routes';
import * as express from 'express';
import {LoginRoute} from './routes/login';
import {Server} from './server';
import {db} from './db';

const path = require('path')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , methodOverride = require('method-override')
    , errorHandler = require('errorhandler')
    , port = normalizePort(process.env.PORT || 8080)
    , constants = require('../constants.json');


export class StaticServer {
    public server: express.Application;


    /**
     * Bootstrap the static server
     *
     * @class StaticServer
     * @method bootstrap
     * @param {number} port
     * @static
     * @public
     * @return {StaticServer} The instance of the server
     * */
    public static bootstrap(port: number|string|boolean): StaticServer {
        return new StaticServer(port);
    }

    constructor(private port: number|string|boolean) {
        this.server = express();
        this.config();
        this.routes();
        this.api();

        this.server.listen(port, () => {
            console.log('Express server is running on port ' + port);
        });
    }

    /**
     * Setups server dependencies and configurations
     * @private
     * */
    private config(): void {
        this.server.use(express.static(path.join(__dirname, "www")));

        this.server.use(logger("dev")); // use logger middleware
        this.server.use(bodyParser.json()); // use json form parser middleware
        // use query string parser middleware
        this.server.use(bodyParser.urlencoded({
            extended: true
        }));

        this.server.use(cookieParser("SECRET_GOES_HERE")); // use cookie parser middleware
        // use override middleware
        this.server.use(methodOverride());

        // catch 404 and forward to error handler
        this.server.use(function(err, req, res, next) {
            err.status = 404;
            next(err);
        });

        this.server.use(errorHandler()); // error handling
    }

    /**
     * Subscribes to the list of routes
     * @private
     * */
    private routes(): void {
        const router = express.Router();

        LoginRoute.create(router, path.join(__dirname, 'www'));
        IndexRoute.create(router)
            .then(() => {
                Server.bootstrap(constants.appPortWS);
            });

        this.server.use(router);
    }

    private api(): void {
        this.server.get('/games', (req, res) => {
            db.getGamesList()
                .then((data) => {
                    res.send(data)
                })
        })
    }
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val): number | string | boolean {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

StaticServer.bootstrap(port);