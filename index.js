import express from "express";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs")
});

app.get("/patreon", (req,res) => {
    res.render("patreon.ejs")
});

app.get("/blogs", (req,res) =>{
    const posts = fs.readdirSync(__dirname + "/" +"views" + "/" +"blogs").filter(file => file.endsWith('.ejs'));
    const featuredPosts = ["What-are-habits__-And-why-are-they-important__","Having-a-bad-day__-Try-these-5-tips","You-are-made-of-stardust"]

    res.render("blogsList.ejs", {
        featuredPosts: featuredPosts,
        blogPosts: posts
      })
  });

  app.get("/blogs/:articles", (req,res) =>{
    res.render("blog.ejs",{
      blogThumbnailImg: "\\"+"magicbook160.png",
      blogHeadImg: "\\"+"headerdemo.png",
      blogTitle: req.params.articles,
      blogSummary: "Get 3 tips to improve your habits",
      blogTime: "2min",
      filename: req.params.articles+".ejs"
    })

});


app.get("/science_bites", (req,res) =>{
    const scienceBite = fs.readdirSync(__dirname + "/" +"views" + "/" +"science_bites").filter(file => file.endsWith('.ejs'));

    res.render("science_bites_List.ejs", {
        scienceBites: scienceBite
      })
  });

  app.get("/science_bites/:articles", (req,res) =>{
    const scienceBite = fs.readdirSync(__dirname + "/" +"views" + "/" +"science_bites").filter(file => file.endsWith('.ejs'));

    res.render("science_bite.ejs",{
      Title: req.params.articles,
      filename: req.params.articles+".ejs",
      scienceBites: scienceBite
    })

});

app.get("/chipmunk", (req,res)=>{
  res.sendFile(__dirname +"/views/science_bites/Tea_and_Biscuits_with_Chipmunk.html")
});

/*app.listen(port, () =>{
    console.log(`Server running on port ${port}`)
});*/

app.listen(process.env.PORT || port);