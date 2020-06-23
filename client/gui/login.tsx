import {races} from '../logic/models/races';
import {colors} from '../logic/models/colors';
import React, {Component, SyntheticEvent} from 'react';
import {PlayerColorsEnum} from '../common/enums/player-colors.enum';
import {RacesEnum} from '../common/enums/races.enum';
import {Container} from 'typedi';
import {PlayerService} from '../logic/services/player.service';
import {GameState} from '../logic/game-state';

interface ILoginState {
    user: string,
    color: string,
    race: RacesEnum
}

/**
 * @ TODO Move it to client/login.tsx component
 * @class
 * @classdesc The login component. Manage creation and signing-in processes of the player.
 * */
export class Login extends Component<unknown, ILoginState>{
    private ps: PlayerService;
    private gs: GameState;

    constructor(props: unknown) {
        super(props);
        this.state = {
            user: '',
            color: colors.get(PlayerColorsEnum.Red).hash,
            race: RacesEnum.Wookiees
        };

        this.ps = Container.get(PlayerService);
        this.gs = Container.get(GameState);
    }

    /**
     * Render React component
     *
     * @class Login
     * @method render
     * @public
     * */
    public render(): JSX.Element {
        return <div className={'login-form'}>
            <label htmlFor="name">Name</label>
            <input type="text" id={'name'} value={this.state.user} onChange={e => this.onNameChanged(e)}/>
            <label htmlFor="color">Color</label>
            <select name="color" id="color" onChange={e => this.onColorChanged(e)} value={this.state.color}>
                {[...colors.values()].map((i) => {
                    return <option key={i.hash} value={i.hash}>{i.name}</option>
                })}
            </select>
            <label htmlFor="race">Race</label>
            <select name="color" id="color" onChange={e => this.onRaceChanged(e)} value={this.state.race}>
                {[...races.entries()].map((i) => {
                    return <option key={i[0]} value={i[0].toString()}>{i[1]}</option>
                })}
            </select>
            <button className={'submit'} onClick={this.submitPlayer}>Go</button>
        </div>;
    }

    /**
     * Name input event listener
     *
     * @class Login
     * @method onNameChanged
     * @param event – DOM event
     * @private
     * */
    private onNameChanged(event: SyntheticEvent<HTMLInputElement>): void {
        this.setState({user: event.currentTarget.value});
    }

    /**
     * Color input event listener
     *
     * @class Login
     * @method onColorChanged
     * @param event – DOM event
     * @private
     * */
    private onColorChanged(event: SyntheticEvent<HTMLSelectElement>): void {
        this.setState({color: event.currentTarget.value});
    }

    /**
     * Race input event listener
     *
     * @class Login
     * @method onRaceChanged
     * @param event – DOM event
     * @private
     * */
    private onRaceChanged(event: SyntheticEvent<HTMLSelectElement>): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const race: RacesEnum = RacesEnum[event.currentTarget.value];
        this.setState({race});
    }

    /**
     * Submit button event listener
     *
     * @class Login
     * @method submitPlayer
     * @private
     * */
    private submitPlayer = async (): Promise<void> => {
        const {user, color, race} = this.state;
        await this.ps.create({
            name: user,
            color: color,
            race: race
        });

        this.gs.createMap();
    }
}
