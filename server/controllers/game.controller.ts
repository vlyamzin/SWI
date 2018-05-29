import {Request, Response} from 'express';
import {game, IGame} from '../models/game.model';
import {BaseController} from './base.controller';
import {player} from '../models/player.model';

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
                    GameController.checkAuthStatus(req, res, data);
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
        game.model.getGameByName(req.body.name)
            .then((data) => {
                if (data) {
                    res.status(400).send('There is a game with provided name')
                } else {
                    res.status(200);
                    if (req.hasOwnProperty('session') && req['session'].userId) {
                        res.send({
                            form: 'player'
                        })
                    } else {
                        res.send({
                            form: 'login'
                        })
                    }
                }
            })
    }

    /**
     * Verifies if user is logged in. Based on this verification proceeds with next step
     * 1. Go to login screen
     * 2. Go to player creation screen
     * 3. Start a game
     *
     * @class GameController
     * @method checkAuthStatus
     * @param {Request} req – Request Object
     * @param {Response} res - Response Object
     * @param {IGame} data – Information about a selected game
     * @private
     * @static
     * */
    private static checkAuthStatus(req: Request, res: Response, data: IGame): void {
        /*
        * If user is logged in (has a session id) –
        * 1. Check if a Player is assigned to this user
        * 2. If yes – start the game
        * 3. If no – go to player creation form
        *
        * If is not logged in
        * 1. Go to login form
        * */
        if (req.hasOwnProperty('session') && req['session'].userId) {
            player.getPlayerByUserId(req['session'].userId, data.name)
                .then((user) => {
                    console.log(user);
                    if (user) {
                        res.redirect('/');
                    } else {
                        res.status(200).send({
                            form: 'player',
                            game: data
                        })
                    }
                })
                .catch(() => {
                    res.status(200).send({
                        form: 'player',
                        game: data
                    });
                })
        } else {
            res.status(200).send({
                form: 'login',
                game: data
            })
        }
    }
}

export default new GameController().router