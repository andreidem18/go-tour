// Generated by https://quicktype.io

export interface Booking {
    id:           number;
    date:         string;
    peopleNumber: number;
    createdAt:    string;
    updatedAt:    string;
    userId:       number;
    tourId:       number;
    tour:         TourBooking;
}

export interface TourBooking {
    id:         number;
    name:       string;
    imageCover: string;
    price:      string;
    location:   LocationBooking;
}

export interface LocationBooking {
    country: string;
}