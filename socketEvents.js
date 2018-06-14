var users=[];
events = function(io){
    io.on('connection', (socket) =>{
        
        socket.on('subscribe', (user) => {
            socket.join(user.room);
            users[user.nickname]=user;
        });

        socket.on('unsubscribe', (user) => {
            socket.leave(user.room);
            console.log(user.name+' left '+user.room);
        });
    });

    setInterval(function(){
        console.log(users);    
    },1000);

}
module.exports = events;
