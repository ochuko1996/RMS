const { StatusCodes } = require("http-status-codes");
const Department = require("../model/Department");

const addDepartment = async(req, res)=>{
    try {
        const department = await Department.create(req.body)
        res.status(StatusCodes.CREATED).json(department)
    } catch (error) {
        console.log(error);
    }
}

const getDepartments = async(req, res)=>{
    try {
        const departments = await Department.find()
        res.status(StatusCodes.OK).json(departments)
    } catch (error) {
        console.log(error);
    }
}

const getDepartment = async(req, res)=>{
    const id = req.params.id
    try {
        const department = await Department.findOne({_id: id})
        if(!department) return res.sendStatus(StatusCodes.BAD_REQUEST) 
        
        res.status(StatusCodes.OK).json(department)
        
    } catch (error) {
        console.log(error);
    }
}

const updateDepartment = async(req, res)=>{
    const id = req.params.id
    
    try {
        const updateDepartment = await Department.findOneAndUpdate(
            {_id: id},
            {$set: req.body},
            {returnOriginal: false}
            )
            res.status(StatusCodes.OK).json(updateDepartment)
            
        } catch (error) {
            console.log(error);
        }
    }
    
const deleteDepartment = async(req, res)=>{
    const id = req.params.id
    try {
        const department = await Department.findOneAndDelete({_id: id})
        res.status(StatusCodes.OK).json(updateDepartment)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addDepartment,
    getDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartments
}