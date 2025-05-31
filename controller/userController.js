import axios from "axios";
export const authUser = async (req, res) => {
  const { idNum } = req.body;

  try {
    const response = await axios.post(
      "https://auth.app.dlsu-lscs.org/member-id",
      { id: 12308293 },
      {
        headers: {
          Authorization: `Bearer <API-KEY>`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    res.status(200).json({ message: "ID Number found", data: response });
  } catch {
    res.status(200).json({ message: "ID number not found" });
  }
};
