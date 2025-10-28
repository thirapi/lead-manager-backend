import express, { Request, Response } from "express";
import cors from "cors";
import { LeadsRepository } from "./repositories/leads.repository";
import mongoose from "mongoose";
import z from "zod";

const leadsSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    status: z.enum(["New", "Engaged", "Proposal Sent", "Closed-Won", "Closed-Lost"]).optional(),
});

require("dotenv").config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const leadsRepository = new LeadsRepository();

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        app: "Lead Manager",
        status: "running",
        timestamp: new Date().toISOString()
    });
});

app.get("/leads", async (req: Request, res: Response) => {
    try {
        const leads = await leadsRepository.getAll();
        res.status(200).json({
            data: leads,
            meta: {
                count: leads.length,
                timestamp: new Date().toISOString()
            }
        });
    } catch (err) {
        res.status(500).json({
            error: {
                code: "SERVER_ERROR",
                message: "Internal server error"
            }
        });
    }
});

app.post("/leads", async (req: Request, res: Response) => {
    try {
        const parsed = leadsSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                error: {
                    code: "VALIDATION_ERROR",
                    message: parsed.error.message,
                }
            });
        }

        try {
            const newLead = await leadsRepository.create(parsed.data);
            res.status(201).json({
                data: newLead,
                meta: {
                    timestamp: new Date().toISOString()
                }
            });
        } catch (err: any) {
            if (err.code === 11000) {
                return res.status(400).json({
                    error: {
                        code: "EMAIL_DUPLICATE",
                        message: "Email must be unique",
                    }
                });
            }
            throw err;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: {
                code: "SERVER_ERROR",
                message: "Error when saving data!",
            }
        });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
