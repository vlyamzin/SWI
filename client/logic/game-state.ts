import {GameStateEnum} from '../common/enums/game-state.enum';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Service} from 'typedi';

export interface IGameState {

}

@Service()
export class GameState implements IGameState {
    private state: BehaviorSubject<GameStateEnum>;
    public state$: Observable<GameStateEnum>;

    constructor() {
        this.state = new BehaviorSubject<GameStateEnum>(GameStateEnum.BOOTSTRAP);
        this.state$ = this.state.asObservable();
    }

    /**
     * Set game state when users crate a map
     *
     * @class GameState
     * @method createMap
     * @public
     * */
    public createMap(): void {
        this.state.next(GameStateEnum.MAP_CREATION);
    }

}