import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

/**
 * Constructor
 *
 * @class IndexRoute
 */
export class LoginRoute extends BaseRoute {

    /**
     * Create the routes.
     *
     * @class IndexRoute
     * @method create
     * @static
     */
    public static create(router: Router, pathToView?: string) {
        //log
        console.log("[LoginRoute::create] Creating login route.");

        router.get("/login", (req: Request, res: Response, next: NextFunction) => {
            new LoginRoute().index(req, res, next, pathToView);
        });
    }

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * The home page route.
     *
     * @class IndexRoute
     * @method index
     * @param req {Request} The express Request object.
     * @param res {Response} The express Response object.
     * @param next {NextFunction} NextFunction object.
     * @param pathToView {string} Physical location on the file
     * @next {NextFunction} Execute the next method.
     */
    public index(req: Request, res: Response, next: NextFunction, pathToView?: string) {
        this.render(req, res, `${pathToView}/login.html`);
    }
}