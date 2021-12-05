import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.render('author_list');
  // res.render("index", { title: "Express" });
});