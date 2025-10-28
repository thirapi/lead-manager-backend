import { Schema, model } from "mongoose";
import { Leads } from "../models/leads.model";

const LeadSchema = new Schema<Leads>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"],
    default: "New",
  },
  createdAt: { type: Date, default: Date.now },
});

export default model<Leads>("Lead", LeadSchema);
