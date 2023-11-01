export interface authType {
    isNewUser: boolean,
    verified: boolean;
    forgotPassword: boolean;
}

export interface listingType {
    name: string;
    community: string;
    houseType: string;
    address: string;
    description: string;
    price: string;
    tenure: string;
    features: {
        bedroom: boolean,
        toilet: boolean,
        guestRoom: boolean,
        parkingSpace: boolean
    };
    images: File[];
}

