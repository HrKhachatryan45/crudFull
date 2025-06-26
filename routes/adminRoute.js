const express = require('express')
const router = express.Router()
const multer = require('multer');
const protectRoute = require('../middlewares/protectRoute');
const { uploadImage, getProducts, addProduct , deleteProduct, updateProduct} = require('../controllers/adminController');

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
router.delete('/deleteProduct/:id',protectRoute, deleteProduct)
router.put('/updateProduct/:id',protectRoute,updateProduct)

module.exports = router;