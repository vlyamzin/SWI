import {Service} from 'typedi';
import {races} from '../logic/models/races';
import {colors} from '../logic/models/colors';
import * as elements from 'typed-html';
import {IViewEvents, Template} from '../utils/template';



@Service()
export class Login {
    private readonly events: IViewEvents;

    constructor() {
        this.events = {
            '.submit': [{'click': 'submitPlayer'}]
        }
    }

    public render() {
        const container = <div class={'login-form'}>
            <label for="name">Name</label>
            <input type="text" id={'name'}></input>
            <label for="color">Color</label>
            <select name="color" id="color">
                {[...colors.values()].map((i) => {
                    return <option value={i.hash}>{i.name}</option>
                })}
            </select>
            <label for="race">Race</label>
            <select name="color" id="color">
                {[...races.entries()].map((i) => {
                    return <option value={i[0].toString()}>{i[1]}</option>
                })}
            </select>
            <button class={'submit'}>Go</button>
        </div>;

        const parent = document.getElementById('login');
        Template.renderElement(container, parent);
        Template.attachEvents(this.events, this);

        return this;
    }

    public submitPlayer(e: Event): void {
        console.log(e);
        debugger;
    }
}