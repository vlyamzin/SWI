import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

import { IndexRoute } from "./routes/index";

/**
 * The server.
 *
 * @class Server
 */
export class Server {

    public app: express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {Object} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.app = express(); // create express js application
        this.config(); // configure application
        this.routes(); // add routes
        this.api(); // add api
    }

    /**
     * Create REST API routes
     *
     * @class Server
     * @method api
     */
    public api() {
        //empty for now
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     */
    public config() {
        //add static paths
        this.app.use(express.static(path.join(__dirname, "www")));

        this.app.use(logger("dev")); // use logger middleware

        this.app.use(bodyParser.json()); // use json form parser middleware

        // use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use(cookieParser("SECRET_GOES_HERE")); // use cookie parser middleware

        // use override middleware
        this.app.use(methodOverride());

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        this.app.use(errorHandler()); // error handling
    }

    /**
     * Create router
     *
     * @class Server
     * @method api
     */
    public routes() {
        let router: express.Router;

        router = express.Router();

        IndexRoute.create(router);

        this.app.use(router); // use router middleware
    }
}