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
export enum Gender {
    Male = 'male',
    Female = 'female',
}

export interface AgentProfileDto {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
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

export interface UserProfileDto {
    username: string;
    email: string;
    role: Role
    password: string;
}

export interface AdminProfileDto {
    username: string;
    email: string;
    password: string;
    role: Role
}

export interface ResetDto {
    email: string,
    otp: string
    password: string
}