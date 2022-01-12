const mysql = require("mysql");
const Config = require("../../../../config/config.json");
var pool = mysql.createPool(Config.test);
const jsdom = require("jsdom");
const request = require('supertest');
const app = require('../../../../app');

const api_v1_endpoint = "/api/v1";

beforeAll(() => {
    let sql = "Truncate Table Products;"
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
        } else {
            connection.query(sql, "", function (err1, results) {
                connection.release();
            });
        }
    });
})

beforeAll(() => {
    let sql = "Truncate Table Users;"
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log(err);
        } else {
            connection.query(sql, "", function (err1, results) {
                connection.release();
            });
        }
    });
})

describe('Post Category all Endpoints', () => {
    it('should return all categories', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/category/all')
        expect(res.statusCode).toEqual(200)
        expect(res.body.msg).toEqual('Successfully fetched categories')
    })
})

describe('Post create product Endpoints', () => {
    it('should create product', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/product/add')
            .send({
                name: "Sony Bravia",
                price: 20000,
                description: "Good TV",
                categoryId: 1,
                vendorId: 2
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully added product');
    })
})

describe('Post get details of product Endpoints', () => {
    it('should get details of product', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/product/details')
            .send({
                userId:1,
                productId:1
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully fetched product details');
    })
})

describe('Post list all of product Endpoints', () => {
    it('should list all of product', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/product/all')
            .send({
                categoryId:1,
                maxPrice:100000
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully fetched products');
    })
})

describe('Post User Account Signup Endpoints', () => {
    it('should signup', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/user/signup')
            .send({
                username:"test",
                password:"testing",
                userType:"user"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully Signup Up');
    })
})

describe('Post User Account Login Endpoints', () => {
    it('should login', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/user/login')
            .send({
                username:"test",
                password:"testing"
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully Logged In');
    })
})

describe('Post Create Orders Endpoints', () => {
    it('should create orders', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/order/add')
            .send({
                userId:1,
                productId:1
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully created order');
    })
})

describe('Post Get Details of Order Endpoints', () => {
    it('should return details of Order', async () => {
        const res = await request(app)
            .post(api_v1_endpoint + '/order/details')
            .send({
                userId:1
            })
        expect(res.statusCode).toEqual(200);
        expect(res.body.msg).toEqual('Successfully fetched order details');
    })
})