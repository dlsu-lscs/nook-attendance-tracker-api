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

export const getOfficerAttendance = async () => {
  const query = `
  SELECT 
    o.full_name,
    o.committee_name,
    ROUND(SUM(TIMESTAMPDIFF(SECOND, a.tap_in_time, a.tap_out_time)) / 3600, 2) AS hours_rendered
  FROM attendance a
  INNER JOIN officers o ON a.officer_id = o.officer_id
  WHERE a.tap_out_time IS NOT NULL
  GROUP BY o.full_name, o.committee_name
  ORDER BY hours_rendered DESC`

  const [rows] = await db.execute(query)
  return rows
}

export const getCommitteeAttendance = async () => {
  const query = `
  SELECT 
    o.committee_name, 
    ROUND(SUM(TIMESTAMPDIFF(SECOND, a.tap_in_time, a.tap_out_time)) / 3600, 2) AS hours_rendered
  FROM attendance a 
  INNER JOIN officers AS o ON a.officer_id = o.officer_id
  WHERE a.tap_out_time IS NOT NULL
  GROUP BY o.committee_name
  ORDER BY hours_rendered DESC`

  const [rows] = await db.execute(query)
  return rows
}
