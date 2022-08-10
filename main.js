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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Header Styling */\r\n.primary-header {\r\n  background-color: var(--clr-light-gray);\r\n  padding: 0.5rem 3rem 0.5rem 3rem;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.author > a {\r\n  color: inherit;\r\n}\r\n\r\n/* Game Styling */\r\n.game {\r\n  flex: 1;\r\n\r\n  /* display: flex; */\r\n  display: none;\r\n\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.player {\r\n  \r\n\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n\r\n  width: 400px;\r\n}\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  min-width: 300px;\r\n  min-height: 300px;\r\n  flex: 1;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.labels-num > p {\r\n  flex: 1;\r\n  text-align: center;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell-1 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-cell-2 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-player-1 > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2 {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2  .occupied-not-hit {\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship-front {\r\n  height: 100%;\r\n  background-color: var(--clr-light-gray);\r\n  border-top-right-radius: 50%;\r\n  border-bottom-right-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-body {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-back {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n  border-top-left-radius: 50%;\r\n  border-bottom-left-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.hit {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-red);\r\n  border-radius: 50%;\r\n}\r\n\r\n.occupied-not-hit {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-1 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-blue);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-2 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n/* Menu Styling */\r\n.menu-container {\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.menu-container > .player_1 {\r\n  flex: none;\r\n  width: 400px;\r\n}\r\n\r\n.board-player-1-menu > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.ship {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship {\r\n  width: 140px;\r\n  height: 25px;\r\n\r\n  display: flex;\r\n}\r\n\r\n.ship > div {\r\n  flex: 1;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.circle {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.battleship {\r\n  width: 110px;\r\n  height: 25px;\r\n}\r\n\r\n.destroyer {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.submarine {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.cruiser {\r\n  width: 50px;\r\n  height: 25px;\r\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n  --clr-red: #ff0055;\r\n  --clr-blue: #61c6ff;\r\n  --clr-light-blue: #dff4ff;\r\n  --clr-dark-gray: #717c96;\r\n  --clr-gray: #909292;\r\n  --clr-light-gray: #ebebeb;\r\n  --clr-white: #ffffff;\r\n  --clr-black: #212121;\r\n}\r\n\r\n/* https://piccalil.li/blog/a-modern-css-reset */\r\n\r\n/* Box sizing rules */\r\n*,\r\n*::before,\r\n*::after {\r\n  box-sizing: border-box;\r\n}\r\n\r\n/* Remove default margin */\r\n* {\r\n  margin: 0;\r\n  padding: 0;\r\n  font: inherit;\r\n}\r\n\r\n/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */\r\nul[role=\"list\"],\r\nol[role=\"list\"] {\r\n  list-style: none;\r\n}\r\n\r\n/* Set core root defaults */\r\nhtml:focus-within {\r\n  scroll-behavior: smooth;\r\n}\r\n\r\nhtml,\r\nbody {\r\n  height: 100%;\r\n}\r\n\r\n/* Set core body defaults */\r\nbody {\r\n  min-height: 100vh;\r\n  text-rendering: optimizeSpeed;\r\n  line-height: 1.5;\r\n}\r\n\r\n/* A elements that don't have a class get default styles */\r\na:not([class]) {\r\n  text-decoration-skip-ink: auto;\r\n}\r\n\r\n/* Make images easier to work with */\r\nimg,\r\npicture {\r\n  max-width: 100%;\r\n  display: block;\r\n}\r\n\r\n/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */\r\n@media (prefers-reduced-motion: reduce) {\r\n  html:focus-within {\r\n    scroll-behavior: auto;\r\n  }\r\n\r\n  *,\r\n  *::before,\r\n  *::after {\r\n    animation-duration: 0.01ms !important;\r\n    animation-iteration-count: 1 !important;\r\n    transition-duration: 0.01ms !important;\r\n    scroll-behavior: auto !important;\r\n  }\r\n}\r\n\r\nbody {\r\n  font-family: Arial, Helvetica, sans-serif;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n/* Header Styling */\r\n.primary-header {\r\n  background-color: var(--clr-light-gray);\r\n  padding: 0.5rem 3rem 0.5rem 3rem;\r\n}\r\n\r\n.container {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n}\r\n\r\n.title {\r\n  font-size: 1.5rem;\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  color: var(--clr-black);\r\n}\r\n\r\n.subtitle {\r\n  font-size: 0.75rem;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.author {\r\n  color: var(--clr-black);\r\n  font-weight: bold;\r\n}\r\n\r\n.author > a {\r\n  color: inherit;\r\n}\r\n\r\n/* Game Styling */\r\n.game {\r\n  flex: 1;\r\n\r\n  /* display: flex; */\r\n  display: none;\r\n\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.player {\r\n  \r\n\r\n  padding: 1.5rem 3rem 1.5rem 3rem;\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1rem;\r\n\r\n  width: 400px;\r\n}\r\n\r\n.player_1 > h2 {\r\n  background-color: var(--clr-red);\r\n}\r\n\r\n.player_2 > h2 {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.player-title {\r\n  text-align: center;\r\n  color: var(--clr-white);\r\n  font-weight: bold;\r\n  text-transform: uppercase;\r\n  font-size: 0.75rem;\r\n  padding: 0.5rem;\r\n  border-radius: 0.25rem;\r\n  letter-spacing: 2px;\r\n}\r\n\r\n.board-container {\r\n  min-width: 300px;\r\n  min-height: 300px;\r\n  flex: 1;\r\n\r\n  display: grid;\r\n  grid-template-areas:\r\n    \"blank labels-char labels-char\"\r\n    \"labels-num board board\"\r\n    \"labels-num board board\";\r\n  grid-template-columns: auto 1fr 1fr;\r\n  grid-template-rows: auto 1fr 1fr;\r\n  gap: 5px;\r\n}\r\n\r\n.blank-div {\r\n  grid-area: blank;\r\n}\r\n\r\n.labels-num {\r\n  grid-area: labels-num;\r\n\r\n  font-weight: bold;\r\n  font-size: 1rem;\r\n  text-align: center;\r\n  color: var(--clr-dark-gray);\r\n\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.labels-char {\r\n  grid-area: labels-char;\r\n\r\n  font-size: 1rem;\r\n  color: var(--clr-dark-gray);\r\n  font-weight: bold;\r\n\r\n  display: flex;\r\n}\r\n\r\n.labels-char > p {\r\n  flex: 1;\r\n  text-align: center;\r\n}\r\n\r\n.labels-num > p {\r\n  flex: 1;\r\n  text-align: center;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board {\r\n  grid-area: board;\r\n\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n}\r\n\r\n.board-cell-1 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-cell-2 {\r\n  height: 100%;\r\n  width: 100%;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.board-player-1 > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2 > .board-cell-2 {\r\n  background-color: var(--clr-light-gray);\r\n  border: 1px solid white;\r\n  cursor: crosshair;\r\n}\r\n\r\n.board-player-2  .occupied-not-hit {\r\n  background-color: var(--clr-light-gray);\r\n}\r\n\r\n.shipyard {\r\n  display: flex;\r\n  gap: 1rem;\r\n}\r\n\r\n.shipyard > h3 {\r\n  writing-mode: vertical-rl;\r\n  text-orientation: sideways;\r\n  transform: rotate(180deg);\r\n  text-transform: uppercase;\r\n  font-size: 0.7rem;\r\n  font-weight: bold;\r\n  letter-spacing: 3px;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ships {\r\n  display: grid;\r\n  grid-template-columns: 1fr 1fr;\r\n  column-gap: 1rem;\r\n  justify-content: center;\r\n\r\n  font-size: 0.8rem;\r\n  font-weight: bold;\r\n  text-transform: capitalize;\r\n  color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship-front {\r\n  height: 100%;\r\n  background-color: var(--clr-light-gray);\r\n  border-top-right-radius: 50%;\r\n  border-bottom-right-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-body {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.ship-back {\r\n  background-color: var(--clr-light-gray);\r\n  height: 100%;\r\n  border-top-left-radius: 50%;\r\n  border-bottom-left-radius: 50%;\r\n\r\n  flex: 1;\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.hit {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-red);\r\n  border-radius: 50%;\r\n}\r\n\r\n.occupied-not-hit {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-1 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-blue);\r\n  border-radius: 50%;\r\n}\r\n\r\n.hit-missed-player-2 {\r\n  height: 50%;\r\n  width: 50%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n/* Menu Styling */\r\n.menu-container {\r\n  height: 100%;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.menu-container > .player_1 {\r\n  flex: none;\r\n  width: 400px;\r\n}\r\n\r\n.board-player-1-menu > .board-cell-1 {\r\n  background-color: var(--clr-light-blue);\r\n  border: 1px solid white;\r\n}\r\n\r\n.ship {\r\n  background-color: var(--clr-dark-gray);\r\n}\r\n\r\n.ship {\r\n  width: 140px;\r\n  height: 25px;\r\n\r\n  display: flex;\r\n}\r\n\r\n.ship > div {\r\n  flex: 1;\r\n  background-color: var(--clr-light-gray);\r\n\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n}\r\n\r\n.circle {\r\n  height: 40%;\r\n  width: 40%;\r\n  background-color: var(--clr-gray);\r\n  border-radius: 50%;\r\n}\r\n\r\n.battleship {\r\n  width: 110px;\r\n  height: 25px;\r\n}\r\n\r\n.destroyer {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.submarine {\r\n  width: 80px;\r\n  height: 25px;\r\n}\r\n\r\n.cruiser {\r\n  width: 50px;\r\n  height: 25px;\r\n}"],"sourceRoot":""}]);
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
var carrierElement = document.querySelector(".carrier");
var battleshipElement = document.querySelector(".battleship");
var destroyerElement = document.querySelector(".destroyer");
var submarineElement = document.querySelector(".submarine");
var cruiserElement = document.querySelector(".cruiser");
carrierElement.addEventListener("dragstart", dragStart);
battleshipElement.addEventListener("dragstart", dragStart);
destroyerElement.addEventListener("dragstart", dragStart);
submarineElement.addEventListener("dragstart", dragStart);
cruiserElement.addEventListener("dragstart", dragStart);

function dragStart(e) {
  console.log('drag starts...');
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
  e.target.classList.add('drag-over');
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

function dragLeave(e) {
  e.target.classList.remove('drag-over');
}

function drop(e) {
  e.target.classList.remove('drag-over');
  var id = e.dataTransfer.getData('text/plain');
  var draggable = document.getElementById(id);
  var shipCoords = [];
  var coordX = parseInt(e.target.dataset.coordx);
  var coordY = parseInt(e.target.dataset.coordy);
  var shipLength = draggable.dataset.shiplength;

  for (var i = 0; i < shipLength; i++) {
    shipCoords.push(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coordX, coordY + i));
  }

  console.log(shipCoords);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLFlBQVksVUFBVSxPQUFPLE9BQU8sYUFBYSxhQUFhLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLGFBQWEsYUFBYSxXQUFXLFlBQVksY0FBYyxXQUFXLFlBQVksT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLGNBQWMsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLGFBQWEsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxjQUFjLFlBQVksVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsWUFBWSxjQUFjLFlBQVksVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLGFBQWEs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QUssNEJBQVg7SUFBQSxDQUFELEVBQTBDLEdBQTFDLENBQWpCO0VBQ0QsQ0E3QjJCLENBK0I1Qjs7O0VBQ0FULGdCQUFnQjtBQUNqQjs7QUFFREEsZ0JBQWdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvYm9hcmRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0JvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0Nvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpYi9yYW5kb21OdW1iZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9saWIvcmVuZGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBib2FyZENvbXBvbmVudCh0aGVCb2FyZCwgcGxheWVyKSB7XHJcbiAgcmV0dXJuIHRoZUJvYXJkLmZpZWxkU3RhdHVzLm1hcCgocm93LCBjb29yZFgpID0+XHJcbiAgICAgIHJvdy5tYXAoKGNvbCwgY29vcmRZKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzdGF0dXMgPSB0aGVCb2FyZC5nZXRGaWVsZFN0YXR1cyhjb29yZFgsIGNvb3JkWSk7XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1jZWxsLSR7cGxheWVyfVwiIGRhdGEtY29vcmR4PVwiJHtjb29yZFh9XCIgZGF0YS1jb29yZHk9XCIke2Nvb3JkWX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaXQtbWlzc2VkLXBsYXllci0xXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKHN0YXR1cyA9PT0gMikge1xyXG4gICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib2FyZC1jZWxsLSR7cGxheWVyfVwiIGRhdGEtY29vcmR4PVwiJHtjb29yZFh9XCIgZGF0YS1jb29yZHk9XCIke2Nvb3JkWX1cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaGlwLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm9jY3VwaWVkLW5vdC1oaXRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzdGF0dXMgPT09IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9hcmQtY2VsbC0ke3BsYXllcn1cIiBkYXRhLWNvb3JkeD1cIiR7Y29vcmRYfVwiIGRhdGEtY29vcmR5PVwiJHtjb29yZFl9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hpcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoaXRcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cImJvYXJkLWNlbGwtJHtwbGF5ZXJ9XCIgZGF0YS1jb29yZHg9XCIke2Nvb3JkWH1cIiBkYXRhLWNvb3JkeT1cIiR7Y29vcmRZfVwiPjwvZGl2PmA7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuam9pbihcIlwiKVxyXG4gICAgKVxyXG4gICAgLmpvaW4oXCJcIik7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2hpcHlhcmRDb21wb25lbnQodGhlRmxlZXQpIHtcclxuICByZXR1cm4gdGhlRmxlZXQubWFwKChzaGlwKSA9PiB7XHJcbiAgICByZXR1cm4gYDxwPiR7c2hpcC5nZXROYW1lKCl9ICgke3NoaXAuY29vcmRzLmxlbmd0aH0pPC9wPmA7XHJcbiAgfSkuam9pbihcIlwiKTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBCb2FyZCB7XHJcbiAgY29uc3RydWN0b3Ioc2l6ZSkge1xyXG4gICAgLy8gU2l6ZSBvZiBib2FyZCBncmlkXHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQW4gYXJyYXkgZm9yIHN0b3JpbmcgdGhlIHNoaXBzXHJcbiAgICAgKiBLZWVwIHRyYWNrIGl0cyBuYW1lcyBhbmQgc3RhdHVzIChoaXQgb3Igc3VuaylcclxuICAgICAqL1xyXG4gICAgdGhpcy5mbGVldCA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRmllbGQgc3RhdHVzIGFycmF5XHJcbiAgICAgKiAwOiBlbXB0eSwgbm90IGhpdFxyXG4gICAgICogMTogZW1wdHksIGJ1dCBoaXRcclxuICAgICAqIDI6IG5vdCBlbXB0eSwgbm90IGhpdFxyXG4gICAgICogMzogbm90IGVtcHR5LCBidXQgaGl0XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZmllbGRTdGF0dXMgPSBbLi4uQXJyYXkoc2l6ZSldLm1hcCgoeCwgaikgPT4gQXJyYXkoc2l6ZSkuZmlsbCgwKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgZmllbGQgc3RhdHVzXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHggY29vcmRpbmF0ZVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5IGNvb3JkaW5hdGVcclxuICAgKiBAcmV0dXJucyB0aGUgc3RhdHVzIG9mIHgsIHkgZmllbGRcclxuICAgKi9cclxuICBnZXRGaWVsZFN0YXR1cyh4LCB5KSB7XHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGl0J3MgT0sgdG8gcGxhY2Ugc2hpcFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0aGVTaGlwIG9iamVjdFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgc2hpcCBjYW4gYmUgcGxhY2VkLCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBjYW5QbGFjZVNoaXAodGhlU2hpcCkge1xyXG4gICAgWy4uLnRoZVNoaXAuY29vcmRzXS5mb3JFYWNoKChjb29yZCkgPT4ge1xyXG4gICAgICBjb25zdCB4ID0gY29vcmQuZ2V0WCgpO1xyXG4gICAgICBjb25zdCB5ID0gY29vcmQuZ2V0WSgpO1xyXG5cclxuICAgICAgaWYgKHggPj0gdGhpcy5zaXplIHx8IHkgPj0gdGhpcy5zaXplKSB0aHJvdyBuZXcgRXJyb3IoYE91dCBvZiBjb3ZlcmVkIGFyZWFgKTtcclxuXHJcbiAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBpbiB0aGlzIGZpZWxkXHJcbiAgICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldICE9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlcyBhIHNoaXAgb24gdGhlIGJvYXJkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZVNoaXAgb2JqZWN0XHJcbiAgICovXHJcbiAgcGxhY2VTaGlwKHRoZVNoaXApIHtcclxuICAgIFsuLi50aGVTaGlwLmNvb3Jkc10uZm9yRWFjaCgoY29vcmQpID0+IHtcclxuICAgICAgY29uc3QgeCA9IGNvb3JkLmdldFgoKTtcclxuICAgICAgY29uc3QgeSA9IGNvb3JkLmdldFkoKTtcclxuXHJcbiAgICAgIC8vIElmIHNoaXAgaXMgYWxyZWFkeSBpbiB0aGlzIGZpZWxkXHJcbiAgICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldICE9PSAwKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmllbGQgaXMgYWxyZWFkeSBvY2N1cGllZFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gU2V0IGZpZWxkcyB0byBub3QgZW1wdHksIG5vdCBoaXRcclxuICAgICAgdGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9IDI7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLmZsZWV0LnB1c2godGhlU2hpcCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBpdCdzIE9LIHRvIHBsYWNlIHNob3RcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlQ29vcmQgdG8gaGl0XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBPSyB0byBwbGFjZSBzaG90LCBmYWxzZSBpZiBub3RcclxuICAgKi9cclxuICBjYW5QbGFjZVNob3QodGhlQ29vcmQpIHtcclxuICAgIGNvbnN0IHggPSB0aGVDb29yZC5nZXRYKCk7XHJcbiAgICBjb25zdCB5ID0gdGhlQ29vcmQuZ2V0WSgpO1xyXG4gICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG5cclxuICAgIC8vIElmIGZpZWxkIHZhbHVlIGlzIDAgb3IgMiwgaXQncyBPSyB0byBzaG9vdFxyXG4gICAgaWYgKGZpZWxkID09PSAwIHx8IGZpZWxkID09PSAyKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGFjZXMgc2hvdCBvbiB0aGUgYm9hcmRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlQ29vcmQgdG8gaGl0XHJcbiAgICogQHJldHVybnMgdGhlIHJlc3VsdCAoMSBvciAzIC0gdGhlIHR3byBwb3NzaWJsZSBvdXRjb21lcylcclxuICAgKi9cclxuICBwbGFjZVNob3QodGhlQ29vcmQpIHtcclxuICAgIGNvbnN0IHggPSB0aGVDb29yZC5nZXRYKCk7XHJcbiAgICBjb25zdCB5ID0gdGhlQ29vcmQuZ2V0WSgpO1xyXG5cclxuICAgIGlmICh0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAwKSB7XHJcbiAgICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAxO1xyXG4gICAgICByZXR1cm4gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9PT0gMSB8fCB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID09PSAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpZWxkIGhhcyBhbHJlYWR5IGJlZW4gaGl0XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAzO1xyXG5cclxuICAgIC8vIFdlIGhhdmUgYSBzdWNjZXNzZnVsIHNob3QsIGFuZCB0aGUgc2hpcCBtdXN0IHJlbWVtYmVyIHRoYXQgaXQgaGFzIGJlZW4gaGl0XHJcbiAgICB0aGlzLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgaWYgKHNoaXAuaGFzQ29vcmRpbmF0ZXModGhlQ29vcmQpKSBzaGlwLmlzSGl0KHRoZUNvb3JkKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyB0aGUgbmFtZSBvZiBhIHNoaXAgaWYgaXQgd2FzIGRlc3Ryb3llZCBhbmQgcmVtb3ZlIGl0IGZyb20gZmxlZXRcclxuICAgKiBUaGlzIG1ldGhvZCBtdXN0IGJlIGNhbGxlZCBhZnRlciBldmVyeSBzaG90XHJcbiAgICogQHJldHVybnMgdGhlIG5hbWUgb2YgdGhlIHNoaXAgdGhhdCBoYXMgYmVlbiBkZXN0cm95ZWQgKGlmIGhhc1N1bmsgcmV0dXJuIHRydWUpLFxyXG4gICAqIE9yIGFuIGVtcHR5IHN0cmluZyBpcyBzaGlwIHdhcyBub3QgZGVzdHJveWVkXHJcbiAgICovXHJcbiAgZ2V0RmxlZXRTdGF0dXMoKSB7XHJcbiAgICBjb25zdCBkZXN0cm95ZWRTaGlwID0gdGhpcy5mbGVldC5maW5kKChzaGlwKSA9PiBzaGlwLmhhc1N1bmsoKSk7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZmxlZXQuaW5kZXhPZihkZXN0cm95ZWRTaGlwKTtcclxuXHJcbiAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5mbGVldC5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgIHJldHVybiBkZXN0cm95ZWRTaGlwID09PSB1bmRlZmluZWQgPyBcIlwiIDogZGVzdHJveWVkU2hpcC5nZXROYW1lKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHYW1lIGlzIG92ZXIgaWYgZmxlZXQgYXJyYXkgaXMgZW1wdHlcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIGdhbWUgaXMgb3ZlciwgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgaXNHYW1lT3ZlcigpIHtcclxuICAgIGlmICh0aGlzLmZsZWV0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBDb29yZGluYXRlIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3RzIGEgY29vcmRpbmF0ZSBzZXRcclxuICAgKiBAcGFyYW0ge051bWJlcn0geFxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB5XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoeCwgeSkge1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdmFsdWUgb2YgeCBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHggdmFsdWUgb2YgdGhpcyBjb29yZGluYXRlXHJcbiAgICovXHJcbiAgZ2V0WCgpIHtcclxuICAgIHJldHVybiB0aGlzLng7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdmFsdWUgb2YgeSBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHkgdmFsdWUgb2YgdGhpcyBjb29yZGluYXRlXHJcbiAgICovXHJcbiAgZ2V0WSgpIHtcclxuICAgIHJldHVybiB0aGlzLnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUZXN0IHRoaXMgY29vcmRpbmF0ZSBmb3IgZXF1YWxpdHkgd2l0aCB0aGUgU2hpcCdzIGNvb3JkaW5hdGVcclxuICAgKiBAcGFyYW0ge09iamVjdH0gY29vcmQgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIHRydWUgb3IgZmFsc2VcclxuICAgKi9cclxuICBlcXVhbHMoY29vcmQpIHtcclxuICAgIGlmICh0aGlzLnggPT09IGNvb3JkLmdldFgoKSAmJiB0aGlzLnkgPT09IGNvb3JkLmdldFkoKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcclxuICAvKipcclxuICAgKiBDb25zdHJ1Y3QgYSBzaGlwIG9mIGdpdmVuIGNvb3JkcyBhbmQgbmFtZVxyXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvb3Jkc1xyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoY29vcmRzLCBuYW1lKSB7XHJcbiAgICB0aGlzLmNvb3JkcyA9IFsuLi5jb29yZHNdO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZ2lzdGVycyB0aGF0IHRoZSBzaGlwIGhhcyBiZWVuIGhpdFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdENvb3JkXHJcbiAgICovXHJcbiAgaXNIaXQoYXRDb29yZCkge1xyXG4gICAgdGhpcy5jb29yZHMuZm9yRWFjaCgoY29vcmQsIGluZGV4KSA9PiB7XHJcbiAgICAgIGlmIChjb29yZC5lcXVhbHMoYXRDb29yZCkpIHtcclxuICAgICAgICB0aGlzLmNvb3Jkcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyBpZiB0aGVyZSBhcmUgYW55IHBhcnRzIGxlZnQgb2YgdGhpcyBzaGlwXHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiB0aGVyZSBhcmUgbm8gbW9yZSBjb29yZGluYXRlcyAtIGhlbmNlIHRoZSBzaGlwIGlzIGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIGhhc1N1bmsoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb29yZHMubGVuZ3RoID09PSAwO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVzdHMgd2hldGhlciB0aGlzIHNoaXAgaXMgcGxhY2VkIG9uIHRoZXNlIGNvb3JkaW5hdGVzXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0Q29vcmQgdG8gdGVzdFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgc2hpcCBpcyBvbiB0aGVzZSBjb29yZGluYXRlcywgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgaGFzQ29vcmRpbmF0ZXMoYXRDb29yZCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29vcmRzLnNvbWUoKGNvb3JkKSA9PiB7XHJcbiAgICAgIHJldHVybiBjb29yZC5lcXVhbHMoYXRDb29yZCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbmFtZSBvZiB0aGUgc2hpcFxyXG4gICAqIEByZXR1cm5zIHRoZSB2YWx1ZSBvZiB0aGUgbmFtZSB2YXJpYWJsZVxyXG4gICAqL1xyXG4gIGdldE5hbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuIiwiY29uc3QgcmVuZGVyID0gKHRlbXBsYXRlLCBub2RlKSA9PiB7XHJcbiAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcclxcbiAgLS1jbHItcmVkOiAjZmYwMDU1O1xcclxcbiAgLS1jbHItYmx1ZTogIzYxYzZmZjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWJsdWU6ICNkZmY0ZmY7XFxyXFxuICAtLWNsci1kYXJrLWdyYXk6ICM3MTdjOTY7XFxyXFxuICAtLWNsci1ncmF5OiAjOTA5MjkyO1xcclxcbiAgLS1jbHItbGlnaHQtZ3JheTogI2ViZWJlYjtcXHJcXG4gIC0tY2xyLXdoaXRlOiAjZmZmZmZmO1xcclxcbiAgLS1jbHItYmxhY2s6ICMyMTIxMjE7XFxyXFxufVxcclxcblxcclxcbi8qIGh0dHBzOi8vcGljY2FsaWwubGkvYmxvZy9hLW1vZGVybi1jc3MtcmVzZXQgKi9cXHJcXG5cXHJcXG4vKiBCb3ggc2l6aW5nIHJ1bGVzICovXFxyXFxuKixcXHJcXG4qOjpiZWZvcmUsXFxyXFxuKjo6YWZ0ZXIge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2luICovXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgZm9udDogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGxpc3Qgc3R5bGVzIG9uIHVsLCBvbCBlbGVtZW50cyB3aXRoIGEgbGlzdCByb2xlLCB3aGljaCBzdWdnZXN0cyBkZWZhdWx0IHN0eWxpbmcgd2lsbCBiZSByZW1vdmVkICovXFxyXFxudWxbcm9sZT1cXFwibGlzdFxcXCJdLFxcclxcbm9sW3JvbGU9XFxcImxpc3RcXFwiXSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSByb290IGRlZmF1bHRzICovXFxyXFxuaHRtbDpmb2N1cy13aXRoaW4ge1xcclxcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIFNldCBjb3JlIGJvZHkgZGVmYXVsdHMgKi9cXHJcXG5ib2R5IHtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBBIGVsZW1lbnRzIHRoYXQgZG9uJ3QgaGF2ZSBhIGNsYXNzIGdldCBkZWZhdWx0IHN0eWxlcyAqL1xcclxcbmE6bm90KFtjbGFzc10pIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbi1za2lwLWluazogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyogTWFrZSBpbWFnZXMgZWFzaWVyIHRvIHdvcmsgd2l0aCAqL1xcclxcbmltZyxcXHJcXG5waWN0dXJlIHtcXHJcXG4gIG1heC13aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZW1vdmUgYWxsIGFuaW1hdGlvbnMsIHRyYW5zaXRpb25zIGFuZCBzbW9vdGggc2Nyb2xsIGZvciBwZW9wbGUgdGhhdCBwcmVmZXIgbm90IHRvIHNlZSB0aGVtICovXFxyXFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcXHJcXG4gIGh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgKixcXHJcXG4gICo6OmJlZm9yZSxcXHJcXG4gICo6OmFmdGVyIHtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMSAhaW1wb3J0YW50O1xcclxcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvICFpbXBvcnRhbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLyogSGVhZGVyIFN0eWxpbmcgKi9cXHJcXG4ucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgcGFkZGluZzogMC41cmVtIDNyZW0gMC41cmVtIDNyZW07XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi50aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItYmxhY2spO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VidGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItYmxhY2spO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3IgPiBhIHtcXHJcXG4gIGNvbG9yOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHYW1lIFN0eWxpbmcgKi9cXHJcXG4uZ2FtZSB7XFxyXFxuICBmbGV4OiAxO1xcclxcblxcclxcbiAgLyogZGlzcGxheTogZmxleDsgKi9cXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuXFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXIge1xcclxcbiAgXFxyXFxuXFxyXFxuICBwYWRkaW5nOiAxLjVyZW0gM3JlbSAxLjVyZW0gM3JlbTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgd2lkdGg6IDQwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzEgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8yID4gaDIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXItdGl0bGUge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICBtaW4td2lkdGg6IDMwMHB4O1xcclxcbiAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICBmbGV4OiAxO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxyXFxuICAgIFxcXCJibGFuayBsYWJlbHMtY2hhciBsYWJlbHMtY2hhclxcXCJcXHJcXG4gICAgXFxcImxhYmVscy1udW0gYm9hcmQgYm9hcmRcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byAxZnIgMWZyO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciAxZnI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsYW5rLWRpdiB7XFxyXFxuICBncmlkLWFyZWE6IGJsYW5rO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLW51bSB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1udW07XFxyXFxuXFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtY2hhcjtcXHJcXG5cXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1jaGFyID4gcCB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLW51bSA+IHAge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZCB7XFxyXFxuICBncmlkLWFyZWE6IGJvYXJkO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNlbGwtMiB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMSA+IC5ib2FyZC1jZWxsLTEge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWJsdWUpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0yID4gLmJvYXJkLWNlbGwtMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgIC5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5zaGlweWFyZCA+IGgzIHtcXHJcXG4gIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxyXFxuICB0ZXh0LW9yaWVudGF0aW9uOiBzaWRld2F5cztcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAzcHg7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1mcm9udCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1iYWNrIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4ub2NjdXBpZWQtbm90LWhpdCB7XFxyXFxuICBoZWlnaHQ6IDQwJTtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5oaXQtbWlzc2VkLXBsYXllci0xIHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ibHVlKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTIge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNZW51IFN0eWxpbmcgKi9cXHJcXG4ubWVudS1jb250YWluZXIge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnBsYXllcl8xIHtcXHJcXG4gIGZsZXg6IG5vbmU7XFxyXFxuICB3aWR0aDogNDAwcHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMS1tZW51ID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gIHdpZHRoOiAxNDBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwID4gZGl2IHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhdHRsZXNoaXAge1xcclxcbiAgd2lkdGg6IDExMHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzdHJveWVyIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWFyaW5lIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3J1aXNlciB7XFxyXFxuICB3aWR0aDogNTBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLHdCQUF3QjtFQUN4QixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLG9CQUFvQjtFQUNwQixvQkFBb0I7QUFDdEI7O0FBRUEsZ0RBQWdEOztBQUVoRCxxQkFBcUI7QUFDckI7OztFQUdFLHNCQUFzQjtBQUN4Qjs7QUFFQSwwQkFBMEI7QUFDMUI7RUFDRSxTQUFTO0VBQ1QsVUFBVTtFQUNWLGFBQWE7QUFDZjs7QUFFQSwyR0FBMkc7QUFDM0c7O0VBRUUsZ0JBQWdCO0FBQ2xCOztBQUVBLDJCQUEyQjtBQUMzQjtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTs7RUFFRSxZQUFZO0FBQ2Q7O0FBRUEsMkJBQTJCO0FBQzNCO0VBQ0UsaUJBQWlCO0VBQ2pCLDZCQUE2QjtFQUM3QixnQkFBZ0I7QUFDbEI7O0FBRUEsMERBQTBEO0FBQzFEO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBLG9DQUFvQztBQUNwQzs7RUFFRSxlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQSxn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XCI6W1wiOnJvb3Qge1xcclxcbiAgLS1jbHItcmVkOiAjZmYwMDU1O1xcclxcbiAgLS1jbHItYmx1ZTogIzYxYzZmZjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWJsdWU6ICNkZmY0ZmY7XFxyXFxuICAtLWNsci1kYXJrLWdyYXk6ICM3MTdjOTY7XFxyXFxuICAtLWNsci1ncmF5OiAjOTA5MjkyO1xcclxcbiAgLS1jbHItbGlnaHQtZ3JheTogI2ViZWJlYjtcXHJcXG4gIC0tY2xyLXdoaXRlOiAjZmZmZmZmO1xcclxcbiAgLS1jbHItYmxhY2s6ICMyMTIxMjE7XFxyXFxufVxcclxcblxcclxcbi8qIGh0dHBzOi8vcGljY2FsaWwubGkvYmxvZy9hLW1vZGVybi1jc3MtcmVzZXQgKi9cXHJcXG5cXHJcXG4vKiBCb3ggc2l6aW5nIHJ1bGVzICovXFxyXFxuKixcXHJcXG4qOjpiZWZvcmUsXFxyXFxuKjo6YWZ0ZXIge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGRlZmF1bHQgbWFyZ2luICovXFxyXFxuKiB7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgZm9udDogaW5oZXJpdDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGxpc3Qgc3R5bGVzIG9uIHVsLCBvbCBlbGVtZW50cyB3aXRoIGEgbGlzdCByb2xlLCB3aGljaCBzdWdnZXN0cyBkZWZhdWx0IHN0eWxpbmcgd2lsbCBiZSByZW1vdmVkICovXFxyXFxudWxbcm9sZT1cXFwibGlzdFxcXCJdLFxcclxcbm9sW3JvbGU9XFxcImxpc3RcXFwiXSB7XFxyXFxuICBsaXN0LXN0eWxlOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSByb290IGRlZmF1bHRzICovXFxyXFxuaHRtbDpmb2N1cy13aXRoaW4ge1xcclxcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XFxyXFxufVxcclxcblxcclxcbmh0bWwsXFxyXFxuYm9keSB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi8qIFNldCBjb3JlIGJvZHkgZGVmYXVsdHMgKi9cXHJcXG5ib2R5IHtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcclxcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplU3BlZWQ7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBBIGVsZW1lbnRzIHRoYXQgZG9uJ3QgaGF2ZSBhIGNsYXNzIGdldCBkZWZhdWx0IHN0eWxlcyAqL1xcclxcbmE6bm90KFtjbGFzc10pIHtcXHJcXG4gIHRleHQtZGVjb3JhdGlvbi1za2lwLWluazogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLyogTWFrZSBpbWFnZXMgZWFzaWVyIHRvIHdvcmsgd2l0aCAqL1xcclxcbmltZyxcXHJcXG5waWN0dXJlIHtcXHJcXG4gIG1heC13aWR0aDogMTAwJTtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZW1vdmUgYWxsIGFuaW1hdGlvbnMsIHRyYW5zaXRpb25zIGFuZCBzbW9vdGggc2Nyb2xsIGZvciBwZW9wbGUgdGhhdCBwcmVmZXIgbm90IHRvIHNlZSB0aGVtICovXFxyXFxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcXHJcXG4gIGh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgKixcXHJcXG4gICo6OmJlZm9yZSxcXHJcXG4gICo6OmFmdGVyIHtcXHJcXG4gICAgYW5pbWF0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogMSAhaW1wb3J0YW50O1xcclxcbiAgICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjAxbXMgIWltcG9ydGFudDtcXHJcXG4gICAgc2Nyb2xsLWJlaGF2aW9yOiBhdXRvICFpbXBvcnRhbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLyogSGVhZGVyIFN0eWxpbmcgKi9cXHJcXG4ucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWdyYXkpO1xcclxcbiAgcGFkZGluZzogMC41cmVtIDNyZW0gMC41cmVtIDNyZW07XFxyXFxufVxcclxcblxcclxcbi5jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi50aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDEuNXJlbTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItYmxhY2spO1xcclxcbn1cXHJcXG5cXHJcXG4uc3VidGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItYmxhY2spO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3IgPiBhIHtcXHJcXG4gIGNvbG9yOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBHYW1lIFN0eWxpbmcgKi9cXHJcXG4uZ2FtZSB7XFxyXFxuICBmbGV4OiAxO1xcclxcblxcclxcbiAgLyogZGlzcGxheTogZmxleDsgKi9cXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuXFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXIge1xcclxcbiAgXFxyXFxuXFxyXFxuICBwYWRkaW5nOiAxLjVyZW0gM3JlbSAxLjVyZW0gM3JlbTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgd2lkdGg6IDQwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzEgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcl8yID4gaDIge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXItdGl0bGUge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBwYWRkaW5nOiAwLjVyZW07XFxyXFxuICBib3JkZXItcmFkaXVzOiAwLjI1cmVtO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNvbnRhaW5lciB7XFxyXFxuICBtaW4td2lkdGg6IDMwMHB4O1xcclxcbiAgbWluLWhlaWdodDogMzAwcHg7XFxyXFxuICBmbGV4OiAxO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxyXFxuICAgIFxcXCJibGFuayBsYWJlbHMtY2hhciBsYWJlbHMtY2hhclxcXCJcXHJcXG4gICAgXFxcImxhYmVscy1udW0gYm9hcmQgYm9hcmRcXFwiXFxyXFxuICAgIFxcXCJsYWJlbHMtbnVtIGJvYXJkIGJvYXJkXFxcIjtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogYXV0byAxZnIgMWZyO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciAxZnI7XFxyXFxuICBnYXA6IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJsYW5rLWRpdiB7XFxyXFxuICBncmlkLWFyZWE6IGJsYW5rO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLW51bSB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1udW07XFxyXFxuXFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIge1xcclxcbiAgZ3JpZC1hcmVhOiBsYWJlbHMtY2hhcjtcXHJcXG5cXHJcXG4gIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmxhYmVscy1jaGFyID4gcCB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLW51bSA+IHAge1xcclxcbiAgZmxleDogMTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZCB7XFxyXFxuICBncmlkLWFyZWE6IGJvYXJkO1xcclxcblxcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAxZnIpO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbC0xIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLWNlbGwtMiB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMSA+IC5ib2FyZC1jZWxsLTEge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWxpZ2h0LWJsdWUpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxyXFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0yID4gLmJvYXJkLWNlbGwtMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgIC5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5zaGlweWFyZCA+IGgzIHtcXHJcXG4gIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxyXFxuICB0ZXh0LW9yaWVudGF0aW9uOiBzaWRld2F5cztcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAzcHg7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1mcm9udCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1iYWNrIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4ub2NjdXBpZWQtbm90LWhpdCB7XFxyXFxuICBoZWlnaHQ6IDQwJTtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5oaXQtbWlzc2VkLXBsYXllci0xIHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ibHVlKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTIge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNZW51IFN0eWxpbmcgKi9cXHJcXG4ubWVudS1jb250YWluZXIge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLm1lbnUtY29udGFpbmVyID4gLnBsYXllcl8xIHtcXHJcXG4gIGZsZXg6IG5vbmU7XFxyXFxuICB3aWR0aDogNDAwcHg7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMS1tZW51ID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gIHdpZHRoOiAxNDBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwID4gZGl2IHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhdHRsZXNoaXAge1xcclxcbiAgd2lkdGg6IDExMHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzdHJveWVyIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWFyaW5lIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3J1aXNlciB7XFxyXFxuICB3aWR0aDogNTBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL0JvYXJkXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2ZhY3Rvcmllcy9TaGlwXCI7XHJcbmltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2ZhY3Rvcmllcy9Db29yZGluYXRlXCI7XHJcbmltcG9ydCBib2FyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL2JvYXJkQ29tcG9uZW50XCI7XHJcbmltcG9ydCBzaGlweWFyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50XCI7XHJcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5pbXBvcnQgcmFuZG9tTnVtYmVyIGZyb20gXCIuL2xpYi9yYW5kb21OdW1iZXJcIjtcclxuXHJcbi8vIEluaXRpYWxpemF0aW9uIG9mIEh1bWFuIFBsYXllciBCb2FyZCBhbmQgU2hpcHNcclxuY29uc3QgcGxheWVyQm9hcmQgPSBuZXcgQm9hcmQoMTApO1xyXG5cclxuLy8gUmVuZGVyIHRvIHRoZSBET00gdGhlIGluaXRpYWwgSHVtYW4gUGxheWVyIEJvYXJkIFN0YXRlXHJcbnJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTFcIikpO1xyXG5yZW5kZXIoYm9hcmRDb21wb25lbnQocGxheWVyQm9hcmQsIDEpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXBsYXllci0xLW1lbnVcIikpO1xyXG5cclxuY29uc3QgbWVudUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWVudS1jb250YWluZXJcIik7XHJcbmNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVcIik7XHJcblxyXG5jb25zdCBjYXJyaWVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FycmllclwiKTtcclxuY29uc3QgYmF0dGxlc2hpcEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhdHRsZXNoaXBcIik7XHJcbmNvbnN0IGRlc3Ryb3llckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlc3Ryb3llclwiKTtcclxuY29uc3Qgc3VibWFyaW5lRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWFyaW5lXCIpO1xyXG5jb25zdCBjcnVpc2VyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3J1aXNlclwiKTtcclxuXHJcbmNhcnJpZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcclxuYmF0dGxlc2hpcEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpO1xyXG5kZXN0cm95ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcclxuc3VibWFyaW5lRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIGRyYWdTdGFydCk7XHJcbmNydWlzZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcclxuXHJcbmZ1bmN0aW9uIGRyYWdTdGFydChlKSB7XHJcbiAgY29uc29sZS5sb2coJ2RyYWcgc3RhcnRzLi4uJyk7XHJcbiAgXHJcbiAgZS5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgZS50YXJnZXQuaWQpO1xyXG59XHJcblxyXG5jb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY2VsbC0xXCIpO1xyXG5cclxuY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcilcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xyXG4gIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgZHJhZ0xlYXZlKTtcclxuICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBkcm9wKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkcmFnLW92ZXInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ0xlYXZlKGUpIHtcclxuICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkcmFnLW92ZXInKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvcChlKSB7XHJcbiAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZHJhZy1vdmVyJyk7XHJcblxyXG4gIGNvbnN0IGlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gIGNvbnN0IGRyYWdnYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgbGV0IHNoaXBDb29yZHMgPSBbXTtcclxuICBsZXQgY29vcmRYID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb29yZHgpO1xyXG4gIGxldCBjb29yZFkgPSBwYXJzZUludChlLnRhcmdldC5kYXRhc2V0LmNvb3JkeSk7XHJcbiAgbGV0IHNoaXBMZW5ndGggPSBkcmFnZ2FibGUuZGF0YXNldC5zaGlwbGVuZ3RoO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgc2hpcENvb3Jkcy5wdXNoKG5ldyBDb29yZGluYXRlKGNvb3JkWCwgY29vcmRZICsgaSkpO1xyXG4gIH1cclxuXHJcbiAgY29uc29sZS5sb2coc2hpcENvb3Jkcyk7XHJcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBDb29yZHMsIGAke2lkfWApO1xyXG4gIFxyXG4gIGlmIChwbGF5ZXJCb2FyZC5jYW5QbGFjZVNoaXAoc2hpcCkpIHtcclxuICAgIHBsYXllckJvYXJkLnBsYWNlU2hpcChzaGlwKTtcclxuICAgIGRyYWdnYWJsZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGlmIChwbGF5ZXJCb2FyZC5mbGVldC5sZW5ndGggPT09IDUpIHtcclxuICAgIG1lbnVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgZ2FtZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcbiAgfVxyXG5cclxuICBzaGlwQ29vcmRzID0gW107XHJcbiAgcmVuZGVyKGJvYXJkQ29tcG9uZW50KHBsYXllckJvYXJkLCAxKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMS1tZW51XCIpKTtcclxuICByZW5kZXIoYm9hcmRDb21wb25lbnQocGxheWVyQm9hcmQsIDEpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXBsYXllci0xXCIpKTtcclxuICByZW5kZXIoc2hpcHlhcmRDb21wb25lbnQocGxheWVyQm9hcmQuZmxlZXQpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBzLTFcIikpO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJvYXJkLWNlbGwtMVwiKS5mb3JFYWNoKGNlbGwgPT4ge1xyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBkcmFnRW50ZXIpXHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZHJhZ092ZXIpO1xyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpO1xyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdkcm9wJywgZHJvcCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemF0aW9uIG9mIEFJIFBsYXllciBCb2FyZCBhbmQgU2hpcHNcclxuY29uc3QgQUlCb2FyZCAgICAgPSBuZXcgQm9hcmQoMTApO1xyXG5jb25zdCBjcnVpc2VyMiAgICA9IG5ldyBTaGlwKFtuZXcgQ29vcmRpbmF0ZSgzLCA2KSwgbmV3IENvb3JkaW5hdGUoMywgNyldLCBcImNydWlzZXJcIik7XHJcbmNvbnN0IHN1Ym1hcmluZTIgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDYsIDkpLCBuZXcgQ29vcmRpbmF0ZSg3LCA5KSwgbmV3IENvb3JkaW5hdGUoOCwgOSldLCBcInN1Ym1hcmluZVwiKTtcclxuY29uc3QgZGVzdHJveWVyMiAgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoNSwgMCksIG5ldyBDb29yZGluYXRlKDUsIDEpLCBuZXcgQ29vcmRpbmF0ZSg1LCAyKV0sIFwiZGVzdHJveWVyXCIpO1xyXG5jb25zdCBiYXR0bGVzaGlwMiA9IG5ldyBTaGlwKFtuZXcgQ29vcmRpbmF0ZSgxLCAzKSwgbmV3IENvb3JkaW5hdGUoMSwgNCksIG5ldyBDb29yZGluYXRlKDEsIDUpLCBuZXcgQ29vcmRpbmF0ZSgxLCA2KV0sIFwiYmF0dGxlc2hpcFwiKTtcclxuY29uc3QgY2FycmllcjIgICAgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoOCwgMSksIG5ldyBDb29yZGluYXRlKDgsIDIpLCBuZXcgQ29vcmRpbmF0ZSg4LCAzKSwgbmV3IENvb3JkaW5hdGUoOCwgNCksIG5ldyBDb29yZGluYXRlKDgsIDUpXSwgXCJjYXJyaWVyXCIpO1xyXG5cclxuLy8gUGxhY2UgaW5pdGlhbCBTaGlwcyB0byBBSSBQbGF5ZXIgQm9hcmRcclxuQUlCb2FyZC5wbGFjZVNoaXAoY3J1aXNlcjIpO1xyXG5BSUJvYXJkLnBsYWNlU2hpcChzdWJtYXJpbmUyKTtcclxuQUlCb2FyZC5wbGFjZVNoaXAoZGVzdHJveWVyMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGJhdHRsZXNoaXAyKTtcclxuQUlCb2FyZC5wbGFjZVNoaXAoY2FycmllcjIpO1xyXG5cclxuLy8gUmVuZGVyIHRvIHRoZSBET00gdGhlIGluaXRpYWwgQUkgUGxheWVyIEJvYXJkIFN0YXRlXHJcbnJlbmRlcihib2FyZENvbXBvbmVudChBSUJvYXJkLCAyKSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMlwiKSk7XHJcblxyXG4vLyBSZW5kZXIgdG8gdGhlIERPTSBpbml0aWFsIHN0YXRlIG9mIHRoZSBTaGlwcyBvZiBib3RoIHBsYXllcnNcclxucmVuZGVyKHNoaXB5YXJkQ29tcG9uZW50KHBsYXllckJvYXJkLmZsZWV0KSwgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0xXCIpKTtcclxucmVuZGVyKHNoaXB5YXJkQ29tcG9uZW50KEFJQm9hcmQuZmxlZXQpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBzLTJcIikpO1xyXG5cclxuLy8gSHVtYW4gUGxheWVyIEdhbWUgQ29udHJvbGxlclxyXG5mdW5jdGlvbiBoYW5kbGVQbGF5ZXJUdXJuKCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY2VsbC0yXCIpLmZvckVhY2goKGNlbGwsIGluZGV4KSA9PiB7XHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICBsZXQgY29vcmRzID0gQXJyYXkuZnJvbShTdHJpbmcoaW5kZXgpLCBOdW1iZXIpO1xyXG5cclxuICAgICAgaWYgKGNvb3Jkcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb29yZHMudW5zaGlmdCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgQUlCb2FyZC5wbGFjZVNob3QobmV3IENvb3JkaW5hdGUoY29vcmRzWzBdLCBjb29yZHNbMV0pKTtcclxuICAgICAgQUlCb2FyZC5nZXRGbGVldFN0YXR1cygpO1xyXG5cclxuICAgICAgcmVuZGVyKGJvYXJkQ29tcG9uZW50KEFJQm9hcmQsIDIpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJvYXJkLXBsYXllci0yXCIpKTtcclxuICAgICAgcmVuZGVyKHNoaXB5YXJkQ29tcG9uZW50KEFJQm9hcmQuZmxlZXQpLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXBzLTJcIikpO1xyXG5cclxuICAgICAgaWYgKEFJQm9hcmQuaXNHYW1lT3ZlcigpKSB7XHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gYWxlcnQoYEdhbWUgT3ZlciEgWW91IHdvbiFgKSwgMTAwKTtcclxuICAgICAgfSBcclxuXHJcbiAgICAgIC8vIFBhc3MgdGhlIGN1cnJlbnQgdHVybiB0byBBSSBQbGF5ZXIgR2FtZSBDb250cm9sbGVyIGFmdGVyIDEgc2Vjb25kIGRlbGF5XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGhhbmRsZU9wcG9uZW50VHVybigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBBSSBQbGF5ZXIgR2FtZSBDb250cm9sbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZU9wcG9uZW50VHVybigpIHtcclxuICBsZXQgY29vcmRzID0gbmV3IENvb3JkaW5hdGUocmFuZG9tTnVtYmVyKDAsIDkpLCByYW5kb21OdW1iZXIoMCwgOSkpO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgc2hvdCBpcyB2YWxpZCwgcGxhY2UgdGhlIHNob3QuXHJcbiAgICogRWxzZSwgZ2VuZXJhdGUgYSBuZXcgY29vcmRzIHdoaWxlIHNob3QgaXMgaW52YWxpZCBhbmQgdHJ5IGFnYWluLlxyXG4gICAqL1xyXG4gIGlmIChwbGF5ZXJCb2FyZC5jYW5QbGFjZVNob3QoY29vcmRzKSkge1xyXG4gICAgcGxheWVyQm9hcmQucGxhY2VTaG90KGNvb3Jkcyk7XHJcbiAgICBwbGF5ZXJCb2FyZC5nZXRGbGVldFN0YXR1cygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgaW52YWxpZFNob3QgPSB0cnVlO1xyXG5cclxuICAgIHdoaWxlIChpbnZhbGlkU2hvdCkge1xyXG4gICAgICBjb29yZHMgPSBuZXcgQ29vcmRpbmF0ZShyYW5kb21OdW1iZXIoMCwgOSksIHJhbmRvbU51bWJlcigwLCA5KSk7XHJcblxyXG4gICAgICBpZiAocGxheWVyQm9hcmQuY2FuUGxhY2VTaG90KGNvb3JkcykpIHtcclxuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNob3QoY29vcmRzKTtcclxuICAgICAgICBwbGF5ZXJCb2FyZC5nZXRGbGVldFN0YXR1cygpO1xyXG4gICAgICAgIGludmFsaWRTaG90ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTFcIikpO1xyXG4gIHJlbmRlcihzaGlweWFyZENvbXBvbmVudChwbGF5ZXJCb2FyZC5mbGVldCksIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcHMtMVwiKSk7XHJcblxyXG4gIGlmIChwbGF5ZXJCb2FyZC5pc0dhbWVPdmVyKCkpIHtcclxuICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KGBHYW1lIE92ZXIhIE9wcG9uZW50IHdvbiFgKSwgMTAwKTtcclxuICB9XHJcblxyXG4gIC8vIFBhc3MgdGhlIGN1cnJlbnQgdHVybiB0byBIdW1hbiBQbGF5ZXIgR2FtZSBDb250cm9sbGVyXHJcbiAgaGFuZGxlUGxheWVyVHVybigpO1xyXG59XHJcblxyXG5oYW5kbGVQbGF5ZXJUdXJuKCk7XHJcbiJdLCJuYW1lcyI6WyJib2FyZENvbXBvbmVudCIsInRoZUJvYXJkIiwicGxheWVyIiwiZmllbGRTdGF0dXMiLCJtYXAiLCJyb3ciLCJjb29yZFgiLCJjb2wiLCJjb29yZFkiLCJzdGF0dXMiLCJnZXRGaWVsZFN0YXR1cyIsImpvaW4iLCJzaGlweWFyZENvbXBvbmVudCIsInRoZUZsZWV0Iiwic2hpcCIsImdldE5hbWUiLCJjb29yZHMiLCJsZW5ndGgiLCJCb2FyZCIsInNpemUiLCJmbGVldCIsIkFycmF5IiwieCIsImoiLCJmaWxsIiwieSIsInRoZVNoaXAiLCJmb3JFYWNoIiwiY29vcmQiLCJnZXRYIiwiZ2V0WSIsIkVycm9yIiwicHVzaCIsInRoZUNvb3JkIiwiZmllbGQiLCJoYXNDb29yZGluYXRlcyIsImlzSGl0IiwiZGVzdHJveWVkU2hpcCIsImZpbmQiLCJoYXNTdW5rIiwiaW5kZXgiLCJpbmRleE9mIiwic3BsaWNlIiwidW5kZWZpbmVkIiwiQ29vcmRpbmF0ZSIsIlNoaXAiLCJuYW1lIiwiYXRDb29yZCIsImVxdWFscyIsInNvbWUiLCJyYW5kb21JbnRlZ2VyIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmVuZGVyIiwidGVtcGxhdGUiLCJub2RlIiwiaW5uZXJIVE1MIiwicmFuZG9tTnVtYmVyIiwicGxheWVyQm9hcmQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJtZW51Q29udGFpbmVyIiwiZ2FtZUNvbnRhaW5lciIsImNhcnJpZXJFbGVtZW50IiwiYmF0dGxlc2hpcEVsZW1lbnQiLCJkZXN0cm95ZXJFbGVtZW50Iiwic3VibWFyaW5lRWxlbWVudCIsImNydWlzZXJFbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRyYWdTdGFydCIsImUiLCJjb25zb2xlIiwibG9nIiwiZGF0YVRyYW5zZmVyIiwic2V0RGF0YSIsInRhcmdldCIsImlkIiwiY2VsbHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsImRyYWdFbnRlciIsImRyYWdPdmVyIiwiZHJhZ0xlYXZlIiwiZHJvcCIsInByZXZlbnREZWZhdWx0IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiZ2V0RGF0YSIsImRyYWdnYWJsZSIsImdldEVsZW1lbnRCeUlkIiwic2hpcENvb3JkcyIsInBhcnNlSW50IiwiZGF0YXNldCIsImNvb3JkeCIsImNvb3JkeSIsInNoaXBMZW5ndGgiLCJzaGlwbGVuZ3RoIiwiaSIsImNhblBsYWNlU2hpcCIsInBsYWNlU2hpcCIsInN0eWxlIiwiZGlzcGxheSIsIkFJQm9hcmQiLCJjcnVpc2VyMiIsInN1Ym1hcmluZTIiLCJkZXN0cm95ZXIyIiwiYmF0dGxlc2hpcDIiLCJjYXJyaWVyMiIsImhhbmRsZVBsYXllclR1cm4iLCJmcm9tIiwiU3RyaW5nIiwiTnVtYmVyIiwidW5zaGlmdCIsInBsYWNlU2hvdCIsImdldEZsZWV0U3RhdHVzIiwiaXNHYW1lT3ZlciIsInNldFRpbWVvdXQiLCJhbGVydCIsImhhbmRsZU9wcG9uZW50VHVybiIsImNhblBsYWNlU2hvdCIsImludmFsaWRTaG90Il0sInNvdXJjZVJvb3QiOiIifQ==