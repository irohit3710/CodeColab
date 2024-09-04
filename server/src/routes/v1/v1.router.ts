import { Router } from "express";
import AuthRouter from "./auth.router";




export default class V1Router {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes()
    }

    public routes(): void {
        this.router.use('/auth', new AuthRouter().router);
    }
}