import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;
const PORT = 5000;

//M3pU9K4WXEE0dJGP

async function main() {
  try {
    await mongoose.connect(`mongodb+srv://mongodb:M3pU9K4WXEE0dJGP@cluster0.4oskfev.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Connected to Mongodb in Mongoose");
    server = app.listen(PORT, () => {
      console.log(`App is listening is port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
