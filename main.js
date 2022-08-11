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
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Header Styling */\r\n.primary-header {\r\n  background-color: var(--clr-white);\r\n  padding: 0.5rem 3rem 0.5rem 3rem;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.author > a {\r\n  color: inherit;\r\n}\r\n\r\n/* Game Styling */\r\n.game {\r\n  flex: 1;\r\n\r\n  /* display: flex; */\r\n  display: none;\r\n\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n@media screen and (max-width: 767px) {\r\n  .game {\r\n    display: none;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex-direction: column;\r\n  }\r\n}\r\n\r\n.player {\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n  background-color: var(--clr-white);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n\r\n  width: 400px;\r\n}\r\n\r\n.player_1 {\r\n  border-top-left-radius: 5px;\r\n  border-bottom-left-radius: 5px;\r\n}\r\n\r\n.player_2{\r\n  border-top-right-radius: 5px;\r\n  border-bottom-right-radius: 5px;\r\n}\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  min-width: 300px;\r\n  min-height: 300px;\r\n  flex: 1;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.labels-num > p {\r\n  flex: 1;\r\n  text-align: center;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell-1 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-cell-2 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-player-1 > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2 {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2  .occupied-not-hit {\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship-front {\r\n  height: 100%;\r\n  background-color: var(--clr-light-gray);\r\n  border-top-right-radius: 50%;\r\n  border-bottom-right-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-body {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-back {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n  border-top-left-radius: 50%;\r\n  border-bottom-left-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.hit {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-red);\r\n  border-radius: 50%;\r\n}\r\n\r\n.occupied-not-hit {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-1 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-blue);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-2 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n/* Menu Styling */\r\n.menu-container {\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.menu-container > .player_1 {\r\n  flex: none;\r\n  width: 400px;\r\n\r\n  border-radius: 5px;\r\n}\r\n\r\n.board-player-1-menu > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.ship {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship {\r\n  width: 140px;\r\n  height: 25px;\r\n\r\n  display: flex;\r\n}\r\n\r\n.ship > div {\r\n  flex: 1;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.circle {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.battleship {\r\n  width: 110px;\r\n  height: 25px;\r\n}\r\n\r\n.destroyer {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.submarine {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.cruiser {\r\n  width: 50px;\r\n  height: 25px;\r\n}\r\n\r\n.drag-over {\r\n  border: 1px solid var(--clr-red);\r\n}\r\n\r\n.draggable-indicator {\r\n  border-left: 2px solid var(--clr-red);\r\n  cursor: grab;\r\n}\r\n\r\n.footnote {\r\n  color: var(--clr-dark-gray);\r\n  font-size: 0.75rem;\r\n  font-style: italic;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Header Styling */\r\n.primary-header {\r\n  background-color: var(--clr-white);\r\n  padding: 0.5rem 3rem 0.5rem 3rem;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.author > a {\r\n  color: inherit;\r\n}\r\n\r\n/* Game Styling */\r\n.game {\r\n  flex: 1;\r\n\r\n  /* display: flex; */\r\n  display: none;\r\n\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n@media screen and (max-width: 767px) {\r\n  .game {\r\n    display: none;\r\n    justify-content: center;\r\n    align-items: center;\r\n    flex-direction: column;\r\n  }\r\n}\r\n\r\n.player {\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n  background-color: var(--clr-white);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n\r\n  width: 400px;\r\n}\r\n\r\n.player_1 {\r\n  border-top-left-radius: 5px;\r\n  border-bottom-left-radius: 5px;\r\n}\r\n\r\n.player_2{\r\n  border-top-right-radius: 5px;\r\n  border-bottom-right-radius: 5px;\r\n}\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  min-width: 300px;\r\n  min-height: 300px;\r\n  flex: 1;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.labels-num > p {\r\n  flex: 1;\r\n  text-align: center;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell-1 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-cell-2 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-player-1 > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2 {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2  .occupied-not-hit {\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship-front {\r\n  height: 100%;\r\n  background-color: var(--clr-light-gray);\r\n  border-top-right-radius: 50%;\r\n  border-bottom-right-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-body {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-back {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n  border-top-left-radius: 50%;\r\n  border-bottom-left-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.hit {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-red);\r\n  border-radius: 50%;\r\n}\r\n\r\n.occupied-not-hit {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-1 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-blue);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-2 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n/* Menu Styling */\r\n.menu-container {\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.menu-container > .player_1 {\r\n  flex: none;\r\n  width: 400px;\r\n\r\n  border-radius: 5px;\r\n}\r\n\r\n.board-player-1-menu > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.ship {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship {\r\n  width: 140px;\r\n  height: 25px;\r\n\r\n  display: flex;\r\n}\r\n\r\n.ship > div {\r\n  flex: 1;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.circle {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.battleship {\r\n  width: 110px;\r\n  height: 25px;\r\n}\r\n\r\n.destroyer {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.submarine {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.cruiser {\r\n  width: 50px;\r\n  height: 25px;\r\n}\r\n\r\n.drag-over {\r\n  border: 1px solid var(--clr-red);\r\n}\r\n\r\n.draggable-indicator {\r\n  border-left: 2px solid var(--clr-red);\r\n  cursor: grab;\r\n}\r\n\r\n.footnote {\r\n  color: var(--clr-dark-gray);\r\n  font-size: 0.75rem;\r\n  font-style: italic;\r\n}"],"sourceRoot":""}]);
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
var ships = document.querySelectorAll('.ship');
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

  for (var i = 0; i < shipLength; i++) {
    shipCoords.push(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coordX, coordY + i));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFlLFNBQVNBLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDQyxNQUFsQyxFQUEwQztFQUN2RCxPQUFPRCxRQUFRLENBQUNFLFdBQVQsQ0FBcUJDLEdBQXJCLENBQXlCLFVBQUNDLEdBQUQsRUFBTUMsTUFBTjtJQUFBLE9BQzVCRCxHQUFHLENBQUNELEdBQUosQ0FBUSxVQUFDRyxHQUFELEVBQU1DLE1BQU4sRUFBaUI7TUFDckIsSUFBTUMsTUFBTSxHQUFHUixRQUFRLENBQUNTLGNBQVQsQ0FBd0JKLE1BQXhCLEVBQWdDRSxNQUFoQyxDQUFmOztNQUVBLElBQUlDLE1BQU0sS0FBSyxDQUFmLEVBQWtCO1FBQ2hCLHlEQUMyQlAsTUFEM0IsOEJBQ21ESSxNQURuRCw4QkFDMkVFLE1BRDNFO01BS0Q7O01BRUQsSUFBSUMsTUFBTSxLQUFLLENBQWYsRUFBa0I7UUFDaEIseURBQzJCUCxNQUQzQiw4QkFDbURJLE1BRG5ELDhCQUMyRUUsTUFEM0U7TUFPRDs7TUFFRCxJQUFJQyxNQUFNLEtBQUssQ0FBZixFQUFrQjtRQUNoQix5REFDMkJQLE1BRDNCLDhCQUNtREksTUFEbkQsOEJBQzJFRSxNQUQzRTtNQU9EOztNQUVELHlDQUFpQ04sTUFBakMsOEJBQXlESSxNQUF6RCw4QkFBaUZFLE1BQWpGO0lBQ0QsQ0FoQ0gsRUFpQ0dHLElBakNILENBaUNRLEVBakNSLENBRDRCO0VBQUEsQ0FBekIsRUFvQ0pBLElBcENJLENBb0NDLEVBcENELENBQVA7QUFxQ0Q7Ozs7Ozs7Ozs7Ozs7O0FDdENjLFNBQVNDLGlCQUFULENBQTJCQyxRQUEzQixFQUFxQztFQUNsRCxPQUFPQSxRQUFRLENBQUNULEdBQVQsQ0FBYSxVQUFDVSxJQUFELEVBQVU7SUFDNUIsb0JBQWFBLElBQUksQ0FBQ0MsT0FBTCxFQUFiLGVBQWdDRCxJQUFJLENBQUNFLE1BQUwsQ0FBWUMsTUFBNUM7RUFDRCxDQUZNLEVBRUpOLElBRkksQ0FFQyxFQUZELENBQVA7QUFHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNKb0JPO0VBQ25CLGVBQVlDLElBQVosRUFBa0I7SUFBQTs7SUFDaEI7SUFDQSxLQUFLQSxJQUFMLEdBQVlBLElBQVo7SUFFQTtBQUNKO0FBQ0E7QUFDQTs7SUFDSSxLQUFLQyxLQUFMLEdBQWEsRUFBYjtJQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztJQUNJLEtBQUtqQixXQUFMLEdBQW1CLG1CQUFJa0IsS0FBSyxDQUFDRixJQUFELENBQVQsRUFBaUJmLEdBQWpCLENBQXFCLFVBQUNrQixDQUFELEVBQUlDLENBQUo7TUFBQSxPQUFVRixLQUFLLENBQUNGLElBQUQsQ0FBTCxDQUFZSyxJQUFaLENBQWlCLENBQWpCLENBQVY7SUFBQSxDQUFyQixDQUFuQjtFQUNEO0VBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNFLHdCQUFlRixDQUFmLEVBQWtCRyxDQUFsQixFQUFxQjtNQUNuQixPQUFPLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLENBQVA7SUFDRDtJQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxzQkFBYUMsT0FBYixFQUFzQjtNQUFBOztNQUNwQixtQkFBSUEsT0FBTyxDQUFDVixNQUFaLEVBQW9CVyxPQUFwQixDQUE0QixVQUFDQyxLQUFELEVBQVc7UUFDckMsSUFBTU4sQ0FBQyxHQUFHTSxLQUFLLENBQUNDLElBQU4sRUFBVjtRQUNBLElBQU1KLENBQUMsR0FBR0csS0FBSyxDQUFDRSxJQUFOLEVBQVY7UUFFQSxJQUFJUixDQUFDLElBQUksS0FBSSxDQUFDSCxJQUFWLElBQWtCTSxDQUFDLElBQUksS0FBSSxDQUFDTixJQUFoQyxFQUFzQyxNQUFNLElBQUlZLEtBQUosdUJBQU4sQ0FKRCxDQU1yQzs7UUFDQSxJQUFJLEtBQUksQ0FBQzVCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0MsT0FBTyxLQUFQO01BQ25DLENBUkQ7O01BVUEsT0FBTyxJQUFQO0lBQ0Q7SUFFRDtBQUNGO0FBQ0E7QUFDQTs7OztXQUNFLG1CQUFVQyxPQUFWLEVBQW1CO01BQUE7O01BQ2pCLG1CQUFJQSxPQUFPLENBQUNWLE1BQVosRUFBb0JXLE9BQXBCLENBQTRCLFVBQUNDLEtBQUQsRUFBVztRQUNyQyxJQUFNTixDQUFDLEdBQUdNLEtBQUssQ0FBQ0MsSUFBTixFQUFWO1FBQ0EsSUFBTUosQ0FBQyxHQUFHRyxLQUFLLENBQUNFLElBQU4sRUFBVixDQUZxQyxDQUlyQzs7UUFDQSxJQUFJLE1BQUksQ0FBQzNCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0M7VUFDaEMsTUFBTSxJQUFJTSxLQUFKLENBQVUsMkJBQVYsQ0FBTjtRQUNELENBUG9DLENBU3JDOzs7UUFDQSxNQUFJLENBQUM1QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLElBQXlCLENBQXpCO01BQ0QsQ0FYRDs7TUFhQSxLQUFLTCxLQUFMLENBQVdZLElBQVgsQ0FBZ0JOLE9BQWhCO0lBQ0Q7SUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0Usc0JBQWFPLFFBQWIsRUFBdUI7TUFDckIsSUFBTVgsQ0FBQyxHQUFHVyxRQUFRLENBQUNKLElBQVQsRUFBVjtNQUNBLElBQU1KLENBQUMsR0FBR1EsUUFBUSxDQUFDSCxJQUFULEVBQVY7TUFDQSxJQUFNSSxLQUFLLEdBQUcsS0FBSy9CLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsQ0FBZCxDQUhxQixDQUtyQjs7TUFDQSxJQUFJUyxLQUFLLEtBQUssQ0FBVixJQUFlQSxLQUFLLEtBQUssQ0FBN0IsRUFBZ0MsT0FBTyxJQUFQO01BRWhDLE9BQU8sS0FBUDtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLG1CQUFVRCxRQUFWLEVBQW9CO01BQ2xCLElBQU1YLENBQUMsR0FBR1csUUFBUSxDQUFDSixJQUFULEVBQVY7TUFDQSxJQUFNSixDQUFDLEdBQUdRLFFBQVEsQ0FBQ0gsSUFBVCxFQUFWOztNQUVBLElBQUksS0FBSzNCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsTUFBMkIsQ0FBL0IsRUFBa0M7UUFDaEMsS0FBS3RCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsSUFBeUIsQ0FBekI7UUFDQSxPQUFPLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLENBQVA7TUFDRDs7TUFFRCxJQUFJLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLE1BQTJCLENBQTNCLElBQWdDLEtBQUt0QixXQUFMLENBQWlCbUIsQ0FBakIsRUFBb0JHLENBQXBCLE1BQTJCLENBQS9ELEVBQWtFO1FBQ2hFLE1BQU0sSUFBSU0sS0FBSixDQUFVLDRCQUFWLENBQU47TUFDRDs7TUFFRCxLQUFLNUIsV0FBTCxDQUFpQm1CLENBQWpCLEVBQW9CRyxDQUFwQixJQUF5QixDQUF6QixDQWJrQixDQWVsQjs7TUFDQSxLQUFLTCxLQUFMLENBQVdPLE9BQVgsQ0FBbUIsVUFBQ2IsSUFBRCxFQUFVO1FBQzNCLElBQUlBLElBQUksQ0FBQ3FCLGNBQUwsQ0FBb0JGLFFBQXBCLENBQUosRUFBbUNuQixJQUFJLENBQUNzQixLQUFMLENBQVdILFFBQVg7TUFDcEMsQ0FGRDtNQUlBLE9BQU8sS0FBSzlCLFdBQUwsQ0FBaUJtQixDQUFqQixFQUFvQkcsQ0FBcEIsQ0FBUDtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsMEJBQWlCO01BQ2YsSUFBTVksYUFBYSxHQUFHLEtBQUtqQixLQUFMLENBQVdrQixJQUFYLENBQWdCLFVBQUN4QixJQUFEO1FBQUEsT0FBVUEsSUFBSSxDQUFDeUIsT0FBTCxFQUFWO01BQUEsQ0FBaEIsQ0FBdEI7TUFDQSxJQUFNQyxLQUFLLEdBQUcsS0FBS3BCLEtBQUwsQ0FBV3FCLE9BQVgsQ0FBbUJKLGFBQW5CLENBQWQ7TUFFQSxJQUFJRyxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCLEtBQUtwQixLQUFMLENBQVdzQixNQUFYLENBQWtCRixLQUFsQixFQUF5QixDQUF6QjtNQUVoQixPQUFPSCxhQUFhLEtBQUtNLFNBQWxCLEdBQThCLEVBQTlCLEdBQW1DTixhQUFhLENBQUN0QixPQUFkLEVBQTFDO0lBQ0Q7SUFFRDtBQUNGO0FBQ0E7QUFDQTs7OztXQUNFLHNCQUFhO01BQ1gsSUFBSSxLQUFLSyxLQUFMLENBQVdILE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkIsT0FBTyxJQUFQO01BRTdCLE9BQU8sS0FBUDtJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQzFJa0IyQjtFQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0VBQ0Usb0JBQVl0QixDQUFaLEVBQWVHLENBQWYsRUFBa0I7SUFBQTs7SUFDaEIsS0FBS0gsQ0FBTCxHQUFTQSxDQUFUO0lBQ0EsS0FBS0csQ0FBTCxHQUFTQSxDQUFUO0VBQ0Q7RUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7V0FDRSxnQkFBTztNQUNMLE9BQU8sS0FBS0gsQ0FBWjtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7V0FDRSxnQkFBTztNQUNMLE9BQU8sS0FBS0csQ0FBWjtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLGdCQUFPRyxLQUFQLEVBQWM7TUFDWixJQUFJLEtBQUtOLENBQUwsS0FBV00sS0FBSyxDQUFDQyxJQUFOLEVBQVgsSUFBMkIsS0FBS0osQ0FBTCxLQUFXRyxLQUFLLENBQUNFLElBQU4sRUFBMUMsRUFBd0QsT0FBTyxJQUFQO01BRXhELE9BQU8sS0FBUDtJQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ3BDa0JlO0VBQ25CO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRSxjQUFZN0IsTUFBWixFQUFvQjhCLElBQXBCLEVBQTBCO0lBQUE7O0lBQ3hCLEtBQUs5QixNQUFMLHNCQUFrQkEsTUFBbEI7SUFDQSxLQUFLOEIsSUFBTCxHQUFZQSxJQUFaO0VBQ0Q7RUFFRDtBQUNGO0FBQ0E7QUFDQTs7Ozs7V0FDRSxlQUFNQyxPQUFOLEVBQWU7TUFBQTs7TUFDYixLQUFLL0IsTUFBTCxDQUFZVyxPQUFaLENBQW9CLFVBQUNDLEtBQUQsRUFBUVksS0FBUixFQUFrQjtRQUNwQyxJQUFJWixLQUFLLENBQUNvQixNQUFOLENBQWFELE9BQWIsQ0FBSixFQUEyQjtVQUN6QixLQUFJLENBQUMvQixNQUFMLENBQVkwQixNQUFaLENBQW1CRixLQUFuQixFQUEwQixDQUExQjtRQUNEO01BQ0YsQ0FKRDtJQUtEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7Ozs7V0FDRSxtQkFBVTtNQUNSLE9BQU8sS0FBS3hCLE1BQUwsQ0FBWUMsTUFBWixLQUF1QixDQUE5QjtJQUNEO0lBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLHdCQUFlOEIsT0FBZixFQUF3QjtNQUN0QixPQUFPLEtBQUsvQixNQUFMLENBQVlpQyxJQUFaLENBQWlCLFVBQUNyQixLQUFELEVBQVc7UUFDakMsT0FBT0EsS0FBSyxDQUFDb0IsTUFBTixDQUFhRCxPQUFiLENBQVA7TUFDRCxDQUZNLENBQVA7SUFHRDtJQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7O1dBQ0UsbUJBQVU7TUFDUixPQUFPLEtBQUtELElBQVo7SUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRFksU0FBU0ksYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQWlDO0VBQzlDLE9BQU9DLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsTUFBaUJILEdBQUcsR0FBR0QsR0FBTixHQUFZLENBQTdCLENBQVgsSUFBOENBLEdBQXJEO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7O0FDRkQsSUFBTUssTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBQ0MsUUFBRCxFQUFXQyxJQUFYLEVBQW9CO0VBQ2pDLElBQUksQ0FBQ0EsSUFBTCxFQUFXO0VBRVhBLElBQUksQ0FBQ0MsU0FBTCxHQUFpQkYsUUFBakI7QUFDRCxDQUpEOztBQU1BLGlFQUFlRCxNQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsaURBQWlELHlCQUF5QiwwQkFBMEIsZ0NBQWdDLCtCQUErQiwwQkFBMEIsZ0NBQWdDLDJCQUEyQiwyQkFBMkIsS0FBSyx5SEFBeUgsNkJBQTZCLEtBQUssMENBQTBDLGdCQUFnQixpQkFBaUIsb0JBQW9CLEtBQUssaUtBQWlLLHVCQUF1QixLQUFLLDJEQUEyRCw4QkFBOEIsS0FBSyx1QkFBdUIsbUJBQW1CLEtBQUssOENBQThDLHdCQUF3QixvQ0FBb0MsdUJBQXVCLEtBQUssdUZBQXVGLHFDQUFxQyxLQUFLLGtFQUFrRSxzQkFBc0IscUJBQXFCLEtBQUssc0pBQXNKLHlCQUF5Qiw4QkFBOEIsT0FBTyw0Q0FBNEMsOENBQThDLGdEQUFnRCwrQ0FBK0MseUNBQXlDLE9BQU8sS0FBSyxjQUFjLGdEQUFnRCw4Q0FBOEMsd0JBQXdCLDZCQUE2QixLQUFLLGlEQUFpRCx5Q0FBeUMsdUNBQXVDLEtBQUssb0JBQW9CLG9CQUFvQixxQ0FBcUMsMEJBQTBCLEtBQUssZ0JBQWdCLHdCQUF3Qix3QkFBd0IsZ0NBQWdDLDhCQUE4QixLQUFLLG1CQUFtQix5QkFBeUIsa0NBQWtDLEtBQUssaUJBQWlCLDhCQUE4Qix3QkFBd0IsS0FBSyxxQkFBcUIscUJBQXFCLEtBQUsscUNBQXFDLGNBQWMsNEJBQTRCLHNCQUFzQixrQ0FBa0MsMEJBQTBCLEtBQUssOENBQThDLGFBQWEsc0JBQXNCLGdDQUFnQyw0QkFBNEIsK0JBQStCLE9BQU8sS0FBSyxpQkFBaUIsdUNBQXVDLHlDQUF5Qyx3QkFBd0IsNkJBQTZCLGdCQUFnQix1QkFBdUIsS0FBSyxtQkFBbUIsa0NBQWtDLHFDQUFxQyxLQUFLLGtCQUFrQixtQ0FBbUMsc0NBQXNDLEtBQUssd0JBQXdCLHVDQUF1QyxLQUFLLHdCQUF3Qiw2Q0FBNkMsS0FBSyx1QkFBdUIseUJBQXlCLDhCQUE4Qix3QkFBd0IsZ0NBQWdDLHlCQUF5QixzQkFBc0IsNkJBQTZCLDBCQUEwQixLQUFLLDBCQUEwQix1QkFBdUIsd0JBQXdCLGNBQWMsd0JBQXdCLHdJQUF3SSwwQ0FBMEMsdUNBQXVDLGVBQWUsS0FBSyxvQkFBb0IsdUJBQXVCLEtBQUsscUJBQXFCLDRCQUE0Qiw0QkFBNEIsc0JBQXNCLHlCQUF5QixrQ0FBa0Msd0JBQXdCLDZCQUE2QixLQUFLLHNCQUFzQiw2QkFBNkIsMEJBQTBCLGtDQUFrQyx3QkFBd0Isd0JBQXdCLEtBQUssMEJBQTBCLGNBQWMseUJBQXlCLEtBQUsseUJBQXlCLGNBQWMseUJBQXlCLHdCQUF3Qiw4QkFBOEIsMEJBQTBCLEtBQUssZ0JBQWdCLHVCQUF1Qix3QkFBd0IsNkNBQTZDLEtBQUssdUJBQXVCLG1CQUFtQixrQkFBa0Isd0JBQXdCLDhCQUE4QiwwQkFBMEIsS0FBSyx1QkFBdUIsbUJBQW1CLGtCQUFrQix3QkFBd0IsOEJBQThCLDBCQUEwQixLQUFLLHlDQUF5Qyw4Q0FBOEMsOEJBQThCLHdCQUF3QixLQUFLLHlDQUF5Qyw4Q0FBOEMsOEJBQThCLHdCQUF3QixLQUFLLDRDQUE0Qyw4Q0FBOEMsS0FBSyxtQkFBbUIsb0JBQW9CLGdCQUFnQixLQUFLLHdCQUF3QixnQ0FBZ0MsaUNBQWlDLGdDQUFnQyxnQ0FBZ0Msd0JBQXdCLHdCQUF3QiwwQkFBMEIsa0NBQWtDLEtBQUssZ0JBQWdCLG9CQUFvQixxQ0FBcUMsdUJBQXVCLDhCQUE4Qiw0QkFBNEIsd0JBQXdCLGlDQUFpQyxrQ0FBa0MsS0FBSyxxQkFBcUIsbUJBQW1CLDhDQUE4QyxtQ0FBbUMsc0NBQXNDLGtCQUFrQix3QkFBd0IsOEJBQThCLDBCQUEwQixLQUFLLG9CQUFvQiw4Q0FBOEMsbUJBQW1CLGtCQUFrQix3QkFBd0IsOEJBQThCLDBCQUEwQixLQUFLLG9CQUFvQiw4Q0FBOEMsbUJBQW1CLGtDQUFrQyxxQ0FBcUMsa0JBQWtCLHdCQUF3Qiw4QkFBOEIsMEJBQTBCLEtBQUssY0FBYyxrQkFBa0IsaUJBQWlCLHVDQUF1Qyx5QkFBeUIsS0FBSywyQkFBMkIsa0JBQWtCLGlCQUFpQix3Q0FBd0MseUJBQXlCLEtBQUssOEJBQThCLGtCQUFrQixpQkFBaUIsd0NBQXdDLHlCQUF5QixLQUFLLDhCQUE4QixrQkFBa0IsaUJBQWlCLHdDQUF3Qyx5QkFBeUIsS0FBSywrQ0FBK0MsbUJBQW1CLG9CQUFvQiw4QkFBOEIsMEJBQTBCLEtBQUsscUNBQXFDLGlCQUFpQixtQkFBbUIsNkJBQTZCLEtBQUssOENBQThDLDhDQUE4Qyw4QkFBOEIsS0FBSyxlQUFlLDZDQUE2QyxLQUFLLGVBQWUsbUJBQW1CLG1CQUFtQix3QkFBd0IsS0FBSyxxQkFBcUIsY0FBYyw4Q0FBOEMsd0JBQXdCLDhCQUE4QiwwQkFBMEIsS0FBSyxpQkFBaUIsa0JBQWtCLGlCQUFpQix3Q0FBd0MseUJBQXlCLEtBQUsscUJBQXFCLG1CQUFtQixtQkFBbUIsS0FBSyxvQkFBb0Isa0JBQWtCLG1CQUFtQixLQUFLLG9CQUFvQixrQkFBa0IsbUJBQW1CLEtBQUssa0JBQWtCLGtCQUFrQixtQkFBbUIsS0FBSyxvQkFBb0IsdUNBQXVDLEtBQUssOEJBQThCLDRDQUE0QyxtQkFBbUIsS0FBSyxtQkFBbUIsa0NBQWtDLHlCQUF5Qix5QkFBeUIsS0FBSyxPQUFPLGdGQUFnRixZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxhQUFhLGFBQWEsUUFBUSxZQUFZLE9BQU8sWUFBWSxNQUFNLFVBQVUsVUFBVSxVQUFVLE1BQU0sWUFBWSxPQUFPLFlBQVksT0FBTyxZQUFZLE1BQU0sWUFBWSxPQUFPLE1BQU0sVUFBVSxNQUFNLFlBQVksTUFBTSxZQUFZLGFBQWEsYUFBYSxPQUFPLFlBQVksTUFBTSxZQUFZLE9BQU8sWUFBWSxPQUFPLFVBQVUsVUFBVSxPQUFPLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxPQUFPLFlBQVksYUFBYSxhQUFhLGFBQWEsTUFBTSxNQUFNLEtBQUssWUFBWSxjQUFjLFdBQVcsWUFBWSxPQUFPLFlBQVksTUFBTSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLFlBQVksTUFBTSxXQUFXLFlBQVksWUFBWSxZQUFZLGFBQWEsT0FBTyxLQUFLLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLE1BQU0sS0FBSyxZQUFZLGNBQWMsV0FBVyxZQUFZLFlBQVksVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFlBQVksVUFBVSxPQUFPLE9BQU8sYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLGFBQWEsYUFBYSxXQUFXLFlBQVksY0FBYyxXQUFXLFlBQVksT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLGNBQWMsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxjQUFjLFlBQVksVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZ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QVg7SUFBQSxDQUFELEVBQTBDLEdBQTFDLENBQWpCO0VBQ0QsQ0E3QjJCLENBK0I1Qjs7O0VBQ0FULGdCQUFnQjtBQUNqQjs7QUFFREEsZ0JBQWdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvYm9hcmRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0JvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0Nvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpYi9yYW5kb21OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saWIvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBib2FyZENvbXBvbmVudCh0aGVCb2FyZCwgcGxheWVyKSB7XHJcbiAgcmV0dXJuIHRoZUJvYXJkLmZpZWxkU3RhdHVzLm1hcCgocm93LCBjb29yZFgpID0+XHJcbiAgICAgIHJvdy5tYXAoKGNvbCwgY29vcmRZKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGVCb2FyZC5nZXRGaWVsZFN0YXR1cyhjb29yZFgsIGNvb3JkWSk7XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1jZWxsLSR7cGxheWVyfVwiIGRhdGEtY29vcmR4PVwiJHtjb29yZFh9XCIgZGF0YS1jb29yZHk9XCIke2Nvb3JkWX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaXQtbWlzc2VkLXBsYXllci0xXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1jZWxsLSR7cGxheWVyfVwiIGRhdGEtY29vcmR4PVwiJHtjb29yZFh9XCIgZGF0YS1jb29yZHk9XCIke2Nvb3JkWX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaGlwLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9jY3VwaWVkLW5vdC1oaXRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzdGF0dXMgPT09IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9hcmQtY2VsbC0ke3BsYXllcn1cIiBkYXRhLWNvb3JkeD1cIiR7Y29vcmRYfVwiIGRhdGEtY29vcmR5PVwiJHtjb29yZFl9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hpcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaXRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImJvYXJkLWNlbGwtJHtwbGF5ZXJ9XCIgZGF0YS1jb29yZHg9XCIke2Nvb3JkWH1cIiBkYXRhLWNvb3JkeT1cIiR7Y29vcmRZfVwiPjwvZGl2PmA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKVxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcIik7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpcHlhcmRDb21wb25lbnQodGhlRmxlZXQpIHtcclxuICByZXR1cm4gdGhlRmxlZXQubWFwKChzaGlwKSA9PiB7XHJcbiAgICByZXR1cm4gYDxwPiR7c2hpcC5nZXROYW1lKCl9ICgke3NoaXAuY29vcmRzLmxlbmd0aH0pPC9wPmA7XHJcbiAgfSkuam9pbihcIlwiKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XHJcbiAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgLy8gU2l6ZSBvZiBib2FyZCBncmlkXHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW4gYXJyYXkgZm9yIHN0b3JpbmcgdGhlIHNoaXBzXHJcbiAgICAgKiBLZWVwIHRyYWNrIGl0cyBuYW1lcyBhbmQgc3RhdHVzIChoaXQgb3Igc3VuaylcclxuICAgICAqL1xyXG4gICAgdGhpcy5mbGVldCA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmllbGQgc3RhdHVzIGFycmF5XHJcbiAgICAgKiAwOiBlbXB0eSwgbm90IGhpdFxyXG4gICAgICogMTogZW1wdHksIGJ1dCBoaXRcclxuICAgICAqIDI6IG5vdCBlbXB0eSwgbm90IGhpdFxyXG4gICAgICogMzogbm90IGVtcHR5LCBidXQgaGl0XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZmllbGRTdGF0dXMgPSBbLi4uQXJyYXkoc2l6ZSldLm1hcCgoeCwgaikgPT4gQXJyYXkoc2l6ZSkuZmlsbCgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZmllbGQgc3RhdHVzXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IGNvb3JkaW5hdGVcclxuICAgKiBAcmV0dXJucyB0aGUgc3RhdHVzIG9mIHgsIHkgZmllbGRcclxuICAgKi9cclxuICBnZXRGaWVsZFN0YXR1cyh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGl0J3MgT0sgdG8gcGxhY2Ugc2hpcFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0aGVTaGlwIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgc2hpcCBjYW4gYmUgcGxhY2VkLCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBjYW5QbGFjZVNoaXAodGhlU2hpcCkge1xyXG4gICAgWy4uLnRoZVNoaXAuY29vcmRzXS5mb3JFYWNoKChjb29yZCkgPT4ge1xyXG4gICAgICBjb25zdCB4ID0gY29vcmQuZ2V0WCgpO1xyXG4gICAgICBjb25zdCB5ID0gY29vcmQuZ2V0WSgpO1xyXG5cclxuICAgICAgaWYgKHggPj0gdGhpcy5zaXplIHx8IHkgPj0gdGhpcy5zaXplKSB0aHJvdyBuZXcgRXJyb3IoYE91dCBvZiBjb3ZlcmVkIGFyZWFgKTtcclxuXHJcbiAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBpbiB0aGlzIGZpZWxkXHJcbiAgICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldICE9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlcyBhIHNoaXAgb24gdGhlIGJvYXJkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZVNoaXAgb2JqZWN0XHJcbiAgICovXHJcbiAgcGxhY2VTaGlwKHRoZVNoaXApIHtcclxuICAgIFsuLi50aGVTaGlwLmNvb3Jkc10uZm9yRWFjaCgoY29vcmQpID0+IHtcclxuICAgICAgY29uc3QgeCA9IGNvb3JkLmdldFgoKTtcclxuICAgICAgY29uc3QgeSA9IGNvb3JkLmdldFkoKTtcclxuXHJcbiAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBpbiB0aGlzIGZpZWxkXHJcbiAgICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldICE9PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmllbGQgaXMgYWxyZWFkeSBvY2N1cGllZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0IGZpZWxkcyB0byBub3QgZW1wdHksIG5vdCBoaXRcclxuICAgICAgdGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9IDI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZsZWV0LnB1c2godGhlU2hpcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBpdCdzIE9LIHRvIHBsYWNlIHNob3RcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlQ29vcmQgdG8gaGl0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBPSyB0byBwbGFjZSBzaG90LCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBjYW5QbGFjZVNob3QodGhlQ29vcmQpIHtcclxuICAgIGNvbnN0IHggPSB0aGVDb29yZC5nZXRYKCk7XHJcbiAgICBjb25zdCB5ID0gdGhlQ29vcmQuZ2V0WSgpO1xyXG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG5cclxuICAgIC8vIElmIGZpZWxkIHZhbHVlIGlzIDAgb3IgMiwgaXQncyBPSyB0byBzaG9vdFxyXG4gICAgaWYgKGZpZWxkID09PSAwIHx8IGZpZWxkID09PSAyKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGFjZXMgc2hvdCBvbiB0aGUgYm9hcmRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlQ29vcmQgdG8gaGl0XHJcbiAgICogQHJldHVybnMgdGhlIHJlc3VsdCAoMSBvciAzIC0gdGhlIHR3byBwb3NzaWJsZSBvdXRjb21lcylcclxuICAgKi9cclxuICBwbGFjZVNob3QodGhlQ29vcmQpIHtcclxuICAgIGNvbnN0IHggPSB0aGVDb29yZC5nZXRYKCk7XHJcbiAgICBjb25zdCB5ID0gdGhlQ29vcmQuZ2V0WSgpO1xyXG5cclxuICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAxO1xyXG4gICAgICByZXR1cm4gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9PT0gMSB8fCB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpZWxkIGhhcyBhbHJlYWR5IGJlZW4gaGl0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAzO1xyXG5cclxuICAgIC8vIFdlIGhhdmUgYSBzdWNjZXNzZnVsIHNob3QsIGFuZCB0aGUgc2hpcCBtdXN0IHJlbWVtYmVyIHRoYXQgaXQgaGFzIGJlZW4gaGl0XHJcbiAgICB0aGlzLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAuaGFzQ29vcmRpbmF0ZXModGhlQ29vcmQpKSBzaGlwLmlzSGl0KHRoZUNvb3JkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBvZiBhIHNoaXAgaWYgaXQgd2FzIGRlc3Ryb3llZCBhbmQgcmVtb3ZlIGl0IGZyb20gZmxlZXRcclxuICAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIGNhbGxlZCBhZnRlciBldmVyeSBzaG90XHJcbiAgICogQHJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHNoaXAgdGhhdCBoYXMgYmVlbiBkZXN0cm95ZWQgKGlmIGhhc1N1bmsgcmV0dXJuIHRydWUpLFxyXG4gICAqIE9yIGFuIGVtcHR5IHN0cmluZyBpcyBzaGlwIHdhcyBub3QgZGVzdHJveWVkXHJcbiAgICovXHJcbiAgZ2V0RmxlZXRTdGF0dXMoKSB7XHJcbiAgICBjb25zdCBkZXN0cm95ZWRTaGlwID0gdGhpcy5mbGVldC5maW5kKChzaGlwKSA9PiBzaGlwLmhhc1N1bmsoKSk7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmxlZXQuaW5kZXhPZihkZXN0cm95ZWRTaGlwKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5mbGVldC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIHJldHVybiBkZXN0cm95ZWRTaGlwID09PSB1bmRlZmluZWQgPyBcIlwiIDogZGVzdHJveWVkU2hpcC5nZXROYW1lKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHYW1lIGlzIG92ZXIgaWYgZmxlZXQgYXJyYXkgaXMgZW1wdHlcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGdhbWUgaXMgb3ZlciwgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgaXNHYW1lT3ZlcigpIHtcclxuICAgIGlmICh0aGlzLmZsZWV0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb29yZGluYXRlIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgY29vcmRpbmF0ZSBzZXRcclxuICAgKiBAcGFyYW0ge051bWJlcn0geFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdmFsdWUgb2YgeCBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHggdmFsdWUgb2YgdGhpcyBjb29yZGluYXRlXHJcbiAgICovXHJcbiAgZ2V0WCgpIHtcclxuICAgIHJldHVybiB0aGlzLng7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdmFsdWUgb2YgeSBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHkgdmFsdWUgb2YgdGhpcyBjb29yZGluYXRlXHJcbiAgICovXHJcbiAgZ2V0WSgpIHtcclxuICAgIHJldHVybiB0aGlzLnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZXN0IHRoaXMgY29vcmRpbmF0ZSBmb3IgZXF1YWxpdHkgd2l0aCB0aGUgU2hpcCdzIGNvb3JkaW5hdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29vcmQgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIHRydWUgb3IgZmFsc2VcclxuICAgKi9cclxuICBlcXVhbHMoY29vcmQpIHtcclxuICAgIGlmICh0aGlzLnggPT09IGNvb3JkLmdldFgoKSAmJiB0aGlzLnkgPT09IGNvb3JkLmdldFkoKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBzaGlwIG9mIGdpdmVuIGNvb3JkcyBhbmQgbmFtZVxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvb3Jkc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29vcmRzLCBuYW1lKSB7XHJcbiAgICB0aGlzLmNvb3JkcyA9IFsuLi5jb29yZHNdO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyB0aGF0IHRoZSBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdENvb3JkXHJcbiAgICovXHJcbiAgaXNIaXQoYXRDb29yZCkge1xyXG4gICAgdGhpcy5jb29yZHMuZm9yRWFjaCgoY29vcmQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChjb29yZC5lcXVhbHMoYXRDb29yZCkpIHtcclxuICAgICAgICB0aGlzLmNvb3Jkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHBhcnRzIGxlZnQgb2YgdGhpcyBzaGlwXHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjb29yZGluYXRlcyAtIGhlbmNlIHRoZSBzaGlwIGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIGhhc1N1bmsoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb29yZHMubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVzdHMgd2hldGhlciB0aGlzIHNoaXAgaXMgcGxhY2VkIG9uIHRoZXNlIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0Q29vcmQgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgc2hpcCBpcyBvbiB0aGVzZSBjb29yZGluYXRlcywgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgaGFzQ29vcmRpbmF0ZXMoYXRDb29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29vcmRzLnNvbWUoKGNvb3JkKSA9PiB7XHJcbiAgICAgIHJldHVybiBjb29yZC5lcXVhbHMoYXRDb29yZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgc2hpcFxyXG4gICAqIEByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZSB2YXJpYWJsZVxyXG4gICAqL1xyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuIiwiY29uc3QgcmVuZGVyID0gKHRlbXBsYXRlLCBub2RlKSA9PiB7XHJcbiAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcclxcbiAgLS1jbHItcmVkOiAjZmYwMDU1O1xcclxcbiAgLS1jbHItYmx1ZTogIzYxYzZmZjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWJsdWU6ICNkZmY0ZmY7XFxyXFxuICAtLWNsci1kYXJrLWdyYXk6ICM3MTdjOTY7XFxyXFxuICAtLWNsci1ncmF5OiAjOTA5MjkyO1xcclxcbiAgLS1jbHItbGlnaHQtZ3JheTogI2ViZWJlYjtcXHJcXG4gIC0tY2xyLXdoaXRlOiAjZmZmZmZmO1xcclxcbiAgLS1jbHItYmxhY2s6ICMyMTIxMjE7XFxyXFxufVxcclxcblxcclxcbi8qIGh0dHBzOi8vcGljY2FsaWwubGkvYmxvZy9hLW1vZGVybi1jc3MtcmVzZXQgKi9cXHJcXG5cXHJcXG4vKiBCb3ggc2l6aW5nIHJ1bGVzICovXFxyXFxuKixcXHJcXG4qOjpiZWZvcmUsXFxyXFxuKjo6YWZ0ZXIge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2luICovXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgZm9udDogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGxpc3Qgc3R5bGVzIG9uIHVsLCBvbCBlbGVtZW50cyB3aXRoIGEgbGlzdCByb2xlLCB3aGljaCBzdWdnZXN0cyBkZWZhdWx0IHN0eWxpbmcgd2lsbCBiZSByZW1vdmVkICovXFxyXFxudWxbcm9sZT1cXFwibGlzdFxcXCJdLFxcclxcbm9sW3JvbGU9XFxcImxpc3RcXFwiXSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSByb290IGRlZmF1bHRzICovXFxyXFxuaHRtbDpmb2N1cy13aXRoaW4ge1xcclxcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIFNldCBjb3JlIGJvZHkgZGVmYXVsdHMgKi9cXHJcXG5ib2R5IHtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBBIGVsZW1lbnRzIHRoYXQgZG9uJ3QgaGF2ZSBhIGNsYXNzIGdldCBkZWZhdWx0IHN0eWxlcyAqL1xcclxcbmE6bm90KFtjbGFzc10pIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbi1za2lwLWluazogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyogTWFrZSBpbWFnZXMgZWFzaWVyIHRvIHdvcmsgd2l0aCAqL1xcclxcbmltZyxcXHJcXG5waWN0dXJlIHtcXHJcXG4gIG1heC13aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZW1vdmUgYWxsIGFuaW1hdGlvbnMsIHRyYW5zaXRpb25zIGFuZCBzbW9vdGggc2Nyb2xsIGZvciBwZW9wbGUgdGhhdCBwcmVmZXIgbm90IHRvIHNlZSB0aGVtICovXFxyXFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcXHJcXG4gIGh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgKixcXHJcXG4gICo6OmJlZm9yZSxcXHJcXG4gICo6OmFmdGVyIHtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMSAhaW1wb3J0YW50O1xcclxcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvICFpbXBvcnRhbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLyogSGVhZGVyIFN0eWxpbmcgKi9cXHJcXG4ucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbSAzcmVtIDAuNXJlbSAzcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4udGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAxLjVyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWJsYWNrKTtcXHJcXG59XFxyXFxuXFxyXFxuLnN1YnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGhvciB7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWJsYWNrKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yID4gYSB7XFxyXFxuICBjb2xvcjogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogR2FtZSBTdHlsaW5nICovXFxyXFxuLmdhbWUge1xcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIC8qIGRpc3BsYXk6IGZsZXg7ICovXFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcblxcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjdweCkge1xcclxcbiAgLmdhbWUge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllciB7XFxyXFxuICBwYWRkaW5nOiAxLjVyZW0gM3JlbSAxLjVyZW0gM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG5cXHJcXG4gIHdpZHRoOiA0MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8xIHtcXHJcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDVweDtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8ye1xcclxcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDVweDtcXHJcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMSA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzIgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllci10aXRsZSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gIG1pbi13aWR0aDogMzAwcHg7XFxyXFxuICBtaW4taGVpZ2h0OiAzMDBweDtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXHJcXG4gICAgXFxcImJsYW5rIGxhYmVscy1jaGFyIGxhYmVscy1jaGFyXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCJcXHJcXG4gICAgXFxcImxhYmVscy1udW0gYm9hcmQgYm9hcmRcXFwiO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDFmciAxZnI7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYmxhbmstZGl2IHtcXHJcXG4gIGdyaWQtYXJlYTogYmxhbms7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtbnVtIHtcXHJcXG4gIGdyaWQtYXJlYTogbGFiZWxzLW51bTtcXHJcXG5cXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1jaGFyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIgPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtbnVtID4gcCB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGdyaWQtYXJlYTogYm9hcmQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jZWxsLTEge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbC0yIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgPiAuYm9hcmQtY2VsbC0yIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiAgLm9jY3VwaWVkLW5vdC1oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcHlhcmQge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkID4gaDMge1xcclxcbiAgd3JpdGluZy1tb2RlOiB2ZXJ0aWNhbC1ybDtcXHJcXG4gIHRleHQtb3JpZW50YXRpb246IHNpZGV3YXlzO1xcclxcbiAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuN3JlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXBzIHtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWZyb250IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1MCU7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWJvZHkge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLWJhY2sge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogNTAlO1xcclxcblxcclxcbiAgZmxleDogMTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLXJlZCk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTEge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWJsdWUpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0LW1pc3NlZC1wbGF5ZXItMiB7XFxyXFxuICBoZWlnaHQ6IDUwJTtcXHJcXG4gIHdpZHRoOiA1MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi8qIE1lbnUgU3R5bGluZyAqL1xcclxcbi5tZW51LWNvbnRhaW5lciB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucGxheWVyXzEge1xcclxcbiAgZmxleDogbm9uZTtcXHJcXG4gIHdpZHRoOiA0MDBweDtcXHJcXG5cXHJcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xLW1lbnUgPiAuYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ibHVlKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgd2lkdGg6IDE0MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAgPiBkaXYge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jaXJjbGUge1xcclxcbiAgaGVpZ2h0OiA0MCU7XFxyXFxuICB3aWR0aDogNDAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4uYmF0dGxlc2hpcCB7XFxyXFxuICB3aWR0aDogMTEwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5kZXN0cm95ZXIge1xcclxcbiAgd2lkdGg6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5zdWJtYXJpbmUge1xcclxcbiAgd2lkdGg6IDgwcHg7XFxyXFxuICBoZWlnaHQ6IDI1cHg7XFxyXFxufVxcclxcblxcclxcbi5jcnVpc2VyIHtcXHJcXG4gIHdpZHRoOiA1MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZHJhZy1vdmVyIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZHJhZ2dhYmxlLWluZGljYXRvciB7XFxyXFxuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHZhcigtLWNsci1yZWQpO1xcclxcbiAgY3Vyc29yOiBncmFiO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9vdG5vdGUge1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsd0JBQXdCO0VBQ3hCLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsb0JBQW9CO0VBQ3BCLG9CQUFvQjtBQUN0Qjs7QUFFQSxnREFBZ0Q7O0FBRWhELHFCQUFxQjtBQUNyQjs7O0VBR0Usc0JBQXNCO0FBQ3hCOztBQUVBLDBCQUEwQjtBQUMxQjtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsYUFBYTtBQUNmOztBQUVBLDJHQUEyRztBQUMzRzs7RUFFRSxnQkFBZ0I7QUFDbEI7O0FBRUEsMkJBQTJCO0FBQzNCO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBOztFQUVFLFlBQVk7QUFDZDs7QUFFQSwyQkFBMkI7QUFDM0I7RUFDRSxpQkFBaUI7RUFDakIsNkJBQTZCO0VBQzdCLGdCQUFnQjtBQUNsQjs7QUFFQSwwREFBMEQ7QUFDMUQ7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUEsb0NBQW9DO0FBQ3BDOztFQUVFLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBLGdHQUFnRztBQUNoRztFQUNFO0lBQ0UscUJBQXFCO0VBQ3ZCOztFQUVBOzs7SUFHRSxxQ0FBcUM7SUFDckMsdUNBQXVDO0lBQ3ZDLHNDQUFzQztJQUN0Qyxn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QUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UscUNBQXFDO0VBQ3JDLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDJCQUEyQjtFQUMzQixrQkFBa0I7RUFDbEIsa0JBQWtCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gIC0tY2xyLXJlZDogI2ZmMDA1NTtcXHJcXG4gIC0tY2xyLWJsdWU6ICM2MWM2ZmY7XFxyXFxuICAtLWNsci1saWdodC1ibHVlOiAjZGZmNGZmO1xcclxcbiAgLS1jbHItZGFyay1ncmF5OiAjNzE3Yzk2O1xcclxcbiAgLS1jbHItZ3JheTogIzkwOTI5MjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWdyYXk6ICNlYmViZWI7XFxyXFxuICAtLWNsci13aGl0ZTogI2ZmZmZmZjtcXHJcXG4gIC0tY2xyLWJsYWNrOiAjMjEyMTIxO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBodHRwczovL3BpY2NhbGlsLmxpL2Jsb2cvYS1tb2Rlcm4tY3NzLXJlc2V0ICovXFxyXFxuXFxyXFxuLyogQm94IHNpemluZyBydWxlcyAqL1xcclxcbiosXFxyXFxuKjo6YmVmb3JlLFxcclxcbio6OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBkZWZhdWx0IG1hcmdpbiAqL1xcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGZvbnQ6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBsaXN0IHN0eWxlcyBvbiB1bCwgb2wgZWxlbWVudHMgd2l0aCBhIGxpc3Qgcm9sZSwgd2hpY2ggc3VnZ2VzdHMgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZCAqL1xcclxcbnVsW3JvbGU9XFxcImxpc3RcXFwiXSxcXHJcXG5vbFtyb2xlPVxcXCJsaXN0XFxcIl0ge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2V0IGNvcmUgcm9vdCBkZWZhdWx0cyAqL1xcclxcbmh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLFxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSBib2R5IGRlZmF1bHRzICovXFxyXFxuYm9keSB7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZVNwZWVkO1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQSBlbGVtZW50cyB0aGF0IGRvbid0IGhhdmUgYSBjbGFzcyBnZXQgZGVmYXVsdCBzdHlsZXMgKi9cXHJcXG5hOm5vdChbY2xhc3NdKSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb24tc2tpcC1pbms6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIE1ha2UgaW1hZ2VzIGVhc2llciB0byB3b3JrIHdpdGggKi9cXHJcXG5pbWcsXFxyXFxucGljdHVyZSB7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGFsbCBhbmltYXRpb25zLCB0cmFuc2l0aW9ucyBhbmQgc21vb3RoIHNjcm9sbCBmb3IgcGVvcGxlIHRoYXQgcHJlZmVyIG5vdCB0byBzZWUgdGhlbSAqL1xcclxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XFxyXFxuICBodG1sOmZvY3VzLXdpdGhpbiB7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICosXFxyXFxuICAqOjpiZWZvcmUsXFxyXFxuICAqOjphZnRlciB7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDEgIWltcG9ydGFudDtcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0byAhaW1wb3J0YW50O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi8qIEhlYWRlciBTdHlsaW5nICovXFxyXFxuLnByaW1hcnktaGVhZGVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW0gM3JlbSAwLjVyZW0gM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxufVxcclxcblxcclxcbi5zdWJ0aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3Ige1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGhvciA+IGEge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIEdhbWUgU3R5bGluZyAqL1xcclxcbi5nYW1lIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICAvKiBkaXNwbGF5OiBmbGV4OyAqL1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG5cXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcXHJcXG4gIC5nYW1lIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXIge1xcclxcbiAgcGFkZGluZzogMS41cmVtIDNyZW0gMS41cmVtIDNyZW07XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItd2hpdGUpO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBnYXA6IDFyZW07XFxyXFxuXFxyXFxuICB3aWR0aDogNDAwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMSB7XFxyXFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMntcXHJcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1cHg7XFxyXFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzEgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8yID4gaDIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXItdGl0bGUge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICBtaW4td2lkdGg6IDMwMHB4O1xcclxcbiAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICBmbGV4OiAxO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxyXFxuICAgIFxcXCJibGFuayBsYWJlbHMtY2hhciBsYWJlbHMtY2hhclxcXCJcXHJcXG4gICAgXFxcImxhYmVscy1udW0gYm9hcmQgYm9hcmRcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byAxZnIgMWZyO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciAxZnI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsYW5rLWRpdiB7XFxyXFxuICBncmlkLWFyZWE6IGJsYW5rO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLW51bSB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1udW07XFxyXFxuXFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtY2hhcjtcXHJcXG5cXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1jaGFyID4gcCB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLW51bSA+IHAge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZCB7XFxyXFxuICBncmlkLWFyZWE6IGJvYXJkO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNlbGwtMiB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMSA+IC5ib2FyZC1jZWxsLTEge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWJsdWUpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0yID4gLmJvYXJkLWNlbGwtMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgIC5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5zaGlweWFyZCA+IGgzIHtcXHJcXG4gIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxyXFxuICB0ZXh0LW9yaWVudGF0aW9uOiBzaWRld2F5cztcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAzcHg7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1mcm9udCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1iYWNrIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4ub2NjdXBpZWQtbm90LWhpdCB7XFxyXFxuICBoZWlnaHQ6IDQwJTtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5oaXQtbWlzc2VkLXBsYXllci0xIHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ibHVlKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTIge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNZW51IFN0eWxpbmcgKi9cXHJcXG4ubWVudS1jb250YWluZXIge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnBsYXllcl8xIHtcXHJcXG4gIGZsZXg6IG5vbmU7XFxyXFxuICB3aWR0aDogNDAwcHg7XFxyXFxuXFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMS1tZW51ID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gIHdpZHRoOiAxNDBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwID4gZGl2IHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhdHRsZXNoaXAge1xcclxcbiAgd2lkdGg6IDExMHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzdHJveWVyIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWFyaW5lIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3J1aXNlciB7XFxyXFxuICB3aWR0aDogNTBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmRyYWctb3ZlciB7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jbHItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRyYWdnYWJsZS1pbmRpY2F0b3Ige1xcclxcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1jbHItcmVkKTtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuXFxyXFxuLmZvb3Rub3RlIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL0JvYXJkXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2ZhY3Rvcmllcy9TaGlwXCI7XHJcbmltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2ZhY3Rvcmllcy9Db29yZGluYXRlXCI7XHJcbmltcG9ydCBib2FyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL2JvYXJkQ29tcG9uZW50XCI7XHJcbmltcG9ydCBzaGlweWFyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50XCI7XHJcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5pbXBvcnQgcmFuZG9tTnVtYmVyIGZyb20gXCIuL2xpYi9yYW5kb21OdW1iZXJcIjtcclxuXHJcbi8vIEluaXRpYWxpemF0aW9uIG9mIEh1bWFuIFBsYXllciBCb2FyZCBhbmQgU2hpcHNcclxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgQm9hcmQoMTApO1xyXG5cclxuLy8gUmVuZGVyIHRvIHRoZSBET00gdGhlIGluaXRpYWwgSHVtYW4gUGxheWVyIEJvYXJkIFN0YXRlXHJcbnJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTFcIikpO1xyXG5yZW5kZXIoYm9hcmRDb21wb25lbnQocGxheWVyQm9hcmQsIDEpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXBsYXllci0xLW1lbnVcIikpO1xyXG5cclxuY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1jb250YWluZXJcIik7XHJcbmNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVcIik7XHJcbmNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKTtcclxuXHJcbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpKTtcclxuXHJcbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XHJcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgZS50YXJnZXQuaWQpO1xyXG59XHJcblxyXG5jb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY2VsbC0xXCIpO1xyXG5cclxuY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcilcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xyXG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcm9wKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnRhcmdldC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCByZWRcIjtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ0xlYXZlKGUpIHtcclxuICBlLnRhcmdldC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB3aGl0ZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcm9wKGUpIHtcclxuICBjb25zdCBpZCA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICBjb25zdCBkcmFnZ2FibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gIGxldCBzaGlwQ29vcmRzID0gW107XHJcbiAgbGV0IGNvb3JkWCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29vcmR4KTtcclxuICBsZXQgY29vcmRZID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb29yZHkpO1xyXG4gIGxldCBzaGlwTGVuZ3RoID0gZHJhZ2dhYmxlLmRhdGFzZXQuc2hpcGxlbmd0aDtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgIHNoaXBDb29yZHMucHVzaChuZXcgQ29vcmRpbmF0ZShjb29yZFgsIGNvb3JkWSArIGkpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwQ29vcmRzLCBgJHtpZH1gKTtcclxuICBcclxuICBpZiAocGxheWVyQm9hcmQuY2FuUGxhY2VTaGlwKHNoaXApKSB7XHJcbiAgICBwbGF5ZXJCb2FyZC5wbGFjZVNoaXAoc2hpcCk7XHJcbiAgICBkcmFnZ2FibGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBpZiAocGxheWVyQm9hcmQuZmxlZXQubGVuZ3RoID09PSA1KSB7XHJcbiAgICBtZW51Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIH1cclxuXHJcbiAgc2hpcENvb3JkcyA9IFtdO1xyXG4gIHJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTEtbWVudVwiKSk7XHJcbiAgcmVuZGVyKGJvYXJkQ29tcG9uZW50KHBsYXllckJvYXJkLCAxKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMVwiKSk7XHJcbiAgcmVuZGVyKHNoaXB5YXJkQ29tcG9uZW50KHBsYXllckJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0xXCIpKTtcclxuXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jZWxsLTFcIikuZm9yRWFjaChjZWxsID0+IHtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgZHJhZ0VudGVyKVxyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKTtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyb3ApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBJbml0aWFsaXphdGlvbiBvZiBBSSBQbGF5ZXIgQm9hcmQgYW5kIFNoaXBzXHJcbmNvbnN0IEFJQm9hcmQgICAgID0gbmV3IEJvYXJkKDEwKTtcclxuY29uc3QgY3J1aXNlcjIgICAgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoMywgNiksIG5ldyBDb29yZGluYXRlKDMsIDcpXSwgXCJjcnVpc2VyXCIpO1xyXG5jb25zdCBzdWJtYXJpbmUyICA9IG5ldyBTaGlwKFtuZXcgQ29vcmRpbmF0ZSg2LCA5KSwgbmV3IENvb3JkaW5hdGUoNywgOSksIG5ldyBDb29yZGluYXRlKDgsIDkpXSwgXCJzdWJtYXJpbmVcIik7XHJcbmNvbnN0IGRlc3Ryb3llcjIgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDUsIDApLCBuZXcgQ29vcmRpbmF0ZSg1LCAxKSwgbmV3IENvb3JkaW5hdGUoNSwgMildLCBcImRlc3Ryb3llclwiKTtcclxuY29uc3QgYmF0dGxlc2hpcDIgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoMSwgMyksIG5ldyBDb29yZGluYXRlKDEsIDQpLCBuZXcgQ29vcmRpbmF0ZSgxLCA1KSwgbmV3IENvb3JkaW5hdGUoMSwgNildLCBcImJhdHRsZXNoaXBcIik7XHJcbmNvbnN0IGNhcnJpZXIyICAgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDgsIDEpLCBuZXcgQ29vcmRpbmF0ZSg4LCAyKSwgbmV3IENvb3JkaW5hdGUoOCwgMyksIG5ldyBDb29yZGluYXRlKDgsIDQpLCBuZXcgQ29vcmRpbmF0ZSg4LCA1KV0sIFwiY2FycmllclwiKTtcclxuXHJcbi8vIFBsYWNlIGluaXRpYWwgU2hpcHMgdG8gQUkgUGxheWVyIEJvYXJkXHJcbkFJQm9hcmQucGxhY2VTaGlwKGNydWlzZXIyKTtcclxuQUlCb2FyZC5wbGFjZVNoaXAoc3VibWFyaW5lMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGRlc3Ryb3llcjIpO1xyXG5BSUJvYXJkLnBsYWNlU2hpcChiYXR0bGVzaGlwMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGNhcnJpZXIyKTtcclxuXHJcbi8vIFJlbmRlciB0byB0aGUgRE9NIHRoZSBpbml0aWFsIEFJIFBsYXllciBCb2FyZCBTdGF0ZVxyXG5yZW5kZXIoYm9hcmRDb21wb25lbnQoQUlCb2FyZCwgMiksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTJcIikpO1xyXG5cclxuLy8gUmVuZGVyIHRvIHRoZSBET00gaW5pdGlhbCBzdGF0ZSBvZiB0aGUgU2hpcHMgb2YgYm90aCBwbGF5ZXJzXHJcbnJlbmRlcihzaGlweWFyZENvbXBvbmVudChwbGF5ZXJCb2FyZC5mbGVldCksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcHMtMVwiKSk7XHJcbnJlbmRlcihzaGlweWFyZENvbXBvbmVudChBSUJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0yXCIpKTtcclxuXHJcbi8vIEh1bWFuIFBsYXllciBHYW1lIENvbnRyb2xsZXJcclxuZnVuY3Rpb24gaGFuZGxlUGxheWVyVHVybigpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNlbGwtMlwiKS5mb3JFYWNoKChjZWxsLCBpbmRleCkgPT4ge1xyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgbGV0IGNvb3JkcyA9IEFycmF5LmZyb20oU3RyaW5nKGluZGV4KSwgTnVtYmVyKTtcclxuXHJcbiAgICAgIGlmIChjb29yZHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgY29vcmRzLnVuc2hpZnQoMCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIEFJQm9hcmQucGxhY2VTaG90KG5ldyBDb29yZGluYXRlKGNvb3Jkc1swXSwgY29vcmRzWzFdKSk7XHJcbiAgICAgIEFJQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuXHJcbiAgICAgIHJlbmRlcihib2FyZENvbXBvbmVudChBSUJvYXJkLCAyKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMlwiKSk7XHJcbiAgICAgIHJlbmRlcihzaGlweWFyZENvbXBvbmVudChBSUJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0yXCIpKTtcclxuXHJcbiAgICAgIGlmIChBSUJvYXJkLmlzR2FtZU92ZXIoKSkge1xyXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KGBHYW1lIE92ZXIhIFlvdSB3b24hYCksIDEwMCk7XHJcbiAgICAgIH0gXHJcblxyXG4gICAgICAvLyBQYXNzIHRoZSBjdXJyZW50IHR1cm4gdG8gQUkgUGxheWVyIEdhbWUgQ29udHJvbGxlciBhZnRlciAxIHNlY29uZCBkZWxheVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBoYW5kbGVPcHBvbmVudFR1cm4oKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gQUkgUGxheWVyIEdhbWUgQ29udHJvbGxlclxyXG5mdW5jdGlvbiBoYW5kbGVPcHBvbmVudFR1cm4oKSB7XHJcbiAgbGV0IGNvb3JkcyA9IG5ldyBDb29yZGluYXRlKHJhbmRvbU51bWJlcigwLCA5KSwgcmFuZG9tTnVtYmVyKDAsIDkpKTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdGhlIHNob3QgaXMgdmFsaWQsIHBsYWNlIHRoZSBzaG90LlxyXG4gICAqIEVsc2UsIGdlbmVyYXRlIGEgbmV3IGNvb3JkcyB3aGlsZSBzaG90IGlzIGludmFsaWQgYW5kIHRyeSBhZ2Fpbi5cclxuICAgKi9cclxuICBpZiAocGxheWVyQm9hcmQuY2FuUGxhY2VTaG90KGNvb3JkcykpIHtcclxuICAgIHBsYXllckJvYXJkLnBsYWNlU2hvdChjb29yZHMpO1xyXG4gICAgcGxheWVyQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGludmFsaWRTaG90ID0gdHJ1ZTtcclxuXHJcbiAgICB3aGlsZSAoaW52YWxpZFNob3QpIHtcclxuICAgICAgY29vcmRzID0gbmV3IENvb3JkaW5hdGUocmFuZG9tTnVtYmVyKDAsIDkpLCByYW5kb21OdW1iZXIoMCwgOSkpO1xyXG5cclxuICAgICAgaWYgKHBsYXllckJvYXJkLmNhblBsYWNlU2hvdChjb29yZHMpKSB7XHJcbiAgICAgICAgcGxheWVyQm9hcmQucGxhY2VTaG90KGNvb3Jkcyk7XHJcbiAgICAgICAgcGxheWVyQm9hcmQuZ2V0RmxlZXRTdGF0dXMoKTtcclxuICAgICAgICBpbnZhbGlkU2hvdCA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoYm9hcmRDb21wb25lbnQocGxheWVyQm9hcmQsIDEpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXBsYXllci0xXCIpKTtcclxuICByZW5kZXIoc2hpcHlhcmRDb21wb25lbnQocGxheWVyQm9hcmQuZmxlZXQpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBzLTFcIikpO1xyXG5cclxuICBpZiAocGxheWVyQm9hcmQuaXNHYW1lT3ZlcigpKSB7XHJcbiAgICByZXR1cm4gc2V0VGltZW91dCgoKSA9PiBhbGVydChgR2FtZSBPdmVyISBPcHBvbmVudCB3b24hYCksIDEwMCk7XHJcbiAgfVxyXG5cclxuICAvLyBQYXNzIHRoZSBjdXJyZW50IHR1cm4gdG8gSHVtYW4gUGxheWVyIEdhbWUgQ29udHJvbGxlclxyXG4gIGhhbmRsZVBsYXllclR1cm4oKTtcclxufVxyXG5cclxuaGFuZGxlUGxheWVyVHVybigpO1xyXG4iXSwibmFtZXMiOlsiYm9hcmRDb21wb25lbnQiLCJ0aGVCb2FyZCIsInBsYXllciIsImZpZWxkU3RhdHVzIiwibWFwIiwicm93IiwiY29vcmRYIiwiY29sIiwiY29vcmRZIiwic3RhdHVzIiwiZ2V0RmllbGRTdGF0dXMiLCJqb2luIiwic2hpcHlhcmRDb21wb25lbnQiLCJ0aGVGbGVldCIsInNoaXAiLCJnZXROYW1lIiwiY29vcmRzIiwibGVuZ3RoIiwiQm9hcmQiLCJzaXplIiwiZmxlZXQiLCJBcnJheSIsIngiLCJqIiwiZmlsbCIsInkiLCJ0aGVTaGlwIiwiZm9yRWFjaCIsImNvb3JkIiwiZ2V0WCIsImdldFkiLCJFcnJvciIsInB1c2giLCJ0aGVDb29yZCIsImZpZWxkIiwiaGFzQ29vcmRpbmF0ZXMiLCJpc0hpdCIsImRlc3Ryb3llZFNoaXAiLCJmaW5kIiwiaGFzU3VuayIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsInVuZGVmaW5lZCIsIkNvb3JkaW5hdGUiLCJTaGlwIiwibmFtZSIsImF0Q29vcmQiLCJlcXVhbHMiLCJzb21lIiwicmFuZG9tSW50ZWdlciIsIm1pbiIsIm1heCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsInJlbmRlciIsInRlbXBsYXRlIiwibm9kZSIsImlubmVySFRNTCIsInJhbmRvbU51bWJlciIsInBsYXllckJvYXJkIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWVudUNvbnRhaW5lciIsImdhbWVDb250YWluZXIiLCJzaGlwcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhZGRFdmVudExpc3RlbmVyIiwiZHJhZ1N0YXJ0IiwiZSIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJ0YXJnZXQiLCJpZCIsImNlbGxzIiwiY2VsbCIsImRyYWdFbnRlciIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwiZHJvcCIsInByZXZlbnREZWZhdWx0Iiwic3R5bGUiLCJib3JkZXIiLCJnZXREYXRhIiwiZHJhZ2dhYmxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaGlwQ29vcmRzIiwicGFyc2VJbnQiLCJkYXRhc2V0IiwiY29vcmR4IiwiY29vcmR5Iiwic2hpcExlbmd0aCIsInNoaXBsZW5ndGgiLCJpIiwiY2FuUGxhY2VTaGlwIiwicGxhY2VTaGlwIiwiZGlzcGxheSIsIkFJQm9hcmQiLCJjcnVpc2VyMiIsInN1Ym1hcmluZTIiLCJkZXN0cm95ZXIyIiwiYmF0dGxlc2hpcDIiLCJjYXJyaWVyMiIsImhhbmRsZVBsYXllclR1cm4iLCJmcm9tIiwiU3RyaW5nIiwiTnVtYmVyIiwidW5zaGlmdCIsInBsYWNlU2hvdCIsImdldEZsZWV0U3RhdHVzIiwiaXNHYW1lT3ZlciIsInNldFRpbWVvdXQiLCJhbGVydCIsImhhbmRsZU9wcG9uZW50VHVybiIsImNhblBsYWNlU2hvdCIsImludmFsaWRTaG90Il0sInNvdXJjZVJvb3QiOiIifQ==