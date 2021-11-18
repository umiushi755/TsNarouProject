import { Router } from "express"
import 'reflect-metadata'
import { container } from 'tsyringe'
import Auther from "./api/repositories/auther"
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

// const auther = new Auther()
// // パラメータ無し
// auther.findAutherFromKeyword()
// // パラメータあり キーワードとオフセット
// auther.findAutherFromKeyword(["1"], 20)
// パラメータあり キーワードとオフセットとリミット
// auther.findAutherFromKeyword(["あ", "い", "う", "あ"], 20, 30)