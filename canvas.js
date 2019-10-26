import React, { Component,createRef } from 'react';
import $ from 'jquery';
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.PI = Math.PI / 180;
    this.dom = createRef(); this.width = 0; this.height = 0;
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
  }
  getStyle(style = {}){return style;}
  getCoords(value,size){
    if(typeof value === 'number'){return value}
    if(value.indexOf('%') === -1){return parseFloat(value)}
    return parseFloat(value) * size / 100; 
  }
  draw(items = this.props.items){
    for(var i = 0; i < items.length; i++){
      var item = items[i];
      if(item.show === false){continue;}
      if(item.type === 'group'){this.draw(item.items);}
      else {this['draw'+item.type](item);}
    }
  }
  drawline(line) {
    var ctx = this.ctx,{zoom} = this.props,p;
    var {lineWidth = 1,fill,stroke,lineJoin = 'miter',lineCap = 'butt',dash,points,close,rotate,pivot} = line;
    var length = line.points.length;
    if(length < 2){return false;}
    var start = line.points[0];
    ctx.save();
    ctx.beginPath();
    if(rotate !== undefined && pivot){this.rotate(rotate,pivot || this.getSides(points).center);}
    dash && ctx.setLineDash(dash);
    ctx.lineJoin = lineJoin;
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth * zoom;
    ctx.moveTo(this.getCoords(start.x,this.width) * zoom, this.getCoords(start.y,this.height) * zoom); 
    for(var i = 1; i < length; i++){
        var p = points[i];
        ctx.lineTo(this.getCoords(p.x,this.width) * zoom, this.getCoords(p.y,this.height) * zoom);
    }
    if(length > 2 && close){
      ctx.lineTo(start.x * zoom, start.y * zoom);
    }
    this.ink(fill,stroke);
    ctx.closePath();
    ctx.restore();
  }
  drawarc(arc) {
    var {
      x = 0,y = 0,r = 20,slice=[0,360],
      lineWidth = 1,lineCap,lineJoin = 'butt',dash,
      fill,stroke,shadow,
      rotate,pivot,angle
    } = arc;
    var {rotateSetting,zoom} = this.props;
    var {direction='clock',offset = 0} = rotateSetting;
    var ctx = this.ctx;
    x = this.getCoords(x,this.width);
    y = this.getCoords(y,this.height);
    var p = this.getCoordsByPivot({x,y,r,pivot,type:'arc',lineWidth});
    ctx.save();
    ctx.beginPath();
    this.rotate(rotate,{x,y});
    angle && this.rotate(angle,{x:p.x,y:p.y});
    var startAngle,endAngle;
    if(direction === 'clock'){startAngle = slice[0] * this.PI; endAngle = slice[1] * this.PI;}
    else{startAngle = -slice[1] * this.PI; endAngle = -slice[0] * this.PI;}
    ctx.arc(p.x * zoom, p.y * zoom, r * zoom, startAngle, endAngle);
    this.shadow(shadow);
    dash && ctx.setLineDash(dash);
    ctx.lineCap = lineCap;
    ctx.lineJoin = lineJoin;
    ctx.lineWidth = lineWidth;
    this.ink(fill,stroke);
    ctx.closePath();
    ctx.restore();
  }
  drawrectangle(rect) { 
    var {
      x = 0,y = 0,width = 20,height = 20,
      lineWidth = 1,dash,
      fill,stroke,shadow,
      rotate,pivot,angle,
    } = rect; 
    var {zoom} = this.props,ctx = this.ctx;
    x = this.getCoords(x,this.width);
    y = this.getCoords(y,this.height);
    width = this.getCoords(width,this.width);
    height = this.getCoords(height,this.height);
    var p = this.getCoordsByPivot({x,y,width,height,pivot,type:'rectangle'});
    ctx.save();
    ctx.beginPath();
    this.rotate(rotate,{x,y});
    angle && this.rotate(angle,{x:p.x + width / 2,y:p.y + height / 2});
    ctx.rect(p.x * zoom, p.y * zoom, width * zoom, height * zoom);
    this.shadow(shadow);
    dash && ctx.setLineDash(dash);
    ctx.lineWidth = lineWidth;
    this.ink(fill,stroke);
    ctx.closePath();
    ctx.restore();
  }
  getCoordsByPivot({x,y,width,height,r,pivot,type,lineWidth}){
    if(!pivot){return {x,y};}
    var {x:px = 0,y:py = 0} = pivot;
    if(type === 'rectangle'){
      px = this.getCoords(px,width);
      py = this.getCoords(py,height);
      return {x:x - px,y:y - py}
    }
    if(type === 'arc'){
      px = this.getCoords(px,r * 2);
      py = this.getCoords(py,r * 2);
      return {x:x - px,y:y - py}
    }
  }
  drawtext(obj) {//x,y,text,angle,textBaseLine,color,textAlign
    var {zoom} = this.props;
    var ctx = this.ctx;
    var {textBaseLine = 'bottom',textAlign='center',fontSize=12,color='#000',text,rotate,unit,pivot,lineWidth = 1,x,y,angle} = obj;
    x = this.getCoords(x,this.width);
    y = this.getCoords(y,this.height);
    var p = this.getCoordsByPivot({x,y,pivot,type:'rectangle',lineWidth});
    ctx.save();
    ctx.beginPath();
    this.rotate(rotate,{x,y});
    angle && this.rotate(angle,p);
    ctx.textBaseline = textBaseLine;
    ctx.font = (fontSize * zoom) + "px arial";
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.fillText(text, p.x * zoom, p.y * zoom);
    ctx.closePath();
    ctx.restore();
  }
  ink(fill,stroke){
    if(!fill && !stroke){stroke = '#000';}
    if (fill) {this.ctx.fillStyle = this.getColor(fill); this.ctx.fill();}
    if(stroke){this.ctx.strokeStyle = this.getColor(stroke); this.ctx.stroke();}
  }
  shadow(Shadow){
    var {shadow} = this.props;
    if(Shadow){
      var [shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor] = Shadow;
      this.ctx.shadowOffsetX = Shadow[0];
      this.ctx.shadowOffsetY = Shadow[1];
      this.ctx.shadowBlur = Shadow[2];
      this.ctx.shadowColor = Shadow[3];  
    }
    else if(shadow){
      var [shadowOffsetX,shadowOffsetY,shadowBlur,shadowColor] = shadow;
      this.ctx.shadowOffsetX = shadow[0];
      this.ctx.shadowOffsetY = shadow[1];
      this.ctx.shadowBlur = shadow[2];
      this.ctx.shadowColor = shadow[3];
    }
  }
  getColor(color){
    if(typeof color === 'string'){return color;}
    return this.gradient(color);
  }
  gradient(grd){
    var [sx,sy,ex,ey,stops] = grd;
    var g = this.ctx.createLinearGradient(sx, sy, ex, ey); 
    for(var i = 0; i < stops.length; i++){
      var s = stops[i];
      g.addColorStop(s[0],s[1]);
    }
    return g;
  }
  rotate(angle = 0,center){
    var {zoom,rotateSetting} = this.props;
    var {direction = 'clock',offset = 0} = rotateSetting;
    if(offset === 0 && angle === 0){return;}
    angle+=offset;
    angle = angle * this.PI * (direction === 'clockwise'?-1:1);
    var s = Math.sin(angle),c = Math.cos(angle);
    var p = {x:center.x,y:-center.y};
    this.ctx.rotate(angle);
    var x = (p.x * c - p.y * s) - p.x;
    var y = p.y - (p.x * s + p.y * c);
    this.ctx.translate(x * zoom,y * zoom);
  }
  
  getAxisPosition({x = '50%',y = '50%'}){
    var X,Y;
    if(x.indexOf('%') !== -1){X = this.width * parseFloat(x) / 100;}
    else if(x.indexOf('px') !== -1){X = parseFloat(x);}
    else{console.error('canvas axisPosition.x error. correct example: ("10px" or "10%")')}
    if(y.indexOf('%') !== -1){Y = this.height * parseFloat(y) / 100;}
    else if(y.indexOf('px') !== -1){Y = parseFloat(y);}
    else{console.error('canvas axisPosition.y error. correct example: ("10px" or "10%")')}
    return {x:X,y:Y};
  }
  setScreen(){
    var {zoom,screenPosition,axisPosition} = this.props;
    var canvas = this.dom.current;
    this.axisPosition = this.getAxisPosition(axisPosition);
    this.translate = { 
      x: (this.axisPosition.x) - (screenPosition[0] * zoom), 
      y: (this.axisPosition.y) - (screenPosition[1] * zoom * -1) 
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({
      backgroundPosition: this.translate.x + "px " + this.translate.y + "px",  
    });
  }
  componentWillReceiveProps(){this.update();}
  getBackground(){
    var {grid,zoom} = this.props;
    var {width,height} = this; 
    var {x,y,color='#000'} = grid;
    x = this.getCoords(x,width);
    y = this.getCoords(y,height);
    var a = 100 * zoom;
    var b = (x * zoom) + 'px';
    var c = (y * zoom) + 'px';
    return {
      backgroundImage:`linear-gradient(rgba(${color},0.5) 0px,transparent 0px),linear-gradient(90deg, rgba(${color},0.5) 0px, transparent 0px),linear-gradient(rgba(${color},0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(${color},0.3) 1px, transparent 1px)`,
      backgroundSize : `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`
    }
  }
  update(){
    var {getSize,grid} = this.props;
    var dom = this.dom.current;
    this.width = $(dom).width();
    this.height = $(dom).height();
    if(getSize){getSize(this.width,this.height);}
    dom.width = this.width;
    dom.height = this.height;
    if(grid){$(dom).css(this.getBackground());}
    this.clear();
    this.setScreen();
    if(grid){this.drawAxes();}
    this.draw();
  }
  clear() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  drawAxes(){
    this.drawline({points:[{ x: 0, y: -4002 },{ x: 0, y: 4000 }],dash:[3,3] });
    this.drawline({points:[{ x: -4002, y: 0 },{ x: 4000, y: 0 }],dash:[3,3] });
  }
  componentDidMount(){
    this.ctx = this.ctx || this.dom.current.getContext("2d");
    this.update();        
  }
  componentDidUpdate(){
    this.update();
  }
  mouseDown(e){
    this.mousePosition = this.getMousePosition(e);
    var {mouseDown,onpan,getMousePosition} = this.props;
    if(getMousePosition){getMousePosition(this.mousePosition);}
    if(mouseDown){mouseDown(e);} 
    if(onpan){this.panmousedown(e);}
  }
  mouseMove(e){
    this.mousePosition = this.getMousePosition(e);
    if(this.props.getMousePosition){this.props.getMousePosition(this.mousePosition);}
  }
  getClient(e) {
    return { 
      x: e.clientX === undefined?e.changedTouches[0].clientX:e.clientX, 
      y: e.clientY===undefined?e.changedTouches[0].clientY:e.clientY 
    };
  }
  getMousePosition(e) { 
    var {unit,screenPosition:sp,zoom} = this.props;
    var client = this.getClient(e);
    var offset = $(this.dom.current).offset();
    client = {x:client.x - offset.left + window.pageXOffset,y:client.y - offset.top + window.pageYOffset}
    var coords = { 
      x: Math.floor((client.x - (this.axisPosition.x) + (sp[0] * zoom)) / zoom), 
      y: Math.floor((client.y - (this.axisPosition.y) + (sp[1] * zoom * -1)) / zoom) 
    };
    if(unit === '%'){
      return {
        x:coords.x * 100 / this.width,
        y:coords.y * 100 / this.height,
      }
    }
    else {
      return coords;
    }
  }
  panmousedown(e){
    this.eventHandler("window", "mousemove", $.proxy(this.panmousemove,this));
    this.eventHandler("window", "mouseup", $.proxy(this.panmouseup,this));
    this.panned = false;
    var {screenPosition} = this.props;
    var client = this.getClient(e);
    this.startOffset = { 
        x: client.x, y: client.y, 
        endX: screenPosition[0], endY: screenPosition[1] 
    };
  }
  panmouseup() {
    this.eventRemover("window", "mousemove", this.panmousemove);
    this.eventRemover("window", "mouseup", this.panmouseup);
  }
  panmousemove(e) {
      var so = this.startOffset, {zoom,onpan} = this.props, coords = this.getClient(e);
      //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}
      this.panned = true;
      var x = (so.x - coords.x) / zoom + so.endX,y = (coords.y - so.y) / zoom + so.endY;
      onpan([x,y]);
  }
  getEvent(event){var isMobile = 'ontouchstart' in document.documentElement?true:false;var mobileEvents = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" };return isMobile ? mobileEvents[event] : event;}
  eventHandler(selector, event, action) {
      var element = typeof selector === "string" ? (selector === "window" ? $(window) : $(selector)) : selector;
      event = this.getEvent(event);
      element.unbind(event, action).bind(event, action);
  }
  eventRemover(selector, event, action) {
    var element = typeof selector === "string" ? (selector === "window" ? $(window) : $(selector)) : selector;
    event = this.getEvent(event);
    element.unbind(event, action);
  }
  getSides(list){
    var first = list[0],minx = first.x,miny = first.y,maxx = first.x,maxy = first.y;
    for(var i = 1; i < list.length; i++){
      var {x,y} = list[i];
      if(x < minx){minx = x;}else if(x > maxx){maxx = x;}
      if(y < miny){miny = y;}else if(y > maxy){maxy = y;}
    }
    return {left:minx,right:maxx,up:miny,down:maxy,center:{x:(minx + maxx)/2,y:(miny + maxy)/2}};
  }
  render() {
    var {id,style} = this.props;
    return (
      <canvas 
        ref={this.dom} 
        id={id} 
        style={this.getStyle(style)} 
        onMouseDown={this.mouseDown.bind(this)}
        onMouseMove={this.mouseMove.bind(this)}
      ></canvas>
    );
  }
}
Canvas.defaultProps = {
  zoom:1,unit:'px',axisPosition:{x:'50%',y:'50%'},
  screenPosition:[0,0],items:[],rotateSetting:{direction:'clock',offset:0}
}

