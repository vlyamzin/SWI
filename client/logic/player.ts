import {Service} from 'typedi';

export class PlayerFactory {

    public create(id: number, name: string, color: string, race) {

    }
}

@Service({factory: [PlayerFactory, 'create']})
export class Player {
    private id: number;
    private name: string;
    private color: string;
    private race;

    constructor(container) {

    }
}