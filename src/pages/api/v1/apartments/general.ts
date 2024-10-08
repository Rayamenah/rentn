import { prisma } from 'config/prisma.connect'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cookies, pageNumber } = req.body
    const pageSize = 10
    const parsedPageNumber = parseInt(pageNumber as string, 10)
    if (isNaN(parsedPageNumber) || parsedPageNumber < 1) {
      return res.status(400).send({
        message:
          'Invalid page number. Please provide a valid page number greater than or equal to 1.',
      })
    }
    const totalCount = await prisma.apartment.count()
    const totalPages = Math.ceil(totalCount / pageSize)
    const offset = (parsedPageNumber - 1) * pageSize
    const findAllApartments = await prisma.apartment.findMany({
      include: {
        agent: true,
        images: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: pageSize,
      skip: offset,
    })
    if (offset >= totalCount) {
      return res.status(404).send({
        message:
          'Requested page not found. The specified page number is out of bounds.',
      })
    }
    return res.status(200).send({
      data: findAllApartments,
      pages: totalPages,
      count: totalCount,
      currentPage: pageNumber,
    })
  } catch (error: any) {}
}
