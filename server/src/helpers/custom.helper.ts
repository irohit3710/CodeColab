import { CONFIG } from "../config/Environment";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class CustomHelper{
    static comparePasswordHash(hash: string, plainText: string) {
        return bcrypt.compareSync(plainText, hash);
    }

    static createPasswordHash(password: string) {
        let salt = bcrypt.genSaltSync(CONFIG.BCRYPT_SALT_ROUNDS);
        return bcrypt.hashSync(password, salt);
    }

    // Generate JWT token
    static generateJwtToken(userUUID: string) {
        return jwt.sign(
            {
                id: userUUID,
            },
            CONFIG.jwt.secret,
            { expiresIn: "40d" }
        );
    }

    static generateSupportJwtToken(userUUID: string) {
        return jwt.sign(
            {
                id: userUUID,
            },
            CONFIG.jwt.secret,
            { expiresIn: "15m" }
        );
    }

    static generateRefreshToken(userUUID: string) {
        return jwt.sign({
            id: userUUID,
        },
            CONFIG.jwt.refresh_token_secret);
    }

    static refreshToken(refreshToken: string) {
        return jwt.verify(refreshToken, CONFIG.jwt.refresh_token_secret, (err: any, user: any) => {
            if (err) return false;
            const accessToken = this.generateJwtToken(user.id);
            if (!accessToken) {
                return false;
            }
            return accessToken;
        });
    }

    static verify(header: any){
        const decoded = jwt.verify(header, CONFIG.jwt.secret) as any;
        return decoded;
    }

    static generateRandomNDigitNumber(n: number): number {
        if (n <= 0) {
            throw new Error("Number of digits must be greater than 0");
        }
    
        const min = Math.pow(10, n - 1); // Smallest n-digit number
        const max = Math.pow(10, n) - 1; // Largest n-digit number
    
        return Math.floor(min + Math.random() * (max - min + 1));
    }
}