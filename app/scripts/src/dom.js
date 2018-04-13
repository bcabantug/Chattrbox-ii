//imports jquery for use after it's installed from npm
import $ from 'jquery';

//manages form selector in the dom
//export class through Named Exports to export multiple named values instead of single default value
export class ChatForm {
  constructor(formSel, inputSel){
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  //init: associate's a callback with the form's submit event
  init(submitCallback){
    this.$form.submit((event) => {
      event.preventDefault();
      let val =this.$input.val();
      submitCallback(val);
      this.$input.val("");
    });
    //finds the button and calls the submit when clicked
    this.$form.find("button").on("click", () => this.$form.submit());
  }
}
//used to create dom elemeents showing the messages and who sent it
export class ChatList {
  constructor(listSel, username){
    this.$list = $(listSel);
    this.$username = username;
  }
  //used to draw the messages
  drawMessage({user: u, timestamp: t, message: m}){
    let $messageRow = $("<li>",{
      "class" : "message-row"
    });
//extra styling for messages sent from self
    if(this.username === u){
      $messageRow.addClass("me");
    }
//generates the message
    let $message = $("<p>");

    $message.append($("<span>", {
      "class" : "message-username",
      text : u
    }));

    $message.append($("<span>", {
      "class" : "timestamp",
      "data-time" : t,
      text: (new Date(t)).getTime()
    }));

    $message.append($("<span>", {
      "class" : "message-message",
      text : m
    }));
//loads the message and scrolls it into view
    $messageRow.append($message);
    this.$list.append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }




}
