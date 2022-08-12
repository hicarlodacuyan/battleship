/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/boardComponent.js":
/*!******************************************!*\
  !*** ./src/components/boardComponent.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ boardComponent)
/* harmony export */ });
function boardComponent(theBoard, player) {
  return theBoard.fieldStatus.map(function (row, coordX) {
    return row.map(function (col, coordY) {
      var status = theBoard.getFieldStatus(coordX, coordY);

      if (status === 1) {
        return "\n              <div class=\"board-cell-".concat(player, "\" data-coordx=\"").concat(coordX, "\" data-coordy=\"").concat(coordY, "\">\n                <div class=\"hit-missed-player-1\"></div>\n              </div>\n            ");
      }

      if (status === 2) {
        return "\n              <div class=\"board-cell-".concat(player, "\" data-coordx=\"").concat(coordX, "\" data-coordy=\"").concat(coordY, "\">\n                <div class=\"ship-body\">\n                  <div class=\"occupied-not-hit\"></div>\n                </div>\n              </div>\n            ");
      }

      if (status === 3) {
        return "\n              <div class=\"board-cell-".concat(player, "\" data-coordx=\"").concat(coordX, "\" data-coordy=\"").concat(coordY, "\">\n                <div class=\"ship-body\">\n                  <div class=\"hit\"></div>\n                </div>\n              </div>\n            ");
      }

      return "<div class=\"board-cell-".concat(player, "\" data-coordx=\"").concat(coordX, "\" data-coordy=\"").concat(coordY, "\"></div>");
    }).join("");
  }).join("");
}

/***/ }),

/***/ "./src/components/shipyardComponent.js":
/*!*********************************************!*\
  !*** ./src/components/shipyardComponent.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ shipyardComponent)
/* harmony export */ });
function shipyardComponent(theFleet) {
  return theFleet.map(function (ship) {
    return "<p>".concat(ship.getName(), " (").concat(ship.coords.length, ")</p>");
  }).join("");
}

/***/ }),

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
        if (x >= _this.size || y >= _this.size) throw new Error("Out of covered area"); // If ship is already in this field

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

/***/ "./src/lib/randomNumber.js":
/*!*********************************!*\
  !*** ./src/lib/randomNumber.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ randomInteger)
/* harmony export */ });
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/***/ }),

/***/ "./src/lib/render.js":
/*!***************************!*\
  !*** ./src/lib/render.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var render = function render(template, node) {
  if (!node) return;
  node.innerHTML = template;
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

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
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./images/background.jpg */ "./src/images/background.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n  min-width: 100%;\r\n  min-height: 100%;\r\n  background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  backdrop-filter: blur(5px);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Header Styling */\r\n.primary-header {\r\n  width: 100%;\r\n  padding: 0.5rem 3rem 0.5rem 3rem;\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.author > a {\r\n  color: inherit;\r\n}\r\n\r\n/* Game Styling */\r\n.game {\r\n  /* display: flex; */\r\n  display: none;\r\n\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-direction: column;\r\n\r\n  border: 20px solid rgba(108, 122, 137, .5);\r\n  border-radius: 20px;\r\n  /* border-image: linear-gradient(45deg, var(--clr-dark-gray), var(--clr-gray)) 1; */\r\n}\r\n\r\n.players {\r\n  display: flex;\r\n}\r\n\r\n.player {\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n  background-color: var(--clr-white);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  width: 100%;\r\n}\r\n\r\n/* .player_1 {\r\n  border-top-left-radius: 10px;\r\n  border-bottom-left-radius: 10px;\r\n}\r\n\r\n.player_2{\r\n  border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px;\r\n} */\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  min-width: 300px;\r\n  min-height: 300px;\r\n  flex: 1;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.labels-num > p {\r\n  flex: 1;\r\n  text-align: center;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell-1 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-cell-2 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-player-1 > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2 {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2:hover {\r\n  filter: blur(1rem);\r\n}\r\n\r\n.board-player-2  .occupied-not-hit {\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship-front {\r\n  height: 100%;\r\n  background-color: var(--clr-light-gray);\r\n  border-top-right-radius: 50%;\r\n  border-bottom-right-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-body {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-back {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n  border-top-left-radius: 50%;\r\n  border-bottom-left-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.hit {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-red);\r\n  border-radius: 50%;\r\n}\r\n\r\n.occupied-not-hit {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-1 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-blue);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-2 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n/* Menu Styling */\r\n.menu-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-direction: column;\r\n\r\n  /* border: 20px solid;\r\n  border-image: linear-gradient(45deg, var(--clr-dark-gray), var(--clr-gray)) 1; */\r\n\r\n  border: 20px solid rgba(108, 122, 137, .5);\r\n  border-radius: 20px;\r\n}\r\n\r\n.menu-container > .player {\r\n  padding: 0.75rem 1.5rem;\r\n\r\n  /* border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px; */\r\n}\r\n\r\n.menu-container > .primary-header {\r\n  padding: 0.75rem 1.5rem;\r\n}\r\n\r\n.menu-container > .primary-header > .container > .title {\r\n  font-size: 1rem;\r\n}\r\n\r\n.menu-container > .primary-header > .container > .subtitle {\r\n  font-size: 0.6rem;\r\n}\r\n\r\n.menu-container > .player_1 {\r\n  flex: none;\r\n  width: 400px;\r\n\r\n  /* border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px; */\r\n}\r\n\r\n.board-player-1-menu > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.ship {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship {\r\n  width: 140px;\r\n  height: 25px;\r\n\r\n  display: flex;\r\n}\r\n\r\n.ship > div {\r\n  flex: 1;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.circle {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.battleship {\r\n  width: 110px;\r\n  height: 25px;\r\n}\r\n\r\n.destroyer {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.submarine {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.cruiser {\r\n  width: 50px;\r\n  height: 25px;\r\n}\r\n\r\n.drag-over {\r\n  border: 1px solid var(--clr-red);\r\n}\r\n\r\n.draggable-indicator {\r\n  border-left: 2px solid var(--clr-red);\r\n  cursor: grab;\r\n}\r\n\r\n.footnote {\r\n  color: var(--clr-dark-gray);\r\n  font-size: 0.75rem;\r\n  font-style: italic;\r\n}\r\n\r\n/* Mobile Layout */\r\n@media screen and (max-width: 767px) {\r\n  body {\r\n    display: block;\r\n  }\r\n\r\n  .primary-header {\r\n    padding: 0.5rem 1rem;\r\n  }\r\n\r\n  .title {\r\n    font-size: 0.75rem;\r\n  }\r\n\r\n  .subtitle {\r\n    font-size: 0.5rem;\r\n  }\r\n\r\n  .game {\r\n    display: none;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    height: auto;\r\n\r\n    border: 20px solid rgba(108, 122, 137, .5);\r\n    border-radius: 20px;\r\n  }\r\n\r\n  .players {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 100%;\r\n  }\r\n\r\n  .player {\r\n    padding: 1rem;\r\n  }\r\n\r\n  .player_1 {\r\n    flex: 1;\r\n  }\r\n\r\n  .player_2 {\r\n    flex: 2;\r\n  }\r\n\r\n  .board-container {\r\n    min-width: auto;\r\n    min-height: auto;\r\n  }\r\n\r\n  .menu-container {\r\n    height: 100%;\r\n  }\r\n\r\n  .menu-container > .player_1 {\r\n    width: 100%;\r\n    flex: 1;\r\n  }\r\n\r\n  .menu-container > .primary-header > .container > .title {\r\n    font-size: 0.75rem;\r\n  }\r\n  \r\n  .menu-container > .primary-header > .container > .subtitle {\r\n    font-size: 0.5rem;\r\n  }\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n  min-width: 100%;\r\n  min-height: 100%;\r\n  background: linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url(\"./images/background.jpg\");\r\n  background-position: center;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  backdrop-filter: blur(5px);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Header Styling */\r\n.primary-header {\r\n  width: 100%;\r\n  padding: 0.5rem 3rem 0.5rem 3rem;\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.author > a {\r\n  color: inherit;\r\n}\r\n\r\n/* Game Styling */\r\n.game {\r\n  /* display: flex; */\r\n  display: none;\r\n\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-direction: column;\r\n\r\n  border: 20px solid rgba(108, 122, 137, .5);\r\n  border-radius: 20px;\r\n  /* border-image: linear-gradient(45deg, var(--clr-dark-gray), var(--clr-gray)) 1; */\r\n}\r\n\r\n.players {\r\n  display: flex;\r\n}\r\n\r\n.player {\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n  background-color: var(--clr-white);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n  width: 100%;\r\n}\r\n\r\n/* .player_1 {\r\n  border-top-left-radius: 10px;\r\n  border-bottom-left-radius: 10px;\r\n}\r\n\r\n.player_2{\r\n  border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px;\r\n} */\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  min-width: 300px;\r\n  min-height: 300px;\r\n  flex: 1;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.labels-num > p {\r\n  flex: 1;\r\n  text-align: center;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell-1 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-cell-2 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-player-1 > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2 {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2:hover {\r\n  filter: blur(1rem);\r\n}\r\n\r\n.board-player-2  .occupied-not-hit {\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship-front {\r\n  height: 100%;\r\n  background-color: var(--clr-light-gray);\r\n  border-top-right-radius: 50%;\r\n  border-bottom-right-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-body {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-back {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n  border-top-left-radius: 50%;\r\n  border-bottom-left-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.hit {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-red);\r\n  border-radius: 50%;\r\n}\r\n\r\n.occupied-not-hit {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-1 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-blue);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-2 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n/* Menu Styling */\r\n.menu-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  flex-direction: column;\r\n\r\n  /* border: 20px solid;\r\n  border-image: linear-gradient(45deg, var(--clr-dark-gray), var(--clr-gray)) 1; */\r\n\r\n  border: 20px solid rgba(108, 122, 137, .5);\r\n  border-radius: 20px;\r\n}\r\n\r\n.menu-container > .player {\r\n  padding: 0.75rem 1.5rem;\r\n\r\n  /* border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px; */\r\n}\r\n\r\n.menu-container > .primary-header {\r\n  padding: 0.75rem 1.5rem;\r\n}\r\n\r\n.menu-container > .primary-header > .container > .title {\r\n  font-size: 1rem;\r\n}\r\n\r\n.menu-container > .primary-header > .container > .subtitle {\r\n  font-size: 0.6rem;\r\n}\r\n\r\n.menu-container > .player_1 {\r\n  flex: none;\r\n  width: 400px;\r\n\r\n  /* border-top-right-radius: 10px;\r\n  border-bottom-right-radius: 10px; */\r\n}\r\n\r\n.board-player-1-menu > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.ship {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship {\r\n  width: 140px;\r\n  height: 25px;\r\n\r\n  display: flex;\r\n}\r\n\r\n.ship > div {\r\n  flex: 1;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.circle {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.battleship {\r\n  width: 110px;\r\n  height: 25px;\r\n}\r\n\r\n.destroyer {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.submarine {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.cruiser {\r\n  width: 50px;\r\n  height: 25px;\r\n}\r\n\r\n.drag-over {\r\n  border: 1px solid var(--clr-red);\r\n}\r\n\r\n.draggable-indicator {\r\n  border-left: 2px solid var(--clr-red);\r\n  cursor: grab;\r\n}\r\n\r\n.footnote {\r\n  color: var(--clr-dark-gray);\r\n  font-size: 0.75rem;\r\n  font-style: italic;\r\n}\r\n\r\n/* Mobile Layout */\r\n@media screen and (max-width: 767px) {\r\n  body {\r\n    display: block;\r\n  }\r\n\r\n  .primary-header {\r\n    padding: 0.5rem 1rem;\r\n  }\r\n\r\n  .title {\r\n    font-size: 0.75rem;\r\n  }\r\n\r\n  .subtitle {\r\n    font-size: 0.5rem;\r\n  }\r\n\r\n  .game {\r\n    display: none;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    height: auto;\r\n\r\n    border: 20px solid rgba(108, 122, 137, .5);\r\n    border-radius: 20px;\r\n  }\r\n\r\n  .players {\r\n    display: flex;\r\n    flex-direction: column;\r\n    width: 100%;\r\n  }\r\n\r\n  .player {\r\n    padding: 1rem;\r\n  }\r\n\r\n  .player_1 {\r\n    flex: 1;\r\n  }\r\n\r\n  .player_2 {\r\n    flex: 2;\r\n  }\r\n\r\n  .board-container {\r\n    min-width: auto;\r\n    min-height: auto;\r\n  }\r\n\r\n  .menu-container {\r\n    height: 100%;\r\n  }\r\n\r\n  .menu-container > .player_1 {\r\n    width: 100%;\r\n    flex: 1;\r\n  }\r\n\r\n  .menu-container > .primary-header > .container > .title {\r\n    font-size: 0.75rem;\r\n  }\r\n  \r\n  .menu-container > .primary-header > .container > .subtitle {\r\n    font-size: 0.5rem;\r\n  }\r\n}"],"sourceRoot":""}]);
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

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
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

