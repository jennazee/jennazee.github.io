(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(props) {
    _classCallCheck(this, App);

    this.game_loop = this.start();
  }

  _createClass(App, [{
    key: 'start',
    value: function start() {
      var _this = this;

      this.game = new _game2.default();

      var play = function play() {
        window.requestAnimationFrame(_this.game.draw.bind(_this.game));
        setTimeout(play, _this.game.speediness);
        if (_this.game.go) {
          _this.game.currPiece.moveDown();
        }
      };

      if (this.game.init()) {
        return setTimeout(play, this.game.speediness);
      } else {
        alert('You lack a browser able to run HTML5');
      }
    }
  }]);

  return App;
}();

exports.default = App;


document.addEventListener('DOMContentLoaded', function () {
  return new App();
});

},{"./game":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BorderSq = function () {
  function BorderSq() {
    _classCallCheck(this, BorderSq);

    this.width = _constants.SQWIDTH;
    this.color = _constants.CHARCOAL_GRAY;
    this.sqArray = [];
    this.ctx = document.querySelector('#mainCanvas').getContext('2d');
  }

  _createClass(BorderSq, [{
    key: 'draw',
    value: function draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.sqArray[0] * this.width, this.sqArray[1] * this.width, this.width, this.width);
    }
  }, {
    key: 'setLocation',
    value: function setLocation(x, y) {
      this.sqArray = [x, y];
    }
  }]);

  return BorderSq;
}();

