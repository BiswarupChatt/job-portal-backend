const userLoginValidationSchema = {
    email: {
        exists: {
            errorMessage: 'email is required'
        },
        notEmpty: {
            errorMessage: 'email cannot be blank'
        },
        isEmail: {
            errorMessage: 'invalid email format'
        },
        normalizeEmail: true,
        trim: true
    },
    password: {
        exists: {
            errorMessage: 'password is required'
        },
        notEmpty: {
            errorMessage: 'password cannot be empty'
        },
        isLength: {
            options: { min: 8, max: 128 },
            errorMessage: 'password should be between 8-128 character'
        },
        trim: true
    }
}

module.exports = userLoginValidationSchema