/***/ }),

/***/ "./src/images/background.jpg":
/*!***********************************!*\
  !*** ./src/images/background.jpg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "52f894250a84c2774721.jpg";

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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
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
/* harmony import */ var _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/Coordinate */ "./src/factories/Coordinate.js");
/* harmony import */ var _components_boardComponent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/boardComponent */ "./src/components/boardComponent.js");
/* harmony import */ var _components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/shipyardComponent */ "./src/components/shipyardComponent.js");
/* harmony import */ var _lib_render__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/render */ "./src/lib/render.js");
/* harmony import */ var _lib_randomNumber__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/randomNumber */ "./src/lib/randomNumber.js");







 // Initialization of Human Player Board and Ships

var playerBoard = new _factories_Board__WEBPACK_IMPORTED_MODULE_1__["default"](10); // Render to the DOM the initial Human Player Board State

(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), document.querySelector(".board-player-1"));
(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), document.querySelector(".board-player-1-menu"));
var menuContainer = document.querySelector(".menu-container");
var gameContainer = document.querySelector(".game");
var ships = document.querySelectorAll('.ship'); // 0 - horizontal
// 1 - vertical

var orientation = 0;
ships.forEach(function (ship) {
  return ship.addEventListener("dragstart", dragStart);
});

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

var cells = document.querySelectorAll(".board-cell-1");
cells.forEach(function (cell) {
  cell.addEventListener('dragenter', dragEnter);
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragleave', dragLeave);
  cell.addEventListener('drop', drop);
});

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
  e.target.style.border = "1px solid red";
}

function dragLeave(e) {
  e.target.style.border = "1px solid white";
}

function drop(e) {
  var id = e.dataTransfer.getData('text/plain');
  var draggable = document.getElementById(id);
  var shipCoords = [];
  var coordX = parseInt(e.target.dataset.coordx);
  var coordY = parseInt(e.target.dataset.coordy);
  var shipLength = draggable.dataset.shiplength;

  if (orientation === 0) {
    for (var i = 0; i < shipLength; i++) {
      shipCoords.push(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coordX, coordY + i));
    }
  } else {
    for (var _i = 0; _i < shipLength; _i++) {
      shipCoords.push(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coordX + _i, coordY));
    }
  }

  var ship = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"](shipCoords, "".concat(id));

  if (playerBoard.canPlaceShip(ship)) {
    playerBoard.placeShip(ship);
    draggable.style.display = "none";
  } else {
    return;
  }

  if (playerBoard.fleet.length === 5) {
    menuContainer.style.display = "none";
    gameContainer.style.display = "flex";
  }

  shipCoords = [];
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), document.querySelector(".board-player-1-menu"));
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), document.querySelector(".board-player-1"));
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard.fleet), document.querySelector(".ships-1"));
  document.querySelectorAll(".board-cell-1").forEach(function (cell) {
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', drop);
  });
} // Initialization of AI Player Board and Ships


var AIBoard = new _factories_Board__WEBPACK_IMPORTED_MODULE_1__["default"](10);
var cruiser2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](3, 6), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](3, 7)], "cruiser");
var submarine2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](6, 9), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](7, 9), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](8, 9)], "submarine");
var destroyer2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](5, 0), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](5, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](5, 2)], "destroyer");
var battleship2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](1, 3), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](1, 4), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](1, 5), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](1, 6)], "battleship");
var carrier2 = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](8, 1), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](8, 2), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](8, 3), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](8, 4), new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](8, 5)], "carrier"); // Place initial Ships to AI Player Board

AIBoard.placeShip(cruiser2);
AIBoard.placeShip(submarine2);
AIBoard.placeShip(destroyer2);
AIBoard.placeShip(battleship2);
AIBoard.placeShip(carrier2); // Render to the DOM the initial AI Player Board State

(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(AIBoard, 2), document.querySelector(".board-player-2")); // Render to the DOM initial state of the Ships of both players

(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard.fleet), document.querySelector(".ships-1"));
(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(AIBoard.fleet), document.querySelector(".ships-2")); // Human Player Game Controller

function handlePlayerTurn() {
  document.querySelectorAll(".board-cell-2").forEach(function (cell, index) {
    cell.addEventListener("click", function (e) {
      var coords = Array.from(String(index), Number);

      if (coords.length === 1) {
        coords.unshift(0);
      }

      AIBoard.placeShot(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coords[0], coords[1]));
      AIBoard.getFleetStatus();
      (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(AIBoard, 2), document.querySelector(".board-player-2"));
      (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(AIBoard.fleet), document.querySelector(".ships-2"));

      if (AIBoard.isGameOver()) {
        return setTimeout(function () {
          return alert("Game Over! You won!");
        }, 100);
      } // Pass the current turn to AI Player Game Controller after 1 second delay


      setTimeout(function () {
        handleOpponentTurn();
      }, 1000);
    });
  });
} // AI Player Game Controller


function handleOpponentTurn() {
  var coords = new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"]((0,_lib_randomNumber__WEBPACK_IMPORTED_MODULE_7__["default"])(0, 9), (0,_lib_randomNumber__WEBPACK_IMPORTED_MODULE_7__["default"])(0, 9));
  /**
   * If the shot is valid, place the shot.
   * Else, generate a new coords while shot is invalid and try again.
   */

  if (playerBoard.canPlaceShot(coords)) {
    playerBoard.placeShot(coords);
    playerBoard.getFleetStatus();
  } else {
    var invalidShot = true;

    while (invalidShot) {
      coords = new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"]((0,_lib_randomNumber__WEBPACK_IMPORTED_MODULE_7__["default"])(0, 9), (0,_lib_randomNumber__WEBPACK_IMPORTED_MODULE_7__["default"])(0, 9));

      if (playerBoard.canPlaceShot(coords)) {
        playerBoard.placeShot(coords);
        playerBoard.getFleetStatus();
        invalidShot = false;
      }
    }
  }

  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), document.querySelector(".board-player-1"));
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard.fleet), document.querySelector(".ships-1"));

  if (playerBoard.isGameOver()) {
    return setTimeout(function () {
      return alert("Game Over! Opponent won!");
    }, 100);
  } // Pass the current turn to Human Player Game Controller


  handlePlayerTurn();
}

