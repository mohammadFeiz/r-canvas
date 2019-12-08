import React, { Component,createRef } from 'react';
import $ from 'jquery';
import {getColor,shadow,getTextAlign,getAxisPosition,getBackground,getCoordsByPivot} from './functions';
import RActions from 'r-actions';
import canvasActions from './canvas-actions';
var {eventHandler,getClient,getValueByRange} = new RActions();
export default class Canvas extends Component {
  constructor(props) {
    super(props);
    for(var prop in canvasActions){this[prop] = canvasActions[prop];}
    this.PI = Math.PI / 180;
    this.dom = createRef(); this.width = 0; this.height = 0;
    this.isMobile = 'ontouchstart' in document.documentElement?true:false;
  }
  getStyle(style = {}){return style;}
  
  draw(items = this.props.items,parent = {}){
    for(var i = 0; i < items.length; i++){ 
      var item = items[i];
      var {show,type} = item;
      if(show === false){continue;}
      var {rotateSetting,zoom} = this.props,ctx = this.ctx;
      var {fill,stroke,lineJoin = 'miter',lineCap = 'butt',rotate = 0,pivot,angle} = item;  
      var {x:parentx = 0,y:parenty = 0,rotate:parentrotate = 0} = parent;
      rotate = getValueByRange(rotate,0,360);
      parentrotate = getValueByRange(parentrotate,0,360);
      rotate += parentrotate;
      if(type === 'group'){
        var {x = 0,y = 0} = item;
        x += parentx; y += parenty;
      }
      if(type === 'line'){
        var {points,close} = item;
        if(points.length < 2){return false;}
        var {x,y} = points[0];  
        x += parentx; y += parenty;
      }
      else if(type === 'arc'){
        var {x = 0,y = 0,r = 20} = item;  
        x += parentx; y += parenty;
        x = getValueByRange(x,0,this.width);
        y = getValueByRange(y,0,this.height);
        var p = getCoordsByPivot({x,y,r,pivot,type:'arc'});
        var center = {x:p.x,y:p.y}; //مخصات مرکز
        var param = {x:p.x,y:p.y};  
      }
      else if(type === 'rectangle'){
        var {x = 0,y = 0,width = 20,height = 20} = item; 
        x += parentx; y += parenty;
        x = getValueByRange(x,0,this.width);
        y = getValueByRange(y,0,this.height);
        width = getValueByRange(width,0,this.width);
        height = getValueByRange(height,0,this.height);
        var p = getCoordsByPivot({x,y,width,height,pivot,type:'rectangle'});
        var center = {x:p.x + width / 2,y:p.y + height / 2};  
        var param = {x:p.x,y:p.y,width,height};
      }
      else if(type === 'text'){
        var {x = 0,y = 0,align=[0,0],fontSize=12,text} = item;
        x += parentx; y += parenty;
        var [X,Y] = getTextAlign(align);
        x = getValueByRange(x,0,this.width);
        y = getValueByRange(y,0,this.height);
        var p = getCoordsByPivot({x,y,pivot,type:'text'});
        var center = {x:p.x,y:p.y}; //مختصات مرکز
        var param = {x:p.x,y:p.y};
        ctx.textBaseline = Y;
        ctx.font = (fontSize * zoom) + "px arial";
        ctx.textAlign = X;
      }
      ctx.save(); ctx.beginPath();
      rotate && this.rotate(rotate,{x,y});
      angle && this.rotate(angle,center);
      if(type === 'group'){
        this.draw(item.items,{x,y,rotate});
      }
      shadow(item,ctx);
      ctx.lineCap = lineCap;
      ctx.lineJoin = lineJoin;
      this.ink(item,param);
      ctx.closePath(); ctx.restore();
    }
  }
  setStroke(stroke){
    if(!stroke){return false;}
    var ctx = this.ctx,{zoom} = this.props;
    let [color = '#000',width = 1,dash] = stroke;
    dash && ctx.setLineDash(dash);
    ctx.strokeStyle = color;
    ctx.lineWidth = width * zoom;
    return true;
  }
  setFill(fill){
    if(!fill){return false;}
    var ctx = this.ctx;
    ctx.fillStyle = fill;
    return true;
  }
  ink({type,stroke,fill,text = 'Text',r,points,close,slice=[0,360],pivot},obj){
    if(!fill && !stroke){return;}
    var {zoom,rotateSetting} = this.props,ctx = this.ctx;
    if(type === 'text'){
      let {x,y} = obj;
      this.setStroke(stroke) && ctx.strokeText(text, x * zoom, y * zoom);
      this.setFill(fill) && ctx.fillText(text,x * zoom,y * zoom);
    }
    else if(type === 'rectangle'){
      let {x,y,width,height} = obj;
      this.setStroke(stroke) && ctx.strokeRect(x * zoom, y * zoom, width * zoom, height * zoom); 
      this.setFill(fill) && ctx.fillRect(x * zoom, y * zoom, width * zoom, height * zoom);
    }
    else if(type === 'arc'){
      let {x,y} = obj;
      var {direction='clock',offset = 0} = rotateSetting;
      var slice0 = getValueByRange(slice[0],0,360),slice1 = getValueByRange(slice[1],0,360);
      var sa,ea;
      if(direction === 'clock'){sa = slice0 * this.PI; ea = slice1 * this.PI;}
      else{sa = -slice1 * this.PI; ea = -slice0 * this.PI;}
      ctx.arc(x * zoom, y * zoom, r * zoom, sa, ea);
      this.setStroke(stroke) && ctx.stroke();
      this.setFill(fill) && ctx.fill();
    }
    else if(type === 'line'){ 
      var start = getCoordsByPivot({x:points[0].x,y:points[0].y,pivot,type:'line'});
      ctx.moveTo(getValueByRange(start.x,0,this.width) * zoom, getValueByRange(start.y,0,this.height) * zoom); 
      for(var i = 1; i < points.length; i++){
        let p = getCoordsByPivot({x:points[i].x,y:points[i].y,pivot,type:'line'});
        ctx.lineTo(getValueByRange(p.x,0,this.width) * zoom, getValueByRange(p.y,0,this.height) * zoom);
      }
      if(points.length > 2 && close){
        ctx.lineTo(start.x * zoom, start.y * zoom);
      }
      this.setStroke(stroke) && ctx.stroke();
      this.setFill(fill) && ctx.fill();
    }
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
  update(){
    var {getSize,grid,zoom} = this.props;
    var dom = this.dom.current;
    this.width = $(dom).width();
    this.height = $(dom).height();
    this.axisPosition = this.axisPosition || getAxisPosition(this.props.axisPosition,this.width,this.height);
    if(getSize){getSize(this.width,this.height);}
    dom.width = this.width;
    dom.height = this.height;
    if(grid){$(dom).css(getBackground(grid,zoom,this.width,this.height));}
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
    var stroke = [undefined,1,[3,3]],type= 'line';
    this.draw([{type,points:[{ x: 0, y: -4002 },{ x: 0, y: 4000 }],stroke},{type,points:[{ x: -4002, y: 0 },{ x: 4000, y: 0 }],stroke}]);
  }
  componentDidMount(){
    this.ctx = this.ctx || this.dom.current.getContext("2d");
    this.update();        
  }
  componentDidUpdate(){
    this.update();
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