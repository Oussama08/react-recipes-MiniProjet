const fetch = require('node-fetch');
const fs = require('fs');

const APP_ID = ""; // Edaman.Com APP_ID
const APP_KEY = ""; // Edaman.Com APP_KEY
const QUERY = ""

const url = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&${QUERY}`;
var result = {}

fetch(url)
    .then(response => response.json())
    .then((data) =>{
        let ID = 0;
        data.hits.forEach(element => {
            var recipe = {
                    recipeID: ID,
                    title: element["recipe"].label,
                    image: element["recipe"].image,
                    description: "Recipe #"+ID+": Description",
                    time: element["recipe"].totalTime,
                    ingredients : element["recipe"].ingredients.map((i)=>{
                        return i.text;
                    })
            }
            result[""+ID]=recipe;
            ID++;
        });
    fs.writeFileSync('/recipes.json', JSON.stringify(result,null,3));
    });