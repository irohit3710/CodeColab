import express from "express";
import { CustomHelper } from "../helpers/custom.helper";
import { UserService } from "../services/user.service";
import { BrevoService } from "../services/brevo/brevo.service";
import { Mailer2 } from "../util/Mailer2";
export class AuthController{
    static async UserRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            if (!email || !username || !password) {
                return res.status(400).send('Something went wrong');
            }

            const hashedPassword = CustomHelper.createPasswordHash(password);

            const checkIfExist = await UserService.getUserByEmail(email);
            if(checkIfExist){
                return res.status(400).send("Looks like you already have an Account with us. Try Logging in!")
            }

            const otp = CustomHelper.generateRandomNDigitNumber(8);
            if(!otp){
                return res.status(400).send('Something went wrong');
            }

            const data = {
                email: email,
                username: username,
                password: hashedPassword,
                profile: req.body?.profile || '',
            }

            const registeredUser = await UserService.RegisterUser(data);
            if(!registeredUser){
                return res.status(400).send('User not registered');
            }

            const tempToken = CustomHelper.generateJwtToken(String(registeredUser._id));

            if (!tempToken) {
                return res.status(403).send("");
            }

            registeredUser.otp = otp;
            await registeredUser.save();

            const response = {
                userId: registeredUser._id,
                accessToken: tempToken,
                message: "User registered successfully",
            }
            const emailsData = [{email: email, name: username}];
            const emailSend = Mailer2.sendBulkEmailWithNames(emailsData, 'Verification for Code-Colab',null, [registeredUser._id], null);
            if (!emailSend) {
                return res.status(400).send("Sending Email Failed")
            }
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }

    static async UserLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            if (!email || !password) {
                return res.status(400).send('Something went wrong');
            }

            

            const checkIfExist= await UserService.getUserByEmail(email);
            if(!checkIfExist){
                return res.status(404).send('User not registered');
            }

            const isPassword = await CustomHelper.comparePasswordHash(checkIfExist.password, password);
            if (!isPassword) {
                return res.status(404).send("Invalid Credentials");
            }

            const token = CustomHelper.generateJwtToken(String(checkIfExist._id));
            const response = {
                userId: checkIfExist._id,
                accessToken: token
            }
            checkIfExist.lastLogin = new Date();
            await checkIfExist.save();
            res.status(200).send(response);
            res.status(200).send('User login successfully');
        } catch (error) {
            next(error);
        }
    }

    static async VerifyOtp(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const email = req.user.email;
            const otp = req.body.otp;
            if (!email || !otp) {
                return res.status(400).send('Something went wrong');
            }

            const checkIfExist = await UserService.getUserByEmail(email);
            if(!checkIfExist){
                return res.status(404).send('User not registered');
            }

            if(otp!=checkIfExist.otp){
                return res.status(400).send('Incorrect otp');
            }

            checkIfExist.verified = true;
            await checkIfExist.save();

            res.status(200).send('User verified successfully');
        } catch (error) {
            next(error);
        }
    }

    static async resetOtp(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const email = req.user.email;
            if (!email) {
                return res.status(400).send('Something went wrong');
            }

            const checkIfExist = await UserService.getUserByEmail(email);
            if(!checkIfExist){
                return res.status(404).send('User not registered');
            }

            const otp = await CustomHelper.generateRandomNDigitNumber(8);
            if(!otp){
                return res.status(400).send('Something went wrong');
            }

            checkIfExist.otp = otp;
            await checkIfExist.save();

            const response = {
                message: 'OTP reset and sent to your registered email',
                otp: otp,
            }
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }

    static async resendOtp(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const email = req.user.email;
            if (!email) {
                return res.status(400).send('Something went wrong');
            }

            const checkIfExist = await UserService.getUserByEmail(email);
            if(!checkIfExist){
                return res.status(404).send('User not registered');
            }

            const otp = checkIfExist.otp;
            if(!otp){
                return res.status(400).send('Something went wrong');
            }

            const response = {
                otp: otp,
            }
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    }

    






}