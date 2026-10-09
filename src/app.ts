
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import postsRouter from "./routes/posts.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary test authentication: every request uses user ID 1.
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.locals.user = { id: 1 };
  next();
});

app.use("/posts", postsRouter);

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Threadbase Vote API is running" });
});

app.use(
  (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  },
);

app.listen(PORT, () => {
  console.log(`Threadbase Vote API running at http://localhost:${PORT}`);
});
