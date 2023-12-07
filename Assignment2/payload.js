const payload = async (req, res) => {
  try {
    const data = req.body;
    const trimdata = data.str.trim();
    let strmatch = trimdata.split(/\s+/g);
    // 2) Using Regex to check there are atleast 8 word
    if (strmatch.length < 8) {
      // 4) Return Not Acceptable if not 8 words
      return res.status(400).json({ message: "Not Acceptable" });
    }
    // 3) Return 200 OK if at least 8 words
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
module.exports = payload;
