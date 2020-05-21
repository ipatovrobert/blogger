const UserSchema = require('../models/User');

//Method         POST
//Endpoint       /auth/register
//Description    Creating account into the database and giving back JWT

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const registration = await UserSchema.create({
            name,
            email,
            password
        });

        const token = registration.getSignedJwt();

        res.status(200).json({
            success: true,
            data: registration,
            token: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: error
        })
    }
}

//Method         POST
//Endpoint       /auth/login
//Description    Logging in a account and recieving token

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    
    if( !email || !password ) {
        return res.status(500).json({
            success: false,
            msg: 'Please enter a username and password'
        })
    }

    const user = await UserSchema.findOne({ email }).select('+password');

    if (!user) {
        return res.status(500).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    const isMatch = await user.comparePass(password);

    if(!isMatch) {
        return res.status(500).json({
            success: false,
            msg: 'Invalid credentials'
        })
    }

    const token = user.getSignedJwt();

    res.status(200).json({
        success: true,
        token: token
    });
}

exports.getMe = async (req, res, next) => {
    const user = await UserSchema.findById(req.user.id);

    res.status(200).json({
        data: user
    });
}