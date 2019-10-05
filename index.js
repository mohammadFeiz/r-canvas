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
    key: "getCoordsByUnit",
    value: function getCoordsByUnit(point, unit) {
      return this.props.unit === '%' || unit === '%' ? {
        x: point.x * this.width / 100,
        y: point.y * this.height / 100
      } : point;
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
      var _line$w = line.w,
          w = _line$w === void 0 ? 1 : _line$w,
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

      if (dash) {
        ctx.setLineDash(dash);
      }

      ctx.lineJoin = lineJoin;
      ctx.lineCap = lineCap;
      ctx.lineWidth = w * zoom;
      p = this.getCoordsByUnit(start);
      ctx.moveTo(p.x * zoom, p.y * zoom);

      for (var i = 1; i < length; i++) {
        var p = this.getCoordsByUnit(points[i]);
        ctx.lineTo(p.x * zoom, p.y * zoom);
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
    value: function drawarc(obj) {
      var _obj$lineWidth = obj.lineWidth,
          lineWidth = _obj$lineWidth === void 0 ? 1 : _obj$lineWidth,
          _obj$slice = obj.slice,
          slice = _obj$slice === void 0 ? [0, 360] : _obj$slice,
          _obj$r = obj.r,
          r = _obj$r === void 0 ? 20 : _obj$r,
          fill = obj.fill,
          stroke = obj.stroke,
          lineCap = obj.lineCap,
          _obj$lineJoin = obj.lineJoin,
          lineJoin = _obj$lineJoin === void 0 ? 'butt' : _obj$lineJoin,
          _obj$x = obj.x,
          x = _obj$x === void 0 ? 0 : _obj$x,
          _obj$y = obj.y,
          y = _obj$y === void 0 ? 0 : _obj$y,
          clockwise = obj.clockwise,
          shadow = obj.shadow,
          rotate = obj.rotate,
          pivot = obj.pivot,
          unit = obj.unit;
      var _this$props$rotateSet = this.props.rotateSetting,
          _this$props$rotateSet2 = _this$props$rotateSet.direction,
          direction = _this$props$rotateSet2 === void 0 ? 'clock' : _this$props$rotateSet2,
          _this$props$rotateSet3 = _this$props$rotateSet.offset,
          offset = _this$props$rotateSet3 === void 0 ? 0 : _this$props$rotateSet3;
      var zoom = this.props.zoom;
      var ctx = this.ctx;
      var p = this.getCoordsByUnit({
        x: x,
        y: y
      }, unit);
      p = this.getCoordsByPivot({
        p: p,
        r: r,
        pivot: pivot,
        type: 'arc',
        lineWidth: lineWidth
      });
      ctx.save();
      ctx.beginPath();

      if (rotate !== undefined) {
        this.rotate(rotate, {
          x: x,
          y: y
        });
      }

      if (direction === 'clock') {
        ctx.arc(p.x * zoom, p.y * zoom, r * zoom, slice[0] * Math.PI / 180, slice[1] * Math.PI / 180);
      } else if (direction === 'clockwise') {
        ctx.arc(p.x * zoom, p.y * zoom, r * zoom, -slice[1] * Math.PI / 180, -slice[0] * Math.PI / 180);
      }

      this.shadow(shadow);
      ctx.lineCap = lineCap;
      ctx.lineJoin = lineJoin;
      ctx.lineWidth = lineWidth;
      this.ink(fill, stroke);
      ctx.closePath();
      ctx.restore();
    }
  }, {
    key: "drawrectangle",
    value: function drawrectangle(obj) {
      var _obj$width = obj.width,
          width = _obj$width === void 0 ? 20 : _obj$width,
          _obj$height = obj.height,
          height = _obj$height === void 0 ? 20 : _obj$height,
          _obj$x2 = obj.x,
          x = _obj$x2 === void 0 ? 0 : _obj$x2,
          _obj$y2 = obj.y,
          y = _obj$y2 === void 0 ? 0 : _obj$y2,
          _obj$lineWidth2 = obj.lineWidth,
          lineWidth = _obj$lineWidth2 === void 0 ? 1 : _obj$lineWidth2,
          fill = obj.fill,
          stroke = obj.stroke,
          rotate = obj.rotate,
          _obj$pivot = obj.pivot,
          pivot = _obj$pivot === void 0 ? 'center' : _obj$pivot,
          unit = obj.unit;
      var _this$props = this.props,
          zoom = _this$props.zoom,
          rotateSetting = _this$props.rotateSetting,
          ctx = this.ctx;
      var p = this.getCoordsByUnit({
        x: x,
        y: y
      }, unit);
      var limit = this.getCoordsByUnit({
        x: width,
        y: height
      });
      p = this.getCoordsByPivot({
        p: p,
        width: limit.x,
        height: limit.y,
        pivot: pivot,
        type: 'rectangle',
        lineWidth: lineWidth
      });
      ctx.save();
      ctx.beginPath();

      if (rotate !== undefined) {
        this.rotate(rotate, {
          x: x,
          y: y
        });
      }

      ctx.rect(p.x * zoom, p.y * zoom, limit.x * zoom, limit.y * zoom);
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
      ctx.restore();
    }
  }, {
    key: "getCoordsByPivot",
    value: function getCoordsByPivot(_ref) {
      var p = _ref.p,
          width = _ref.width,
          height = _ref.height,
          r = _ref.r,
          pivot = _ref.pivot,
          type = _ref.type,
          lineWidth = _ref.lineWidth;

      if (!pivot) {
        return p;
      }

      var f = {
        custom: function custom() {
          return {
            x: p.x - pivot.x,
            y: p.y - pivot.y
          };
        },
        rectangle: {
          center: function center() {
            return {
              x: p.x - width / 2,
              y: p.y - height / 2
            };
          },
          right: function right() {
            return {
              x: p.x - width - lineWidth / 2,
              y: p.y - height / 2
            };
          },
          left: function left() {
            return {
              x: p.x + lineWidth / 2,
              y: p.y - height / 2
            };
          },
          up: function up() {
            return {
              x: p.x - width / 2,
              y: p.y + lineWidth / 2
            };
          },
          down: function down() {
            return {
              x: p.x - width / 2,
              y: p.y - height - lineWidth / 2
            };
          },
          upright: function upright() {
            return {
              x: p.x - width - lineWidth / 2,
              y: p.y + lineWidth / 2
            };
          },
          upleft: function upleft() {
            return {
              x: p.x + lineWidth / 2,
              y: p.y + lineWidth / 2
            };
          },
          downright: function downright() {
            return {
              x: p.x - width - lineWidth / 2,
              y: p.y - height - lineWidth / 2
            };
          },
          downleft: function downleft() {
            return {
              x: p.x / 2 + lineWidth / 2,
              y: p.y - height - lineWidth / 2
            };
          }
        },
        arc: {
          center: function center() {
            return p;
          },
          right: function right() {
            return {
              x: p.x - r - lineWidth / 2,
              y: p.y
            };
          },
          left: function left() {
            return {
              x: p.x + r + lineWidth / 2,
              y: p.y
            };
          },
          up: function up() {
            return {
              x: p.x,
              y: p.y + r + lineWidth / 2
            };
          },
          down: function down() {
            return {
              x: p.x,
              y: p.y - r - lineWidth / 2
            };
          },
          upright: function upright() {
            return {
              x: p.x - r - lineWidth / 2,
              y: p.y + r + lineWidth / 2
            };
          },
          upleft: function upleft() {
            return {
              x: p.x + r + lineWidth / 2,
              y: p.y + r + lineWidth / 2
            };
          },
          downright: function downright() {
            return {
              x: p.x - r - lineWidth / 2,
              y: p.y - r - lineWidth / 2
            };
          },
          downleft: function downleft() {
            return {
              x: p.x + r + lineWidth / 2,
              y: p.y - r - lineWidth / 2
            };
          }
        }
      };
      return typeof pivot === 'string' ? f[type][pivot]() : f.custom();
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
          _obj$lineWidth3 = obj.lineWidth,
          lineWidth = _obj$lineWidth3 === void 0 ? 1 : _obj$lineWidth3,
          x = obj.x,
          y = obj.y,
          angle = obj.angle;
      var p = this.getCoordsByUnit({
        x: x,
        y: y
      }, unit);
      p = this.getCoordsByPivot({
        p: p,
        pivot: pivot,
        type: 'rectangle',
        lineWidth: lineWidth
      });
      ctx.save();
      ctx.beginPath();

      if (rotate !== undefined) {
        this.rotate(rotate, {
          x: x,
          y: y
        });
      }

      if (angle !== undefined) {
        this.rotate(angle, p);
      }

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
    value: function rotate(angle, center) {
      var _this$props$rotateSet4 = this.props.rotateSetting,
          _this$props$rotateSet5 = _this$props$rotateSet4.direction,
          direction = _this$props$rotateSet5 === void 0 ? 'clock' : _this$props$rotateSet5,
          _this$props$rotateSet6 = _this$props$rotateSet4.offset,
          offset = _this$props$rotateSet6 === void 0 ? 0 : _this$props$rotateSet6;
      angle += offset;
      angle = angle * Math.PI / 180 * (direction === 'clockwise' ? -1 : 1);
      var s = Math.sin(angle),
          c = Math.cos(angle);
      var p = {
        x: center.x,
        y: -center.y
      };
      this.ctx.rotate(angle);
      this.ctx.translate(p.x * c - p.y * s - p.x, p.y - (p.x * s + p.y * c));
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
      var _this$props2 = this.props,
          zoom = _this$props2.zoom,
          screenPosition = _this$props2.screenPosition,
          axisPosition = _this$props2.axisPosition;
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
      var _this$props3 = this.props,
          snap = _this$props3.snap,
          zoom = _this$props3.zoom,
          unit = _this$props3.unit;
      var a = 100 * zoom;
      var b = unit === '%' ? "calc(".concat(snap.x, " * ").concat(zoom, ")") : snap.x * zoom + 'px';
      var c = unit === '%' ? "calc(".concat(snap.y, " * ").concat(zoom, ")") : snap.y * zoom + 'px';
      return {
        backgroundImage: "linear-gradient(rgba(".concat(snap.color, ",0.5) 0px,transparent 0px),linear-gradient(90deg, rgba(").concat(snap.color, ",0.5) 0px, transparent 0px),linear-gradient(rgba(").concat(snap.color, ",0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(").concat(snap.color, ",0.3) 1px, transparent 1px)"),
        backgroundSize: "".concat(a, "px ").concat(a, "px,").concat(a, "px ").concat(a, "px,").concat(b, " ").concat(c, ",").concat(b, " ").concat(c)
      };
    }
  }, {
    key: "update",
    value: function update() {
      var _this$props4 = this.props,
          getSize = _this$props4.getSize,
          snap = _this$props4.snap;
      var dom = this.dom.current;
      this.width = (0, _jquery.default)(dom).width();
      this.height = (0, _jquery.default)(dom).height();

      if (getSize) {
        getSize(this.width, this.height);
      }

      dom.width = this.width;
      dom.height = this.height;

      if (snap) {
        (0, _jquery.default)(dom).css(this.getBackground());
      }

      this.clear();
      this.setScreen();

      if (snap) {
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
      var _this$props5 = this.props,
          mouseDown = _this$props5.mouseDown,
          pan = _this$props5.pan,
          getMousePosition = _this$props5.getMousePosition;

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
      var _this$props6 = this.props,
          unit = _this$props6.unit,
          sp = _this$props6.screenPosition,
          zoom = _this$props6.zoom;
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
          _this$props7 = this.props,
          zoom = _this$props7.zoom,
          onpan = _this$props7.onpan,
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
      var _this$props8 = this.props,
          id = _this$props8.id,
          style = _this$props8.style;
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
  axisPosition: 'center',
  pan: false,
  screenPosition: {
    x: 0,
    y: 0
  },
  items: [],
  rotateSetting: {
    direction: 'clock',
    offset: 0
  }
};