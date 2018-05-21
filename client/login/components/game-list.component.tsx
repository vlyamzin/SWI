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
            <div className={'login-form__games-list'}>
                {[...this.props.gameList].map((gameName, i) => {
                    return <div className={'login-form__game'} key={i}>{gameName}</div>
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

}