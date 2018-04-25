import "reflect-metadata";
import {IBoard, Board} from './gui/board';
import {ImagePreloader} from './utils/imagePreloader';
import {TileImages, ITileImage} from './gui/tileImages';
import {IMainHUD, MainHUD} from './gui/hud/main-hud';
import './assets/styles/main.scss'
import {GameState} from './logic/game-state';
import {Container} from 'typedi';
import {Player} from './logic/player';
import {Login} from './gui/login';

let imageList, game;

module UI {

    class Game {
        private id: number;
        private width: number;
        private height: number;
        private board: IBoard;
        private hud: IMainHUD;
        private login: Login;
        private player: Player;
        public state: GameState;

        constructor() {
            imageList = new ImagePreloader<ITileImage>(TileImages.tiles);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.state = Container.get(GameState);
            this.hud = Container.get(MainHUD).init();
            this.login = Container.get(Login).render();



            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
            imageList.imageLoaded.then(() => {
                this.board = new Board(this.width, this.height);


                /*
                 * check if a new game
                 * if id exists on server, then load game from snapshot
                 * */
                if (this.id) {

                } else {
                    this.state.createMap();
                }
            });
        }

        /**
         * Resize the whole screen
         * */
        private resizeCanvas(): void {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.board.draw(this.width, this.height);
        }
    }

    game = new Game();

}
export {imageList, game};     // it is singleton