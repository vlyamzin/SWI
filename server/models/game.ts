import {Model, Schema, Document, model} from 'mongoose';

export interface IGameModel extends Document {
    gameNumber: string,
    name: string
}

/**
 * @class Game
 * @classdesc Game model. Contains all information about the running game.
 * */
class Game {
    private readonly schema: Schema;
    public model: Model<IGameModel>;

    constructor() {
        this.schema = new Schema({
            gameNumber: {
                type: 'string',
                unique: true,
                required: true
            },
            name: {
                type: 'string',
                unique: true,
                require: true
            }
        });

        this.model = model<IGameModel>('game', this.schema);
    }
}

export const game: Model<IGameModel> = new Game().model;