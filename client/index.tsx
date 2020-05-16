import {IBoard, Board} from './gui/board';
import {ImagePreloader} from './utils/imagePreloader';
import {TileImages, ITileImage} from './gui/tileImages';
import {MainHUD} from './gui/hud/main-hud';
import './assets/styles/main.scss'
import {GameState, IGameStateListener} from './logic/game-state';
import {Container} from 'typedi';
import {Login} from './gui/login';
import React from 'react';
import ReactDOM from 'react-dom';
import {GameStateEnum} from './common/enums/game-state.enum';
import {PlayerService} from './logic/services/player.service';
import {filter} from 'rxjs/operators/filter';

let imageList, game;

module UI {

    class Game implements IGameStateListener {
        GameStateListeners = new Set([
            GameStateEnum.BOOTSTRAP,
            GameStateEnum.PLAYER_CREATION,
            GameStateEnum.MAP_CREATION
        ]);
        public state: GameState;
        private id: number;
        private width: number;
        private height: number;
        private board: IBoard;
        private ps: PlayerService;

        constructor() {
            const loginView = document.getElementById('login');
            imageList = new ImagePreloader<ITileImage>(TileImages.tiles);
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.state = Container.get(GameState);
            this.ps = Container.get(PlayerService);


            this.state.state$
                .pipe(filter((gs: GameStateEnum) => {
                    return this.GameStateListeners.has(gs);
                }))
                .subscribe((s) => {
                    switch (s) {
                        case GameStateEnum.BOOTSTRAP:
                            /*@TODO show loading screen here */
                            console.log('Game is starting');
                            break;
                        case GameStateEnum.PLAYER_CREATION:
                            if (this.ps.player) {
                                this.state.createMap();
                            } else {
                                ReactDOM.render(
                                    <Login/>,
                                    loginView
                                );
                            }
                            break;
                        case GameStateEnum.MAP_CREATION:
                            loginView.classList.add('hidden');
                            ReactDOM.render(
                                <MainHUD/>,
                                document.getElementsByClassName('hud-container')[0]
                            );
                            break;
                    }
                });


            this.state.createPlayer();
            window.addEventListener('resize', this.resizeCanvas.bind(this), false);
            imageList.imageLoaded.then(() => {
                this.board = new Board(this.width, this.height);
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
