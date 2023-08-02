import { NextApiRequest, NextApiResponse } from "next";
import { ApiResponseDto } from "dto/apiResponseDto";
import jwt from 'jsonwebtoken';
import { ProfileDto } from "dto/rentn.dto";
import { prisma } from "config/prisma.connect";
import { findRentn } from "lib/check.db";
import { Secret, verify } from "jsonwebtoken";
import { uuid } from "uuidv4";

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
        // const token: any = authorization?.split('')[1]
        // console.log(token, "this is the token ::::")
        // const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret )
        // console.log(decode, "this is the decode :::")
        const {id, email } = payload as { id: string, email: string }

        console.log(email)
        // ensure that the user exist
        const userExist = await findRentn(email)
        if(!userExist){
          return res.status(404).json({
            message: "oops, who are you? not allowed to make such request",
          });
        }
        const profileString = uuid()
        const profileData: ProfileDto = req.body;
        // const createProfile = await prisma.profile.create({
        //     data: {
        //         firstName: profileData.firstName,
        //         lastName: profileData.lastName,
        //         gender: profileData.gender,
        //         role: profileData.role,
        //         phoneNumber: profileData.phoneNumber,
        //     }
        // })
        // switch (profileData.role) {
        //     case 'Agent':
        //       await prisma.agent.create({
        //         data: {
        //           profile: {
        //             connect: {
        //               profileId: createProfile.profileId,
        //             },
        //           },
        //         },
        //       });
        //       break;
        //     case 'User':
        //       await prisma.users.create({
        //         data: {
        //           profile: {
        //             connect: {
        //               profileId: createProfile.profileId,
        //             },
        //           },
        //         },
        //       });
        //       break;
        //     case 'Admin':
        //       await prisma.admin.create({
        //         data: {
        //           profile: {
        //             connect: {
        //               profileId: createProfile.profileId,
        //             },
        //           },
        //         },
        //       });
        //       break;
        //     default:
        //       res.status(401).send({
        //         message: 'your user role is not defined...'
        //       })
        //     break;
        // }
        // const response: ApiResponseDto<any> = {
        //   statusCode: 201,
        //   // data: createProfile,
        //   date: new Date(),
        //   url: req.url,
        //   message: "Profile completed successfully",
        // };
        res.status(201).json("you have tried");
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
    }
}