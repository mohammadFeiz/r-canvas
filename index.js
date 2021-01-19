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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

    if (_this.props.canvasToClient) {
      _this.props.canvasToClient(_this.canvasToClient.bind(_assertThisInitialized(_this)));
    }

    return _this;
  }

  _createClass(Canvas, [{
    key: "getPrepDip",
    value: function getPrepDip(line) {
      var dip = this.getDip(line);
      dip.m = -1 / dip.m;
      return dip;
    }
  }, {
    key: "getDip",
    value: function getDip(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          p1 = _ref2[0],
          p2 = _ref2[1];

      var deltaY = p1[1] - p2[1];
      var deltaX = p1[0] - p2[0];
      var m = deltaY / deltaX;
      return {
        deltaY: deltaY,
        deltaX: deltaX,
        m: m
      };
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
    value: function getAngle(obj) {
      var line = obj.line;
      var deltaX, deltaY, length;

      if (obj.line) {
        deltaX = line[1][0] - line[0][0];
        deltaY = line[1][1] - line[0][1];
      } else if (obj.dip) {
        deltaX = -obj.dip.deltaX;
        deltaY = -obj.dip.deltaY;
      }

      var length = this.getLength([[0, 0], [deltaX, deltaY]]);
      var angle = Math.acos(deltaX / length) / Math.PI * 180;
      angle = Math.sign(deltaY) < 0 ? 360 - angle : angle;
      return parseFloat(angle.toFixed(4));
    }
  }, {
    key: "getLength",
    value: function getLength(_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          p1 = _ref4[0],
          p2 = _ref4[1];

      return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));
    }
  }, {
    key: "getPrepFromLine",
    value: function getPrepFromLine(obj) {
      var point = obj.point,
          offset = obj.offset,
          line = obj.line,
          _obj$dip = obj.dip,
          dip = _obj$dip === void 0 ? this.getDip(line) : _obj$dip;

      if (!offset) {
        return point;
      }

      var angle = this.getAngle({
        dip: dip
      });

      var _this$getLineBySLA = this.getLineBySLA(point, offset, angle - 90),
          _this$getLineBySLA2 = _slicedToArray(_this$getLineBySLA, 2),
          p1 = _this$getLineBySLA2[0],
          p2 = _this$getLineBySLA2[1];

      return p2;
    }
  }, {
    key: "getLineBySLA",
    value: function getLineBySLA(p1, length, angle) {
      if (!length) {
        return [p1, p1];
      }

      return [p1, [p1[0] + Math.cos(angle * Math.PI / 180) * length, p1[1] + Math.sin(angle * Math.PI / 180) * length]];
    }
  }, {
    key: "getArcByPoints",
    value: function getArcByPoints(item) {
      var _item = item,
          arcPoints = _item.arcPoints,
          height = _item.height;
      var points = [];
      var stringPoints = [];

      for (var i = 0; i < arcPoints.length; i++) {
        if (i === 3) {
          break;
        }

        var point = arcPoints[i];
        var stringPoint = point.toString();

        if (stringPoints.indexOf(stringPoint) !== -1) {
          continue;
        }

        stringPoints.push(stringPoint);
        points.push(point);
      }

      var p1 = points[0],
          p2 = points[1],
          p3 = points[2];
      var changeObject = {};

      if (points.length === 1) {
        changeObject = {
          r: 0,
          x: p1[0],
          y: p1[1]
        };
      } else if (points.length === 2) {
        var avg = this.getAvg([p1, p2]);

        if (height) {
          changeObject = this.getArcBy3Points(p1, this.getPrepFromLine({
            point: avg,
            line: [p1, p2],
            offset: height
          }), p2);
        } else {
          changeObject = {
            r: this.getLength([p1, p2]) / 2,
            x: avg[0],
            y: avg[1]
          };
        }
      } else {
        changeObject = this.getArcBy3Points(p1, p2, p3);
      }

      item = { ...changeObject,
        ...item
      };
      return item;
    }
  }, {
    key: "getArcBy3Points",
    value: function getArcBy3Points(p1, p2, p3) {
      var dip1 = this.getPrepDip([p1, p2]);
      var dip2 = this.getPrepDip([p2, p3]);
      var point1 = this.getAvg([p1, p2]);
      var point2 = this.getAvg([p2, p3]);
      var meet = this.getMeet({
        point1: point1,
        dip1: dip1,
        point2: point2,
        dip2: dip2
      });

      if (!meet) {
        return false;
      }

      var x = meet[0],
          y = meet[1];
      var a1 = this.getAngle({
        line: [meet, p1]
      }),
          a2 = this.getAngle({
        line: [meet, p2]
      }),
          a3 = this.getAngle({
        line: [meet, p3]
      });
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
        r: this.getLength([p1, [x, y]]),
        slice: slice
      };
    }
  }, {
    key: "getMeet",
    value: function getMeet(obj) {
      //get {line1,line2} or {point1,point2,dip1,dip2}
      var line1 = obj.line1,
          line2 = obj.line2,
          _obj$point = obj.point1,
          point1 = _obj$point === void 0 ? line1[0] : _obj$point,
          _obj$point2 = obj.point2,
          point2 = _obj$point2 === void 0 ? line2[0] : _obj$point2,
          _obj$dip2 = obj.dip1,
          dip1 = _obj$dip2 === void 0 ? this.getDip(line1) : _obj$dip2,
          _obj$dip3 = obj.dip2,
          dip2 = _obj$dip3 === void 0 ? this.getDip(line2) : _obj$dip3;

      if (dip1.m === dip2.m) {
        return false;
      }

      if (Math.abs(dip1.m) === Infinity) {
        return [point1[0], this.getYOnLineByX({
          point: point2,
          dip: dip2,
          x: point1[0]
        })];
      }

      if (Math.abs(dip2.m) === Infinity) {
        return [point2[0], this.getYOnLineByX({
          point: point1,
          dip: dip1,
          x: point2[0]
        })];
      }

      var x = (dip1.m * point1[0] - dip2.m * point2[0] + point2[1] - point1[1]) / (dip1.m - dip2.m);
      var y = dip1.m * (x - point1[0]) + point1[1];
      return [x, y];
    }
  }, {
    key: "getYOnLineByX",
    value: function getYOnLineByX(obj) {
      // get {x,line} or {x,point,dip}
      var x = obj.x,
          line = obj.line,
          _obj$point3 = obj.point,
          point = _obj$point3 === void 0 ? line[0] : _obj$point3,
          _obj$dip4 = obj.dip,
          dip = _obj$dip4 === void 0 ? this.getDip(line) : _obj$dip4;

      if (dip.m === Infinity) {
        return false;
      }

      return dip.m * (x - point[0]) + point[1];
    }
  }, {
    key: "getXOnLineByY",
    value: function getXOnLineByY(obj) {
      // get {y,line} or {y,point,dip}
      var y = obj.y,
          line = obj.line,
          _obj$point4 = obj.point,
          point = _obj$point4 === void 0 ? line[0] : _obj$point4,
          _obj$dip5 = obj.dip,
          dip = _obj$dip5 === void 0 ? this.getDip(line) : _obj$dip5;

      if (dip.m === 0) {
        return false;
      }

      if (dip.m === Infinity) {
        return point[0];
      }

      return (y - point[1]) / dip.m + point[0];
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
        if (!Array.isArray(item.arcPoints) || item.arcPoints.length < 2) {
          console.error("r-canvas => item.arcPoints must be an array with 2 or 3 member!!!");
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

      var _ref5 = typeof pivot === "function" ? pivot(item) : pivot,
          _ref6 = _slicedToArray(_ref5, 2),
          _ref6$ = _ref6[0],
          px = _ref6$ === void 0 ? 0 : _ref6$,
          _ref6$2 = _ref6[1],
          py = _ref6$2 === void 0 ? 0 : _ref6$2;

      return [x - this.getValueByRange(px, 0, this.width), y - -this.getValueByRange(py, 0, this.height)];
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
      var originalItem = typeof item === "function" ? { ...item(this.props)
      } : item;
      var type = originalItem.type;

      if (!type) {
        console.error('RCanvas => missing type in item:');
      }

      var updatedItem = JSON.parse(JSON.stringify(originalItem)); //set default props

      updatedItem = { ...{
          showPivot: false,
          lineJoin: "miter",
          lineCap: "butt",
          rotate: 0,
          x: 0,
          y: 0,
          lineWidth: 1,
          opacity: 1
        },
        ...updatedItem
      };
      updatedItem.items = originalItem.items;
      updatedItem.rect = false;

      if (!updatedItem.stroke && !updatedItem.fill) {
        updatedItem.stroke = "#000";
      } //validate item


      if (debugMode) {
        this.validateItem(updatedItem);
      } //set related props


      updatedItem.rotate = this.getValueByRange(updatedItem.rotate, 0, 360);
      updatedItem.x = this.getValueByRange(updatedItem.x, 0, this.width) + parentx;
      updatedItem.y = -this.getValueByRange(updatedItem.y, 0, this.height) + parenty;
      updatedItem.opacity *= parentOpacity;
      updatedItem.pivotedCoords = this.getCoordsByPivot(updatedItem); //converts

      if (type === 'Arc' && originalItem.arcPoints) {
        if (originalItem.arcPoints) {
          var arc = this.getArcByPoints(originalItem);
          updatedItem.r = arc.r;
          updatedItem.slice = arc.slice;
          updatedItem.x = arc.x;
          updatedItem.y = -arc.y;
          updatedItem.pivotedCoords = this.getCoordsByPivot(updatedItem);
        }
      } else if (type === 'Rectangle') {
        updatedItem.type = 'Line';

        var _updatedItem = updatedItem,
            _updatedItem$width = _updatedItem.width,
            _width = _updatedItem$width === void 0 ? 20 : _updatedItem$width,
            _updatedItem$height = _updatedItem.height,
            height = _updatedItem$height === void 0 ? 20 : _updatedItem$height,
            _updatedItem$corner = _updatedItem.corner,
            corner = _updatedItem$corner === void 0 ? [] : _updatedItem$corner;

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

        updatedItem.rect = true;

        var _updatedItem$pivotedC = _slicedToArray(updatedItem.pivotedCoords, 2),
            x = _updatedItem$pivotedC[0],
            y = _updatedItem$pivotedC[1];

        updatedItem.points = [[x + _width / 2, -y], [x + _width, -y, c1], [x + _width, -y + height, c2], [x, -y + height, c3], [x, -y, c0], [x + _width / 2, -y, c1]];
      } else if (type === 'Triangle') {
        var _updatedItem2 = updatedItem,
            _updatedItem2$corner = _updatedItem2.corner,
            _corner2 = _updatedItem2$corner === void 0 ? [] : _updatedItem2$corner;

        var _trianglePoints = trianglePoints,
            _trianglePoints2 = _slicedToArray(_trianglePoints, 2),
            p1 = _trianglePoints2[0],
            p2 = _trianglePoints2[1];

        var width = triangleWidth;
        var t1 = this.getPrependicularPointFromLine(p1, p2, "start", width / 2);
        var t2 = this.getPrependicularPointFromLine(p1, p2, "start", -width / 2);
        updatedItem.points = [[p1[0], p1[1], _corner2[0]], [t1.x, t1.y, _corner2[1]], [p2[0], p2[1], _corner2[2]], [t2.x, t2.y], p1];
      }

      var result = { ...originalItem,
        ...updatedItem
      };
      return result;
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
          var X = this.mousePosition.x * zoom + this.axisPosition[0] + this.screenX;
          var Y = -this.mousePosition.y * zoom + this.axisPosition[1] + this.screenY; // in isPointInPath and isPointInStroke value of under axis is positive 

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
      var _item$pivotedCoords = _slicedToArray(item.pivotedCoords, 2),
          X = _item$pivotedCoords[0],
          Y = _item$pivotedCoords[1];

      this.draw(item.items, {
        x: X,
        y: Y,
        rotate: item.rotate,
        opacity: item.opacity
      }, index);
    }
  }, {
    key: "drawText",
    value: function drawText(_ref7) {
      var _ref7$align = _ref7.align,
          align = _ref7$align === void 0 ? [0, 0] : _ref7$align,
          _ref7$fontSize = _ref7.fontSize,
          fontSize = _ref7$fontSize === void 0 ? 12 : _ref7$fontSize,
          _ref7$fontFamily = _ref7.fontFamily,
          fontFamily = _ref7$fontFamily === void 0 ? 'arial' : _ref7$fontFamily,
          _ref7$text = _ref7.text,
          text = _ref7$text === void 0 ? "Text" : _ref7$text,
          fill = _ref7.fill,
          stroke = _ref7.stroke,
          pivotedCoords = _ref7.pivotedCoords;

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
      this.ctx.font = "".concat(fontSize * zoom, "px ").concat(fontFamily);
      stroke && this.ctx.strokeText(text, X * zoom, Y * zoom);
      fill && this.ctx.fillText(text, X * zoom, Y * zoom);
    }
  }, {
    key: "drawImage",
    value: function drawImage(_ref8) {
      var _this3 = this;

      var pivotedCoords = _ref8.pivotedCoords,
          width = _ref8.width,
          height = _ref8.height,
          image = _ref8.image;
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
    value: function drawLine(_ref9) {
      var points = _ref9.points,
          close = _ref9.close,
          stroke = _ref9.stroke,
          fill = _ref9.fill,
          pivotedCoords = _ref9.pivotedCoords,
          rect = _ref9.rect;

      if (points.length < 1) {
        return false;
      }

      var Coords = rect ? [0, 0] : pivotedCoords;

      var _Coords = _slicedToArray(Coords, 2),
          X = _Coords[0],
          Y = _Coords[1];

      var zoom = this.props.zoom;
      var start = [this.getValueByRange(points[0][0], 0, this.width) + X, -this.getValueByRange(points[0][1], 0, this.height) + Y];
      this.ctx.moveTo(start[0] * zoom, start[1] * zoom);
      var beforePoint = points[0];

      for (var i = 1; i < points.length; i++) {
        var _points$i = _slicedToArray(points[i], 3),
            x = _points$i[0],
            y = _points$i[1],
            r = _points$i[2];

        beforePoint = [x, y];
        var point = [this.getValueByRange(x, 0, this.width) + X, -this.getValueByRange(y, 0, this.height) + Y];

        if (r) {
          var _ref10 = points[i + 1] ? points[i + 1] : points[0],
              _ref11 = _slicedToArray(_ref10, 2),
              _x = _ref11[0],
              _y = _ref11[1];

          var nextPoint = [this.getValueByRange(_x, 0, this.width) + X, -this.getValueByRange(_y, 0, this.height) + Y];
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
    value: function drawArc(_ref12) {
      var pivotedCoords = _ref12.pivotedCoords,
          r = _ref12.r,
          _ref12$slice = _ref12.slice,
          slice = _ref12$slice === void 0 ? [0, 360] : _ref12$slice,
          fill = _ref12.fill,
          stroke = _ref12.stroke;

      var _pivotedCoords3 = _slicedToArray(pivotedCoords, 2),
          X = _pivotedCoords3[0],
          Y = _pivotedCoords3[1];

      var rotateDirection = this.props.rotateDirection;
      r = this.getValueByRange(r, this.width, this.height);
      r = r < 0 ? 0 : r;
      slice = [this.getValueByRange(slice[0], 0, 360), this.getValueByRange(slice[1], 0, 360)];

      if (rotateDirection === "clockwise") {
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

      var _ref13 = arguments.length > 1 ? arguments[1] : undefined,
          _ref14 = _slicedToArray(_ref13, 2),
          X = _ref14[0],
          Y = _ref14[1];

      if (angle === 0) {
        return;
      }

      var _this$props = this.props,
          rotateDirection = _this$props.rotateDirection,
          zoom = _this$props.zoom;
      angle = angle * this.PI * (rotateDirection === "clock" ? 1 : -1);
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
      this.axisPosition = [this.width / 2, this.height / 2];

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
        type: 'Line',
        points: [[0, -4002], [0, 4000]],
        stroke: stroke,
        dash: dash
      }, {
        type: 'Line',
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
    value: function getColor(color, _ref15) {
      var _ref15$x = _ref15.x,
          x = _ref15$x === void 0 ? 0 : _ref15$x,
          _ref15$y = _ref15.y,
          y = _ref15$y === void 0 ? 0 : _ref15$y;

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
    value: function shadow(_ref16) {
      var _shadow = _ref16.shadow;

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
    value: function getTextAlign(_ref17) {
      var _ref18 = _slicedToArray(_ref17, 2),
          _ref18$ = _ref18[0],
          x = _ref18$ === void 0 ? 0 : _ref18$,
          _ref18$2 = _ref18[1],
          y = _ref18$2 === void 0 ? 0 : _ref18$2;

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
    key: "onMouseDown",
    value: function onMouseDown(e) {
      var _this$props5 = this.props,
          events = _this$props5.events,
          onPan = _this$props5.onPan;
      this.mousePosition = this.getMousePosition(e);
      this.eventMode = "onMouseDown";
      this.update();

      if (this.item) {
        this.item.onMouseDown(e, this.mousePosition, this.item, this.props);
      } else if (onPan) {
        this.panmousedown(e);
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
    key: "setScreen",
    value: function setScreen() {
      var _this$props6 = this.props,
          zoom = _this$props6.zoom,
          screenPosition = _this$props6.screenPosition;
      var canvas = this.dom.current;
      this.screenX = -this.getValueByRange(screenPosition[0], 0, this.width / zoom) * zoom;
      this.screenY = this.getValueByRange(screenPosition[1], 0, this.height / zoom) * zoom;
      this.translate = {
        x: this.screenX + this.axisPosition[0],
        y: this.screenY + this.axisPosition[1]
      };
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.translate(this.translate.x, this.translate.y);
      (0, _jquery.default)(canvas).css({
        backgroundPosition: this.translate.x + "px " + this.translate.y + "px"
      });
    }
  }, {
    key: "canvasToClient",
    value: function canvasToClient(_ref19) {
      var _ref20 = _slicedToArray(_ref19, 2),
          x = _ref20[0],
          y = _ref20[1];

      var zoom = this.props.zoom;
      return [Math.round(this.screenX + this.axisPosition[0] + x * zoom), Math.round(this.screenY + this.axisPosition[1] - y * zoom)];
    }
  }, {
    key: "getMousePosition",
    value: function getMousePosition(e) {
      var zoom = this.props.zoom;
      var client = this.getClient(e);
      var offset = (0, _jquery.default)(this.dom.current).offset();
      client = {
        x: client.x - offset.left + window.pageXOffset,
        y: client.y - offset.top + window.pageYOffset
      };
      var x = Math.floor((client.x - this.axisPosition[0] - this.screenX) / zoom);
      var y = -Math.floor((client.y - this.axisPosition[1] - this.screenY) / zoom);
      return {
        x: x,
        y: y,
        px: x * 100 / this.width,
        py: y * 100 / this.height
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          id = _this$props7.id,
          style = _this$props7.style,
          className = _this$props7.className,
          events = _this$props7.events;
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
  selectable: false,
  screenPosition: [0, 0],
  items: [],
  events: {},
  rotateDirection: "clockwise"
};