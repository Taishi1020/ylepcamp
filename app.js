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

// ホーム画面
app.get("/", (req, res) => {
    res.render("home");
});

// キャンプ場の一覧画面
app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
});

// キャンプ場の詳細画面
app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", {campground});
});

// ポート設定
app.listen(3000, () => {
    console.log("ポート3000番で起動中");
});
