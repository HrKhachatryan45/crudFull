const express = require('express')
const router = express.Router()
const multer = require('multer');
const { uploadImage, getProducts, addProduct } = require('../controllers/adminController');
const protectRoute = require('../middlewares/protectRoute');

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage:storage})

router.get('/getProducts',getProducts)
router.post('/addProduct',protectRoute,upload.single('productImage'),addProduct)
module.exports = router;