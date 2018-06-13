import * as React from 'react';
import * as constants from '../../../constants.json';

export interface GameListProps {
    gameList: Array<string>,
    setGame: Function,
    newGameName: string,
    storeNewGameName: Function,
    submitNewGame
}

/**
 * @class GameListComponent
 * @classdesc Renders a list of created games.
 * */
export class GameListComponent extends React.Component<GameListProps, {}> {
    private apiHost: string;

    constructor(props) {
        super(props);

        this.apiHost = `${constants['appUrl']}:${constants['appPortHttp']}`;
    }

    render() {
        return <div className={'login-form'}>
            <h3>Select a Game</h3>
            <div className={'login-form__games-list'}>
                {[...this.props.gameList].map((gameName, i) => {
                    return <div className={'login-form__game'} key={i}
                                onClick={() => this.pickGame({gameName})}>{gameName}</div>
                })}
            </div>
            <input className={'login-form__input'} type="text" placeholder="Enter name of new game" value={this.props.newGameName} onChange={(e) => {
                this.props.storeNewGameName(e)
            }}/>
            <button className={'login-form__btn'} onClick={() => {
                this.props.submitNewGame()
            }}>New Game
            </button>
        </div>
    }


    private pickGame (name): Promise<any> {
        name = name['gameName'].replace(' ', '-');
        const reqParams: RequestInit = {
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        return fetch(`${this.apiHost}/api/games/${name}`, reqParams)
            .then((res) => {
                if (res.ok) {
                    return this.props.setGame(name);
                }

                console.log(`Game request is failed`);
            })
            .catch((error) => console.log(error));
    }

}