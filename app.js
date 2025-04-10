const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Campground = require("./models/campground");

// mongDBの接続設定：データベース名はcampground
mongoose.connect("mongodb://localhost:27017/campground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("データベースに成功");
}).catch((error) => {
    console.log("データベースに失敗");
    console.log(error);
})

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("home");
});

// キャンプ場の作成
app.get("/makecampground", async (req, res) => {
    // キャンプ場のデータベースのモデルを作成
    const camp = new Campground({title: "私のキャンプ場", description: "これは私のキャンプ場です"});
    // キャンプ場のデータベースのモデルを保存
    await camp.save();
    // キャンプ場のデータベースのモデルを表示
    res.send(camp);
});

app.listen(3000, () => {
    console.log("ポート3000番で起動中");
});
