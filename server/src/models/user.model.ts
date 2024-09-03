import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
    email: string,
    username: string, 
    password: string,
    profile: string,
    lastLogin: Date,
    otp: number,
    verified: boolean,
}

const userSchema = new Schema<IUser>({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    profile: {type: String},
    lastLogin: {type: Date},
    otp: {type: Number},
    verified: {type: Boolean, default: false},
}, {
    collection: 'user',
    timestamps: true,
    versionKey: false
});

export default model<IUser>('user', userSchema);