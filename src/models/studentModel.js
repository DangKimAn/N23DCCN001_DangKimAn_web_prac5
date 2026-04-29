import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        studentId: {
            type: String,
            required: [true, "studentId is required"],
            unique: true,
            trim: true,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Email must be valid"],
        },
        score: {
            type: Number,
            min: [0, "Score must be at least 0"],
            max: [100, "Score must be at most 100"],
            default: 0,
        },
        major: {
            type: String,
            enum: ["IT", "Business", "Design", "Marketing"],
            required: [true, "Major is required"],
        },
        enrollmentDate: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
