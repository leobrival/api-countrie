const sqlite3 = require("sqlite3").verbose();

// Remplacez ce chemin avec le chemin réel vers votre fichier de base de données SQLite
let db = new sqlite3.Database("./country.sqlite", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database.");
});

// Vous pouvez également tester en exécutant une requête simple
db.serialize(() => {
  db.each("SELECT name FROM sqlite_master WHERE type='table'", (err, table) => {
    if (err) {
      console.error(err.message);
    }
    console.log(table);
  });
});

// Fermez la connexion à la base de données
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Close the database connection.");
});
