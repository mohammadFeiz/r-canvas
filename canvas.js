import React, { Component,createRef } from 'react';
import $ from 'jquery';
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    this.dom = createRef(); this.width = 0; this.height = 0;
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
  }
  getStyle(style = {}){return style;}
  getByUnit(point,axis){return this.props.unit === '%'?{x:point.x * this.width /100,y:point.y * this.height / 100}:point;}
  drawpolyline({splines}) {
    var ctx = this.ctx,{zoom} = this.props,p;
    for(var j = 0; j < splines.length; j++){
      var spline = splines[j];
      var length = spline.points.length;
      if(length < 2){return false;}
      var start = spline.points[0];
      var {lineWidth = 1 / zoom,color = '#000',lineJoin = 'miter',lineCap = 'butt'} = spline;
      ctx.save();
      ctx.beginPath();
      if(spline.lineDash){ctx.setLineDash(spline.lineDash);}
      ctx.strokeStyle = color;
      ctx.lineJoin = lineJoin;
      ctx.lineCap = lineCap;
      ctx.lineWidth = lineWidth * zoom;
      p = this.getByUnit(start);
      ctx.moveTo(p.x * zoom, p.y * zoom); 
      for(var i = 1; i < length; i++){
          var point = spline.points[i];
          p = this.getByUnit(point);
          ctx.lineTo(p.x * zoom, p.y * zoom);
      }
      if(length > 2 && spline.close){
        ctx.lineTo(start.x * zoom, start.y * zoom);
      }
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  }
  drawarc({lineWidth = 1,start = 0,end = 360,x,y,radius = 2,fill,stroke}) {
    var {zoom} = this.props;
    var ctx = this.ctx;
    var p = this.getByUnit({x,y});
    ctx.beginPath();
    ctx.arc(p.x * zoom, p.y * zoom, radius * zoom, start * Math.PI / 180, end * Math.PI / 180);
    ctx.lineWidth = lineWidth;
    if (fill) {ctx.fillStyle = fill; ctx.fill();}
    if(stroke){ctx.strokeStyle = stroke; ctx.stroke();} 
    ctx.closePath();
  }
  drawrectangle({center,lineWidth = 1,width,height,x,y,fill,stroke}) { 
    var {zoom} = this.props;
    var ctx = this.ctx;
    var p = this.getByUnit({x,y});
    var limit = this.getByUnit({x:width,y:height});
    ctx.beginPath();
    if (center) {ctx.rect((p.x * zoom) - ((limit.x * zoom) / 2), (p.y * zoom) - ((limit.y * zoom) / 2), limit.x * zoom, limit.y * zoom);}
    else {ctx.rect(p.x * zoom, p.y * zoom, limit.x * zoom, limit.y * zoom);}
    ctx.lineWidth = lineWidth;
    if (fill) {ctx.fillStyle = fill; ctx.fill();}
    if(stroke) {ctx.strokeStyle = stroke; ctx.stroke();}
    ctx.closePath();
  }

  drawtext(obj) {//x,y,text,angle,textBaseLine,color,textAlign
    var {zoom} = this.props;
    var ctx = this.ctx;
    var {angle = 0,textBaseLine = 'bottom',textAlign='center',fontSize=12,color='#000',text} = obj;
    var x = obj.x * zoom;
    var y = obj.y * zoom;
    ctx.save();
    ctx.beginPath();
    ctx.textBaseline = textBaseLine;
    ctx.font = (fontSize * zoom) + "px arial";
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / -180);
    ctx.textAlign = textAlign;
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.closePath();
    ctx.restore();
  }
  draw(){
    var a = ['polyline','arc','rectangle','text'];
    for(var i = 0; i < a.length; i++){
      var objs = this.props[a[i]+'s'] || [];
      for(var j = 0; j < objs.length; j++){this['draw'+a[i]](objs[j]);}
    }
  }
  getAxisPosition(type){
    if(type === 'center'){return {x:this.width/2,y:this.height/2};}
    else if(type === 'downleft'){return {x:0,y:this.height};}
    else if(type === 'downright'){return {x:this.width,y:this.height};}
    else if(type === 'upleft'){return {x:0,y:0};}
    else if(type === 'upright'){return {x:this.width,y:0};}
  }
  setScreen(){
    var {zoom,screenPosition,axisPosition} = this.props;
    var canvas = this.dom.current;
    this.axisPosition = this.getAxisPosition(axisPosition);
    this.translate = { 
      x: (this.axisPosition.x) - (screenPosition.x * zoom), 
      y: (this.axisPosition.y) - (screenPosition.y * zoom * -1) 
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({
      backgroundPosition: this.translate.x + "px " + this.translate.y + "px",  
    });
  }
  componentWillReceiveProps(){this.update();}
  getBackground(){
    var {snap,zoom,gridColor,unit} = this.props;
    var a = 100 * zoom;
    var b = unit === '%' ? `calc(${snap.x} * ${zoom})` : (snap.x * zoom) + 'px';
    var c = unit === '%' ? `calc(${snap.y} * ${zoom})` : (snap.y * zoom) + 'px';
    return {
      backgroundImage:`
          linear-gradient(rgba(${gridColor},0.5) 0px,transparent 0px), 
          linear-gradient(90deg, rgba(${gridColor},0.5) 0px, transparent 0px), 
          linear-gradient(rgba(${gridColor},0.3) 1px, transparent 1px), 
          linear-gradient(90deg, rgba(${gridColor},0.3) 1px, transparent 1px)
        `,
      backgroundSize : `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`
    }
  }
  update(){
    var {getSize,gridColor} = this.props;
    var dom = this.dom.current;
    this.width = $(dom).width();
    this.height = $(dom).height();
    if(getSize){getSize(this.width,this.height);}
    dom.width = this.width;
    dom.height = this.height;
    if(gridColor){$(dom).css(this.getBackground());}
    this.clear();
    this.setScreen();
    if(gridColor){this.drawAxes();}
    this.draw();
  }
  clear() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }
  drawAxes(){
    this.drawpolyline({splines:[{points:[{ x: 0, y: -4002 },{ x: 0, y: 4000 }], color: "#555",lineDash:[2,3] }]});
    this.drawpolyline({splines:[{points:[{ x: -4002, y: 0 },{ x: 4000, y: 0 }], color: "#555",lineDash:[2,3] }]});
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
    var {mouseDown,pan,getMousePosition} = this.props;
    if(getMousePosition){getMousePosition(this.mousePosition);}
    if(mouseDown){mouseDown(e);} 
    if(pan){this.panmousedown(e);}
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
      x: Math.floor((client.x - (this.axisPosition.x) + (sp.x * zoom)) / zoom), 
      y: Math.floor((client.y - (this.axisPosition.y) + (sp.y * zoom * -1)) / zoom) 
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
        endX: screenPosition.x, endY: screenPosition.y 
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
      var x = (so.x - coords.x) / zoom + so.endX, 
          y = (coords.y - so.y) / zoom + so.endY;
      if(onpan){onpan({x,y});}
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
  zoom:1,snap:{x:10,y:10},unit:'px',axisPosition:'center',pan:false,
  screenPosition:{x:0,y:0}
}

