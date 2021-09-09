const router = require('express').Router()
const userHandler = require('../handlers/userHandler')
const check_auth = require("../../core/middleware/check-auth");

router.put('/', userHandler.addUser)
router.post("/login", userHandler.userLogin);

//if logged in
router.get('/', check_auth, userHandler.userProfile)

module.exports = router