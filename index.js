'use strict';

const express = require('express');
require('dotenv').config();

const app = express();

app.use('/', require('./routes/SQLQueries'));
// Testing basic MySQL Database and Table creation
app.use('/createdatabase', require('./routes/SQLQueries'));
app.use('/createtable', require('./routes/SQLQueries'));

const PORT = process.env.PORT || 8000;

app.listen(PORT, (errors) => {
    if (errors) {
        console.error(`PORT ${PORT} caught error at: ${errors}`);
    }

    console.log(`PORT ${PORT} is active.`);
});
 