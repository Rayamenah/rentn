export interface RentnDto {
    email: string;
    password: string;
}

export interface VerifyOtpDto {
    email: string;
    otp: string;
}

export interface RentnLogin {
    email: string;
    password: string;
}

export enum Role {
    Agent = 'agent',
    User = 'user',
    Admin = 'admin'
}

export interface AgentProfileDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address?: string;
    gender: string;
}

export interface ProfileDto {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    gender: Gender;
    role: Role;
}

enum Gender {
    Male = 'Male',
    Female = 'Female',
}