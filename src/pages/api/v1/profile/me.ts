import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseDto } from "dto/apiResponseDto";
import { ProfileDto, UserProfileDto, AdminProfileDto } from "dto/rentn.dto";
import { prisma } from "config/prisma.connect";
import { findRentn } from "lib/check.db";
import { Secret, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { createAccessToken } from "lib/auth.token";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { headers } = req
        const authorization: any = headers.authorization?.split(' ')[1];
        if(!authorization){
          res.status(401).send({
            message: 'access token unavailable, access not granted'
          })
        }
        const payload = verify(
          authorization,
          process.env.ACCESS_TOKEN_SECRET as Secret
        )
        const {id, email } = payload as { id: string, email: string }
        const userExist = await findRentn(email)
        if(!userExist){
          return res.status(404).json({
            message: "oops, who are you? not allowed to make such request",
          });
        }
        const dateTime = new Date()
        const exactTimeDate = dateTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            second: 'numeric',
        });
        const profileData: ProfileDto = req.body;
        if(profileData.role === 'agent') {
          const createAgent = await prisma.agent.create({
            data: {
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              email: email,
              gender: profileData.gender,
              address: profileData.address,
              phoneNumber: profileData.phoneNumber,
              role: profileData.role,
              rentnId: id,
            }
          })
          const response: ApiResponseDto = {
            statusCode: 201,
            data: createAgent,
            date: exactTimeDate,
            url: req.url,
            message: "Profile completed successfully",
          };
          const atCookie = serialize(
            "rentn",
            createAccessToken(createAgent.agentId, createAgent.email, createAgent.role),
            {
                httpOnly: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 2, // expires in 2 days
                path: "/",
            }
          )
          res.setHeader("Set-Cookie", atCookie);
          res.status(201).json(response);
        }
        if(profileData.role === 'admin') {
          const adminData: AdminProfileDto = req.body
          const createAdmin = await prisma.admin.create({
            data: {
              email: email,
              address: adminData.address,
              phoneNumber: adminData.phoneNumber,
              username: adminData.username,
              gender: adminData.gender,
              rentnId: id
            }
          })
          const response: ApiResponseDto = {
            statusCode: 201,
            data: createAdmin,
            date: exactTimeDate,
            url: req.url,
            message: "Profile completed successfully",
          };
          const atCookie = serialize(
            "rentn",
            createAccessToken(createAdmin.id, createAdmin.email, createAdmin.role),
            {
                httpOnly: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 2, // expires in 2 days
                path: "/",
            }
          )
          res.setHeader("Set-Cookie", atCookie);
          res.status(201).json(response);
        }
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
    }
}