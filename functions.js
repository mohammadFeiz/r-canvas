"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColor = getColor;
exports.shadow = shadow;
exports.getSides = getSides;
exports.getTextAlign = getTextAlign;
exports.getAxisPosition = getAxisPosition;
exports.getBackground = getBackground;
exports.getCoordsByPivot = getCoordsByPivot;

var _rActions = _interopRequireDefault(require("./r-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _ref = new _rActions.default(),
    getValueByRange = _ref.getValueByRange;

function getColor(color, ctx) {
  if (typeof color === 'string') {
    return color;
  }

  var _color = _slicedToArray(color, 5),
      sx = _color[0],
      sy = _color[1],
      ex = _color[2],
      ey = _color[3],
      stops = _color[4];

  var g = ctx.createLinearGradient(sx, sy, ex, ey);

  for (var i = 0; i < stops.length; i++) {
    var s = stops[i];
    g.addColorStop(s[0], s[1]);
  }

  return g;
}

function shadow(_ref2, ctx) {
  var shadow = _ref2.shadow;

  if (!shadow) {
    return;
  }

  ctx.shadowOffsetX = shadow[0];
  ctx.shadowOffsetY = shadow[1];
  ctx.shadowBlur = shadow[2];
  ctx.shadowColor = shadow[3];
}

function getSides(list) {
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

function getTextAlign(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      _ref4$ = _ref4[0],
      x = _ref4$ === void 0 ? 0 : _ref4$,
      _ref4$2 = _ref4[1],
      y = _ref4$2 === void 0 ? 0 : _ref4$2;

  return [['right', 'center', 'left'][x + 1], ['top', 'middle', 'bottom'][y + 1]];
}

function getAxisPosition(_ref5, width, height) {
  var _ref5$x = _ref5.x,
      x = _ref5$x === void 0 ? '50%' : _ref5$x,
      _ref5$y = _ref5.y,
      y = _ref5$y === void 0 ? '50%' : _ref5$y;
  var X, Y;

  if (x.indexOf('%') !== -1) {
    X = width * parseFloat(x) / 100;
  } else if (x.indexOf('px') !== -1) {
    X = parseFloat(x);
  } else {
    console.error('canvas axisPosition.x error. correct example: ("10px" or "10%")');
  }

  if (y.indexOf('%') !== -1) {
    Y = height * parseFloat(y) / 100;
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

function getBackground(grid, zoom, width, height) {
  var x = grid.x,
      y = grid.y,
      _grid$color = grid.color,
      color = _grid$color === void 0 ? '#000' : _grid$color;
  var a = 100 * zoom;
  var b = x ? getValueByRange(x, 0, width) * zoom + 'px' : '100%';
  var c = y ? getValueByRange(y, 0, height) * zoom + 'px' : '100%';
  var h1 = "linear-gradient(#000 0px,transparent 0px)";
  var v1 = "linear-gradient(90deg, #000 0px, transparent 0px)";
  var h2 = "linear-gradient(rgba(".concat(color, ",0.3) 1px, transparent 1px)");
  var v2 = "linear-gradient(90deg, rgba(".concat(color, ",0.3) 1px, transparent 1px)");
  return {
    backgroundImage: "".concat(h1, ",").concat(v1, ",").concat(h2, ",").concat(v2),
    backgroundSize: "".concat(a, "px ").concat(a, "px,").concat(a, "px ").concat(a, "px,").concat(b, " ").concat(c, ",").concat(b, " ").concat(c)
  };
}

function getCoordsByPivot(obj) {
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