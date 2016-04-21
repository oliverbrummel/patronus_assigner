var pg = require("pg");

var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  connectionString = process.env.DATABASE_URL;
} else {
  connectionString = "postgres://localhost:5432/WitchPatronus";
}


function initializeDB() {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      console.log('connectionString:', connectionString);
      console.log("Error connection to DB", err);
      process.exit(1);
    } else {
      var query = client.query("CREATE TABLE IF NOT EXISTS patronus " +
        "(patronus_id SERIAL PRIMARY KEY," +
        "patronus_name character varying(100) NOT NULL" +
        ");" +

        "CREATE TABLE IF NOT EXISTS people " +
        "(id SERIAL PRIMARY KEY," +
        "first_name character varying(50) NOT NULL," +
        "last_name character varying(50) NOT NULL," +
        "patronus_id INT REFERENCES patronus(patronus_id)" +
        ");"
        );  //  query

      query.on("end", function() {
        console.log("Schema creation successful");
        done();
      }); //  query.on("end")

      query.on("error", function() {
        console.log("Schema creation unsuccessful");
        process.exit(1);
      }); //  query.on("error")
    } //  else
  }); //  pg.connect
} //  initializeDB()


//  Export

module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
