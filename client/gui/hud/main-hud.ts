import {GameState} from '../../logic/game-state';
import {Inject, Service} from 'typedi';

export interface IMainHUD {
    init: () => MainHUD
}

const CONTAINER_NAME = 'hud-container';

@Service()
export class MainHUD implements IMainHUD {
    private readonly hud: HTMLElement;
    @Inject()
    gameState: GameState;

    constructor() {
        this.hud = document.createElement('DIV');
        this.hud.id = 'hud';

        this.render();

    }

    public init(): MainHUD {
        this.gameState.state$.subscribe((data) => {
            console.log(data);
        });

        return this;
    }

    private render(): void {
        const container = document.getElementsByClassName(CONTAINER_NAME)[0];

        if (container) {
            container.appendChild(this.hud);
        } else {
            document.body.appendChild(this.hud);
        }
    }
}