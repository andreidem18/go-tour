// Generated by https://quicktype.io

export interface HighlightedTour {
    id:          number;
    title:       string;
    description: string;
    image:       string;
    createdAt:   string;
    updatedAt:   string;
    tourId:      number;
    tour:        Tour;
}

export interface Tour {
    id:    number;
    price: string;
}
