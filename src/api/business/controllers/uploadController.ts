import { Request, Response } from 'express';
import { BusinessService } from '../services/businessService';
const streamifier = require('streamifier');

const cloudinary = require('cloudinary').v2;

const uploadFile = async (req: Request, res: Response) => {
  try {
    const allowed = [
      'docx',
      'pdf',
      'doc',
    ];

    const ext = req.file.originalname.split('.').pop();
    
    if (!allowed.includes(ext)) {
      return res.status(400).json('File không đúng định dạng');
    }

    const id = req.userData.id;
    const bs = new BusinessService();

    const business = await bs.getOne({ where: { user_id: id } });
    if (!business) {
      return res.status(400).json('Tài khoản này không phải business');
    }
    const publicId = `${business.id}/${req.file.originalname}`;

    const result = await new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        { resource_type: 'raw', format: ext, public_id: publicId },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ detail: `Internal server error: ${error.message}` });
  }
};

const uploadController = {
  uploadFile,
};

export default uploadController;
