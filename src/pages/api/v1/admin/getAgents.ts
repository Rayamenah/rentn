import { prisma } from "config/prisma.connect";
import { Agents } from "dto/agent.dto.interface";
import { Secret, verify } from "jsonwebtoken";
import { agentPaginationHelper } from "lib/paginator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { cookies, pageNumber } = req.body
        const authorization: any = cookies.rentn
        if(!authorization) {
            res.status(401).send({
                message: 'access token unavailable, access not granted'
            })
        }
        const payload = verify(
            authorization,
            process.env.ACCESS_TOKEN_SECRET as Secret
        )
        const { id, email, role } = payload as { id: string, email: string, role: string}
        if(role !== 'admin'){
            return res.status(404).send({
                message: "sorry, you're not allowed to access this route. contact support",
            })
        }
        const findAdmin = await prisma.admin.findUnique({
            where: {
                email: email
            }
        })
        if(!findAdmin){
            return res.status(404).send({
                message: "sorry, can't find admin profile details",
            })
        }
        const getAgents = await agentPaginationHelper(Number(pageNumber))
        if (!getAgents) {
            return res.status(404).send({
              message: "No agents found",
            });
        }
        res.status(200).send({
            message: 'returned all the agents from the database',
            data: getAgents,
        })
    } catch(error: any) {
        console.log('error from database:::', error)
        res.status(500).send({
            message: 'database not available',
            data: error.message
        })
    }
}