exports.default = BorderSq;
;

},{"./constants.js":3,"./piece.js":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var JKEY = exports.JKEY = 74;
var KKEY = exports.KKEY = 75;
var LKEY = exports.LKEY = 76;
var PKEY = exports.PKEY = 80;
var COMMAKEY = exports.COMMAKEY = 188;
var SPACEBAR = exports.SPACEBAR = 32;

var SQWIDTH = exports.SQWIDTH = 20;
var NUM_PIECE_SQS = exports.NUM_PIECE_SQS = 4;
var SCORE_PANEL_HEIGHT = exports.SCORE_PANEL_HEIGHT = 60;
var DIALOG_WIDTH = exports.DIALOG_WIDTH = 300;
var DIALOG_HEIGHT = exports.DIALOG_HEIGHT = 150;
var DIALOG_X = exports.DIALOG_X = 50;
var DIALOG_Y = exports.DIALOG_Y = 175;

var INITIAL_SPEED = exports.INITIAL_SPEED = 1000;
var SPEED_UP_AMT = exports.SPEED_UP_AMT = 50;
var TOP_SPEED = exports.TOP_SPEED = 100;

var NORMAL_CLEAR_PTS = exports.NORMAL_CLEAR_PTS = 10;
var NUM_FOR_TETRIS = exports.NUM_FOR_TETRIS = 4;
var TETRIS_CLEAR_PTS = exports.TETRIS_CLEAR_PTS = 100;
var DOUBLE_TETRIS_CLEAR_PTS = exports.DOUBLE_TETRIS_CLEAR_PTS = 500;

var MAGENTA = exports.MAGENTA = '#f39';
var RED = exports.RED = '#f33';
var ORANGE = exports.ORANGE = '#f80';
var GOLD = exports.GOLD = 'gold';
var LIME = exports.LIME = '#cf0';
var TEAL = exports.TEAL = '#0cc';
var TURQUOISE = exports.TURQUOISE = 'turquoise';
var PURPLE = exports.PURPLE = '#b650ff';
var BLACK = exports.BLACK = '#191919';
var CHARCOAL_GRAY = exports.CHARCOAL_GRAY = '#333';

var NEW_PIECE_X = exports.NEW_PIECE_X = 9;
var NEW_PIECE_Y = exports.NEW_PIECE_Y = 1;

var LARGE_FONT_SIZE = exports.LARGE_FONT_SIZE = '30px';
var MEDIUM_FONT_SIZE = exports.MEDIUM_FONT_SIZE = '22px';
var SMALL_FONT_SIZE = exports.SMALL_FONT_SIZE = '14px';
var FONT_FAMILY = exports.FONT_FAMILY = 'Avenir, Helvetica, Arial';

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dialog = function Dialog() {
  _classCallCheck(this, Dialog);

  this.width = _constants.DIALOG_WIDTH;
  this.height = _constants.DIALOG_HEIGHT;
  this.x = _constants.DIALOG_X;
  this.y = _constants.DIALOG_Y;
  this.color = _constants.RED;
};

exports.default = Dialog;
;

},{"./constants.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ipiece = require('./ipiece.js');

var _ipiece2 = _interopRequireDefault(_ipiece);

var _jpiece = require('./jpiece.js');

var _jpiece2 = _interopRequireDefault(_jpiece);

var _lpiece = require('./lpiece.js');

var _lpiece2 = _interopRequireDefault(_lpiece);

var _opiece = require('./opiece.js');

var _opiece2 = _interopRequireDefault(_opiece);

var _spiece = require('./spiece.js');

var _spiece2 = _interopRequireDefault(_spiece);

var _tpiece = require('./tpiece.js');

var _tpiece2 = _interopRequireDefault(_tpiece);

var _zpiece = require('./zpiece.js');

var _zpiece2 = _interopRequireDefault(_zpiece);

var _bordersq = require('./bordersq.js');

var _bordersq2 = _interopRequireDefault(_bordersq);

var _dialog = require('./dialog.js');

var _dialog2 = _interopRequireDefault(_dialog);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    this.scoreCounter = 0;
    this.dialog = new _dialog2.default();
    this.go = false;
    this.isLostGame = false;
    this.isFreshGame = true;
    this.tetris = false;
    this.board = [];
    this.speediness = _constants.INITIAL_SPEED; // changes with game play
  }

  _createClass(Game, [{
    key: 'init',
    value: function init() {
      var canvas = document.querySelector('#mainCanvas');
      var board = this.board;

      if (!canvas.getContext) {
        return false;
      }
      this.ctx = canvas.getContext('2d');

      // keeping everything contingent on that which cannot be set here (canvas dimensions)
      this.panelWidth = canvas.width;
      this.gamePanelHeight = canvas.height - _constants.SCORE_PANEL_HEIGHT;
      this.rows = this.gamePanelHeight / _constants.SQWIDTH + 1;
      this.cols = this.panelWidth / _constants.SQWIDTH;

      //game panel
      this.ctx.fillStyle = _constants.BLACK;
      this.ctx.fillRect(0, 0, this.panelWidth, this.gamePanelHeight);

      //make the pieces array. It's empty until pieces start sticking
      for (var j = 0; j < this.rows; j++) {
        board[j] = [];
      }

      for (var y = 0; y < this.rows; y++) {
        board[0][y] = new _bordersq2.default();
        board[0][y].setLocation(0, y);

        board[this.cols - 1][y] = new _bordersq2.default();
        board[this.cols - 1][y].setLocation(this.cols - 1, y);
      }

      for (var x = 0; x < this.cols; x++) {
        board[x][0] = new _bordersq2.default();
        board[x][this.rows - 1] = new _bordersq2.default();
        board[x][0].setLocation(x, 0);
        board[x][this.rows - 1].setLocation(x, this.rows - 1);
      }

      this.currPiece = this.pieceFactory(this);
      this.currPiece.setLocation(_constants.NEW_PIECE_X, _constants.NEW_PIECE_Y);

      this.drawBoard();
      this.drawWelcomeDialog();
      this.setupKeyListeners();
      this.setupClickListeners();

      return true;
    }
  }, {
    key: 'drawWelcomeDialog',
    value: function drawWelcomeDialog() {
      this.ctx.fillStyle = this.dialog.color;
      this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
      this.ctx.fillStyle = _constants.BLACK;
      this.ctx.font = _constants.MEDIUM_FONT_SIZE + ' ' + _constants.FONT_FAMILY;
      this.ctx.fillText('Click to Make it Rain Pieces!', this.dialog.x + 10, this.dialog.y + 40, 280);
      this.ctx.font = _constants.SMALL_FONT_SIZE + ' ' + _constants.FONT_FAMILY;
      this.ctx.fillText('Left = J-Key, Right = L-key', this.dialog.x + 35, this.dialog.y + 70, 230);
      this.ctx.fillText('Rotate = K-key, Down = Comma-key', this.dialog.x + 35, this.dialog.y + 90, 230);
      this.ctx.fillText('Drop = Space', this.dialog.x + 35, this.dialog.y + 110, 230);
      this.ctx.fillText('Pause = P-key', this.dialog.x + 35, this.dialog.y + 130, 230);
    }
  }, {
    key: 'drawBoard',
    value: function drawBoard() {
      var board = this.board;
      for (var r = 0; r < this.rows; r++) {
        for (var c = 0; c < this.cols; c++) {
          if (board[c][r]) {
            board[c][r].draw();
          }
        }
      }

      //score panel
      this.ctx.fillStyle = _constants.CHARCOAL_GRAY;
      this.ctx.fillRect(0, this.gamePanelHeight, this.panelWidth, _constants.SCORE_PANEL_HEIGHT);
      this.ctx.font = _constants.LARGE_FONT_SIZE + ' ' + _constants.FONT_FAMILY;
      this.ctx.fillStyle = _constants.RED;
      this.ctx.fillText('Score: ' + this.scoreCounter, 20, this.gamePanelHeight + 40, this.panelWidth - 20);
    }
  }, {
    key: 'setupKeyListeners',
    value: function setupKeyListeners() {
      var _this = this;

      document.addEventListener('keydown', function (e) {
        //if game is in play, J-key moves falling piece left
        if (e.keyCode === _constants.JKEY) {
          if (_this.go) {
            e.preventDefault();
            _this.currPiece.moveLeft();
          }
        }

        //if game is in play, L-key moves piece right
        if (e.keyCode === _constants.LKEY) {
          if (_this.go) {
            e.preventDefault();
            _this.currPiece.moveRight();
          }
        }

        //if game is in play, K-key rotates the piece
        if (e.keyCode === _constants.KKEY) {
          if (_this.go) {
            e.preventDefault();
            _this.currPiece.rotate();
          }
        }

        //if game is in play, comma-key moves piece down a row
        if (e.keyCode === _constants.COMMAKEY) {
          if (_this.go) {
            e.preventDefault();
            _this.currPiece.moveDown();
          }
        }

        //if game is in play, space bar drops the piece
        if (e.keyCode === _constants.SPACEBAR) {
          if (_this.go) {
            e.preventDefault();
            _this.currPiece.drop();
          }
        }
        //p for pause
        if (e.keyCode === _constants.PKEY) {
          e.preventDefault();
          _this.go = !_this.go;
        }
      });
    }
  }, {
    key: 'setupClickListeners',
    value: function setupClickListeners() {
      var _this2 = this;

      mainCanvas.addEventListener('click', function (e) {
        if (_this2.isFreshGame) {
          _this2.isFreshGame = false;
        }
        if (!_this2.go) {
          _this2.go = true;
        }
        if (_this2.isLostGame) {
          clearInterval(_this2.game_loop);
          _this2.game_loop = start();
          _this2.isLostGame = false;
          _this2.go = false;
          _this2.isFreshGame = true;
        }
      });
    }

    //DRAWING updates

  }, {
    key: 'draw',
    value: function draw() {
      if (this.go) {
        //game panel
        this.ctx.fillStyle = _constants.BLACK;
        this.ctx.fillRect(0, 0, this.panelWidth, this.gamePanelHeight);

        this.drawBoard();

        this.currPiece.draw();
      } else {
        // game is paused
        if (!this.isLostGame && !this.isFreshGame) {
          this.ctx.fillStyle = this.dialog.color;
          this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
          this.ctx.fillStyle = _constants.BLACK;
          this.ctx.font = _constants.MEDIUM_FONT_SIZE + ' ' + _constants.FONT_FAMILY;
          this.ctx.fillText('Game Paused.', this.dialog.x + 65, this.dialog.y + 80, 280);
        }
        // game is over
        else if (this.isLostGame && !this.isFreshGame) {
            this.ctx.fillStyle = this.dialog.color;
            this.ctx.fillRect(this.dialog.x, this.dialog.y, this.dialog.width, this.dialog.height);
            this.ctx.fillStyle = _constants.BLACK;
            this.ctx.font = _constants.MEDIUM_FONT_SIZE + ' ' + _constants.FONT_FAMILY;
            this.ctx.fillText('Sorry! Game Over :(', this.dialog.x + 30, this.dialog.y + 70, 280);
            this.ctx.font = _constants.SMALL_FONT_SIZE + ' ' + _constants.FONT_FAMILY;
            this.ctx.fillText('Click to start a new game.', this.dialog.x + 55, this.dialog.y + 95, 230);
            return;
          }
      }
    }
  }, {
    key: 'pieceFactory',
    value: function pieceFactory(game) {
      switch (Math.floor(Math.random() * 7)) {

        case 0:
          return new _ipiece2.default(game);

        case 1:
          return new _jpiece2.default(game);

        case 2:
          return new _lpiece2.default(game);

        case 3:
          return new _opiece2.default(game);

        case 4:
          return new _spiece2.default(game);

        case 5:
          return new _tpiece2.default(game);

        case 6:
          return new _zpiece2.default(game);
      }
    }
  }, {
    key: 'makeNewPiece',
    value: function makeNewPiece() {
      this.currPiece = this.pieceFactory(this);
      if (!this.isLostGame) {
        this.currPiece.setLocation(_constants.NEW_PIECE_X, _constants.NEW_PIECE_Y);
      }
    }
  }, {
    key: 'checkLines',
    value: function checkLines() {
      var board = this.board;
      var numCleared = 0;
      for (var j = 1; j < this.rows - 1; j++) {
        var numFull = 0;
        for (var i = 1; i < this.cols - 1; i++) {
          if (!board[i][j]) {
            break;
          } else {
            numFull++;
          }
        }
        if (numFull === this.cols - 2) {
          numCleared++;
          for (var p = j; p > 2; p--) {
            //cols
            for (var q = 1; q < this.cols - 1; q++) {
              board[q][p] = board[q][p - 1];
              if (board[q][p]) {
                board[q][p].setLocation(q, p);
                this.draw();
              }
            }
          }
          if (this.speediness > _constants.TOP_SPEED) {
            this.speediness = this.speediness - SPEED_UP_AMT;
          }
          this.scoreCounter = this.scoreCounter + _constants.NORMAL_CLEAR_PTS;
          //one tetris
          if (numCleared === _constants.NUM_FOR_TETRIS && !this.tetris) {
            this.scoreCounter = this.scoreCounter + _constants.TETRIS_CLEAR_PTS;
            this.tetris = true;
          }
          //back to back tetrises!!!
          else if (numCleared === _constants.NUM_FOR_TETRIS && this.tetris) {
              this.scoreCounter = this.scoreCounter + _constants.DOUBLE_TETRIS_CLEAR_PTS;
            } else {
              this.tetris = false;
            }
        }
      }
    }
  }, {
    key: 'checkLoss',
    value: function checkLoss() {
      for (var s = 0; s < _constants.NUM_PIECE_SQS; s++) {
        if (this.board[this.currPiece.sqArray[s][0]][this.currPiece.sqArray[s][1]]) {
          this.go = false;
          this.isLostGame = true;
          this.draw();
        }
      }
    }
  }]);

  return Game;
}();

