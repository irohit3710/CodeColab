import { Router } from "express";
import { AuthController } from "../../controller/auth.controller";


export default class AuthRouter{
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes()
    }

    public routes(): void {
        this.router.post('/register', AuthController.UserRegister);
        this.router.post('/login', AuthController.UserLogin);
        this.router.post('/verify', AuthController.VerifyOtp);
        this.router.post('/resetOtp', AuthController.resetOtp);
        this.router.post('/resendOtp', AuthController.resendOtp);
    }
}