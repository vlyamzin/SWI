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
        imageList = new ImagePreloader<ITileImage>(TileImages.tiles);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.state = Container.get(GameState);
        this.ps = Container.get(PlayerService);

        this.init().catch(e => console.warn(e));
    }

    private async init(): Promise<void> {
        this.manageGameState();
        this.state.createPlayer();
        window.addEventListener('resize', this.resizeCanvas.bind(this), false);
        await imageList.imageLoaded;
        this.board = new Board(this.width, this.height);
    }

    /**
     * Observe the game state change and render the appropriate components
     */
    private manageGameState(): void {
        // TODO remove this. Login form must be a separate page/route
        const loginView = document.getElementById('login');

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

let imageList: ImagePreloader<ITileImage>;
const game = new Game();
export {imageList, game};     // it is singleton
