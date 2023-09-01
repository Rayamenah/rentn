import { prisma } from "config/prisma.connect";
import { serialize } from "cookie";
import { RentnLogin } from "dto/rentn.dto";
import { createAccessToken } from "lib/auth.token";
import { comparePasswordHash } from "lib/hash.password.helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const login: RentnLogin = req.body;
        const rentnUser = await prisma.rentn.findUnique({
            where: {
                email: login.email,
            },
            select: {
                email: true,
                password: true,
                id: true,
            }
        })
        if (rentnUser){
          const checkPassword =  await comparePasswordHash(login.password, rentnUser.password)
          if(!checkPassword) {
            return res.status(400).send({
                message: 'invalid password or password does not match'
            })
          } else {
            const atCookie = serialize(
                "rentn",
                createAccessToken(rentnUser.id, rentnUser.email),
                {
                    httpOnly: false,
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24 * 1, // expires in 1 day
                    path: "/",
                }
            )
            res.setHeader("Set-Cookie", atCookie);
            return res.status(200).send({
                message: 'Login successful',
                data: rentnUser,
                token: atCookie
            });
          }
        }
        else {
            return res.status(400).send({
                message: 'Invalid email or email does not exist'
            });
        }
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
}