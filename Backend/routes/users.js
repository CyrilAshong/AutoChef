const router = require("express").Router();
const {User, validate} = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async(req, res) => {
    try {
        console.log('Incoming request data: ', req.body)

        const {error} = validate(req.body);
        if (error) {
            console.log('Validation error: ', error.details[0].message);
            return res.status(400).send({message: error.details[0].message});
        }

        const user = await User.findOne({email: req.body.email});
        if (user){
            console.log('User already exists with email:', req.body.email);
            return res.status(409).send({ message: "User with given email already exists!" });
        }

        //const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);


        const newUser = await new User({...req.body, password: hashPassword}).save();

        return res.status(201).send({message: "User Created Succecfully", userId: newUser._id})
    } catch (error) {
        console.log('Error in user registration: ', error);
       return res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;