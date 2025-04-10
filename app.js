const express = require("express");
const mongoose = require("mongoose");
const app = express()

const path = require("path");

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(3000, () => {
    console.log("ポート3000番で起動中");
});
