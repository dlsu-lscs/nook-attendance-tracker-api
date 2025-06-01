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
