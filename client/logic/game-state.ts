import {GameStateEnum} from '../common/enums/game-state.enum';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {singleton} from 'tsyringe';

export interface IGameStateListener {
    GameStateListeners: Set<GameStateEnum>;
}

/**
 * @class GameState
 * @classdesc Keep information about GameState
 * */
@singleton()
export class GameState {
    private state: BehaviorSubject<GameStateEnum>;
    public state$: Observable<GameStateEnum>;

    constructor() {
        this.state = new BehaviorSubject<GameStateEnum>(GameStateEnum.BOOTSTRAP);
        this.state$ = this.state.asObservable();
    }

    /**
     * Set game state when user create a character
     *
     * @class GameState
     * @method createPlayer
     * @public
     * */
    public createPlayer(): void {
        this.state.next(GameStateEnum.PLAYER_CREATION);
    }

    /**
     * Set game state when users crate a map
     *
     * @class GameState
     * @method createMap
     * @param {GameStateEnum} [param] - Particular state of map creation process
     * @public
     * */
    public createMap(param?: GameStateEnum): void {
        if (param) {
            this.state.next(param)
        } else {
            this.state.next(GameStateEnum.MAP_CREATION);
        }
    }

}
