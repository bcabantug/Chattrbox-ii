//import
import socket from "./ws-client";

//will be used for application logic
class ChatApp{
  //constructor
  constructor(){
    //console.log("Hello, ES6!");
    socket.init("ws://localhost:3001");

    
    socket.registerOpenHandler(() => {
      let message = new ChatMessage({message: "pow!" });
      socket.sendMessage(message.serialize());
    });

    socket.registerMessageHandler((data) => {
      console.log(data);
    });
  }
}

//creating a chat message class
class ChatMessage{
  constructor({
    //use of destructuring assignment syntax for parameters
    message: m,
    user: u = 'batman',
    timestamp: t =  (new Date()).getTime()
  }){ //assigns the parameters to the chatmessage object
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
//displays the object in plaintext
  serialize(){
    return{
      user: this.user,
      message: this.message,
      timestamp: this.timestamp
    };
  }
}

//creating new instance of ChatApp
//new ChatApp();


//through the addition of build and watch for browserify and watchify in JSON,
//export ChatApp class rather than creating an instance
export default ChatApp;
