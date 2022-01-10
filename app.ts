import createHttpError from "http-errors";
import express from "express";
import { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import log4js from "log4js";

//router管理
import { router as indexRouter } from "./routes/index";
import { router as analysisRouter } from "./routes/analysis";
import { router as rankingRouter } from "./routes/ranking";
import { router as authorListRouter  } from "./routes/authorList";
import { router as masterpieceListRouter  } from "./routes/masterpieceList";
import { router as contactRouter  } from "./routes/contact";
import { router as detailsRouter   } from "./routes/details";
// import { router as restApiRouter   } from "./routes/rest";


log4js.configure('./log4jsConfig.json');

// TODO: JavaScriptファイルとの共存は後でやる
// import usersRouter from "./routes/users";

const port = 3000;
const app = express();

const logger = log4js.getLogger('access');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes制御
app.use("/", indexRouter);
app.use('/analysis', analysisRouter);
app.use('/ranking', rankingRouter);
app.use('/author_list', authorListRouter);
app.use('/masterpiece_list', masterpieceListRouter);
app.use('/contact', contactRouter);
app.use('/details', detailsRouter);

// TODO: JavaScriptファイルとの共存は後でやる
// app.use("/users", usersRouter);

app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError(404))
);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

//node app.jsで起動するためのやつ
app.listen(port, () => {
  logger.info(`listening at http://localhost:${port}`);
});

module.exports = app;