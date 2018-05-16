import * as React from 'react';

export interface GameListProps {
    gameList: Array<string>,
    newGameName: string,
    storeNewGameName: Function,
    submitNewGame
}

/**
 * @class GameListComponent
 * @classdesc Renders a list of created games.
 * */
export class GameListComponent extends React.Component<GameListProps, {}> {

    render() {
        return <div className={'login-form'}>
            <h3>Select a Game</h3>
            {[...this.props.gameList].map((gameName, i) => {
                return <div key={i}>{gameName}</div>
            })}
            <input type="text" value={this.props.newGameName} onChange={(e) => {
                this.props.storeNewGameName(e)
            }}/>
            <button onClick={() => {
                this.props.submitNewGame()
            }}>New Game
            </button>
        </div>
    }

}