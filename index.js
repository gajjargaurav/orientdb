var config = require("config")
var OrientDB = require('orientjs');

console.log("server: " + config.orientdb.host + ":" + config.orientdb.port)
console.log("server_username: " + config.orientdb.server_username)
console.log("server_password: " + config.orientdb.server_password)

var server = OrientDB({
  host: config.orientdb.host,
  port: config.orientdb.port,
  username: config.orientdb.server_username,
  password: config.orientdb.server_password//,
  //transport: "rest"
})

console.log("database: " + config.orientdb.db)
console.log("db_username: " + config.orientdb.db_username)
console.log("db_password: " + config.orientdb.db_password)

var db = server.use({
  name: config.orientdb.db,
  username: config.orientdb.db_username,
  password: config.orientdb.db_password
})
//var db = server.use(config.orientdb.db)
server.create({
  name: 'mydb',
  type: 'graph',
  storage: 'plocal'
})
.then(function (db) {
  console.log('Created a database called ' + db.name);
});

server.list()
.then(function (dbs) {
  console.log('There are ' + dbs.length + ' databases on the server.');
})
.catch(function (err){
  console.error(err)
});

console.log('Using OrientDB database: ' + db.name);
//server.close();

module.exports = {
    server: server,
    db: db
}