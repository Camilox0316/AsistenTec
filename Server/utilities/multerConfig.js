const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Directorio donde se guardarán las imágenes de perfil
    cb(null, 'uploads/profilePhotos/');
  },
  filename: function (req, file, cb) {
    // Genera un nombre de archivo único para evitar sobreescrituras
    // Ejemplo: profile-123456789.jpg
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'profile-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Filtrado de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  // Aceptar solo archivos de imagen
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const uploadProfileImage = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limita el tamaño del archivo a 5MB
  }
}).single('photoFile'); // 'photo' es el nombre del campo en el formulario de registro

module.exports = { uploadProfileImage };
