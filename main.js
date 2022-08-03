/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/factories/Board.js":
/*!********************************!*\
  !*** ./src/factories/Board.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Board = /*#__PURE__*/function () {
  function Board(size) {
    _classCallCheck(this, Board);

    // Size of board grid
    this.size = size;
    /**
     * An array for storing the ships
     * Keep track its names and status (hit or sunk)
     */

    this.fleet = [];
    /**
     * Field status array
     * 0: empty, not hit
     * 1: empty, but hit
     * 2: not empty, not hit
     * 3: not empty, but hit
     */

    this.fieldStatus = _toConsumableArray(Array(size)).map(function (x, j) {
      return Array(size).fill(0);
    });
  }
  /**
   * Get field status
   * @param {Number} x coordinate
   * @param {Number} y coordinate
   * @returns the status of x, y field
   */


  _createClass(Board, [{
    key: "getFieldStatus",
    value: function getFieldStatus(x, y) {
      return this.fieldStatus[x][y];
    }
    /**
     * Check if it's OK to place ship
     * @param {Object} theShip object
     * @returns true if ship can be placed, false if not
     */

  }, {
    key: "canPlaceShip",
    value: function canPlaceShip(theShip) {
      var _this = this;

      _toConsumableArray(theShip.coords).forEach(function (coord) {
        var x = coord.getX();
        var y = coord.getY();
        if (x >= _this.size || y >= _this.size) return false; // If ship is already in this field

        if (_this.fieldStatus[x][y] !== 0) return false;
      });

      return true;
    }
    /**
     * Places a ship on the board
     * @param {Object} theShip object
     */

  }, {
    key: "placeShip",
    value: function placeShip(theShip) {
      var _this2 = this;

      _toConsumableArray(theShip.coords).forEach(function (coord) {
        var x = coord.getX();
        var y = coord.getY(); // If ship is already in this field

        if (_this2.fieldStatus[x][y] !== 0) {
          throw new Error("Field is already occupied");
        } // Set fields to not empty, not hit


        _this2.fieldStatus[x][y] = 2;
      });

      this.fleet.push(theShip);
    }
    /**
     * Check if it's OK to place shot
     * @param {Object} theCoord to hit
     * @returns true if OK to place shot, false if not
     */

  }, {
    key: "canPlaceShot",
    value: function canPlaceShot(theCoord) {
      var x = theCoord.getX();
      var y = theCoord.getY();
      var field = this.fieldStatus[x][y]; // If field value is 0 or 2, it's OK to shoot

      if (field === 0 || field === 2) return true;
      return false;
    }
    /**
     * Places shot on the board
     * @param {Object} theCoord to hit
     * @returns the result (1 or 3 - the two possible outcomes)
     */

  }, {
    key: "placeShot",
    value: function placeShot(theCoord) {
      var x = theCoord.getX();
      var y = theCoord.getY();

      if (this.fieldStatus[x][y] === 0) {
        this.fieldStatus[x][y] = 1;
        return this.fieldStatus[x][y];
      }

      if (this.fieldStatus[x][y] === 1 || this.fieldStatus[x][y] === 3) {
        throw new Error("Field has already been hit");
      }

      this.fieldStatus[x][y] = 3; // We have a successful shot, and the ship must remember that it has been hit

      this.fleet.forEach(function (ship) {
        if (ship.hasCoordinates(theCoord)) ship.isHit(theCoord);
      });
      return this.fieldStatus[x][y];
    }
    /**
     * Gets the name of a ship if it was destroyed and remove it from fleet
     * This method must be called after every shot
     * @returns the name of the ship that has been destroyed (if hasSunk return true),
     * Or an empty string is ship was not destroyed
     */

  }, {
    key: "getFleetStatus",
    value: function getFleetStatus() {
      var destroyedShip = this.fleet.find(function (ship) {
        return ship.hasSunk();
      });
      var index = this.fleet.indexOf(destroyedShip);
      if (index > -1) this.fleet.splice(index, 1);
      return destroyedShip === undefined ? "" : destroyedShip.getName();
    }
    /**
     * Game is over if fleet array is empty
     * @returns true if game is over, false if not
     */

  }, {
    key: "isGameOver",
    value: function isGameOver() {
      if (this.fleet.length === 0) return true;
      return false;
    }
  }]);

  return Board;
}();



/***/ }),

/***/ "./src/factories/Coordinate.js":
/*!*************************************!*\
  !*** ./src/factories/Coordinate.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Coordinate)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Coordinate = /*#__PURE__*/function () {
  /**
   * Constructs a coordinate set
   * @param {Number} x
   * @param {Number} y
   */
  function Coordinate(x, y) {
    _classCallCheck(this, Coordinate);

    this.x = x;
    this.y = y;
  }
  /**
   * Get value of x coordinate
   * @returns the x value of this coordinate
   */


  _createClass(Coordinate, [{
    key: "getX",
    value: function getX() {
      return this.x;
    }
    /**
     * Get value of y coordinate
     * @returns the y value of this coordinate
     */

  }, {
    key: "getY",
    value: function getY() {
      return this.y;
    }
    /**
     * Test this coordinate for equality with the Ship's coordinate
     * @param {Object} coord to test
     * @returns true or false
     */

  }, {
    key: "equals",
    value: function equals(coord) {
      if (this.x === coord.getX() && this.y === coord.getY()) return true;
      return false;
    }
  }]);

  return Coordinate;
}();



