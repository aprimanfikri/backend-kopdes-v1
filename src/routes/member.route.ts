import { Context, Hono } from "hono";
import { memberController } from "@/controllers/member.controller";

const memberRoute = new Hono();

memberRoute.get("/", (c: Context) => memberController.findAll(c));
memberRoute.post("/", (c: Context) => memberController.create(c));
memberRoute.get("/:id", (c: Context) => memberController.findById(c));
memberRoute.patch("/:id", (c: Context) => memberController.update(c));
memberRoute.delete("/:id", (c: Context) => memberController.delete(c));
memberRoute.get("/:code/code", (c: Context) => memberController.findByCode(c));

export default memberRoute;
