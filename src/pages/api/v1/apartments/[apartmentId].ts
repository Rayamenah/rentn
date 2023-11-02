import { prisma } from 'config/prisma.connect'
import { ApiResponseDto } from 'dto/apiResponseDto'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { apartmentId } = req.query
    if (req.method === 'GET') {
      if (!apartmentId || typeof apartmentId !== 'string') {
        return res.status(400).send({
          message: 'Invalid apartment ID. Please provide a valid apartment ID.',
        })
      }
      const findById = prisma.apartment.findUnique({
        where: {
          id: apartmentId,
        },
        include: {
          agent: true,
        },
      })
      if (!findById) {
        return res.status(404).send({
          message: `Apartment with ID ${apartmentId} not found.`,
        })
      }
      const dateTime = new Date()
      const exactTimeDate = dateTime.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        second: 'numeric',
      })
      const response: ApiResponseDto = {
        statusCode: 201,
        data: findById,
        date: exactTimeDate,
        url: req.url,
        message: 'request was successful',
      }
      return res.status(200).send(response)
    } else if ((req.method = 'DELETE')) {
      if (!apartmentId || typeof apartmentId !== 'string') {
        return res.status(400).send({
          message: 'Invalid apartment ID. Please provide a valid apartment ID.',
        })
      }
      const deleteApartment = prisma.apartment.delete({
        where: {
          id: apartmentId,
        },
        include: {
          agent: true,
        },
      })
      return res.status(200).json({ message: 'Apartment deleted successfully' })
    } else {
      return res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error: any) {
    console.log(error)
    console.log(error.message)
    return res.status(500).send({
      message: 'sever is currently unavailable',
      data: error.message,
    })
  }
}
