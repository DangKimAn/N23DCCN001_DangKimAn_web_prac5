import Student from "../models/studentModel.js";

const createStudent = async (payload) => {
    const student = new Student(payload);
    return student.save();
};

const getStudents = async ({ page = 1, limit = 10, major }) => {
    const filter = { isActive: true };

    if (major) {
        filter.major = major;
    }

    const pageNumber = Math.max(Number(page), 1);
    const pageSize = Math.max(Number(limit), 1);

    const [students, total] = await Promise.all([
        Student.find(filter)
            .sort({ enrollmentDate: -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize),
        Student.countDocuments(filter),
    ]);

    return {
        meta: {
            page: pageNumber,
            limit: pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
        },
        data: students,
    };
};

const getStudentById = async (id) => {
    return Student.findOne({ _id: id, isActive: true });
};

const updateStudent = async (id, payload) => {
    return Student.findOneAndUpdate({ _id: id, isActive: true }, payload, {
        new: true,
        runValidators: true,
    });
};

const softDeleteStudent = async (id) => {
    return Student.findOneAndUpdate({ _id: id, isActive: true }, { isActive: false }, { new: true });
};

const updateScore = async (id, score) => {
    return Student.findOneAndUpdate(
        { _id: id, isActive: true },
        { score },
        { new: true, runValidators: true }
    );
};

const getTopStudents = async (limit = 5) => {
    const max = Math.max(Number(limit) || 5, 1);
    return Student.find({ isActive: true }).sort({ score: -1 }).limit(max);
};

const getAverageScore = async () => {
    const result = await Student.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, averageScore: { $avg: "$score" } } },
    ]);
    return result[0]?.averageScore ?? 0;
};

const searchStudents = async (keyword) => {
    if (!keyword) {
        return [];
    }

    return Student.find({
        isActive: true,
        name: { $regex: keyword, $options: "i" },
    }).sort({ name: 1 });
};

export default {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    softDeleteStudent,
    updateScore,
    getTopStudents,
    getAverageScore,
    searchStudents,
};
