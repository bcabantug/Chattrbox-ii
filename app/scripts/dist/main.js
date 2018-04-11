(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wsClient = require("./ws-client");

var _wsClient2 = _interopRequireDefault(_wsClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } //import


//will be used for application logic
var ChatApp =
//constructor
function ChatApp() {
  _classCallCheck(this, ChatApp);

  //console.log("Hello, ES6!");
  _wsClient2.default.init("ws://localhost:3001");

  _wsClient2.default.registerOpenHandler(function () {
    var message = new ChatMessage({ message: "pow!" });
    _wsClient2.default.sendMessage(message.serialize());
  });

  _wsClient2.default.registerMessageHandler(function (data) {
    console.log(data);
  });
};

//creating a chat message class


var ChatMessage = function () {
  function ChatMessage(_ref) {
    var m = _ref.message,
        _ref$user = _ref.user,
        u = _ref$user === undefined ? 'batman' : _ref$user,
        _ref$timestamp = _ref.timestamp,
        t = _ref$timestamp === undefined ? new Date().getTime() : _ref$timestamp;

    _classCallCheck(this, ChatMessage);

    //assigns the parameters to the chatmessage object
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
  //displays the object in plaintext


  _createClass(ChatMessage, [{
    key: "serialize",
    value: function serialize() {
      return {
        user: this.user,
        message: this.message,
        timestamp: this.timestamp
      };
    }
  }]);

  return ChatMessage;
}();

//creating new instance of ChatApp
//new ChatApp();


//through the addition of build and watch for browserify and watchify in JSON,
//export ChatApp class rather than creating an instance


exports.default = ChatApp;

},{"./ws-client":3}],2:[function(require,module,exports){
"use strict";

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//create new chatapp instance
new _app2.default(); //importing ChatApp from ./app

},{"./app":1}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//let prevents variable form being hoisted
var socket = void 0;

function init(url) {
  socket = new WebSocket(url);
  console.log("connecting...");
}

function registerOpenHandler(handlerFunction) {
  socket.onopen = function () {
    //arrow function for es6: shorthand for anon function
    console.log("open"); //confimrs connection has been opened
    handlerFunction();
  };
}

function registerMessageHandler(handlerFunction) {
  socket.onmessage = function (e) {
    //receives the object from the callback, represents event and data object with JSON string in it
    console.log("message", e.data); //show the message from the object
    var data = JSON.parse(e.data); //parse the JSON data
    handlerFunction(data); //will forward it to handlerFunction
  };
}

//takes the message payload with teh info and make it a JSON string, and then send it to websocket server
function sendMessage(payload) {
  socket.send(JSON.stringify(payload));
}

//specify what needs to be exported to function
exports.default = {
  init: init, //equivalent of init: init (enhanced object literal)
  registerOpenHandler: registerOpenHandler,
  registerMessageHandler: registerMessageHandler,
  sendMessage: sendMessage
};

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9zcmMvYXBwLmpzIiwiYXBwL3NjcmlwdHMvc3JjL21haW4uanMiLCJhcHAvc2NyaXB0cy9zcmMvd3MtY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNDQTs7Ozs7OzBKQURBOzs7QUFHQTtJQUNNLE87QUFDSjtBQUNBLG1CQUFhO0FBQUE7O0FBQ1g7QUFDQSxxQkFBTyxJQUFQLENBQVkscUJBQVo7O0FBR0EscUJBQU8sbUJBQVAsQ0FBMkIsWUFBTTtBQUMvQixRQUFJLFVBQVUsSUFBSSxXQUFKLENBQWdCLEVBQUMsU0FBUyxNQUFWLEVBQWhCLENBQWQ7QUFDQSx1QkFBTyxXQUFQLENBQW1CLFFBQVEsU0FBUixFQUFuQjtBQUNELEdBSEQ7O0FBS0EscUJBQU8sc0JBQVAsQ0FBOEIsVUFBQyxJQUFELEVBQVU7QUFDdEMsWUFBUSxHQUFSLENBQVksSUFBWjtBQUNELEdBRkQ7QUFHRCxDOztBQUdIOzs7SUFDTSxXO0FBQ0osNkJBS0U7QUFBQSxRQUhTLENBR1QsUUFIQSxPQUdBO0FBQUEseUJBRkEsSUFFQTtBQUFBLFFBRk0sQ0FFTiw2QkFGVSxRQUVWO0FBQUEsOEJBREEsU0FDQTtBQUFBLFFBRFcsQ0FDWCxrQ0FEaUIsSUFBSSxJQUFKLEVBQUQsQ0FBYSxPQUFiLEVBQ2hCOztBQUFBOztBQUFFO0FBQ0YsU0FBSyxPQUFMLEdBQWUsQ0FBZjtBQUNBLFNBQUssSUFBTCxHQUFZLENBQVo7QUFDQSxTQUFLLFNBQUwsR0FBaUIsQ0FBakI7QUFDRDtBQUNIOzs7OztnQ0FDYTtBQUNULGFBQU07QUFDSixjQUFNLEtBQUssSUFEUDtBQUVKLGlCQUFTLEtBQUssT0FGVjtBQUdKLG1CQUFXLEtBQUs7QUFIWixPQUFOO0FBS0Q7Ozs7OztBQUdIO0FBQ0E7OztBQUdBO0FBQ0E7OztrQkFDZSxPOzs7OztBQ2pEZjs7Ozs7O0FBQ0E7QUFDQSxvQixDQUhBOzs7Ozs7OztBQ0FBO0FBQ0EsSUFBSSxlQUFKOztBQUVBLFNBQVMsSUFBVCxDQUFjLEdBQWQsRUFBa0I7QUFDaEIsV0FBUyxJQUFJLFNBQUosQ0FBYyxHQUFkLENBQVQ7QUFDQSxVQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0Q7O0FBRUQsU0FBUyxtQkFBVCxDQUE2QixlQUE3QixFQUE2QztBQUN6QyxTQUFPLE1BQVAsR0FBZ0IsWUFBSztBQUFFO0FBQ3JCLFlBQVEsR0FBUixDQUFZLE1BQVosRUFEbUIsQ0FDRTtBQUNyQjtBQUNELEdBSEQ7QUFJSDs7QUFFRCxTQUFTLHNCQUFULENBQWdDLGVBQWhDLEVBQWdEO0FBQzlDLFNBQU8sU0FBUCxHQUFtQixVQUFDLENBQUQsRUFBTTtBQUFFO0FBQ3pCLFlBQVEsR0FBUixDQUFZLFNBQVosRUFBdUIsRUFBRSxJQUF6QixFQUR1QixDQUNTO0FBQ2hDLFFBQUksT0FBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLElBQWIsQ0FBWCxDQUZ1QixDQUVRO0FBQy9CLG9CQUFnQixJQUFoQixFQUh1QixDQUdBO0FBQ3hCLEdBSkQ7QUFLRDs7QUFFRDtBQUNBLFNBQVMsV0FBVCxDQUFxQixPQUFyQixFQUE2QjtBQUMzQixTQUFPLElBQVAsQ0FBWSxLQUFLLFNBQUwsQ0FBZSxPQUFmLENBQVo7QUFDRDs7QUFFRDtrQkFDYztBQUNaLFlBRFksRUFDTjtBQUNOLDBDQUZZO0FBR1osZ0RBSFk7QUFJWjtBQUpZLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL2ltcG9ydFxuaW1wb3J0IHNvY2tldCBmcm9tIFwiLi93cy1jbGllbnRcIjtcblxuLy93aWxsIGJlIHVzZWQgZm9yIGFwcGxpY2F0aW9uIGxvZ2ljXG5jbGFzcyBDaGF0QXBwe1xuICAvL2NvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgLy9jb25zb2xlLmxvZyhcIkhlbGxvLCBFUzYhXCIpO1xuICAgIHNvY2tldC5pbml0KFwid3M6Ly9sb2NhbGhvc3Q6MzAwMVwiKTtcblxuICAgIFxuICAgIHNvY2tldC5yZWdpc3Rlck9wZW5IYW5kbGVyKCgpID0+IHtcbiAgICAgIGxldCBtZXNzYWdlID0gbmV3IENoYXRNZXNzYWdlKHttZXNzYWdlOiBcInBvdyFcIiB9KTtcbiAgICAgIHNvY2tldC5zZW5kTWVzc2FnZShtZXNzYWdlLnNlcmlhbGl6ZSgpKTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5yZWdpc3Rlck1lc3NhZ2VIYW5kbGVyKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vL2NyZWF0aW5nIGEgY2hhdCBtZXNzYWdlIGNsYXNzXG5jbGFzcyBDaGF0TWVzc2FnZXtcbiAgY29uc3RydWN0b3Ioe1xuICAgIC8vdXNlIG9mIGRlc3RydWN0dXJpbmcgYXNzaWdubWVudCBzeW50YXggZm9yIHBhcmFtZXRlcnNcbiAgICBtZXNzYWdlOiBtLFxuICAgIHVzZXI6IHUgPSAnYmF0bWFuJyxcbiAgICB0aW1lc3RhbXA6IHQgPSAgKG5ldyBEYXRlKCkpLmdldFRpbWUoKVxuICB9KXsgLy9hc3NpZ25zIHRoZSBwYXJhbWV0ZXJzIHRvIHRoZSBjaGF0bWVzc2FnZSBvYmplY3RcbiAgICB0aGlzLm1lc3NhZ2UgPSBtO1xuICAgIHRoaXMudXNlciA9IHU7XG4gICAgdGhpcy50aW1lc3RhbXAgPSB0O1xuICB9XG4vL2Rpc3BsYXlzIHRoZSBvYmplY3QgaW4gcGxhaW50ZXh0XG4gIHNlcmlhbGl6ZSgpe1xuICAgIHJldHVybntcbiAgICAgIHVzZXI6IHRoaXMudXNlcixcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIHRpbWVzdGFtcDogdGhpcy50aW1lc3RhbXBcbiAgICB9O1xuICB9XG59XG5cbi8vY3JlYXRpbmcgbmV3IGluc3RhbmNlIG9mIENoYXRBcHBcbi8vbmV3IENoYXRBcHAoKTtcblxuXG4vL3Rocm91Z2ggdGhlIGFkZGl0aW9uIG9mIGJ1aWxkIGFuZCB3YXRjaCBmb3IgYnJvd3NlcmlmeSBhbmQgd2F0Y2hpZnkgaW4gSlNPTixcbi8vZXhwb3J0IENoYXRBcHAgY2xhc3MgcmF0aGVyIHRoYW4gY3JlYXRpbmcgYW4gaW5zdGFuY2VcbmV4cG9ydCBkZWZhdWx0IENoYXRBcHA7XG4iLCIvL2ltcG9ydGluZyBDaGF0QXBwIGZyb20gLi9hcHBcbmltcG9ydCBDaGF0QXBwIGZyb20gXCIuL2FwcFwiO1xuLy9jcmVhdGUgbmV3IGNoYXRhcHAgaW5zdGFuY2Vcbm5ldyBDaGF0QXBwKCk7XG4iLCIvL2xldCBwcmV2ZW50cyB2YXJpYWJsZSBmb3JtIGJlaW5nIGhvaXN0ZWRcbmxldCBzb2NrZXQ7XG5cbmZ1bmN0aW9uIGluaXQodXJsKXtcbiAgc29ja2V0ID0gbmV3IFdlYlNvY2tldCh1cmwpO1xuICBjb25zb2xlLmxvZyhcImNvbm5lY3RpbmcuLi5cIik7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyT3BlbkhhbmRsZXIoaGFuZGxlckZ1bmN0aW9uKXtcbiAgICBzb2NrZXQub25vcGVuID0gKCkgPT57IC8vYXJyb3cgZnVuY3Rpb24gZm9yIGVzNjogc2hvcnRoYW5kIGZvciBhbm9uIGZ1bmN0aW9uXG4gICAgICBjb25zb2xlLmxvZyhcIm9wZW5cIik7IC8vY29uZmltcnMgY29ubmVjdGlvbiBoYXMgYmVlbiBvcGVuZWRcbiAgICAgIGhhbmRsZXJGdW5jdGlvbigpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJNZXNzYWdlSGFuZGxlcihoYW5kbGVyRnVuY3Rpb24pe1xuICBzb2NrZXQub25tZXNzYWdlID0gKGUpID0+eyAvL3JlY2VpdmVzIHRoZSBvYmplY3QgZnJvbSB0aGUgY2FsbGJhY2ssIHJlcHJlc2VudHMgZXZlbnQgYW5kIGRhdGEgb2JqZWN0IHdpdGggSlNPTiBzdHJpbmcgaW4gaXRcbiAgICBjb25zb2xlLmxvZyhcIm1lc3NhZ2VcIiwgZS5kYXRhKTsgLy9zaG93IHRoZSBtZXNzYWdlIGZyb20gdGhlIG9iamVjdFxuICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShlLmRhdGEpOyAvL3BhcnNlIHRoZSBKU09OIGRhdGFcbiAgICBoYW5kbGVyRnVuY3Rpb24oZGF0YSk7IC8vd2lsbCBmb3J3YXJkIGl0IHRvIGhhbmRsZXJGdW5jdGlvblxuICB9XG59XG5cbi8vdGFrZXMgdGhlIG1lc3NhZ2UgcGF5bG9hZCB3aXRoIHRlaCBpbmZvIGFuZCBtYWtlIGl0IGEgSlNPTiBzdHJpbmcsIGFuZCB0aGVuIHNlbmQgaXQgdG8gd2Vic29ja2V0IHNlcnZlclxuZnVuY3Rpb24gc2VuZE1lc3NhZ2UocGF5bG9hZCl7XG4gIHNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKTtcbn1cblxuLy9zcGVjaWZ5IHdoYXQgbmVlZHMgdG8gYmUgZXhwb3J0ZWQgdG8gZnVuY3Rpb25cbmV4cG9ydCBkZWZhdWx0e1xuICBpbml0LCAvL2VxdWl2YWxlbnQgb2YgaW5pdDogaW5pdCAoZW5oYW5jZWQgb2JqZWN0IGxpdGVyYWwpXG4gIHJlZ2lzdGVyT3BlbkhhbmRsZXIsXG4gIHJlZ2lzdGVyTWVzc2FnZUhhbmRsZXIsXG4gIHNlbmRNZXNzYWdlXG59XG4iXX0=
