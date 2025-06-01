import * as attendanceService from '../services/attendance.services.js'
import * as officerService from '../services/officer.services.js'

export const tapOfficer = async (req, res) => {
  const { idNum } = req.body

  try {
    let officer = await officerService.getOfficer(idNum)

    if (!officer) {
      res.status(404).json({ message: 'No Officer Found' })
    }

    await officerService.addOfficer(
      officer.id,
      officer.full_name,
      officer.email,
      officer.committee_name
    )

    const attendance = await attendanceService.getActiveAttendance(idNum)

    if (attendance) {
      await attendanceService.tapOut(attendance.attendance_id)
      return res.json({ message: `${officer.full_name} has left the nook` })
    } else {
      await attendanceService.tapIn(idNum)
      return res.json({ message: `${officer.full_name} has entered the nook` })
    }
  } catch (err) {
    console.error('Error handling tap:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getNookAttendance = async (res) => {
  try {
    const attendance = await attendanceService.getNookAttendance()

    return res
      .stats(200)
      .jdon({ message: 'Fetched Attendance', data: attendance })
  } catch (err) {
    console.error('Error handling tap:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
