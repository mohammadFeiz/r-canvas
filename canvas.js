import React, { Component, createRef } from "react";
import $ from "jquery";
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.PI = Math.PI / 180;
    this.dom = createRef();
    this.width = 0;
    this.height = 0;
    $(window).on("resize", this.resize.bind(this));
    this.mousePosition = [Infinity, Infinity];
  }
  getDip(p1, p2, prep) {var dip = (p1[1] - p2[1]) / (p1[0] - p2[0]);dip = prep ? -1 / dip : dip;if (dip === -Infinity) {dip = Math.abs(Infinity);}return dip;}
  getAvg(arr) {var x = 0,y = 0,length = arr.length;for (var i = 0; i < length; i++) {x += arr[i][0];y += arr[i][1];}return [x / length, y / length];}
  getAngle(a, b) {var deltaX = b[0] - a[0],deltaY = b[1] - a[1];var length = this.getLength(a, b);var angle = (Math.acos(deltaX / this.getLength(a, b)) / Math.PI) * 180;angle = Math.sign(deltaY) < 0 ? 360 - angle : angle;return parseFloat(angle.toFixed(4));}
  getLength(p1, p2) {return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2));}
  getPointOfLine(a, b, obj) {
    if (typeof a !== "object" || typeof obj !== "object") {return false;}
    var typeB = typeof b;
    var dip = typeB === "object" ? this.getDip(a, b) : b;
    var x = obj.x,y = obj.y;
    if (dip === Infinity) {return y === undefined ? false : [a[0], y];}
    if (dip === 0) {return x === undefined ? false : [x, a[1]];}
    if (x !== undefined) {return [x, dip * (x - a[0]) + a[1]];}
    if (y !== undefined) {return [(y - a[1]) / dip + a[0], y];}
    return false;
  }
  getPrependicularPointFromLine(p1, p2, p, offset) {
    if (p === "center") {p = this.getAvg(p1, p2);} 
    else if (p === "start") {p = p1;} 
    else if (p === "end") {p = p2;}
    if (!offset) {return p;}
    var angle = this.getAngle(p1, p2);
    var deltaX = offset * Math.cos(((angle - 90) * Math.PI) / 180);
    var deltaY = offset * Math.sin(((angle - 90) * Math.PI) / 180);
    return { x: p[0] + deltaX, y: p[1] + deltaY, deltaX, deltaY };
  }
  getArcBy3Points(p1, p2, p3) {
    var meet = this.getMeet(
      this.getAvg([p1, p2]),
      this.getDip(p1, p2, true),
      this.getAvg([p2, p3]),
      this.getDip(p2, p3, true)
    );
    if (!meet) {return false;}
    var x = meet[0],y = meet[1];
    var a1 = this.getAngle(meet, p1),a2 = this.getAngle(meet, p2),a3 = this.getAngle(meet, p3);
    var slice;
    if (a1 < a2 && a2 < a3) {slice = [a1, a3];} else if (a2 < a3 && a3 < a1) {slice = [a1, a3];} else if (a3 < a1 && a1 < a2) {slice = [a1, a3];}else if (a3 < a2 && a2 < a1) {slice = [a3, a1];} else if (a1 < a3 && a3 < a2) {slice = [a3, a1];} else if (a2 < a1 && a1 < a3) {slice = [a3, a1];
    } else {slice = [0, 0];}
    return { x, y, r: this.getLength(p1, [x, y]), slice };
  }
  getMeet(a1, a2, b1, b2) {
    if (!Array.isArray(a1) || !Array.isArray(b1)) {return false;}
    var dip1 = Array.isArray(a2) ? this.getDip(a1, a2) : a2;
    var dip2 = Array.isArray(b2) ? this.getDip(b1, b2) : b2;
    if (dip1 === dip2) {return false;}
    if (dip1 === Infinity) {return this.getPointOfLine(b1, dip2, { x: a1[0] });}
    if (dip2 === Infinity) {return this.getPointOfLine(a1, dip1, { x: b1[0] });}
    var x = (dip1 * a1[0] - dip2 * b1[0] + b1[1] - a1[1]) / (dip1 - dip2);
    var y = dip1 * (x - a1[0]) + a1[1];
    return [x, y];
  }
  eventHandler(selector, event, action, type = "bind") {
    var me = {mousedown: "touchstart",mousemove: "touchmove",mouseup: "touchend"};
    event = "ontouchstart" in document.documentElement ? me[event] : event;
    var element = typeof selector === "string" ? (selector === "window"? $(window): $(selector)): selector;
    element.unbind(event, action);
    if (type === "bind") {element.bind(event, action);}
  }
  getClient(e) {
    return "ontouchstart" in document.documentElement
      ? { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
      : { x: e.clientX, y: e.clientY };
  }
  getValueByRange(value, start, end) {
    var type = typeof value;
    if (type === undefined) {return start;}
    if (type === "number") {return value;}
    if (type === "function") {return value(start, end);}
    return this.getValueByPercent(parseFloat(value), start, end);
  }
  getValueByPercent(percent, start, end) {return start + (percent * (end - start)) / 100;}
  validateItem(item) {
    if (typeof item.showPivot !== "boolean") {
      console.error("r-canvas => item.showPivot must be boolean!!!");
    }
    if (["bevel", "round", "miter"].indexOf(item.lineJoin) === -1) {
      console.error(
        "r-canvas => item.lineJoin must be bevel,round or miter!!!"
      );
    }
    if (["butt", "round", "square"].indexOf(item.lineCap) === -1) {
      console.error("r-canvas => item.lineCap must be butt,round or square!!!");
    }
    if (["number", "string"].indexOf(typeof item.rotate) === -1) {
      console.error(
        'r-canvas =>item.rotate must be number or string contain number and "%"(example:120 or "50%")!!!'
      );
    }
    if (typeof item.rotate === "string" && item.rotate.indexOf("%") === -1) {
      console.error('r-canvas =>missing "%" in item.rotate string!!!');
    }
    if (isNaN(item.angle)) {
      console.error("r-canvas => item.angle must be number!!!");
    }
    if (["number", "string"].indexOf(typeof item.x) === -1) {
      console.error(
        'r-canvas =>item.x must be number or string contain number and "%"(example:120 or "50%")!!!'
      );
    }
    if (typeof item.x === "string" && item.x.indexOf("%") === -1) {
      console.error('r-canvas =>missing "%" in item.x string!!!');
    }
    if (isNaN(item.x)) {
      console.error("r-canvas => item.x must be number!!!");
    }
    if (["number", "string"].indexOf(typeof item.y) === -1) {
      console.error(
        'r-canvas =>item.y must be number or string contain number and "%"(example:120 or "50%")!!!'
      );
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
      console.error(
        "r-canvas => item.opacity must be a number between 0 and 1!!!"
      );
    }
    if (item.arcPoints) {
      if (!Array.isArray(item.arcPoints) || item.arcPoints.length !== 3) {
        console.error(
          "r-canvas => item.arcPoints must be an array with 3 member!!!"
        );
      }
    }
    if (item.pivot) {
      if (!Array.isArray(item.pivot) || item.pivot.length !== 2) {
        console.error(
          "r-canvas => item.pivot must be an array with 2 numeric member!!!"
        );
      }
    }
    if (item.dash) {
      if (!Array.isArray(item.dash) || item.dash.length !== 2) {
        console.error(
          "r-canvas => item.dash must be an array with 2 numeric member!!!"
        );
      }
    }
    if (item.slice) {
      if (!Array.isArray(item.slice) || item.slice.length !== 2) {
        console.error(
          "r-canvas => item.slice must be an array with 2 numeric member!!!"
        );
      }
    }
    if (item.trianglePoints !== undefined) {
      if (
        !Array.isArray(item.trianglePoints) ||
        item.trianglePoints.length !== 2
      ) {
        console.error(
          "r-canvas => item.trianglePoint must be an array with 2 member!!!"
        );
      }
      if (
        !Array.isArray(item.trianglePoints[0]) ||
        item.trianglePoints[0].length !== 2
      ) {
        console.error(
          "r-canvas => item.trianglePoint[0] must be an array with 2 numeric member!!!"
        );
      }
      if (
        !Array.isArray(item.trianglePoints[1]) ||
        item.trianglePoints[1].length !== 2
      ) {
        console.error(
          "r-canvas => item.trianglePoint[1] must be an array with 2 numeric member!!!"
        );
      }
      if (
        !Array.isArray(item.trianglePoints[0]) ||
        item.trianglePoints[0].length !== 2
      ) {
        console.error(
          "r-canvas => item.trianglePoint[0] must be an array with 2 numeric member!!!"
        );
      }
      if (isNaN(item.trianglewidth) || item.triangleWidth < 0) {
        console.error(
          "r-canvas => item.triangleWidth must be a number greater than or equal 0"
        );
      }
    }
  }
  resize() {
    this.timer = 0;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.timer++;
      if (this.timer >= 20) {
        this.update();
        clearInterval(this.interval);
      }
    }, 10);
  }
  getRandomColor(color, range = 60) {
    function getRGB() {
      return [
        range + Math.round(Math.random() * (255 - range)),
        range + Math.round(Math.random() * (255 - range)),
        range + Math.round(Math.random() * (255 - range))
      ];
    }
    var color = getRGB();
    color[Math.round(Math.random() * 3)] = 0;
    return {
      color: `rgb(${color[0]},${color[1]},${color[2]})`,
      r: color[0],
      g: color[1],
      b: color[2]
    };
  }
  getCoordsByPivot(item) {
    var { pivot, x, y } = item;
    if (!pivot) {
      return [x, y];
    }
    var [px = 0, py = 0] = typeof pivot === "function" ? pivot(item) : pivot;
    return [
      x - this.getValueByRange(px, 0, this.width),
      y - this.getValueByRange(py, 0, this.height)
    ];
  }
  getItem(item, parent = {}) {
    var {
      x: parentx = 0,
      y: parenty = 0,
      rotate: parentrotate = 0,
      opacity: parentOpacity = 1
    } = parent;
    var { debugMode } = this.props;
    item = typeof item === "function" ? { ...item(this.props) } : item;
    //set default props
    item = {...{showPivot: false,lineJoin: "miter",lineCap: "butt",rotate: 0,angle: 0,x: 0,y: 0,lineWidth: 1,opacity: 1},...item};
    item.rect = false;
    if (!item.stroke && !item.fill) {item.stroke = "#000";}
    //validate item
    if (debugMode) {this.validateItem(item);}
    //set related props
    item.rotate = this.getValueByRange(item.rotate, 0, 360);
    item.x = this.getValueByRange(item.x, 0, this.width) + parentx;
    item.y = this.getValueByRange(item.y, 0, this.height) + parenty;
    item.opacity *= parentOpacity;
    item.pivotedCoords = this.getCoordsByPivot(item);
    //converts
    if (item.image) {
    } else if (item.width !== undefined || item.height !== undefined) {
      let { width = 20, height = 20, corner = [] } = item;
      width = this.getValueByRange(width, 0, this.width);
      height = this.getValueByRange(height, 0, this.height);
      let [c0 = 0, c1 = 0, c2 = 0, c3 = 0] = corner;
      item.rect = true;
      var [x, y] = item.pivotedCoords;
      item.points = [[x + width / 2, y],[x + width, y, c1],[x + width, y + height, c2],[x, y + height, c3],[x, y, c0],[x + width / 2, y, c1]];
    } else if (item.arcPoints) {
      let { arcPoints, pivot = [] } = item;
      var arc = this.getArcBy3Points(...arcPoints);
      item.r = arc.r;
      item.slice = arc.slice;
      item.pivot = [-arc.x + (pivot[0] || 0), -arc.y + (pivot[1] || 0)];
    } else if (item.trianglePoints) {
      let { corner = [] } = item;
      var [p1, p2] = trianglePoints;
      var width = triangleWidth;
      var t1 = this.getPrependicularPointFromLine(p1, p2, "start", width / 2);
      var t2 = this.getPrependicularPointFromLine(p1, p2, "start", -width / 2);
      item.points = [[p1[0], p1[1], corner[0]],[t1.x, t1.y, corner[1]],[p2[0], p2[1], corner[2]],[t2.x, t2.y],p1];
    }
    //set type
    if (item.items) {item.type = "Group";} 
    else if (item.points) {item.type = "Line";} 
    else if (item.r) {item.type = "Arc";} 
    else if (item.image) {item.type = "Image";} 
    else if (item.text !== undefined) {item.type = "Text";}
    return item;
  }
  draw(items = this.props.items, parent = {}, index = []) {
    var Items = typeof items === "function" ? items() : items;
    var { zoom } = this.props,ctx = this.ctx;
    for (var i = 0; i < Items.length; i++) {
      let item = this.getItem(Items[i], parent);
      if (item.show === false) {continue;}
      ctx.save();
      ctx.beginPath();
      this.rotate(item.rotate, [item.x, item.y]);
      ctx.globalAlpha = item.opacity;
      ctx.lineCap = item.lineCap;
      ctx.lineJoin = item.lineJoin;
      this.shadow(item, ctx);
      item.dash && ctx.setLineDash(item.dash);
      ctx.lineWidth = item.lineWidth * zoom;
      ctx.strokeStyle =
        item.stroke === "random"
          ? this.getRandomColor().color
          : this.getColor(item.stroke, item.pivotedCoords);
      ctx.fillStyle =
        item.fill === "random"
          ? this.getRandomColor().color
          : this.getColor(item.fill, item.pivotedCoords);
      var Index = index.concat(i);
      if (item.type) {
        this["draw" + item.type](item, Index);
      } else {
        var str = "items[" + Index.join("].items[") + "]";
        console.error("r-canvas => receive invalid item in " + str);
      }

      if (item.showPivot) {
        this.showPivot(item.x, item.y);
      }
      if (this.eventMode && item[this.eventMode]) {
        let X = this.mousePosition[0] + this.axisPosition[0];
        let Y = this.mousePosition[1] + this.axisPosition[1];
        if (item.fill && ctx.isPointInPath(X, Y)) {this.item = item} 
        else if (item.stroke && ctx.isPointInStroke(X, Y)) {this.item = item}
      }
      ctx.closePath();
      ctx.restore();
    }
  }
  drawGroup(item, index) {
    var [X, Y] = item.pivotedCoords;
    this.draw(item.items,{ x: X, y: Y, rotate: item.rotate, opacity: item.opacity },index);
  }
  drawText({align = [0, 0],fontSize = 12,text = "Text",fill,stroke,pivotedCoords}) {
    var { zoom } = this.props,[X, Y] = pivotedCoords,[textAlign, textBaseline] = this.getTextAlign(align);
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;
    this.ctx.font = fontSize * zoom + "px arial";
    stroke && this.ctx.strokeText(text, X * zoom, Y * zoom);
    fill && this.ctx.fillText(text, X * zoom, Y * zoom);
  }
  drawImage({ pivotedCoords, width, height, image }) {
    var { zoom } = this.props;
    var [X, Y] = pivotedCoords;
    var fr = new FileReader();
    var img;
    fr.onload = () => {
      img = new Image();
      img.onload = () => this.ctx.drawImage(img,X * zoom,Y * zoom,width * zoom,height * zoom);
      img.src = fr.result;
    };
    fr.readAsDataURL(image);
  }
  drawLine({ points, close, stroke, fill, pivotedCoords, rect }) {
    if (points.length < 1) {return false;}
    var Coords = rect ? [0, 0] : pivotedCoords;
    var [X, Y] = Coords;
    var { zoom } = this.props;
    var start = [
      this.getValueByRange(points[0][0], 0, this.width) + X,
      this.getValueByRange(points[0][1], 0, this.height) + Y
    ];
    this.ctx.moveTo(start[0] * zoom, start[1] * zoom);
    var beforePoint = points[0];
    for (var i = 1; i < points.length; i++) {
      let [x, y, r] = points[i];
      beforePoint = [x, y];
      let point = [
        this.getValueByRange(x, 0, this.width) + X,
        this.getValueByRange(y, 0, this.height) + Y
      ];
      if (r) {
        let [x, y] = points[i + 1] ? points[i + 1] : points[0];
        let nextPoint = [
          this.getValueByRange(x, 0, this.width) + X,
          this.getValueByRange(y, 0, this.height) + Y
        ];
        this.ctx.arcTo(point[0] * zoom,point[1] * zoom,nextPoint[0] * zoom,nextPoint[1] * zoom,r * zoom);
      } 
      else {this.ctx.lineTo(point[0] * zoom, point[1] * zoom);}
    }
    if (points.length > 2 && close) {
      this.ctx.lineTo(start[0] * zoom, start[1] * zoom);
    }
    stroke && this.ctx.stroke();
    fill && this.ctx.fill();
  }
  drawArc({ pivotedCoords, r, slice = [0, 360], fill, stroke }) {
    var [X, Y] = pivotedCoords;
    var { direction = "clock" } = this.props.rotateSetting;
    r = this.getValueByRange(r, this.width, this.height);
    r = r < 0 ? 0 : r;
    slice = [
      this.getValueByRange(slice[0], 0, 360),
      this.getValueByRange(slice[1], 0, 360)
    ];
    if (direction === "clockwise") {
      let a = slice[0],b = slice[1];
      slice = [-b, -a];
    }
    var { zoom } = this.props;
    this.ctx.arc(X * zoom,Y * zoom,r * zoom,slice[0] * this.PI,slice[1] * this.PI);
    stroke && this.ctx.stroke();
    fill && this.ctx.fill();
  }
  showPivot(x, y) {
    var ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, (360 * Math.PI) / 180);
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + 15, y);
    ctx.moveTo(x, y - 15);
    ctx.lineTo(x, y + 15);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,100,0,.3)";
    ctx.stroke();
    ctx.closePath();
  }
  rotate(angle = 0, [X, Y]) {
    if (angle === 0) {
      return;
    }
    var { zoom, rotateSetting } = this.props;
    var { direction = "clock" } = rotateSetting;
    angle = angle * this.PI * (direction === "clockwise" ? -1 : 1);
    var s = Math.sin(angle),
      c = Math.cos(angle);
    this.ctx.rotate(angle);
    var x = X * c - -Y * s - X;
    var y = -Y - (X * s + -Y * c);
    this.ctx.translate(x * zoom, y * zoom);
  }
  update() {
    var { getSize, grid, zoom } = this.props;
    var dom = $(this.dom.current);
    this.width = dom.width();
    this.height = dom.height();
    if (dom[0] === undefined || dom[0] === null) {return;}
    dom[0].width = this.width;
    dom[0].height = this.height;
    var [x = "50%", y = "50%"] = this.props.axisPosition;
    this.axisPosition = [
      this.getValueByRange(x, 0, this.width),
      this.getValueByRange(y, 0, this.height)
    ];
    if (getSize) {getSize(this.width, this.height);}
    if (grid) {dom.css(this.getBackground(grid, zoom, this.width, this.height));}
    this.clear();
    this.setScreen();
    if (grid) {this.drawAxes()}
    this.draw();
  }
  clear() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  drawAxes() {
    var dash = [3, 3],stroke = "#000";
    this.draw([{ points: [[0, -4002], [0, 4000]], stroke, dash },{ points: [[-4002, 0], [4000, 0]], stroke, dash }]);
  }
  componentDidMount() {
    this.ctx = this.ctx || this.dom.current.getContext("2d");
    this.update();
  }
  componentDidUpdate() {this.update()}
  getColor(color, { x = 0, y = 0 }) {
    if (!color) {return;}
    if (typeof color === "string") {return color;}
    var length = color.length;
    if (length === 5) {var g = this.ctx.createLinearGradient(color[0] + x,color[1] + y,color[2] + x,color[3] + y);} 
    else if (length === 7) {var g = this.ctx.createRadialGradient(color[0] + x,color[1] + y,color[2],color[3] + x,color[4] + y,color[5])}
    var stops = color[color.length - 1];
    for (var i = 0; i < stops.length; i++) {
      var s = stops[i].split(" ");
      g.addColorStop(s[0], s[1]);
    }
    return g;
  }
  shadow({ shadow }) {
    if (!shadow) {return}
    var ctx = this.ctx;
    ctx.shadowOffsetX = shadow[0]; ctx.shadowOffsetY = shadow[1]; ctx.shadowBlur = shadow[2]; ctx.shadowColor = shadow[3];
  }
  getSides(list) {
    var first = list[0],minx = first.x,miny = first.y,maxx = first.x,maxy = first.y;
    for (var i = 1; i < list.length; i++) {
      var { x, y } = list[i];
      if (x < minx) {minx = x} else if (x > maxx) {maxx = x}
      if (y < miny) {miny = y} else if (y > maxy) {maxy = y}
    }
    return {left: minx,right: maxx,up: miny,down: maxy,center: { x: (minx + maxx) / 2, y: (miny + maxy) / 2 }};
  }
  getTextAlign([x = 0, y = 0]) {return [["right", "center", "left"][x + 1],["top", "middle", "bottom"][y + 1]]}
  getBackground() {
    var { grid, zoom } = this.props;
    var [x, y, color = "rgba(70,70,70,0.3)"] = grid;
    var a = 100 * zoom;
    var b = x ? this.getValueByRange(x, 0, this.width) * zoom + "px" : "100%";
    var c = y ? this.getValueByRange(y, 0, this.height) * zoom + "px" : "100%";
    var h1 = `linear-gradient(${color} 0px,transparent 0px)`;
    var v1 = `linear-gradient(90deg,${color} 0px, transparent 0px)`;
    var h2 = `linear-gradient(${color} 1px, transparent 1px)`;
    var v2 = `linear-gradient(90deg,${color} 1px, transparent 1px)`;
    return {
      backgroundImage: `${h1},${v1},${h2},${v2}`,
      backgroundSize: `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`
    };
  }
  panmousedown(e) {
    this.eventHandler("window", "mousemove", $.proxy(this.panmousemove, this));
    this.eventHandler("window", "mouseup", $.proxy(this.panmouseup, this));
    this.panned = false;
    var { screenPosition } = this.props;
    var client = this.getClient(e);
    this.startOffset = {x: client.x,y: client.y,endX: screenPosition[0],endY: screenPosition[1]};
  }
  panmouseup() {
    this.eventHandler("window", "mousemove", this.panmousemove, "unbind");
    this.eventHandler("window", "mouseup", this.panmouseup, "unbind");
  }
  panmousemove(e) {
    var so = this.startOffset,{ zoom, onPan } = this.props,coords = this.getClient(e);
    //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}
    this.panned = true;
    var x = (so.x - coords.x) / zoom + so.endX,y = (coords.y - so.y) / zoom + so.endY;
    onPan([x, y]);
  }
  setScreen() {
    var { zoom, screenPosition } = this.props;
    var canvas = this.dom.current;
    this.translate = {
      x: this.axisPosition[0] - screenPosition[0] * zoom,
      y: this.axisPosition[1] - screenPosition[1] * zoom * -1
    };
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({backgroundPosition: this.translate.x + "px " + this.translate.y + "px"});
  }
  onMouseDown(e) {
    const { events, onPan } = this.props;
    this.mousePosition = this.getMousePosition(e);
    this.eventMode = "onMouseDown";
    this.update();
    if (onPan) {this.panmousedown(e)} 
    else if (this.item) {this.item.onMouseDown(e, this.mousePosition,this.item, this.props)} 
    else if (events.onMouseDown) {events.onMouseDown(e, this.mousePosition)}
    this.item = false; this.eventMode = false;
  }
  onMouseUp(e) {
    const { events } = this.props;
    this.mousePosition = this.getMousePosition(e);
    this.eventMode = "onMouseUp";
    this.update();
    if (this.item) {this.item.onMouseUp(e, this.mousePosition,this.item, this.props)} 
    else if (events.onMouseUp) {events.onMouseUp(e, this.mousePosition)}
    this.item = false; this.eventMode = false;
  }
  onClick(e) {
    const { events } = this.props;
    this.mousePosition = this.getMousePosition(e);
    this.eventMode = "onClick";
    this.update();
    if (this.item) {this.item.onClick(e, this.mousePosition,this.item, this.props)} 
    else if (events.onClick) {events.onClick(e, this.mousePosition)}
    this.item = false; this.eventMode = false;
  }
  onMouseMove(e) {
    var { events } = this.props;
    this.mousePosition = this.getMousePosition(e);
    if(events.onMouseMove){events.onMouseMove(e, this.mousePosition)}
  }
  getMousePosition(e) {
    var { screenPosition: sp, zoom } = this.props;
    var client = this.getClient(e);
    var offset = $(this.dom.current).offset();
    client = {x: client.x - offset.left + window.pageXOffset,y: client.y - offset.top + window.pageYOffset};
    var x = Math.floor((client.x - this.axisPosition[0] + sp[0] * zoom) / zoom);
    var y = Math.floor((client.y - this.axisPosition[1] + sp[1] * zoom * -1) / zoom);
    return [x, y, (x * 100) / this.width, (y * 100) / this.height];
  }
  render() {
    var { id, style, className ,events } = this.props;
    var props = {ref:this.dom,className,id,style};
    for(let prop in events){props[prop] = events[prop];}
    if("ontouchstart" in document.documentElement){
      props.onTouchStart = this.onMouseDown.bind(this);
      props.onTouchMove= this.onMouseMove.bind(this);
      props.onTouchEnd= this.onMouseUp.bind(this);
    }
    else{
      props.onMouseDown = this.onMouseDown.bind(this);
      props.onMouseMove= this.onMouseMove.bind(this);
      props.onMouseUp= this.onMouseUp.bind(this);
    }
    return <canvas {...props}/> ;
  }
}
Canvas.defaultProps = {
  zoom: 1,axisPosition: ["50%", "50%"],selectable: false,screenPosition: [0, 0],items: [],events:{},rotateSetting: { direction: "clock" }
};