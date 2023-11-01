import { prisma } from "config/prisma.connect";
import { ApiResponseDto } from "dto/apiResponseDto";
import { ResetDto } from "dto/rentn.dto";
import RentnResetPasswordProfile from "emails/templates/passwordReset";
import hashString from 'lib/hash.password.helper';
import { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import speakeasy from 'speakeasy';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const resetUserDetails: ResetDto = req.body

    const resend = new Resend(process.env.RESEND_RENTN_API_KEY)
    try {
        const dateTime = new Date()
        const exactTimeDate = dateTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            second: 'numeric',
        });
        const isUserExist = await prisma.rentn.findUnique({
            where: {
                email: resetUserDetails.email
            },
            select: {
                otp: true,
                secret: true,
                email: true,
            }
        })
        if (isUserExist === undefined || !isUserExist) {
            res.status(404).send({
                message: `sorry, this email ${resetUserDetails.email} does not exist or is not available`
            })
        } else {
            const verifyOtp = speakeasy.time.verify({
                secret: isUserExist?.secret,
                encoding: 'base32',
                algorithm: 'sha256',
                token: resetUserDetails.otp,
                step: 600,
                digits: 6,
                window: 1,
            })

            if (verifyOtp) {
                const updateAgentPassword = await prisma.rentn.update({
                    where: {
                        email: resetUserDetails.email
                    },
                    data: {
                        password: await hashString(resetUserDetails.password)
                    }
                })
                const emailContent = RentnResetPasswordProfile()
                await resend.sendEmail({
                    from: 'onboarding@resend.dev',
                    to: resetUserDetails.email,
                    subject: 'Rentn Password Account Confirmation',
                    react: emailContent,
                })
                const updatePasswordResponse: ApiResponseDto = {
                    statusCode: 200,
                    data: updateAgentPassword,
                    date: exactTimeDate,
                    url: req.url,
                    message: 'Password updated successfully'
                }
                return res.status(200).json(updatePasswordResponse);
            }
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