const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["note", "prompt", "text"],
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
   },

  },
  {
    timestamps: true,
  }
);

//indexing

contentSchema.index({ userId: 1, isDeleted: 1 });
contentSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Content", contentSchema);