exports.default = Game;
;

},{"./bordersq.js":2,"./constants.js":3,"./dialog.js":4,"./ipiece.js":6,"./jpiece.js":7,"./lpiece.js":8,"./opiece.js":9,"./spiece.js":11,"./tpiece.js":13,"./zpiece.js":14}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IPiece = function (_Piece) {
  _inherits(IPiece, _Piece);

  function IPiece(game) {
    _classCallCheck(this, IPiece);

    var _this = _possibleConstructorReturn(this, (IPiece.__proto__ || Object.getPrototypeOf(IPiece)).call(this, game));

    _this.color = _constants.RED;

    _this.sqArray[0][0] = 0;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 1;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 2;
    _this.sqArray[2][1] = 0;

    _this.sqArray[3][0] = 3;
    _this.sqArray[3][1] = 0;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return IPiece;
}(_piece2.default);

exports.default = IPiece;

},{"./constants.js":3,"./piece.js":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JPiece = function (_Piece) {
  _inherits(JPiece, _Piece);

  function JPiece(game) {
    _classCallCheck(this, JPiece);

    var _this = _possibleConstructorReturn(this, (JPiece.__proto__ || Object.getPrototypeOf(JPiece)).call(this, game));

    _this.color = _constants.GOLD;

    _this.sqArray[0][0] = 0;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 1;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 2;
    _this.sqArray[2][1] = 0;

    _this.sqArray[3][0] = 2;
    _this.sqArray[3][1] = 1;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return JPiece;
}(_piece2.default);

exports.default = JPiece;

},{"./constants.js":3,"./piece.js":10}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LPiece = function (_Piece) {
  _inherits(LPiece, _Piece);

  function LPiece(game) {
    _classCallCheck(this, LPiece);

    var _this = _possibleConstructorReturn(this, (LPiece.__proto__ || Object.getPrototypeOf(LPiece)).call(this, game));

    _this.color = _constants.MAGENTA;

    _this.sqArray[0][0] = 0;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 1;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 2;
    _this.sqArray[2][1] = 0;

    _this.sqArray[3][0] = 0;
    _this.sqArray[3][1] = 1;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return LPiece;
}(_piece2.default);

exports.default = LPiece;

},{"./constants.js":3,"./piece.js":10}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OPiece = function (_Piece) {
  _inherits(OPiece, _Piece);

  function OPiece(game) {
    _classCallCheck(this, OPiece);

    var _this = _possibleConstructorReturn(this, (OPiece.__proto__ || Object.getPrototypeOf(OPiece)).call(this, game));

    _this.color = _constants.PURPLE;

    _this.sqArray[0][0] = 0;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 1;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 0;
    _this.sqArray[2][1] = 1;

    _this.sqArray[3][0] = 1;
    _this.sqArray[3][1] = 1;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return OPiece;
}(_piece2.default);

exports.default = OPiece;
;

},{"./constants.js":3,"./piece.js":10}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _stuckSquare = require('./stuckSquare.js');

var _stuckSquare2 = _interopRequireDefault(_stuckSquare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Piece = function () {
  function Piece(game) {
    _classCallCheck(this, Piece);

    this.width = _constants.SQWIDTH;
    this.game = game;

    this.sqArray = [[], [], [], []];
    this.layoutArray = [];

    this.color = _constants.CHARCOAL_GRAY;
    this.ctx = document.querySelector('#mainCanvas').getContext('2d');
  }

  _createClass(Piece, [{
    key: 'cloneSqArrayToLayoutArray',
    value: function cloneSqArrayToLayoutArray() {
      this.layoutArray = JSON.parse(JSON.stringify(this.sqArray));
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.strokeStyle = _constants.BLACK;
      this.ctx.lineWidth = 2;
      this.ctx.fillStyle = this.color;

      var width = this.width;

      for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
        this.ctx.fillRect(this.sqArray[i][0] * width, this.sqArray[i][1] * width, width, width);
        this.ctx.strokeRect(this.sqArray[i][0] * width, this.sqArray[i][1] * width, width, width);
      }
    }

    //smart pieces!!

  }, {
    key: 'checkValidDown',
    value: function checkValidDown() {
      for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
        if (!!this.game.board[this.sqArray[i][0]][this.sqArray[i][1] + 1]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'checkValidLeft',
    value: function checkValidLeft() {
      for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
        if (!!this.game.board[this.sqArray[i][0] - 1][this.sqArray[i][1]]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'checkValidRight',
    value: function checkValidRight() {
      for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
        if (this.game.board[this.sqArray[i][0] + 1][this.sqArray[i][1]]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'checkValidRotate',
    value: function checkValidRotate() {
      if (this.game.board[this.sqArray[2][0] - this.sqArray[2][1] + this.sqArray[0][1]][this.sqArray[2][0] + this.sqArray[2][1] - this.sqArray[0][0]]) {
        return false;
      }

      if (this.game.board[this.sqArray[2][0] - this.sqArray[2][1] + this.sqArray[1][1]][this.sqArray[2][0] + this.sqArray[2][1] - this.sqArray[1][0]]) {
        return false;
      }

      if (this.game.board[this.sqArray[2][0] - this.sqArray[2][1] + this.sqArray[3][1]][this.sqArray[2][0] + this.sqArray[2][1] - this.sqArray[3][0]]) {
        return false;
      }
      return true;
    }
  }, {
    key: 'moveDown',
    value: function moveDown(array) {
      if (this.checkValidDown()) {
        //if it can move down, move all 4 component squares down
        for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
          this.sqArray[i][1]++;
        }
      } else {
        this.stick();
      }
      this.game.draw();
      this.game.checkLoss();
      this.game.checkLines();
    }
  }, {
    key: 'moveLeft',
    value: function moveLeft() {
      //if it can move left, move all 4 component squares left
      if (this.checkValidLeft()) {
        for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
          this.sqArray[i][0]--;
        }
      }
      window.requestAnimationFrame(this.game.draw.bind(this.game));
    }
  }, {
    key: 'moveRight',
    value: function moveRight() {
      //if it can move down, move all 4 component squares right
      if (this.checkValidRight()) {
        for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
          this.sqArray[i][0]++;
        }
      }
      window.requestAnimationFrame(this.game.draw.bind(this.game));
    }
  }, {
    key: 'drop',
    value: function drop() {
      while (this.checkValidDown()) {
        this.moveDown();
      }
      window.requestAnimationFrame(this.game.draw.bind(this.game));
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      //newx = centerOfRotationX - centerOfRotationY + oldYLocation
      //newy = centerOfRotationY + centerOfRotationX - oldXLocation
      if (this.checkValidRotate()) {
        var oldx0 = this.sqArray[0][0];
        var oldy0 = this.sqArray[0][1];

        var oldx1 = this.sqArray[1][0];
        var oldy1 = this.sqArray[1][1];

        var oldx3 = this.sqArray[3][0];
        var oldy3 = this.sqArray[3][1];

        this.sqArray[0][0] = this.sqArray[2][0] - this.sqArray[2][1] + oldy0;
        this.sqArray[0][1] = this.sqArray[2][0] + this.sqArray[2][1] - oldx0;

        this.sqArray[1][0] = this.sqArray[2][0] - this.sqArray[2][1] + oldy1;
        this.sqArray[1][1] = this.sqArray[2][0] + this.sqArray[2][1] - oldx1;

        this.sqArray[3][0] = this.sqArray[2][0] - this.sqArray[2][1] + oldy3;
        this.sqArray[3][1] = this.sqArray[2][0] + this.sqArray[2][1] - oldx3;
      }
      window.requestAnimationFrame(this.game.draw.bind(this.game));
    }
  }, {
    key: 'setLocation',
    value: function setLocation(x, y) {
      for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
        this.sqArray[i][0] = this.layoutArray[i][0] + x;
        this.sqArray[i][1] = this.layoutArray[i][1] + y;
      }
      window.requestAnimationFrame(this.game.draw.bind(this.game));
    }
  }, {
    key: 'stick',
    value: function stick() {
      for (var i = 0; i < _constants.NUM_PIECE_SQS; i++) {
        this.game.board[this.sqArray[i][0]][this.sqArray[i][1]] = new _stuckSquare2.default(this.color);
        this.game.board[this.sqArray[i][0]][this.sqArray[i][1]].setLocation(this.sqArray[i][0], this.sqArray[i][1]);
      }
      this.game.makeNewPiece();
    }
  }]);

  return Piece;
}();

exports.default = Piece;

},{"./constants.js":3,"./stuckSquare.js":12}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SPiece = function (_Piece) {
  _inherits(SPiece, _Piece);

  function SPiece(game) {
    _classCallCheck(this, SPiece);

    var _this = _possibleConstructorReturn(this, (SPiece.__proto__ || Object.getPrototypeOf(SPiece)).call(this, game));

    _this.color = _constants.LIME;

    _this.sqArray[0][0] = 1;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 2;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 0;
    _this.sqArray[2][1] = 1;

    _this.sqArray[3][0] = 1;
    _this.sqArray[3][1] = 1;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return SPiece;
}(_piece2.default);

exports.default = SPiece;

},{"./constants.js":3,"./piece.js":10}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StuckSquare = function () {
  function StuckSquare(color) {
    _classCallCheck(this, StuckSquare);

    this.width = _constants.SQWIDTH;
    this.color = color;
    this.sqArray = [];
    this.ctx = document.querySelector('#mainCanvas').getContext('2d');
  }

  _createClass(StuckSquare, [{
    key: 'draw',
    value: function draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = _constants.BLACK;
      this.ctx.lineWidth = 2;

      this.ctx.fillRect(this.sqArray[0] * this.width, this.sqArray[1] * this.width, this.width, this.width);
      this.ctx.strokeRect(this.sqArray[0] * this.width, this.sqArray[1] * this.width, this.width, this.width);
    }
  }, {
    key: 'setLocation',
    value: function setLocation(x, y) {
      this.sqArray = [x, y];
    }
  }]);

  return StuckSquare;
}();

exports.default = StuckSquare;

},{"./constants.js":3,"./piece.js":10}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TPiece = function (_Piece) {
  _inherits(TPiece, _Piece);

  function TPiece(game) {
    _classCallCheck(this, TPiece);

    var _this = _possibleConstructorReturn(this, (TPiece.__proto__ || Object.getPrototypeOf(TPiece)).call(this, game));

    _this.color = _constants.TURQUOISE;

    _this.sqArray[0][0] = 0;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 1;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 2;
    _this.sqArray[2][1] = 0;

    _this.sqArray[3][0] = 1;
    _this.sqArray[3][1] = 1;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return TPiece;
}(_piece2.default);

exports.default = TPiece;

},{"./constants.js":3,"./piece.js":10}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants.js');

var _piece = require('./piece.js');

var _piece2 = _interopRequireDefault(_piece);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZPiece = function (_Piece) {
  _inherits(ZPiece, _Piece);

  function ZPiece(game) {
    _classCallCheck(this, ZPiece);

    var _this = _possibleConstructorReturn(this, (ZPiece.__proto__ || Object.getPrototypeOf(ZPiece)).call(this, game));

    _this.color = _constants.ORANGE;

    _this.sqArray[0][0] = 0;
    _this.sqArray[0][1] = 0;

    _this.sqArray[1][0] = 1;
    _this.sqArray[1][1] = 0;

    _this.sqArray[2][0] = 1;
    _this.sqArray[2][1] = 1;

    _this.sqArray[3][0] = 2;
    _this.sqArray[3][1] = 1;

    _this.cloneSqArrayToLayoutArray();
    return _this;
  }

  return ZPiece;
}(_piece2.default);

exports.default = ZPiece;

},{"./constants.js":3,"./piece.js":10}],15:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _tetres=require("tetres6"),_tetres2=_interopRequireDefault(_tetres);

},{"tetres6":1}]},{},[15]);
