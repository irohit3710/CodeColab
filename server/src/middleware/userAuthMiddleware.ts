import express from 'express';
import { UserDao } from "../lib/dao/user.dao";
import { Response } from '../util/Response';
import { CustomHelper } from '../helpers/custom.helper';

// Auth middleware
export function userAuthMiddleWare() {
    return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            if (!req.headers.authorization) {
                return res.status(401).send(new Response({}, "Invalid Token", 401));
            }

            const decoded = CustomHelper.verify(req.headers.authorization);
            const user = await UserDao.getUserById(decoded['id']);
            if (!user) {
                return res.status(401).send(new Response({}, "Unauthorized", 401));
            }

            req.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
}
