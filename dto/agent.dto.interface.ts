export interface CreateAgentDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
}
export interface Agents{
    email: string;
}

export interface AgentLoginDto {
    email: string;
    password: string;
}

export interface UpdateAgentDto {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
}

export enum ApartmentType{
    SELF_CONTAIN = 'self_contain',
    TWO_BEDROOM = 'two_bedroom',
    THREE_BEDROOM = 'three_bedroom',
    HOSTEL = 'hostel',
    BEDSITTER = 'bedsitter'
}

export interface ApartmentDto {
    address: string;
    name: string;
    community: string;
    apartmentType: ApartmentType
    features: string[]
    price: string;
    description: string;
    images?: string;
    tenure: number
}

