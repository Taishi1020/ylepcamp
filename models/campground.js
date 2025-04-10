const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// キャンプ場のデータベースのスキーマ
const campgroundSchema = new Schema({
    title: String,
    price: String,
    description: String,
    location: String,
});

// キャンプ場のデータベースのモデル
module.exports = mongoose.model("Campground", campgroundSchema);