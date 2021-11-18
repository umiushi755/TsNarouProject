import { Router } from "express"
import 'reflect-metadata'
import { container } from 'tsyringe'
import Author from "./api/repositories/author"
import Ranking from "./api/repositories/ranking"
import AppDatabase from "./appDatabase"
import { SqlConst } from "./sqlConst"

export const router = Router()

container.register(SqlConst.DB_NAME, {
    useClass: AppDatabase
})

router.get("/", (req, res, next) => res.render("index", { title: "Express" }));

// const ranking = new Ranking()
// // パラメータ無し
// ranking.findTotalRankingTop()
// // パラメータあり
// ranking.findGenreRankingTop("1")

// const author = new Author()
// // パラメータ無し
// author.findAuthorFromKeyword()
// // パラメータあり キーワードとオフセット
// author.findAuthorFromKeyword(["1"], 20)
// パラメータあり キーワードとオフセットとリミット
// author.findAuthorFromKeyword(["あ", "い", "う", "あ"], 20, 30)