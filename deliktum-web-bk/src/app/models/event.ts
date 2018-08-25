import { Location } from "./location";

export class Event {
    _id: string;
    description: string;
    type: string;
    dateTime: Date;
    location: Location;
    image: string;
}