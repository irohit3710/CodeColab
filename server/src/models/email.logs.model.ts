import { Schema, model, Document } from "mongoose";
import userModel from "./user.model";

export interface IEmailSupport extends Document {
    userIds?: Schema.Types.ObjectId[],
    html: string,
    to: {
        name: string,
        email: string
    }[]
    file: string,
    template?: string,
    subject: string,
    bcc: {
        name: string,
        email: string
    }[],
}

const emailSchema = new Schema<IEmailSupport>({
    userIds: [{
        type: Schema.Types.ObjectId, 
        ref: userModel
    }],
    html: String,
    to: [{
        email: String,
        name: String,
    }],
    file:String,
    template: {
        type: String,
    },
    subject: String,
    bcc: [{
        email: String,
        name: String,
    }],
}, {
    versionKey: false,
    timestamps: true,
    collection: "email-logs"
});

export default model<IEmailSupport>("email-logs", emailSchema)