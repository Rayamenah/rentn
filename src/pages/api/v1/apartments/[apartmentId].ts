import { prisma } from "config/prisma.connect";
import { ApiResponseDto } from "dto/apiResponseDto";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const { apartmentId } = req.query
        if (!apartmentId || typeof apartmentId !== "string") {
            return res.status(400).send({
                message: 'Invalid apartment ID. Please provide a valid apartment ID.',
            });
        }
        const findById = prisma.apartment.findUnique({
            where: {
                apartmentId: apartmentId
            },
            include: {
                price: true,
                agent: true
            },
        })
        if(!findById) {
            return res.status(404).send({
                message: `Apartment with ID ${apartmentId} not found.`,
            });
        }
        const dateTime = new Date()
        const exactTimeDate = dateTime.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            second: 'numeric',
        });
        const response: ApiResponseDto = {
            statusCode: 201,
            data: findById,
            date: exactTimeDate,
            url: req.url,
            message: "request was successful",
          };
        return res.status(200).send(response)
    } catch(error: any) {
        console.log(error)
        console.log(error.message)
        return res.status(500).send({
            message: 'sever is currently unavailable',
            data: error.message
        })
    }
}