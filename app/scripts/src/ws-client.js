//let prevents variable form being hoisted
let socket;
/*eslint-disable no-console*/
function init(url) {
  socket = new WebSocket(url);
  console.log("connecting...");
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = () => { //arrow function for es6: shorthand for anon function
    console.log("open"); //confimrs connection has been opened
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = (e) => { //receives the object from the callback, represents event and data object with JSON string in it
    console.log("message", e.data); //show the message from the object
    let data = JSON.parse(e.data); //parse the JSON data
    handlerFunction(data); //will forward it to handlerFunction
  };
}

//takes the message payload with teh info and make it a JSON string, and then send it to websocket server
function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

//specify what needs to be exported to function
export default {
  init, //equivalent of init: init (enhanced object literal)
  registerOpenHandler,
  registerMessageHandler,
  sendMessage
};
