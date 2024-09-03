import { UserDao } from "../lib/dao/user.dao";

export class UserService{
    static async RegisterUser(data: any){
        return await UserDao.RegisterUser(data);
    }  

    static async getUserByEmail(email: any){
        return await UserDao.getUserByEmail(email);
    }   
}