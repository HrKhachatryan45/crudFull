const fs = require('fs');
const path = require('path');


const getProducts = async (req, res) => {
    try {
        const filePath = path.join(path.resolve(),'data','anun.json');
        const data = await fs.readFileSync(filePath, 'utf-8');
        const products = JSON.parse(data);

        res.status(200).json(products);
    }catch (error) {
        console.log(error);
    }
}

const addProduct = async (req, res) => {
    const {title, price } = req.body;
    try{
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }
        const filePath = path.join(path.resolve(),'data','anun.json');

        const data = await fs.readFileSync(filePath, 'utf-8');

        let products = JSON.parse(data);

        if (!products || products.length === 0) {
            products = [];
        }

        products.push({
            id: products.length + 1,
            title,
            price,
            image: req.file.path
        });

        await fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
        res.status(201).json({ message: 'Product added successfully' });

    }catch (error) {
        console.log(error);
    }
}


module.exports = {
    getProducts,
    addProduct
}