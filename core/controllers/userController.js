//import use cases
const userUseCase = require("./../usecases/user");
const passwordHashCompare = require("./../lib/PasswordHashCompare");
require('dotenv').config();
const jwt = require("jsonwebtoken");

const Validator = require("./../lib/Validators")




exports.addUser = async (user)=>{

    if (!user.name) throw new Error('user Name is Required');
    if (!user.email) throw new Error('user email is Required');
    if (!user.phone) throw new Error('user phone is Required');
    if (!user.password) throw new Error('user password is Required');
    if ((user.password).length <4) throw new Error('user password length must more than 4 characters');

    if(!Validator.validateEmail(user.email)) throw new Error("Invalid Email provided");
    if(!Validator.validatePhone(user.phone)) throw new Error("Invalid Phone Number provided");

    const oldUserEmailCheck = await userUseCase.getUsers({
        email: user.email
    });
    if(oldUserEmailCheck.length>0) throw new Error("User already exists with same email");

    const oldUserPhoneCheck = await userUseCase.getUsers({
        phone: user.phone
    });
    if(oldUserPhoneCheck.length>0) throw new Error("User already exists with same phone");

    let passwordHash = passwordHashCompare.hashPassword(user.password);
    

    let newUser = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        password_hash:passwordHash,
        address: user.address || null,
        city: user.city || null,
        gender: user.gender || null
    }

    let userRs = await userUseCase.addUser(newUser);
    return _userFormatter(userRs);
}

exports.userLogin = async(props)=>{
    if (!props.email) throw new Error('user email is Required');
    if (!props.password) throw new Error('user password is Required');
    if (!Validator.validateEmail(props.email)) throw new Error("Invalid Email provided");



    let userRecord = await userUseCase.getUsers({
        email: props.email
    })
    if(userRecord.length == 0) throw new Error("Invalid Credentials");

    let passwordCompareRs = passwordHashCompare.comparePassword(props.password, userRecord[0].password_hash);
    if(!passwordCompareRs) throw new Error("Invalid Credentials");

    userRecord = userRecord[0];
   
    const token = jwt.sign(
            {
                Id: userRecord._id,
                Name:userRecord.name,
                Email:userRecord.email
            },
            process.env.JWT_SECRET,
            { expiresIn: 619999}
        );

    rs =  {
        token:token,
        user: _userFormatter(userRecord)
    }
    return rs;
}


exports.getUser = async(props) =>{
    let filter = {};
    if(props.id) filter._id = props.id;
    if(props.email) filter.email =props.email;

    let rs = await userUseCase.getUsers(filter);
    return _userFormatter(rs);
}




const _userFormatter  =  (user) => {
    if(Array.isArray(user)){
        return user.map(it=>{
            return {
                name: it.name,
                phone: it.phone,
                email: it.email,
                address: it.address == null ? "NA" : it.address,
                city: it.city == null ? "NA" : it.city,
                gender: it.gender == null ? "NA" : it.gender,
            }
        })
    }
    else{
        return {
            name: user.name,
            phone: user.phone,
            email: user.email,
            address: user.address == null ? "NA" : user.address,
            city: user.city == null ? "NA" : user.city,
            gender: user.gender == null ? "NA" : user.gender,
        }
    }
}
