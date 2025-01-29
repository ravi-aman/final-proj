import mongoose, { Schema, Document } from "mongoose";

export interface IToDo extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    description: string;
    completed: boolean;
}

const todoSchema: Schema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
});

export const ToDo = mongoose.model<IToDo>("ToDo", todoSchema);
