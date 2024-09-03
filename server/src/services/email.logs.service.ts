import EmailLogsDao from "../lib/dao/email.logs.dao";


export default class EmailLogService {
    static async create(payload: any){
        return await EmailLogsDao.create(payload);
    }

    static async getLogs(query:any, limit:number, skip: number){
        return await EmailLogsDao.getLogs(query, limit, skip);
    }

    static async count(query:any){
        return await EmailLogsDao.count(query);
    }

    static async getLogById(getLogById: any) {
        return await EmailLogsDao.getLogById(getLogById);
    }
}