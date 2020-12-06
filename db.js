var mysql = require("mysql");

var connection = mysql.createConnection({
    host     : 'database-1.c7wj46neqwj0.us-east-2.rds.amazonaws.com',
    user     : 'admin',
    password : 'Sekesie428',
    port     : '3306',
});

connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
  });

  connection.end();