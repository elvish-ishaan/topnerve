import {v2 as cloudinary} from 'cloudinary'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
cloudinary.config({
    cloud_name: CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
})

export const uploadFile  = async (filePath: any) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result
    } catch (error) {
        console.log(error, 'error in uploading file')
    }
}