import { Router } from "express";
import 'reflect-metadata'
import { container } from 'tsyringe'
import Ranking from "./api/repositories/ranking"
import AppDatabase from "./appDatabase"
import { SqlConst } from "./sqlConst"
import log4js from "log4js"
import * as  getJsonVal from "./api/readValue/json"

log4js.configure('./log4jsConfig.json');
const accesslog = log4js.getLogger('ranking');
export const router = Router();

container.register(SqlConst.DB_NAME, {
  useClass: AppDatabase
})

router.get("/", async (req, res, next) => {
  accesslog.info("rankingを見ています。");
  const filePass = 'public/json/ranking_big_genre.json';
  const tagfilePass = 'public/json/ranking_tag.json';
  // const genre = "bigGenre";
  const keyName = "総合";
  const keyNum = "0";
  const jsonKeyName = "total";
  // const param = createParam(keyName,keyNum,genre,filePass,jsonKeyName);
  const resultGenreJsonData = await getJsonVal.readJsonFile(filePass);
  const resultTagJsonData = await getJsonVal.readJsonFile(tagfilePass);

  let sendParam: { [key: string]: string | number | object| undefined } = {};
  sendParam.title = keyName;
  sendParam.category = keyNum;
  if(resultGenreJsonData != undefined){
    //dataの処理を記載
    sendParam.content = resultGenreJsonData[jsonKeyName];
  }else{
    let resultDbList = await bigGenreWrap(keyNum);
    sendParam.content = resultDbList;
  };
  sendParam.tagFlg = 0;
  if(resultTagJsonData == undefined){
    sendParam.tagFlg = -1;
  };
  sendParam.tags = resultTagJsonData;
  res.render('ranking', sendParam);
  // rankingMain(res,param);
  return;
});

// async function rankingMain(res : any,param:any){
//   const ranking = new Ranking();
//   const tagfilePass = 'public/json/ranking_tag.json';
//   const resultGenreJsonData = await getJsonVal.readJsonFile(param.filePass);
//   const resultTagJsonData = await getJsonVal.readJsonFile(tagfilePass);
//   let sendParam = undefined;
//   if(resultGenreJsonData != undefined){
//     //dataの処理を記載
//     let dataList =resultGenreJsonData;
//     let key = param.jsonKeyName;
//     const params ={
//       title :param.keyName,
//       category:param.keyNum,
//       content:dataList[key],
//     }
//     sendParam=params;
//   }else{
//     const resultDbList = await getDbValueList(param);
//     sendParam=resultDbList;
//   }
//   const resultData = await bigGenreWrap("1");
//   console.log(resultData);
//   res.render('ranking');
// };


async function bigGenreWrap(id : string){
  let idParam = id;
  const ranking = new Ranking();
  let resultData = undefined;
  if(id == "0"){
    idParam = "";
  } 
  resultData = await ranking.findBigGenreRanking(idParam)
  .then(function(value){
    return value;
  }).catch(function(error){
    console.log(error);
    return undefined;
  });

  return resultData;
};

async function smollGenreWrap(id : string){
  const ranking = new Ranking();
  const resultData = await ranking.findGenreRanking(id)
  .then(function(value){
    return value;
  }).catch(function(error){
    console.log(error);
    return undefined;
  });
  return resultData;
};


// router.get('/', function(req, res, next) {
//   //total
//   const filePass = 'public/json/ranking_big_genre.json';
//   const genre = "bigGenre";
//   const keyName = "総合";
//   const keyNum = 0;
//   const jsonKeyName = "total";
//   const param = createParam(keyName,keyNum,genre,filePass,jsonKeyName);
//   rankingMain(res,param);
// });

router.get('/cotegry/:key', async function(req, res) {//big
  const filePass = 'public/json/ranking_big_genre.json';
  const tagfilePass = 'public/json/ranking_tag.json';
  // const genre = "bigGenre";
  const keyName = req.params.key;
  const keyNum = cotegryNumSelect(keyName);
  const jsonKeyName = jsonCotegryKeySelect(keyNum);
  // const param = createParam(keyName,`${keyNum}`,genre,filePass,jsonKeyName);
  const resultGenreJsonData = await getJsonVal.readJsonFile(filePass);
  const resultTagJsonData = await getJsonVal.readJsonFile(tagfilePass);
  let sendParam: { [key: string]: string | number | object| undefined } = {};
  sendParam.title = keyName;
  sendParam.category = keyNum;
  if(resultGenreJsonData != undefined){
    //dataの処理を記載
    sendParam.content = resultGenreJsonData[jsonKeyName];
  }else{
    let resultDbList = await bigGenreWrap(`${keyNum}`);
    sendParam.content = resultDbList;
  };
  sendParam.tagFlg = 0;
  if(resultTagJsonData == undefined){
    sendParam.tagFlg = -1;
  };
  sendParam.tags = resultTagJsonData;
  res.render('ranking', sendParam);
  // rankingMain(res,param);
  return;
  // const param = createParam(keyName,keyNum,genre,filePass,jsonKeyName);
  // rankingMain(res,param);
});

