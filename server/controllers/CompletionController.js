import Completion from "../models/Completion.js";

export const getAll = async (req, res) => {
  try {
    const query = { user: req.userId };

    if (req.query.date) {
      query.date = req.query.date;
    }

    const completions = await Completion.find(query);

    const completionsForFrontend = completions.map((comp) => ({
      ...comp._doc,
      id: comp._id,
      habitId: comp.habit,
    }));

    res.json(completionsForFrontend);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get completions" });
  }
};

export const create = async (req, res) => {
  try {
    // Фронтенд надсилає: { habitId, date, userId (ігноруємо, беремо з токена) }
    const doc = new Completion({
      habit: req.body.habitId,
      user: req.userId,
      date: req.body.date,
    });

    const completion = await doc.save();

    res.json({
      ...completion._doc,
      id: completion._id,
      habitId: completion.habit,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create completion" });
  }
};

export const remove = async (req, res) => {
  try {
    const completionId = req.params.id;

    const completion = await Completion.findOneAndDelete({
      _id: completionId,
      user: req.userId,
    });

    if (!completion) {
      return res.status(404).json({ message: "Completion not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete completion" });
  }
};
