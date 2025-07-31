import express from 'express'
import * as attendanceController from '../controller/attendance.controller.js'
const router = express.Router()

router.get('/officer/', attendanceController.getOfficerAttendance)
router.get('/committee/', attendanceController.getCommitteeAttendance)

export default router
