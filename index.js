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
    key: "getByUnit",
    value: function getByUnit(point, axis) {
      return this.props.unit === '%' ? {
        x: point.x * this.width / 100,
        y: point.y * this.height / 100
      } : point;
    }
  }, {
    key: "drawpolyline",
    value: function drawpolyline(_ref) {
      var splines = _ref.splines;
      var ctx = this.ctx,
          zoom = this.props.zoom,
          p;

      for (var j = 0; j < splines.length; j++) {
        var spline = splines[j];
        var length = spline.points.length;

        if (length < 2) {
          return false;
        }

        var start = spline.points[0];
        var _spline$lineWidth = spline.lineWidth,
            lineWidth = _spline$lineWidth === void 0 ? 1 / zoom : _spline$lineWidth,
            _spline$color = spline.color,
            color = _spline$color === void 0 ? '#000' : _spline$color,
            _spline$lineJoin = spline.lineJoin,
            lineJoin = _spline$lineJoin === void 0 ? 'miter' : _spline$lineJoin,
            _spline$lineCap = spline.lineCap,
            lineCap = _spline$lineCap === void 0 ? 'butt' : _spline$lineCap;
        ctx.save();
        ctx.beginPath();

        if (spline.lineDash) {
          ctx.setLineDash(spline.lineDash);
        }

        ctx.strokeStyle = color;
        ctx.lineJoin = lineJoin;
        ctx.lineCap = lineCap;
        ctx.lineWidth = lineWidth * zoom;
        p = this.getByUnit(start);
        ctx.moveTo(p.x * zoom, p.y * zoom);

        for (var i = 1; i < length; i++) {
          var point = spline.points[i];
          p = this.getByUnit(point);
          ctx.lineTo(p.x * zoom, p.y * zoom);
        }

        if (length > 2 && spline.close) {
          ctx.lineTo(start.x * zoom, start.y * zoom);
        }

        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }
    }
  }, {
    key: "drawarc",
    value: function drawarc(_ref2) {
      var _ref2$lineWidth = _ref2.lineWidth,
          lineWidth = _ref2$lineWidth === void 0 ? 1 : _ref2$lineWidth,
          _ref2$start = _ref2.start,
          start = _ref2$start === void 0 ? 0 : _ref2$start,
          _ref2$end = _ref2.end,
          end = _ref2$end === void 0 ? 360 : _ref2$end,
          x = _ref2.x,
          y = _ref2.y,
          _ref2$radius = _ref2.radius,
          radius = _ref2$radius === void 0 ? 2 : _ref2$radius,
          fill = _ref2.fill,
          stroke = _ref2.stroke;
      var zoom = this.props.zoom;
      var ctx = this.ctx;
      var p = this.getByUnit({
        x: x,
        y: y
      });
      ctx.beginPath();
      ctx.arc(p.x * zoom, p.y * zoom, radius * zoom, start * Math.PI / 180, end * Math.PI / 180);
      ctx.lineWidth = lineWidth;

      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }

      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
      }

      ctx.closePath();
    }
  }, {
    key: "drawrectangle",
    value: function drawrectangle(_ref3) {
      var center = _ref3.center,
          _ref3$lineWidth = _ref3.lineWidth,
          lineWidth = _ref3$lineWidth === void 0 ? 1 : _ref3$lineWidth,
          width = _ref3.width,
          height = _ref3.height,
          x = _ref3.x,
          y = _ref3.y,
          fill = _ref3.fill,
          stroke = _ref3.stroke;
      var zoom = this.props.zoom;
      var ctx = this.ctx;
      var p = this.getByUnit({
        x: x,
        y: y
      });
      var limit = this.getByUnit({
        x: width,
        y: height
      });
      ctx.beginPath();

      if (center) {
        ctx.rect(p.x * zoom - limit.x * zoom / 2, p.y * zoom - limit.y * zoom / 2, limit.x * zoom, limit.y * zoom);
      } else {
        ctx.rect(p.x * zoom, p.y * zoom, limit.x * zoom, limit.y * zoom);
      }

      ctx.lineWidth = lineWidth;

      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }

      if (stroke) {
        ctx.strokeStyle = stroke;
        ctx.stroke();
      }

      ctx.closePath();
    }
  }, {
    key: "drawtext",
    value: function drawtext(obj) {
      //x,y,text,angle,textBaseLine,color,textAlign
      var zoom = this.props.zoom;
      var ctx = this.ctx;
      var _obj$angle = obj.angle,
          angle = _obj$angle === void 0 ? 0 : _obj$angle,
          _obj$textBaseLine = obj.textBaseLine,
          textBaseLine = _obj$textBaseLine === void 0 ? 'bottom' : _obj$textBaseLine,
          _obj$textAlign = obj.textAlign,
          textAlign = _obj$textAlign === void 0 ? 'center' : _obj$textAlign,
          _obj$fontSize = obj.fontSize,
          fontSize = _obj$fontSize === void 0 ? 12 : _obj$fontSize,
          _obj$color = obj.color,
          color = _obj$color === void 0 ? '#000' : _obj$color,
          text = obj.text;
      var x = obj.x * zoom;
      var y = obj.y * zoom;
      ctx.save();
      ctx.beginPath();
      ctx.textBaseline = textBaseLine;
      ctx.font = fontSize * zoom + "px arial";
      ctx.translate(x, y);
      ctx.rotate(angle * Math.PI / -180);
      ctx.textAlign = textAlign;
      ctx.fillStyle = color;
      ctx.fillText(text, 0, 0);
      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: "draw",
    value: function draw() {
      var a = ['polyline', 'arc', 'rectangle', 'text'];

      for (var i = 0; i < a.length; i++) {
        var objs = this.props[a[i] + 's'] || [];

        for (var j = 0; j < objs.length; j++) {
          this['draw' + a[i]](objs[j]);
        }
      }
    }
  }, {
    key: "getAxisPosition",
    value: function getAxisPosition(type) {
      if (type === 'center') {
        return {
          x: this.width / 2,
          y: this.height / 2
        };
      } else if (type === 'downleft') {
        return {
          x: 0,
          y: this.height
        };
      } else if (type === 'downright') {
        return {
          x: this.width,
          y: this.height
        };
      } else if (type === 'upleft') {
        return {
          x: 0,
          y: 0
        };
      } else if (type === 'upright') {
        return {
          x: this.width,
          y: 0
        };
      }
    }
  }, {
    key: "setScreen",
    value: function setScreen() {
      var _this$props = this.props,
          zoom = _this$props.zoom,
          screenPosition = _this$props.screenPosition,
          axisPosition = _this$props.axisPosition;
      var canvas = this.dom.current;
      this.axisPosition = this.getAxisPosition(axisPosition);
      this.translate = {
        x: this.axisPosition.x - screenPosition.x * zoom,
        y: this.axisPosition.y - screenPosition.y * zoom * -1
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
      var _this$props2 = this.props,
          snap = _this$props2.snap,
          zoom = _this$props2.zoom,
          gridColor = _this$props2.gridColor,
          unit = _this$props2.unit;
      var a = 100 * zoom;
      var b = unit === '%' ? "calc(".concat(snap.x, " * ").concat(zoom, ")") : snap.x * zoom + 'px';
      var c = unit === '%' ? "calc(".concat(snap.y, " * ").concat(zoom, ")") : snap.y * zoom + 'px';
      return {
        backgroundImage: "\n          linear-gradient(rgba(".concat(gridColor, ",0.5) 0px,transparent 0px), \n          linear-gradient(90deg, rgba(").concat(gridColor, ",0.5) 0px, transparent 0px), \n          linear-gradient(rgba(").concat(gridColor, ",0.3) 1px, transparent 1px), \n          linear-gradient(90deg, rgba(").concat(gridColor, ",0.3) 1px, transparent 1px)\n        "),
        backgroundSize: "".concat(a, "px ").concat(a, "px,").concat(a, "px ").concat(a, "px,").concat(b, " ").concat(c, ",").concat(b, " ").concat(c)
      };
    }
  }, {
    key: "update",
    value: function update() {
      var _this$props3 = this.props,
          getSize = _this$props3.getSize,
          gridColor = _this$props3.gridColor;
      var dom = this.dom.current;
      this.width = (0, _jquery.default)(dom).width();
      this.height = (0, _jquery.default)(dom).height();

      if (getSize) {
        getSize(this.width, this.height);
      }

      dom.width = this.width;
      dom.height = this.height;

      if (gridColor) {
        (0, _jquery.default)(dom).css(this.getBackground());
      }

      this.clear();
      this.setScreen();

      if (gridColor) {
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
      this.drawpolyline({
        splines: [{
          points: [{
            x: 0,
            y: -4002
          }, {
            x: 0,
            y: 4000
          }],
          color: "#555",
          lineDash: [2, 3]
        }]
      });
      this.drawpolyline({
        splines: [{
          points: [{
            x: -4002,
            y: 0
          }, {
            x: 4000,
            y: 0
          }],
          color: "#555",
          lineDash: [2, 3]
        }]
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
      var _this$props4 = this.props,
          mouseDown = _this$props4.mouseDown,
          pan = _this$props4.pan,
          getMousePosition = _this$props4.getMousePosition;

      if (getMousePosition) {
        getMousePosition(this.mousePosition);
      }

      if (mouseDown) {
        mouseDown(e);
      }

      if (pan) {
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
      var _this$props5 = this.props,
          unit = _this$props5.unit,
          sp = _this$props5.screenPosition,
          zoom = _this$props5.zoom;
      var client = this.getClient(e);
      var offset = (0, _jquery.default)(this.dom.current).offset();
      client = {
        x: client.x - offset.left + window.pageXOffset,
        y: client.y - offset.top + window.pageYOffset
      };
      var coords = {
        x: Math.floor((client.x - this.axisPosition.x + sp.x * zoom) / zoom),
        y: Math.floor((client.y - this.axisPosition.y + sp.y * zoom * -1) / zoom)
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
        endX: screenPosition.x,
        endY: screenPosition.y
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
          _this$props6 = this.props,
          zoom = _this$props6.zoom,
          onpan = _this$props6.onpan,
          coords = this.getClient(e); //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}

      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX,
          y = (coords.y - so.y) / zoom + so.endY;

      if (onpan) {
        onpan({
          x: x,
          y: y
        });
      }
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
    key: "render",
    value: function render() {
      var _this$props7 = this.props,
          id = _this$props7.id,
          style = _this$props7.style;
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
  snap: {
    x: 10,
    y: 10
  },
  unit: 'px',
  axisPosition: 'center',
  pan: false,
  screenPosition: {
    x: 0,
    y: 0
  }
};