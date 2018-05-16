import {GameStateEnum} from '../common/enums/game-state.enum';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Service} from 'typedi';

export interface IGameState {

}

export interface IGameStateListener {
    GameStateListeners: Set<GameStateEnum>;
}

/**
 * @class GameState
 * @classdesc Keep information about GameState
 * */
@Service()
export class GameState implements IGameState {
    private state: BehaviorSubject<GameStateEnum>;
    public state$: Observable<GameStateEnum>;

    constructor() {
        this.state = new BehaviorSubject<GameStateEnum>(GameStateEnum.MAP_CREATION);
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