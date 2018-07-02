import {IndexRoute} from './routes';
import * as express from 'express';
import {LoginRoute} from './routes/login';
import {Server} from './server';
import {Application} from 'express';
import GameController from './controllers/game.controller';
import UserController from './controllers/user.controller';
import PlayerController from './controllers/player.controller';
import {db} from './db';

const path = require('path')
    , logger = require('morgan')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , session = require('express-session')
    , MongoStore = require('connect-mongo')(session)
    , methodOverride = require('method-override')
    , errorHandler = require('errorhandler')
    , port = normalizePort(process.env.PORT || 8080)
    , constants = require('../constants.json');


export class StaticServer {
    public server: Application;


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

        this.server.use(cookieParser("May the force be with you")); // use cookie parser middleware
        // use session middleware
        this.server.use(session({
            secret: 'May the force be with you',
            cookie: {
                secure: false,
                httpOnly: false,
                maxAge: 1000 * 60* 72
            },
            resave: true,
            saveUninitialized: false,
            store: new MongoStore({
                url: `mongodb://${constants.dbUserName}:${constants.dbUserPwd}@${constants.dbUrl}`
            })
        }));
        this.server.use(function(req, res, next) {
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
            next();
        });
        // use override middleware
        this.server.use(methodOverride());

        // catch 404 and forward to error handler
        this.server.use(function(err, req, res, next) {
            err.status = 404;
            next(err);
        });

        this.server.use(errorHandler()); // error handling
        db.init();
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
        this.server.use('/api/games', GameController);
        this.server.use('/api/user', UserController);
        this.server.use('/api/player', PlayerController);
        // this.server.use('/api/player', requiresLogin, PlayerController);
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

/**
 * Session middleware. Check if user has an access to the particular api.
 * */
function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        const err = new Error('You must be logged in to view this page.');
        err['status'] = 401;
        return next(err);
    }
}

StaticServer.bootstrap(port);