/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Player = /*#__PURE__*/function () {
  function Player(name) {
    _classCallCheck(this, Player);

    this.name = name;
  }
  /**
   * Get the name of the Player
   * @returns the value of the name variable
   */


  _createClass(Player, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Player;
}();



/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Ship = /*#__PURE__*/function () {
  /**
   * Construct a ship of given coords and name
   * @param {Array} coords
   * @param {String} name
   */
  function Ship(coords, name) {
    _classCallCheck(this, Ship);

    this.coords = _toConsumableArray(coords);
    this.name = name;
  }
  /**
   * Registers that the ship has been hit
   * @param {Object} atCoord
   */


  _createClass(Ship, [{
    key: "isHit",
    value: function isHit(atCoord) {
      var _this = this;

      this.coords.forEach(function (coord, index) {
        if (coord.equals(atCoord)) {
          _this.coords.splice(index, 1);
        }
      });
    }
    /**
     * Checks if there are any parts left of this ship
     * @returns true if there are no more coordinates - hence the ship is destroyed
     */

  }, {
    key: "hasSunk",
    value: function hasSunk() {
      return this.coords.length === 0;
    }
    /**
     * Tests whether this ship is placed on these coordinates
     * @param {Object} atCoord to test
     * @returns true if ship is on these coordinates, false if not
     */

  }, {
    key: "hasCoordinates",
    value: function hasCoordinates(atCoord) {
      return this.coords.some(function (coord) {
        return coord.equals(atCoord);
      });
    }
    /**
     * Get the name of the ship
     * @returns the value of the name variable
     */

  }, {
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }]);

  return Ship;
}();



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.primary-header {\r\n  background-color: var(--clr-light-gray);\r\n  padding: 0.5rem 1rem 0.5rem 1rem;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.game {\r\n  flex: 1;\r\n\r\n  display: flex;\r\n}\r\n\r\n.player {\r\n  flex: 1;\r\n\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell {\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.board-player-1 > .board-cell {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.board-player-2 > .board-cell {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  color: var(--clr-dark-gray);\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,yBAAyB;EACzB,wBAAwB;EACxB,mBAAmB;EACnB,yBAAyB;EACzB,oBAAoB;EACpB,oBAAoB;AACtB;;AAEA,gDAAgD;;AAEhD,qBAAqB;AACrB;;;EAGE,sBAAsB;AACxB;;AAEA,0BAA0B;AAC1B;EACE,SAAS;EACT,UAAU;EACV,aAAa;AACf;;AAEA,2GAA2G;AAC3G;;EAEE,gBAAgB;AAClB;;AAEA,2BAA2B;AAC3B;EACE,uBAAuB;AACzB;;AAEA;;EAEE,YAAY;AACd;;AAEA,2BAA2B;AAC3B;EACE,iBAAiB;EACjB,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA,0DAA0D;AAC1D;EACE,8BAA8B;AAChC;;AAEA,oCAAoC;AACpC;;EAEE,eAAe;EACf,cAAc;AAChB;;AAEA,gGAAgG;AAChG;EACE;IACE,qBAAqB;EACvB;;EAEA;;;IAGE,qCAAqC;IACrC,uCAAuC;IACvC,sCAAsC;IACtC,gCAAgC;EAClC;AACF;;AAEA;EACE,yCAAyC;;EAEzC,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,uCAAuC;EACvC,gCAAgC;AAClC;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,uBAAuB;EACvB,iBAAiB;AACnB;;AAEA;EACE,OAAO;;EAEP,aAAa;AACf;;AAEA;EACE,OAAO;;EAEP,gCAAgC;;EAEhC,aAAa;EACb,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,iBAAiB;EACjB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb;;;4BAG0B;EAC1B,mCAAmC;EACnC,gCAAgC;EAChC,QAAQ;AACV;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,qBAAqB;;EAErB,iBAAiB;EACjB,eAAe;EACf,kBAAkB;EAClB,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;;EAEtB,eAAe;EACf,2BAA2B;EAC3B,iBAAiB;;EAEjB,aAAa;AACf;;AAEA;EACE,OAAO;EACP,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;;EAEhB,aAAa;EACb,sCAAsC;AACxC;;AAEA;EACE,YAAY;EACZ,WAAW;AACb;;AAEA;EACE,uCAAuC;EACvC,uBAAuB;AACzB;;AAEA;EACE,uCAAuC;EACvC,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,SAAS;AACX;;AAEA;EACE,yBAAyB;EACzB,0BAA0B;EAC1B,yBAAyB;EACzB,yBAAyB;EACzB,iBAAiB;EACjB,iBAAiB;EACjB,mBAAmB;EACnB,2BAA2B;AAC7B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,gBAAgB;EAChB,uBAAuB;;EAEvB,iBAAiB;EACjB,iBAAiB;EACjB,2BAA2B;AAC7B","sourcesContent":[":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.primary-header {\r\n  background-color: var(--clr-light-gray);\r\n  padding: 0.5rem 1rem 0.5rem 1rem;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.game {\r\n  flex: 1;\r\n\r\n  display: flex;\r\n}\r\n\r\n.player {\r\n  flex: 1;\r\n\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n}\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell {\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\n.board-player-1 > .board-cell {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.board-player-2 > .board-cell {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  color: var(--clr-dark-gray);\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _factories_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/Board */ "./src/factories/Board.js");
/* harmony import */ var _factories_Ship__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/Ship */ "./src/factories/Ship.js");
/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/Player */ "./src/factories/Player.js");
/* harmony import */ var _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./factories/Coordinate */ "./src/factories/Coordinate.js");




 // Player 1

var player1 = new _factories_Player__WEBPACK_IMPORTED_MODULE_3__["default"]("player1");
var playerBoard = new _factories_Board__WEBPACK_IMPORTED_MODULE_1__["default"](10);
var carrier = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 2), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 3), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 4)], "carrier");
playerBoard.placeShip(carrier);
var battleship = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 2), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 3)], "battleship");
playerBoard.placeShip(battleship);
var destroyer = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](2, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](2, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](2, 2)], "destroyer");
playerBoard.placeShip(destroyer);
var submarine = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](3, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](3, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](3, 2)], "submarine");
playerBoard.placeShip(submarine);
var patrol = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](4, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](4, 1)], "patrol");
playerBoard.placeShip(patrol); // Player 2

