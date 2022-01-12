const { mockRequest, mockResponse } = require('../interceptor')
const categoryModel = require('../../src/models/category');
const categoryController = require('../../src/controllers/categoryController');

const testPayload = [
    {
        "categoryId": 1,
        "name": "Electronics"
    },
    {
        "categoryId": 2,
        "name": "Fashion"
    },
    {
        "categoryId": 3,
        "name": "Mobiles"
    }
];

describe('All Category controller', () => {
    it('should return error', async () => {
        const spy = jest.spyOn(categoryModel, 'listCategories').mockImplementation(cb => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        
        await categoryController.listCategories(req,res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
			success: false,
			msg: "Error in fetching categories"
		});
    })
})

describe('All Category controller', () => {
    it('should return all categories', async () => {
        
        const spy = jest.spyOn(categoryModel, 'listCategories').mockImplementation(cb => cb(null, testPayload));
        const req = mockRequest();
        const res = mockResponse();
        
        await categoryController.listCategories(req,res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
			success: true,
			msg: "Successfully fetched categories",
            categories: testPayload
		});
    })
})