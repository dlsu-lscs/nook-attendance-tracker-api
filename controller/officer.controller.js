import {
  getActiveAttendance,
  tapIn,
  tapOut,
} from '../services/attendance.services.js'
import { addOfficer, getOfficer } from '../services/officer.services.js'

export const tapOfficer = async (req, res) => {
  const { idNum } = req.body

  console.log(idNum)
  try {
    let officer = await getOfficer(idNum)
    console.log(officer)

    if (!officer) {
      res.status(404).json({ message: 'No Officer Found' })
    }

    await addOfficer(
      officer.id,
      officer.full_name,
      officer.email,
      officer.committee_name
    )

    const attendance = await getActiveAttendance(idNum)
    if (attendance) {
      await tapOut(attendance.attendance_id)
      return res.json({ message: 'Tap out successful' })
    } else {
      await tapIn(idNum)
      return res.json({ message: 'Tap in successful' })
    }
  } catch (err) {
    console.error('Error handling tap:', err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
