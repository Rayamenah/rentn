import {v2 as cloudinary} from 'cloudinary';
import formidable from 'formidable';
import mime from 'mime';
import { NextApiRequest } from 'next';

          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

export async function handleUpload(imageData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(imageData, (error: Error, data: any) => {
        if (error) {
          reject(new Error(`Sorry, cannot upload image at this moment: ${error}`));
        } else {
          resolve(data);
        }
      });
    });
}

export async function parseImageForm(req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }>{
    const { fields, files }: any = await new Promise((resolve, reject) => {
        const form = formidable({maxFiles: 6, maxFieldsSize: 4 * 1024 * 1024, // 4mb
            filename: (_name, _ext, part) => {
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const fileName = `${part.name || 'unknown'}-${uniqueSuffix}.${mime.getExtension(part.mimetype || '') || "unknown"}`
                return fileName
            },
            filter: (part) => {
                return (
                    part.name === 'media' && (part.mimetype?.includes('image') || false) 
                )
            }
        })
        form.parse(req, (error: any, fields, files) => {
            if(error) {
                console.log(error)
                reject(new Error(`Sorry, cannot parse image upload with formidable at this moment: ${error}`));
            }else {
                console.log({fields, files})
                resolve({fields, files})
            }
        })
    })
    return {
        fields, files
    }
}

export const FormidableError = formidable.errors.FormidableError