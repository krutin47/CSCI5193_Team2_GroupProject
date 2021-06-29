var Response = require('../Models/response.model');
var ProductDb = require('../db/product.db');

var getProducts = async() => {
    try {
        var products = await ProductDb.getProducts();
        if (products.length == 0) {
            var response = new Response("Products not found", false);
            response["products"] = [];
            response["code"] = 404;
        } else {
            var response = new Response("Products retrieved", true);
            response["products"] = products;
            response["code"] = 200;
        }
    } catch (error) {
        var response = new Response("Internal server error", false);
        response["code"] = 500;
    }
    return response;
}

var getProductById = async(id) => {
    try {
        var product = await ProductDb.getProductById(id);
        if (product != undefined) {
            var response = new Response("Product retrieved", true);
            response["product"] = product;
            response["code"] = 200;
        } else {
            var response = new Response("Product not found", false);
            response["code"] = 404;
        }
    } catch (error) {
        var response = new Response("Internal server error", false);
        response["code"] = 500;
    }
    return response;
}

var addProduct = async(body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false);
            response["code"] = 400;
        } else if (!validateAddBody(body)) {
            var response = new Response("Bad request. Please send valid request body.", false);
            response["code"] = 400;
        } else {
            var product = await ProductDb.addProduct(body);
            if (product != undefined) {
                var response = new Response("Product added", true);
                response["code"] = 200;
            } else {
                var response = new Response("Internal server error", false);
                response["code"] = 500;
            }
        }
    } catch (error) {
        var response = new Response("Internal server error", false);
        response["code"] = 500;
    }
    return response;
}

var updateProduct = async(id, body) => {
    try {
        if (Object.keys(body).length == 0) {
            var response = new Response("Bad request. Please send request body.", false);
            response["code"] = 400;
        } else if (!validateUpdateBody(body)) {
            var response = new Response("Bad request. Please send valid request body.", false);
            response["code"] = 400;
        } else {
            var product = await ProductDb.getProductById(id);
            if (product != undefined) {
                var isUpdated = await ProductDb.updateProduct(id, body);
                if (isUpdated) {
                    var response = new Response("Product updated", true);
                    response["code"] = 200;
                } else {
                    var response = new Response("Internal server error", false);
                    response["code"] = 500;
                }
            } else {
                var response = new Response("Product to update not found", false);
                response["code"] = 404;
            }
        }
    } catch (error) {
        var response = new Response("Internal server error", false);
        response["code"] = 500;
    }
    return response;
}

var deleteProductById = async(id) => {
    try {
        var product = await ProductDb.getProductById(id);
        if (product != undefined) {
            var isDeleted = await ProductDb.deleteProductById(id);
            if (isDeleted) {
                var response = new Response("Product deleted", true);
                response["code"] = 200;
            } else {
                var response = new Response("Product not found", false);
                response["code"] = 404;
            }
        } else {
            var response = new Response("Product to delete not found", false);
            response["code"] = 404;
        }
    } catch (error) {
        var response = new Response("Internal server error", false);
        response["code"] = 500;
    }
    return response;
}

var validateAddBody = (body) => {
    var productProperties = ["name", "description", "price", "brand"];
    var objectKeys = Object.keys(body);
    var isValid = true;
    objectKeys.forEach(key => {
        if (productProperties.indexOf(key) == -1) {
            isValid = false;
        }
    });
    productProperties.forEach(property => {
        if (objectKeys.indexOf(property) == -1) {
            isValid = false;
        }
    });
    return isValid;
}

var validateUpdateBody = (body) => {
    var productProperties = ["name", "description", "price", "brand"];
    var objectKeys = Object.keys(body);
    var isValid = true;
    objectKeys.forEach(key => {
        if (productProperties.indexOf(key) == -1) {
            isValid = false;
        }
    });
    return isValid;
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById
}