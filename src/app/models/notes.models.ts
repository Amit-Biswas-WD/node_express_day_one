import { model, Schema, Types } from "mongoose";
import { INotes } from "../interfaces/notes.interfaces";

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, require: true, trim: true },
    content: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Personal", "Work", "Study", "Other"],
      default: "Personal",
    },
    pinned: {
      type: Boolean,
      default: true,
    },
    tags: {
      label: { type: String, require: true },
      color: { type: String, default: "Black" },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Note = model<INotes>("Note", noteSchema);
