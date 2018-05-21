import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as constants from "../constants.json";
import {GameListComponent} from './login/components/game-list.component';
import {LoginStateEnum} from './login/enums/login-state.enum';
import {CharacterCreation} from './login/components/character-creation.component';
import {PlayerLogin} from './login/components/player-login.component';
import {IUser} from '../server/models/user.model';
import './assets/styles/login.scss'

interface LoginState {
    gameList: Array<string>,
    selectedGame: string,
    user: any,
    newGameName: string,
    loginState: LoginStateEnum
}

/**
 * @class Login
 * @classdesc Game Login component
 * */
export class Login extends React.Component<{}, LoginState>{
    private apiHost: string;

    constructor(props) {
        super(props);

        this.state = {
            gameList: [],
            newGameName: '',
            loginState: LoginStateEnum.GAMELIST,
            selectedGame: '',
            user: null
        };
        this.apiHost = `${constants['appUrl']}:${constants['appPortHttp']}`;
    }

    componentDidMount() {
        this.getGameList()
            .then((data) => {
                this.setState({gameList: data})
            })
    }

    render() {
        return <div className="login-container">
            <h1 className="login-title">Welcome to Start Wars Imperium</h1>
            {this.getComponentByState()}
        </div>
    }

    private getComponentByState(): JSX.Element | string {
        switch (this.state.loginState) {
            case LoginStateEnum.GAMELIST:
                return <GameListComponent gameList={this.state.gameList}
                                          newGameName={this.state.newGameName}
                                          storeNewGameName={this.storeNewGameName.bind(this)}
                                          submitNewGame={this.submitNewGame.bind(this)}/>;
            case LoginStateEnum.PLAYER:
                return <PlayerLogin onUserSubmit={this.userLoggedIn.bind(this)}></PlayerLogin>
            case LoginStateEnum.CHARACTER:
                return <CharacterCreation></CharacterCreation>

        }
    }

    /**
     * Load a list of games names
     *
     * @class Login
     * @method getGameList
     * @private
     * @return {Promise} Array with game names
     * */
    private getGameList(): Promise<string[]> {
        return fetch(`${this.apiHost}/games`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }

                throw new Error(response.statusText)
            })
    }

    /**
     * Input change listener. Saves data as a name of a new game.
     *
     * @class Login
     * @method storeNewGameName
     * @param {any} event – HTML input event
     * @private
     * */
    private storeNewGameName(event): void {
        this.setState({newGameName: event.target.value});
    }

    /**
     * Button click listener. Submit the creation of a new game.
     *
     * @class Login
     * @method submitNewGame
     * @private
     * */
    private submitNewGame(): void {
        const params: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.newGameName
            })
        };

        fetch(`${this.apiHost}/games/new`, params)
            .then((response) => {
                if (response.ok) {
                    return response.statusText;
                }

                throw new Error(response.statusText)
            })
            .then(() => {
                this.setState({loginState: LoginStateEnum.PLAYER})
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /**
     * Listens when a user is logged in. Proceed to the next step:
     * 1. Player creation form
     * 2. Game start
     *
     * @class Login
     * @method userLoggedIn
     * @param {IUser} user – user data
     * @private
     * */
    private userLoggedIn(user: IUser): void {
        if (this.state.selectedGame) {
            /* check if game is running but user is new.
            if yes – then show Character creation form.
            if no – proceed to main game instance */
        } else {

        }
    }
}

/**
 * @class Bootstrap
 * @classdesc Bootstraps a Login page. Renders React component
 * */
export class Bootstrap {
    constructor() {
        ReactDOM.render(
            <Login/>,
            document.getElementById('container')
        )
    }
}

new Bootstrap();
