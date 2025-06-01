import express from 'express'
import * as offficerController from '../controller/officer.controller.js'
const router = express.Router()

router.get('/attendance', offficerController.getNookAttendance)
router.post('/tap', offficerController.tapOfficer)

export default router
