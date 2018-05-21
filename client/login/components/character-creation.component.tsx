import {races} from '../../logic/models/races';
import {colors} from '../../logic/models/colors';
import * as React from 'react';
import {PlayerColorsEnum} from '../../common/enums/player-colors.enum';
import {RacesEnum} from '../../common/enums/races.enum';

interface CharacterCreationState {
    user: string,
    color: string,
    race: RacesEnum
}

/**
 * @class PlayerLogin
 * @classdesc The login component. Manage creation and signing-in processes of the player.
 * */
export class CharacterCreation extends React.Component<{}, CharacterCreationState>{

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            color: colors.get(PlayerColorsEnum.Red).hash,
            race: RacesEnum.Wookiees
        };
    }

    /**
     * Render React component
     *
     * @class PlayerLogin
     * @method render
     * @public
     * */
    public render() {
        const container = <div className={'login-form'}>
            <label htmlFor="name">Name</label>
            <input className={'login-form__input'} type="text" id={'name'} value={this.state.user} onChange={e => this.onNameChanged(e)}/>
            <label htmlFor="color">Color</label>
            <select className={'login-form__select'} name="color" id="color" onChange={e => this.onColorChanged(e)} value={this.state.color}>
                {[...colors.values()].map((i) => {
                    return <option key={i.hash} value={i.hash}>{i.name}</option>
                })}
            </select>
            <label htmlFor="race">Race</label>
            <select className={'login-form__select'} name="color" id="color" onChange={e => this.onRaceChanged(e)} value={this.state.race}>
                {[...races.entries()].map((i) => {
                    return <option key={i[0]} value={i[0].toString()}>{i[1]}</option>
                })}
            </select>
            <button className={'login-form__btn'} onClick={this.submitPlayer.bind(this)}>Go</button>
        </div>;

        return container;
    }

    /**
     * Name input event listener
     *
     * @class PlayerLogin
     * @method onNameChanged
     * @param event – DOM event
     * @private
     * */
    private onNameChanged(event): void {
        this.setState({user: event.target.value});
    }

    /**
     * Color input event listener
     *
     * @class PlayerLogin
     * @method onColorChanged
     * @param event – DOM event
     * @private
     * */
    private onColorChanged(event): void {
        this.setState({color: event.target.value});
    }

    /**
     * Race input event listener
     *
     * @class PlayerLogin
     * @method onRaceChanged
     * @param event – DOM event
     * @private
     * */
    private onRaceChanged(event): void {
        this.setState({race: event.target.value});
    }

    /**
     * Submit button event listener
     *
     * @class PlayerLogin
     * @method submitPlayer
     * @private
     * */
    private submitPlayer(): void {
        const {user, color, race} = this.state;
    }
}