import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { EventSchema } from '../schemas/event';
import { EventTypesSchema } from '../schemas/event-type';
import * as moment from 'moment';

const mongoEvent = mongoose.model('Event', EventSchema);
const mongoEventType = mongoose.model('EventType', EventTypesSchema);

export class EventController {

    public addNewEvent(req: Request, res: Response) {
        const newEvent = new mongoEvent(req.body);
        newEvent.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public getEventTypes(req: Request, res: Response) {
        mongoEventType.find({}, (err, event) => {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });
    }

    public getEvents(req: Request, res: Response) {
        const query = req.query;
        const type = query.type;
        const skip = +query.skip;

        const period = query.period;
        const filter = {};
        let minDate = null;

        if (period) {
            const now = moment();
            switch (period) {
                case 'all':
                    minDate = null;
                    break;
                case 'last-week':
                    minDate = now.subtract(1, 'weeks');
                    break;
                case 'last-month':
                    minDate = now.subtract(1, 'months');
                    break;
                case 'last-year':
                    minDate = now.subtract(1, 'years');
                    break;
            }

            if (minDate) {
                filter['dateTime'] = { '$gte': minDate.startOf('day').toDate() };
            }
        }

        if (type) {
            filter['type'] = type;
        }

        const mongoQuery = mongoEvent.find(filter).sort('dateTime');
        if (type || period) {            
            mongoQuery.skip(skip ? skip : 0).limit(10);
        }

        mongoEvent.find(filter).count().exec((err, count) => {
            if (err) {
                res.send(err);
            }

            mongoQuery.exec((err, events) => {
                if (err) {
                    res.send(err);
                }
                res.json({
                    data: events, total: count
                });
            });
        });
    }

    private getMinDateToFilter(period: string) {
        if (!period) {
            return null;
        }
        const now = moment();
        switch (period) {
            case 'all':
                return null;
            case 'last-week':
                return now.subtract(1, 'weeks').format();
            case 'last-month':
                return now.subtract(1, 'months').format();
            case 'last-year':
                return now.subtract(1, 'years').format();
            default:
                return null;
        }
    }

    public getEventWithID(req: Request, res: Response) {
        mongoEvent.findById(req.params.eventId, (err, event) => {
            if (err) {
                res.send(err);
            }
            res.json(event);
        });
    }

}