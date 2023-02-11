const promise = require("promise");
const request = require("request");
const ROOT_DIR = require("path").resolve();


let activeUserList = [];
function VIDEO_CONF_API_PROCCESSING(request, socket){
    console.log("@@@@@@@@@@@@   calling  VIDEO_CONF_API_PROCCESSING fun......");

    if(request.category === "video_conf_new_user"){
        if(request.currentUser){
            activeUserList.push(request.currentUser);
            console.log("@@@@@@@@@  activeUserList : ", activeUserList);
            // socket.emit('updated-user-list', {users: activeUserList})
            socket.broadcast.emit("updated-user-list", {users: activeUserList});
        }
    }else{request.category === 'get_active_user_list'}{
        socket.emit("response-video-conf-call", {category: request.category, users: activeUserList})
    }

}











module.exports.VIDEO_CONF_API_PROCCESSING = VIDEO_CONF_API_PROCCESSING;
