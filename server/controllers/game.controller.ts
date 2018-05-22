import {Request, Response} from 'express';
import {game, gameTemplate} from '../models/game.model';
import {BaseController} from './base.controller';

/**
 * @class GameController
 * @classdesc Is responsible for creation or starting a Game.
 * */
class GameController extends BaseController {

    protected api() {
        this._router.get('/', this.gameList);
        this._router.get('/:name', this.getByName);
        this._router.post('/new', this.newGame);
    }

    /**
     * Returns a list of running games
     *
     * @class GameController
     * @method gameList
     * @param {Request} req – Request Object.
     * @param {Response} res – Response Object.
     * @private
     * */
    private gameList(req: Request, res: Response): void {
        game.model.getGamesList()
            .then((data) => {
                res.send(data);
            })
            .catch(() => {
                res.status(500).send('Game list is not defined')
            })
    }

    /**
     * Returns a game by it's name
     *
     * @class GameController
     * @method getGameByName
     * @param {Request} req – Request Object.
     * @param {Response} res – Response Object.
     * @private
     * */
    private getByName(req: Request, res: Response): void {
        const name = req.params.name.replace(/-/g, ' ');

        game.model.getGameByName(name)
            .then((data) => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('Can\'t find a game with such name')
                }
            })
    }

    /**
     * Verifies if a game name which is provided in a request is unique.
     * If yes - then proceed to authorisation
     *
     * @class GameController
     * @method newGame
     * @param {Request} req – Request Object.
     * @param {Response} res – Response Object.
     * @private
     * */
    private newGame(req: Request, res: Response): void {
        const g = gameTemplate(req.body.name);

        game.model.getGameByName(g.name)
            .then((data) => {
                if (data) {
                    res.status(400).send('There is a game with provided name')
                } else {
                    game.cache = g;
                    res.status(200).send('Ok');
                }
            })
    }
}

export default new GameController().router