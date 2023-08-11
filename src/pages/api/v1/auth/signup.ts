import { rentnSchemaValidator } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
import { RentnDto } from "dto/rentn.dto";
import { findRentn } from "lib/check.db";
import { prisma } from "config/prisma.connect";
import hashString from "lib/hash.password.helper";
import { ApiResponseDto } from "dto/apiResponseDto";
import { Resend } from "resend";
import RentnSignUpEmail from '../../../../../emails/templates/signUp';
import OtpGenerator from "lib/genOtp";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const ifError = rentnSchemaValidator(req.body)
    if (ifError) {
        return res.status(400).send({
            message: 'there is an error with your signup details',
            error: ifError,
            date: new Date(),
        })
    }
    const {otp, secret} = await OtpGenerator();
    const newUser: RentnDto = req.body;
    const resend = new Resend(process.env.RESEND_RENTN_API_KEY)
    try {
        const emailExits = await findRentn(newUser.email)
        if(!emailExits) {
            const createNewUser = await prisma.rentn.create({
                data: {
                    email: newUser.email,
                    password: await hashString(newUser.password),
                    secret: secret,
                    otp: otp,
                }
            })
            const dateTime = new Date()
            const exactTimeDate = dateTime.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                second: 'numeric',
            });
            const emailContent = RentnSignUpEmail({
                rentnOtp: otp,
                email: newUser.email
            });
            await resend.sendEmail({
                from: 'onboarding@resend.dev',
                to: newUser.email,
                subject: 'Rentn Email Confirmation',
                react: emailContent,
            });
            const response:ApiResponseDto = {
                statusCode: 201,
                data: createNewUser,
                date: exactTimeDate,
                url: req.url,
                message: 'you have successfully created an account, please check your email to complete profile',
            }; 
            res.status(201).send(response)
        } else {
            res.status(400).send({
                message: 'user with this email already exist'
            })
        }
    } catch (error: any) {
        console.log(error)
        console.log(error.message)
        return res.status(500).send({
            message: 'sever is currently unavailable',
            data: error.message
        })
    }
}