const express = require( 'express' );
const app = express();

app.use(express.static(__dirname + "/public"));
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );

const server = app.listen(8000);

const io = require( 'socket.io' )( server );


let usersDB = [];
let messagesDB = [];

app.get( '/', function( request, response ){
    response.render( 'index', {messagesDB : messagesDB});
});

io.on( 'connection', function( socket ){
    console.log( "Someone just connected!" );
 

    socket.on( 'sendMessage', function( data ){
        if (usersDB.indexOf(data.id === -1)) {
            usersDB.push(data.name);
        }

        messagesDB.push(data.message);
        io.sockets.emit( 'sendAll', data ); 
    });
    
});