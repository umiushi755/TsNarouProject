// const fs = require('fs').promises;
import fs from "fs";
const promiseFs = fs.promises;
// const readFile = promiseFs.readFileSync;

export async function readJsonFile(filePath : string) {
  return await promiseFs.readFile(filePath, "utf8")
  .then(function(data){
    const result = JSON.parse(data);
    return result;
  }).catch((err) => {
    console.log(err);
    return undefined;
  });
};