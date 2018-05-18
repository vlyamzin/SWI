import {Document, Model, Schema, model} from 'mongoose';

const bcrypt = require('bcrypt');

export interface IUser {
    email: string,
    password: string
}

export interface IUserDocument extends IUser, Document {}

export interface IUserModel extends Model<IUserDocument> {
    authenticate(email:string, password:string): Promise<IUser>
}

/**
 * class UserModel
 * @classdesc User model. Contains all information about the user.
 * */
class UserModel {
    private readonly schema: Schema;
    public model: IUserModel;

    constructor() {
        this.schema = new Schema({
            email: {
                type: 'string',
                unique: true,
                required: true,
                trim: true
            },
            password: {
                type: 'string',
                required: true
            }
        });

        this.schema.pre('save', function(next) {
            bcrypt.hash(this['password'], 10, (err, hash) => {
                if (err) {
                    return next(err);
                }
                this['password'] = hash;
                next();
            })
        });

        this.schema.statics.authenticate = this.authenticate.bind(this);

        this.model = model<IUserDocument, IUserModel>('user', this.schema);
    }

    /**
     * Compares a login/pass pares.
     *
     * @class UserModel
     * @method authenticate
     * @param {string} email – An email
     * @param {string} password – A password
     * @return {Promise<IUser>} A user if email/pass pare is correct
     * @private
     * */
    private authenticate(email: string, password: string): Promise<IUser> {
        return new Promise<IUser>((resolve, reject) => {
            this.model.findOne({email: email})
                .then((user: IUser) => {
                    if (!user) {
                        reject(new Error('User not found'));
                        return;
                    }

                    bcrypt.compare(password, user.password, (err, result) => {
                        if (result) {
                            resolve(user)
                        } else {
                            reject(new Error('Password is incorrect'));
                        }
                    });
                })
                .catch((err) => {
                    return err;
                });
        })

    }
}

export const user: IUserModel = new UserModel().model;