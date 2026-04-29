import studentService from "../services/studentService.js";

const createStudent = async (req, res, next) => {
    try {
        const student = await studentService.createStudent(req.body);
        res.status(201).json(student);
    } catch (error) {
        next(error);
    }
};

const getStudents = async (req, res, next) => {
    try {
        const result = await studentService.getStudents(req.query);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

const getStudentById = async (req, res, next) => {
    try {
        const student = await studentService.getStudentById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        next(error);
    }
};

const updateStudent = async (req, res, next) => {
    try {
        const student = await studentService.updateStudent(req.params.id, req.body);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        next(error);
    }
};

const deleteStudent = async (req, res, next) => {
    try {
        const student = await studentService.softDeleteStudent(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        next(error);
    }
};

const updateStudentScore = async (req, res, next) => {
    try {
        const student = await studentService.updateScore(req.params.id, req.body.score);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (error) {
        next(error);
    }
};

const getTopStudents = async (req, res, next) => {
    try {
        const students = await studentService.getTopStudents(req.query.limit);
        res.json(students);
    } catch (error) {
        next(error);
    }
};

const getAverageScore = async (req, res, next) => {
    try {
        const avg = await studentService.getAverageScore();
        res.json({ averageScore: avg });
    } catch (error) {
        next(error);
    }
};

const searchStudents = async (req, res, next) => {
    try {
        const students = await studentService.searchStudents(req.query.q);
        res.json(students);
    } catch (error) {
        next(error);
    }
};

export default {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    updateStudentScore,
    getTopStudents,
    getAverageScore,
    searchStudents,
};
