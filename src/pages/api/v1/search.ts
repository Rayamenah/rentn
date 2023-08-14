import { prisma } from "config/prisma.connect";
import { ApartmentType } from "dto/agent.dto.interface";
import { SearchHouseSchema } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const ifError = SearchHouseSchema(req.query)
        if (ifError) {
            return res.status(400).send({
                message: 'there is an error with your req query',
                error: ifError,
            })
        }
        const { community, apartmentType, price, pageNumber } = req.query;
        const pageSize = 10
        const parsedPageNumber = parseInt(pageNumber as string, 10);
        if (isNaN(parsedPageNumber) || parsedPageNumber < 1) {
            return res.status(400).send({
                message: 'Invalid page number. Please provide a valid page number greater than or equal to 1.',
            });
        }
        const totalCount = await prisma.apartment.count()
        const totalPages = Math.ceil(totalCount/pageSize)
        const offset = (parsedPageNumber - 1) * pageSize

        if (offset >= totalCount) {
            return res.status(404).send({
                message: 'Requested page not found. The specified page number is out of bounds.',
            });
        }
        const useSearchParams = await prisma.apartment.findMany({
            where: {
                community: community as string,
                apartmentType: apartmentType as ApartmentType,
                price: {
                    price: price as string
                }
            },
            take: pageSize,
            skip: offset,
            orderBy: {
                createdAt: 'asc',
            },
        })
        return res.status(200).send({
            data: useSearchParams,
            pages: totalPages,
            count: totalCount,
            currentPage: pageNumber,
            message: 'request was successful'
        })
    }catch(error: any) {
        console.log(error)
        console.log(error.message)
        return res.status(500).send({
            message: 'sever is currently unavailable',
            data: error.message
        })
    }
}