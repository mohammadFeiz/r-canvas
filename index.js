"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Canvas = /*#__PURE__*/function (_Component) {
  _inherits(Canvas, _Component);

  var _super = _createSuper(Canvas);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _super.call(this, props);
    _this.PI = Math.PI / 180;
    _this.dom = /*#__PURE__*/(0, _react.createRef)();
    _this.width = 0;
    _this.height = 0;
    (0, _jquery.default)(window).on("resize", _this.resize.bind(_assertThisInitialized(_this)));
    _this.mousePosition = [Infinity, Infinity];
    return _this;
  }

  _createClass(Canvas, [{
    key: "getDip",
    value: function getDip(p1, p2, prep) {
      var dip = (p1[1] - p2[1]) / (p1[0] - p2[0]);
      dip = prep ? -1 / dip : dip;

      if (dip === -Infinity) {
        dip = Math.abs(Infinity);
      }

      return dip;
    }
  }, {
    key: "getAvg",
    value: function getAvg(arr) {
      var x = 0,
          y = 0,
          length = arr.length;

      for (var i = 0; i < length; i++) {
        x += arr[i][0];
        y += arr[i][1];
      }

      return [x / length, y / length];
    }
  }, {
    key: "getAngle",
    value: function getAngle(a, b) {
      var deltaX = b[0] - a[0],
          deltaY = b[1] - a[1];
      var length = this.getLength(a, b);
      var angle = Math.acos(deltaX / this.getLength(a, b)) / Math.PI * 180;
      angle = Math.sign(deltaY) < 0 ? 360 - angle : angle;
      return parseFloat(angle.toFixed(4));
    }
  }, {
    key: "getLength",
    value: function getLength(p1, p2) {
      return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    }
  }, {
    key: "getPointOfLine",
    value: function getPointOfLine(a, b, obj) {
      if (_typeof(a) !== "object" || _typeof(obj) !== "object") {
        return false;
      }

      var typeB = _typeof(b);

      var dip = typeB === "object" ? this.getDip(a, b) : b;
      var x = obj.x,
          y = obj.y;

      if (dip === Infinity) {
        return y === undefined ? false : [a[0], y];
      }

      if (dip === 0) {
        return x === undefined ? false : [x, a[1]];
      }

      if (x !== undefined) {
        return [x, dip * (x - a[0]) + a[1]];
      }

      if (y !== undefined) {
        return [(y - a[1]) / dip + a[0], y];
      }

      return false;
    }
  }, {
    key: "getPrependicularPointFromLine",
    value: function getPrependicularPointFromLine(p1, p2, p, offset) {
      if (p === "center") {
        p = this.getAvg(p1, p2);
      } else if (p === "start") {
        p = p1;
      } else if (p === "end") {
        p = p2;
      }

      if (!offset) {
        return p;
      }

      var angle = this.getAngle(p1, p2);
      var deltaX = offset * Math.cos((angle - 90) * Math.PI / 180);
      var deltaY = offset * Math.sin((angle - 90) * Math.PI / 180);
      return {
        x: p[0] + deltaX,
        y: p[1] + deltaY,
        deltaX: deltaX,
        deltaY: deltaY
      };
    }
  }, {
    key: "getArcBy3Points",
    value: function getArcBy3Points(p1, p2, p3) {
      var meet = this.getMeet(this.getAvg([p1, p2]), this.getDip(p1, p2, true), this.getAvg([p2, p3]), this.getDip(p2, p3, true));

      if (!meet) {
        return false;
      }

      var x = meet[0],
          y = meet[1];
      var a1 = this.getAngle(meet, p1),
          a2 = this.getAngle(meet, p2),
          a3 = this.getAngle(meet, p3);
      var slice;

      if (a1 < a2 && a2 < a3) {
        slice = [a1, a3];
      } else if (a2 < a3 && a3 < a1) {
        slice = [a1, a3];
      } else if (a3 < a1 && a1 < a2) {
        slice = [a1, a3];
      } else if (a3 < a2 && a2 < a1) {
        slice = [a3, a1];
      } else if (a1 < a3 && a3 < a2) {
        slice = [a3, a1];
      } else if (a2 < a1 && a1 < a3) {
        slice = [a3, a1];
      } else {
        slice = [0, 0];
      }

      return {
        x: x,
        y: y,
        r: this.getLength(p1, [x, y]),
        slice: slice
      };
    }
  }, {
    key: "getMeet",
    value: function getMeet(a1, a2, b1, b2) {
      if (!Array.isArray(a1) || !Array.isArray(b1)) {
        return false;
      }

      var dip1 = Array.isArray(a2) ? this.getDip(a1, a2) : a2;
      var dip2 = Array.isArray(b2) ? this.getDip(b1, b2) : b2;

      if (dip1 === dip2) {
        return false;
      }

      if (dip1 === Infinity) {
        return this.getPointOfLine(b1, dip2, {
          x: a1[0]
        });
      }

      if (dip2 === Infinity) {
        return this.getPointOfLine(a1, dip1, {
          x: b1[0]
        });
      }

      var x = (dip1 * a1[0] - dip2 * b1[0] + b1[1] - a1[1]) / (dip1 - dip2);
      var y = dip1 * (x - a1[0]) + a1[1];
      return [x, y];
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(selector, event, action) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "bind";
      var me = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      };
      event = "ontouchstart" in document.documentElement ? me[event] : event;
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      element.unbind(event, action);

      if (type === "bind") {
        element.bind(event, action);
      }
    }
  }, {
    key: "getClient",
    value: function getClient(e) {
      return "ontouchstart" in document.documentElement ? {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      } : {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, {
    key: "getValueByRange",
    value: function getValueByRange(value, start, end) {
      var Value = typeof value === 'function' ? value() : value;

      var type = _typeof(Value);

      if (type === undefined) {
        return start;
      }

      if (type === "number") {
        return Value;
      }

      return this.getValueByPercent(parseFloat(Value), start, end);
    }
  }, {
    key: "getValueByPercent",
    value: function getValueByPercent(percent, start, end) {
      return start + percent * (end - start) / 100;
    }
  }, {
    key: "validateItem",
    value: function validateItem(item) {
      if (typeof item.showPivot !== "boolean") {
        console.error("r-canvas => item.showPivot must be boolean!!!");
      }

      if (["bevel", "round", "miter"].indexOf(item.lineJoin) === -1) {
        console.error("r-canvas => item.lineJoin must be bevel,round or miter!!!");
      }

      if (["butt", "round", "square"].indexOf(item.lineCap) === -1) {
        console.error("r-canvas => item.lineCap must be butt,round or square!!!");
      }

      if (["number", "string"].indexOf(_typeof(item.rotate)) === -1) {
        console.error('r-canvas =>item.rotate must be number or string contain number and "%"(example:120 or "50%")!!!');
      }

      if (typeof item.rotate === "string" && item.rotate.indexOf("%") === -1) {
        console.error('r-canvas =>missing "%" in item.rotate string!!!');
      }

      if (isNaN(item.angle)) {
        console.error("r-canvas => item.angle must be number!!!");
      }

      if (["number", "string"].indexOf(_typeof(item.x)) === -1) {
        console.error('r-canvas =>item.x must be number or string contain number and "%"(example:120 or "50%")!!!');
      }

      if (typeof item.x === "string" && item.x.indexOf("%") === -1) {
        console.error('r-canvas =>missing "%" in item.x string!!!');
      }

      if (isNaN(item.x)) {
        console.error("r-canvas => item.x must be number!!!");
      }

      if (["number", "string"].indexOf(_typeof(item.y)) === -1) {
        console.error('r-canvas =>item.y must be number or string contain number and "%"(example:120 or "50%")!!!');
      }

      if (typeof item.y === "string" && item.y.indexOf("%") === -1) {
        console.error('r-canvas =>missing "%" in item.y string!!!');
      }

      if (isNaN(item.y)) {
        console.error("r-canvas => item.y must be number!!!");
      }

      if (isNaN(item.lineWidth) || item.lineWidth < 0) {
        console.error("r-canvas => item.lineWidth must be number >= 0!!!");
      }

      if (isNaN(item.opacity) || item.opacity < 0 || item.opacity > 1) {
        console.error("r-canvas => item.opacity must be a number between 0 and 1!!!");
      }

      if (item.arcPoints) {
        if (!Array.isArray(item.arcPoints) || item.arcPoints.length !== 3) {
          console.error("r-canvas => item.arcPoints must be an array with 3 member!!!");
        }
      }

      if (item.pivot) {
        if (!Array.isArray(item.pivot) || item.pivot.length !== 2) {
          console.error("r-canvas => item.pivot must be an array with 2 numeric member!!!");
        }
      }

      if (item.dash) {
        if (!Array.isArray(item.dash) || item.dash.length !== 2) {
          console.error("r-canvas => item.dash must be an array with 2 numeric member!!!");
        }
      }

      if (item.slice) {
        if (!Array.isArray(item.slice) || item.slice.length !== 2) {
          console.error("r-canvas => item.slice must be an array with 2 numeric member!!!");
        }
      }

      if (item.trianglePoints !== undefined) {
        if (!Array.isArray(item.trianglePoints) || item.trianglePoints.length !== 2) {
          console.error("r-canvas => item.trianglePoint must be an array with 2 member!!!");
        }

        if (!Array.isArray(item.trianglePoints[0]) || item.trianglePoints[0].length !== 2) {
          console.error("r-canvas => item.trianglePoint[0] must be an array with 2 numeric member!!!");
        }

        if (!Array.isArray(item.trianglePoints[1]) || item.trianglePoints[1].length !== 2) {
          console.error("r-canvas => item.trianglePoint[1] must be an array with 2 numeric member!!!");
        }

        if (!Array.isArray(item.trianglePoints[0]) || item.trianglePoints[0].length !== 2) {
          console.error("r-canvas => item.trianglePoint[0] must be an array with 2 numeric member!!!");
        }

        if (isNaN(item.trianglewidth) || item.triangleWidth < 0) {
          console.error("r-canvas => item.triangleWidth must be a number greater than or equal 0");
        }
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this2 = this;

      this.timer = 0;
      clearInterval(this.interval);
      this.interval = setInterval(function () {
        _this2.timer++;

        if (_this2.timer >= 20) {
          _this2.update();

          clearInterval(_this2.interval);
        }
      }, 10);
    }
  }, {
    key: "getRandomColor",
    value: function getRandomColor(color) {
      var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
      return function (color) {
        function getRGB() {
          return [range + Math.round(Math.random() * (255 - range)), range + Math.round(Math.random() * (255 - range)), range + Math.round(Math.random() * (255 - range))];
        }

        var color = getRGB();
        color[Math.round(Math.random() * 3)] = 0;
        return {
          color: "rgb(".concat(color[0], ",").concat(color[1], ",").concat(color[2], ")"),
          r: color[0],
          g: color[1],
          b: color[2]
        };
      }(color);
    }
  }, {
    key: "getCoordsByPivot",
    value: function getCoordsByPivot(item) {
      var pivot = item.pivot,
          x = item.x,
          y = item.y;

      if (!pivot) {
        return [x, y];
      }

      var _ref = typeof pivot === "function" ? pivot(item) : pivot,
          _ref2 = _slicedToArray(_ref, 2),
          _ref2$ = _ref2[0],
          px = _ref2$ === void 0 ? 0 : _ref2$,
          _ref2$2 = _ref2[1],
          py = _ref2$2 === void 0 ? 0 : _ref2$2;

      return [x - this.getValueByRange(px, 0, this.width), y - this.getValueByRange(py, 0, this.height)];
    }
  }, {
    key: "getItem",
    value: function getItem(item) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _parent$x = parent.x,
          parentx = _parent$x === void 0 ? 0 : _parent$x,
          _parent$y = parent.y,
          parenty = _parent$y === void 0 ? 0 : _parent$y,
          _parent$rotate = parent.rotate,
          parentrotate = _parent$rotate === void 0 ? 0 : _parent$rotate,
          _parent$opacity = parent.opacity,
          parentOpacity = _parent$opacity === void 0 ? 1 : _parent$opacity;
      var debugMode = this.props.debugMode;
      item = typeof item === "function" ? { ...item(this.props)
      } : item; //set default props

      item = { ...{
          showPivot: false,
          lineJoin: "miter",
          lineCap: "butt",
          rotate: 0,
          angle: 0,
          x: 0,
          y: 0,
          lineWidth: 1,
          opacity: 1
        },
        ...item
      };
      item.rect = false;

      if (!item.stroke && !item.fill) {
        item.stroke = "#000";
      } //validate item


      if (debugMode) {
        this.validateItem(item);
      } //set related props


      item.rotate = this.getValueByRange(item.rotate, 0, 360);
      item.x = this.getValueByRange(item.x, 0, this.width) + parentx;
      item.y = this.getValueByRange(item.y, 0, this.height) + parenty;
      item.opacity *= parentOpacity;
      item.pivotedCoords = this.getCoordsByPivot(item); //converts

      if (item.image) {} else if (item.width !== undefined || item.height !== undefined) {
        var _item = item,
            _item$width = _item.width,
            _width = _item$width === void 0 ? 20 : _item$width,
            _item$height = _item.height,
            height = _item$height === void 0 ? 20 : _item$height,
            _item$corner = _item.corner,
            corner = _item$corner === void 0 ? [] : _item$corner;

        _width = this.getValueByRange(_width, 0, this.width);
        height = this.getValueByRange(height, 0, this.height);

        var _corner = _slicedToArray(corner, 4),
            _corner$ = _corner[0],
            c0 = _corner$ === void 0 ? 0 : _corner$,
            _corner$2 = _corner[1],
            c1 = _corner$2 === void 0 ? 0 : _corner$2,
            _corner$3 = _corner[2],
            c2 = _corner$3 === void 0 ? 0 : _corner$3,
            _corner$4 = _corner[3],
            c3 = _corner$4 === void 0 ? 0 : _corner$4;

        item.rect = true;

        var _item$pivotedCoords = _slicedToArray(item.pivotedCoords, 2),
            x = _item$pivotedCoords[0],
            y = _item$pivotedCoords[1];

        item.points = [[x + _width / 2, y], [x + _width, y, c1], [x + _width, y + height, c2], [x, y + height, c3], [x, y, c0], [x + _width / 2, y, c1]];
      } else if (item.arcPoints) {
        var _item2 = item,
            arcPoints = _item2.arcPoints,
            _item2$pivot = _item2.pivot,
            pivot = _item2$pivot === void 0 ? [] : _item2$pivot;
        var arc = this.getArcBy3Points.apply(this, _toConsumableArray(arcPoints));
        item.r = arc.r;
        item.slice = arc.slice;
        item.pivot = [-arc.x + (pivot[0] || 0), -arc.y + (pivot[1] || 0)];
      } else if (item.trianglePoints) {
        var _item3 = item,
            _item3$corner = _item3.corner,
            _corner2 = _item3$corner === void 0 ? [] : _item3$corner;

        var _trianglePoints = trianglePoints,
            _trianglePoints2 = _slicedToArray(_trianglePoints, 2),
            p1 = _trianglePoints2[0],
            p2 = _trianglePoints2[1];

        var width = triangleWidth;
        var t1 = this.getPrependicularPointFromLine(p1, p2, "start", width / 2);
        var t2 = this.getPrependicularPointFromLine(p1, p2, "start", -width / 2);
        item.points = [[p1[0], p1[1], _corner2[0]], [t1.x, t1.y, _corner2[1]], [p2[0], p2[1], _corner2[2]], [t2.x, t2.y], p1];
      } //set type


      if (item.items) {
        item.type = "Group";
      } else if (item.points) {
        item.type = "Line";
      } else if (item.r) {
        item.type = "Arc";
      } else if (item.image) {
        item.type = "Image";
      } else if (item.text !== undefined) {
        item.type = "Text";
      }

      return item;
    }
  }, {
    key: "draw",
    value: function draw() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.items;
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var Items = typeof items === "function" ? items() : items;
      var zoom = this.props.zoom,
          ctx = this.ctx;

      for (var i = 0; i < Items.length; i++) {
        var item = this.getItem(Items[i], parent);

        if (item.show === false) {
          continue;
        }

        ctx.save();
        ctx.beginPath();
        this.rotate(item.rotate, [item.x, item.y]);
        ctx.globalAlpha = item.opacity;
        ctx.lineCap = item.lineCap;
        ctx.lineJoin = item.lineJoin;
        this.shadow(item, ctx);
        item.dash && ctx.setLineDash(item.dash);
        ctx.lineWidth = item.lineWidth * zoom;
        ctx.strokeStyle = item.stroke === "random" ? this.getRandomColor().color : this.getColor(item.stroke, item.pivotedCoords);
        ctx.fillStyle = item.fill === "random" ? this.getRandomColor().color : this.getColor(item.fill, item.pivotedCoords);
        var Index = index.concat(i);

        if (item.type) {
          this["draw" + item.type](item, Index);
        } else {
          var str = "items[" + Index.join("].items[") + "]";
          console.error("r-canvas => receive invalid item in " + str + ' :' + JSON.stringify(item));
        }

        if (item.showPivot) {
          this.showPivot(item.x, item.y);
        }

        if (this.eventMode && item[this.eventMode]) {
          var X = this.mousePosition[0] + this.axisPosition[0];
          var Y = this.mousePosition[1] + this.axisPosition[1];

          if (item.fill && ctx.isPointInPath(X, Y)) {
            this.item = item;
          } else if (item.stroke && ctx.isPointInStroke(X, Y)) {
            this.item = item;
          }
        }

        ctx.closePath();
        ctx.restore();
      }
    }
  }, {
    key: "drawGroup",
    value: function drawGroup(item, index) {
      var _item$pivotedCoords2 = _slicedToArray(item.pivotedCoords, 2),
          X = _item$pivotedCoords2[0],
          Y = _item$pivotedCoords2[1];

      this.draw(item.items, {
        x: X,
        y: Y,
        rotate: item.rotate,
        opacity: item.opacity
      }, index);
    }
  }, {
    key: "drawText",
    value: function drawText(_ref3) {
      var _ref3$align = _ref3.align,
          align = _ref3$align === void 0 ? [0, 0] : _ref3$align,
          _ref3$fontSize = _ref3.fontSize,
          fontSize = _ref3$fontSize === void 0 ? 12 : _ref3$fontSize,
          _ref3$text = _ref3.text,
          text = _ref3$text === void 0 ? "Text" : _ref3$text,
          fill = _ref3.fill,
          stroke = _ref3.stroke,
          pivotedCoords = _ref3.pivotedCoords;

      var zoom = this.props.zoom,
          _pivotedCoords = _slicedToArray(pivotedCoords, 2),
          X = _pivotedCoords[0],
          Y = _pivotedCoords[1],
          _this$getTextAlign = this.getTextAlign(align),
          _this$getTextAlign2 = _slicedToArray(_this$getTextAlign, 2),
          textAlign = _this$getTextAlign2[0],
          textBaseline = _this$getTextAlign2[1];

      this.ctx.textAlign = textAlign;
      this.ctx.textBaseline = textBaseline;
      this.ctx.font = fontSize * zoom + "px arial";
      stroke && this.ctx.strokeText(text, X * zoom, Y * zoom);
      fill && this.ctx.fillText(text, X * zoom, Y * zoom);
    }
  }, {
    key: "drawImage",
    value: function drawImage(_ref4) {
      var _this3 = this;

      var pivotedCoords = _ref4.pivotedCoords,
          width = _ref4.width,
          height = _ref4.height,
          image = _ref4.image;
      var zoom = this.props.zoom;

      var _pivotedCoords2 = _slicedToArray(pivotedCoords, 2),
          X = _pivotedCoords2[0],
          Y = _pivotedCoords2[1];

      var fr = new FileReader();
      var img;

      fr.onload = function () {
        img = new Image();

        img.onload = function () {
          return _this3.ctx.drawImage(img, X * zoom, Y * zoom, width * zoom, height * zoom);
        };

        img.src = fr.result;
      };

      fr.readAsDataURL(image);
    }
  }, {
    key: "drawLine",
    value: function drawLine(_ref5) {
      var points = _ref5.points,
          close = _ref5.close,
          stroke = _ref5.stroke,
          fill = _ref5.fill,
          pivotedCoords = _ref5.pivotedCoords,
          rect = _ref5.rect;

      if (points.length < 1) {
        return false;
      }

      var Coords = rect ? [0, 0] : pivotedCoords;

      var _Coords = _slicedToArray(Coords, 2),
          X = _Coords[0],
          Y = _Coords[1];

      var zoom = this.props.zoom;
      var start = [this.getValueByRange(points[0][0], 0, this.width) + X, this.getValueByRange(points[0][1], 0, this.height) + Y];
      this.ctx.moveTo(start[0] * zoom, start[1] * zoom);
      var beforePoint = points[0];

      for (var i = 1; i < points.length; i++) {
        var _points$i = _slicedToArray(points[i], 3),
            x = _points$i[0],
            y = _points$i[1],
            r = _points$i[2];

        beforePoint = [x, y];
        var point = [this.getValueByRange(x, 0, this.width) + X, this.getValueByRange(y, 0, this.height) + Y];

        if (r) {
          var _ref6 = points[i + 1] ? points[i + 1] : points[0],
              _ref7 = _slicedToArray(_ref6, 2),
              _x = _ref7[0],
              _y = _ref7[1];

          var nextPoint = [this.getValueByRange(_x, 0, this.width) + X, this.getValueByRange(_y, 0, this.height) + Y];
          this.ctx.arcTo(point[0] * zoom, point[1] * zoom, nextPoint[0] * zoom, nextPoint[1] * zoom, r * zoom);
        } else {
          this.ctx.lineTo(point[0] * zoom, point[1] * zoom);
        }
      }

      if (points.length > 2 && close) {
        this.ctx.lineTo(start[0] * zoom, start[1] * zoom);
      }

      stroke && this.ctx.stroke();
      fill && this.ctx.fill();
    }
  }, {
    key: "drawArc",
    value: function drawArc(_ref8) {
      var pivotedCoords = _ref8.pivotedCoords,
          r = _ref8.r,
          _ref8$slice = _ref8.slice,
          slice = _ref8$slice === void 0 ? [0, 360] : _ref8$slice,
          fill = _ref8.fill,
          stroke = _ref8.stroke;

      var _pivotedCoords3 = _slicedToArray(pivotedCoords, 2),
          X = _pivotedCoords3[0],
          Y = _pivotedCoords3[1];

      var _this$props$rotateSet = this.props.rotateSetting.direction,
          direction = _this$props$rotateSet === void 0 ? "clock" : _this$props$rotateSet;
      r = this.getValueByRange(r, this.width, this.height);
      r = r < 0 ? 0 : r;
      slice = [this.getValueByRange(slice[0], 0, 360), this.getValueByRange(slice[1], 0, 360)];

      if (direction === "clockwise") {
        var a = slice[0],
            b = slice[1];
        slice = [-b, -a];
      }

      var zoom = this.props.zoom;
      this.ctx.arc(X * zoom, Y * zoom, r * zoom, slice[0] * this.PI, slice[1] * this.PI);
      stroke && this.ctx.stroke();
      fill && this.ctx.fill();
    }
  }, {
    key: "showPivot",
    value: function showPivot(x, y) {
      var ctx = this.ctx;
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 360 * Math.PI / 180);
      ctx.moveTo(x - 15, y);
      ctx.lineTo(x + 15, y);
      ctx.moveTo(x, y - 15);
      ctx.lineTo(x, y + 15);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255,100,0,.3)";
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var _ref9 = arguments.length > 1 ? arguments[1] : undefined,
          _ref10 = _slicedToArray(_ref9, 2),
          X = _ref10[0],
          Y = _ref10[1];

      if (angle === 0) {
        return;
      }

      var _this$props = this.props,
          zoom = _this$props.zoom,
          rotateSetting = _this$props.rotateSetting;
      var _rotateSetting$direct = rotateSetting.direction,
          direction = _rotateSetting$direct === void 0 ? "clock" : _rotateSetting$direct;
      angle = angle * this.PI * (direction === "clockwise" ? -1 : 1);
      var s = Math.sin(angle),
          c = Math.cos(angle);
      this.ctx.rotate(angle);
      var x = X * c - -Y * s - X;
      var y = -Y - (X * s + -Y * c);
      this.ctx.translate(x * zoom, y * zoom);
    }
  }, {
    key: "update",
    value: function update() {
      var _this$props2 = this.props,
          getSize = _this$props2.getSize,
          grid = _this$props2.grid,
          zoom = _this$props2.zoom;
      var dom = (0, _jquery.default)(this.dom.current);
      this.width = dom.width();
      this.height = dom.height();

      if (dom[0] === undefined || dom[0] === null) {
        return;
      }

      dom[0].width = this.width;
      dom[0].height = this.height;

      var _this$props$axisPosit = _slicedToArray(this.props.axisPosition, 2),
          _this$props$axisPosit2 = _this$props$axisPosit[0],
          x = _this$props$axisPosit2 === void 0 ? "50%" : _this$props$axisPosit2,
          _this$props$axisPosit3 = _this$props$axisPosit[1],
          y = _this$props$axisPosit3 === void 0 ? "50%" : _this$props$axisPosit3;

      this.axisPosition = [this.getValueByRange(x, 0, this.width), this.getValueByRange(y, 0, this.height)];

      if (getSize) {
        getSize(this.width, this.height);
      }

      if (grid) {
        dom.css(this.getBackground(grid, zoom, this.width, this.height));
      }

      this.clear();
      this.setScreen();

      if (grid) {
        this.drawAxes();
      }

      this.draw();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }
  }, {
    key: "drawAxes",
    value: function drawAxes() {
      var dash = [3, 3],
          stroke = "#000";
      this.draw([{
        points: [[0, -4002], [0, 4000]],
        stroke: stroke,
        dash: dash
      }, {
        points: [[-4002, 0], [4000, 0]],
        stroke: stroke,
        dash: dash
      }]);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ctx = this.ctx || this.dom.current.getContext("2d");
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "getColor",
    value: function getColor(color, _ref11) {
      var _ref11$x = _ref11.x,
          x = _ref11$x === void 0 ? 0 : _ref11$x,
          _ref11$y = _ref11.y,
          y = _ref11$y === void 0 ? 0 : _ref11$y;

      if (!color) {
        return;
      }

      if (typeof color === "string") {
        return color;
      }

      var length = color.length;

      if (length === 5) {
        var g = this.ctx.createLinearGradient(color[0] + x, color[1] + y, color[2] + x, color[3] + y);
      } else if (length === 7) {
        var g = this.ctx.createRadialGradient(color[0] + x, color[1] + y, color[2], color[3] + x, color[4] + y, color[5]);
      }

      var stops = color[color.length - 1];

      for (var i = 0; i < stops.length; i++) {
        var s = stops[i].split(" ");
        g.addColorStop(s[0], s[1]);
      }

      return g;
    }
  }, {
    key: "shadow",
    value: function shadow(_ref12) {
      var _shadow = _ref12.shadow;

      if (!_shadow) {
        return;
      }

      var ctx = this.ctx;
      ctx.shadowOffsetX = _shadow[0];
      ctx.shadowOffsetY = _shadow[1];
      ctx.shadowBlur = _shadow[2];
      ctx.shadowColor = _shadow[3];
    }
  }, {
    key: "getSides",
    value: function getSides(list) {
      var first = list[0],
          minx = first.x,
          miny = first.y,
          maxx = first.x,
          maxy = first.y;

      for (var i = 1; i < list.length; i++) {
        var _list$i = list[i],
            x = _list$i.x,
            y = _list$i.y;

        if (x < minx) {
          minx = x;
        } else if (x > maxx) {
          maxx = x;
        }

        if (y < miny) {
          miny = y;
        } else if (y > maxy) {
          maxy = y;
        }
      }

      return {
        left: minx,
        right: maxx,
        up: miny,
        down: maxy,
        center: {
          x: (minx + maxx) / 2,
          y: (miny + maxy) / 2
        }
      };
    }
  }, {
    key: "getTextAlign",
    value: function getTextAlign(_ref13) {
      var _ref14 = _slicedToArray(_ref13, 2),
          _ref14$ = _ref14[0],
          x = _ref14$ === void 0 ? 0 : _ref14$,
          _ref14$2 = _ref14[1],
          y = _ref14$2 === void 0 ? 0 : _ref14$2;

      return [["right", "center", "left"][x + 1], ["top", "middle", "bottom"][y + 1]];
    }
  }, {
    key: "getBackground",
    value: function getBackground() {
      var _this$props3 = this.props,
          grid = _this$props3.grid,
          zoom = _this$props3.zoom;

      var _grid = _slicedToArray(grid, 3),
          x = _grid[0],
          y = _grid[1],
          _grid$ = _grid[2],
          color = _grid$ === void 0 ? "rgba(70,70,70,0.3)" : _grid$;

      var a = 100 * zoom;
      var b = x ? this.getValueByRange(x, 0, this.width) * zoom + "px" : "100%";
      var c = y ? this.getValueByRange(y, 0, this.height) * zoom + "px" : "100%";
      var h1 = "linear-gradient(".concat(color, " 0px,transparent 0px)");
      var v1 = "linear-gradient(90deg,".concat(color, " 0px, transparent 0px)");
      var h2 = "linear-gradient(".concat(color, " 1px, transparent 1px)");
      var v2 = "linear-gradient(90deg,".concat(color, " 1px, transparent 1px)");
      return {
        backgroundImage: "".concat(h1, ",").concat(v1, ",").concat(h2, ",").concat(v2),
        backgroundSize: "".concat(a, "px ").concat(a, "px,").concat(a, "px ").concat(a, "px,").concat(b, " ").concat(c, ",").concat(b, " ").concat(c)
      };
    }
  }, {
    key: "panmousedown",
    value: function panmousedown(e) {
      this.eventHandler("window", "mousemove", _jquery.default.proxy(this.panmousemove, this));
      this.eventHandler("window", "mouseup", _jquery.default.proxy(this.panmouseup, this));
      this.panned = false;
      var screenPosition = this.props.screenPosition;
      var client = this.getClient(e);
      this.startOffset = {
        x: client.x,
        y: client.y,
        endX: screenPosition[0],
        endY: screenPosition[1]
      };
    }
  }, {
    key: "panmouseup",
    value: function panmouseup() {
      this.eventHandler("window", "mousemove", this.panmousemove, "unbind");
      this.eventHandler("window", "mouseup", this.panmouseup, "unbind");
    }
  }, {
    key: "panmousemove",
    value: function panmousemove(e) {
      var so = this.startOffset,
          _this$props4 = this.props,
          zoom = _this$props4.zoom,
          onPan = _this$props4.onPan,
          coords = this.getClient(e); //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}

      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX,
          y = (coords.y - so.y) / zoom + so.endY;
      onPan([x, y]);
    }
  }, {
    key: "setScreen",
    value: function setScreen() {
      var _this$props5 = this.props,
          zoom = _this$props5.zoom,
          screenPosition = _this$props5.screenPosition;
      var canvas = this.dom.current;
      this.translate = {
        x: this.axisPosition[0] - screenPosition[0] * zoom,
        y: this.axisPosition[1] - screenPosition[1] * zoom * -1
      };
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.translate(this.translate.x, this.translate.y);
      (0, _jquery.default)(canvas).css({
        backgroundPosition: this.translate.x + "px " + this.translate.y + "px"
      });
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      var _this$props6 = this.props,
          events = _this$props6.events,
          onPan = _this$props6.onPan;
      this.mousePosition = this.getMousePosition(e);
      this.eventMode = "onMouseDown";
      this.update();

      if (onPan) {
        this.panmousedown(e);
      } else if (this.item) {
        this.item.onMouseDown(e, this.mousePosition, this.item, this.props);
      } else if (events.onMouseDown) {
        events.onMouseDown(e, this.mousePosition);
      }

      this.item = false;
      this.eventMode = false;
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(e) {
      var events = this.props.events;
      this.mousePosition = this.getMousePosition(e);
      this.eventMode = "onMouseUp";
      this.update();

      if (this.item) {
        this.item.onMouseUp(e, this.mousePosition, this.item, this.props);
      } else if (events.onMouseUp) {
        events.onMouseUp(e, this.mousePosition);
      }

      this.item = false;
      this.eventMode = false;
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var events = this.props.events;
      this.mousePosition = this.getMousePosition(e);
      this.eventMode = "onClick";
      this.update();

      if (this.item) {
        this.item.onClick(e, this.mousePosition, this.item, this.props);
      } else if (events.onClick) {
        events.onClick(e, this.mousePosition);
      }

      this.item = false;
      this.eventMode = false;
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      var events = this.props.events;
      this.mousePosition = this.getMousePosition(e);

      if (events.onMouseMove) {
        events.onMouseMove(e, this.mousePosition);
      }
    }
  }, {
    key: "getMousePosition",
    value: function getMousePosition(e) {
      var _this$props7 = this.props,
          sp = _this$props7.screenPosition,
          zoom = _this$props7.zoom;
      var client = this.getClient(e);
      var offset = (0, _jquery.default)(this.dom.current).offset();
      client = {
        x: client.x - offset.left + window.pageXOffset,
        y: client.y - offset.top + window.pageYOffset
      };
      var x = Math.floor((client.x - this.axisPosition[0] + sp[0] * zoom) / zoom);
      var y = Math.floor((client.y - this.axisPosition[1] + sp[1] * zoom * -1) / zoom);
      return [x, y, x * 100 / this.width, y * 100 / this.height];
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props8 = this.props,
          id = _this$props8.id,
          style = _this$props8.style,
          className = _this$props8.className,
          events = _this$props8.events;
      var props = {
        ref: this.dom,
        className: className,
        id: id,
        style: style
      };

      for (var prop in events) {
        props[prop] = events[prop];
      }

      if ("ontouchstart" in document.documentElement) {
        props.onTouchStart = this.onMouseDown.bind(this);
        props.onTouchMove = this.onMouseMove.bind(this);
        props.onTouchEnd = this.onMouseUp.bind(this);
      } else {
        props.onMouseDown = this.onMouseDown.bind(this);
        props.onMouseMove = this.onMouseMove.bind(this);
        props.onMouseUp = this.onMouseUp.bind(this);
      }

      return /*#__PURE__*/_react.default.createElement("canvas", props);
    }
  }]);

  return Canvas;
}(_react.Component);

exports.default = Canvas;
Canvas.defaultProps = {
  zoom: 1,
  axisPosition: ["50%", "50%"],
  selectable: false,
  screenPosition: [0, 0],
  items: [],
  events: {},
  rotateSetting: {
    direction: "clock"
  }
};