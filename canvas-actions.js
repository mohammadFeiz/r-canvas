"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rActions = _interopRequireDefault(require("r-actions"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ref = new _rActions.default(),
    eventHandler = _ref.eventHandler,
    getClient = _ref.getClient,
    getValueByRange = _ref.getValueByRange;

var _default = {
  panmousedown: function panmousedown(e) {
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
  },
  panmouseup: function panmouseup() {
    eventHandler("window", "mousemove", this.panmousemove, 'unbind');
    eventHandler("window", "mouseup", this.panmouseup, 'unbind');
  },
  panmousemove: function panmousemove(e) {
    var so = this.startOffset,
        _this$props = this.props,
        zoom = _this$props.zoom,
        onpan = _this$props.onpan,
        coords = getClient(e); //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}

    this.panned = true;
    var x = (so.x - coords.x) / zoom + so.endX,
        y = (coords.y - so.y) / zoom + so.endY;
    onpan([x, y]);
  },
  setScreen: function setScreen() {
    var _this$props2 = this.props,
        zoom = _this$props2.zoom,
        screenPosition = _this$props2.screenPosition;
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
  },
  mouseDown: function mouseDown(e) {
    this.mousePosition = this.getMousePosition(e);
    var _this$props3 = this.props,
        mouseDown = _this$props3.mouseDown,
        onpan = _this$props3.onpan,
        getMousePosition = _this$props3.getMousePosition;

    if (getMousePosition) {
      getMousePosition(this.mousePosition);
    }

    if (mouseDown) {
      mouseDown(e);
    }

    if (onpan) {
      this.panmousedown(e);
    }
  },
  mouseMove: function mouseMove(e) {
    this.mousePosition = this.getMousePosition(e);

    if (this.props.getMousePosition) {
      this.props.getMousePosition(this.mousePosition);
    }
  },
  getMousePosition: function getMousePosition(e) {
    var _this$props4 = this.props,
        unit = _this$props4.unit,
        sp = _this$props4.screenPosition,
        zoom = _this$props4.zoom;
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
};
exports.default = _default;