router.get('/genre/:key', async function(req, res) {//smoll
  const filePass = 'public/json/ranking_genre.json';
  const tagfilePass = 'public/json/ranking_tag.json';
  const genre = "genre";
  const keyName = req.params.key;
  const keyNum = genreNumSelect(keyName);
  const jsonKeyName = jsonGenreKeySelect(keyNum);
  const resultGenreJsonData = await getJsonVal.readJsonFile(filePass);
  const resultTagJsonData = await getJsonVal.readJsonFile(tagfilePass);
  let sendParam: { [key: string]: string | number | object| undefined } = {};
  sendParam.title = keyName;
  sendParam.category = keyNum;
  if(resultGenreJsonData != undefined){
    //dataの処理を記載
    sendParam.content = resultGenreJsonData[jsonKeyName];
  }else{
    let resultDbList = await smollGenreWrap(`${keyNum}`);
    sendParam.content = resultDbList;
  };
  sendParam.tagFlg = 0;
  if(resultTagJsonData == undefined){
    sendParam.tagFlg = -1;
  };
  sendParam.tags = resultTagJsonData;
  res.render('ranking', sendParam);
  // const resultParam = createParam(keyName,keyNum,genre,filePass,jsonKeyName);
  // rankingMain(res,resultParam);
});

const createParam = function(keyName:String,keyNum:String,genre:String,filePass:String,jsonKeyName:String) {
  const param ={
    keyName : keyName,
    keyNum : keyNum,
    genre : genre,
    filePass : filePass,
    jsonKeyName : jsonKeyName
  };
  return param;
}
// let rankingMain = async function(res,param) {
//   const tagfilePass = 'public/json/ranking_tag.json';
//   const resultGenreJsonData = await getJsonValue.readJsonFile(param.filePass);
//   const resultTagJsonData = await getJsonValue.readJsonFile(tagfilePass);
//   let sendParam = undefined;
//   if(resultGenreJsonData != undefined){
//     //dataの処理を記載
//     let dataList =resultGenreJsonData;
//     let key = param.jsonKeyName;
//     const params ={
//       title :param.keyName,
//       category:param.keyNum,
//       content:dataList[key],
//     }
//     sendParam=params;
//   }else{
//     const resultDbList = await getDbValueList(param);
//     sendParam=resultDbList;
//   }
//   let tagResultFlg = 0;
//   if(resultTagJsonData == undefined){
//     tagResultFlg = -1;
//   }
//   sendParam.tagFlg = tagResultFlg;
//   sendParam.tags = resultTagJsonData;
//   console.log(sendParam);
//   res.render('ranking', sendParam);
// }
// let getDbValueList = async function(param) {
//   const resultData = await getDbValue.rankingPageNovelInfo(param);
//   let dataList=[];
//   //console.log(resultData);
//   for(i=0; i < resultData.length; i++){
//     let pushData={
//       ncode : resultData[i].ncode,
//       title : resultData[i].title,
//       auther_id : resultData[i].auther_id,
//       genre_name : resultData[i].genre[0].genre_name,
//       auther_name : resultData[i].auther[0].auther_name,
//       global_point : resultData[i].global_point
//     }
//     dataList.push(pushData);
//   }
//   const data = {
//     title: param.keyName,
//     category:param.keyNum,
//     content: dataList
//   };
//   return data;
// }

