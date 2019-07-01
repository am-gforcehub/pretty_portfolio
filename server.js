require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var unirest = require("unirest");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3300;

unirest
  .get(
    "https://community-hacker-news-v1.p.rapidapi.com/topstories.json?print=pretty"
  )
  .header("X-RapidAPI-Host", "community-hacker-news-v1.p.rapidapi.com")
  .header(
    "X-RapidAPI-Key",
    "b6eef57956msha4e94eefd0fe4dep1d72ecjsn6fad9eb00d1e"
  )
  .end(function(result) {
    console.log(result.status, result.headers, result.body);
  });
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

unirest
  .post(
    "https://community-hacker-news-v1.p.rapidapi.com/item/8863.json?print=pretty"
  )
  .header("X-RapidAPI-Key", "6eef57956msha4e94eefd0fe4dep1d72ecjsn6fad9eb00d1e")
  .end(function(result) {
    console.log(result.status, result.headers, result.body);
  });

module.exports = app;
