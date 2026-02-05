import  cookieParser  from 'cookie-parser';
// import cors from "cors";


import express, { Request, Response } from "express";


const app = express();

app.use(cookieParser());
app.use(express.json());
app.set("trust proxy", 1);

// app.use("/api",router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is a Multi-Tenant Organization Workspace API",
  });
});


export default app;
