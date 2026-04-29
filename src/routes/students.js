import express from "express";
import studentController from "../controllers/studentController.js";
import validateRequest from "../middleware/validateRequest.js";
import validateObjectId from "../middleware/validateObjectId.js";

const router = express.Router();

router.post("/", validateRequest.validateStudentBody, studentController.createStudent);
router.get("/", studentController.getStudents);
router.get("/top", studentController.getTopStudents);
router.get("/stats/avg", studentController.getAverageScore);
router.get("/search", studentController.searchStudents);
router.get("/:id", validateObjectId, studentController.getStudentById);
router.put("/:id", validateObjectId, validateRequest.validateStudentBody, studentController.updateStudent);
router.delete("/:id", validateObjectId, studentController.deleteStudent);
router.patch("/:id/score", validateObjectId, validateRequest.validateScoreBody, studentController.updateStudentScore);

export default router;
