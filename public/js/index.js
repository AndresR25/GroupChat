let socket = io( 'http://localhost:8000' );

let userName = prompt("What is your name?")

$( '.messageForm' ).on( 'submit', function(event){
    event.preventDefault();

    let userMessage = $( '#userMessage' ).val();

    let send = {
        id : socket.id,
        name: userName,
        message: userMessage
    };

    socket.emit( 'sendMessage', send );
});



socket.on( 'sendAll', function( data ){
    let newMessage = `<p> ${data.name}: ${data.message} </p>`;
    $( '.messageBox' ).append( newMessage );
});