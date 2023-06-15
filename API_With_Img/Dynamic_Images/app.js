require("./Config/config")
const express = require( 'express' );
const router = require( './Route/route' );

const app = express();
app.use( express.json() );
app.use( '/uploads', express.static( "uploads" ) );

app.use( '/api', router );

module.exports = app;