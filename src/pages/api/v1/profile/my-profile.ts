import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseDto } from "dto/apiResponseDto";
import { ProfileDto } from "dto/rentn.dto";
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
        console.log(authorization)
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
        // if(profileData.role === 'user') {
        //   const createUser = await prisma.users.create({
        //     data: {

        //     }
        //   })
        // }
        // if(profileData.role === 'admin') {
        //   const createAdmin = await prisma.admin.create({
        //     data: {

        //     }
        //   })
        // }
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
    }
}