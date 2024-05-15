const Product = require('../Models/productModels');

const getAllProducts = async (req, res) => {
    
    try{
        let products = await Product.find();
        res.status(200).json({
            message: "success",
            statusCode: res.statusCode,
            products:{
                products
            }
        });
    }catch (e){
        res.status(404).json({
            message: e,
            satatuscode: res.statusCode
        });
    }
    
    
    // res.json(products);
}

const getSingleProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }
        res.json(product);
        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(400).json({ message: "Invalid ID" });
    }
}

const addNewProduct = async (req, res) => {
    try {
        let product = new Product(req.body);
        if (!req.body.name) {
            return res.status(400).json({ message: "name cannot be empty" });
        }
        if (!req.body.price) {
            return res.status(400).json({ message: "price cannot be empty" });
        }
        if (req.body.price < 0) {
            return res.status(400).json({ message: "price cannot be negative" });
        }
        if (!req.body.benefits) {
            return res.status(400).json({ message: "benefits cannot be empty" });
        }
        if (req.body.quantity < 0) {
            return res.status(400).json({ message: "quantity cannot be negative" });
        }
        await product.save()
        res.json(product);
    } catch (error) {
        return res.status(400).json(error);
    }
}

const updateProduct = async (req, res) => {
    const id = req.params.productId;

    if (!req.body.name) {
        return res.status(400).json({ message: "Name cannot be empty" });
    }

    if (req.body.price < 0) {
        return res.status(400).json({ message: "Price cannot be negative" });
    }

    if (!req.body.benefits) {
        return res.status(400).json({ message: "Benefits cannot be empty" });
    }

    if (req.body.quantity < 0) {
        return res.status(400).json({ message: "Quantity cannot be negative" });
    }

    let product = await Product.findByIdAndUpdate(id, req.body, { new: true })

    res.json(product);
}

const deleteProduct = async (req, res) => {
    const id = req.params.productId;
    let product = await Product.findByIdAndDelete(id);
    if (!product) {
        return res.status(400).json({ message: "Product not found" })
    }
    res.json(product);
}


const searchProductByName = async (req, res) => {
    const productName = req.query.name; // Extracting the product name from the query parameters

    try {
        // Searching for products with names matching the provided query using case-insensitive regex
        const products = await Product.find({ name: { $regex: productName, $options: 'i' } });

        // Checking if any products match the search query
        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        // Returning the search results in a consistent format
        res.status(200).json({
            message: "success",
            statusCode: res.statusCode,
            products: products
        });
    } catch (error) {
        // Handling errors gracefully
        res.status(500).json({ message: "Internal server error", error: error });
    }
}


module.exports = {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
    searchProductByName
}


