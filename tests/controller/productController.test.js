const { mockRequest, mockResponse } = require('../interceptor')
const productModel = require('../../src/models/product');
const productController = require('../../src/controllers/productController');

const testPayload = [
    {
        "id": 1,
        "name": "Sony Bravia",
        "price": 10000
    },
    {
        "id": 2,
        "name": "Poco F1",
        "price": 20000
    }
];

const testDescriptionResponse = [{name:"Sony Bravia", price:10000, description:"Good quality"}];

describe('All product controller', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(productModel, 'listProducts').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();

        await productController.listProducts(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in fetching products"
        });
    })
})

describe('All product controller', () => {
    it('should return all product', async () => {

        const spy = jest.spyOn(productModel, 'listProducts').mockImplementation((data, cb) => cb(null, testPayload));
        const req = mockRequest();
        const res = mockResponse();

        await productController.listProducts(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully fetched products",
            products: testPayload
        });
    })
})

describe('Add product controller', () => {
    it('should return badrequest', async () => {
        const req = mockRequest();
        req.body = {
            name: "test",
            price: 1000,
            description: "tests",
            categoryId: 1
        }
        const res = mockResponse();

        await productController.addProduct(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for adding product"
        });
    })
})

describe('Add product controller', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(productModel, 'addProduct').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        req.body = {
            name: "test",
            price: 1000,
            description: "tests",
            categoryId: 1,
            vendorId: 2
        }
        const res = mockResponse();

        await productController.addProduct(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in adding product"
        });
    })
})

describe('Add product controller', () => {
    it('should return success message', async () => {

        const spy = jest.spyOn(productModel, 'addProduct').mockImplementation((data, cb) => cb(null, true));
        const req = mockRequest();
        req.body = {
            name: "test",
            price: 1000,
            description: "tests",
            categoryId: 1,
            vendorId: 2
        }
        const res = mockResponse();

        await productController.addProduct(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully added product"
        });
    })
})

describe('get product details controller', () => {
    it('should return badrequest', async () => {
        const req = mockRequest();
        req.body = {
            productId: 1
        }
        const res = mockResponse();

        await productController.getProductDetails(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for fetching product details"
        });
    })
})

describe('get product details controller', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        req.body = {
            productId:1,
            userId:1
        }
        const res = mockResponse();

        await productController.getProductDetails(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in fetching product details"
        });
    })
})

describe('get product details controller', () => {
    it('should return details of product', async () => {

        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const req = mockRequest();
        req.body = {
            productId:1,
            userId:1
        }
        const res = mockResponse();

        await productController.getProductDetails(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully fetched product details",
            productDetails: testDescriptionResponse[0]
        });
    })
})