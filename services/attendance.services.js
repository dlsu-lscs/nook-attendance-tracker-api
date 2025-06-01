import axios from 'axios'
import { db } from '../config/db.js'

export const getActiveAttendance = async (officerId) => {
  const [rows] = await db.query(
    `SELECT attendance_id FROM attendance
     WHERE officer_id = ? AND tap_out_time IS NULL
     ORDER BY tap_in_time DESC LIMIT 1`,
    [officerId]
  )
  return rows.length > 0 ? rows[0] : null
}

export const getNookAttendance = async () => {
  const query = `
    SELECT 
      lscs.full_name, 
      lscs.committee_name,
      ROUND(SUM(TIMESTAMPDIFF(SECOND, attendance.tap_in_time, attendance.tap_out_time)) / 3600, 2) AS hours_rendered
    FROM attendance
    INNER JOIN lscsOfficers AS lscs ON attendance.officer_id = lscs.officer_id
    WHERE attendance.tap_out_time IS NOT NULL
    GROUP BY lscs.full_name, lscs.committee_name
    ORDER BY hours_rendered DESC;
  `

  const [rows] = await db.execute(query)
  return rows
}

export async function tapIn(officerId) {
  await db.query(
    `INSERT INTO attendance (officer_id, tap_in_time)
     VALUES (?, NOW())`,
    [officerId]
  )
}

export async function tapOut(attendanceId) {
  await db.query(
    `UPDATE attendance SET tap_out_time = NOW()
     WHERE attendance_id = ?`,
    [attendanceId]
  )
}
