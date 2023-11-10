const privateKey = "93df6da721fb7bb2cc48781c5545a5a04848b44e";
const publicKey = "d7cb7d751f1fa9ea10240d6905c9062e";
let ts = new Date().getTime();

function generateMD5Hash(data) {
    const hash = CryptoJS.MD5(data);
    const hashHex = hash.toString(CryptoJS.enc.Hex);
    return hashHex;
}
const inputString = ts + privateKey + publicKey;
const md5Hash = generateMD5Hash(inputString);

const home = document.querySelector("#home");
const search_btn = document.querySelector("#search-btn");
const search_bar = document.querySelector("#search-bar");
const search_bar_btn = document.querySelector("#search-bar-btn");
const home_cardbox = document.querySelector("#home_cardbox");
const home_name_1 = document.querySelector("#home_name-1");
const home_des_1 = document.querySelector("#home_des-1");
const home_name_2 = document.querySelector("#home_name-2");
const home_des_2 = document.querySelector("#home_des-2");
const home_name_3 = document.querySelector("#home_name-3");
const home_des_3 = document.querySelector("#home_des-3");
const card = document.querySelectorAll(".card");

const superheros = document.querySelector("#superheros");
const btn = document.querySelector("#button");
const superheros_name = document.querySelector("#superheros_name");
const superheros_description = document.querySelector(
    "#superheros_description"
);
const superheros_series = document.querySelector("#superheros_series");
const superheros_comics = document.querySelector("#superheros_comics");

let api = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${md5Hash}`;
let filteredData;
fetch(api)
    .then((response) => response.json())
    .then((data) => {
        filteredData = data.data.results;
        home_name_1.textContent = filteredData[1].name;
        home_des_1.textContent = filteredData[1].description;
        home_name_2.textContent = filteredData[2].name;
        home_des_2.textContent = filteredData[2].description;
        home_name_3.textContent = filteredData[15].name;
        home_des_3.textContent = filteredData[15].description;
        home_cardbox.style.visibility = "visible";
    });

Array.from(card).map((x) =>
    x.addEventListener("click", (e) => {
        let name = e.currentTarget.querySelector("p").textContent;
        let index = filteredData.findIndex((obj) => obj.name === name);

        superheros_name.textContent = filteredData[index].name;
        superheros_description.textContent = filteredData[index].description;
        let comics = "";
        let series = "";
        filteredData[index].comics.items.map((item) => {
            comics += item.name + ", ";
        });
        filteredData[index].series.items.map((item) => {
            series += item.name + ", ";
        });
        // console.log(series);
        // console.log(superheros_series);
        superheros_series.textContent = series;
        superheros_comics.textContent = comics;
        home.style.filter = "blur(20px)";
        home.style.zIndex = -20;
        superheros.style.visibility = "visible";
        comics = null;
        series = null;
    })
);

search_btn.addEventListener("click", () => {
    search_bar.focus();
});

btn.addEventListener("click", () => {
    home.style.filter = "none";
    home.style.zIndex = 50;
    superheros.style.visibility = "hidden";
});

// console.log(stringSimilarity.compareTwoStrings("akash", "prakash"));
// console.log(filteredData);

function matchingVal(val) {
    let match = 0;
    let index = 0;
    filteredData.map((x) => {
        let compareVal = stringSimilarity.compareTwoStrings(val, x.name);
        if (compareVal > match) {
            match = compareVal;
            index = filteredData.findIndex((e) => e.name == x.name);
        }
    });

    let comics = "";
    let series = "";
    filteredData[index].comics.items.map((item) => {
        comics += item.name + ", ";
    });
    filteredData[index].series.items.map((item) => {
        series += item.name + ", ";
    });

    superheros_name.textContent = filteredData[index].name;
    superheros_description.textContent = filteredData[index].description;
    superheros_series.textContent = series;
    superheros_comics.textContent = comics;

    home.style.filter = "blur(20px)";
    home.style.zIndex = -20;
    superheros.style.visibility = "visible";
    comics = null;
    series = null;
    match = null;
    index = null;
}

search_bar_btn.addEventListener("click", () => {
    if (filteredData.length > 0 && search_bar.value.length > 2) {
        matchingVal(search_bar.value);
    }
});
