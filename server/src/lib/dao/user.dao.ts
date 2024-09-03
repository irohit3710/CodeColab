import userModel from "../../models/user.model";

export class UserDao{
    static async RegisterUser(data: any){
        return await userModel.create(data);
    }   

    static async getUserByEmail(email: any){
        return await userModel.findOne({email: email});
    }   

    static async getUserById(id: any){
        return await userModel.findById(id);
    }   

    
}