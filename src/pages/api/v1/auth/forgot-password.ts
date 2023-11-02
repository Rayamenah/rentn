import { prisma } from 'config/prisma.connect'
import { ApiResponseDto } from 'dto/apiResponseDto'
import RentnSignUpEmail from 'emails/templates/signUp'
import { findRentn } from 'lib/check.db'
import OtpGenerator from 'lib/genOtp'
import { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.body
  try {
    const emailExits = await findRentn(email)
    if (!emailExits) {
      res.status(404).send({
        message: `sorry, this email ${email} does not exist or is not available`,
      })
    }
    const resend = new Resend(process.env.RESEND_RENTN_API_KEY)
    const { otp, secret } = await OtpGenerator()
    const updateAcct = await prisma.rentn.update({
      where: {
        email,
      },
      data: {
        otp: otp,
        secret: secret,
      },
    })
    const dateTime = new Date()
    const exactTimeDate = dateTime.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      second: 'numeric',
    })
    const emailContent = RentnSignUpEmail({
      rentnOtp: otp,
      email: email,
    })
    await resend.sendEmail({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Rentn Email Confirmation',
      react: emailContent,
    })
    const response: ApiResponseDto = {
      statusCode: 201,
      data: updateAcct,
      date: exactTimeDate,
      url: req.url,
      message: 'otp has been sent to your mail, please proceed to continue',
    }
    res.status(201).send(response)
  } catch (error: any) {
    console.log(error)
    console.log(error.message)
    return res.status(500).send({
      message: 'sever is currently unavailable',
      data: error.message,
    })
  }
}
