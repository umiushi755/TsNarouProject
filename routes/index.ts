import { Router } from "express"
import 'reflect-metadata'
import { container } from 'tsyringe'
import Author from "./api/repositories/author"
import Ranking from "./api/repositories/ranking"
import Novel from "./api/repositories/novel"
import AppDatabase from "./appDatabase"
import { SqlConst } from "./sqlConst"

export const router = Router()

container.register(SqlConst.DB_NAME, {
    useClass: AppDatabase
})

// const ranking = new Ranking()
// // パラメータ無し
// ranking.findTotalRankingTop()
// // パラメータあり
// ranking.findGenreRankingTop("1")

// const author = new Author()
// // パラメータ無し
// author.findAuthorFromFreeWord()
// // パラメータあり キーワードとオフセット
// author.findAuthorFromFreeWord(["1"], 20)
// // パラメータあり キーワードとオフセットとリミット
// author.findAuthorFromFreeWord(["あ", "い", "う", "あ"], 20, 30)

// const novel = new Novel()
// novel.findNovelFromSearch(["スラ", "イム"])
// novel.findNovelFromSearch([], "101")
// // NovelType, RequiredKeywordは起動してすぐだとapp.tsやindex.tsで参照できないため、コメント解除しても正しく実行されない
// novel.findNovelFromSearch([], "", [NovelType.SERIAL])
// novel.findNovelFromSearch([], "", [], [RequiredKeyword.R15, RequiredKeyword.REINCARNATE])
// // 0~29, 30~59...となるため2ページ目を表示する場合、OFFSETは30
// novel.findNovelFromSearch([], "", [], [], 30, 20)
// novel.findNovelFromSearch(["スラ", "イム"], "101")
// novel.findNovelFromSearch(["スラ", "イム"], "101", [NovelType.SERIAL], [RequiredKeyword.R15, RequiredKeyword.REINCARNATE])

router.get("/", (req, res, next) => {
  res.render('index');
  // res.render("index", { title: "Express" });
});
