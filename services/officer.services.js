import axios from 'axios'
import { db } from '../config/db.js'

export const getOfficer = async (idNum) => {
  try {
    const officer = await axios.post(
      'https://auth.app.dlsu-lscs.org/member-id',
      { id: idNum },
      {
        headers: {
          Authorization: `Bearer <API-KEY>`,
          'Content-Type': 'application/json',
        },
      }
    )

    return officer.data
  } catch (error) {
    return null
  }
}

export const addOfficer = async (
  officer_id,
  full_name,
  email,
  committee_name
) => {
  await db.query(
    `INSERT INTO officers (officer_id, full_name, email, committee_name)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE 
       full_name = VALUES(full_name),
       email = VALUES(email),
       committee_name = VALUES(committee_name)`,
    [officer_id, full_name, email, committee_name]
  )
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