handlePlayerTurn();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlLFNBQVNBLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDQyxNQUFsQyxFQUEwQztFQUN2RCxPQUFPRCxRQUFRLENBQUNFLFdBQVQsQ0FBcUJDLEdBQXJCLENBQXlCLFVBQUNDLEdBQUQsRUFBTUMsTUFBTjtJQUFBLE9BQzVCRCxHQUFHLENBQUNELEdBQUosQ0FBUSxVQUFDRyxHQUFELEVBQU1DLE1BQU4sRUFBaUI7TUFDckIsSUFBTUMsTUFBTSxHQUFHUixRQUFRLENBQUNTLGNBQVQsQ0FBd0JKLE1BQXhCLEVBQWdDRSxNQUFoQyxDQUFmOztNQUVBLElBQUlDLE1BQU0sS0FBSyxDQUFmLEVBQWtCO1FBQ2hCLHlEQUMyQlAsTUFEM0IsOEJBQ21ESSxNQURuRCw4QkFDMkVFLE1BRDNFO01BS0Q7O01BRUQsSUFBSUMsTUFBTSxLQUFLLENBQWYsRUFBa0I7UUFDaEIseURBQzJCUCxNQUQzQiw4QkFDbURJLE1BRG5ELDhCQUMyRUUsTUFEM0U7TUFPRDs7TUFFRCxJQUFJQyxNQUFNLEtBQUssQ0FBZixFQUFrQjtRQUNoQix5REFDMkJQLE1BRDNCLDhCQUNtREksTUFEbkQsOEJBQzJFRSxNQUQzRTtNQU9EOztNQUVELHlDQUFpQ04sTUFBakMsOEJBQXlESSxNQUF6RCw4QkFBaUZFLE1BQWpGO0lBQ0QsQ0FoQ0gsRUFpQ0dHLElBakNILENBaUNRLEVBakNSLENBRDRCO0VBQUEsQ0FBekIsRUFvQ0pBLElBcENJLENBb0NDLEVBcENELENBQVA7QUFxQ0Q7Ozs7Ozs7Ozs7Ozs7O0FDdENjLFNBQVNDLGlCQUFULENBQTJCQyxRQUEzQixFQUFxQztFQUNsRCxPQUFPQSxRQUFRLENBQUNULEdBQVQsQ0FBYSxVQUFDVSxJQUFELEVBQVU7SUFDNUIsb0JBQWFBLElBQUksQ0FBQ0MsT0FBTCxFQUFiLGVBQWdDRCxJQUFJLENBQUNFLE1BQUwsQ0FBWUMsTUFBNUM7RUFDRCxDQUZNLEVBRUpOLElBRkksQ0FFQyxFQUZELENBQVA7QUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNKb0JPO0VBQ25CLGVBQVlDLElBQVosRUFBa0I7SUFBQTs7SUFDaEI7SUFDQSxLQUFLQSxJQUFMLEdBQVlBLElBQVo7SUFFQTtBQUNKO0FBQ0E7QUFDQTs7SUFDSSxLQUFLQyxLQUFMLEdBQWEsRUFBYjtJQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUNJLEtBQUtqQixXQUFMLEdBQW1CLG1CQUFJa0IsS0FBSyxDQUFDRixJQUFELENBQVQsRUFBaUJmLEdBQWpCLENBQXFCLFVBQUNrQixDQUFELEVBQUlDLENBQUo7TUFBQSxPQUFVRixLQUFLLENBQUNGLElBQUQsQ0FBTCxDQUFZSyxJQUFaLENBQWlCLENBQWpCLENBQVY7SUFBQSxDQUFyQixDQUFuQjtFQUNEO0VBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNFLHdCQUFlRixDQUFmLEVBQWtCRyxDQUFsQixFQUFxQjtNQUNuQixPQUFPLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLENBQVA7SUFDRDtJQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxzQkFBYUMsT0FBYixFQUFzQjtNQUFBOztNQUNwQixtQkFBSUEsT0FBTyxDQUFDVixNQUFaLEVBQW9CVyxPQUFwQixDQUE0QixVQUFDQyxLQUFELEVBQVc7UUFDckMsSUFBTU4sQ0FBQyxHQUFHTSxLQUFLLENBQUNDLElBQU4sRUFBVjtRQUNBLElBQU1KLENBQUMsR0FBR0csS0FBSyxDQUFDRSxJQUFOLEVBQVY7UUFFQSxJQUFJUixDQUFDLElBQUksS0FBSSxDQUFDSCxJQUFWLElBQWtCTSxDQUFDLElBQUksS0FBSSxDQUFDTixJQUFoQyxFQUFzQyxNQUFNLElBQUlZLEtBQUosdUJBQU4sQ0FKRCxDQU1yQzs7UUFDQSxJQUFJLEtBQUksQ0FBQzVCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0MsT0FBTyxLQUFQO01BQ25DLENBUkQ7O01BVUEsT0FBTyxJQUFQO0lBQ0Q7SUFFRDtBQUNGO0FBQ0E7QUFDQTs7OztXQUNFLG1CQUFVQyxPQUFWLEVBQW1CO01BQUE7O01BQ2pCLG1CQUFJQSxPQUFPLENBQUNWLE1BQVosRUFBb0JXLE9BQXBCLENBQTRCLFVBQUNDLEtBQUQsRUFBVztRQUNyQyxJQUFNTixDQUFDLEdBQUdNLEtBQUssQ0FBQ0MsSUFBTixFQUFWO1FBQ0EsSUFBTUosQ0FBQyxHQUFHRyxLQUFLLENBQUNFLElBQU4sRUFBVixDQUZxQyxDQUlyQzs7UUFDQSxJQUFJLE1BQUksQ0FBQzNCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0M7VUFDaEMsTUFBTSxJQUFJTSxLQUFKLENBQVUsMkJBQVYsQ0FBTjtRQUNELENBUG9DLENBU3JDOzs7UUFDQSxNQUFJLENBQUM1QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLElBQXlCLENBQXpCO01BQ0QsQ0FYRDs7TUFhQSxLQUFLTCxLQUFMLENBQVdZLElBQVgsQ0FBZ0JOLE9BQWhCO0lBQ0Q7SUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0Usc0JBQWFPLFFBQWIsRUFBdUI7TUFDckIsSUFBTVgsQ0FBQyxHQUFHVyxRQUFRLENBQUNKLElBQVQsRUFBVjtNQUNBLElBQU1KLENBQUMsR0FBR1EsUUFBUSxDQUFDSCxJQUFULEVBQVY7TUFDQSxJQUFNSSxLQUFLLEdBQUcsS0FBSy9CLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsQ0FBZCxDQUhxQixDQUtyQjs7TUFDQSxJQUFJUyxLQUFLLEtBQUssQ0FBVixJQUFlQSxLQUFLLEtBQUssQ0FBN0IsRUFBZ0MsT0FBTyxJQUFQO01BRWhDLE9BQU8sS0FBUDtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLG1CQUFVRCxRQUFWLEVBQW9CO01BQ2xCLElBQU1YLENBQUMsR0FBR1csUUFBUSxDQUFDSixJQUFULEVBQVY7TUFDQSxJQUFNSixDQUFDLEdBQUdRLFFBQVEsQ0FBQ0gsSUFBVCxFQUFWOztNQUVBLElBQUksS0FBSzNCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0M7UUFDaEMsS0FBS3RCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsSUFBeUIsQ0FBekI7UUFDQSxPQUFPLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLENBQVA7TUFDRDs7TUFFRCxJQUFJLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLE1BQTJCLENBQTNCLElBQWdDLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLE1BQTJCLENBQS9ELEVBQWtFO1FBQ2hFLE1BQU0sSUFBSU0sS0FBSixDQUFVLDRCQUFWLENBQU47TUFDRDs7TUFFRCxLQUFLNUIsV0FBTCxDQUFpQm1CLENBQWpCLEVBQW9CRyxDQUFwQixJQUF5QixDQUF6QixDQWJrQixDQWVsQjs7TUFDQSxLQUFLTCxLQUFMLENBQVdPLE9BQVgsQ0FBbUIsVUFBQ2IsSUFBRCxFQUFVO1FBQzNCLElBQUlBLElBQUksQ0FBQ3FCLGNBQUwsQ0FBb0JGLFFBQXBCLENBQUosRUFBbUNuQixJQUFJLENBQUNzQixLQUFMLENBQVdILFFBQVg7TUFDcEMsQ0FGRDtNQUlBLE9BQU8sS0FBSzlCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsQ0FBUDtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsMEJBQWlCO01BQ2YsSUFBTVksYUFBYSxHQUFHLEtBQUtqQixLQUFMLENBQVdrQixJQUFYLENBQWdCLFVBQUN4QixJQUFEO1FBQUEsT0FBVUEsSUFBSSxDQUFDeUIsT0FBTCxFQUFWO01BQUEsQ0FBaEIsQ0FBdEI7TUFDQSxJQUFNQyxLQUFLLEdBQUcsS0FBS3BCLEtBQUwsQ0FBV3FCLE9BQVgsQ0FBbUJKLGFBQW5CLENBQWQ7TUFFQSxJQUFJRyxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCLEtBQUtwQixLQUFMLENBQVdzQixNQUFYLENBQWtCRixLQUFsQixFQUF5QixDQUF6QjtNQUVoQixPQUFPSCxhQUFhLEtBQUtNLFNBQWxCLEdBQThCLEVBQTlCLEdBQW1DTixhQUFhLENBQUN0QixPQUFkLEVBQTFDO0lBQ0Q7SUFFRDtBQUNGO0FBQ0E7QUFDQTs7OztXQUNFLHNCQUFhO01BQ1gsSUFBSSxLQUFLSyxLQUFMLENBQVdILE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkIsT0FBTyxJQUFQO01BRTdCLE9BQU8sS0FBUDtJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzFJa0IyQjtFQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0Usb0JBQVl0QixDQUFaLEVBQWVHLENBQWYsRUFBa0I7SUFBQTs7SUFDaEIsS0FBS0gsQ0FBTCxHQUFTQSxDQUFUO0lBQ0EsS0FBS0csQ0FBTCxHQUFTQSxDQUFUO0VBQ0Q7RUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7V0FDRSxnQkFBTztNQUNMLE9BQU8sS0FBS0gsQ0FBWjtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7V0FDRSxnQkFBTztNQUNMLE9BQU8sS0FBS0csQ0FBWjtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLGdCQUFPRyxLQUFQLEVBQWM7TUFDWixJQUFJLEtBQUtOLENBQUwsS0FBV00sS0FBSyxDQUFDQyxJQUFOLEVBQVgsSUFBMkIsS0FBS0osQ0FBTCxLQUFXRyxLQUFLLENBQUNFLElBQU4sRUFBMUMsRUFBd0QsT0FBTyxJQUFQO01BRXhELE9BQU8sS0FBUDtJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3BDa0JlO0VBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRSxjQUFZN0IsTUFBWixFQUFvQjhCLElBQXBCLEVBQTBCO0lBQUE7O0lBQ3hCLEtBQUs5QixNQUFMLHNCQUFrQkEsTUFBbEI7SUFDQSxLQUFLOEIsSUFBTCxHQUFZQSxJQUFaO0VBQ0Q7RUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7V0FDRSxlQUFNQyxPQUFOLEVBQWU7TUFBQTs7TUFDYixLQUFLL0IsTUFBTCxDQUFZVyxPQUFaLENBQW9CLFVBQUNDLEtBQUQsRUFBUVksS0FBUixFQUFrQjtRQUNwQyxJQUFJWixLQUFLLENBQUNvQixNQUFOLENBQWFELE9BQWIsQ0FBSixFQUEyQjtVQUN6QixLQUFJLENBQUMvQixNQUFMLENBQVkwQixNQUFaLENBQW1CRixLQUFuQixFQUEwQixDQUExQjtRQUNEO01BQ0YsQ0FKRDtJQUtEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7V0FDRSxtQkFBVTtNQUNSLE9BQU8sS0FBS3hCLE1BQUwsQ0FBWUMsTUFBWixLQUF1QixDQUE5QjtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLHdCQUFlOEIsT0FBZixFQUF3QjtNQUN0QixPQUFPLEtBQUsvQixNQUFMLENBQVlpQyxJQUFaLENBQWlCLFVBQUNyQixLQUFELEVBQVc7UUFDakMsT0FBT0EsS0FBSyxDQUFDb0IsTUFBTixDQUFhRCxPQUFiLENBQVA7TUFDRCxDQUZNLENBQVA7SUFHRDtJQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7O1dBQ0UsbUJBQVU7TUFDUixPQUFPLEtBQUtELElBQVo7SUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRFksU0FBU0ksYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDO0VBQzlDLE9BQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBTixHQUFZLENBQTdCLENBQVgsSUFBOENBLEdBQXJEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7O0FDRkQsSUFBTUssTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ0MsUUFBRCxFQUFXQyxJQUFYLEVBQW9CO0VBQ2pDLElBQUksQ0FBQ0EsSUFBTCxFQUFXO0VBRVhBLElBQUksQ0FBQ0MsU0FBTCxHQUFpQkYsUUFBakI7QUFDRCxDQUpEOztBQU1BLGlFQUFlRCxNQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQzBHO0FBQ2pCO0FBQ087QUFDaEcsNENBQTRDLDJIQUEwQztBQUN0Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLHlDQUF5QyxzRkFBK0I7QUFDeEU7QUFDQSxpREFBaUQseUJBQXlCLDBCQUEwQixnQ0FBZ0MsK0JBQStCLDBCQUEwQixnQ0FBZ0MsMkJBQTJCLDJCQUEyQixLQUFLLHlIQUF5SCw2QkFBNkIsS0FBSywwQ0FBMEMsZ0JBQWdCLGlCQUFpQixvQkFBb0IsS0FBSyxpS0FBaUssdUJBQXVCLEtBQUssMkRBQTJELDhCQUE4QixLQUFLLHVCQUF1QixtQkFBbUIsS0FBSyw4Q0FBOEMsd0JBQXdCLG9DQUFvQyx1QkFBdUIsS0FBSyx1RkFBdUYscUNBQXFDLEtBQUssa0VBQWtFLHNCQUFzQixxQkFBcUIsS0FBSyxzSkFBc0oseUJBQXlCLDhCQUE4QixPQUFPLDRDQUE0Qyw4Q0FBOEMsZ0RBQWdELCtDQUErQyx5Q0FBeUMsT0FBTyxLQUFLLGNBQWMsZ0RBQWdELHNCQUFzQix1QkFBdUIsNkhBQTZILGtDQUFrQyxtQ0FBbUMsNkJBQTZCLGlDQUFpQyx3QkFBd0IsOEJBQThCLDBCQUEwQiw2QkFBNkIsS0FBSyxpREFBaUQsa0JBQWtCLHVDQUF1Qyw4Q0FBOEMsS0FBSyxvQkFBb0Isb0JBQW9CLHFDQUFxQywwQkFBMEIsS0FBSyxnQkFBZ0Isd0JBQXdCLHdCQUF3QixnQ0FBZ0MsOEJBQThCLEtBQUssbUJBQW1CLHlCQUF5QixrQ0FBa0MsS0FBSyxpQkFBaUIsOEJBQThCLHdCQUF3QixLQUFLLHFCQUFxQixxQkFBcUIsS0FBSyxxQ0FBcUMsd0JBQXdCLHNCQUFzQixrQ0FBa0MsMEJBQTBCLDZCQUE2QixxREFBcUQsMEJBQTBCLHdGQUF3RixPQUFPLGtCQUFrQixvQkFBb0IsS0FBSyxpQkFBaUIsdUNBQXVDLHlDQUF5Qyx3QkFBd0IsNkJBQTZCLGdCQUFnQixrQkFBa0IsS0FBSyxzQkFBc0IsbUNBQW1DLHNDQUFzQyxLQUFLLGtCQUFrQixvQ0FBb0MsdUNBQXVDLE1BQU0sMEJBQTBCLHVDQUF1QyxLQUFLLHdCQUF3Qiw2Q0FBNkMsS0FBSyx1QkFBdUIseUJBQXlCLDhCQUE4Qix3QkFBd0IsZ0NBQWdDLHlCQUF5QixzQkFBc0IsNkJBQTZCLDBCQUEwQixLQUFLLDBCQUEwQix1QkFBdUIsd0JBQXdCLGNBQWMsd0JBQXdCLHdJQUF3SSwwQ0FBMEMsdUNBQXVDLGVBQWUsS0FBSyxvQkFBb0IsdUJBQXVCLEtBQUsscUJBQXFCLDRCQUE0Qiw0QkFBNEIsc0JBQXNCLHlCQUF5QixrQ0FBa0Msd0JBQXdCLDZCQUE2QixLQUFLLHNCQUFzQiw2QkFBNkIsMEJBQTBCLGtDQUFrQyx3QkFBd0Isd0JBQXdCLEtBQUssMEJBQTBCLGNBQWMseUJBQXlCLEtBQUsseUJBQXlCLGNBQWMseUJBQXlCLHdCQUF3Qiw4QkFBOEIsMEJBQTBCLEtBQUssZ0JBQWdCLHVCQUF1Qix3QkFBd0IsNkNBQTZDLEtBQUssdUJBQXVCLG1CQUFtQixrQkFBa0Isd0JBQXdCLDhCQUE4QiwwQkFBMEIsS0FBSyx1QkFBdUIsbUJBQW1CLGtCQUFrQix3QkFBd0IsOEJBQThCLDBCQUEwQixLQUFLLHlDQUF5Qyw4Q0FBOEMsOEJBQThCLHdCQUF3QixLQUFLLHlDQUF5Qyw4Q0FBOEMsOEJBQThCLHdCQUF3QixLQUFLLCtDQUErQyx5QkFBeUIsS0FBSyw0Q0FBNEMsOENBQThDLEtBQUssbUJBQW1CLG9CQUFvQixnQkFBZ0IsS0FBSyx3QkFBd0IsZ0NBQWdDLGlDQUFpQyxnQ0FBZ0MsZ0NBQWdDLHdCQUF3Qix3QkFBd0IsMEJBQTBCLGtDQUFrQyxLQUFLLGdCQUFnQixvQkFBb0IscUNBQXFDLHVCQUF1Qiw4QkFBOEIsNEJBQTRCLHdCQUF3QixpQ0FBaUMsa0NBQWtDLEtBQUsscUJBQXFCLG1CQUFtQiw4Q0FBOEMsbUNBQW1DLHNDQUFzQyxrQkFBa0Isd0JBQXdCLDhCQUE4QiwwQkFBMEIsS0FBSyxvQkFBb0IsOENBQThDLG1CQUFtQixrQkFBa0Isd0JBQXdCLDhCQUE4QiwwQkFBMEIsS0FBSyxvQkFBb0IsOENBQThDLG1CQUFtQixrQ0FBa0MscUNBQXFDLGtCQUFrQix3QkFBd0IsOEJBQThCLDBCQUEwQixLQUFLLGNBQWMsa0JBQWtCLGlCQUFpQix1Q0FBdUMseUJBQXlCLEtBQUssMkJBQTJCLGtCQUFrQixpQkFBaUIsd0NBQXdDLHlCQUF5QixLQUFLLDhCQUE4QixrQkFBa0IsaUJBQWlCLHdDQUF3Qyx5QkFBeUIsS0FBSyw4QkFBOEIsa0JBQWtCLGlCQUFpQix3Q0FBd0MseUJBQXlCLEtBQUssK0NBQStDLG9CQUFvQiw4QkFBOEIsMEJBQTBCLDZCQUE2QixnQ0FBZ0MscUZBQXFGLHVEQUF1RCwwQkFBMEIsS0FBSyxtQ0FBbUMsOEJBQThCLDJDQUEyQyx3Q0FBd0MsT0FBTywyQ0FBMkMsOEJBQThCLEtBQUssaUVBQWlFLHNCQUFzQixLQUFLLG9FQUFvRSx3QkFBd0IsS0FBSyxxQ0FBcUMsaUJBQWlCLG1CQUFtQiwyQ0FBMkMsd0NBQXdDLE9BQU8sOENBQThDLDhDQUE4Qyw4QkFBOEIsS0FBSyxlQUFlLDZDQUE2QyxLQUFLLGVBQWUsbUJBQW1CLG1CQUFtQix3QkFBd0IsS0FBSyxxQkFBcUIsY0FBYyw4Q0FBOEMsd0JBQXdCLDhCQUE4QiwwQkFBMEIsS0FBSyxpQkFBaUIsa0JBQWtCLGlCQUFpQix3Q0FBd0MseUJBQXlCLEtBQUsscUJBQXFCLG1CQUFtQixtQkFBbUIsS0FBSyxvQkFBb0Isa0JBQWtCLG1CQUFtQixLQUFLLG9CQUFvQixrQkFBa0IsbUJBQW1CLEtBQUssa0JBQWtCLGtCQUFrQixtQkFBbUIsS0FBSyxvQkFBb0IsdUNBQXVDLEtBQUssOEJBQThCLDRDQUE0QyxtQkFBbUIsS0FBSyxtQkFBbUIsa0NBQWtDLHlCQUF5Qix5QkFBeUIsS0FBSyxxRUFBcUUsWUFBWSx1QkFBdUIsT0FBTywyQkFBMkIsNkJBQTZCLE9BQU8sa0JBQWtCLDJCQUEyQixPQUFPLHFCQUFxQiwwQkFBMEIsT0FBTyxpQkFBaUIsc0JBQXNCLDRCQUE0QixnQ0FBZ0MsK0JBQStCLHFCQUFxQix1REFBdUQsNEJBQTRCLE9BQU8sb0JBQW9CLHNCQUFzQiwrQkFBK0Isb0JBQW9CLE9BQU8sbUJBQW1CLHNCQUFzQixPQUFPLHFCQUFxQixnQkFBZ0IsT0FBTyxxQkFBcUIsZ0JBQWdCLE9BQU8sNEJBQTRCLHdCQUF3Qix5QkFBeUIsT0FBTywyQkFBMkIscUJBQXFCLE9BQU8sdUNBQXVDLG9CQUFvQixnQkFBZ0IsT0FBTyxtRUFBbUUsMkJBQTJCLE9BQU8sd0VBQXdFLDBCQUEwQixPQUFPLEtBQUssT0FBTyxnRkFBZ0YsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sYUFBYSxhQUFhLFFBQVEsWUFBWSxPQUFPLFlBQVksTUFBTSxVQUFVLFVBQVUsVUFBVSxNQUFNLFlBQVksT0FBTyxZQUFZLE9BQU8sWUFBWSxNQUFNLFlBQVksT0FBTyxNQUFNLFVBQVUsTUFBTSxZQUFZLE1BQU0sWUFBWSxhQUFhLGFBQWEsT0FBTyxZQUFZLE1BQU0sWUFBWSxPQUFPLFlBQVksT0FBTyxVQUFVLFVBQVUsT0FBTyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sT0FBTyxZQUFZLGFBQWEsYUFBYSxhQUFhLE1BQU0sTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsY0FBYyxXQUFXLFlBQVksYUFBYSxhQUFhLE9BQU8sWUFBWSxNQUFNLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxZQUFZLE1BQU0sWUFBWSxZQUFZLFlBQVksYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxZQUFZLGNBQWMsV0FBVyxZQUFZLFdBQVcsVUFBVSxNQUFNLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFlBQVksVUFBVSxPQUFPLE9BQU8sYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLGFBQWEsYUFBYSxXQUFXLFlBQVksY0FBYyxXQUFXLFlBQVksT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLGNBQWMsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxjQUFjLFlBQVksVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxjQUFjLFlBQVksVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsY0FBYyxNQUFNLFFBQVEsYUFBYSxhQUFhLE9BQU8sS0FBSyxhQUFhLE1BQU0sT0FBTyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtB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QUNpRCxTQUFaLENBQXNCOUYsTUFBdEI7UUFDQTZDLFdBQVcsQ0FBQ2tELGNBQVo7UUFDQU0sV0FBVyxHQUFHLEtBQWQ7TUFDRDtJQUNGO0VBQ0Y7O0VBRUQ3RCx1REFBTSxDQUFDeEQsc0VBQWMsQ0FBQzZELFdBQUQsRUFBYyxDQUFkLENBQWYsRUFBaUNDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixpQkFBdkIsQ0FBakMsQ0FBTjtFQUNBUCx1REFBTSxDQUFDNUMseUVBQWlCLENBQUNpRCxXQUFXLENBQUN6QyxLQUFiLENBQWxCLEVBQXVDMEMsUUFBUSxDQUFDQyxhQUFULENBQXVCLFVBQXZCLENBQXZDLENBQU47O0VBRUEsSUFBSUYsV0FBVyxDQUFDbUQsVUFBWixFQUFKLEVBQThCO0lBQzVCLE9BQU9DLFVBQVUsQ0FBQztNQUFBLE9BQU1DLEtBQUssNEJBQVg7SUFBQSxDQUFELEVBQTBDLEdBQTFDLENBQWpCO0VBQ0QsQ0E3QjJCLENBK0I1Qjs7O0VBQ0FULGdCQUFnQjtBQUNqQjs7QUFFREEsZ0JBQWdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvYm9hcmRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0JvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0Nvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpYi9yYW5kb21OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saWIvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJvYXJkQ29tcG9uZW50KHRoZUJvYXJkLCBwbGF5ZXIpIHtcclxuICByZXR1cm4gdGhlQm9hcmQuZmllbGRTdGF0dXMubWFwKChyb3csIGNvb3JkWCkgPT5cclxuICAgICAgcm93Lm1hcCgoY29sLCBjb29yZFkpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHN0YXR1cyA9IHRoZUJvYXJkLmdldEZpZWxkU3RhdHVzKGNvb3JkWCwgY29vcmRZKTtcclxuXHJcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvYXJkLWNlbGwtJHtwbGF5ZXJ9XCIgZGF0YS1jb29yZHg9XCIke2Nvb3JkWH1cIiBkYXRhLWNvb3JkeT1cIiR7Y29vcmRZfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpdC1taXNzZWQtcGxheWVyLTFcIj48L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvYXJkLWNlbGwtJHtwbGF5ZXJ9XCIgZGF0YS1jb29yZHg9XCIke2Nvb3JkWH1cIiBkYXRhLWNvb3JkeT1cIiR7Y29vcmRZfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNoaXAtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwib2NjdXBpZWQtbm90LWhpdFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMykge1xyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1jZWxsLSR7cGxheWVyfVwiIGRhdGEtY29vcmR4PVwiJHtjb29yZFh9XCIgZGF0YS1jb29yZHk9XCIke2Nvb3JkWX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaGlwLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhpdFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiYm9hcmQtY2VsbC0ke3BsYXllcn1cIiBkYXRhLWNvb3JkeD1cIiR7Y29vcmRYfVwiIGRhdGEtY29vcmR5PVwiJHtjb29yZFl9XCI+PC9kaXY+YDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5qb2luKFwiXCIpXHJcbiAgICApXHJcbiAgICAuam9pbihcIlwiKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzaGlweWFyZENvbXBvbmVudCh0aGVGbGVldCkge1xyXG4gIHJldHVybiB0aGVGbGVldC5tYXAoKHNoaXApID0+IHtcclxuICAgIHJldHVybiBgPHA+JHtzaGlwLmdldE5hbWUoKX0gKCR7c2hpcC5jb29yZHMubGVuZ3RofSk8L3A+YDtcclxuICB9KS5qb2luKFwiXCIpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcihzaXplKSB7XHJcbiAgICAvLyBTaXplIG9mIGJvYXJkIGdyaWRcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBbiBhcnJheSBmb3Igc3RvcmluZyB0aGUgc2hpcHNcclxuICAgICAqIEtlZXAgdHJhY2sgaXRzIG5hbWVzIGFuZCBzdGF0dXMgKGhpdCBvciBzdW5rKVxyXG4gICAgICovXHJcbiAgICB0aGlzLmZsZWV0ID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaWVsZCBzdGF0dXMgYXJyYXlcclxuICAgICAqIDA6IGVtcHR5LCBub3QgaGl0XHJcbiAgICAgKiAxOiBlbXB0eSwgYnV0IGhpdFxyXG4gICAgICogMjogbm90IGVtcHR5LCBub3QgaGl0XHJcbiAgICAgKiAzOiBub3QgZW1wdHksIGJ1dCBoaXRcclxuICAgICAqL1xyXG4gICAgdGhpcy5maWVsZFN0YXR1cyA9IFsuLi5BcnJheShzaXplKV0ubWFwKCh4LCBqKSA9PiBBcnJheShzaXplKS5maWxsKDApKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCBmaWVsZCBzdGF0dXNcclxuICAgKiBAcGFyYW0ge051bWJlcn0geCBjb29yZGluYXRlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkgY29vcmRpbmF0ZVxyXG4gICAqIEByZXR1cm5zIHRoZSBzdGF0dXMgb2YgeCwgeSBmaWVsZFxyXG4gICAqL1xyXG4gIGdldEZpZWxkU3RhdHVzKHgsIHkpIHtcclxuICAgIHJldHVybiB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgaXQncyBPSyB0byBwbGFjZSBzaGlwXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZVNoaXAgb2JqZWN0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBzaGlwIGNhbiBiZSBwbGFjZWQsIGZhbHNlIGlmIG5vdFxyXG4gICAqL1xyXG4gIGNhblBsYWNlU2hpcCh0aGVTaGlwKSB7XHJcbiAgICBbLi4udGhlU2hpcC5jb29yZHNdLmZvckVhY2goKGNvb3JkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHggPSBjb29yZC5nZXRYKCk7XHJcbiAgICAgIGNvbnN0IHkgPSBjb29yZC5nZXRZKCk7XHJcblxyXG4gICAgICBpZiAoeCA+PSB0aGlzLnNpemUgfHwgeSA+PSB0aGlzLnNpemUpIHRocm93IG5ldyBFcnJvcihgT3V0IG9mIGNvdmVyZWQgYXJlYWApO1xyXG5cclxuICAgICAgLy8gSWYgc2hpcCBpcyBhbHJlYWR5IGluIHRoaXMgZmllbGRcclxuICAgICAgaWYgKHRoaXMuZmllbGRTdGF0dXNbeF1beV0gIT09IDApIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGxhY2VzIGEgc2hpcCBvbiB0aGUgYm9hcmRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlU2hpcCBvYmplY3RcclxuICAgKi9cclxuICBwbGFjZVNoaXAodGhlU2hpcCkge1xyXG4gICAgWy4uLnRoZVNoaXAuY29vcmRzXS5mb3JFYWNoKChjb29yZCkgPT4ge1xyXG4gICAgICBjb25zdCB4ID0gY29vcmQuZ2V0WCgpO1xyXG4gICAgICBjb25zdCB5ID0gY29vcmQuZ2V0WSgpO1xyXG5cclxuICAgICAgLy8gSWYgc2hpcCBpcyBhbHJlYWR5IGluIHRoaXMgZmllbGRcclxuICAgICAgaWYgKHRoaXMuZmllbGRTdGF0dXNbeF1beV0gIT09IDApIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaWVsZCBpcyBhbHJlYWR5IG9jY3VwaWVkXCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBTZXQgZmllbGRzIHRvIG5vdCBlbXB0eSwgbm90IGhpdFxyXG4gICAgICB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID0gMjtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuZmxlZXQucHVzaCh0aGVTaGlwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGl0J3MgT0sgdG8gcGxhY2Ugc2hvdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0aGVDb29yZCB0byBoaXRcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIE9LIHRvIHBsYWNlIHNob3QsIGZhbHNlIGlmIG5vdFxyXG4gICAqL1xyXG4gIGNhblBsYWNlU2hvdCh0aGVDb29yZCkge1xyXG4gICAgY29uc3QgeCA9IHRoZUNvb3JkLmdldFgoKTtcclxuICAgIGNvbnN0IHkgPSB0aGVDb29yZC5nZXRZKCk7XHJcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRTdGF0dXNbeF1beV07XHJcblxyXG4gICAgLy8gSWYgZmllbGQgdmFsdWUgaXMgMCBvciAyLCBpdCdzIE9LIHRvIHNob290XHJcbiAgICBpZiAoZmllbGQgPT09IDAgfHwgZmllbGQgPT09IDIpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlcyBzaG90IG9uIHRoZSBib2FyZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0aGVDb29yZCB0byBoaXRcclxuICAgKiBAcmV0dXJucyB0aGUgcmVzdWx0ICgxIG9yIDMgLSB0aGUgdHdvIHBvc3NpYmxlIG91dGNvbWVzKVxyXG4gICAqL1xyXG4gIHBsYWNlU2hvdCh0aGVDb29yZCkge1xyXG4gICAgY29uc3QgeCA9IHRoZUNvb3JkLmdldFgoKTtcclxuICAgIGNvbnN0IHkgPSB0aGVDb29yZC5nZXRZKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPT09IDApIHtcclxuICAgICAgdGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9IDE7XHJcbiAgICAgIHJldHVybiB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAxIHx8IHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPT09IDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmllbGQgaGFzIGFscmVhZHkgYmVlbiBoaXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9IDM7XHJcblxyXG4gICAgLy8gV2UgaGF2ZSBhIHN1Y2Nlc3NmdWwgc2hvdCwgYW5kIHRoZSBzaGlwIG11c3QgcmVtZW1iZXIgdGhhdCBpdCBoYXMgYmVlbiBoaXRcclxuICAgIHRoaXMuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBpZiAoc2hpcC5oYXNDb29yZGluYXRlcyh0aGVDb29yZCkpIHNoaXAuaXNIaXQodGhlQ29vcmQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRTdGF0dXNbeF1beV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBuYW1lIG9mIGEgc2hpcCBpZiBpdCB3YXMgZGVzdHJveWVkIGFuZCByZW1vdmUgaXQgZnJvbSBmbGVldFxyXG4gICAqIFRoaXMgbWV0aG9kIG11c3QgYmUgY2FsbGVkIGFmdGVyIGV2ZXJ5IHNob3RcclxuICAgKiBAcmV0dXJucyB0aGUgbmFtZSBvZiB0aGUgc2hpcCB0aGF0IGhhcyBiZWVuIGRlc3Ryb3llZCAoaWYgaGFzU3VuayByZXR1cm4gdHJ1ZSksXHJcbiAgICogT3IgYW4gZW1wdHkgc3RyaW5nIGlzIHNoaXAgd2FzIG5vdCBkZXN0cm95ZWRcclxuICAgKi9cclxuICBnZXRGbGVldFN0YXR1cygpIHtcclxuICAgIGNvbnN0IGRlc3Ryb3llZFNoaXAgPSB0aGlzLmZsZWV0LmZpbmQoKHNoaXApID0+IHNoaXAuaGFzU3VuaygpKTtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5mbGVldC5pbmRleE9mKGRlc3Ryb3llZFNoaXApO1xyXG5cclxuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmZsZWV0LnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgcmV0dXJuIGRlc3Ryb3llZFNoaXAgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBkZXN0cm95ZWRTaGlwLmdldE5hbWUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdhbWUgaXMgb3ZlciBpZiBmbGVldCBhcnJheSBpcyBlbXB0eVxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgZ2FtZSBpcyBvdmVyLCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBpc0dhbWVPdmVyKCkge1xyXG4gICAgaWYgKHRoaXMuZmxlZXQubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIENvb3JkaW5hdGUge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBjb29yZGluYXRlIHNldFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHlcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB2YWx1ZSBvZiB4IGNvb3JkaW5hdGVcclxuICAgKiBAcmV0dXJucyB0aGUgeCB2YWx1ZSBvZiB0aGlzIGNvb3JkaW5hdGVcclxuICAgKi9cclxuICBnZXRYKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB2YWx1ZSBvZiB5IGNvb3JkaW5hdGVcclxuICAgKiBAcmV0dXJucyB0aGUgeSB2YWx1ZSBvZiB0aGlzIGNvb3JkaW5hdGVcclxuICAgKi9cclxuICBnZXRZKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3QgdGhpcyBjb29yZGluYXRlIGZvciBlcXVhbGl0eSB3aXRoIHRoZSBTaGlwJ3MgY29vcmRpbmF0ZVxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb29yZCB0byB0ZXN0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBvciBmYWxzZVxyXG4gICAqL1xyXG4gIGVxdWFscyhjb29yZCkge1xyXG4gICAgaWYgKHRoaXMueCA9PT0gY29vcmQuZ2V0WCgpICYmIHRoaXMueSA9PT0gY29vcmQuZ2V0WSgpKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoaXAge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdCBhIHNoaXAgb2YgZ2l2ZW4gY29vcmRzIGFuZCBuYW1lXHJcbiAgICogQHBhcmFtIHtBcnJheX0gY29vcmRzXHJcbiAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihjb29yZHMsIG5hbWUpIHtcclxuICAgIHRoaXMuY29vcmRzID0gWy4uLmNvb3Jkc107XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVnaXN0ZXJzIHRoYXQgdGhlIHNoaXAgaGFzIGJlZW4gaGl0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0Q29vcmRcclxuICAgKi9cclxuICBpc0hpdChhdENvb3JkKSB7XHJcbiAgICB0aGlzLmNvb3Jkcy5mb3JFYWNoKChjb29yZCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGNvb3JkLmVxdWFscyhhdENvb3JkKSkge1xyXG4gICAgICAgIHRoaXMuY29vcmRzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIHRoZXJlIGFyZSBhbnkgcGFydHMgbGVmdCBvZiB0aGlzIHNoaXBcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBubyBtb3JlIGNvb3JkaW5hdGVzIC0gaGVuY2UgdGhlIHNoaXAgaXMgZGVzdHJveWVkXHJcbiAgICovXHJcbiAgaGFzU3VuaygpIHtcclxuICAgIHJldHVybiB0aGlzLmNvb3Jkcy5sZW5ndGggPT09IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZXN0cyB3aGV0aGVyIHRoaXMgc2hpcCBpcyBwbGFjZWQgb24gdGhlc2UgY29vcmRpbmF0ZXNcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXRDb29yZCB0byB0ZXN0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBzaGlwIGlzIG9uIHRoZXNlIGNvb3JkaW5hdGVzLCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBoYXNDb29yZGluYXRlcyhhdENvb3JkKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb29yZHMuc29tZSgoY29vcmQpID0+IHtcclxuICAgICAgcmV0dXJuIGNvb3JkLmVxdWFscyhhdENvb3JkKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBuYW1lIG9mIHRoZSBzaGlwXHJcbiAgICogQHJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBuYW1lIHZhcmlhYmxlXHJcbiAgICovXHJcbiAgZ2V0TmFtZSgpIHtcclxuICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJhbmRvbUludGVnZXIobWluLCBtYXgpIHtcclxuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxufVxyXG4iLCJjb25zdCByZW5kZXIgPSAodGVtcGxhdGUsIG5vZGUpID0+IHtcclxuICBpZiAoIW5vZGUpIHJldHVybjtcclxuXHJcbiAgbm9kZS5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlbmRlcjtcclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4vaW1hZ2VzL2JhY2tncm91bmQuanBnXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcclxcbiAgLS1jbHItcmVkOiAjZmYwMDU1O1xcclxcbiAgLS1jbHItYmx1ZTogIzYxYzZmZjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWJsdWU6ICNkZmY0ZmY7XFxyXFxuICAtLWNsci1kYXJrLWdyYXk6ICM3MTdjOTY7XFxyXFxuICAtLWNsci1ncmF5OiAjOTA5MjkyO1xcclxcbiAgLS1jbHItbGlnaHQtZ3JheTogI2ViZWJlYjtcXHJcXG4gIC0tY2xyLXdoaXRlOiAjZmZmZmZmO1xcclxcbiAgLS1jbHItYmxhY2s6ICMyMTIxMjE7XFxyXFxufVxcclxcblxcclxcbi8qIGh0dHBzOi8vcGljY2FsaWwubGkvYmxvZy9hLW1vZGVybi1jc3MtcmVzZXQgKi9cXHJcXG5cXHJcXG4vKiBCb3ggc2l6aW5nIHJ1bGVzICovXFxyXFxuKixcXHJcXG4qOjpiZWZvcmUsXFxyXFxuKjo6YWZ0ZXIge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2luICovXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgZm9udDogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGxpc3Qgc3R5bGVzIG9uIHVsLCBvbCBlbGVtZW50cyB3aXRoIGEgbGlzdCByb2xlLCB3aGljaCBzdWdnZXN0cyBkZWZhdWx0IHN0eWxpbmcgd2lsbCBiZSByZW1vdmVkICovXFxyXFxudWxbcm9sZT1cXFwibGlzdFxcXCJdLFxcclxcbm9sW3JvbGU9XFxcImxpc3RcXFwiXSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSByb290IGRlZmF1bHRzICovXFxyXFxuaHRtbDpmb2N1cy13aXRoaW4ge1xcclxcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIFNldCBjb3JlIGJvZHkgZGVmYXVsdHMgKi9cXHJcXG5ib2R5IHtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBBIGVsZW1lbnRzIHRoYXQgZG9uJ3QgaGF2ZSBhIGNsYXNzIGdldCBkZWZhdWx0IHN0eWxlcyAqL1xcclxcbmE6bm90KFtjbGFzc10pIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbi1za2lwLWluazogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyogTWFrZSBpbWFnZXMgZWFzaWVyIHRvIHdvcmsgd2l0aCAqL1xcclxcbmltZyxcXHJcXG5waWN0dXJlIHtcXHJcXG4gIG1heC13aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZW1vdmUgYWxsIGFuaW1hdGlvbnMsIHRyYW5zaXRpb25zIGFuZCBzbW9vdGggc2Nyb2xsIGZvciBwZW9wbGUgdGhhdCBwcmVmZXIgbm90IHRvIHNlZSB0aGVtICovXFxyXFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcXHJcXG4gIGh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgKixcXHJcXG4gICo6OmJlZm9yZSxcXHJcXG4gICo6OmFmdGVyIHtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMSAhaW1wb3J0YW50O1xcclxcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvICFpbXBvcnRhbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxuICBtaW4td2lkdGg6IDEwMCU7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcclxcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCByZ2JhKDAsIDAsIDAsIDAuNiksIHJnYmEoMCwgMCwgMCwgMC42KSApLCB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXB4KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBIZWFkZXIgU3R5bGluZyAqL1xcclxcbi5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbSAzcmVtIDAuNXJlbSAzcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWJsYWNrKTtcXHJcXG59XFxyXFxuXFxyXFxuLnN1YnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGhvciB7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWJsYWNrKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yID4gYSB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR2FtZSBTdHlsaW5nICovXFxyXFxuLmdhbWUge1xcclxcbiAgLyogZGlzcGxheTogZmxleDsgKi9cXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuXFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcclxcbiAgYm9yZGVyOiAyMHB4IHNvbGlkIHJnYmEoMTA4LCAxMjIsIDEzNywgLjUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gIC8qIGJvcmRlci1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB2YXIoLS1jbHItZGFyay1ncmF5KSwgdmFyKC0tY2xyLWdyYXkpKSAxOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVycyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyIHtcXHJcXG4gIHBhZGRpbmc6IDEuNXJlbSAzcmVtIDEuNXJlbSAzcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIC5wbGF5ZXJfMSB7XFxyXFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8ye1xcclxcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcXHJcXG59ICovXFxyXFxuXFxyXFxuLnBsYXllcl8xID4gaDIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXJlZCk7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMiA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyLXRpdGxlIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItd2hpdGUpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jb250YWluZXIge1xcclxcbiAgbWluLXdpZHRoOiAzMDBweDtcXHJcXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcclxcbiAgICBcXFwiYmxhbmsgbGFiZWxzLWNoYXIgbGFiZWxzLWNoYXJcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCI7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ibGFuay1kaXYge1xcclxcbiAgZ3JpZC1hcmVhOiBibGFuaztcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1udW0ge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtbnVtO1xcclxcblxcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1jaGFyIHtcXHJcXG4gIGdyaWQtYXJlYTogbGFiZWxzLWNoYXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciA+IHAge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1udW0gPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQge1xcclxcbiAgZ3JpZC1hcmVhOiBib2FyZDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jZWxsLTIge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTEgPiAuYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ibHVlKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiA+IC5ib2FyZC1jZWxsLTIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0yID4gLmJvYXJkLWNlbGwtMjpob3ZlciB7XFxyXFxuICBmaWx0ZXI6IGJsdXIoMXJlbSk7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiAgLm9jY3VwaWVkLW5vdC1oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHlhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkID4gaDMge1xcclxcbiAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXHJcXG4gIHRleHQtb3JpZW50YXRpb246IHNpZGV3YXlzO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuN3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWZyb250IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1MCU7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWJhY2sge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNTAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXJlZCk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTEge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWJsdWUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0LW1pc3NlZC1wbGF5ZXItMiB7XFxyXFxuICBoZWlnaHQ6IDUwJTtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi8qIE1lbnUgU3R5bGluZyAqL1xcclxcbi5tZW51LWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHJcXG4gIC8qIGJvcmRlcjogMjBweCBzb2xpZDtcXHJcXG4gIGJvcmRlci1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB2YXIoLS1jbHItZGFyay1ncmF5KSwgdmFyKC0tY2xyLWdyYXkpKSAxOyAqL1xcclxcblxcclxcbiAgYm9yZGVyOiAyMHB4IHNvbGlkIHJnYmEoMTA4LCAxMjIsIDEzNywgLjUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnBsYXllciB7XFxyXFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXHJcXG5cXHJcXG4gIC8qIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7ICovXFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnByaW1hcnktaGVhZGVyID4gLmNvbnRhaW5lciA+IC50aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAuc3VidGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAwLjZyZW07XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wbGF5ZXJfMSB7XFxyXFxuICBmbGV4OiBub25lO1xcclxcbiAgd2lkdGg6IDQwMHB4O1xcclxcblxcclxcbiAgLyogYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xLW1lbnUgPiAuYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ibHVlKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgd2lkdGg6IDE0MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAgPiBkaXYge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jaXJjbGUge1xcclxcbiAgaGVpZ2h0OiA0MCU7XFxyXFxuICB3aWR0aDogNDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4uYmF0dGxlc2hpcCB7XFxyXFxuICB3aWR0aDogMTEwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5kZXN0cm95ZXIge1xcclxcbiAgd2lkdGg6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5zdWJtYXJpbmUge1xcclxcbiAgd2lkdGg6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jcnVpc2VyIHtcXHJcXG4gIHdpZHRoOiA1MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZHJhZy1vdmVyIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZHJhZ2dhYmxlLWluZGljYXRvciB7XFxyXFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWNsci1yZWQpO1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdG5vdGUge1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNb2JpbGUgTGF5b3V0ICovXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnRpdGxlIHtcXHJcXG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnN1YnRpdGxlIHtcXHJcXG4gICAgZm9udC1zaXplOiAwLjVyZW07XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuZ2FtZSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuXFxyXFxuICAgIGJvcmRlcjogMjBweCBzb2xpZCByZ2JhKDEwOCwgMTIyLCAxMzcsIC41KTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wbGF5ZXJzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVyIHtcXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wbGF5ZXJfMSB7XFxyXFxuICAgIGZsZXg6IDE7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVyXzIge1xcclxcbiAgICBmbGV4OiAyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIG1pbi13aWR0aDogYXV0bztcXHJcXG4gICAgbWluLWhlaWdodDogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZW51LWNvbnRhaW5lciB7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZW51LWNvbnRhaW5lciA+IC5wbGF5ZXJfMSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBmbGV4OiAxO1xcclxcbiAgfVxcclxcblxcclxcbiAgLm1lbnUtY29udGFpbmVyID4gLnByaW1hcnktaGVhZGVyID4gLmNvbnRhaW5lciA+IC50aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgLm1lbnUtY29udGFpbmVyID4gLnByaW1hcnktaGVhZGVyID4gLmNvbnRhaW5lciA+IC5zdWJ0aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC41cmVtO1xcclxcbiAgfVxcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsb0JBQW9CO0VBQ3BCLG9CQUFvQjtBQUN0Qjs7QUFFQSxnREFBZ0Q7O0FBRWhELHFCQUFxQjtBQUNyQjs7O0VBR0Usc0JBQXNCO0FBQ3hCOztBQUVBLDBCQUEwQjtBQUMxQjtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBLDJHQUEyRztBQUMzRzs7RUFFRSxnQkFBZ0I7QUFDbEI7O0FBRUEsMkJBQTJCO0FBQzNCO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLFlBQVk7QUFDZDs7QUFFQSwyQkFBMkI7QUFDM0I7RUFDRSxpQkFBaUI7RUFDakIsNkJBQTZCO0VBQzdCLGdCQUFnQjtBQUNsQjs7QUFFQSwwREFBMEQ7QUFDMUQ7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUEsb0NBQW9DO0FBQ3BDOztFQUVFLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBLGdHQUFnRztBQUNoRztFQUNFO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBOzs7SUFHRSxxQ0FBcUM7SUFDckMsdUNBQXVDO0lBQ3ZDLHNDQUFzQztJQUN0QyxnQ0FBZ0M7RUFDbEM7QUFDRjs7QUFFQTtFQUNFLHlDQUF5QztFQUN6QyxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLDhHQUFxRztFQUNyRywyQkFBMkI7RUFDM0IsNEJBQTRCO0VBQzVCLHNCQUFzQjtFQUN0QiwwQkFBMEI7O0VBRTFCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VB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a0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLHFDQUFxQztFQUNyQyxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0Isa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjs7QUFFQSxrQkFBa0I7QUFDbEI7RUFDRTtJQUNFLGNBQWM7RUFDaEI7O0VBRUE7SUFDRSxvQkFBb0I7RUFDdEI7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7O0VBRUE7SUFDRSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsWUFBWTs7SUFFWiwwQ0FBMEM7SUFDMUMsbUJBQW1CO0VBQ3JCOztFQUVBO0lBQ0UsYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxhQUFhO0VBQ2Y7O0VBRUE7SUFDRSxPQUFPO0VBQ1Q7O0VBRUE7SUFDRSxPQUFPO0VBQ1Q7O0VBRUE7SUFDRSxlQUFlO0lBQ2YsZ0JBQWdCO0VBQ2xCOztFQUVBO0lBQ0UsWUFBWTtFQUNkOztFQUVBO0lBQ0UsV0FBVztJQUNYLE9BQU87RUFDVDs7RUFFQTtJQUNFLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLGlCQUFpQjtFQUNuQjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gIC0tY2xyLXJlZDogI2ZmMDA1NTtcXHJcXG4gIC0tY2xyLWJsdWU6ICM2MWM2ZmY7XFxyXFxuICAtLWNsci1saWdodC1ibHVlOiAjZGZmNGZmO1xcclxcbiAgLS1jbHItZGFyay1ncmF5OiAjNzE3Yzk2O1xcclxcbiAgLS1jbHItZ3JheTogIzkwOTI5MjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWdyYXk6ICNlYmViZWI7XFxyXFxuICAtLWNsci13aGl0ZTogI2ZmZmZmZjtcXHJcXG4gIC0tY2xyLWJsYWNrOiAjMjEyMTIxO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBodHRwczovL3BpY2NhbGlsLmxpL2Jsb2cvYS1tb2Rlcm4tY3NzLXJlc2V0ICovXFxyXFxuXFxyXFxuLyogQm94IHNpemluZyBydWxlcyAqL1xcclxcbiosXFxyXFxuKjo6YmVmb3JlLFxcclxcbio6OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBkZWZhdWx0IG1hcmdpbiAqL1xcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGZvbnQ6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBsaXN0IHN0eWxlcyBvbiB1bCwgb2wgZWxlbWVudHMgd2l0aCBhIGxpc3Qgcm9sZSwgd2hpY2ggc3VnZ2VzdHMgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZCAqL1xcclxcbnVsW3JvbGU9XFxcImxpc3RcXFwiXSxcXHJcXG5vbFtyb2xlPVxcXCJsaXN0XFxcIl0ge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2V0IGNvcmUgcm9vdCBkZWZhdWx0cyAqL1xcclxcbmh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLFxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSBib2R5IGRlZmF1bHRzICovXFxyXFxuYm9keSB7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZVNwZWVkO1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQSBlbGVtZW50cyB0aGF0IGRvbid0IGhhdmUgYSBjbGFzcyBnZXQgZGVmYXVsdCBzdHlsZXMgKi9cXHJcXG5hOm5vdChbY2xhc3NdKSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb24tc2tpcC1pbms6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIE1ha2UgaW1hZ2VzIGVhc2llciB0byB3b3JrIHdpdGggKi9cXHJcXG5pbWcsXFxyXFxucGljdHVyZSB7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGFsbCBhbmltYXRpb25zLCB0cmFuc2l0aW9ucyBhbmQgc21vb3RoIHNjcm9sbCBmb3IgcGVvcGxlIHRoYXQgcHJlZmVyIG5vdCB0byBzZWUgdGhlbSAqL1xcclxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XFxyXFxuICBodG1sOmZvY3VzLXdpdGhpbiB7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICosXFxyXFxuICAqOjpiZWZvcmUsXFxyXFxuICAqOjphZnRlciB7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDEgIWltcG9ydGFudDtcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0byAhaW1wb3J0YW50O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgbWluLXdpZHRoOiAxMDAlO1xcclxcbiAgbWluLWhlaWdodDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCggcmdiYSgwLCAwLCAwLCAwLjYpLCByZ2JhKDAsIDAsIDAsIDAuNikgKSwgdXJsKFxcXCIuL2ltYWdlcy9iYWNrZ3JvdW5kLmpwZ1xcXCIpO1xcclxcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXHJcXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XFxyXFxuICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoNXB4KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBIZWFkZXIgU3R5bGluZyAqL1xcclxcbi5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbSAzcmVtIDAuNXJlbSAzcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWJsYWNrKTtcXHJcXG59XFxyXFxuXFxyXFxuLnN1YnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGhvciB7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWJsYWNrKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yID4gYSB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR2FtZSBTdHlsaW5nICovXFxyXFxuLmdhbWUge1xcclxcbiAgLyogZGlzcGxheTogZmxleDsgKi9cXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuXFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcblxcclxcbiAgYm9yZGVyOiAyMHB4IHNvbGlkIHJnYmEoMTA4LCAxMjIsIDEzNywgLjUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gIC8qIGJvcmRlci1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB2YXIoLS1jbHItZGFyay1ncmF5KSwgdmFyKC0tY2xyLWdyYXkpKSAxOyAqL1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVycyB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyIHtcXHJcXG4gIHBhZGRpbmc6IDEuNXJlbSAzcmVtIDEuNXJlbSAzcmVtO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIC5wbGF5ZXJfMSB7XFxyXFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8ye1xcclxcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDtcXHJcXG59ICovXFxyXFxuXFxyXFxuLnBsYXllcl8xID4gaDIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXJlZCk7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMiA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyLXRpdGxlIHtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItd2hpdGUpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMC4yNXJlbTtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAycHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jb250YWluZXIge1xcclxcbiAgbWluLXdpZHRoOiAzMDBweDtcXHJcXG4gIG1pbi1oZWlnaHQ6IDMwMHB4O1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcclxcbiAgICBcXFwiYmxhbmsgbGFiZWxzLWNoYXIgbGFiZWxzLWNoYXJcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCI7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgMWZyO1xcclxcbiAgZ2FwOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ibGFuay1kaXYge1xcclxcbiAgZ3JpZC1hcmVhOiBibGFuaztcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1udW0ge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtbnVtO1xcclxcblxcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1jaGFyIHtcXHJcXG4gIGdyaWQtYXJlYTogbGFiZWxzLWNoYXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciA+IHAge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1udW0gPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQge1xcclxcbiAgZ3JpZC1hcmVhOiBib2FyZDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jZWxsLTIge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTEgPiAuYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ibHVlKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiA+IC5ib2FyZC1jZWxsLTIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0yID4gLmJvYXJkLWNlbGwtMjpob3ZlciB7XFxyXFxuICBmaWx0ZXI6IGJsdXIoMXJlbSk7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiAgLm9jY3VwaWVkLW5vdC1oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHlhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkID4gaDMge1xcclxcbiAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXHJcXG4gIHRleHQtb3JpZW50YXRpb246IHNpZGV3YXlzO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuN3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWZyb250IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1MCU7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWJhY2sge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNTAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXJlZCk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTEge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWJsdWUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0LW1pc3NlZC1wbGF5ZXItMiB7XFxyXFxuICBoZWlnaHQ6IDUwJTtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi8qIE1lbnUgU3R5bGluZyAqL1xcclxcbi5tZW51LWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHJcXG4gIC8qIGJvcmRlcjogMjBweCBzb2xpZDtcXHJcXG4gIGJvcmRlci1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB2YXIoLS1jbHItZGFyay1ncmF5KSwgdmFyKC0tY2xyLWdyYXkpKSAxOyAqL1xcclxcblxcclxcbiAgYm9yZGVyOiAyMHB4IHNvbGlkIHJnYmEoMTA4LCAxMjIsIDEzNywgLjUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnBsYXllciB7XFxyXFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXHJcXG5cXHJcXG4gIC8qIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7ICovXFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICBwYWRkaW5nOiAwLjc1cmVtIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnByaW1hcnktaGVhZGVyID4gLmNvbnRhaW5lciA+IC50aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAuc3VidGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAwLjZyZW07XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wbGF5ZXJfMSB7XFxyXFxuICBmbGV4OiBub25lO1xcclxcbiAgd2lkdGg6IDQwMHB4O1xcclxcblxcclxcbiAgLyogYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwcHg7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTBweDsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xLW1lbnUgPiAuYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ibHVlKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgd2lkdGg6IDE0MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAgPiBkaXYge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jaXJjbGUge1xcclxcbiAgaGVpZ2h0OiA0MCU7XFxyXFxuICB3aWR0aDogNDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4uYmF0dGxlc2hpcCB7XFxyXFxuICB3aWR0aDogMTEwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5kZXN0cm95ZXIge1xcclxcbiAgd2lkdGg6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5zdWJtYXJpbmUge1xcclxcbiAgd2lkdGg6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jcnVpc2VyIHtcXHJcXG4gIHdpZHRoOiA1MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZHJhZy1vdmVyIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZHJhZ2dhYmxlLWluZGljYXRvciB7XFxyXFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWNsci1yZWQpO1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdG5vdGUge1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNb2JpbGUgTGF5b3V0ICovXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcXHJcXG4gIGJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wcmltYXJ5LWhlYWRlciB7XFxyXFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnRpdGxlIHtcXHJcXG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnN1YnRpdGxlIHtcXHJcXG4gICAgZm9udC1zaXplOiAwLjVyZW07XFxyXFxuICB9XFxyXFxuXFxyXFxuICAuZ2FtZSB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxuXFxyXFxuICAgIGJvcmRlcjogMjBweCBzb2xpZCByZ2JhKDEwOCwgMTIyLCAxMzcsIC41KTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wbGF5ZXJzIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVyIHtcXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5wbGF5ZXJfMSB7XFxyXFxuICAgIGZsZXg6IDE7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVyXzIge1xcclxcbiAgICBmbGV4OiAyO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICAgIG1pbi13aWR0aDogYXV0bztcXHJcXG4gICAgbWluLWhlaWdodDogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZW51LWNvbnRhaW5lciB7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZW51LWNvbnRhaW5lciA+IC5wbGF5ZXJfMSB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBmbGV4OiAxO1xcclxcbiAgfVxcclxcblxcclxcbiAgLm1lbnUtY29udGFpbmVyID4gLnByaW1hcnktaGVhZGVyID4gLmNvbnRhaW5lciA+IC50aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgLm1lbnUtY29udGFpbmVyID4gLnByaW1hcnktaGVhZGVyID4gLmNvbnRhaW5lciA+IC5zdWJ0aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC41cmVtO1xcclxcbiAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcbmltcG9ydCBCb2FyZCBmcm9tIFwiLi9mYWN0b3JpZXMvQm9hcmRcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vZmFjdG9yaWVzL1NoaXBcIjtcclxuaW1wb3J0IENvb3JkaW5hdGUgZnJvbSBcIi4vZmFjdG9yaWVzL0Nvb3JkaW5hdGVcIjtcclxuaW1wb3J0IGJvYXJkQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudHMvYm9hcmRDb21wb25lbnRcIjtcclxuaW1wb3J0IHNoaXB5YXJkQ29tcG9uZW50IGZyb20gXCIuL2NvbXBvbmVudHMvc2hpcHlhcmRDb21wb25lbnRcIjtcclxuaW1wb3J0IHJlbmRlciBmcm9tIFwiLi9saWIvcmVuZGVyXCI7XHJcbmltcG9ydCByYW5kb21OdW1iZXIgZnJvbSBcIi4vbGliL3JhbmRvbU51bWJlclwiO1xyXG5cclxuLy8gSW5pdGlhbGl6YXRpb24gb2YgSHVtYW4gUGxheWVyIEJvYXJkIGFuZCBTaGlwc1xyXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBCb2FyZCgxMCk7XHJcblxyXG4vLyBSZW5kZXIgdG8gdGhlIERPTSB0aGUgaW5pdGlhbCBIdW1hbiBQbGF5ZXIgQm9hcmQgU3RhdGVcclxucmVuZGVyKGJvYXJkQ29tcG9uZW50KHBsYXllckJvYXJkLCAxKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMVwiKSk7XHJcbnJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTEtbWVudVwiKSk7XHJcblxyXG5jb25zdCBtZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LWNvbnRhaW5lclwiKTtcclxuY29uc3QgZ2FtZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZVwiKTtcclxuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hpcCcpO1xyXG5cclxuLy8gMCAtIGhvcml6b250YWxcclxuLy8gMSAtIHZlcnRpY2FsXHJcbmxldCBvcmllbnRhdGlvbiA9IDA7XHJcblxyXG5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KSk7XHJcblxyXG5mdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xyXG4gIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIGUudGFyZ2V0LmlkKTtcclxufVxyXG5cclxuY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNlbGwtMVwiKTtcclxuXHJcbmNlbGxzLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpXHJcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIGRyYWdMZWF2ZSk7XHJcbiAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gZHJhZ0VudGVyKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcclxuICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgZS50YXJnZXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgcmVkXCI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyYWdMZWF2ZShlKSB7XHJcbiAgZS50YXJnZXQuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgd2hpdGVcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvcChlKSB7XHJcbiAgY29uc3QgaWQgPSBlLmRhdGFUcmFuc2Zlci5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgY29uc3QgZHJhZ2dhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cclxuICBsZXQgc2hpcENvb3JkcyA9IFtdO1xyXG4gIGxldCBjb29yZFggPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvb3JkeCk7XHJcbiAgbGV0IGNvb3JkWSA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29vcmR5KTtcclxuICBsZXQgc2hpcExlbmd0aCA9IGRyYWdnYWJsZS5kYXRhc2V0LnNoaXBsZW5ndGg7XHJcblxyXG4gIGlmIChvcmllbnRhdGlvbiA9PT0gMCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgc2hpcENvb3Jkcy5wdXNoKG5ldyBDb29yZGluYXRlKGNvb3JkWCwgY29vcmRZICsgaSkpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICBzaGlwQ29vcmRzLnB1c2gobmV3IENvb3JkaW5hdGUoY29vcmRYICsgaSwgY29vcmRZKSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwQ29vcmRzLCBgJHtpZH1gKTtcclxuICBcclxuICBpZiAocGxheWVyQm9hcmQuY2FuUGxhY2VTaGlwKHNoaXApKSB7XHJcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcCk7XHJcbiAgICBkcmFnZ2FibGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAocGxheWVyQm9hcmQuZmxlZXQubGVuZ3RoID09PSA1KSB7XHJcbiAgICBtZW51Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIH1cclxuXHJcbiAgc2hpcENvb3JkcyA9IFtdO1xyXG4gIHJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTEtbWVudVwiKSk7XHJcbiAgcmVuZGVyKGJvYXJkQ29tcG9uZW50KHBsYXllckJvYXJkLCAxKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMVwiKSk7XHJcbiAgcmVuZGVyKHNoaXB5YXJkQ29tcG9uZW50KHBsYXllckJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0xXCIpKTtcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jZWxsLTFcIikuZm9yRWFjaChjZWxsID0+IHtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKVxyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBJbml0aWFsaXphdGlvbiBvZiBBSSBQbGF5ZXIgQm9hcmQgYW5kIFNoaXBzXHJcbmNvbnN0IEFJQm9hcmQgICAgID0gbmV3IEJvYXJkKDEwKTtcclxuY29uc3QgY3J1aXNlcjIgICAgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoMywgNiksIG5ldyBDb29yZGluYXRlKDMsIDcpXSwgXCJjcnVpc2VyXCIpO1xyXG5jb25zdCBzdWJtYXJpbmUyICA9IG5ldyBTaGlwKFtuZXcgQ29vcmRpbmF0ZSg2LCA5KSwgbmV3IENvb3JkaW5hdGUoNywgOSksIG5ldyBDb29yZGluYXRlKDgsIDkpXSwgXCJzdWJtYXJpbmVcIik7XHJcbmNvbnN0IGRlc3Ryb3llcjIgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDUsIDApLCBuZXcgQ29vcmRpbmF0ZSg1LCAxKSwgbmV3IENvb3JkaW5hdGUoNSwgMildLCBcImRlc3Ryb3llclwiKTtcclxuY29uc3QgYmF0dGxlc2hpcDIgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoMSwgMyksIG5ldyBDb29yZGluYXRlKDEsIDQpLCBuZXcgQ29vcmRpbmF0ZSgxLCA1KSwgbmV3IENvb3JkaW5hdGUoMSwgNildLCBcImJhdHRsZXNoaXBcIik7XHJcbmNvbnN0IGNhcnJpZXIyICAgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDgsIDEpLCBuZXcgQ29vcmRpbmF0ZSg4LCAyKSwgbmV3IENvb3JkaW5hdGUoOCwgMyksIG5ldyBDb29yZGluYXRlKDgsIDQpLCBuZXcgQ29vcmRpbmF0ZSg4LCA1KV0sIFwiY2FycmllclwiKTtcclxuXHJcbi8vIFBsYWNlIGluaXRpYWwgU2hpcHMgdG8gQUkgUGxheWVyIEJvYXJkXHJcbkFJQm9hcmQucGxhY2VTaGlwKGNydWlzZXIyKTtcclxuQUlCb2FyZC5wbGFjZVNoaXAoc3VibWFyaW5lMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGRlc3Ryb3llcjIpO1xyXG5BSUJvYXJkLnBsYWNlU2hpcChiYXR0bGVzaGlwMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGNhcnJpZXIyKTtcclxuXHJcbi8vIFJlbmRlciB0byB0aGUgRE9NIHRoZSBpbml0aWFsIEFJIFBsYXllciBCb2FyZCBTdGF0ZVxyXG5yZW5kZXIoYm9hcmRDb21wb25lbnQoQUlCb2FyZCwgMiksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTJcIikpO1xyXG5cclxuLy8gUmVuZGVyIHRvIHRoZSBET00gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgU2hpcHMgb2YgYm90aCBwbGF5ZXJzXHJcbnJlbmRlcihzaGlweWFyZENvbXBvbmVudChwbGF5ZXJCb2FyZC5mbGVldCksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcHMtMVwiKSk7XHJcbnJlbmRlcihzaGlweWFyZENvbXBvbmVudChBSUJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0yXCIpKTtcclxuXHJcbi8vIEh1bWFuIFBsYXllciBHYW1lIENvbnRyb2xsZXJcclxuZnVuY3Rpb24gaGFuZGxlUGxheWVyVHVybigpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNlbGwtMlwiKS5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgbGV0IGNvb3JkcyA9IEFycmF5LmZyb20oU3RyaW5nKGluZGV4KSwgTnVtYmVyKTtcclxuXHJcbiAgICAgIGlmIChjb29yZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY29vcmRzLnVuc2hpZnQoMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEFJQm9hcmQucGxhY2VTaG90KG5ldyBDb29yZGluYXRlKGNvb3Jkc1swXSwgY29vcmRzWzFdKSk7XHJcbiAgICAgIEFJQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuXHJcbiAgICAgIHJlbmRlcihib2FyZENvbXBvbmVudChBSUJvYXJkLCAyKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMlwiKSk7XHJcbiAgICAgIHJlbmRlcihzaGlweWFyZENvbXBvbmVudChBSUJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0yXCIpKTtcclxuXHJcbiAgICAgIGlmIChBSUJvYXJkLmlzR2FtZU92ZXIoKSkge1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KGBHYW1lIE92ZXIhIFlvdSB3b24hYCksIDEwMCk7XHJcbiAgICAgIH0gXHJcblxyXG4gICAgICAvLyBQYXNzIHRoZSBjdXJyZW50IHR1cm4gdG8gQUkgUGxheWVyIEdhbWUgQ29udHJvbGxlciBhZnRlciAxIHNlY29uZCBkZWxheVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBoYW5kbGVPcHBvbmVudFR1cm4oKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gQUkgUGxheWVyIEdhbWUgQ29udHJvbGxlclxyXG5mdW5jdGlvbiBoYW5kbGVPcHBvbmVudFR1cm4oKSB7XHJcbiAgbGV0IGNvb3JkcyA9IG5ldyBDb29yZGluYXRlKHJhbmRvbU51bWJlcigwLCA5KSwgcmFuZG9tTnVtYmVyKDAsIDkpKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdGhlIHNob3QgaXMgdmFsaWQsIHBsYWNlIHRoZSBzaG90LlxyXG4gICAqIEVsc2UsIGdlbmVyYXRlIGEgbmV3IGNvb3JkcyB3aGlsZSBzaG90IGlzIGludmFsaWQgYW5kIHRyeSBhZ2Fpbi5cclxuICAgKi9cclxuICBpZiAocGxheWVyQm9hcmQuY2FuUGxhY2VTaG90KGNvb3JkcykpIHtcclxuICAgIHBsYXllckJvYXJkLnBsYWNlU2hvdChjb29yZHMpO1xyXG4gICAgcGxheWVyQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGludmFsaWRTaG90ID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZSAoaW52YWxpZFNob3QpIHtcclxuICAgICAgY29vcmRzID0gbmV3IENvb3JkaW5hdGUocmFuZG9tTnVtYmVyKDAsIDkpLCByYW5kb21OdW1iZXIoMCwgOSkpO1xyXG5cclxuICAgICAgaWYgKHBsYXllckJvYXJkLmNhblBsYWNlU2hvdChjb29yZHMpKSB7XHJcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaG90KGNvb3Jkcyk7XHJcbiAgICAgICAgcGxheWVyQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuICAgICAgICBpbnZhbGlkU2hvdCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoYm9hcmRDb21wb25lbnQocGxheWVyQm9hcmQsIDEpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXBsYXllci0xXCIpKTtcclxuICByZW5kZXIoc2hpcHlhcmRDb21wb25lbnQocGxheWVyQm9hcmQuZmxlZXQpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBzLTFcIikpO1xyXG5cclxuICBpZiAocGxheWVyQm9hcmQuaXNHYW1lT3ZlcigpKSB7XHJcbiAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiBhbGVydChgR2FtZSBPdmVyISBPcHBvbmVudCB3b24hYCksIDEwMCk7XHJcbiAgfVxyXG5cclxuICAvLyBQYXNzIHRoZSBjdXJyZW50IHR1cm4gdG8gSHVtYW4gUGxheWVyIEdhbWUgQ29udHJvbGxlclxyXG4gIGhhbmRsZVBsYXllclR1cm4oKTtcclxufVxyXG5cclxuaGFuZGxlUGxheWVyVHVybigpO1xyXG4iXSwibmFtZXMiOlsiYm9hcmRDb21wb25lbnQiLCJ0aGVCb2FyZCIsInBsYXllciIsImZpZWxkU3RhdHVzIiwibWFwIiwicm93IiwiY29vcmRYIiwiY29sIiwiY29vcmRZIiwic3RhdHVzIiwiZ2V0RmllbGRTdGF0dXMiLCJqb2luIiwic2hpcHlhcmRDb21wb25lbnQiLCJ0aGVGbGVldCIsInNoaXAiLCJnZXROYW1lIiwiY29vcmRzIiwibGVuZ3RoIiwiQm9hcmQiLCJzaXplIiwiZmxlZXQiLCJBcnJheSIsIngiLCJqIiwiZmlsbCIsInkiLCJ0aGVTaGlwIiwiZm9yRWFjaCIsImNvb3JkIiwiZ2V0WCIsImdldFkiLCJFcnJvciIsInB1c2giLCJ0aGVDb29yZCIsImZpZWxkIiwiaGFzQ29vcmRpbmF0ZXMiLCJpc0hpdCIsImRlc3Ryb3llZFNoaXAiLCJmaW5kIiwiaGFzU3VuayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInVuZGVmaW5lZCIsIkNvb3JkaW5hdGUiLCJTaGlwIiwibmFtZSIsImF0Q29vcmQiLCJlcXVhbHMiLCJzb21lIiwicmFuZG9tSW50ZWdlciIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJlbmRlciIsInRlbXBsYXRlIiwibm9kZSIsImlubmVySFRNTCIsInJhbmRvbU51bWJlciIsInBsYXllckJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWVudUNvbnRhaW5lciIsImdhbWVDb250YWluZXIiLCJzaGlwcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvcmllbnRhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcmFnU3RhcnQiLCJlIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiY2VsbHMiLCJjZWxsIiwiZHJhZ0VudGVyIiwiZHJhZ092ZXIiLCJkcmFnTGVhdmUiLCJkcm9wIiwicHJldmVudERlZmF1bHQiLCJzdHlsZSIsImJvcmRlciIsImdldERhdGEiLCJkcmFnZ2FibGUiLCJnZXRFbGVtZW50QnlJZCIsInNoaXBDb29yZHMiLCJwYXJzZUludCIsImRhdGFzZXQiLCJjb29yZHgiLCJjb29yZHkiLCJzaGlwTGVuZ3RoIiwic2hpcGxlbmd0aCIsImkiLCJjYW5QbGFjZVNoaXAiLCJwbGFjZVNoaXAiLCJkaXNwbGF5IiwiQUlCb2FyZCIsImNydWlzZXIyIiwic3VibWFyaW5lMiIsImRlc3Ryb3llcjIiLCJiYXR0bGVzaGlwMiIsImNhcnJpZXIyIiwiaGFuZGxlUGxheWVyVHVybiIsImZyb20iLCJTdHJpbmciLCJOdW1iZXIiLCJ1bnNoaWZ0IiwicGxhY2VTaG90IiwiZ2V0RmxlZXRTdGF0dXMiLCJpc0dhbWVPdmVyIiwic2V0VGltZW91dCIsImFsZXJ0IiwiaGFuZGxlT3Bwb25lbnRUdXJuIiwiY2FuUGxhY2VTaG90IiwiaW52YWxpZFNob3QiXSwic291cmNlUm9vdCI6IiJ9