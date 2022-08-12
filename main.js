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

/***/ "./src/lib/drag.js":
/*!*************************!*\
  !*** ./src/lib/drag.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dragEnter": () => (/* binding */ dragEnter),
/* harmony export */   "dragLeave": () => (/* binding */ dragLeave),
/* harmony export */   "dragOver": () => (/* binding */ dragOver),
/* harmony export */   "dragStart": () => (/* binding */ dragStart)
/* harmony export */ });
function dragLeave(e) {
  e.target.style.border = "1px solid white";
}

function dragOver(e) {
  e.preventDefault();
  e.target.style.border = "1px solid red";
}

function dragEnter(e) {
  e.preventDefault();
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}



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
/* harmony import */ var _lib_drag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./lib/drag */ "./src/lib/drag.js");









var ships = document.querySelectorAll(".ship");
var gameContainer = document.querySelector(".game");
var menuContainer = document.querySelector(".menu-container");
var playerMenuContainer = document.querySelector(".board-player-1-menu");
var playerBoardContainer = document.querySelector(".board-player-1");
var playerShipsContainer = document.querySelector(".ships-1");
var aiBoardContainer = document.querySelector(".board-player-2");
var aiShipsContainer = document.querySelector(".ships-2"); // Initialization of Human Player Board

var playerBoard = new _factories_Board__WEBPACK_IMPORTED_MODULE_1__["default"](10); // Initialization of AI Player Board and Ships

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
AIBoard.placeShip(carrier2); // Render to the DOM the initial Human Player Board State for Menu

(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), playerMenuContainer); // Render to the DOM the initial AI Player Board and Ships State

(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(AIBoard, 2), aiBoardContainer);
(0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(AIBoard.fleet), aiShipsContainer); // Attach event listeners to the Human Player Fields and Ships for drag/drop functionality

fieldsAddEventListener();
ships.forEach(function (ship) {
  return ship.addEventListener("dragstart", _lib_drag__WEBPACK_IMPORTED_MODULE_8__.dragStart);
});

function drop(e) {
  var id = e.dataTransfer.getData("text/plain");
  var ship = new _factories_Ship__WEBPACK_IMPORTED_MODULE_2__["default"]([], "".concat(id));
  var draggable = document.getElementById(id);
  var shipLength = draggable.dataset.shiplength;
  var coordX = parseInt(e.target.dataset.coordx);
  var coordY = parseInt(e.target.dataset.coordy);

  for (var i = 0; i < shipLength; i++) {
    ship.coords.push(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coordX, coordY + i));
  }

  if (playerBoard.canPlaceShip(ship)) {
    playerBoard.placeShip(ship);
    draggable.style.display = "none";
  } else return;

  if (playerBoard.fleet.length === 5) {
    menuContainer.style.display = "none";
    gameContainer.style.display = "flex";
  }

  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), playerMenuContainer);
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), playerBoardContainer);
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard.fleet), playerShipsContainer);
  fieldsAddEventListener();
}

function fieldsAddEventListener() {
  document.querySelectorAll(".board-cell-1").forEach(function (cell) {
    cell.addEventListener("dragenter", _lib_drag__WEBPACK_IMPORTED_MODULE_8__.dragEnter);
    cell.addEventListener("dragover", _lib_drag__WEBPACK_IMPORTED_MODULE_8__.dragOver);
    cell.addEventListener("dragleave", _lib_drag__WEBPACK_IMPORTED_MODULE_8__.dragLeave);
    cell.addEventListener("drop", drop);
  });
} // Human Player Game Controller