var player2 = new _factories_Player__WEBPACK_IMPORTED_MODULE_3__["default"]("player2");
var player2Board = new _factories_Board__WEBPACK_IMPORTED_MODULE_1__["default"](10);
var carrier2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 2), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 3), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](0, 4)], "carrier");
player2Board.placeShip(carrier2);
var battleship2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 2), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](1, 3)], "battleship");
player2Board.placeShip(battleship2);
var destroyer2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](2, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](2, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](2, 2)], "destroyer");
player2Board.placeShip(destroyer2);
var submarine2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](3, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](3, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](3, 2)], "submarine");
player2Board.placeShip(submarine2);
var patrol2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](4, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](4, 1)], "patrol");
player2Board.placeShip(patrol2);
var gameOver = false;
var turn = 1; // Battle Simulation

while (!gameOver) {
  var randomX = randomInteger(0, 9);
  var randomY = randomInteger(0, 9);
  var targetCoord = new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_4__["default"](randomX, randomY);

  switch (turn % 2 === 1) {
    // Player 1 turn
    case true:
      if (player2Board.canPlaceShot(targetCoord)) {
        try {
          player2Board.placeShot(targetCoord);
          player2Board.getFleetStatus();
          gameOver = player2Board.isGameOver();
        } catch (err) {
          console.log(err);
        }

        if (gameOver) console.log("Game over! Winner: Player 1");
      } else {
        console.log("You can't shoot here!");
      }

      turn++;
      break;
    // Player 2 turn

    case false:
      if (playerBoard.canPlaceShot(targetCoord)) {
        try {
          playerBoard.placeShot(targetCoord);
          playerBoard.getFleetStatus();
          gameOver = playerBoard.isGameOver();
        } catch (err) {
          console.log(err);
        }

        if (gameOver) console.log("Game over! Winner: Player 2");
      } else {
        console.log("You can't shoot here!");
      }

      turn++;
      break;
  }
}

