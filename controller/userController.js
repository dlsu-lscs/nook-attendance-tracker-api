export const authUser = (req, res) => {
  const { idNum } = req.body;

  res.status(200).json({ message: "ID Number found", data: idNum });
};
