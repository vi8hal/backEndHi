const educationModel = require("../Models/InfoModels/educationModel.js");
const experienceModel = require("../Models/InfoModels/experienceModel.js");
const projectsModel = require("../Models/InfoModels/projectsModel.js");

const skillsModel = require("../Models/InfoModels/skillsModel.js")
const userModel = require("../Models/userModel.js")
const Joi = require('joi');

const educationInfo = async function (req, res) {
    try {

        const { userDetailsID, School, Degree, Grade, yearOfpassout } = req.body;
        const educationSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            School: Joi.string().required(),
            Degree: Joi.string().required(),
            Grade: Joi.string().required(),
            yearOfpassout: Joi.string().required()
        });
        const validationResult = educationSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await educationModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Education data created' })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }


};
const experienceInfo = async function (req, res) {
    try {
        const { userDetailsID, status, title, typeOfjobs, companyName, companyType, companyLocation, skills } = req.body;
        const experienceSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            status: Joi.string(),
            title: Joi.string().required(),
            typeOfjobs: Joi.string().required(),
            companyName: Joi.string().required(),
            companyType: Joi.string(),
            companyLocation: Joi.string().required(),
            skills: Joi.string().required()

        });
        const validationResult = experienceSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await experienceModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Experience data created' })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }

};
const projectInfo = async function (req, res) {
    try {
        const projectSchema = Joi.object({
            userDetailsID: Joi.string().required(),
            projectName: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            typeOfjobs: Joi.string().required(),
            organizationName: Joi.string().required(),
            description: Joi.string().required(),
            
            Url: Joi.string().required(),
        });
        const validationResult = projectSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await projectsModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Project data created' });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
const skillsInfo = async function (req, res) {
    try {
        const skillsSchema = Joi.object({
            userDetailID: Joi.string().required(),
            skillTitle: Joi.string().required()
        });
        const validationResult = skillsSchema.validate(req.body, { abortEarly: false });
        if (validationResult.error) {
            return res.status(400).send({ status: false, message: validationResult.error.details[0].message });
        };
        const data = await skillsModel.create(req.body);
        if (data)
            return res.status(200).send({ status: true, data: data, message: 'Skills data created' });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const personalInfo = async function (req, res) {
    try {

        const id = req.params.id

        const user = await userModel.find({ _id: id })
        const educationData = await educationModel.find({ userDetailsID: id })
        const experienceData = await experienceModel.find({ userDetailsID: id })
        const skills = await skillsModel.find({ userDetailsID: id })

        const data = { user, educationData, experienceData, skills }
        return res.status(200).send({ status: true, data: data })


    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



module.exports = { educationInfo, experienceInfo, skillsInfo, projectInfo, personalInfo }
