'use strict';

const express = require('express');
const sqlRoute = express.Router();
const pool = require('../config/database');

sqlRoute.get('/', (req, res) => {
    return res.status(200).json({'response': 'Working Just fine'});

});

sqlRoute.get('/createdatabase', (req, res) => {
    const sqlCreateDB = `CREATE DATABASE node_mysql`;

    pool.query(sqlCreateDB, (error, results) => {
        if (error) {
            console.error(`FAILED CREATING MYSQL DB: ${error}`);
            return ;
        } else {
            console.log(`Database has been successfully created.`, results);
            return res.redirect('/');
        }
    });
});

sqlRoute.get('/createtable', (req, res) => {

    const sqlCreateTBL = `
    CREATE TABLE node_table(
        id INT(100) NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        PRIMARY KEY(id)
    ) ENGINE = INNODB`;

    pool.query(sqlCreateTBL, (error, results) => {
        if (error) {
            console.error(`FAILED CREATING MYSQL TABLE: ${error}`);
            return ;
        } else {
            console.log(`Table has been successfully created.`, results);
            return res.redirect('/');
        }
    });
});

sqlRoute.get('/listAll', (req, res) => {

    const sqlquery = `SELECT * FROM node_table WHERE 1`;

    pool.query(sqlquery, (error, results) => {
        if (error) {
            console.error(`FAILED RUNING QUERY: ${error}`);
            return ;
        } else {
            //console.log(`ALL RECORDS SELECTED`, results);
            Object.values(results).map((row) => {
                console.log({
                    'id': row.id,
                    'name': row.name,
                    'surname': row.surname,
                    'email': row.email
                })
            });
            return res.redirect('/');
        }
    });
});

sqlRoute.get('/listAll/:id', (req, res) => {
    
    const { id } = req.params;
    
    const sqlquery = `SELECT * FROM node_table WHERE id = ?`;

    pool.query(sqlquery, id, (error, results) => {
        if (error) {
            console.error(`FAILED RUNING QUERY: ${error}`);
            return ;
        } else {
            
            Object.values(results).map((row) => {
                console.log({
                    'id': row.id,
                    'name': row.name,
                    'surname': row.surname,
                    'email': row.email
                })
            });
            return res.redirect('/');
        }
    });
});

sqlRoute.get('/storeRecords', (req, res) => {

    const sqlquery = `INSERT INTO node_table SET ?`;
    const data = {
        name: 'Thomas',
        surname: 'Mokwatedi',
        email: 'test@gmail.com'
    }
    pool.query(sqlquery, data, (error, result) => {
        if (error) {
            console.error(`FAILED INSERTING RECORD: ${error}`);
            return ;
        } else {
            //console.log(`RECORD SAVED`, result);
            console.log({
                'fieldCount': result.fieldCount,
                'affectedRows': result.affectedRows,
                'insertId': result.insertId,
                'serverStatus': result.serverStatus,
                'warningCount': result.warningCount,
                'message': result.message,
                'protocol41': result.protocol41,
                'changedRows': result.changedRows
            });
            
            return res.redirect('/');
        }
    });
});

sqlRoute.get('/update/:id', (req, res) => {
    
    const { id } = req.params;
    let newName = `James Paul`;
    const sqlquery = `UPDATE node_table SET name = ? WHERE id = ?`;

    pool.query(sqlquery, [newName, id], (error, results) => {
        if (error) {
            console.error(`FAILED UPDATING RESULTS: ${error}`);
            return ;
        } else {
            
            console.log({
                'Affected Rows': results.affectedRows,
                'Server Status': results.serverStatus,
                'Message': results.message,
                'Changed Rows': results.changedRows
            });

            return res.redirect('/');
        }
    });
});

sqlRoute.get('/delete/:id', (req, res) => {
    
    const { id } = req.params;
    const sqlquery = `DELETE FROM node_table WHERE id = ?`;

    pool.query(sqlquery, id, (error, results) => {
        if (error) {
            console.error(`FAILED DELETING RESULTS: ${error}`);
            return ;
        } else {
            
            console.log({
                'Affected Rows': results.affectedRows,
                'Server Status': results.serverStatus,
                'Message': results.message,
                'Changed Rows': results.changedRows
            });

            return res.redirect('/');
        }
    });
});

module.exports = sqlRoute;