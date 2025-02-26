import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    required: true,
  },
});

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);
export default AnnouncementModel;

