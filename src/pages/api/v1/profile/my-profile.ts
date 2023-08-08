import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseDto } from "dto/apiResponseDto";
import { ProfileDto, UserProfileDto, AdminProfileDto } from "dto/rentn.dto";
import { prisma } from "config/prisma.connect";
import { findRentn } from "lib/check.db";
import { Secret, verify } from "jsonwebtoken";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { cookies } = req
        const authorization: any = cookies.rentn
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
        const profileData: ProfileDto = req.body;
        if(profileData.role === 'agent') {
          const createAgent = await prisma.agent.create({
            data: {
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              gender: profileData.gender,
              address: profileData.address,
              phoneNumber: profileData.phoneNumber,
              role: profileData.role,
            }
          })
          const response: ApiResponseDto = {
            statusCode: 201,
            data: createAgent,
            date: new Date(),
            url: req.url,
            message: "Profile completed successfully",
          };
          res.status(201).json(response);
        }
        if(profileData.role === 'user') {
          const userData:UserProfileDto = req.body
          const createUser = await prisma.users.create({
            data: {
              email: userData.email,
              password: userData.password,
            }
          })
          const response: ApiResponseDto = {
            statusCode: 201,
            data: createUser,
            date: new Date(),
            url: req.url,
            message: "Profile completed successfully",
          };
          res.status(201).json(response);
        }
        if(profileData.role === 'admin') {
          const adminData: AdminProfileDto = req.body
          const createAdmin = await prisma.admin.create({
            data: {
              email: adminData.email,
              password: adminData.password
            }
          })
          const response: ApiResponseDto = {
            statusCode: 201,
            data: createAdmin,
            date: new Date(),
            url: req.url,
            message: "Profile completed successfully",
          };
          res.status(201).json(response);
        }
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
    }
}