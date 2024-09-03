import { BrevoService } from "../services/brevo/brevo.service"



export class Mailer2{
    static async sendBulkEmail(emails: string[], subject: any, htmlTemplate: any, userIds?: any[], template?: any){

        const email_data = emails.map((data: any) =>  {
            return {
                email: data.email,
                name: data.name
            }
        })

        return await BrevoService.sendEmail(email_data, subject, htmlTemplate, userIds, template)
    }

    static async sendBulkEmailWithNames(emails: {name: string, email: string}[], subject: any, htmlTemplate: any, userIds?: any[], template?: any){
        return await BrevoService.sendEmail(emails, subject, htmlTemplate, userIds, template)
    }
}