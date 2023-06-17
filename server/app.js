const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const path = require("path");

//require sequelize
const { sequelize } = require("./models");
const app = express();

//app init
app.set("port", process.env.PORT || 3001);
app.use(cors());

//connect databases
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error(err);
  });

//server log
app.use(morgan("dev"));

//path
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//init session and passport
app.use(express.urlencoded({ extended: false }));

//router

const postRouter = require("./router/post");

app.use("/posts", postRouter);

//error middleware
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
});
app.use((err, req, res, next) => {
  res.local.message = error.message;
  res.local.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

//server running
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
