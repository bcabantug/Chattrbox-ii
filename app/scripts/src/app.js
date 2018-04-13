//import
import socket from "./ws-client";
import {ChatForm, ChatList, promptForUsername} from "./dom";

//constants for HTML
const FORM_SELECTOR = "[data-chat=\"chat-form\"]";
const INPUT_SELECTOR = "[data-chat=\"message-input\"]";
const LIST_SELECTOR = "[data-chat=\"message-list\"]"; //for messages list

let username = ""; //calls username prompt to appear
username = promptForUsername();

//will be used for application logic
class ChatApp{
  //constructor
  constructor(){
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR); //creates new ChatForm with
    this.chatList = new ChatList(LIST_SELECTOR, username); // used to be 'wonderwoman'
    //console.log("Hello, ES6!");
    socket.init("ws://localhost:3001");


    socket.registerOpenHandler(() => {
      // let message = new ChatMessage( {message: "pow!" } );
      // socket.sendMessage(message.serialize());

      //takes the message and sends the callback with the data
      this.chatForm.init((data) => {
        let message = new ChatMessage({message: data});
        socket.sendMessage(message.serialize());
      })
    });

    socket.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage(data); //gets the data and creates new ChatMessage
      this.chatList.drawMessage(message.serialize()); //serializes the data and sends it to the
    });
  }
}

//creating a chat message class
class ChatMessage{
  constructor({
    //use of destructuring assignment syntax for parameters
    message: m,
    user: u = username, //former 'batman'
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
