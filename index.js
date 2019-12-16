"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _rActions = _interopRequireDefault(require("r-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _ref = new _rActions.default(),
    eventHandler = _ref.eventHandler,
    getClient = _ref.getClient,
    getValueByRange = _ref.getValueByRange;

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
    (0, _jquery.default)(window).on('resize', _this.resize.bind(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Canvas, [{
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
    key: "getStyle",
    value: function getStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return style;
    }
  }, {
    key: "draw",
    value: function draw() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.items;
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var show = item.show,
            type = item.type;

        if (show === false) {
          continue;
        }

        var _this$props = this.props,
            rotateSetting = _this$props.rotateSetting,
            zoom = _this$props.zoom,
            ctx = this.ctx;
        var _item$lineJoin = item.lineJoin,
            lineJoin = _item$lineJoin === void 0 ? 'miter' : _item$lineJoin,
            _item$lineCap = item.lineCap,
            lineCap = _item$lineCap === void 0 ? 'butt' : _item$lineCap,
            _item$rotate = item.rotate,
            rotate = _item$rotate === void 0 ? 0 : _item$rotate,
            pivot = item.pivot,
            angle = item.angle,
            _item$opacity = item.opacity,
            opacity = _item$opacity === void 0 ? 1 : _item$opacity;
        var _parent$x = parent.x,
            parentx = _parent$x === void 0 ? 0 : _parent$x,
            _parent$y = parent.y,
            parenty = _parent$y === void 0 ? 0 : _parent$y,
            _parent$rotate = parent.rotate,
            parentrotate = _parent$rotate === void 0 ? 0 : _parent$rotate,
            _parent$opacity = parent.opacity,
            parentOpacity = _parent$opacity === void 0 ? 1 : _parent$opacity;
        rotate = getValueByRange(rotate, 0, 360);
        parentrotate = getValueByRange(parentrotate, 0, 360);
        rotate += parentrotate;
        opacity *= parentOpacity;

        if (type === 'group') {
          var _item$x = item.x,
              x = _item$x === void 0 ? 0 : _item$x,
              _item$y = item.y,
              y = _item$y === void 0 ? 0 : _item$y;
          x += parentx;
          y += parenty;
        }

        if (type === 'line') {
          var points = item.points,
              close = item.close;

          if (points.length < 2) {
            return false;
          }

          var _points$ = points[0],
              x = _points$.x,
              y = _points$.y;
          x += parentx;
          y += parenty;
        } else if (type === 'arc') {
          var _item$x2 = item.x,
              x = _item$x2 === void 0 ? 0 : _item$x2,
              _item$y2 = item.y,
              y = _item$y2 === void 0 ? 0 : _item$y2,
              _item$r = item.r,
              r = _item$r === void 0 ? 20 : _item$r;
          x += parentx;
          y += parenty;
          x = getValueByRange(x, 0, this.width);
          y = getValueByRange(y, 0, this.height);
          var p = this.getCoordsByPivot({
            x: x,
            y: y,
            r: r,
            pivot: pivot,
            type: 'arc'
          });
          var center = {
            x: p.x,
            y: p.y
          }; //مخصات مرکز

          var param = {
            x: p.x,
            y: p.y
          };
        } else if (type === 'rectangle') {
          var _item$x3 = item.x,
              x = _item$x3 === void 0 ? 0 : _item$x3,
              _item$y3 = item.y,
              y = _item$y3 === void 0 ? 0 : _item$y3,
              _item$width = item.width,
              width = _item$width === void 0 ? 20 : _item$width,
              _item$height = item.height,
              height = _item$height === void 0 ? 20 : _item$height;
          x += parentx;
          y += parenty;
          x = getValueByRange(x, 0, this.width);
          y = getValueByRange(y, 0, this.height);
          width = getValueByRange(width, 0, this.width);
          height = getValueByRange(height, 0, this.height);
          var p = this.getCoordsByPivot({
            x: x,
            y: y,
            width: width,
            height: height,
            pivot: pivot,
            type: 'rectangle'
          });
          var center = {
            x: p.x + width / 2,
            y: p.y + height / 2
          };
          var param = {
            x: p.x,
            y: p.y,
            width: width,
            height: height
          };
        } else if (type === 'text') {
          var _item$x4 = item.x,
              x = _item$x4 === void 0 ? 0 : _item$x4,
              _item$y4 = item.y,
              y = _item$y4 === void 0 ? 0 : _item$y4,
              _item$align = item.align,
              align = _item$align === void 0 ? [0, 0] : _item$align,
              _item$fontSize = item.fontSize,
              fontSize = _item$fontSize === void 0 ? 12 : _item$fontSize,
              text = item.text;
          x += parentx;
          y += parenty;

          var _this$getTextAlign = this.getTextAlign(align),
              _this$getTextAlign2 = _slicedToArray(_this$getTextAlign, 2),
              X = _this$getTextAlign2[0],
              Y = _this$getTextAlign2[1];

          x = getValueByRange(x, 0, this.width);
          y = getValueByRange(y, 0, this.height);
          var p = this.getCoordsByPivot({
            x: x,
            y: y,
            pivot: pivot,
            type: 'text'
          });
          var center = {
            x: p.x,
            y: p.y
          }; //مختصات مرکز

          var param = {
            x: p.x,
            y: p.y
          };
          ctx.textBaseline = Y;
          ctx.font = fontSize * zoom + "px arial";
          ctx.textAlign = X;
        }

        ctx.save();
        ctx.beginPath();
        rotate && this.rotate(rotate, {
          x: x,
          y: y
        });
        angle && this.rotate(angle, center);
        console.log(opacity);
        ctx.globalAlpha = opacity;

        if (type === 'group') {
          this.draw(item.items, {
            x: x,
            y: y,
            rotate: rotate,
            opacity: opacity
          });
        }

        this.shadow(item, ctx);
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
        this.ink(item, param);
        ctx.closePath();
        ctx.restore();
      }
    }
  }, {
    key: "setStroke",
    value: function setStroke(stroke, lineWidth, dash) {
      if (!stroke) {
        return false;
      }

      var ctx = this.ctx,
          zoom = this.props.zoom;
      dash && ctx.setLineDash(dash);
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth * zoom;
      return true;
    }
  }, {
    key: "setFill",
    value: function setFill(fill) {
      if (!fill) {
        return false;
      }

      var ctx = this.ctx;
      ctx.fillStyle = fill;
      return true;
    }
  }, {
    key: "ink",
    value: function ink(_ref2, obj) {
      var type = _ref2.type,
          stroke = _ref2.stroke,
          fill = _ref2.fill,
          _ref2$text = _ref2.text,
          text = _ref2$text === void 0 ? 'Text' : _ref2$text,
          r = _ref2.r,
          points = _ref2.points,
          close = _ref2.close,
          _ref2$slice = _ref2.slice,
          slice = _ref2$slice === void 0 ? [0, 360] : _ref2$slice,
          pivot = _ref2.pivot,
          _ref2$lineWidth = _ref2.lineWidth,
          lineWidth = _ref2$lineWidth === void 0 ? 1 : _ref2$lineWidth,
          dash = _ref2.dash;

      if (!fill && !stroke) {
        return;
      }

      var _this$props2 = this.props,
          zoom = _this$props2.zoom,
          rotateSetting = _this$props2.rotateSetting,
          ctx = this.ctx;

      if (type === 'text') {
        var x = obj.x,
            y = obj.y;
        this.setStroke(stroke, lineWidth, dash) && ctx.strokeText(text, x * zoom, y * zoom);
        this.setFill(fill) && ctx.fillText(text, x * zoom, y * zoom);
      } else if (type === 'rectangle') {
        var _x = obj.x,
            _y = obj.y,
            width = obj.width,
            height = obj.height;
        this.setStroke(stroke, lineWidth, dash) && ctx.strokeRect(_x * zoom, _y * zoom, width * zoom, height * zoom);
        this.setFill(fill) && ctx.fillRect(_x * zoom, _y * zoom, width * zoom, height * zoom);
      } else if (type === 'arc') {
        var _x2 = obj.x,
            _y2 = obj.y;
        var _rotateSetting$direct = rotateSetting.direction,
            direction = _rotateSetting$direct === void 0 ? 'clock' : _rotateSetting$direct,
            _rotateSetting$offset = rotateSetting.offset,
            offset = _rotateSetting$offset === void 0 ? 0 : _rotateSetting$offset;
        var slice0 = getValueByRange(slice[0], 0, 360),
            slice1 = getValueByRange(slice[1], 0, 360);
        var sa, ea;

        if (direction === 'clock') {
          sa = slice0 * this.PI;
          ea = slice1 * this.PI;
        } else {
          sa = -slice1 * this.PI;
          ea = -slice0 * this.PI;
        }

        ctx.arc(_x2 * zoom, _y2 * zoom, r * zoom, sa, ea);
        this.setStroke(stroke, lineWidth, dash) && ctx.stroke();
        this.setFill(fill) && ctx.fill();
      } else if (type === 'line') {
        var start = this.getCoordsByPivot({
          x: points[0].x,
          y: points[0].y,
          pivot: pivot,
          type: 'line'
        });
        ctx.moveTo(getValueByRange(start.x, 0, this.width) * zoom, getValueByRange(start.y, 0, this.height) * zoom);

        for (var i = 1; i < points.length; i++) {
          var p = this.getCoordsByPivot({
            x: points[i].x,
            y: points[i].y,
            pivot: pivot,
            type: 'line'
          });
          ctx.lineTo(getValueByRange(p.x, 0, this.width) * zoom, getValueByRange(p.y, 0, this.height) * zoom);
        }

        if (points.length > 2 && close) {
          ctx.lineTo(start.x * zoom, start.y * zoom);
        }

        this.setStroke(stroke, lineWidth, dash) && ctx.stroke();
        this.setFill(fill) && ctx.fill();
      }
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var angle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var center = arguments.length > 1 ? arguments[1] : undefined;
      var _this$props3 = this.props,
          zoom = _this$props3.zoom,
          rotateSetting = _this$props3.rotateSetting;
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
    key: "update",
    value: function update() {
      var _this$props4 = this.props,
          getSize = _this$props4.getSize,
          grid = _this$props4.grid,
          zoom = _this$props4.zoom;
      var dom = this.dom.current;
      this.width = (0, _jquery.default)(dom).width();
      this.height = (0, _jquery.default)(dom).height();
      this.axisPosition = {
        x: getValueByRange(this.props.axisPosition.x, 0, this.width),
        y: getValueByRange(this.props.axisPosition.y, 0, this.height)
      };

      if (getSize) {
        getSize(this.width, this.height);
      }

      dom.width = this.width;
      dom.height = this.height;

      if (grid) {
        (0, _jquery.default)(dom).css(this.getBackground(grid, zoom, this.width, this.height));
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
      var stroke = [undefined, 1, [3, 3]],
          type = 'line';
      this.draw([{
        type: type,
        points: [{
          x: 0,
          y: -4002
        }, {
          x: 0,
          y: 4000
        }],
        stroke: stroke
      }, {
        type: type,
        points: [{
          x: -4002,
          y: 0
        }, {
          x: 4000,
          y: 0
        }],
        stroke: stroke
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
    value: function getColor(color) {
      if (typeof color === 'string') {
        return color;
      }

      var _color = _slicedToArray(color, 5),
          sx = _color[0],
          sy = _color[1],
          ex = _color[2],
          ey = _color[3],
          stops = _color[4];

      var g = this.ctx.createLinearGradient(sx, sy, ex, ey);

      for (var i = 0; i < stops.length; i++) {
        var s = stops[i];
        g.addColorStop(s[0], s[1]);
      }

      return g;
    }
  }, {
    key: "shadow",
    value: function shadow(_ref3) {
      var _shadow = _ref3.shadow;

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
    value: function getTextAlign(_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          _ref5$ = _ref5[0],
          x = _ref5$ === void 0 ? 0 : _ref5$,
          _ref5$2 = _ref5[1],
          y = _ref5$2 === void 0 ? 0 : _ref5$2;

      return [['right', 'center', 'left'][x + 1], ['top', 'middle', 'bottom'][y + 1]];
    }
  }, {
    key: "getBackground",
    value: function getBackground() {
      var _this$props5 = this.props,
          grid = _this$props5.grid,
          zoom = _this$props5.zoom;
      var x = grid.x,
          y = grid.y,
          _grid$color = grid.color,
          color = _grid$color === void 0 ? '#000' : _grid$color;
      var a = 100 * zoom;
      var b = x ? getValueByRange(x, 0, this.width) * zoom + 'px' : '100%';
      var c = y ? getValueByRange(y, 0, this.height) * zoom + 'px' : '100%';
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
    key: "getCoordsByPivot",
    value: function getCoordsByPivot(obj) {
      var pivot = obj.pivot,
          type = obj.type,
          x = obj.x,
          y = obj.y;

      if (!pivot) {
        return {
          x: x,
          y: y
        };
      }

      var _pivot$x = pivot.x,
          px = _pivot$x === void 0 ? 0 : _pivot$x,
          _pivot$y = pivot.y,
          py = _pivot$y === void 0 ? 0 : _pivot$y,
          w,
          h;

      if (type === 'rectangle') {
        var width = obj.width,
            height = obj.height;
        w = width;
        h = height;
      } else if (type === 'arc') {
        var r = obj.r;
        w = r * 2;
        h = r * 2;
      }

      return {
        x: x - getValueByRange(px, 0, w),
        y: y - getValueByRange(py, 0, h)
      };
    }
  }, {
    key: "panmousedown",
    value: function panmousedown(e) {
      eventHandler("window", "mousemove", _jquery.default.proxy(this.panmousemove, this));
      eventHandler("window", "mouseup", _jquery.default.proxy(this.panmouseup, this));
      this.panned = false;
      var screenPosition = this.props.screenPosition;
      var client = getClient(e);
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
      eventHandler("window", "mousemove", this.panmousemove, 'unbind');
      eventHandler("window", "mouseup", this.panmouseup, 'unbind');
    }
  }, {
    key: "panmousemove",
    value: function panmousemove(e) {
      var so = this.startOffset,
          _this$props6 = this.props,
          zoom = _this$props6.zoom,
          onpan = _this$props6.onpan,
          coords = getClient(e); //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}

      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX,
          y = (coords.y - so.y) / zoom + so.endY;
      onpan([x, y]);
    }
  }, {
    key: "setScreen",
    value: function setScreen() {
      var _this$props7 = this.props,
          zoom = _this$props7.zoom,
          screenPosition = _this$props7.screenPosition;
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
    key: "mouseDown",
    value: function mouseDown(e) {
      this.mousePosition = this.getMousePosition(e);
      var _this$props8 = this.props,
          mouseDown = _this$props8.mouseDown,
          onpan = _this$props8.onpan,
          getMousePosition = _this$props8.getMousePosition;

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
    key: "getMousePosition",
    value: function getMousePosition(e) {
      var _this$props9 = this.props,
          unit = _this$props9.unit,
          sp = _this$props9.screenPosition,
          zoom = _this$props9.zoom;
      var client = getClient(e);
      var offset = (0, _jquery.default)(this.dom.current).offset();
      client = {
        x: client.x - offset.left + window.pageXOffset,
        y: client.y - offset.top + window.pageYOffset
      };
      var x = Math.floor((client.x - this.axisPosition.x + sp[0] * zoom) / zoom);
      var y = Math.floor((client.y - this.axisPosition.y + sp[1] * zoom * -1) / zoom);
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
      var _this$props10 = this.props,
          id = _this$props10.id,
          style = _this$props10.style,
          className = _this$props10.className;
      return _react.default.createElement("canvas", {
        ref: this.dom,
        id: id,
        className: className,
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