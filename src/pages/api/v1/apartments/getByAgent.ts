import { prisma } from 'config/prisma.connect'
import { Secret, verify } from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cookies, pageNumber } = req.body
    const authorization: any = cookies.rentn
    if (!authorization) {
      res.status(401).send({
        message: 'access token unavailable, access not granted',
      })
    }
    const payload = verify(
      authorization,
      process.env.ACCESS_TOKEN_SECRET as Secret
    )
    const { id, email, role } = payload as {
      id: string
      email: string
      role: string
    }
    if (role !== 'agent') {
      return res.status(404).send({
        message:
          "sorry, you're not allowed to access this route. contact support",
      })
    }
    const findAgent = await prisma.agent.findUnique({
      where: {
        email: email,
      },
      include: {
        apartments: true,
      },
    })
    if (!findAgent) {
      return res.status(404).send({
        message:
          'sorry, profile details not found or this agent does not exist',
      })
    }
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
    const getApartmentByAgent = prisma.apartment.findMany({
      where: {
        agent: {
          email: email,
        },
      },
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
      data: getApartmentByAgent,
      pages: totalPages,
      count: totalCount,
      currentPage: pageNumber,
    })
  } catch (error: any) {
    console.log(error)
    console.log(error.message)
    return res.status(500).send({
      message: 'sever is currently unavailable',
      data: error.message,
    })
  }
}
