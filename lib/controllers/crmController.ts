import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactController {

    public addNewContact = async (req: Request, res: Response) => {
        let newContact = new Contact(req.body);

        try {
            const contact = await newContact.save();
            res.json(contact);
        } catch (err) {
            res.send(err);
        }
    }

    public getContacts = async (req: Request, res: Response) => {
        try {
            const contacts = await Contact.find({});
            res.json(contacts);
        } catch (err) {
            res.send(err);
        }
    }

    public getContactWithID = async (req: Request, res: Response) => {
        try {
            const contact = await Contact.findById(req.params.contactId);
            res.json(contact);
        } catch (err) {
            res.send(err);
        }
    }

    public updateContact = async (req: Request, res: Response) => {
        try {
            const contact = await Contact.findOneAndUpdate(
                { _id: req.params.contactId },
                req.body,
                { new: true }
            );
            res.json(contact);
        } catch (err) {
            res.send(err);
        }
    }

    public deleteContact = async (req: Request, res: Response) => {
        try {
            await Contact.deleteOne({ _id: req.params.contactId });
            res.json({ message: 'Successfully deleted contact' });
        } catch (err) {
            res.send(err);
        }
    }
}
