const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
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
// expressに対して、フォームにデータを送信するときに、データを解析する
app.use(express.urlencoded({extended: true}));
// method-overrideを使用する
app.use(methodOverride("_method"));


// ホーム画面
app.get("/", (req, res) => {
    res.render("home");
});

// キャンプ場の一覧画面
app.get("/campgrounds", async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {campgrounds});
});

// キャンプ場の作成画面
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
})

// キャンプ場の詳細画面
app.get("/campgrounds/:id", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/show", {campground});
});

// キャンプ場の編集画面
app.get("/campgrounds/:id/edit", async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render("campgrounds/edit", {campground});
})

// キャンプ場の作成
app.post("/campgrounds", async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
})

// キャンプを編集する
app.put("/campgrounds/:id", async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
})

// ポート設定
app.listen(3000, () => {
    console.log("ポート3000番で起動中");
});
