const validMajors = ["IT", "Business", "Design", "Marketing"];

const validateStudentBody = (req, res, next) => {
    const { studentId, name, email, score, major } = req.body;

    if (!studentId || !name || !email || !major) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    if (typeof studentId !== "string" || typeof name !== "string" || typeof email !== "string") {
        return res.status(400).json({ message: "studentId, name, and email must be strings" });
    }

    if (score != null && (typeof score !== "number" || score < 0 || score > 100)) {
        return res.status(400).json({ message: "Score must be a number between 0 and 100" });
    }

    if (!validMajors.includes(major)) {
        return res.status(400).json({ message: `Major must be one of: ${validMajors.join(", ")}` });
    }

    next();
};

const validateScoreBody = (req, res, next) => {
    const { score } = req.body;

    if (score == null) {
        return res.status(400).json({ message: "Score is required" });
    }

    if (typeof score !== "number" || score < 0 || score > 100) {
        return res.status(400).json({ message: "Score must be a number between 0 and 100" });
    }

    next();
};

export default {
    validateStudentBody,
    validateScoreBody,
};
