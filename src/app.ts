import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { validateCardNumber } from "./cardValidator";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.post("/api/validate-card", (req: Request, res: Response) => {
    const result = validateCardNumber(req.body?.cardNumber);

    if (!result.isValid) {
        return res.status(400).json({
            success: false,
            data: {
                isValid: false
            },
            error: {
                message: result.reason
            }
        });
    }

    return res.status(200).json({
        success: true,
        data: {
            isValid: true,
            cardNumber: result.normalizedCardNumber
        }
    });
});

app.use((_req: Request, res: Response) => {
    return res.status(404).json({
        success: false,
        error: {
            message: "Route not found"
        }
    });
});

export default app;