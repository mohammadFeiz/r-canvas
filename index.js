"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Canvas =
/*#__PURE__*/
function (_Component) {
  _inherits(Canvas, _Component);

  function Canvas(props) {
    var _this;

    _classCallCheck(this, Canvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Canvas).call(this, props));
    _this.PI = Math.PI / 180;
    _this.dom = (0, _react.createRef)();
    _this.width = 0;
    _this.height = 0;
    _this.isMobile = 'ontouchstart' in document.documentElement ? true : false;
    return _this;
  }

  _createClass(Canvas, [{
    key: "getStyle",
    value: function getStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return style;
    }
  }, {
    key: "getCoords",
    value: function getCoords(value, size) {
      if (typeof value === 'number') {
        return value;
      }

      if (value.indexOf('%') === -1) {
        return parseFloat(value);
      }

      return parseFloat(value) * size / 100;
    }
  }, {
    key: "draw",
    value: function draw() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.items;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item.show === false) {
          continue;
        }

        if (item.type === 'group') {
          this.draw(item.items);
        } else {
          this['draw' + item.type](item);
        }
      }
    }
  }, {
    key: "drawline",
    value: function drawline(line) {
      var ctx = this.ctx,
          zoom = this.props.zoom,
          p;
      var _line$lineWidth = line.lineWidth,
          lineWidth = _line$lineWidth === void 0 ? 1 : _line$lineWidth,
          fill = line.fill,
          stroke = line.stroke,
          _line$lineJoin = line.lineJoin,
          lineJoin = _line$lineJoin === void 0 ? 'miter' : _line$lineJoin,
          _line$lineCap = line.lineCap,
          lineCap = _line$lineCap === void 0 ? 'butt' : _line$lineCap,
          dash = line.dash,
          points = line.points,
          close = line.close,
          rotate = line.rotate,
          pivot = line.pivot;
      var length = line.points.length;

      if (length < 2) {
        return false;
      }

      var start = line.points[0];
      ctx.save();
      ctx.beginPath();

      if (rotate !== undefined && pivot) {
        this.rotate(rotate, pivot || this.getSides(points).center);
      }

      dash && ctx.setLineDash(dash);
      ctx.lineJoin = lineJoin;
      ctx.lineCap = lineCap;
      ctx.lineWidth = lineWidth * zoom;
      ctx.moveTo(this.getCoords(start.x, this.width) * zoom, this.getCoords(start.y, this.height) * zoom);

      for (var i = 1; i < length; i++) {
        var p = points[i];
        ctx.lineTo(this.getCoords(p.x, this.width) * zoom, this.getCoords(p.y, this.height) * zoom);
      }

      if (length > 2 && close) {
        ctx.lineTo(start.x * zoom, start.y * zoom);
      }

      this.ink(fill, stroke);
      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: "drawarc",
    value: function drawarc(arc) {
      var _arc$x = arc.x,
          x = _arc$x === void 0 ? 0 : _arc$x,
          _arc$y = arc.y,
          y = _arc$y === void 0 ? 0 : _arc$y,
          _arc$r = arc.r,
          r = _arc$r === void 0 ? 20 : _arc$r,
          _arc$slice = arc.slice,
          slice = _arc$slice === void 0 ? [0, 360] : _arc$slice,
          _arc$lineWidth = arc.lineWidth,
          lineWidth = _arc$lineWidth === void 0 ? 1 : _arc$lineWidth,
          lineCap = arc.lineCap,
          _arc$lineJoin = arc.lineJoin,
          lineJoin = _arc$lineJoin === void 0 ? 'butt' : _arc$lineJoin,
          dash = arc.dash,
          fill = arc.fill,
          stroke = arc.stroke,
          shadow = arc.shadow,
          rotate = arc.rotate,
          pivot = arc.pivot,
          angle = arc.angle;
      var _this$props = this.props,
          rotateSetting = _this$props.rotateSetting,
          zoom = _this$props.zoom;
      var _rotateSetting$direct = rotateSetting.direction,
          direction = _rotateSetting$direct === void 0 ? 'clock' : _rotateSetting$direct,
          _rotateSetting$offset = rotateSetting.offset,
          offset = _rotateSetting$offset === void 0 ? 0 : _rotateSetting$offset;
      var ctx = this.ctx;
      x = this.getCoords(x, this.width);
      y = this.getCoords(y, this.height);
      var p = this.getCoordsByPivot({
        x: x,
        y: y,
        r: r,
        pivot: pivot,
        type: 'arc',
        lineWidth: lineWidth
      });
      ctx.save();
      ctx.beginPath();
      this.rotate(rotate, {
        x: x,
        y: y
      });
      angle && this.rotate(angle, {
        x: p.x,
        y: p.y
      });
      var startAngle, endAngle;

      if (direction === 'clock') {
        startAngle = slice[0] * this.PI;
        endAngle = slice[1] * this.PI;
      } else {
        startAngle = -slice[1] * this.PI;
        endAngle = -slice[0] * this.PI;
      }

      ctx.arc(p.x * zoom, p.y * zoom, r * zoom, startAngle, endAngle);
      this.shadow(shadow);
      dash && ctx.setLineDash(dash);
      ctx.lineCap = lineCap;
      ctx.lineJoin = lineJoin;
      ctx.lineWidth = lineWidth;
      this.ink(fill, stroke);
      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: "drawrectangle",
    value: function drawrectangle(rect) {
      var _rect$x = rect.x,
          x = _rect$x === void 0 ? 0 : _rect$x,
          _rect$y = rect.y,
          y = _rect$y === void 0 ? 0 : _rect$y,
          _rect$width = rect.width,
          width = _rect$width === void 0 ? 20 : _rect$width,
          _rect$height = rect.height,
          height = _rect$height === void 0 ? 20 : _rect$height,
          _rect$lineWidth = rect.lineWidth,
          lineWidth = _rect$lineWidth === void 0 ? 1 : _rect$lineWidth,
          dash = rect.dash,
          fill = rect.fill,
          stroke = rect.stroke,
          shadow = rect.shadow,
          rotate = rect.rotate,
          pivot = rect.pivot,
          angle = rect.angle;
      var zoom = this.props.zoom,
          ctx = this.ctx;
      x = this.getCoords(x, this.width);
      y = this.getCoords(y, this.height);
      width = this.getCoords(width, this.width);
      height = this.getCoords(height, this.height);
      var p = this.getCoordsByPivot({
        x: x,
        y: y,
        width: width,
        height: height,
        pivot: pivot,
        type: 'rectangle'
      });
      ctx.save();
      ctx.beginPath();
      this.rotate(rotate, {
        x: x,
        y: y
      });
      angle && this.rotate(angle, {
        x: p.x + width / 2,
        y: p.y + height / 2
      });
      ctx.rect(p.x * zoom, p.y * zoom, width * zoom, height * zoom);
      this.shadow(shadow);
      dash && ctx.setLineDash(dash);
      ctx.lineWidth = lineWidth;
      this.ink(fill, stroke);
      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: "getCoordsByPivot",
    value: function getCoordsByPivot(_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          height = _ref.height,
          r = _ref.r,
          pivot = _ref.pivot,
          type = _ref.type,
          lineWidth = _ref.lineWidth;

      if (!pivot) {
        return {
          x: x,
          y: y
        };
      }

      var _pivot$x = pivot.x,
          px = _pivot$x === void 0 ? 0 : _pivot$x,
          _pivot$y = pivot.y,
          py = _pivot$y === void 0 ? 0 : _pivot$y;

      if (type === 'rectangle') {
        px = this.getCoords(px, width);
        py = this.getCoords(py, height);
        return {
          x: x - px,
          y: y - py
        };
      }

      if (type === 'arc') {
        px = this.getCoords(px, r * 2);
        py = this.getCoords(py, r * 2);
        return {
          x: x - px,
          y: y - py
        };
      }
    }
  }, {
    key: "drawtext",
    value: function drawtext(obj) {
      //x,y,text,angle,textBaseLine,color,textAlign
      var zoom = this.props.zoom;
      var ctx = this.ctx;
      var _obj$textBaseLine = obj.textBaseLine,
          textBaseLine = _obj$textBaseLine === void 0 ? 'bottom' : _obj$textBaseLine,
          _obj$textAlign = obj.textAlign,
          textAlign = _obj$textAlign === void 0 ? 'center' : _obj$textAlign,
          _obj$fontSize = obj.fontSize,
          fontSize = _obj$fontSize === void 0 ? 12 : _obj$fontSize,
          _obj$color = obj.color,
          color = _obj$color === void 0 ? '#000' : _obj$color,
          text = obj.text,
          rotate = obj.rotate,
          unit = obj.unit,
          pivot = obj.pivot,
          _obj$lineWidth = obj.lineWidth,
          lineWidth = _obj$lineWidth === void 0 ? 1 : _obj$lineWidth,
          x = obj.x,
          y = obj.y,
          angle = obj.angle;
      x = this.getCoords(x, this.width);
      y = this.getCoords(y, this.height);
      var p = this.getCoordsByPivot({
        x: x,
        y: y,
        pivot: pivot,
        type: 'rectangle',
        lineWidth: lineWidth
      });
      ctx.save();
      ctx.beginPath();
      this.rotate(rotate, {
        x: x,
        y: y
      });
      angle && this.rotate(angle, p);
      ctx.textBaseline = textBaseLine;
      ctx.font = fontSize * zoom + "px arial";
      ctx.textAlign = textAlign;
      ctx.fillStyle = color;
      ctx.fillText(text, p.x * zoom, p.y * zoom);
      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: "ink",
    value: function ink(fill, stroke) {
      if (!fill && !stroke) {
        stroke = '#000';
      }

      if (fill) {
        this.ctx.fillStyle = this.getColor(fill);
        this.ctx.fill();
      }

      if (stroke) {
        this.ctx.strokeStyle = this.getColor(stroke);
        this.ctx.stroke();
      }
    }
  }, {
    key: "shadow",
    value: function shadow(Shadow) {
      var shadow = this.props.shadow;

      if (Shadow) {
        var _Shadow = _slicedToArray(Shadow, 4),
            shadowOffsetX = _Shadow[0],
            shadowOffsetY = _Shadow[1],
            shadowBlur = _Shadow[2],
            shadowColor = _Shadow[3];

        this.ctx.shadowOffsetX = Shadow[0];
        this.ctx.shadowOffsetY = Shadow[1];
        this.ctx.shadowBlur = Shadow[2];
        this.ctx.shadowColor = Shadow[3];
      } else if (shadow) {
        var _shadow = _slicedToArray(shadow, 4),
            shadowOffsetX = _shadow[0],
            shadowOffsetY = _shadow[1],
            shadowBlur = _shadow[2],
            shadowColor = _shadow[3];

        this.ctx.shadowOffsetX = shadow[0];
        this.ctx.shadowOffsetY = shadow[1];
        this.ctx.shadowBlur = shadow[2];
        this.ctx.shadowColor = shadow[3];
      }
    }
  }, {
    key: "getColor",
    value: function getColor(color) {
      if (typeof color === 'string') {
        return color;
      }

      return this.gradient(color);
    }
  }, {
    key: "gradient",
    value: function gradient(grd) {
      var _grd = _slicedToArray(grd, 5),
          sx = _grd[0],
          sy = _grd[1],
          ex = _grd[2],
          ey = _grd[3],
          stops = _grd[4];

      var g = this.ctx.createLinearGradient(sx, sy, ex, ey);

      for (var i = 0; i < stops.length; i++) {
        var s = stops[i];
        g.addColorStop(s[0], s[1]);
      }

      return g;
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var center = arguments.length > 1 ? arguments[1] : undefined;
      var _this$props2 = this.props,
          zoom = _this$props2.zoom,
          rotateSetting = _this$props2.rotateSetting;
      var _rotateSetting$direct2 = rotateSetting.direction,
          direction = _rotateSetting$direct2 === void 0 ? 'clock' : _rotateSetting$direct2,
          _rotateSetting$offset2 = rotateSetting.offset,
          offset = _rotateSetting$offset2 === void 0 ? 0 : _rotateSetting$offset2;

      if (offset === 0 && angle === 0) {
        return;
      }

      angle += offset;
      angle = angle * this.PI * (direction === 'clockwise' ? -1 : 1);
      var s = Math.sin(angle),
          c = Math.cos(angle);
      var p = {
        x: center.x,
        y: -center.y
      };
      this.ctx.rotate(angle);
      var x = p.x * c - p.y * s - p.x;
      var y = p.y - (p.x * s + p.y * c);
      this.ctx.translate(x * zoom, y * zoom);
    }
  }, {
    key: "getAxisPosition",
    value: function getAxisPosition(_ref2) {
      var _ref2$x = _ref2.x,
          x = _ref2$x === void 0 ? '50%' : _ref2$x,
          _ref2$y = _ref2.y,
          y = _ref2$y === void 0 ? '50%' : _ref2$y;
      var X, Y;

      if (x.indexOf('%') !== -1) {
        X = this.width * parseFloat(x) / 100;
      } else if (x.indexOf('px') !== -1) {
        X = parseFloat(x);
      } else {
        console.error('canvas axisPosition.x error. correct example: ("10px" or "10%")');
      }

      if (y.indexOf('%') !== -1) {
        Y = this.height * parseFloat(y) / 100;
      } else if (y.indexOf('px') !== -1) {
        Y = parseFloat(y);
      } else {
        console.error('canvas axisPosition.y error. correct example: ("10px" or "10%")');
      }

      return {
        x: X,
        y: Y
      };
    }
  }, {
    key: "setScreen",
    value: function setScreen() {
      var _this$props3 = this.props,
          zoom = _this$props3.zoom,
          screenPosition = _this$props3.screenPosition;
      var canvas = this.dom.current;
      this.translate = {
        x: this.axisPosition.x - screenPosition[0] * zoom,
        y: this.axisPosition.y - screenPosition[1] * zoom * -1
      };
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.translate(this.translate.x, this.translate.y);
      (0, _jquery.default)(canvas).css({
        backgroundPosition: this.translate.x + "px " + this.translate.y + "px"
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.update();
    }
  }, {
    key: "getBackground",
    value: function getBackground() {
      var _this$props4 = this.props,
          grid = _this$props4.grid,
          zoom = _this$props4.zoom;
      var width = this.width,
          height = this.height;
      var x = grid.x,
          y = grid.y,
          _grid$color = grid.color,
          color = _grid$color === void 0 ? '#000' : _grid$color;
      var a = 100 * zoom;
      var b = x ? this.getCoords(x, width) * zoom + 'px' : '100%';
      var c = y ? this.getCoords(y, height) * zoom + 'px' : '100%';
      var h1 = "linear-gradient(#000 0px,transparent 0px)";
      var v1 = "linear-gradient(90deg, #000 0px, transparent 0px)";
      var h2 = "linear-gradient(rgba(".concat(color, ",0.3) 1px, transparent 1px)");
      var v2 = "linear-gradient(90deg, rgba(".concat(color, ",0.3) 1px, transparent 1px)");
      return {
        backgroundImage: "".concat(h1, ",").concat(v1, ",").concat(h2, ",").concat(v2),
        backgroundSize: "".concat(a, "px ").concat(a, "px,").concat(a, "px ").concat(a, "px,").concat(b, " ").concat(c, ",").concat(b, " ").concat(c)
      };
    }
  }, {
    key: "update",
    value: function update() {
      var _this$props5 = this.props,
          getSize = _this$props5.getSize,
          grid = _this$props5.grid;
      var dom = this.dom.current;
      this.width = (0, _jquery.default)(dom).width();
      this.height = (0, _jquery.default)(dom).height();
      this.axisPosition = this.axisPosition || this.getAxisPosition(this.props.axisPosition);

      if (getSize) {
        getSize(this.width, this.height);
      }

      dom.width = this.width;
      dom.height = this.height;

      if (grid) {
        (0, _jquery.default)(dom).css(this.getBackground());
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
      this.drawline({
        points: [{
          x: 0,
          y: -4002
        }, {
          x: 0,
          y: 4000
        }],
        dash: [3, 3]
      });
      this.drawline({
        points: [{
          x: -4002,
          y: 0
        }, {
          x: 4000,
          y: 0
        }],
        dash: [3, 3]
      });
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
    key: "mouseDown",
    value: function mouseDown(e) {
      this.mousePosition = this.getMousePosition(e);
      var _this$props6 = this.props,
          mouseDown = _this$props6.mouseDown,
          onpan = _this$props6.onpan,
          getMousePosition = _this$props6.getMousePosition;

      if (getMousePosition) {
        getMousePosition(this.mousePosition);
      }

      if (mouseDown) {
        mouseDown(e);
      }

      if (onpan) {
        this.panmousedown(e);
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      this.mousePosition = this.getMousePosition(e);

      if (this.props.getMousePosition) {
        this.props.getMousePosition(this.mousePosition);
      }
    }
  }, {
    key: "getClient",
    value: function getClient(e) {
      return {
        x: e.clientX === undefined ? e.changedTouches[0].clientX : e.clientX,
        y: e.clientY === undefined ? e.changedTouches[0].clientY : e.clientY
      };
    }
  }, {
    key: "getMousePosition",
    value: function getMousePosition(e) {
      var _this$props7 = this.props,
          unit = _this$props7.unit,
          sp = _this$props7.screenPosition,
          zoom = _this$props7.zoom;
      var client = this.getClient(e);
      var offset = (0, _jquery.default)(this.dom.current).offset();
      client = {
        x: client.x - offset.left + window.pageXOffset,
        y: client.y - offset.top + window.pageYOffset
      };
      var coords = {
        x: Math.floor((client.x - this.axisPosition.x + sp[0] * zoom) / zoom),
        y: Math.floor((client.y - this.axisPosition.y + sp[1] * zoom * -1) / zoom)
      };

      if (unit === '%') {
        return {
          x: coords.x * 100 / this.width,
          y: coords.y * 100 / this.height
        };
      } else {
        return coords;
      }
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
      this.eventRemover("window", "mousemove", this.panmousemove);
      this.eventRemover("window", "mouseup", this.panmouseup);
    }
  }, {
    key: "panmousemove",
    value: function panmousemove(e) {
      var so = this.startOffset,
          _this$props8 = this.props,
          zoom = _this$props8.zoom,
          onpan = _this$props8.onpan,
          coords = this.getClient(e); //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}

      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX,
          y = (coords.y - so.y) / zoom + so.endY;
      onpan([x, y]);
    }
  }, {
    key: "getEvent",
    value: function getEvent(event) {
      var isMobile = 'ontouchstart' in document.documentElement ? true : false;
      var mobileEvents = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      };
      return isMobile ? mobileEvents[event] : event;
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(selector, event, action) {
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      event = this.getEvent(event);
      element.unbind(event, action).bind(event, action);
    }
  }, {
    key: "eventRemover",
    value: function eventRemover(selector, event, action) {
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      event = this.getEvent(event);
      element.unbind(event, action);
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
    key: "render",
    value: function render() {
      var _this$props9 = this.props,
          id = _this$props9.id,
          style = _this$props9.style;
      return _react.default.createElement("canvas", {
        ref: this.dom,
        id: id,
        style: this.getStyle(style),
        onMouseDown: this.mouseDown.bind(this),
        onMouseMove: this.mouseMove.bind(this)
      });
    }
  }]);

  return Canvas;
}(_react.Component);

exports.default = Canvas;
Canvas.defaultProps = {
  zoom: 1,
  unit: 'px',
  axisPosition: {
    x: '50%',
    y: '50%'
  },
  screenPosition: [0, 0],
  items: [],
  rotateSetting: {
    direction: 'clock',
    offset: 0
  }
};