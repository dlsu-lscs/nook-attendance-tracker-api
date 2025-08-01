import * as attendanceService from "../services/attendance.services.js";

export const getActiveOfficers = async (req, res) => {
  try {
    const attendance = await attendanceService.getActiveOfficers();

    console.log(attendance);

    return res
      .status(200)
      .json({ message: "Fetched Attendance", data: attendance });
  } catch (err) {
    console.error("Error handling tap:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getOfficerAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getOfficerAttendance();

    console.log(attendance);

    return res
      .status(200)
      .json({ message: "Fetched Attendance", data: attendance });
  } catch (err) {
    console.error("Error handling tap:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommitteeAttendance = async (req, res) => {
  try {
    const attendance = await attendanceService.getCommitteeAttendance();

    console.log(attendance);

    return res
      .status(200)
      .json({ message: "Fetched Attendance", data: attendance });
  } catch (err) {
    console.error("Error handling tap:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