let jsonCotegryKeySelect = function(keyNum: number){
  let jsonKeyName = "total";
  if(keyNum == 1){
    jsonKeyName = "love";
  }else if(keyNum == 2){
    jsonKeyName = "fantasy";
  }else if(keyNum == 3){
    jsonKeyName = "literary";
  }else if(keyNum == 4){
    jsonKeyName = "sf";
  }else if(keyNum == 98){
    jsonKeyName = "other";
  }else if(keyNum == 99){
    jsonKeyName = "nonGenre";
  }
  return jsonKeyName;
}
let jsonGenreKeySelect = function(keyNum: number){
  let jsonKeyName = "";
  if(keyNum == 101){
    jsonKeyName = "differentWorld";
  }else if(keyNum == 102){
    jsonKeyName = "realWorld";
  }else if(keyNum == 201){
    jsonKeyName = "highFantasy";
  }else if(keyNum == 202){
    jsonKeyName = "lowFantasy";
  }else if(keyNum == 301){
    jsonKeyName = "pureLiterature";
  }else if(keyNum == 302){
    jsonKeyName = "humanDrama";
  }else if(keyNum == 303){
    jsonKeyName = "history";
  }else if(keyNum == 304){
    jsonKeyName = "reasoning";
  }else if(keyNum == 305){
    jsonKeyName = "horror";
  }else if(keyNum == 306){
    jsonKeyName = "action";
  }else if(keyNum == 307){
    jsonKeyName = "comedy";
  }else if(keyNum == 401){
    jsonKeyName = "virtualRealityGames";
  }else if(keyNum ==402){
    jsonKeyName = "space";
  }else if(keyNum == 403){
    jsonKeyName = "scienceFiction";
  }else if(keyNum == 404){
    jsonKeyName = "panic";
  }else if(keyNum == 9801){
    jsonKeyName = "nonGenre";
  }else if(keyNum == 9901){
    jsonKeyName = "fairyTale";
  }else if(keyNum == 9902){
    jsonKeyName = "poetry";
  }else if(keyNum == 9903){
    jsonKeyName = "essay";
  }else if(keyNum == 9904){
    jsonKeyName = "replay";
  }else if(keyNum == 9999){
    jsonKeyName = "other";
  }
  return jsonKeyName;
}

let cotegryNumSelect = function(keyName: String){
  let keyNum = 0;
  if(keyName == "恋愛"){
    keyNum = 1;
  }else if(keyName == "ファンタジー"){
    keyNum = 2;
  }else if(keyName == "文芸"){
    keyNum = 3;
  }else if(keyName == "SF"){
    keyNum = 4;
  }else if(keyName == "その他"){
    keyNum = 98;
  }else if(keyName == "ノンジャンル"){
    keyNum = 99;
  }
  return keyNum;
}
let genreNumSelect = function(keyName: String){
  let keyNum = 0;
  if(keyName == "異世界〔恋愛〕"){
    keyNum = 101;
  }else if(keyName == "現実世界〔恋愛〕"){
    keyNum = 102;
  }else if(keyName == "ハイファンタジー〔ファンタジー〕"){
    keyNum = 201;
  }else if(keyName == "ローファンタジー〔ファンタジー〕"){
    keyNum = 202;
  }else if(keyName == "純文学〔文芸〕"){
    keyNum = 301;
  }else if(keyName == "ヒューマンドラマ〔文芸〕"){
    keyNum = 302;
  }else if(keyName == "歴史〔文芸〕"){
    keyNum = 303;
  }else if(keyName == "推理〔文芸〕"){
    keyNum = 304;
  }else if(keyName == "ホラー〔文芸〕"){
    keyNum = 305;
  }else if(keyName == "アクション〔文芸〕"){
    keyNum = 306;
  }else if(keyName == "コメディー〔文芸〕"){
    keyNum = 307;
  }else if(keyName == "VRゲーム〔SF〕"){
    keyNum = 401;
  }else if(keyName == "宇宙〔SF〕"){
    keyNum = 402;
  }else if(keyName == "空想科学〔SF〕"){
    keyNum = 403;
  }else if(keyName == "パニック〔SF〕"){
    keyNum = 404;
  }else if(keyName == "ノンジャンル〔ノンジャンル〕"){
    keyNum = 9801;
  }else if(keyName == "童話〔その他〕"){
    keyNum = 9901;
  }else if(keyName == "詩〔その他〕"){
    keyNum = 9902;
  }else if(keyName == "エッセイ〔その他〕"){
    keyNum = 9903;
  }else if(keyName == "リプレイ〔その他〕"){
    keyNum = 9904;
  }else if(keyName == "その他〔その他〕"){
    keyNum = 9999;
  }

  return keyNum;
}

