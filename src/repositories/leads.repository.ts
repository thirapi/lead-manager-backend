import { Leads, LeadsInput } from "../models/leads.model";
import LeadModel from "../mongoose/LeadModel";

export class LeadsRepository {
  async create(leads: LeadsInput): Promise<Leads> {
    const newLead = new LeadModel({
      name: leads.name,
      email: leads.email,
      status: leads.status || "New",
    });

    const savedLead = await newLead.save();
    return {
      _id: savedLead._id.toString(),
      name: savedLead.name,
      email: savedLead.email,
      status: savedLead.status,
      createdAt: savedLead.createdAt,
    };
  }

  async getAll(): Promise<Leads[]> {
    const result = await LeadModel.find();
    return result.map(r => ({
      _id: r._id.toString(),
      name: r.name,
      email: r.email,
      status: r.status,
      createdAt: r.createdAt,
    }));
  }
}
