"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

var _rActions = _interopRequireDefault(require("r-actions"));

var _rGeometric = require("r-geometric");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
    _this.oc = 5;
    _this.mousePosition = [null, null];
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
    key: "getRandomColor",
    value: function getRandomColor(color) {
      var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;

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
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return style;
    }
  }, {
    key: "getCoordsByPivot",
    value: function getCoordsByPivot(_ref2) {
      var pivot = _ref2.pivot,
          x = _ref2.x,
          y = _ref2.y;

      if (!pivot) {
        return {
          x: x,
          y: y
        };
      }

      var _pivot = _slicedToArray(pivot, 2),
          _pivot$ = _pivot[0],
          px = _pivot$ === void 0 ? 0 : _pivot$,
          _pivot$2 = _pivot[1],
          py = _pivot$2 === void 0 ? 0 : _pivot$2;

      return {
        x: x - getValueByRange(px, 0, this.width),
        y: y - getValueByRange(py, 0, this.height)
      };
    }
  }, {
    key: "getItem",
    value: function getItem(item) {
      if (item.array && item.count) {
        var _item$x = item.x,
            x = _item$x === void 0 ? 0 : _item$x,
            _item$y = item.y,
            y = _item$y === void 0 ? 0 : _item$y,
            count = item.count,
            array = item.array,
            pivot = item.pivot;
        count = typeof count === 'function' ? count(item) : count;
        var arr = [];

        for (var i = 0; i < count; i++) {
          arr.push(array(i, item));
        }

        return {
          items: arr,
          x: x,
          y: y,
          pivot: pivot
        };
      }

      if (item.arcPoints) {
        var arcPoints = item.arcPoints,
            _item$pivot = item.pivot,
            _pivot2 = _item$pivot === void 0 ? [] : _item$pivot;

        var arc = _rGeometric.getArcBy3Points.apply(void 0, _toConsumableArray(arcPoints));

        item.r = arc.r;
        item.slice = arc.slice;
        item.pivot = [-arc.x + (_pivot2[0] || 0), -arc.y + (_pivot2[1] || 0)];
      }

      if (item.trianglePoints) {
        var trianglePoints = item.trianglePoints,
            triangleWidth = item.triangleWidth,
            _item$corner = item.corner,
            corner = _item$corner === void 0 ? [] : _item$corner;

        var _trianglePoints = _slicedToArray(trianglePoints, 2),
            p1 = _trianglePoints[0],
            p2 = _trianglePoints[1];

        var width = triangleWidth;
        var t1 = (0, _rGeometric.getPrependicularPointFromLine)(p1, p2, 'start', width / 2);
        var t2 = (0, _rGeometric.getPrependicularPointFromLine)(p1, p2, 'start', -width / 2);
        item.points = [[p1[0], p1[1], corner[0]], [t1.x, t1.y, corner[1]], [p2[0], p2[1], corner[2]], [t2.x, t2.y], p1];
      }

      return item;
    }
  }, {
    key: "getExtension",
    value: function getExtension(item) {
      var ext = item.ext,
          parameter = item.parameter;

      if (!ext) {
        return item;
      }

      var extensions = this.props.extensions;
      return _jquery.default.extend({}, extensions[ext](parameter), item);
    }
  }, {
    key: "draw",
    value: function draw() {
      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.items;
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      //مشخصات پرنت رو بگیر
      var _parent$x = parent.x,
          parentx = _parent$x === void 0 ? 0 : _parent$x,
          _parent$y = parent.y,
          parenty = _parent$y === void 0 ? 0 : _parent$y,
          _parent$rotate = parent.rotate,
          parentrotate = _parent$rotate === void 0 ? 0 : _parent$rotate,
          _parent$opacity = parent.opacity,
          parentOpacity = _parent$opacity === void 0 ? 1 : _parent$opacity;
      var _this$props = this.props,
          rotateSetting = _this$props.rotateSetting,
          zoom = _this$props.zoom,
          extensions = _this$props.extensions,
          ctx = this.ctx;

      for (var i = 0; i < items.length; i++) {
        var item = this.getItem(items[i]);
        item = this.getExtension(item);

        if (item.show === false) {
          continue;
        } //پارامتر های مشترک رو از آیتم بگیر


        var _item = item,
            showPivot = _item.showPivot,
            _item$lineJoin = _item.lineJoin,
            lineJoin = _item$lineJoin === void 0 ? 'miter' : _item$lineJoin,
            _item$lineCap = _item.lineCap,
            lineCap = _item$lineCap === void 0 ? 'butt' : _item$lineCap,
            _item$rotate = _item.rotate,
            rotate = _item$rotate === void 0 ? 0 : _item$rotate,
            pivot = _item.pivot,
            _item$angle = _item.angle,
            angle = _item$angle === void 0 ? 0 : _item$angle,
            _item$opacity = _item.opacity,
            opacity = _item$opacity === void 0 ? 1 : _item$opacity,
            _item$x2 = _item.x,
            x = _item$x2 === void 0 ? 0 : _item$x2,
            _item$y2 = _item.y,
            y = _item$y2 === void 0 ? 0 : _item$y2,
            fill = _item.fill,
            stroke = _item.stroke,
            dash = _item.dash,
            _item$lineWidth = _item.lineWidth,
            lineWidth = _item$lineWidth === void 0 ? 1 : _item$lineWidth;
        x = getValueByRange(x, 0, this.width) + parentx;
        y = getValueByRange(y, 0, this.height) + parenty;
        rotate = getValueByRange(rotate, 0, 360) + parentrotate;
        opacity *= parentOpacity;
        var coords = this.getCoordsByPivot({
          x: x,
          y: y,
          pivot: pivot
        });

        if (!fill && !stroke) {
          stroke = '#000';
          item.stroke = '#000';
        }

        ctx.save();
        ctx.beginPath();
        rotate && this.rotate(rotate, {
          x: x,
          y: y
        });
        angle && this.rotate(angle, coords);
        ctx.globalAlpha = opacity;
        ctx.lineCap = lineCap;
        ctx.lineJoin = lineJoin;
        this.shadow(item, ctx);
        dash && ctx.setLineDash(dash);
        ctx.lineWidth = lineWidth * zoom;
        ctx.strokeStyle = stroke === 'random' ? this.getRandomColor().color : this.getColor(stroke);
        ctx.fillStyle = fill === 'random' ? this.getRandomColor().color : this.getColor(fill);

        if (item.items) {
          this.draw(item.items, {
            x: coords.x,
            y: coords.y,
            rotate: rotate,
            opacity: opacity
          });
        } else if (item.width || item.height) {
          var _item2 = item,
              _item2$width = _item2.width,
              width = _item2$width === void 0 ? 20 : _item2$width,
              _item2$height = _item2.height,
              height = _item2$height === void 0 ? 20 : _item2$height,
              _item2$corner = _item2.corner,
              corner = _item2$corner === void 0 ? [] : _item2$corner;
          width = getValueByRange(width, 0, this.width);
          height = getValueByRange(height, 0, this.height);

          var _x = coords.x,
              _y = coords.y,
              _corner = _slicedToArray(corner, 4),
              _corner$ = _corner[0],
              c0 = _corner$ === void 0 ? 0 : _corner$,
              _corner$2 = _corner[1],
              c1 = _corner$2 === void 0 ? 0 : _corner$2,
              _corner$3 = _corner[2],
              c2 = _corner$3 === void 0 ? 0 : _corner$3,
              _corner$4 = _corner[3],
              c3 = _corner$4 === void 0 ? 0 : _corner$4;

          var points = [[_x + width / 2, _y], [_x + width, _y, c1], [_x + width, _y + height, c2], [_x, _y + height, c3], [_x, _y, c0], [_x + width / 2, _y, c1]];
          this.drawLine(parentx, parenty, points, {
            x: 0,
            y: 0
          }, close, stroke, fill);
        } else if (item.points) {
          var _item3 = item,
              _points = _item3.points,
              _close = _item3.close;

          if (_points.length < 1) {
            continue;
          }

          this.drawLine(parentx, parenty, _points, coords, _close, stroke, fill, item);
        } else if (item.r) {
          var _item4 = item,
              r = _item4.r,
              _item4$slice = _item4.slice,
              slice = _item4$slice === void 0 ? [0, 360] : _item4$slice;
          r = getValueByRange(r, this.width, this.height);
          r = r < 0 ? 0 : r;
          item.r = r;
          var _rotateSetting$direct = rotateSetting.direction,
              direction = _rotateSetting$direct === void 0 ? 'clock' : _rotateSetting$direct;
          var startAngle = getValueByRange(slice[0], 0, 360),
              endAngle = getValueByRange(slice[1], 0, 360);

          if (direction === 'clockwise') {
            var a = startAngle,
                b = endAngle;
            startAngle = -b;
            endAngle = -a;
          }

          item.startAngle = startAngle;
          item.endAngle = endAngle;
          ctx.arc(coords.x * zoom, coords.y * zoom, r * zoom, startAngle * this.PI, endAngle * this.PI);
          stroke && ctx.stroke();
          fill && ctx.fill();
        } else if (item.text || item.text === 0) {
          var _item5 = item,
              _item5$align = _item5.align,
              align = _item5$align === void 0 ? [0, 0] : _item5$align,
              _item5$fontSize = _item5.fontSize,
              fontSize = _item5$fontSize === void 0 ? 12 : _item5$fontSize,
              _item5$text = _item5.text,
              text = _item5$text === void 0 ? 'Text' : _item5$text;

          var _this$getTextAlign = this.getTextAlign(align),
              _this$getTextAlign2 = _slicedToArray(_this$getTextAlign, 2),
              textAlign = _this$getTextAlign2[0],
              textBaseline = _this$getTextAlign2[1];

          ctx.textAlign = textAlign;
          ctx.textBaseline = textBaseline;
          ctx.font = fontSize * zoom + "px arial";
          stroke && ctx.strokeText(text, coords.x * zoom, coords.y * zoom);
          fill && ctx.fillText(text, coords.x * zoom, coords.y * zoom);
        }

        if (showPivot) {
          this.showPivot(x, y);
        }

        var X = this.mousePosition[0] + this.axisPosition[0];
        var Y = this.mousePosition[1] + this.axisPosition[1];
        item.inPath = false;
        item.inStroke = false;

        if (item.fill && ctx.isPointInPath(X, Y)) {
          item.inPath = true;
        } else if (item.stroke && ctx.isPointInStroke(X, Y)) {
          item.inStroke = true;
        }

        ctx.closePath();
        ctx.restore();
        this.items.push(item);
      }
    }
  }, {
    key: "drawLine",
    value: function drawLine(parentx, parenty, points, coords, close, stroke, fill, item) {
      var zoom = this.props.zoom;
      var start = [getValueByRange(points[0][0], 0, this.width) + coords.x, getValueByRange(points[0][1], 0, this.height) + coords.y];
      this.ctx.moveTo(start[0] * zoom, start[1] * zoom);
      var beforePoint = points[0];

      for (var i = 1; i < points.length; i++) {
        var _this$getPoint = this.getPoint(points[i], beforePoint),
            _this$getPoint2 = _slicedToArray(_this$getPoint, 3),
            x = _this$getPoint2[0],
            y = _this$getPoint2[1],
            r = _this$getPoint2[2];

        beforePoint = [x, y];
        var point = [getValueByRange(x, 0, this.width) + coords.x, getValueByRange(y, 0, this.height) + coords.y];

        if (r) {
          var _ref3 = points[i + 1] ? this.getPoint(points[i + 1], points[i]) : points[0],
              _ref4 = _slicedToArray(_ref3, 2),
              _x2 = _ref4[0],
              _y2 = _ref4[1];

          var nextPoint = [getValueByRange(_x2, 0, this.width) + coords.x, getValueByRange(_y2, 0, this.height) + coords.y];
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
      ctx.strokeStyle = 'rgba(255,100,0,.3)';
      ctx.stroke();
      ctx.closePath();
    }
  }, {
    key: "getPoint",
    value: function getPoint(point, beforePoint) {
      if (Array.isArray(point)) {
        return point;
      }

      return (0, _rGeometric.getLineBySLA)(beforePoint, point.length, point.angle).p2;
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
          direction = _rotateSetting$direct2 === void 0 ? 'clock' : _rotateSetting$direct2;

      if (angle === 0) {
        return;
      }

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
      this.items = [];
      var _this$props3 = this.props,
          getSize = _this$props3.getSize,
          grid = _this$props3.grid,
          zoom = _this$props3.zoom;
      var dom = this.dom.current;
      this.width = (0, _jquery.default)(dom).width();
      this.height = (0, _jquery.default)(dom).height();

      var _this$props$axisPosit = _slicedToArray(this.props.axisPosition, 2),
          _this$props$axisPosit2 = _this$props$axisPosit[0],
          x = _this$props$axisPosit2 === void 0 ? '50%' : _this$props$axisPosit2,
          _this$props$axisPosit3 = _this$props$axisPosit[1],
          y = _this$props$axisPosit3 === void 0 ? '50%' : _this$props$axisPosit3;

      this.axisPosition = [getValueByRange(x, 0, this.width), getValueByRange(y, 0, this.height)];

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
      var dash = [3, 3],
          stroke = '#000';
      this.draw([{
        points: [[0, -4002], [0, 4000]],
        stroke: stroke,
        dash: dash,
        AxIs: true
      }, {
        points: [[-4002, 0], [4000, 0]],
        stroke: stroke,
        dash: dash,
        AxIs: true
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
      if (!color) {
        return;
      }

      if (typeof color === 'string') {
        return color;
      }

      var length = color.length;

      if (length === 5) {
        var _this$ctx;

        var g = (_this$ctx = this.ctx).createLinearGradient.apply(_this$ctx, _toConsumableArray(color));
      } else if (length === 7) {
        var _this$ctx2;

        var g = (_this$ctx2 = this.ctx).createRadialGradient.apply(_this$ctx2, _toConsumableArray(color));
      }

      var stops = color[color.length - 1];

      for (var i = 0; i < stops.length; i++) {
        var s = stops[i].split(' ');
        g.addColorStop(s[0], s[1]);
      }

      return g;
    }
  }, {
    key: "shadow",
    value: function shadow(_ref5) {
      var _shadow = _ref5.shadow;

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
    value: function getTextAlign(_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          _ref7$ = _ref7[0],
          x = _ref7$ === void 0 ? 0 : _ref7$,
          _ref7$2 = _ref7[1],
          y = _ref7$2 === void 0 ? 0 : _ref7$2;

      return [['right', 'center', 'left'][x + 1], ['top', 'middle', 'bottom'][y + 1]];
    }
  }, {
    key: "getBackground",
    value: function getBackground() {
      var _this$props4 = this.props,
          grid = _this$props4.grid,
          zoom = _this$props4.zoom;

      var _grid = _slicedToArray(grid, 3),
          x = _grid[0],
          y = _grid[1],
          _grid$ = _grid[2],
          color = _grid$ === void 0 ? 'rgba(70,70,70,0.3)' : _grid$;

      var a = 100 * zoom;
      var b = x ? getValueByRange(x, 0, this.width) * zoom + 'px' : '100%';
      var c = y ? getValueByRange(y, 0, this.height) * zoom + 'px' : '100%';
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
          _this$props5 = this.props,
          zoom = _this$props5.zoom,
          onpan = _this$props5.onpan,
          coords = getClient(e); //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}

      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX,
          y = (coords.y - so.y) / zoom + so.endY;
      onpan([x, y]);
    }
  }, {
    key: "setScreen",
    value: function setScreen() {
      var _this$props6 = this.props,
          zoom = _this$props6.zoom,
          screenPosition = _this$props6.screenPosition;
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
    key: "mouseDown",
    value: function mouseDown(e) {
      this.mousePosition = this.getMousePosition(e);

      if (this.props.selectable) {
        this.update();
        this.searchItem();
      }

      var _this$props7 = this.props,
          mouseDown = _this$props7.mouseDown,
          onpan = _this$props7.onpan,
          getMousePosition = _this$props7.getMousePosition;

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
    key: "arcTest",
    value: function arcTest(_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          x = _ref9[0],
          y = _ref9[1];

      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, 360 * Math.PI / 180);
      this.ctx.fill();
      this.ctx.closePath();
    }
  }, {
    key: "searchItem",
    value: function searchItem() {
      for (var i = this.items.length - 1; i >= 0; i--) {
        var item = this.items[i];

        if (!item.callback) {
          continue;
        }

        if (item.fill && item.inPath) {
          item.callback(item);
          return;
        }

        if (item.stroke && item.inStroke) {
          item.callback(item);
          return;
        }
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
      var _this$props8 = this.props,
          unit = _this$props8.unit,
          sp = _this$props8.screenPosition,
          zoom = _this$props8.zoom;
      var client = getClient(e);
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
      var _this$props9 = this.props,
          id = _this$props9.id,
          style = _this$props9.style,
          className = _this$props9.className;
      return _react.default.createElement("canvas", {
        ref: this.dom,
        className: className,
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
  axisPosition: ['50%', '50%'],
  selectable: false,
  screenPosition: [0, 0],
  items: [],
  rotateSetting: {
    direction: 'clock'
  }
};