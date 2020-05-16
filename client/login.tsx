import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import constants from "../constants.json";

interface LoginState {
    gameList: Array<string>
}

/**
 * @class Login
 * @classdesc Game Login component
 * */
export class Login extends Component<{}, LoginState>{
    private apiHost: string;

    constructor(props) {
        super(props);

        this.state = {
            gameList: []
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
        return <div>
            <h1>Welcome to Start Wars Imperium</h1>
            <h3>Select a Game</h3>
            {[...this.state.gameList].map((gameName, i) => {
                return <div key={i}>{gameName}</div>
            })}
        </div>
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

                console.error('Can not load game list');
            })
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

