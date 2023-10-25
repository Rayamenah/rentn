import { prisma } from "config/prisma.connect";
import { ApartmentDto } from "dto/agent.dto.interface";
import { ApiResponseDto } from "dto/apiResponseDto";
import { Secret, verify } from "jsonwebtoken";
import { addNewApartment } from "lib/check.db";
import { FormidableError, handleUpload, parseImageForm } from "lib/image.helper";
import { apartmentSchemaValidation } from "lib/schema.validator";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler (
    req: NextApiRequest, 
    res: NextApiResponse
) {
    try {
        const { headers } = req
        console.log(headers)
        const authorization: any = headers.cookie?.split('=')[1] || headers.authorization?.split(' ')[1]
        console.log(authorization)
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
        const findAgent = await prisma.agent.findUnique({
            where: {
                email: email
            }
        })
        if(!findAgent){
            return res.status(404).send({
                message: "sorry, profile not found in the database or the agent does not exist",
            })
        }
        if(findAgent?.role || role !== 'agent'){
            return res.status(404).send({
                message: "sorry, you're not allowed to access this route. contact support",
            })
        }
        const {files, fields} = await parseImageForm(req)
        console.log(files, fields)
        const uploadToCloudinary = await handleUpload(files.media)
        const validateApartmentSchema = apartmentSchemaValidation(req.body)
        if(validateApartmentSchema){
            return res.status(400).send({
                message: 'the req body sent is not correct or acceptable',
                data: validateApartmentSchema
        })}
        const dateTime = new Date().toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            second: 'numeric',
        });
        const newApartment: ApartmentDto = req.body;
        await addNewApartment(newApartment.address, newApartment.community)
        const cloudinaryId = uploadToCloudinary.imageId
        const fileName = files.fileName
        const imageUrl = uploadToCloudinary.imageUrl
        const createNewApartment = await prisma.apartment.create({
            data: {
                address: newApartment.address,
                community: newApartment.community,
                apartmentType: newApartment.apartmentType,
                name: newApartment.name,
                agent: {
                    connect: {
                        agentId: findAgent?.agentId
                    }
                },
                features: newApartment.features,
                price: newApartment.price,
                tenure: newApartment.tenure,
                description: newApartment.description,
            }
        })
        const saveImageInfoToDb = await prisma.image.create({
            data: {
                cloudinaryId: cloudinaryId,
                fileName: `$fileName`,
                uploadBy: findAgent.firstName&&findAgent.lastName,
                imageUrl: imageUrl,
               apartmentId: createNewApartment.id
            }
        })
        const apartmentResponse: ApiResponseDto = {
            statusCode: 201,
            data: createNewApartment,
            message: 'you have successfully added an apartment for listing',
            url: req.url,
            date: dateTime,
        }
        res.status(200).send(apartmentResponse)
    } catch (error: any) {
        console.error(error);
        if(error instanceof FormidableError){
            res.status(400).json({
                error: error.message,
                message: "file parse server error",
            });
        }
        res.status(500).send({
            message: 'server currently unavailable'
        })
    }
}