import { Router } from "express";

export const router = Router();

router.get("/", (req, res, next) => {
  res.render('masterpiece_list');
  // res.render("index", { title: "Express" });
});