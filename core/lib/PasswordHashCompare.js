const bcrypt = require("bcrypt");

//hashing password
const hashPassword = (password) => {
    let passwordHash = bcrypt.hashSync(password,10);
    return passwordHash;
}

const comparePassword = (password, passwordHash) => {
    return bcrypt.compareSync(password, passwordHash);
}

module.exports = {
    hashPassword,
    comparePassword
}