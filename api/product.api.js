var express = require('express');
var router = express.Router();
var productService = require('../service/product.service');

/* GET products listing. */
router.get('/list', async(req, res, next) => {
    var response = await productService.getProducts()
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* GET product by id. */
router.get('/:id', async(req, res, next) => {
    var response = await productService.getProductById(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Add product. */
router.post('/add', async(req, res, next) => {
    var response = await productService.addProduct(req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Update product. */
router.put('/:id', async(req, res, next) => {
    var response = await productService.updateProduct(req.params.id, req.body);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

/* Delete product. */
router.delete('/:id', async(req, res, next) => {
    var response = await productService.deleteProductById(req.params.id);
    var code = response.code;
    delete response.code;
    res.status(code).send(response);
});

module.exports = router;