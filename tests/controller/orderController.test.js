const { mockRequest, mockResponse } = require('../interceptor')
const productModel = require('../../src/models/product');
const orderDetailModel = require('../../src/models/orderDetail');
const orderItemModel = require('../../src/models/orderItem');

const orderController = require('../../src/controllers/orderController');

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

describe('Order controller', () => {
    it('should return badrequest', async () => {
        const req = mockRequest();
        req.body = {
            userId:"1"
        }
        const res = mockResponse();

        await orderController.createOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for creating order"
        });
    })
})

describe('Order controller', () => {
    it('should fail due to not getting products details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})


describe('Order controller', () => {
    it('should fail due to not finding order', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})

describe('Order controller', () => {
    it('should fail due to not able to edit order', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, [{ID:1,total:10000}]));
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(editOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})

describe('Order controller', () => {
    it('should fail due to not able to edit order', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, [{ID:1,total:10000}]));
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(editOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})

describe('Order controller', () => {
    it('should fail due to not able to add order', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, [{ID:1,total:10000}]));
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(null, null));
        const addOrderSpy = jest.spyOn(orderItemModel, 'addOrderItem').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(editOrderSpy).toHaveBeenCalled();
        expect(addOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})

describe('Order controller', () => {
    it('should create order', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, [{ID:1,total:10000}]));
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(null, null));
        const addOrderSpy = jest.spyOn(orderItemModel, 'addOrderItem').mockImplementation((data, cb) => cb(null, null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(editOrderSpy).toHaveBeenCalled();
        expect(addOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully created order",
            orderDetails:{
                orderId:1
            }
        });
    })
})

describe('Order controller', () => {
    it('should fail due to not able to add order', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, []));
        const addOrderSpy = jest.spyOn(orderDetailModel, 'addOrder').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(addOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})

describe('Order controller', () => {
    it('should fail due to not able to add order Item', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, []));
        const addOrderSpy = jest.spyOn(orderDetailModel, 'addOrder').mockImplementation((data, cb) => cb(null, {insertId:1}));
        const addOrderItemSpy = jest.spyOn(orderItemModel, 'addOrderItem').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(addOrderSpy).toHaveBeenCalled();
        expect(addOrderItemSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in creating order"
        });
    })
})

describe('Order controller', () => {
    it('should succeed', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const findOrderSpy = jest.spyOn(orderDetailModel, 'findOrderByUser').mockImplementation((data, cb) => cb(null, []));
        const addOrderSpy = jest.spyOn(orderDetailModel, 'addOrder').mockImplementation((data, cb) => cb(null, {insertId:1}));
        const addOrderItemSpy = jest.spyOn(orderItemModel, 'addOrderItem').mockImplementation((data, cb) => cb(null, null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1",
            productId:"1"
        }
        await orderController.createOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(findOrderSpy).toHaveBeenCalled();
        expect(addOrderSpy).toHaveBeenCalled();
        expect(addOrderItemSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully created order",
            orderDetails:{
                orderId:1
            }
        });
    })
})

describe('Order controller', () => {
    it('should get orderDetails', async () => {
        const req = mockRequest();
        const res = mockResponse();
        
        await orderController.getOrderDetails(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for fetching order details"
        });
    })
})

describe('Order controller', () => {
    it('should get orderDetails', async () => {
        const spy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1"
        }
        await orderController.getOrderDetails(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in fetching order details"
        });
    })
})

describe('Order controller', () => {
    it('should get orderDetails', async () => {
        const spy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(null, [{
            price: 1000,
            productName: "Sony Bravia",
            quantity: 1,
            productId: 1,
            orderId:1,
            total:1000
        }]));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            userId:"1"
        }
        await orderController.getOrderDetails(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully fetched order details",
            orderDetails:{
                orderId: 1,
                total: 1000,
                products: [{
                    price: 1000,
                    name: "Sony Bravia",
                    quantity: 1,
                    productId: 1
                }]
            }
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const req = mockRequest();
        const res = mockResponse();
        
        await orderController.editOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for updating order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            payment:"1000"
        }
        await orderController.editOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for confirming payment"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            payment:"1000",
            orderId:1,
            userId:1
        }
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in confirming payment"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(null, null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            payment:"1000",
            orderId:1,
            userId:1
        }
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully updated order payment"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1
        }
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in updating order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const getOrderSpy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1
        }
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(getOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in updating order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const getOrderSpy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(null, [{
            price: 1000,
            productName: "Sony Bravia",
            quantity: 1,
            productId: 1,
            orderId:1,
            total:1000
        }]));
        const deleteOrderSpy = jest.spyOn(orderItemModel, 'deleteOrderItem').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1,
            remove:true
        }
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(getOrderSpy).toHaveBeenCalled();
        expect(deleteOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in updating order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const getOrderSpy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(null, [{
            price: 1000,
            productName: "Sony Bravia",
            quantity: 1,
            productId: 1,
            orderId:1,
            total:1000
        }]));
        const deleteOrderSpy = jest.spyOn(orderItemModel, 'deleteOrderItem').mockImplementation((data, cb) => cb(null, null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1,
            remove:true
        }
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(getOrderSpy).toHaveBeenCalled();
        expect(deleteOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in updating order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const getOrderSpy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(null, [{
            price: 1000,
            productName: "Sony Bravia",
            quantity: 1,
            productId: 1,
            orderId:1,
            total:1000
        }]));
        const deleteOrderSpy = jest.spyOn(orderItemModel, 'deleteOrderItem').mockImplementation((data, cb) => cb(null, null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1,
            remove:true
        }
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(null, null));
        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(getOrderSpy).toHaveBeenCalled();
        expect(deleteOrderSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully updated order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const getOrderSpy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(null, [{
            price: 1000,
            productName: "Sony Bravia",
            quantity: 1,
            productId: 1,
            orderId:1,
            total:1000
        }]));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1
        }
        const editOrderItemSpy = jest.spyOn(orderItemModel, 'editOrderItem').mockImplementation((data, cb) => cb(new Error("This is an error."), null));

        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(getOrderSpy).toHaveBeenCalled();
        expect(editOrderItemSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in updating order details"
        });
    })
})

describe('Order controller', () => {
    it('should get edit Details', async () => {
        const spy = jest.spyOn(productModel, 'getProductDetails').mockImplementation((data, cb) => cb(null, testDescriptionResponse));
        const getOrderSpy = jest.spyOn(orderDetailModel, 'getOrderDetails').mockImplementation((data, cb) => cb(null, [{
            price: 1000,
            productName: "Sony Bravia",
            quantity: 1,
            productId: 1,
            orderId:1,
            total:1000
        }]));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            orderId:1,
            userId:1
        }
        const editOrderItemSpy = jest.spyOn(orderItemModel, 'editOrderItem').mockImplementation((data, cb) => cb(null, null));
        const editOrderSpy = jest.spyOn(orderDetailModel, 'editOrder').mockImplementation((data, cb) => cb(null, null));

        await orderController.editOrder(req, res);
        expect(spy).toHaveBeenCalled();
        expect(getOrderSpy).toHaveBeenCalled();
        expect(editOrderItemSpy).toHaveBeenCalled();
        expect(editOrderSpy).toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully updated order details"
        });
    })
})
