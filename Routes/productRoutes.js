const express = require('express');
const router = express.Router();

const productAPIs = require('../APIs/productAPIs');

router.route('/')
    .get(productAPIs.getAllProducts)
    .post(productAPIs.addNewProduct)
router.route('/search')
    .get(productAPIs.searchProductByName); 
router.route('/:productId')
    .get(productAPIs.getSingleProduct)
    .patch(productAPIs.updateProduct)
    .delete(productAPIs.deleteProduct)

module.exports = router;