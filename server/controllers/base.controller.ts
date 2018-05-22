import {Router} from 'express';

/**
 * @class BaseController
 * @classdesc Base class of all controllers. Creates the Express Router for the instance
 * of the Controller.
 * */
export class BaseController {
    protected readonly _router: Router;

    constructor() {
        this._router = Router();

        this.api();
    }

    public get router() {
        return this._router;
    }

    protected api() {}
}