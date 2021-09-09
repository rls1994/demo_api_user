const usercontroller = require("../../core/controllers/userController")

const addUser = async(req, res, next) => {
    try {
        let rs = await usercontroller.addUser(req.body)
        req.data = rs
        next()
    } catch (e) {
        req.status = 400;
        console.log(e)
        next(e)
    }
}

const userLogin = async(req, res, next) => {
    
    try {

        if (!req.body.email) throw new Error("Please Provide email");
        if (!req.body.password) throw new Error("Please Provide Password");

        let filter = { email: req.body.email, password: req.body.password };
        let rs = await usercontroller.userLogin(filter)
        req.data = rs;
        req.message = "Login Successfull!!"
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}

const userProfile = async(req, res, next) => {
    try {
        let user = await usercontroller.getUser({
            id: req.userInfo.Id
        })
        req.data = user
        next()
    } catch (e) {
        req.status = 400;
        next(e)
    }
}



module.exports = {
    addUser,
    userLogin,
    userProfile
}