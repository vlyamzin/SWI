import {IndexRoute} from './routes';
import * as express from 'express';
import {LoginRoute} from './routes/login';
import {Server} from './server';
import {db} from './db';
import {game, gameTemplate} from './models/game.model';
import {user} from './models/user.model';

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
                    res.cookie('test', 'Some test value')
                        .send(data)
                })
                .catch(() => {
                    res.status(500).send('Game list is not defined')
                })
        });

        this.server.post('/games/new', (req, res) => {
            const g = gameTemplate(req.body.name);

            db.getGameIdByName(g.name)
                .then((data) => {
                    if (data) {
                        res.status(400).send('There is a game with provided name')
                    } else {
                        game.cache = g;
                        res.status(200).send('Ok');
                    }
                })
        });

        this.server.post('/user/signup', (req, res) => {
            const userData = {
                email: req.body.email,
                password: req.body.password
            };

            user.create(userData)
                .then(() => {
                    res.status(200).send(userData)
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send('Sign up failed');
                })
        });

        this.server.post('/user/login', (req, res) => {
            user.authenticate(req.body.email, req.body.password)
                .then((user) => {
                    req['session'].userId = user['_id'];
                    res.status(200).send();
                })
                .catch((err) => {
                    console.log(err);
                    res.status(401).send();
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