console.log(playerBoard.isGameOver());
console.log(player2Board.isGameOver());

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LElBQUlWLFFBQUosRUFBY1csT0FBTyxDQUFDQyxHQUFSO01BQ2YsQ0FURCxNQVNPO1FBQ0xELE9BQU8sQ0FBQ0MsR0FBUjtNQUNEOztNQUNEWCxJQUFJO01BQ0o7SUFFRjs7SUFDQSxLQUFLLEtBQUw7TUFDRSxJQUFJZixXQUFXLENBQUNvQixZQUFaLENBQXlCRCxXQUF6QixDQUFKLEVBQTJDO1FBQ3pDLElBQUk7VUFDRm5CLFdBQVcsQ0FBQ3FCLFNBQVosQ0FBc0JGLFdBQXRCO1VBQ0FuQixXQUFXLENBQUNzQixjQUFaO1VBQ0FSLFFBQVEsR0FBR2QsV0FBVyxDQUFDdUIsVUFBWixFQUFYO1FBQ0QsQ0FKRCxDQUlFLE9BQU9DLEdBQVAsRUFBWTtVQUNaQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsR0FBWjtRQUNEOztRQUVELElBQUlWLFFBQUosRUFBY1csT0FBTyxDQUFDQyxHQUFSO01BQ2YsQ0FWRCxNQVVPO1FBQ0xELE9BQU8sQ0FBQ0MsR0FBUjtNQUNEOztNQUNEWCxJQUFJO01BQ0o7RUFsQ0o7QUFvQ0Q7O0FBRURVLE9BQU8sQ0FBQ0MsR0FBUixDQUFZMUIsV0FBVyxDQUFDdUIsVUFBWixFQUFaO0FBQ0FFLE9BQU8sQ0FBQ0MsR0FBUixDQUFZbEIsWUFBWSxDQUFDZSxVQUFiLEVBQVo7O0FBRUEsU0FBU04sYUFBVCxDQUF1QlUsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDO0VBQy9CLE9BQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBTixHQUFZLENBQTdCLENBQVgsSUFBOENBLEdBQXJEO0FBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0JvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0Nvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL1NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAvLyBTaXplIG9mIGJvYXJkIGdyaWRcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBmb3Igc3RvcmluZyB0aGUgc2hpcHNcclxuICAgICAqIEtlZXAgdHJhY2sgaXRzIG5hbWVzIGFuZCBzdGF0dXMgKGhpdCBvciBzdW5rKVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZsZWV0ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWVsZCBzdGF0dXMgYXJyYXlcclxuICAgICAqIDA6IGVtcHR5LCBub3QgaGl0XHJcbiAgICAgKiAxOiBlbXB0eSwgYnV0IGhpdFxyXG4gICAgICogMjogbm90IGVtcHR5LCBub3QgaGl0XHJcbiAgICAgKiAzOiBub3QgZW1wdHksIGJ1dCBoaXRcclxuICAgICAqL1xyXG4gICAgdGhpcy5maWVsZFN0YXR1cyA9IFsuLi5BcnJheShzaXplKV0ubWFwKCh4LCBqKSA9PiBBcnJheShzaXplKS5maWxsKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBmaWVsZCBzdGF0dXNcclxuICAgKiBAcGFyYW0ge051bWJlcn0geCBjb29yZGluYXRlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgY29vcmRpbmF0ZVxyXG4gICAqIEByZXR1cm5zIHRoZSBzdGF0dXMgb2YgeCwgeSBmaWVsZFxyXG4gICAqL1xyXG4gIGdldEZpZWxkU3RhdHVzKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgaXQncyBPSyB0byBwbGFjZSBzaGlwXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZVNoaXAgb2JqZWN0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBzaGlwIGNhbiBiZSBwbGFjZWQsIGZhbHNlIGlmIG5vdFxyXG4gICAqL1xyXG4gIGNhblBsYWNlU2hpcCh0aGVTaGlwKSB7XHJcbiAgICBbLi4udGhlU2hpcC5jb29yZHNdLmZvckVhY2goKGNvb3JkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHggPSBjb29yZC5nZXRYKCk7XHJcbiAgICAgIGNvbnN0IHkgPSBjb29yZC5nZXRZKCk7XHJcblxyXG4gICAgICBpZiAoeCA+PSB0aGlzLnNpemUgfHwgeSA+PSB0aGlzLnNpemUpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBpbiB0aGlzIGZpZWxkXHJcbiAgICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldICE9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlcyBhIHNoaXAgb24gdGhlIGJvYXJkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZVNoaXAgb2JqZWN0XHJcbiAgICovXHJcbiAgcGxhY2VTaGlwKHRoZVNoaXApIHtcclxuICAgIFsuLi50aGVTaGlwLmNvb3Jkc10uZm9yRWFjaCgoY29vcmQpID0+IHtcclxuICAgICAgY29uc3QgeCA9IGNvb3JkLmdldFgoKTtcclxuICAgICAgY29uc3QgeSA9IGNvb3JkLmdldFkoKTtcclxuXHJcbiAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBpbiB0aGlzIGZpZWxkXHJcbiAgICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldICE9PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmllbGQgaXMgYWxyZWFkeSBvY2N1cGllZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0IGZpZWxkcyB0byBub3QgZW1wdHksIG5vdCBoaXRcclxuICAgICAgdGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9IDI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZsZWV0LnB1c2godGhlU2hpcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBpdCdzIE9LIHRvIHBsYWNlIHNob3RcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlQ29vcmQgdG8gaGl0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBPSyB0byBwbGFjZSBzaG90LCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBjYW5QbGFjZVNob3QodGhlQ29vcmQpIHtcclxuICAgIGNvbnN0IHggPSB0aGVDb29yZC5nZXRYKCk7XHJcbiAgICBjb25zdCB5ID0gdGhlQ29vcmQuZ2V0WSgpO1xyXG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG5cclxuICAgIC8vIElmIGZpZWxkIHZhbHVlIGlzIDAgb3IgMiwgaXQncyBPSyB0byBzaG9vdFxyXG4gICAgaWYgKGZpZWxkID09PSAwIHx8IGZpZWxkID09PSAyKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGFjZXMgc2hvdCBvbiB0aGUgYm9hcmRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlQ29vcmQgdG8gaGl0XHJcbiAgICogQHJldHVybnMgdGhlIHJlc3VsdCAoMSBvciAzIC0gdGhlIHR3byBwb3NzaWJsZSBvdXRjb21lcylcclxuICAgKi9cclxuICBwbGFjZVNob3QodGhlQ29vcmQpIHtcclxuICAgIGNvbnN0IHggPSB0aGVDb29yZC5nZXRYKCk7XHJcbiAgICBjb25zdCB5ID0gdGhlQ29vcmQuZ2V0WSgpO1xyXG5cclxuICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAxO1xyXG4gICAgICByZXR1cm4gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9PT0gMSB8fCB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpZWxkIGhhcyBhbHJlYWR5IGJlZW4gaGl0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAzO1xyXG5cclxuICAgIC8vIFdlIGhhdmUgYSBzdWNjZXNzZnVsIHNob3QsIGFuZCB0aGUgc2hpcCBtdXN0IHJlbWVtYmVyIHRoYXQgaXQgaGFzIGJlZW4gaGl0XHJcbiAgICB0aGlzLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAuaGFzQ29vcmRpbmF0ZXModGhlQ29vcmQpKSBzaGlwLmlzSGl0KHRoZUNvb3JkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBvZiBhIHNoaXAgaWYgaXQgd2FzIGRlc3Ryb3llZCBhbmQgcmVtb3ZlIGl0IGZyb20gZmxlZXRcclxuICAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIGNhbGxlZCBhZnRlciBldmVyeSBzaG90XHJcbiAgICogQHJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHNoaXAgdGhhdCBoYXMgYmVlbiBkZXN0cm95ZWQgKGlmIGhhc1N1bmsgcmV0dXJuIHRydWUpLFxyXG4gICAqIE9yIGFuIGVtcHR5IHN0cmluZyBpcyBzaGlwIHdhcyBub3QgZGVzdHJveWVkXHJcbiAgICovXHJcbiAgZ2V0RmxlZXRTdGF0dXMoKSB7XHJcbiAgICBjb25zdCBkZXN0cm95ZWRTaGlwID0gdGhpcy5mbGVldC5maW5kKChzaGlwKSA9PiBzaGlwLmhhc1N1bmsoKSk7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmxlZXQuaW5kZXhPZihkZXN0cm95ZWRTaGlwKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5mbGVldC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIHJldHVybiBkZXN0cm95ZWRTaGlwID09PSB1bmRlZmluZWQgPyBcIlwiIDogZGVzdHJveWVkU2hpcC5nZXROYW1lKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHYW1lIGlzIG92ZXIgaWYgZmxlZXQgYXJyYXkgaXMgZW1wdHlcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGdhbWUgaXMgb3ZlciwgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgaXNHYW1lT3ZlcigpIHtcclxuICAgIGlmICh0aGlzLmZsZWV0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb29yZGluYXRlIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgY29vcmRpbmF0ZSBzZXRcclxuICAgKiBAcGFyYW0ge051bWJlcn0geFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdmFsdWUgb2YgeCBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHggdmFsdWUgb2YgdGhpcyBjb29yZGluYXRlXHJcbiAgICovXHJcbiAgZ2V0WCgpIHtcclxuICAgIHJldHVybiB0aGlzLng7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdmFsdWUgb2YgeSBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHkgdmFsdWUgb2YgdGhpcyBjb29yZGluYXRlXHJcbiAgICovXHJcbiAgZ2V0WSgpIHtcclxuICAgIHJldHVybiB0aGlzLnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZXN0IHRoaXMgY29vcmRpbmF0ZSBmb3IgZXF1YWxpdHkgd2l0aCB0aGUgU2hpcCdzIGNvb3JkaW5hdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29vcmQgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIHRydWUgb3IgZmFsc2VcclxuICAgKi9cclxuICBlcXVhbHMoY29vcmQpIHtcclxuICAgIGlmICh0aGlzLnggPT09IGNvb3JkLmdldFgoKSAmJiB0aGlzLnkgPT09IGNvb3JkLmdldFkoKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIFBsYXllclxyXG4gICAqIEByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZSB2YXJpYWJsZVxyXG4gICAqL1xyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBzaGlwIG9mIGdpdmVuIGNvb3JkcyBhbmQgbmFtZVxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvb3Jkc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29vcmRzLCBuYW1lKSB7XHJcbiAgICB0aGlzLmNvb3JkcyA9IFsuLi5jb29yZHNdO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyB0aGF0IHRoZSBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdENvb3JkXHJcbiAgICovXHJcbiAgaXNIaXQoYXRDb29yZCkge1xyXG4gICAgdGhpcy5jb29yZHMuZm9yRWFjaCgoY29vcmQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChjb29yZC5lcXVhbHMoYXRDb29yZCkpIHtcclxuICAgICAgICB0aGlzLmNvb3Jkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHBhcnRzIGxlZnQgb2YgdGhpcyBzaGlwXHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjb29yZGluYXRlcyAtIGhlbmNlIHRoZSBzaGlwIGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIGhhc1N1bmsoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb29yZHMubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVzdHMgd2hldGhlciB0aGlzIHNoaXAgaXMgcGxhY2VkIG9uIHRoZXNlIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0Q29vcmQgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgc2hpcCBpcyBvbiB0aGVzZSBjb29yZGluYXRlcywgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgaGFzQ29vcmRpbmF0ZXMoYXRDb29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29vcmRzLnNvbWUoKGNvb3JkKSA9PiB7XHJcbiAgICAgIHJldHVybiBjb29yZC5lcXVhbHMoYXRDb29yZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgc2hpcFxyXG4gICAqIEByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZSB2YXJpYWJsZVxyXG4gICAqL1xyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXHJcXG4gIC0tY2xyLXJlZDogI2ZmMDA1NTtcXHJcXG4gIC0tY2xyLWJsdWU6ICM2MWM2ZmY7XFxyXFxuICAtLWNsci1saWdodC1ibHVlOiAjZGZmNGZmO1xcclxcbiAgLS1jbHItZGFyay1ncmF5OiAjNzE3Yzk2O1xcclxcbiAgLS1jbHItZ3JheTogIzkwOTI5MjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWdyYXk6ICNlYmViZWI7XFxyXFxuICAtLWNsci13aGl0ZTogI2ZmZmZmZjtcXHJcXG4gIC0tY2xyLWJsYWNrOiAjMjEyMTIxO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBodHRwczovL3BpY2NhbGlsLmxpL2Jsb2cvYS1tb2Rlcm4tY3NzLXJlc2V0ICovXFxyXFxuXFxyXFxuLyogQm94IHNpemluZyBydWxlcyAqL1xcclxcbiosXFxyXFxuKjo6YmVmb3JlLFxcclxcbio6OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBkZWZhdWx0IG1hcmdpbiAqL1xcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGZvbnQ6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBsaXN0IHN0eWxlcyBvbiB1bCwgb2wgZWxlbWVudHMgd2l0aCBhIGxpc3Qgcm9sZSwgd2hpY2ggc3VnZ2VzdHMgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZCAqL1xcclxcbnVsW3JvbGU9XFxcImxpc3RcXFwiXSxcXHJcXG5vbFtyb2xlPVxcXCJsaXN0XFxcIl0ge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2V0IGNvcmUgcm9vdCBkZWZhdWx0cyAqL1xcclxcbmh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLFxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSBib2R5IGRlZmF1bHRzICovXFxyXFxuYm9keSB7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZVNwZWVkO1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQSBlbGVtZW50cyB0aGF0IGRvbid0IGhhdmUgYSBjbGFzcyBnZXQgZGVmYXVsdCBzdHlsZXMgKi9cXHJcXG5hOm5vdChbY2xhc3NdKSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb24tc2tpcC1pbms6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIE1ha2UgaW1hZ2VzIGVhc2llciB0byB3b3JrIHdpdGggKi9cXHJcXG5pbWcsXFxyXFxucGljdHVyZSB7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGFsbCBhbmltYXRpb25zLCB0cmFuc2l0aW9ucyBhbmQgc21vb3RoIHNjcm9sbCBmb3IgcGVvcGxlIHRoYXQgcHJlZmVyIG5vdCB0byBzZWUgdGhlbSAqL1xcclxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XFxyXFxuICBodG1sOmZvY3VzLXdpdGhpbiB7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICosXFxyXFxuICAqOjpiZWZvcmUsXFxyXFxuICAqOjphZnRlciB7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDEgIWltcG9ydGFudDtcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0byAhaW1wb3J0YW50O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW0gMXJlbSAwLjVyZW0gMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxufVxcclxcblxcclxcbi5zdWJ0aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3Ige1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUge1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXIge1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIHBhZGRpbmc6IDEuNXJlbSAzcmVtIDEuNXJlbSAzcmVtO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMSA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzIgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllci10aXRsZSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcclxcbiAgICBcXFwiYmxhbmsgbGFiZWxzLWNoYXIgbGFiZWxzLWNoYXJcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCI7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ibGFuay1kaXYge1xcclxcbiAgZ3JpZC1hcmVhOiBibGFuaztcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1udW0ge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtbnVtO1xcclxcblxcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1jaGFyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIgPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZCB7XFxyXFxuICBncmlkLWFyZWE6IGJvYXJkO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xID4gLmJvYXJkLWNlbGwge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWJsdWUpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiA+IC5ib2FyZC1jZWxsIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHlhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkID4gaDMge1xcclxcbiAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXHJcXG4gIHRleHQtb3JpZW50YXRpb246IHNpZGV3YXlzO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuN3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsb0JBQW9CO0VBQ3BCLG9CQUFvQjtBQUN0Qjs7QUFFQSxnREFBZ0Q7O0FBRWhELHFCQUFxQjtBQUNyQjs7O0VBR0Usc0JBQXNCO0FBQ3hCOztBQUVBLDBCQUEwQjtBQUMxQjtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBLDJHQUEyRztBQUMzRzs7RUFFRSxnQkFBZ0I7QUFDbEI7O0FBRUEsMkJBQTJCO0FBQzNCO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLFlBQVk7QUFDZDs7QUFFQSwyQkFBMkI7QUFDM0I7RUFDRSxpQkFBaUI7RUFDakIsNkJBQTZCO0VBQzdCLGdCQUFnQjtBQUNsQjs7QUFFQSwwREFBMEQ7QUFDMUQ7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUEsb0NBQW9DO0FBQ3BDOztFQUVFLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBLGdHQUFnRztBQUNoRztFQUNFO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBOzs7SUFHRSxxQ0FBcUM7SUFDckMsdUNBQXVDO0lBQ3ZDLHNDQUFzQztJQUN0QyxnQ0FBZ0M7RUFDbEM7QUFDRjs7QUFFQTtFQUNFLHlDQUF5Qzs7RUFFekMsYUFBYTtFQUNiLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHVDQUF1QztFQUN2QyxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIseUJBQXlCO0VBQ3pCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsT0FBTzs7RUFFUCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxPQUFPOztFQUVQLGdDQUFnQzs7RUFFaEMsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxnQ0FBZ0M7QUFDbEM7O0FBRUE7RUFDRSxzQ0FBc0M7QUFDeEM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLGlCQUFpQjtFQUNqQix5QkFBeUI7RUFDekIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiOzs7NEJBRzBCO0VBQzFCLG1DQUFtQztFQUNuQyxnQ0FBZ0M7RUFDaEMsUUFBUTtBQUNWOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCOztFQUVyQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxzQkFBc0I7O0VBRXRCLGVBQWU7RUFDZiwyQkFBMkI7RUFDM0IsaUJBQWlCOztFQUVqQixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxPQUFPO0VBQ1Asa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCOztFQUVoQixhQUFhO0VBQ2Isc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7QUFDYjs7QUFFQTtFQUNFLHVDQUF1QztFQUN2Qyx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1Q0FBdUM7RUFDdkMsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QiwwQkFBMEI7RUFDMUIseUJBQXlCO0VBQ3pCLHlCQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsaUJBQWlCO0VBQ2pCLG1CQUFtQjtFQUNuQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGdCQUFnQjtFQUNoQix1QkFBdUI7O0VBRXZCLGlCQUFpQjtFQUNqQixpQkFBaUI7RUFDakIsMkJBQTJCO0FBQzdCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gIC0tY2xyLXJlZDogI2ZmMDA1NTtcXHJcXG4gIC0tY2xyLWJsdWU6ICM2MWM2ZmY7XFxyXFxuICAtLWNsci1saWdodC1ibHVlOiAjZGZmNGZmO1xcclxcbiAgLS1jbHItZGFyay1ncmF5OiAjNzE3Yzk2O1xcclxcbiAgLS1jbHItZ3JheTogIzkwOTI5MjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWdyYXk6ICNlYmViZWI7XFxyXFxuICAtLWNsci13aGl0ZTogI2ZmZmZmZjtcXHJcXG4gIC0tY2xyLWJsYWNrOiAjMjEyMTIxO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBodHRwczovL3BpY2NhbGlsLmxpL2Jsb2cvYS1tb2Rlcm4tY3NzLXJlc2V0ICovXFxyXFxuXFxyXFxuLyogQm94IHNpemluZyBydWxlcyAqL1xcclxcbiosXFxyXFxuKjo6YmVmb3JlLFxcclxcbio6OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBkZWZhdWx0IG1hcmdpbiAqL1xcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGZvbnQ6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBsaXN0IHN0eWxlcyBvbiB1bCwgb2wgZWxlbWVudHMgd2l0aCBhIGxpc3Qgcm9sZSwgd2hpY2ggc3VnZ2VzdHMgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZCAqL1xcclxcbnVsW3JvbGU9XFxcImxpc3RcXFwiXSxcXHJcXG5vbFtyb2xlPVxcXCJsaXN0XFxcIl0ge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2V0IGNvcmUgcm9vdCBkZWZhdWx0cyAqL1xcclxcbmh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLFxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSBib2R5IGRlZmF1bHRzICovXFxyXFxuYm9keSB7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZVNwZWVkO1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQSBlbGVtZW50cyB0aGF0IGRvbid0IGhhdmUgYSBjbGFzcyBnZXQgZGVmYXVsdCBzdHlsZXMgKi9cXHJcXG5hOm5vdChbY2xhc3NdKSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb24tc2tpcC1pbms6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIE1ha2UgaW1hZ2VzIGVhc2llciB0byB3b3JrIHdpdGggKi9cXHJcXG5pbWcsXFxyXFxucGljdHVyZSB7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGFsbCBhbmltYXRpb25zLCB0cmFuc2l0aW9ucyBhbmQgc21vb3RoIHNjcm9sbCBmb3IgcGVvcGxlIHRoYXQgcHJlZmVyIG5vdCB0byBzZWUgdGhlbSAqL1xcclxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XFxyXFxuICBodG1sOmZvY3VzLXdpdGhpbiB7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICosXFxyXFxuICAqOjpiZWZvcmUsXFxyXFxuICAqOjphZnRlciB7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDEgIWltcG9ydGFudDtcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0byAhaW1wb3J0YW50O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW0gMXJlbSAwLjVyZW0gMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxufVxcclxcblxcclxcbi5zdWJ0aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3Ige1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmdhbWUge1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXIge1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIHBhZGRpbmc6IDEuNXJlbSAzcmVtIDEuNXJlbSAzcmVtO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMSA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzIgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllci10aXRsZSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcclxcbiAgICBcXFwiYmxhbmsgbGFiZWxzLWNoYXIgbGFiZWxzLWNoYXJcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCI7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ibGFuay1kaXYge1xcclxcbiAgZ3JpZC1hcmVhOiBibGFuaztcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1udW0ge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtbnVtO1xcclxcblxcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1jaGFyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIgPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZCB7XFxyXFxuICBncmlkLWFyZWE6IGJvYXJkO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xID4gLmJvYXJkLWNlbGwge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWJsdWUpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiA+IC5ib2FyZC1jZWxsIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHlhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkID4gaDMge1xcclxcbiAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXHJcXG4gIHRleHQtb3JpZW50YXRpb246IHNpZGV3YXlzO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuN3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBCb2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vZmFjdG9yaWVzL1NoaXBcIjtcclxuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9mYWN0b3JpZXMvUGxheWVyXCI7XHJcbmltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2ZhY3Rvcmllcy9Db29yZGluYXRlXCI7XHJcblxyXG4vLyBQbGF5ZXIgMVxyXG5jb25zdCBwbGF5ZXIxID0gbmV3IFBsYXllcihcInBsYXllcjFcIik7XHJcbmNvbnN0IHBsYXllckJvYXJkID0gbmV3IEJvYXJkKDEwKTtcclxuY29uc3QgY2FycmllciA9IG5ldyBTaGlwKFxyXG4gIFtcclxuICAgIG5ldyBDb29yZGluYXRlKDAsIDApLFxyXG4gICAgbmV3IENvb3JkaW5hdGUoMCwgMSksXHJcbiAgICBuZXcgQ29vcmRpbmF0ZSgwLCAyKSxcclxuICAgIG5ldyBDb29yZGluYXRlKDAsIDMpLFxyXG4gICAgbmV3IENvb3JkaW5hdGUoMCwgNCksXHJcbiAgXSxcclxuICBcImNhcnJpZXJcIlxyXG4pO1xyXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoY2Fycmllcik7XHJcblxyXG5jb25zdCBiYXR0bGVzaGlwID0gbmV3IFNoaXAoXHJcbiAgW1xyXG4gICAgbmV3IENvb3JkaW5hdGUoMSwgMCksXHJcbiAgICBuZXcgQ29vcmRpbmF0ZSgxLCAxKSxcclxuICAgIG5ldyBDb29yZGluYXRlKDEsIDIpLFxyXG4gICAgbmV3IENvb3JkaW5hdGUoMSwgMyksXHJcbiAgXSxcclxuICBcImJhdHRsZXNoaXBcIlxyXG4pO1xyXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoYmF0dGxlc2hpcCk7XHJcblxyXG5jb25zdCBkZXN0cm95ZXIgPSBuZXcgU2hpcChcclxuICBbbmV3IENvb3JkaW5hdGUoMiwgMCksIG5ldyBDb29yZGluYXRlKDIsIDEpLCBuZXcgQ29vcmRpbmF0ZSgyLCAyKV0sXHJcbiAgXCJkZXN0cm95ZXJcIlxyXG4pO1xyXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAoZGVzdHJveWVyKTtcclxuXHJcbmNvbnN0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFxyXG4gIFtuZXcgQ29vcmRpbmF0ZSgzLCAwKSwgbmV3IENvb3JkaW5hdGUoMywgMSksIG5ldyBDb29yZGluYXRlKDMsIDIpXSxcclxuICBcInN1Ym1hcmluZVwiXHJcbik7XHJcbnBsYXllckJvYXJkLnBsYWNlU2hpcChzdWJtYXJpbmUpO1xyXG5cclxuY29uc3QgcGF0cm9sID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDQsIDApLCBuZXcgQ29vcmRpbmF0ZSg0LCAxKV0sIFwicGF0cm9sXCIpO1xyXG5wbGF5ZXJCb2FyZC5wbGFjZVNoaXAocGF0cm9sKTtcclxuXHJcbi8vIFBsYXllciAyXHJcbmNvbnN0IHBsYXllcjIgPSBuZXcgUGxheWVyKFwicGxheWVyMlwiKTtcclxuY29uc3QgcGxheWVyMkJvYXJkID0gbmV3IEJvYXJkKDEwKTtcclxuY29uc3QgY2FycmllcjIgPSBuZXcgU2hpcChcclxuICBbXHJcbiAgICBuZXcgQ29vcmRpbmF0ZSgwLCAwKSxcclxuICAgIG5ldyBDb29yZGluYXRlKDAsIDEpLFxyXG4gICAgbmV3IENvb3JkaW5hdGUoMCwgMiksXHJcbiAgICBuZXcgQ29vcmRpbmF0ZSgwLCAzKSxcclxuICAgIG5ldyBDb29yZGluYXRlKDAsIDQpLFxyXG4gIF0sXHJcbiAgXCJjYXJyaWVyXCJcclxuKTtcclxucGxheWVyMkJvYXJkLnBsYWNlU2hpcChjYXJyaWVyMik7XHJcblxyXG5jb25zdCBiYXR0bGVzaGlwMiA9IG5ldyBTaGlwKFxyXG4gIFtcclxuICAgIG5ldyBDb29yZGluYXRlKDEsIDApLFxyXG4gICAgbmV3IENvb3JkaW5hdGUoMSwgMSksXHJcbiAgICBuZXcgQ29vcmRpbmF0ZSgxLCAyKSxcclxuICAgIG5ldyBDb29yZGluYXRlKDEsIDMpLFxyXG4gIF0sXHJcbiAgXCJiYXR0bGVzaGlwXCJcclxuKTtcclxucGxheWVyMkJvYXJkLnBsYWNlU2hpcChiYXR0bGVzaGlwMik7XHJcblxyXG5jb25zdCBkZXN0cm95ZXIyID0gbmV3IFNoaXAoXHJcbiAgW25ldyBDb29yZGluYXRlKDIsIDApLCBuZXcgQ29vcmRpbmF0ZSgyLCAxKSwgbmV3IENvb3JkaW5hdGUoMiwgMildLFxyXG4gIFwiZGVzdHJveWVyXCJcclxuKTtcclxucGxheWVyMkJvYXJkLnBsYWNlU2hpcChkZXN0cm95ZXIyKTtcclxuXHJcbmNvbnN0IHN1Ym1hcmluZTIgPSBuZXcgU2hpcChcclxuICBbbmV3IENvb3JkaW5hdGUoMywgMCksIG5ldyBDb29yZGluYXRlKDMsIDEpLCBuZXcgQ29vcmRpbmF0ZSgzLCAyKV0sXHJcbiAgXCJzdWJtYXJpbmVcIlxyXG4pO1xyXG5wbGF5ZXIyQm9hcmQucGxhY2VTaGlwKHN1Ym1hcmluZTIpO1xyXG5cclxuY29uc3QgcGF0cm9sMiA9IG5ldyBTaGlwKFxyXG4gIFtuZXcgQ29vcmRpbmF0ZSg0LCAwKSwgbmV3IENvb3JkaW5hdGUoNCwgMSldLFxyXG4gIFwicGF0cm9sXCJcclxuKTtcclxucGxheWVyMkJvYXJkLnBsYWNlU2hpcChwYXRyb2wyKTtcclxuXHJcbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xyXG5sZXQgdHVybiA9IDE7XHJcblxyXG4vLyBCYXR0bGUgU2ltdWxhdGlvblxyXG53aGlsZSAoIWdhbWVPdmVyKSB7XHJcbiAgbGV0IHJhbmRvbVggPSByYW5kb21JbnRlZ2VyKDAsIDkpO1xyXG4gIGxldCByYW5kb21ZID0gcmFuZG9tSW50ZWdlcigwLCA5KTtcclxuICBsZXQgdGFyZ2V0Q29vcmQgPSBuZXcgQ29vcmRpbmF0ZShyYW5kb21YLCByYW5kb21ZKTtcclxuXHJcbiAgc3dpdGNoICh0dXJuICUgMiA9PT0gMSkge1xyXG4gICAgLy8gUGxheWVyIDEgdHVyblxyXG4gICAgY2FzZSB0cnVlOlxyXG4gICAgICBpZiAocGxheWVyMkJvYXJkLmNhblBsYWNlU2hvdCh0YXJnZXRDb29yZCkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgcGxheWVyMkJvYXJkLnBsYWNlU2hvdCh0YXJnZXRDb29yZCk7XHJcbiAgICAgICAgICBwbGF5ZXIyQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuICAgICAgICAgIGdhbWVPdmVyID0gcGxheWVyMkJvYXJkLmlzR2FtZU92ZXIoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChnYW1lT3ZlcikgY29uc29sZS5sb2coYEdhbWUgb3ZlciEgV2lubmVyOiBQbGF5ZXIgMWApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBZb3UgY2FuJ3Qgc2hvb3QgaGVyZSFgKTtcclxuICAgICAgfVxyXG4gICAgICB0dXJuKys7XHJcbiAgICAgIGJyZWFrO1xyXG5cclxuICAgIC8vIFBsYXllciAyIHR1cm5cclxuICAgIGNhc2UgZmFsc2U6XHJcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5jYW5QbGFjZVNob3QodGFyZ2V0Q29vcmQpKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHBsYXllckJvYXJkLnBsYWNlU2hvdCh0YXJnZXRDb29yZCk7XHJcbiAgICAgICAgICBwbGF5ZXJCb2FyZC5nZXRGbGVldFN0YXR1cygpO1xyXG4gICAgICAgICAgZ2FtZU92ZXIgPSBwbGF5ZXJCb2FyZC5pc0dhbWVPdmVyKCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGdhbWVPdmVyKSBjb25zb2xlLmxvZyhgR2FtZSBvdmVyISBXaW5uZXI6IFBsYXllciAyYCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coYFlvdSBjYW4ndCBzaG9vdCBoZXJlIWApO1xyXG4gICAgICB9XHJcbiAgICAgIHR1cm4rKztcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zb2xlLmxvZyhwbGF5ZXJCb2FyZC5pc0dhbWVPdmVyKCkpO1xyXG5jb25zb2xlLmxvZyhwbGF5ZXIyQm9hcmQuaXNHYW1lT3ZlcigpKTtcclxuXHJcbmZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG4iXSwibmFtZXMiOlsiQm9hcmQiLCJzaXplIiwiZmxlZXQiLCJmaWVsZFN0YXR1cyIsIkFycmF5IiwibWFwIiwieCIsImoiLCJmaWxsIiwieSIsInRoZVNoaXAiLCJjb29yZHMiLCJmb3JFYWNoIiwiY29vcmQiLCJnZXRYIiwiZ2V0WSIsIkVycm9yIiwicHVzaCIsInRoZUNvb3JkIiwiZmllbGQiLCJzaGlwIiwiaGFzQ29vcmRpbmF0ZXMiLCJpc0hpdCIsImRlc3Ryb3llZFNoaXAiLCJmaW5kIiwiaGFzU3VuayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInVuZGVmaW5lZCIsImdldE5hbWUiLCJsZW5ndGgiLCJDb29yZGluYXRlIiwiUGxheWVyIiwibmFtZSIsIlNoaXAiLCJhdENvb3JkIiwiZXF1YWxzIiwic29tZSIsInBsYXllcjEiLCJwbGF5ZXJCb2FyZCIsImNhcnJpZXIiLCJwbGFjZVNoaXAiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sIiwicGxheWVyMiIsInBsYXllcjJCb2FyZCIsImNhcnJpZXIyIiwiYmF0dGxlc2hpcDIiLCJkZXN0cm95ZXIyIiwic3VibWFyaW5lMiIsInBhdHJvbDIiLCJnYW1lT3ZlciIsInR1cm4iLCJyYW5kb21YIiwicmFuZG9tSW50ZWdlciIsInJhbmRvbVkiLCJ0YXJnZXRDb29yZCIsImNhblBsYWNlU2hvdCIsInBsYWNlU2hvdCIsImdldEZsZWV0U3RhdHVzIiwiaXNHYW1lT3ZlciIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iXSwic291cmNlUm9vdCI6IiJ9