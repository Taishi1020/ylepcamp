const mongoose = require("mongoose");
const cities = require("./cities");
const {descriptors, places} = require("./seedHelpers");
const Campground = require("../models/campground");

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

// SeedHelperのサンプルデータを取得
const sample = array => array[Math.floor(Math.random() * array.length)];

// シードデータベースのデータを作成
const seedDB  = async () => {
    await Campground.deleteMany({});
    //データを50個作成
    for (let i = 0; i < 50; i++) {
        const randomCityINdex = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[randomCityINdex].city}, ${cities[randomCityINdex].prefecture}`,
            // SeedHelperのサンプルデータ
            title: `${sample(descriptors)} ${sample(places)}`,
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
