function pushJobsToClient(data) {}

exports = module.exports = function(io) {
    io.sockets.on("connection", function(socket) {
        console.log("socket io connected");
    });
};
