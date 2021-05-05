/*
    THIS CODE IS HEAVILY BORROWED FROM https://github.com/wolfordj/CS290-Server-Side-Examples
    Code implemented is also borrowed from w3schools.com and stackOverflow.
*/

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete) {
        mysql.pool.query("SELECT customerID, cFirstName, cLastName, cPhone FROM `customers`", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    /*getOrder instead of getStore*/
    function getOrder(res, mysql, context, complete) {
        mysql.pool.query("SELECT itemID, type, brand, it_sizeID FROM `items`", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.store = results;
            complete();
        });
    }


    // function getCustomer(req, res, mysql, context, complete) {
    //     var query = "SELECT customerID, cFirstName, cLastName, cPhone FROM `customers`";
    //     console.log(req.params)
    //     var inserts = [req.params.cLastName]
    //     mysql.pool.query(query, inserts, function (error, results, fields) {
    //         if (error) {
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.customers = results;
    //         complete();
    //     });
    // }


    /* SELECT customers function. Retrieves all information on customers from the database. */
    function getCustomer(res, mysql, context, customerID, complete){
        var sql = "SELECT customerID, cFirstName, cLastName, cPhone FROM `customers` WHERE customerID = ?";
        var inserts = [customerID];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customer = results[0];
            complete();
        });
    }


    //     function getStore(res, mysql, context, complete) {
    //     mysql.pool.query("SELECT storeID, locationState, locationCity FROM `stores`", function (error, results, fields) {
    //         if (error) {
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.store = results;
    //         complete();
    //     });
    // }


    /* Find people whose fname starts with a given string in the req */
    function getCustomerWithNameLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
        var query = "SELECT customerID, cFirstName, cLastName, cPhone FROM customers INNER JOIN stores ON primaryStoreID = stores.storeID WHERE customers.cFirstName LIKE " + mysql.pool.escape(req.params.s + '%');
        console.log(query)

        mysql.pool.query(query, function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

//This code is breaking the code but likely needs to be used
    // function getCustomers(res, mysql, context, id, complete) { //getPerson
    //     var sql = "SELECT customerID, cFirstName, cLastName, cPhone FROM customers WHERE eustomerID = ?";
    //     var inserts = [customerID];
    //     mysql.pool.query(sql, inserts, function (error, results, fields) {
    //         if (error) {
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.person = results[0];
    //         complete();
    //     });
    // }


    /*Display all customers. Requires web based javascript to delete users with AJAX*/
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js", "filterCustomers.js", "searchCustomers.js"];
        var mysql = req.app.get('mysql');
        getCustomers(res, mysql, context, complete);
        getOrder(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('customers', context);
            }

        }
    });

    /*Display all customers who work at a given store. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:store', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js", "filterCustomer.js", "searchCustomer.js"];
        var mysql = req.app.get('mysql');
        // getStoreEmployees(req, res, mysql, context, complete);
        getOrder(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('customers', context);
            }

        }
    });

    /*Display all customers whose first name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteCustomer.js", "filterCustomer.js", "searchCustomer.js"];
        var mysql = req.app.get('mysql');
        getCustomerWithNameLike(req, res, mysql, context, complete);
        getOrder(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('customers', context);
            }
        }
    });

    /* Display one customer for the specific purpose of updating employees */
    router.get('/:customerID', function (req, res) {
        callbackCount = 0;
        var context = {};
        context.jsscripts = [ "updateCustomer.js"]; // removed "selectedCustomer.js",
        var mysql = req.app.get('mysql');
        getCustomer(res, mysql, context, req.params.customerID, complete);
        // getOrder(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('update-customer', context);
            }

        }
    });

    /* Adds a customer, redirects to the employees page after adding */
    router.post('/', function (req, res) {
        // console.log(req.body.store)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers (customerID, cFirstName, cLastName, cPhone) VALUES (?,?,?,?)";
        var inserts = [req.body.customerID, req.body.cFirstName, req.body.cLastName, req.body.cPhone];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.redirect('/customers');
            }
        });
    });

    /* The URI that update data is sent to in order to update an employee */
    router.put('/:customerID', function (req, res) {
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.customerID)
        var sql = "UPDATE customer SET cFirstName=?, cLastName=?, cPhone=? WHERE customerID=?";
        var inserts = [req.body.cFirstName, req.body.cLastName, req.body.cPhone, req.params.customerID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            } else {
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete an employee, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:customerID', function (req, res) {
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM customers WHERE customerID = ?";
        var inserts = [req.params.customerID];
        sql = mysql.pool.query(sql, inserts, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            } else {
                res.status(202).end();
            }
        })
    })

    return router;
}();
