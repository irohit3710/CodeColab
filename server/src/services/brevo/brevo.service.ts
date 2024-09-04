import { CONFIG } from "../../config/Environment";
import EmailLogService from "../email.logs.service";
const SibApiV3Sdk = require('@getbrevo/brevo');
const { v4: uuidv4 } = require('uuid');
export class BrevoService {
    static async sendEmail(email_data: { email: string, name: string }[], subject: string, htmlTemplate: any, userIds?: any[], template?: any) {

        let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        let apiKey = apiInstance.authentications['apiKey'];
        apiKey.apiKey = CONFIG.brevo.apikey;

        let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.subject = `${subject}` || ''
        sendSmtpEmail.bcc = email_data
        sendSmtpEmail.sender = { "name": CONFIG.brevo.sender, "email": CONFIG.brevo.sender };
        sendSmtpEmail.headers = { "Some-Custom-Name": uuidv4() };
        sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email.</h1></body></html>";
        sendSmtpEmail.replyTo = { email: "support@codecolab.com", name: "CODECOLAB" };

        try {
            console.log("sendSmtpEmail  : ",sendSmtpEmail);
            let response = await apiInstance.sendTransacEmail(sendSmtpEmail);
            await EmailLogService.create({
                userIds: userIds,
                html: htmlTemplate,
                to: [],
                file: '',
                template: template,
                subject: subject,
                bcc: email_data
            })
            return response
        } catch (error) {
            console.error(error);
            return false
        }

        // sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
        // sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};
    }
}