const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('cloudinary').v2;
          
cloudinary.config({ 
  cloud_name: 'djleslzyt', 
  api_key: '683383817317257', 
  api_secret: 'YPb4XUTbqmFZIA6ftsOt7DCyEP4' 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Pasta onde os arquivos serão armazenados no Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Formatos de arquivo permitidos
  },
});

const upload = multer({ storage:storage })

module.exports = upload;