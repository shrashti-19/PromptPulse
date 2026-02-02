const Content = require("../models/Content");

const createContent = async (req, res) => {
  try {
    const { title, body, type } = req.body;

    // 1. Basic validation
    if (!title || !body || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Create content linked to logged-in user
    const content = await Content.create({
      title,
      body,
      type,
      userId: req.user.userId,
    });

    // 3. Send response
    res.status(201).json({
      message: "Content created successfully",
      contentId: content._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create content" });
  }
};

// const getMyContent = async (req, res) => {
//   try {
//     const content = await Content.find({
//       userId: req.user.userId, //ownership enforced 
//       isDeleted: false,
//     }).sort({ createdAt: -1 });

//     res.status(200).json(content);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch content" });
//   }
// };

// const getMyContent = async (req, res) => {
//   try {
//     const { search, type } = req.query;

//     let query = {
//       userId: req.user.userId,
//       isDeleted: false,
//     };

//     if (type) {
//       query.type = type;
//     }

//     if (search) {
//       query.$or = [
//         { title: { $regex: search, $options: "i" } },
//         { body: { $regex: search, $options: "i" } },
//       ];
//     }

//     const content = await Content.find(query).sort({ createdAt: -1 });

//     res.status(200).json(content);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch content" });
//   }
// };


//pagination
const getMyContent = async (req, res) => {
  try {
    const { search, type, page = 1, limit = 10 } = req.query;

    let query = {
      userId: req.user.userId,
      isDeleted: false,
    };

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { body: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const content = await Content.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch content" });
  }
};

//soft delete
const softDeleteContent = async (req, res) => {
  try {
    const { id } = req.params;

    const content = await Content.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { 
        isDeleted: true,
        deletedAt : new Date(),
      },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

//updating the content
const updateContent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body, type } = req.body;

    const content = await Content.findOneAndUpdate(
      { _id: id, userId: req.user.userId, isDeleted: false },
      { title, body, type },
      { new: true }
    );

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({
      message: "Content updated successfully",
      content,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};



module.exports = { createContent, getMyContent, softDeleteContent, updateContent};
