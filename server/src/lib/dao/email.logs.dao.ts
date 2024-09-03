import emailLogsModel, { IEmailSupport } from "../../models/email.logs.model";

export default class EmailLogsDao {
    static async create(payload: IEmailSupport){
        return await emailLogsModel.create(payload);
    }

    static async getLogs(query:any, limit:number, skip: number){
        return await emailLogsModel.find(query)
        .populate({
            path: "userIds",
            select: "name email"
        })
        .limit(limit).skip(skip);
    }

    static async count(query:any){
        return await emailLogsModel.find(query).countDocuments();
    }

    static async getLogById(getLogById: any) {
        return await emailLogsModel.findOne({_id: getLogById}).populate({
            path: "userIds",
            select: "name email"
        });
    }
}