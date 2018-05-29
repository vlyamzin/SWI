import {BaseController} from './base.controller';
import {user} from '../models/user.model';
import {Request, Response} from 'express';
import {player} from '../models/player.model';

/**
 * @class UserController
 * @classdesc Is responsible for creation and authentication a user
 * */
class UserController extends BaseController {

    protected api() {
        this._router.post('/signup', this.signUp);
        this._router.post('/login', this.login);
    }

    /**
     * Registers a new user
     *
     * @class UserController
     * @method signUp
     * @param {Request} req – Request Object.
     * @param {Response} res – Response Object.
     * @private
     * */
    private signUp(req: Request, res: Response): void {
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
    }

    /**
     * Authenticate a new user
     *
     * @class UserController
     * @method login
     * @param {Request} req – Request Object.
     * @param {Response} res – Response Object.
     * @private
     * */
    private login(req: Request, res: Response): void {
        user.authenticate(req.body.email, req.body.password)
            .then((user) => {
                req['session'].userId = user['_id'];
                player.getPlayerByUserId(user['_id'], req.body.gameName)
                    .then((data) => {
                        if (data) {
                            res.redirect('/');
                        } else {
                            res.status(200).send();
                        }
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(401).send();
            })
    }
}

export default new UserController().router;