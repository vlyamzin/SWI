import * as React from 'react';
import * as constants from '../../../constants.json';

export interface PlayerLoginProps {
    onUserSubmit: Function
}

interface PlayerLoginState {
    signUp: boolean,
    restore: boolean,
    email: string,
    password: string
}

export class PlayerLogin extends React.Component<PlayerLoginProps, PlayerLoginState> {
    private apiHost: string;

    constructor(props) {
        super(props);

        this.state = {
            signUp: false,
            restore: false,
            email: '',
            password: ''
        };
        this.apiHost = `${constants['appUrl']}:${constants['appPortHttp']}`;
    }

    render() {
        return <div className={'login-form'}>
            <h3>Log under your account or create new one</h3>
            {this.getForm()}
        </div>
    }

    /**
     * Returns a template based on a state
     *
     * @class PlayerLogin
     * @method getForm
     * @return {JSX.Element | string} – A template
     * @private
     * */
    private getForm(): JSX.Element | string {
        if (this.state.signUp) {
            return <div>
                <label htmlFor="email">Email</label>
                <input className={'login-form__input'} type="email" value={this.state.email} onChange={e => this.onEmailChanged(e)}/>
                <label htmlFor="password">Password</label>
                <input className={'login-form__input'} type="password" value={this.state.password} onChange={e => this.onPwdChanged(e)}/>
                <button className={'login-form__btn'} onClick={() => this.onFormSubmit('signup')}>Sign Up</button>
                <button className={'login-form__smallBtn'} onClick={() => this.changeFormType('signin')}>Sign In</button>
            </div>
        } else if (this.state.restore) {
            return <div>
                <label htmlFor="email">Email</label>
                <input className={'login-form__input'} type="email" value={this.state.email} onChange={e => this.onEmailChanged(e)}/>
                <button className={'login-form__btn'} onClick={() => this.onFormSubmit('restore')}>Get password</button>
                <button className={'login-form__smallBtn'} onClick={() => this.changeFormType('signin')}>Back</button>
            </div>
        } else {
            return <div>
                <label htmlFor="email">Email</label>
                <input className={'login-form__input'} type="email" value={this.state.email} onChange={e => this.onEmailChanged(e)}/>
                <label htmlFor="password">Password</label>
                <input className={'login-form__input'} type="password" value={this.state.password} onChange={e => this.onPwdChanged(e)}/>
                <button className={'login-form__btn'} onClick={() => this.onFormSubmit('signin')}>Sign In</button>
                <button className={'login-form__smallBtn'} onClick={() => this.changeFormType('restore')}>Forgot password?</button>
                <button className={'login-form__smallBtn'} onClick={() => this.changeFormType('signup')}>Sign up</button>
            </div>
        }
    }

    /**
     * Input change listener. Stores an inputted email.
     *
     * @class PlayerLogin
     * @method onEmailChanged
     * @param {Object} event – DOM Event
     * @private
     * */
    private onEmailChanged(event): void {
        this.setState({email: event.target.value});
    }

    private onPwdChanged(event): void {
        this.setState({password: event.target.value});
    }

    private onFormSubmit(type: string): void {
        switch (type) {
            case 'signin':
                this.sendLoginRequest()
                    .then((user) => {
                        this.props.onUserSubmit(user);
                    });
                break;
            case 'signup':
                this.sendSignUpRequest()
                    .then((user) => {
                        this.props.onUserSubmit(user);
                    });
                break;
            case 'restore':
                break;
        }
    }

    private changeFormType(type: string): void {
        switch (type) {
            case 'signin':
                this.setState({signUp: false, restore: false});
                break;
            case 'signup':
                this.setState({signUp: true, restore: false});
                break;
            case 'restore':
                this.setState({signUp: false, restore: true});
                break;
        }
    }

    private sendLoginRequest(): Promise<any> {
        const reqParams: RequestInit = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        };

        return fetch(`${this.apiHost}/user/login`, reqParams)
            .then((res) => {
                if (res.ok) {
                    return 'ok';
                }

                console.log(`User authorisation is failed`);
            })
    }

    private sendSignUpRequest(): Promise<any> {
        const reqParams: RequestInit = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        };

        return fetch(`${this.apiHost}/user/signup`, reqParams)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                console.log(`User creation is failed`);
            })
    }
}