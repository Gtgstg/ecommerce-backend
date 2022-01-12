const { mockRequest, mockResponse } = require('../interceptor')
const userModel = require('../../src/models/user');
const userController = require('../../src/controllers/userController');

const testPayload = [
    {
        Username:"test",
        UserId:1,
        UserType:"user"
    }
]

describe('Login controller', () => {
    it('should return badrequest', async () => {
        const req = mockRequest();
        req.body = {
            username:"test"
        }
        const res = mockResponse();

        await userController.login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for login"
        });
    })
})

describe('User Login controller', () => {
    it('should fails login', async () => {
        const spy = jest.spyOn(userModel, 'login').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing"
        }
        await userController.login(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in login"
        });
    })
})

describe('User Login controller', () => {
    it('should fail with invaild credentials', async () => {

        const spy = jest.spyOn(userModel, 'login').mockImplementation((data, cb) => cb(null, []));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing"
        }
        await userController.login(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid Email or Password"
        });
    })
})

describe('User Login controller', () => {
    it('should succeed login', async () => {

        const spy = jest.spyOn(userModel, 'login').mockImplementation((data, cb) => cb(null, testPayload));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing"
        }
        await userController.login(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully Logged In",
            data: {
                username: testPayload[0].Username,
                userId: testPayload[0].UserId,
                userType: testPayload[0].UserType
            }
        });
    })
})

describe('SignUp controller', () => {
    it('should return badrequest', async () => {
        const req = mockRequest();
        req.body = {
            username:"test"
        }
        const res = mockResponse();

        await userController.signup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for signup"
        });
    })
})

describe('SignUp controller', () => {
    it('should fails signUp', async () => {
        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"user"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in signup"
        });
    })
})

describe('SignUp controller', () => {
    it('should fails signUp with already exits', async () => {
        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, [{"userName":"test"}]));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"user"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "User already exists"
        });
    })
})

describe('Vendor Signup controller', () => {
    it('should fail due to missing gstin and pan', async () => {

        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, []));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"vendor"
            
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Invalid params for signup"
        });
    })
})

describe('Vendor Signup controller', () => {
    it('should fail', async () => {
        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, []));
        const signUpSpy = jest.spyOn(userModel, 'signup').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"vendor",
            gstin:"1234",
            pan:"cbb23rbiu3"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(signUpSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in signup"
        });
    })
})

describe('Vendor Signup controller', () => {
    it('should fail due to error in addVendorDetails', async () => {

        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, []));
        const signUpspy = jest.spyOn(userModel, 'signup').mockImplementation((data, cb) => cb(null, []));
        const addVendorspy = jest.spyOn(userModel, 'addVendorDetails').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"vendor",
            gstin:"1234",
            pan:"cbb23rbiu3"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(signUpspy).toHaveBeenCalled();
        expect(addVendorspy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in signup"
        });
    })
})

describe('Vendor Signup controller', () => {
    it('should succeed signup', async () => {

        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, []));
        const signUpspy = jest.spyOn(userModel, 'signup').mockImplementation((data, cb) => cb(null, {insertId:1}));
        const addVendorspy = jest.spyOn(userModel, 'addVendorDetails').mockImplementation((data, cb) => cb(null, []));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"vendor",
            gstin:"1234",
            pan:"cbb23rbiu3"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(signUpspy).toHaveBeenCalled();
        expect(addVendorspy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully Signup Up",
            data: {
                username: "test",
                userId: 1,
                userType: "vendor"
            }
        });
    })
})

describe('User Signup controller', () => {
    it('should fail', async () => {
        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, []));
        const signUpSpy = jest.spyOn(userModel, 'signup').mockImplementation((data, cb) => cb(new Error("This is an error."), null));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"user"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(signUpSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith({
            success: false,
            msg: "Error in signup"
        });
    })
})

describe('User Signup controller', () => {
    it('should succeed signup', async () => {

        const spy = jest.spyOn(userModel, 'getUserDetails').mockImplementation((data, cb) => cb(null, []));
        const signUpspy = jest.spyOn(userModel, 'signup').mockImplementation((data, cb) => cb(null, {insertId:1}));
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            username:"test",
            password:"testing",
            userType:"user"
        }
        await userController.signup(req, res);
        expect(spy).toHaveBeenCalled();
        expect(signUpspy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            success: true,
            msg: "Successfully Signup Up",
            data: {
                username: "test",
                userId: 1,
                userType: "user"
            }
        });
    })
})