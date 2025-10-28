export type LeadStatus = "New" | "Engaged" | "Proposal Sent" | "Closed-Won" | "Closed-Lost";

export interface Leads {
  _id?: string;
  name: string;
  email: string;
  status: LeadStatus;
  createdAt?: Date;
}

export interface LeadsInput {
  name: string;
  email: string;
  status?: LeadStatus;
}