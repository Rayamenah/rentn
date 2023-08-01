import { verifyAccessToken } from "lib/auth.token";
import { NextApiRequest, NextApiResponse } from "next";
import { Secret } from 'jsonwebtoken';
import { ApiResponseDto } from "dto/apiResponseDto";
import jwt from 'jsonwebtoken';
import { ProfileDto } from "dto/rentn.dto";
import { prisma } from "config/prisma.connect";
import { findRentn } from "lib/check.db";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { authorization: rentn } = req.headers;
        if(!rentn){
          res.status(401).send({
            message: 'access token unavailable, access not granted'
          })
        }
        const token: any = rentn?.split('')[1]
        const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret )
        const {id, email } = decode

        // ensure that the user exist
        const userExist = await findRentn(email)
        if(!userExist){
          return res.status(404).json({
            message: "oops, who are you? not allowed to make such request",
          });
        }
        const profileData: ProfileDto = req.body;
        const createProfile = await prisma.profile.create({
            data: {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                gender: profileData.gender,
                role: profileData.role,
                phoneNumber: profileData.phoneNumber,
            }
        })
        switch (profileData.role) {
            case 'Agent':
              await prisma.agent.create({
                data: {
                  profile: {
                    connect: {
                      profileId: createProfile.profileId,
                    },
                  },
                },
              });
              break;
            case 'User':
              await prisma.users.create({
                data: {
                  profile: {
                    connect: {
                      profileId: createProfile.profileId,
                    },
                  },
                },
              });
              break;
            case 'Admin':
              await prisma.admin.create({
                data: {
                  profile: {
                    connect: {
                      profileId: createProfile.profileId,
                    },
                  },
                },
              });
              break;
            default:
              res.status(401).send({
                message: 'your user role is not defined...'
              })
            break;
        }
        const response: ApiResponseDto<any> = {
          statusCode: 201,
          data: createProfile,
          date: new Date(),
          url: req.url,
          message: "Profile completed successfully",
        };
        res.status(201).json(response);
      } catch (error: any) {
        console.error(error);
        res.status(500).json({
          message: "Internal server error",
        });
    }
}