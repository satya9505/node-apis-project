import { Request, Response, NextFunction, Application } from "express";
import { ContactController } from "../controllers/crmController";

export class Routes {
    public contactController: ContactController = new ContactController();

    public routes(app: Application): void {
        
        app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send({
                    message: 'GET request successful!!!!'
                });
            });
        
        // Contact 
        app.route('/contact')
            .get((req: Request, res: Response, next: NextFunction) => {
                // middleware
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                console.log(`Received key: ${req.query.key}`);

                //http://localhost:3000/contact?key=78942ef2c1c98bf10fca09c808d718fa3734703e add this url to get all contacts
                
                if (req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e') {
                    res.status(401).send('You shall not pass!');
                } else {
                    next();
                }
            }, this.contactController.getContacts)
            .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}
