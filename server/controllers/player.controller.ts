import {BaseController} from './base.controller';
import {IPlayer, player} from '../models/player.model';
import {Request, Response} from 'express';

/**
 * @class PlayerController
 * @classdesc Is responsible for creation a new player
 * */
class PlayerController extends BaseController {

    protected api() {
        this._router.post('/new', this.newPlayer)
    }

    /**
     * Creates a new player and starts a game.
     *
     * @class PlayerController
     * @method newPlayer
     * @param {Request} req – Request Object.
     * @param {Response} res – Response Object.
     * @private
     * */
    private newPlayer(req: Request, res: Response): void {
        const {name, color, race, gameName} = req.body;
        const data: IPlayer = {
            userId: req['session'].userId,
            name,
            color,
            race
        };

        player.createPlayer(gameName, data)
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                res.status(500).send(err);
            })
    }
}

export default new PlayerController().router;