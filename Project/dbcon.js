/*
    THIS CODE IS HEAVILY BORROWED FROM https://github.com/wolfordj/CS290-Server-Side-Examples
    Code implemented is also borrowed from w3schools.com and stackOverflow.
*/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_toddgr',
  password        : '1737',
  database        : 'cs340_toddgr'
});
module.exports.pool = pool;
