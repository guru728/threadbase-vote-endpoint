
import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.post(
  "/:id/vote",
  async (req: Request, res: Response, next: NextFunction) => {
    const rawId = req.params.id;
    const postId = Number.parseInt(
      Array.isArray(rawId) ? "" : (rawId ?? ""),
      10,
    );
    const userId = 1;

    if (Number.isNaN(postId)) {
      res.status(400).json({ error: "Invalid post id" });
      return;
    }

    try {
      const [, updatedPost] = await prisma.$transaction([
        prisma.vote.create({
          data: { userId, postId },
        }),
        prisma.post.update({
          where: { id: postId },
          data: { score: { increment: 1 } },
        }),
      ]);

      res.status(201).json({
        message: "Vote recorded",
        score: updatedPost.score,
      });
    } catch (err: unknown) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          res.status(409).json({ error: "Already voted" });
          return;
        }

        if (err.code === "P2025" || err.code === "P2003") {
          res.status(404).json({ error: "Post not found" });
          return;
        }
      }

      next(err);
    }
  },
);

export default router;
