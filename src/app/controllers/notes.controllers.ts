import express, { Request, Response } from "express";
import { Note } from "../models/notes.models";

export const notesRoutes = express.Router();

//create data
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  //notesRoutesroach 2 creating a data
  const body = req.body;
  const note = await Note.create(body);

  //notesRoutesroach 1 creating a data
  // const myNote = new Note({
  //   title: "Learning Express",
  //   tags: {
  //   label: "Database"
  //   }
  // });
  // await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note create successfully!!",
    note,
  });
});

//read data
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate("user");

  res.status(201).json({
    success: true,
    message: "Note retreived successfully!!",
    notes,
  });
});

//Single NoteId
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // const note = await Note.findOne({_id: noteId}); // ja kushi tai diye khoj korte pari (title, name, etc..)
  const note = await Note.findById(noteId); // shudu id diye chara khoj kora jabe na

  res.status(201).json({
    success: true,
    message: "Note single id read successfully!!",
    note,
  });
});

// update data
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  // const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true }); // Best
  // const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true}); // Good
  const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, {
    new: true,
  }); // Batter

  res.status(201).json({
    success: true,
    message: "Note updated successfully!!",
    note,
  });
});

// delete data
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId); // Best
  // const note = await Note.deleteOne({ _id: noteId }); // Good
  // const note = await Note.findOneAndDelete({ _id: noteId }); // Batter

  res.status(201).json({
    success: true,
    message: "Note Delete successfully!!",
    note,
  });
});
