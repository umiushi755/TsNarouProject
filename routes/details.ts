import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.render('details');
  // res.render("index", { title: "Express" });
});