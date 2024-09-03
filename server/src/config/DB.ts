import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { CONFIG } from './Environment';
import { IServer } from '../lib/interfaces/IServer';
dotenv.config();

interface connectOptions {
    autoReconnect: boolean;
    loggerLevel?: string;
    reconnectTries: number; // Never stop trying to reconnect
    reconnectInterval: number;
    useNewUrlParser: Boolean;
};

// const connectOptions: mongoose.ConnectionOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// };


export class DB {
    static async connect(server?: IServer) {
        try {
            console.log("Connecting to DB");
            await mongoose.connect(
                CONFIG.DB_CONNECTION_STRING!, 
                // connectOptions
            );
            if (server) {
                server.isDbConnected = true;                
            }
            console.log('Connected to DB');            
        }
        catch (error) {
            throw error;
        }
    }
}