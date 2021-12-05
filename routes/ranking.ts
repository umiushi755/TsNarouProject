import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.render('ranking');
  // res.render("index", { title: "Express" });
});