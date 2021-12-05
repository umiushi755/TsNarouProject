import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.render('analysis');
  // res.render("index", { title: "Express" });
});