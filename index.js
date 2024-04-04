import express from "express";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
//security for Denial of Service of HTTP server
import net from 'node:net';
//security for headers
import helmet from "helmet";

const port = 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


const server = net.createServer(function (socket) {
  // socket.on('error', console.error) // this prevents the server to crash
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

app.use(express.static("public"));
app.use(helmet());
app.use('/robots.txt', function (req, res, next) {
  res.type('text/plain')
  res.send("User-agent: *\nDisallow: /");
});


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


app.use(function(req, res, next) {
  if (res.status === 404) {
  res.status(404).sendFile(__dirname + "/views/404.html");
  } else {
  res.status(500).sendFile(__dirname + "/views/500.html");
  }
  });

app.listen(process.env.PORT || port);