function handlePlayerTurn() {
  document.querySelectorAll(".board-cell-2").forEach(function (cell, index) {
    cell.addEventListener("click", function (e) {
      var coords = Array.from(String(index), Number);

      if (coords.length === 1) {
        coords.unshift(0);
      }

      AIBoard.placeShot(new _factories_Coordinate__WEBPACK_IMPORTED_MODULE_3__["default"](coords[0], coords[1]));
      AIBoard.getFleetStatus();
      (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(AIBoard, 2), aiBoardContainer);
      (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(AIBoard.fleet), aiShipsContainer);

      if (AIBoard.isGameOver()) {
        return setTimeout(function () {
          return alert("Game Over! You won!");
        }, 500);
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

  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_boardComponent__WEBPACK_IMPORTED_MODULE_4__["default"])(playerBoard, 1), playerBoardContainer);
  (0,_lib_render__WEBPACK_IMPORTED_MODULE_6__["default"])((0,_components_shipyardComponent__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard.fleet), playerShipsContainer);

  if (playerBoard.isGameOver()) {
    return setTimeout(function () {
      return alert("Game Over! Opponent won!");
    }, 500);
  } // Pass the current turn to Human Player Game Controller


  handlePlayerTurn();
}

handlePlayerTurn();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYSxhQUFhLGFBQWEsTUFBTSxNQUFNLEtBQUssWUFBWSxXQUFXLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxjQUFjLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxZQUFZLE1BQU0sVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLFlBQVksTUFBTSxZQUFZLFlBQVksWUFBWSxhQUFhLGNBQWMsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksY0FBYyxXQUFXLFlBQVksV0FBVyxVQUFVLE1BQU0sWUFBWSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsWUFBWSxVQUFVLE9BQU8sT0FBTyxhQUFhLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssYUFBYSxhQUFhLFdBQVcsWUFBWSxjQUFjLFdBQVcsWUFBWSxPQUFPLEtBQUssYUFBYSxXQUFXLFlBQVksY0FBYyxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsYUFBYSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssYUFBYSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxXQUFXLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGNBQWMsWUFBWSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLGNBQWMsWUFBWSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLFlBQVksTUFBTSxVQUFVLFlBQVksYUFBYSxjQUFjLE1BQU0sUUFBUSxhQUFhLGFBQWEsT0FBTyxLQUFLLGFBQWEsTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFdBQVcsS0FBSyxPQUFPLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLGFBQWEsV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLFlBQVksTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLGFBQWEsWUFBWSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLE1BQU0s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VyxDQUFDOEIsY0FBWjtFQUNELENBSEQsTUFHTztJQUNMLElBQUlNLFdBQVcsR0FBRyxJQUFsQjs7SUFFQSxPQUFPQSxXQUFQLEVBQW9CO01BQ2xCeEcsTUFBTSxHQUFHLElBQUk0Qiw2REFBSixDQUFlNEIsNkRBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUEzQixFQUFtQ0EsNkRBQVksQ0FBQyxDQUFELEVBQUksQ0FBSixDQUEvQyxDQUFUOztNQUVBLElBQUlZLFdBQVcsQ0FBQ21DLFlBQVosQ0FBeUJ2RyxNQUF6QixDQUFKLEVBQXNDO1FBQ3BDb0UsV0FBVyxDQUFDNkIsU0FBWixDQUFzQmpHLE1BQXRCO1FBQ0FvRSxXQUFXLENBQUM4QixjQUFaO1FBQ0FNLFdBQVcsR0FBRyxLQUFkO01BQ0Q7SUFDRjtFQUNGOztFQUVEcEQsdURBQU0sQ0FBQ3BFLHNFQUFjLENBQUNvRixXQUFELEVBQWMsQ0FBZCxDQUFmLEVBQWlDSixvQkFBakMsQ0FBTjtFQUNBWix1REFBTSxDQUFDeEQseUVBQWlCLENBQUN3RSxXQUFXLENBQUNoRSxLQUFiLENBQWxCLEVBQXVDNkQsb0JBQXZDLENBQU47O0VBRUEsSUFBSUcsV0FBVyxDQUFDK0IsVUFBWixFQUFKLEVBQThCO0lBQzVCLE9BQU9DLFVBQVUsQ0FBQztNQUFBLE9BQU1DLEtBQUssNEJBQVg7SUFBQSxDQUFELEVBQTBDLEdBQTFDLENBQWpCO0VBQ0QsQ0E3QjJCLENBK0I1Qjs7O0VBQ0FULGdCQUFnQjtBQUNqQjs7QUFFREEsZ0JBQWdCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2NvbXBvbmVudHMvYm9hcmRDb21wb25lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0JvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZmFjdG9yaWVzL0Nvb3JkaW5hdGUuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9mYWN0b3JpZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpYi9kcmFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbGliL3JhbmRvbU51bWJlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2xpYi9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYm9hcmRDb21wb25lbnQodGhlQm9hcmQsIHBsYXllcikge1xyXG4gIHJldHVybiB0aGVCb2FyZC5maWVsZFN0YXR1cy5tYXAoKHJvdywgY29vcmRYKSA9PlxyXG4gICAgICByb3cubWFwKChjb2wsIGNvb3JkWSkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgc3RhdHVzID0gdGhlQm9hcmQuZ2V0RmllbGRTdGF0dXMoY29vcmRYLCBjb29yZFkpO1xyXG5cclxuICAgICAgICAgIGlmIChzdGF0dXMgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9hcmQtY2VsbC0ke3BsYXllcn1cIiBkYXRhLWNvb3JkeD1cIiR7Y29vcmRYfVwiIGRhdGEtY29vcmR5PVwiJHtjb29yZFl9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGl0LW1pc3NlZC1wbGF5ZXItMVwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChzdGF0dXMgPT09IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9hcmQtY2VsbC0ke3BsYXllcn1cIiBkYXRhLWNvb3JkeD1cIiR7Y29vcmRYfVwiIGRhdGEtY29vcmR5PVwiJHtjb29yZFl9XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2hpcC1ib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvY2N1cGllZC1ub3QtaGl0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoc3RhdHVzID09PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvYXJkLWNlbGwtJHtwbGF5ZXJ9XCIgZGF0YS1jb29yZHg9XCIke2Nvb3JkWH1cIiBkYXRhLWNvb3JkeT1cIiR7Y29vcmRZfVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNoaXAtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGl0XCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCJib2FyZC1jZWxsLSR7cGxheWVyfVwiIGRhdGEtY29vcmR4PVwiJHtjb29yZFh9XCIgZGF0YS1jb29yZHk9XCIke2Nvb3JkWX1cIj48L2Rpdj5gO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmpvaW4oXCJcIilcclxuICAgIClcclxuICAgIC5qb2luKFwiXCIpO1xyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNoaXB5YXJkQ29tcG9uZW50KHRoZUZsZWV0KSB7XHJcbiAgcmV0dXJuIHRoZUZsZWV0Lm1hcCgoc2hpcCkgPT4ge1xyXG4gICAgcmV0dXJuIGA8cD4ke3NoaXAuZ2V0TmFtZSgpfSAoJHtzaGlwLmNvb3Jkcy5sZW5ndGh9KTwvcD5gO1xyXG4gIH0pLmpvaW4oXCJcIik7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKHNpemUpIHtcclxuICAgIC8vIFNpemUgb2YgYm9hcmQgZ3JpZFxyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEFuIGFycmF5IGZvciBzdG9yaW5nIHRoZSBzaGlwc1xyXG4gICAgICogS2VlcCB0cmFjayBpdHMgbmFtZXMgYW5kIHN0YXR1cyAoaGl0IG9yIHN1bmspXHJcbiAgICAgKi9cclxuICAgIHRoaXMuZmxlZXQgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpZWxkIHN0YXR1cyBhcnJheVxyXG4gICAgICogMDogZW1wdHksIG5vdCBoaXRcclxuICAgICAqIDE6IGVtcHR5LCBidXQgaGl0XHJcbiAgICAgKiAyOiBub3QgZW1wdHksIG5vdCBoaXRcclxuICAgICAqIDM6IG5vdCBlbXB0eSwgYnV0IGhpdFxyXG4gICAgICovXHJcbiAgICB0aGlzLmZpZWxkU3RhdHVzID0gWy4uLkFycmF5KHNpemUpXS5tYXAoKHgsIGopID0+IEFycmF5KHNpemUpLmZpbGwoMCkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IGZpZWxkIHN0YXR1c1xyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB4IGNvb3JkaW5hdGVcclxuICAgKiBAcGFyYW0ge051bWJlcn0geSBjb29yZGluYXRlXHJcbiAgICogQHJldHVybnMgdGhlIHN0YXR1cyBvZiB4LCB5IGZpZWxkXHJcbiAgICovXHJcbiAgZ2V0RmllbGRTdGF0dXMoeCwgeSkge1xyXG4gICAgcmV0dXJuIHRoaXMuZmllbGRTdGF0dXNbeF1beV07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBpdCdzIE9LIHRvIHBsYWNlIHNoaXBcclxuICAgKiBAcGFyYW0ge09iamVjdH0gdGhlU2hpcCBvYmplY3RcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHNoaXAgY2FuIGJlIHBsYWNlZCwgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgY2FuUGxhY2VTaGlwKHRoZVNoaXApIHtcclxuICAgIFsuLi50aGVTaGlwLmNvb3Jkc10uZm9yRWFjaCgoY29vcmQpID0+IHtcclxuICAgICAgY29uc3QgeCA9IGNvb3JkLmdldFgoKTtcclxuICAgICAgY29uc3QgeSA9IGNvb3JkLmdldFkoKTtcclxuXHJcbiAgICAgIGlmICh4ID49IHRoaXMuc2l6ZSB8fCB5ID49IHRoaXMuc2l6ZSkgdGhyb3cgbmV3IEVycm9yKGBPdXQgb2YgY292ZXJlZCBhcmVhYCk7XHJcblxyXG4gICAgICAvLyBJZiBzaGlwIGlzIGFscmVhZHkgaW4gdGhpcyBmaWVsZFxyXG4gICAgICBpZiAodGhpcy5maWVsZFN0YXR1c1t4XVt5XSAhPT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQbGFjZXMgYSBzaGlwIG9uIHRoZSBib2FyZFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0aGVTaGlwIG9iamVjdFxyXG4gICAqL1xyXG4gIHBsYWNlU2hpcCh0aGVTaGlwKSB7XHJcbiAgICBbLi4udGhlU2hpcC5jb29yZHNdLmZvckVhY2goKGNvb3JkKSA9PiB7XHJcbiAgICAgIGNvbnN0IHggPSBjb29yZC5nZXRYKCk7XHJcbiAgICAgIGNvbnN0IHkgPSBjb29yZC5nZXRZKCk7XHJcblxyXG4gICAgICAvLyBJZiBzaGlwIGlzIGFscmVhZHkgaW4gdGhpcyBmaWVsZFxyXG4gICAgICBpZiAodGhpcy5maWVsZFN0YXR1c1t4XVt5XSAhPT0gMCkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZpZWxkIGlzIGFscmVhZHkgb2NjdXBpZWRcIik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIFNldCBmaWVsZHMgdG8gbm90IGVtcHR5LCBub3QgaGl0XHJcbiAgICAgIHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPSAyO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5mbGVldC5wdXNoKHRoZVNoaXApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgaXQncyBPSyB0byBwbGFjZSBzaG90XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZUNvb3JkIHRvIGhpdFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgT0sgdG8gcGxhY2Ugc2hvdCwgZmFsc2UgaWYgbm90XHJcbiAgICovXHJcbiAgY2FuUGxhY2VTaG90KHRoZUNvb3JkKSB7XHJcbiAgICBjb25zdCB4ID0gdGhlQ29vcmQuZ2V0WCgpO1xyXG4gICAgY29uc3QgeSA9IHRoZUNvb3JkLmdldFkoKTtcclxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuXHJcbiAgICAvLyBJZiBmaWVsZCB2YWx1ZSBpcyAwIG9yIDIsIGl0J3MgT0sgdG8gc2hvb3RcclxuICAgIGlmIChmaWVsZCA9PT0gMCB8fCBmaWVsZCA9PT0gMikgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGxhY2VzIHNob3Qgb24gdGhlIGJvYXJkXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHRoZUNvb3JkIHRvIGhpdFxyXG4gICAqIEByZXR1cm5zIHRoZSByZXN1bHQgKDEgb3IgMyAtIHRoZSB0d28gcG9zc2libGUgb3V0Y29tZXMpXHJcbiAgICovXHJcbiAgcGxhY2VTaG90KHRoZUNvb3JkKSB7XHJcbiAgICBjb25zdCB4ID0gdGhlQ29vcmQuZ2V0WCgpO1xyXG4gICAgY29uc3QgeSA9IHRoZUNvb3JkLmdldFkoKTtcclxuXHJcbiAgICBpZiAodGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9PT0gMCkge1xyXG4gICAgICB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID0gMTtcclxuICAgICAgcmV0dXJuIHRoaXMuZmllbGRTdGF0dXNbeF1beV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZmllbGRTdGF0dXNbeF1beV0gPT09IDEgfHwgdGhpcy5maWVsZFN0YXR1c1t4XVt5XSA9PT0gMykge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaWVsZCBoYXMgYWxyZWFkeSBiZWVuIGhpdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkU3RhdHVzW3hdW3ldID0gMztcclxuXHJcbiAgICAvLyBXZSBoYXZlIGEgc3VjY2Vzc2Z1bCBzaG90LCBhbmQgdGhlIHNoaXAgbXVzdCByZW1lbWJlciB0aGF0IGl0IGhhcyBiZWVuIGhpdFxyXG4gICAgdGhpcy5mbGVldC5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIGlmIChzaGlwLmhhc0Nvb3JkaW5hdGVzKHRoZUNvb3JkKSkgc2hpcC5pc0hpdCh0aGVDb29yZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5maWVsZFN0YXR1c1t4XVt5XTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgdGhlIG5hbWUgb2YgYSBzaGlwIGlmIGl0IHdhcyBkZXN0cm95ZWQgYW5kIHJlbW92ZSBpdCBmcm9tIGZsZWV0XHJcbiAgICogVGhpcyBtZXRob2QgbXVzdCBiZSBjYWxsZWQgYWZ0ZXIgZXZlcnkgc2hvdFxyXG4gICAqIEByZXR1cm5zIHRoZSBuYW1lIG9mIHRoZSBzaGlwIHRoYXQgaGFzIGJlZW4gZGVzdHJveWVkIChpZiBoYXNTdW5rIHJldHVybiB0cnVlKSxcclxuICAgKiBPciBhbiBlbXB0eSBzdHJpbmcgaXMgc2hpcCB3YXMgbm90IGRlc3Ryb3llZFxyXG4gICAqL1xyXG4gIGdldEZsZWV0U3RhdHVzKCkge1xyXG4gICAgY29uc3QgZGVzdHJveWVkU2hpcCA9IHRoaXMuZmxlZXQuZmluZCgoc2hpcCkgPT4gc2hpcC5oYXNTdW5rKCkpO1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmZsZWV0LmluZGV4T2YoZGVzdHJveWVkU2hpcCk7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuZmxlZXQuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICByZXR1cm4gZGVzdHJveWVkU2hpcCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IGRlc3Ryb3llZFNoaXAuZ2V0TmFtZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2FtZSBpcyBvdmVyIGlmIGZsZWV0IGFycmF5IGlzIGVtcHR5XHJcbiAgICogQHJldHVybnMgdHJ1ZSBpZiBnYW1lIGlzIG92ZXIsIGZhbHNlIGlmIG5vdFxyXG4gICAqL1xyXG4gIGlzR2FtZU92ZXIoKSB7XHJcbiAgICBpZiAodGhpcy5mbGVldC5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29vcmRpbmF0ZSB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIGNvb3JkaW5hdGUgc2V0XHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHhcclxuICAgKiBAcGFyYW0ge051bWJlcn0geVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHZhbHVlIG9mIHggY29vcmRpbmF0ZVxyXG4gICAqIEByZXR1cm5zIHRoZSB4IHZhbHVlIG9mIHRoaXMgY29vcmRpbmF0ZVxyXG4gICAqL1xyXG4gIGdldFgoKSB7XHJcbiAgICByZXR1cm4gdGhpcy54O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHZhbHVlIG9mIHkgY29vcmRpbmF0ZVxyXG4gICAqIEByZXR1cm5zIHRoZSB5IHZhbHVlIG9mIHRoaXMgY29vcmRpbmF0ZVxyXG4gICAqL1xyXG4gIGdldFkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGVzdCB0aGlzIGNvb3JkaW5hdGUgZm9yIGVxdWFsaXR5IHdpdGggdGhlIFNoaXAncyBjb29yZGluYXRlXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvb3JkIHRvIHRlc3RcclxuICAgKiBAcmV0dXJucyB0cnVlIG9yIGZhbHNlXHJcbiAgICovXHJcbiAgZXF1YWxzKGNvb3JkKSB7XHJcbiAgICBpZiAodGhpcy54ID09PSBjb29yZC5nZXRYKCkgJiYgdGhpcy55ID09PSBjb29yZC5nZXRZKCkpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0IGEgc2hpcCBvZiBnaXZlbiBjb29yZHMgYW5kIG5hbWVcclxuICAgKiBAcGFyYW0ge0FycmF5fSBjb29yZHNcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGNvb3JkcywgbmFtZSkge1xyXG4gICAgdGhpcy5jb29yZHMgPSBbLi4uY29vcmRzXTtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWdpc3RlcnMgdGhhdCB0aGUgc2hpcCBoYXMgYmVlbiBoaXRcclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXRDb29yZFxyXG4gICAqL1xyXG4gIGlzSGl0KGF0Q29vcmQpIHtcclxuICAgIHRoaXMuY29vcmRzLmZvckVhY2goKGNvb3JkLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoY29vcmQuZXF1YWxzKGF0Q29vcmQpKSB7XHJcbiAgICAgICAgdGhpcy5jb29yZHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgdGhlcmUgYXJlIGFueSBwYXJ0cyBsZWZ0IG9mIHRoaXMgc2hpcFxyXG4gICAqIEByZXR1cm5zIHRydWUgaWYgdGhlcmUgYXJlIG5vIG1vcmUgY29vcmRpbmF0ZXMgLSBoZW5jZSB0aGUgc2hpcCBpcyBkZXN0cm95ZWRcclxuICAgKi9cclxuICBoYXNTdW5rKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29vcmRzLmxlbmd0aCA9PT0gMDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlc3RzIHdoZXRoZXIgdGhpcyBzaGlwIGlzIHBsYWNlZCBvbiB0aGVzZSBjb29yZGluYXRlc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdENvb3JkIHRvIHRlc3RcclxuICAgKiBAcmV0dXJucyB0cnVlIGlmIHNoaXAgaXMgb24gdGhlc2UgY29vcmRpbmF0ZXMsIGZhbHNlIGlmIG5vdFxyXG4gICAqL1xyXG4gIGhhc0Nvb3JkaW5hdGVzKGF0Q29vcmQpIHtcclxuICAgIHJldHVybiB0aGlzLmNvb3Jkcy5zb21lKChjb29yZCkgPT4ge1xyXG4gICAgICByZXR1cm4gY29vcmQuZXF1YWxzKGF0Q29vcmQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIG5hbWUgb2YgdGhlIHNoaXBcclxuICAgKiBAcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhlIG5hbWUgdmFyaWFibGVcclxuICAgKi9cclxuICBnZXROYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gZHJhZ0xlYXZlKGUpIHtcclxuICBlLnRhcmdldC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCB3aGl0ZVwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnT3ZlcihlKSB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGUudGFyZ2V0LnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIHJlZFwiO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcmFnRW50ZXIoZSkge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJhZ1N0YXJ0KGUpIHtcclxuICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCBlLnRhcmdldC5pZCk7XHJcbn0gXHJcblxyXG5leHBvcnQgeyBkcmFnTGVhdmUsIGRyYWdPdmVyLCBkcmFnRW50ZXIsIGRyYWdTdGFydCB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYW5kb21JbnRlZ2VyKG1pbiwgbWF4KSB7XHJcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbn1cclxuIiwiY29uc3QgcmVuZGVyID0gKHRlbXBsYXRlLCBub2RlKSA9PiB7XHJcbiAgaWYgKCFub2RlKSByZXR1cm47XHJcblxyXG4gIG5vZGUuaW5uZXJIVE1MID0gdGVtcGxhdGU7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuL2ltYWdlcy9iYWNrZ3JvdW5kLmpwZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXHJcXG4gIC0tY2xyLXJlZDogI2ZmMDA1NTtcXHJcXG4gIC0tY2xyLWJsdWU6ICM2MWM2ZmY7XFxyXFxuICAtLWNsci1saWdodC1ibHVlOiAjZGZmNGZmO1xcclxcbiAgLS1jbHItZGFyay1ncmF5OiAjNzE3Yzk2O1xcclxcbiAgLS1jbHItZ3JheTogIzkwOTI5MjtcXHJcXG4gIC0tY2xyLWxpZ2h0LWdyYXk6ICNlYmViZWI7XFxyXFxuICAtLWNsci13aGl0ZTogI2ZmZmZmZjtcXHJcXG4gIC0tY2xyLWJsYWNrOiAjMjEyMTIxO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBodHRwczovL3BpY2NhbGlsLmxpL2Jsb2cvYS1tb2Rlcm4tY3NzLXJlc2V0ICovXFxyXFxuXFxyXFxuLyogQm94IHNpemluZyBydWxlcyAqL1xcclxcbiosXFxyXFxuKjo6YmVmb3JlLFxcclxcbio6OmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBkZWZhdWx0IG1hcmdpbiAqL1xcclxcbioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGZvbnQ6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBsaXN0IHN0eWxlcyBvbiB1bCwgb2wgZWxlbWVudHMgd2l0aCBhIGxpc3Qgcm9sZSwgd2hpY2ggc3VnZ2VzdHMgZGVmYXVsdCBzdHlsaW5nIHdpbGwgYmUgcmVtb3ZlZCAqL1xcclxcbnVsW3JvbGU9XFxcImxpc3RcXFwiXSxcXHJcXG5vbFtyb2xlPVxcXCJsaXN0XFxcIl0ge1xcclxcbiAgbGlzdC1zdHlsZTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2V0IGNvcmUgcm9vdCBkZWZhdWx0cyAqL1xcclxcbmh0bWw6Zm9jdXMtd2l0aGluIHtcXHJcXG4gIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xcclxcbn1cXHJcXG5cXHJcXG5odG1sLFxcclxcbmJvZHkge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBTZXQgY29yZSBib2R5IGRlZmF1bHRzICovXFxyXFxuYm9keSB7XFxyXFxuICBtaW4taGVpZ2h0OiAxMDB2aDtcXHJcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZVNwZWVkO1xcclxcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXHJcXG59XFxyXFxuXFxyXFxuLyogQSBlbGVtZW50cyB0aGF0IGRvbid0IGhhdmUgYSBjbGFzcyBnZXQgZGVmYXVsdCBzdHlsZXMgKi9cXHJcXG5hOm5vdChbY2xhc3NdKSB7XFxyXFxuICB0ZXh0LWRlY29yYXRpb24tc2tpcC1pbms6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi8qIE1ha2UgaW1hZ2VzIGVhc2llciB0byB3b3JrIHdpdGggKi9cXHJcXG5pbWcsXFxyXFxucGljdHVyZSB7XFxyXFxuICBtYXgtd2lkdGg6IDEwMCU7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG59XFxyXFxuXFxyXFxuLyogUmVtb3ZlIGFsbCBhbmltYXRpb25zLCB0cmFuc2l0aW9ucyBhbmQgc21vb3RoIHNjcm9sbCBmb3IgcGVvcGxlIHRoYXQgcHJlZmVyIG5vdCB0byBzZWUgdGhlbSAqL1xcclxcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XFxyXFxuICBodG1sOmZvY3VzLXdpdGhpbiB7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0bztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICosXFxyXFxuICAqOjpiZWZvcmUsXFxyXFxuICAqOjphZnRlciB7XFxyXFxuICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IDEgIWltcG9ydGFudDtcXHJcXG4gICAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4wMW1zICFpbXBvcnRhbnQ7XFxyXFxuICAgIHNjcm9sbC1iZWhhdmlvcjogYXV0byAhaW1wb3J0YW50O1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcclxcbiAgbWluLXdpZHRoOiAxMDAlO1xcclxcbiAgbWluLWhlaWdodDogMTAwJTtcXHJcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCggcmdiYSgwLCAwLCAwLCAwLjYpLCByZ2JhKDAsIDAsIDAsIDAuNikgKSwgdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLyogSGVhZGVyIFN0eWxpbmcgKi9cXHJcXG4ucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW0gM3JlbSAwLjVyZW0gM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxufVxcclxcblxcclxcbi5zdWJ0aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3Ige1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGhvciA+IGEge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIEdhbWUgU3R5bGluZyAqL1xcclxcbi5nYW1lIHtcXHJcXG4gIC8qIGRpc3BsYXk6IGZsZXg7ICovXFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcblxcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHJcXG4gIGJvcmRlcjogMjBweCBzb2xpZCByZ2JhKDEwOCwgMTIyLCAxMzcsIC41KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAvKiBib3JkZXItaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdmFyKC0tY2xyLWRhcmstZ3JheSksIHZhcigtLWNsci1ncmF5KSkgMTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcnMge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllciB7XFxyXFxuICBwYWRkaW5nOiAxLjVyZW0gM3JlbSAxLjVyZW0gM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAucGxheWVyXzEge1xcclxcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMntcXHJcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XFxyXFxufSAqL1xcclxcblxcclxcbi5wbGF5ZXJfMSA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzIgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllci10aXRsZSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gIG1pbi13aWR0aDogMzAwcHg7XFxyXFxuICBtaW4taGVpZ2h0OiAzMDBweDtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXHJcXG4gICAgXFxcImJsYW5rIGxhYmVscy1jaGFyIGxhYmVscy1jaGFyXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCJcXHJcXG4gICAgXFxcImxhYmVscy1udW0gYm9hcmQgYm9hcmRcXFwiO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDFmciAxZnI7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYmxhbmstZGl2IHtcXHJcXG4gIGdyaWQtYXJlYTogYmxhbms7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtbnVtIHtcXHJcXG4gIGdyaWQtYXJlYTogbGFiZWxzLW51bTtcXHJcXG5cXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1jaGFyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIgPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtbnVtID4gcCB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGdyaWQtYXJlYTogYm9hcmQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jZWxsLTEge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbC0yIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgPiAuYm9hcmQtY2VsbC0yIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiA+IC5ib2FyZC1jZWxsLTI6aG92ZXIge1xcclxcbiAgZmlsdGVyOiBibHVyKDFyZW0pO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgIC5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5zaGlweWFyZCA+IGgzIHtcXHJcXG4gIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxyXFxuICB0ZXh0LW9yaWVudGF0aW9uOiBzaWRld2F5cztcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAzcHg7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1mcm9udCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1iYWNrIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4ub2NjdXBpZWQtbm90LWhpdCB7XFxyXFxuICBoZWlnaHQ6IDQwJTtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5oaXQtbWlzc2VkLXBsYXllci0xIHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ibHVlKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTIge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNZW51IFN0eWxpbmcgKi9cXHJcXG4ubWVudS1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFxyXFxuICAvKiBib3JkZXI6IDIwcHggc29saWQ7XFxyXFxuICBib3JkZXItaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdmFyKC0tY2xyLWRhcmstZ3JheSksIHZhcigtLWNsci1ncmF5KSkgMTsgKi9cXHJcXG5cXHJcXG4gIGJvcmRlcjogMjBweCBzb2xpZCByZ2JhKDEwOCwgMTIyLCAxMzcsIC41KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wbGF5ZXIge1xcclxcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XFxyXFxuXFxyXFxuICAvKiBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcXHJcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4OyAqL1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAudGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucHJpbWFyeS1oZWFkZXIgPiAuY29udGFpbmVyID4gLnN1YnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC42cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucGxheWVyXzEge1xcclxcbiAgZmxleDogbm9uZTtcXHJcXG4gIHdpZHRoOiA0MDBweDtcXHJcXG5cXHJcXG4gIC8qIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7ICovXFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMS1tZW51ID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gIHdpZHRoOiAxNDBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwID4gZGl2IHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhdHRsZXNoaXAge1xcclxcbiAgd2lkdGg6IDExMHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzdHJveWVyIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWFyaW5lIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3J1aXNlciB7XFxyXFxuICB3aWR0aDogNTBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmRyYWctb3ZlciB7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jbHItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRyYWdnYWJsZS1pbmRpY2F0b3Ige1xcclxcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1jbHItcmVkKTtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuXFxyXFxuLmZvb3Rub3RlIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuLyogTW9iaWxlIExheW91dCAqL1xcclxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxyXFxuICBib2R5IHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC50aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5zdWJ0aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC41cmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmdhbWUge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcblxcclxcbiAgICBib3JkZXI6IDIwcHggc29saWQgcmdiYSgxMDgsIDEyMiwgMTM3LCAuNSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVycyB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnBsYXllciB7XFxyXFxuICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVyXzEge1xcclxcbiAgICBmbGV4OiAxO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnBsYXllcl8yIHtcXHJcXG4gICAgZmxleDogMjtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5ib2FyZC1jb250YWluZXIge1xcclxcbiAgICBtaW4td2lkdGg6IGF1dG87XFxyXFxuICAgIG1pbi1oZWlnaHQ6IGF1dG87XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubWVudS1jb250YWluZXIge1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubWVudS1jb250YWluZXIgPiAucGxheWVyXzEge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgZmxleDogMTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAudGl0bGUge1xcclxcbiAgICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICB9XFxyXFxuICBcXHJcXG4gIC5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAuc3VidGl0bGUge1xcclxcbiAgICBmb250LXNpemU6IDAuNXJlbTtcXHJcXG4gIH1cXHJcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIseUJBQXlCO0VBQ3pCLHdCQUF3QjtFQUN4Qixt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cEI7O0FBRUEsa0JBQWtCO0FBQ2xCO0VBQ0U7SUFDRSxjQUFjO0VBQ2hCOztFQUVBO0lBQ0Usb0JBQW9CO0VBQ3RCOztFQUVBO0lBQ0Usa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsYUFBYTtJQUNiLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLFlBQVk7O0lBRVosMENBQTBDO0lBQzFDLG1CQUFtQjtFQUNyQjs7RUFFQTtJQUNFLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsV0FBVztFQUNiOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsT0FBTztFQUNUOztFQUVBO0lBQ0UsT0FBTztFQUNUOztFQUVBO0lBQ0UsZUFBZTtJQUNmLGdCQUFnQjtFQUNsQjs7RUFFQTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLFdBQVc7SUFDWCxPQUFPO0VBQ1Q7O0VBRUE7SUFDRSxrQkFBa0I7RUFDcEI7O0VBRUE7SUFDRSxpQkFBaUI7RUFDbkI7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxyXFxuICAtLWNsci1yZWQ6ICNmZjAwNTU7XFxyXFxuICAtLWNsci1ibHVlOiAjNjFjNmZmO1xcclxcbiAgLS1jbHItbGlnaHQtYmx1ZTogI2RmZjRmZjtcXHJcXG4gIC0tY2xyLWRhcmstZ3JheTogIzcxN2M5NjtcXHJcXG4gIC0tY2xyLWdyYXk6ICM5MDkyOTI7XFxyXFxuICAtLWNsci1saWdodC1ncmF5OiAjZWJlYmViO1xcclxcbiAgLS1jbHItd2hpdGU6ICNmZmZmZmY7XFxyXFxuICAtLWNsci1ibGFjazogIzIxMjEyMTtcXHJcXG59XFxyXFxuXFxyXFxuLyogaHR0cHM6Ly9waWNjYWxpbC5saS9ibG9nL2EtbW9kZXJuLWNzcy1yZXNldCAqL1xcclxcblxcclxcbi8qIEJveCBzaXppbmcgcnVsZXMgKi9cXHJcXG4qLFxcclxcbio6OmJlZm9yZSxcXHJcXG4qOjphZnRlciB7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZW1vdmUgZGVmYXVsdCBtYXJnaW4gKi9cXHJcXG4qIHtcXHJcXG4gIG1hcmdpbjogMDtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBmb250OiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSZW1vdmUgbGlzdCBzdHlsZXMgb24gdWwsIG9sIGVsZW1lbnRzIHdpdGggYSBsaXN0IHJvbGUsIHdoaWNoIHN1Z2dlc3RzIGRlZmF1bHQgc3R5bGluZyB3aWxsIGJlIHJlbW92ZWQgKi9cXHJcXG51bFtyb2xlPVxcXCJsaXN0XFxcIl0sXFxyXFxub2xbcm9sZT1cXFwibGlzdFxcXCJdIHtcXHJcXG4gIGxpc3Qtc3R5bGU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi8qIFNldCBjb3JlIHJvb3QgZGVmYXVsdHMgKi9cXHJcXG5odG1sOmZvY3VzLXdpdGhpbiB7XFxyXFxuICBzY3JvbGwtYmVoYXZpb3I6IHNtb290aDtcXHJcXG59XFxyXFxuXFxyXFxuaHRtbCxcXHJcXG5ib2R5IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLyogU2V0IGNvcmUgYm9keSBkZWZhdWx0cyAqL1xcclxcbmJvZHkge1xcclxcbiAgbWluLWhlaWdodDogMTAwdmg7XFxyXFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVTcGVlZDtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxyXFxufVxcclxcblxcclxcbi8qIEEgZWxlbWVudHMgdGhhdCBkb24ndCBoYXZlIGEgY2xhc3MgZ2V0IGRlZmF1bHQgc3R5bGVzICovXFxyXFxuYTpub3QoW2NsYXNzXSkge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uLXNraXAtaW5rOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNYWtlIGltYWdlcyBlYXNpZXIgdG8gd29yayB3aXRoICovXFxyXFxuaW1nLFxcclxcbnBpY3R1cmUge1xcclxcbiAgbWF4LXdpZHRoOiAxMDAlO1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi8qIFJlbW92ZSBhbGwgYW5pbWF0aW9ucywgdHJhbnNpdGlvbnMgYW5kIHNtb290aCBzY3JvbGwgZm9yIHBlb3BsZSB0aGF0IHByZWZlciBub3QgdG8gc2VlIHRoZW0gKi9cXHJcXG5AbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xcclxcbiAgaHRtbDpmb2N1cy13aXRoaW4ge1xcclxcbiAgICBzY3JvbGwtYmVoYXZpb3I6IGF1dG87XFxyXFxuICB9XFxyXFxuXFxyXFxuICAqLFxcclxcbiAgKjo6YmVmb3JlLFxcclxcbiAgKjo6YWZ0ZXIge1xcclxcbiAgICBhbmltYXRpb24tZHVyYXRpb246IDAuMDFtcyAhaW1wb3J0YW50O1xcclxcbiAgICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiAxICFpbXBvcnRhbnQ7XFxyXFxuICAgIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMDFtcyAhaW1wb3J0YW50O1xcclxcbiAgICBzY3JvbGwtYmVoYXZpb3I6IGF1dG8gIWltcG9ydGFudDtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXHJcXG4gIG1pbi13aWR0aDogMTAwJTtcXHJcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIHJnYmEoMCwgMCwgMCwgMC42KSwgcmdiYSgwLCAwLCAwLCAwLjYpICksIHVybChcXFwiLi9pbWFnZXMvYmFja2dyb3VuZC5qcGdcXFwiKTtcXHJcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxyXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcclxcbiAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDVweCk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG59XFxyXFxuXFxyXFxuLyogSGVhZGVyIFN0eWxpbmcgKi9cXHJcXG4ucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwLjVyZW0gM3JlbSAwLjVyZW0gM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxufVxcclxcblxcclxcbi5zdWJ0aXRsZSB7XFxyXFxuICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5hdXRob3Ige1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1ibGFjayk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG59XFxyXFxuXFxyXFxuLmF1dGhvciA+IGEge1xcclxcbiAgY29sb3I6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbi8qIEdhbWUgU3R5bGluZyAqL1xcclxcbi5nYW1lIHtcXHJcXG4gIC8qIGRpc3BsYXk6IGZsZXg7ICovXFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcblxcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG5cXHJcXG4gIGJvcmRlcjogMjBweCBzb2xpZCByZ2JhKDEwOCwgMTIyLCAxMzcsIC41KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICAvKiBib3JkZXItaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdmFyKC0tY2xyLWRhcmstZ3JheSksIHZhcigtLWNsci1ncmF5KSkgMTsgKi9cXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllcnMge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllciB7XFxyXFxuICBwYWRkaW5nOiAxLjVyZW0gM3JlbSAxLjVyZW0gM3JlbTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci13aGl0ZSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGdhcDogMXJlbTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiAucGxheWVyXzEge1xcclxcbiAgYm9yZGVyLXRvcC1sZWZ0LXJhZGl1czogMTBweDtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5wbGF5ZXJfMntcXHJcXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7XFxyXFxufSAqL1xcclxcblxcclxcbi5wbGF5ZXJfMSA+IGgyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbn1cXHJcXG5cXHJcXG4ucGxheWVyXzIgPiBoMiB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnBsYXllci10aXRsZSB7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLXdoaXRlKTtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIHBhZGRpbmc6IDAuNXJlbTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDAuMjVyZW07XFxyXFxuICBsZXR0ZXItc3BhY2luZzogMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY29udGFpbmVyIHtcXHJcXG4gIG1pbi13aWR0aDogMzAwcHg7XFxyXFxuICBtaW4taGVpZ2h0OiAzMDBweDtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXHJcXG4gICAgXFxcImJsYW5rIGxhYmVscy1jaGFyIGxhYmVscy1jaGFyXFxcIlxcclxcbiAgICBcXFwibGFiZWxzLW51bSBib2FyZCBib2FyZFxcXCJcXHJcXG4gICAgXFxcImxhYmVscy1udW0gYm9hcmQgYm9hcmRcXFwiO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBhdXRvIDFmciAxZnI7XFxyXFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIDFmcjtcXHJcXG4gIGdhcDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYmxhbmstZGl2IHtcXHJcXG4gIGdyaWQtYXJlYTogYmxhbms7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtbnVtIHtcXHJcXG4gIGdyaWQtYXJlYTogbGFiZWxzLW51bTtcXHJcXG5cXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtY2hhciB7XFxyXFxuICBncmlkLWFyZWE6IGxhYmVscy1jaGFyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4ubGFiZWxzLWNoYXIgPiBwIHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5sYWJlbHMtbnVtID4gcCB7XFxyXFxuICBmbGV4OiAxO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkIHtcXHJcXG4gIGdyaWQtYXJlYTogYm9hcmQ7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1jZWxsLTEge1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtY2VsbC0yIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcblxcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmJvYXJkLXBsYXllci0xID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgPiAuYm9hcmQtY2VsbC0yIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcclxcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMiA+IC5ib2FyZC1jZWxsLTI6aG92ZXIge1xcclxcbiAgZmlsdGVyOiBibHVyKDFyZW0pO1xcclxcbn1cXHJcXG5cXHJcXG4uYm9hcmQtcGxheWVyLTIgIC5vY2N1cGllZC1ub3QtaGl0IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXB5YXJkIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5zaGlweWFyZCA+IGgzIHtcXHJcXG4gIHdyaXRpbmctbW9kZTogdmVydGljYWwtcmw7XFxyXFxuICB0ZXh0LW9yaWVudGF0aW9uOiBzaWRld2F5cztcXHJcXG4gIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XFxyXFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcclxcbiAgZm9udC1zaXplOiAwLjdyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAzcHg7XFxyXFxuICBjb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwcyB7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgZm9udC1zaXplOiAwLjhyZW07XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcclxcbiAgY29sb3I6IHZhcigtLWNsci1kYXJrLWdyYXkpO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1mcm9udCB7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogNTAlO1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcC1iYWNrIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1saWdodC1ncmF5KTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDUwJTtcXHJcXG5cXHJcXG4gIGZsZXg6IDE7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uaGl0IHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1yZWQpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4ub2NjdXBpZWQtbm90LWhpdCB7XFxyXFxuICBoZWlnaHQ6IDQwJTtcXHJcXG4gIHdpZHRoOiA0MCU7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItZ3JheSk7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxufVxcclxcblxcclxcbi5oaXQtbWlzc2VkLXBsYXllci0xIHtcXHJcXG4gIGhlaWdodDogNTAlO1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ibHVlKTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhpdC1taXNzZWQtcGxheWVyLTIge1xcclxcbiAgaGVpZ2h0OiA1MCU7XFxyXFxuICB3aWR0aDogNTAlO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWdyYXkpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBNZW51IFN0eWxpbmcgKi9cXHJcXG4ubWVudS1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFxyXFxuICAvKiBib3JkZXI6IDIwcHggc29saWQ7XFxyXFxuICBib3JkZXItaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdmFyKC0tY2xyLWRhcmstZ3JheSksIHZhcigtLWNsci1ncmF5KSkgMTsgKi9cXHJcXG5cXHJcXG4gIGJvcmRlcjogMjBweCBzb2xpZCByZ2JhKDEwOCwgMTIyLCAxMzcsIC41KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wbGF5ZXIge1xcclxcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XFxyXFxuXFxyXFxuICAvKiBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTBweDtcXHJcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAxMHB4OyAqL1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAudGl0bGUge1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucHJpbWFyeS1oZWFkZXIgPiAuY29udGFpbmVyID4gLnN1YnRpdGxlIHtcXHJcXG4gIGZvbnQtc2l6ZTogMC42cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ubWVudS1jb250YWluZXIgPiAucGxheWVyXzEge1xcclxcbiAgZmxleDogbm9uZTtcXHJcXG4gIHdpZHRoOiA0MDBweDtcXHJcXG5cXHJcXG4gIC8qIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiAxMHB4O1xcclxcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwcHg7ICovXFxyXFxufVxcclxcblxcclxcbi5ib2FyZC1wbGF5ZXItMS1tZW51ID4gLmJvYXJkLWNlbGwtMSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtYmx1ZSk7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2xyLWRhcmstZ3JheSk7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gIHdpZHRoOiAxNDBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG5cXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwID4gZGl2IHtcXHJcXG4gIGZsZXg6IDE7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jbHItbGlnaHQtZ3JheSk7XFxyXFxuXFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGhlaWdodDogNDAlO1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNsci1ncmF5KTtcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmJhdHRsZXNoaXAge1xcclxcbiAgd2lkdGg6IDExMHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGVzdHJveWVyIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3VibWFyaW5lIHtcXHJcXG4gIHdpZHRoOiA4MHB4O1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3J1aXNlciB7XFxyXFxuICB3aWR0aDogNTBweDtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG59XFxyXFxuXFxyXFxuLmRyYWctb3ZlciB7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jbHItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRyYWdnYWJsZS1pbmRpY2F0b3Ige1xcclxcbiAgYm9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1jbHItcmVkKTtcXHJcXG4gIGN1cnNvcjogZ3JhYjtcXHJcXG59XFxyXFxuXFxyXFxuLmZvb3Rub3RlIHtcXHJcXG4gIGNvbG9yOiB2YXIoLS1jbHItZGFyay1ncmF5KTtcXHJcXG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG59XFxyXFxuXFxyXFxuLyogTW9iaWxlIExheW91dCAqL1xcclxcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2N3B4KSB7XFxyXFxuICBib2R5IHtcXHJcXG4gICAgZGlzcGxheTogYmxvY2s7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucHJpbWFyeS1oZWFkZXIge1xcclxcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC50aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5zdWJ0aXRsZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC41cmVtO1xcclxcbiAgfVxcclxcblxcclxcbiAgLmdhbWUge1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcblxcclxcbiAgICBib3JkZXI6IDIwcHggc29saWQgcmdiYSgxMDgsIDEyMiwgMTM3LCAuNSk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVycyB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnBsYXllciB7XFxyXFxuICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuICB9XFxyXFxuXFxyXFxuICAucGxheWVyXzEge1xcclxcbiAgICBmbGV4OiAxO1xcclxcbiAgfVxcclxcblxcclxcbiAgLnBsYXllcl8yIHtcXHJcXG4gICAgZmxleDogMjtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5ib2FyZC1jb250YWluZXIge1xcclxcbiAgICBtaW4td2lkdGg6IGF1dG87XFxyXFxuICAgIG1pbi1oZWlnaHQ6IGF1dG87XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubWVudS1jb250YWluZXIge1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAubWVudS1jb250YWluZXIgPiAucGxheWVyXzEge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgZmxleDogMTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAudGl0bGUge1xcclxcbiAgICBmb250LXNpemU6IDAuNzVyZW07XFxyXFxuICB9XFxyXFxuICBcXHJcXG4gIC5tZW51LWNvbnRhaW5lciA+IC5wcmltYXJ5LWhlYWRlciA+IC5jb250YWluZXIgPiAuc3VidGl0bGUge1xcclxcbiAgICBmb250LXNpemU6IDAuNXJlbTtcXHJcXG4gIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5pbXBvcnQgQm9hcmQgZnJvbSBcIi4vZmFjdG9yaWVzL0JvYXJkXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL2ZhY3Rvcmllcy9TaGlwXCI7XHJcbmltcG9ydCBDb29yZGluYXRlIGZyb20gXCIuL2ZhY3Rvcmllcy9Db29yZGluYXRlXCI7XHJcbmltcG9ydCBib2FyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL2JvYXJkQ29tcG9uZW50XCI7XHJcbmltcG9ydCBzaGlweWFyZENvbXBvbmVudCBmcm9tIFwiLi9jb21wb25lbnRzL3NoaXB5YXJkQ29tcG9uZW50XCI7XHJcbmltcG9ydCByZW5kZXIgZnJvbSBcIi4vbGliL3JlbmRlclwiO1xyXG5pbXBvcnQgcmFuZG9tTnVtYmVyIGZyb20gXCIuL2xpYi9yYW5kb21OdW1iZXJcIjtcclxuaW1wb3J0IHsgZHJhZ1N0YXJ0LCBkcmFnRW50ZXIsIGRyYWdPdmVyLCBkcmFnTGVhdmUgfSBmcm9tIFwiLi9saWIvZHJhZ1wiO1xyXG5cclxuY29uc3Qgc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNoaXBcIik7XHJcbmNvbnN0IGdhbWVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVcIik7XHJcbmNvbnN0IG1lbnVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1lbnUtY29udGFpbmVyXCIpO1xyXG5jb25zdCBwbGF5ZXJNZW51Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMS1tZW51XCIpO1xyXG5jb25zdCBwbGF5ZXJCb2FyZENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYm9hcmQtcGxheWVyLTFcIik7XHJcbmNvbnN0IHBsYXllclNoaXBzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwcy0xXCIpO1xyXG5jb25zdCBhaUJvYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZC1wbGF5ZXItMlwiKTtcclxuY29uc3QgYWlTaGlwc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcHMtMlwiKTtcclxuXHJcbi8vIEluaXRpYWxpemF0aW9uIG9mIEh1bWFuIFBsYXllciBCb2FyZFxyXG5jb25zdCBwbGF5ZXJCb2FyZCA9IG5ldyBCb2FyZCgxMCk7XHJcblxyXG4vLyBJbml0aWFsaXphdGlvbiBvZiBBSSBQbGF5ZXIgQm9hcmQgYW5kIFNoaXBzXHJcbmNvbnN0IEFJQm9hcmQgICAgID0gbmV3IEJvYXJkKDEwKTtcclxuY29uc3QgY3J1aXNlcjIgICAgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoMywgNiksIG5ldyBDb29yZGluYXRlKDMsIDcpXSwgXCJjcnVpc2VyXCIpO1xyXG5jb25zdCBzdWJtYXJpbmUyICA9IG5ldyBTaGlwKFtuZXcgQ29vcmRpbmF0ZSg2LCA5KSwgbmV3IENvb3JkaW5hdGUoNywgOSksIG5ldyBDb29yZGluYXRlKDgsIDkpXSwgXCJzdWJtYXJpbmVcIik7XHJcbmNvbnN0IGRlc3Ryb3llcjIgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDUsIDApLCBuZXcgQ29vcmRpbmF0ZSg1LCAxKSwgbmV3IENvb3JkaW5hdGUoNSwgMildLCBcImRlc3Ryb3llclwiKTtcclxuY29uc3QgYmF0dGxlc2hpcDIgPSBuZXcgU2hpcChbbmV3IENvb3JkaW5hdGUoMSwgMyksIG5ldyBDb29yZGluYXRlKDEsIDQpLCBuZXcgQ29vcmRpbmF0ZSgxLCA1KSwgbmV3IENvb3JkaW5hdGUoMSwgNildLCBcImJhdHRsZXNoaXBcIik7XHJcbmNvbnN0IGNhcnJpZXIyICAgID0gbmV3IFNoaXAoW25ldyBDb29yZGluYXRlKDgsIDEpLCBuZXcgQ29vcmRpbmF0ZSg4LCAyKSwgbmV3IENvb3JkaW5hdGUoOCwgMyksIG5ldyBDb29yZGluYXRlKDgsIDQpLCBuZXcgQ29vcmRpbmF0ZSg4LCA1KV0sIFwiY2FycmllclwiKTtcclxuXHJcbi8vIFBsYWNlIGluaXRpYWwgU2hpcHMgdG8gQUkgUGxheWVyIEJvYXJkXHJcbkFJQm9hcmQucGxhY2VTaGlwKGNydWlzZXIyKTtcclxuQUlCb2FyZC5wbGFjZVNoaXAoc3VibWFyaW5lMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGRlc3Ryb3llcjIpO1xyXG5BSUJvYXJkLnBsYWNlU2hpcChiYXR0bGVzaGlwMik7XHJcbkFJQm9hcmQucGxhY2VTaGlwKGNhcnJpZXIyKTtcclxuXHJcbi8vIFJlbmRlciB0byB0aGUgRE9NIHRoZSBpbml0aWFsIEh1bWFuIFBsYXllciBCb2FyZCBTdGF0ZSBmb3IgTWVudVxyXG5yZW5kZXIoYm9hcmRDb21wb25lbnQocGxheWVyQm9hcmQsIDEpLCBwbGF5ZXJNZW51Q29udGFpbmVyKTtcclxuXHJcbi8vIFJlbmRlciB0byB0aGUgRE9NIHRoZSBpbml0aWFsIEFJIFBsYXllciBCb2FyZCBhbmQgU2hpcHMgU3RhdGVcclxucmVuZGVyKGJvYXJkQ29tcG9uZW50KEFJQm9hcmQsIDIpLCBhaUJvYXJkQ29udGFpbmVyKTtcclxucmVuZGVyKHNoaXB5YXJkQ29tcG9uZW50KEFJQm9hcmQuZmxlZXQpLCBhaVNoaXBzQ29udGFpbmVyKTtcclxuXHJcbi8vIEF0dGFjaCBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIEh1bWFuIFBsYXllciBGaWVsZHMgYW5kIFNoaXBzIGZvciBkcmFnL2Ryb3AgZnVuY3Rpb25hbGl0eVxyXG5maWVsZHNBZGRFdmVudExpc3RlbmVyKCk7XHJcbnNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpKTtcclxuXHJcbmZ1bmN0aW9uIGRyb3AoZSkge1xyXG4gIGNvbnN0IGlkID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XHJcbiAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKFtdLCBgJHtpZH1gKTtcclxuICBjb25zdCBkcmFnZ2FibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgY29uc3Qgc2hpcExlbmd0aCA9IGRyYWdnYWJsZS5kYXRhc2V0LnNoaXBsZW5ndGg7XHJcbiAgbGV0IGNvb3JkWCA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQuY29vcmR4KTtcclxuICBsZXQgY29vcmRZID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb29yZHkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgc2hpcC5jb29yZHMucHVzaChuZXcgQ29vcmRpbmF0ZShjb29yZFgsIGNvb3JkWSArIGkpKTtcclxuICB9XHJcbiAgXHJcbiAgaWYgKHBsYXllckJvYXJkLmNhblBsYWNlU2hpcChzaGlwKSkge1xyXG4gICAgcGxheWVyQm9hcmQucGxhY2VTaGlwKHNoaXApO1xyXG4gICAgZHJhZ2dhYmxlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9IGVsc2UgcmV0dXJuO1xyXG5cclxuICBpZiAocGxheWVyQm9hcmQuZmxlZXQubGVuZ3RoID09PSA1KSB7XHJcbiAgICBtZW51Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGdhbWVDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKGJvYXJkQ29tcG9uZW50KHBsYXllckJvYXJkLCAxKSwgcGxheWVyTWVudUNvbnRhaW5lcik7XHJcbiAgcmVuZGVyKGJvYXJkQ29tcG9uZW50KHBsYXllckJvYXJkLCAxKSwgcGxheWVyQm9hcmRDb250YWluZXIpO1xyXG4gIHJlbmRlcihzaGlweWFyZENvbXBvbmVudChwbGF5ZXJCb2FyZC5mbGVldCksIHBsYXllclNoaXBzQ29udGFpbmVyKTtcclxuXHJcbiAgZmllbGRzQWRkRXZlbnRMaXN0ZW5lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWVsZHNBZGRFdmVudExpc3RlbmVyKCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY2VsbC0xXCIpLmZvckVhY2goY2VsbCA9PiB7XHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZHJhZ0VudGVyKVxyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZHJhZ092ZXIpO1xyXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIGRyYWdMZWF2ZSk7XHJcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyb3ApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBIdW1hbiBQbGF5ZXIgR2FtZSBDb250cm9sbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZVBsYXllclR1cm4oKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jZWxsLTJcIikuZm9yRWFjaCgoY2VsbCwgaW5kZXgpID0+IHtcclxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgIGxldCBjb29yZHMgPSBBcnJheS5mcm9tKFN0cmluZyhpbmRleCksIE51bWJlcik7XHJcblxyXG4gICAgICBpZiAoY29vcmRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGNvb3Jkcy51bnNoaWZ0KDApO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBBSUJvYXJkLnBsYWNlU2hvdChuZXcgQ29vcmRpbmF0ZShjb29yZHNbMF0sIGNvb3Jkc1sxXSkpO1xyXG4gICAgICBBSUJvYXJkLmdldEZsZWV0U3RhdHVzKCk7XHJcblxyXG4gICAgICByZW5kZXIoYm9hcmRDb21wb25lbnQoQUlCb2FyZCwgMiksIGFpQm9hcmRDb250YWluZXIpO1xyXG4gICAgICByZW5kZXIoc2hpcHlhcmRDb21wb25lbnQoQUlCb2FyZC5mbGVldCksIGFpU2hpcHNDb250YWluZXIpO1xyXG5cclxuICAgICAgaWYgKEFJQm9hcmQuaXNHYW1lT3ZlcigpKSB7XHJcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoKCkgPT4gYWxlcnQoYEdhbWUgT3ZlciEgWW91IHdvbiFgKSwgNTAwKTtcclxuICAgICAgfSBcclxuXHJcbiAgICAgIC8vIFBhc3MgdGhlIGN1cnJlbnQgdHVybiB0byBBSSBQbGF5ZXIgR2FtZSBDb250cm9sbGVyIGFmdGVyIDEgc2Vjb25kIGRlbGF5XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGhhbmRsZU9wcG9uZW50VHVybigpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBBSSBQbGF5ZXIgR2FtZSBDb250cm9sbGVyXHJcbmZ1bmN0aW9uIGhhbmRsZU9wcG9uZW50VHVybigpIHtcclxuICBsZXQgY29vcmRzID0gbmV3IENvb3JkaW5hdGUocmFuZG9tTnVtYmVyKDAsIDkpLCByYW5kb21OdW1iZXIoMCwgOSkpO1xyXG5cclxuICAvKipcclxuICAgKiBJZiB0aGUgc2hvdCBpcyB2YWxpZCwgcGxhY2UgdGhlIHNob3QuXHJcbiAgICogRWxzZSwgZ2VuZXJhdGUgYSBuZXcgY29vcmRzIHdoaWxlIHNob3QgaXMgaW52YWxpZCBhbmQgdHJ5IGFnYWluLlxyXG4gICAqL1xyXG4gIGlmIChwbGF5ZXJCb2FyZC5jYW5QbGFjZVNob3QoY29vcmRzKSkge1xyXG4gICAgcGxheWVyQm9hcmQucGxhY2VTaG90KGNvb3Jkcyk7XHJcbiAgICBwbGF5ZXJCb2FyZC5nZXRGbGVldFN0YXR1cygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgaW52YWxpZFNob3QgPSB0cnVlO1xyXG5cclxuICAgIHdoaWxlIChpbnZhbGlkU2hvdCkge1xyXG4gICAgICBjb29yZHMgPSBuZXcgQ29vcmRpbmF0ZShyYW5kb21OdW1iZXIoMCwgOSksIHJhbmRvbU51bWJlcigwLCA5KSk7XHJcblxyXG4gICAgICBpZiAocGxheWVyQm9hcmQuY2FuUGxhY2VTaG90KGNvb3JkcykpIHtcclxuICAgICAgICBwbGF5ZXJCb2FyZC5wbGFjZVNob3QoY29vcmRzKTtcclxuICAgICAgICBwbGF5ZXJCb2FyZC5nZXRGbGVldFN0YXR1cygpO1xyXG4gICAgICAgIGludmFsaWRTaG90ID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbmRlcihib2FyZENvbXBvbmVudChwbGF5ZXJCb2FyZCwgMSksIHBsYXllckJvYXJkQ29udGFpbmVyKTtcclxuICByZW5kZXIoc2hpcHlhcmRDb21wb25lbnQocGxheWVyQm9hcmQuZmxlZXQpLCBwbGF5ZXJTaGlwc0NvbnRhaW5lcik7XHJcblxyXG4gIGlmIChwbGF5ZXJCb2FyZC5pc0dhbWVPdmVyKCkpIHtcclxuICAgIHJldHVybiBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0KGBHYW1lIE92ZXIhIE9wcG9uZW50IHdvbiFgKSwgNTAwKTtcclxuICB9XHJcblxyXG4gIC8vIFBhc3MgdGhlIGN1cnJlbnQgdHVybiB0byBIdW1hbiBQbGF5ZXIgR2FtZSBDb250cm9sbGVyXHJcbiAgaGFuZGxlUGxheWVyVHVybigpO1xyXG59XHJcblxyXG5oYW5kbGVQbGF5ZXJUdXJuKCk7Il0sIm5hbWVzIjpbImJvYXJkQ29tcG9uZW50IiwidGhlQm9hcmQiLCJwbGF5ZXIiLCJmaWVsZFN0YXR1cyIsIm1hcCIsInJvdyIsImNvb3JkWCIsImNvbCIsImNvb3JkWSIsInN0YXR1cyIsImdldEZpZWxkU3RhdHVzIiwiam9pbiIsInNoaXB5YXJkQ29tcG9uZW50IiwidGhlRmxlZXQiLCJzaGlwIiwiZ2V0TmFtZSIsImNvb3JkcyIsImxlbmd0aCIsIkJvYXJkIiwic2l6ZSIsImZsZWV0IiwiQXJyYXkiLCJ4IiwiaiIsImZpbGwiLCJ5IiwidGhlU2hpcCIsImZvckVhY2giLCJjb29yZCIsImdldFgiLCJnZXRZIiwiRXJyb3IiLCJwdXNoIiwidGhlQ29vcmQiLCJmaWVsZCIsImhhc0Nvb3JkaW5hdGVzIiwiaXNIaXQiLCJkZXN0cm95ZWRTaGlwIiwiZmluZCIsImhhc1N1bmsiLCJpbmRleCIsImluZGV4T2YiLCJzcGxpY2UiLCJ1bmRlZmluZWQiLCJDb29yZGluYXRlIiwiU2hpcCIsIm5hbWUiLCJhdENvb3JkIiwiZXF1YWxzIiwic29tZSIsImRyYWdMZWF2ZSIsImUiLCJ0YXJnZXQiLCJzdHlsZSIsImJvcmRlciIsImRyYWdPdmVyIiwicHJldmVudERlZmF1bHQiLCJkcmFnRW50ZXIiLCJkcmFnU3RhcnQiLCJkYXRhVHJhbnNmZXIiLCJzZXREYXRhIiwiaWQiLCJyYW5kb21JbnRlZ2VyIiwibWluIiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmVuZGVyIiwidGVtcGxhdGUiLCJub2RlIiwiaW5uZXJIVE1MIiwicmFuZG9tTnVtYmVyIiwic2hpcHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJnYW1lQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsIm1lbnVDb250YWluZXIiLCJwbGF5ZXJNZW51Q29udGFpbmVyIiwicGxheWVyQm9hcmRDb250YWluZXIiLCJwbGF5ZXJTaGlwc0NvbnRhaW5lciIsImFpQm9hcmRDb250YWluZXIiLCJhaVNoaXBzQ29udGFpbmVyIiwicGxheWVyQm9hcmQiLCJBSUJvYXJkIiwiY3J1aXNlcjIiLCJzdWJtYXJpbmUyIiwiZGVzdHJveWVyMiIsImJhdHRsZXNoaXAyIiwiY2FycmllcjIiLCJwbGFjZVNoaXAiLCJmaWVsZHNBZGRFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRyb3AiLCJnZXREYXRhIiwiZHJhZ2dhYmxlIiwiZ2V0RWxlbWVudEJ5SWQiLCJzaGlwTGVuZ3RoIiwiZGF0YXNldCIsInNoaXBsZW5ndGgiLCJwYXJzZUludCIsImNvb3JkeCIsImNvb3JkeSIsImkiLCJjYW5QbGFjZVNoaXAiLCJkaXNwbGF5IiwiY2VsbCIsImhhbmRsZVBsYXllclR1cm4iLCJmcm9tIiwiU3RyaW5nIiwiTnVtYmVyIiwidW5zaGlmdCIsInBsYWNlU2hvdCIsImdldEZsZWV0U3RhdHVzIiwiaXNHYW1lT3ZlciIsInNldFRpbWVvdXQiLCJhbGVydCIsImhhbmRsZU9wcG9uZW50VHVybiIsImNhblBsYWNlU2hvdCIsImludmFsaWRTaG90Il0sInNvdXJjZVJvb3QiOiIifQ==