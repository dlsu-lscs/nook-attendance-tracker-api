import * as attendanceService from "../services/attendance.services.js";
import * as officerService from "../services/officer.services.js";

export const tapOfficer = async (req, res) => {
  const { idNum } = req.body;

  try {
    let officer = await officerService.getOfficer(parseInt(idNum));

    if (!officer) {
      return res.status(404).json({ message: "No Officer Found" });
    }

    await officerService.addOfficer(
      officer.id,
      officer.full_name,
      officer.email,
      officer.committee_name
    );

    const attendance = await attendanceService.getGivenAttendance(idNum);

    if (attendance) {
      await officerService.tapOut(attendance.attendance_id);
      return res.json({ message: `${officer.full_name} has left the nook` });
    } else {
      await officerService.tapIn(idNum);
      return res.json({ message: `${officer.full_name} has entered the nook` });
    }
  } catch (err) {
    console.error("Error handling tap:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
