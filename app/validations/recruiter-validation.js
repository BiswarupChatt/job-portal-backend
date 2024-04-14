const Recruiter = require('../models/recruiter-model')

const recruiterValidationSchema = {
    userId: {
        custom: {
            options: async function (value, { req }) {
                const recruiter = await Recruiter.findOne({
                    userId: req.user.id
                })
                if (recruiter) {
                    throw new Error('Recruiter Profile Already Created')
                } else {
                    return true
                }
            }
        }
    },
    companyName: {
        in: ['body'],
        exists: {
            errorMessage: 'company name is required'
        },
        notEmpty: {
            errorMessage: 'company name cannot be empty'
        },
    },
    website: {
        in: ['body'],
        exists: {
            errorMessage: 'website name is required'
        },
        notEmpty: {
            errorMessage: 'website name cannot be empty'
        },
        custom: {
            options: async function (value) {
                const recruiter = await Recruiter.findOne({ website: value })
                if (recruiter) {
                    throw new Error('website already exists')
                } else {
                    return true
                }
            }
        }
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address name is required'
        },
        notEmpty: {
            errorMessage: 'address name cannot be empty'
        },
    }
}

const recruiterEditValidationSchema = {
    companyName: {
        in: ['body'],
        exists: {
            errorMessage: 'company name is required'
        },
        notEmpty: {
            errorMessage: 'company name cannot be empty'
        },
    },
    website: {
        in: ['body'],
        exists: {
            errorMessage: 'website name is required'
        },
        notEmpty: {
            errorMessage: 'website name cannot be empty'
        },
    },
    address: {
        in: ['body'],
        exists: {
            errorMessage: 'address name is required'
        },
        notEmpty: {
            errorMessage: 'address name cannot be empty'
        },
    }
}

module.exports = { recruiterValidationSchema, recruiterEditValidationSchema }