import { Application, Request, Response } from "express";
import { EventController } from "../controllers/event-controller";

export class Routes {
    public eventController = new EventController();

    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'It works! :)'
                });
            });

        app.route('/event-types')
            .get(this.eventController.getEventTypes);
        app.route('/event')
            .get(this.eventController.getEvents)
            .post(this.eventController.addNewEvent);

        app.route('/event/:eventId')
            .get((req: Request, res: Response) => {
                this.eventController.getEventWithID(req, res);
            });
        // .put(this.eventController.updateevent)
        // .delete(this.eventController.deleteevent);
    }
}