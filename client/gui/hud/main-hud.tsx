import {GameState, IGameStateListener} from '../../logic/game-state';
import {Container} from 'typedi';
import * as React from 'react';
import {GameStateEnum} from '../../common/enums/game-state.enum';
import {PlayerService} from '../../logic/services/player.service';
import {Tiles} from './tiles';
import {filter} from 'rxjs/operators';

/**
 * @class MainHUD
 * @classdesc MainHUD component. Is a base container for UI components. Located on the bottom of the screen
 * */
export class MainHUD extends React.Component<{}, {}> implements IGameStateListener{
    GameStateListeners = new Set([GameStateEnum.MAP_CREATION]);
    private readonly hud: HTMLElement;
    private gameStateService: GameState;
    private playerService: PlayerService;
    private gameState: GameStateEnum;

    constructor(props) {
        super(props);
        this.gameStateService = Container.get(GameState);
        this.playerService = Container.get(PlayerService);

        this.gameStateService.state$
            .pipe(filter((gs: GameStateEnum) => {
                return this.GameStateListeners.has(gs);
            }))
            .subscribe((data) => {
                this.gameState = data;
            });
    }

    /**
     * Render React component
     *
     * @class MainHUD
     * @method render
     * @public
     * */
    public render() {
        return (
            <div id="hud">
                <div className="main">
                    {this.hudContent()}
                </div>
            </div>
        )
    }

    /**
     * Render HUD content based on GameState status
     *
     * @class MainHUD
     * @method hudContent
     * @return JSX.Element | string
     * @private
     * */
    private hudContent(): JSX.Element|string {
        switch (this.gameState) {
            case GameStateEnum.MAP_CREATION:
                return this.getTiles();
        }
    }

    /**
     * Generate a list of tiles
     *
     * @class MainHUD
     * @method getTiles
     * @return JSX.Element
     * @private
     * */
    private getTiles(): JSX.Element {
        // @TODO this part should be rewritten cuz it brakes map creation process
        this.gameStateService.createMap(GameStateEnum.MAP_HOME_SYSTEM_SELECT);
        // @end todo
        return (
            <Tiles tiles={this.playerService.userTiles} splitRaceTile={true}></Tiles>
        )
    }
}