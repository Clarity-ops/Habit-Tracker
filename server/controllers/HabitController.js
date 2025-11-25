import Habit from "../models/Habit.js";

export const getAll = async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.userId });

    const habitsWithId = habits.map((habit) => ({
      ...habit._doc,
      id: habit._id,
    }));

    res.json(habitsWithId);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get habits" });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Habit({
      name: req.body.name,
      user: req.userId,
    });

    const habit = await doc.save();

    res.json({
      ...habit._doc,
      id: habit._id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create habit" });
  }
};

export const remove = async (req, res) => {
  try {
    const habitId = req.params.id;

    const habit = await Habit.findOneAndDelete({
      _id: habitId,
      user: req.userId,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete habit" });
  }
};
