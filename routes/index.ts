import { Router } from "express"
import 'reflect-metadata'
import { container } from 'tsyringe'
import Author from "./api/repositories/author"
import Ranking from "./api/repositories/ranking"
import Novel from "./api/repositories/novel"
import AppDatabase from "./appDatabase"
import { SqlConst } from "./sqlConst"
import log4js from "log4js"

log4js.configure('./log4jsConfig.json');
const accesslog = log4js.getLogger('index');
// const errLog    = log4js.getLogger('error');

import * as  getJsonVal from "./api/readValue/json"

// export const getJ = "./api/readValue/json"

export const router = Router()

container.register(SqlConst.DB_NAME, {
    useClass: AppDatabase
})

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
  accesslog.info("indexを見ています。");
  // errLog.error("エラーです");
  indexMain(res);
  return;
  // res.render('index');
  // res.render("index", { title: "Express" });
});


async function indexMain(res : any){
  const filePass = 'public/json/top.json';
  const resultJsonData = await getJsonVal.readJsonFile(filePass);
  let viewData = {};
  if(resultJsonData != undefined){
    viewData = resultJsonData;
  }else{
    accesslog.error("jsonの取得に失敗しました。");
    accesslog.info("DBからパラメータ取得をします");
    const resultDbList = await getDbValueList();
    const resultList = editResults(resultDbList);
    // console.log(resultList);

    viewData = resultList;
  }
  res.render('index',viewData);
  return ;
};

async function getDbValueList(){
  const ranking = new Ranking();
  const resultData = await Promise.all([
    ranking.findTotalRankingTop(),//total
    ranking.findGenreRankingTop("1"),//love
    ranking.findGenreRankingTop("2"),//Fantasy
    ranking.findGenreRankingTop("3"),//文芸
    ranking.findGenreRankingTop("4"),//SF
    ranking.findGenreRankingTop("99"),//その他
    ranking.findGenreRankingTop("98")//ノンジャンル
  ]).then(function(value){
    return value;
  }).catch(function(error){
    return undefined;
  });

  return resultData;
};
let editResults = function(list : any) {
  let edited = {
    total:list[0],
    love:list[1],
    fantasy:list[2],
    literary:list[3],
    sf:list[4],
    other:list[5],
    nonGenre:list[6]
  };
  return edited;
};