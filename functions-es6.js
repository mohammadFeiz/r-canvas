import RActions from 'r-actions';
var {getValueByRange} = new RActions();
export function getColor(color,ctx){
  if(typeof color === 'string'){return color;}
  var [sx,sy,ex,ey,stops] = color;
  var g = ctx.createLinearGradient(sx, sy, ex, ey); 
  for(var i = 0; i < stops.length; i++){
    var s = stops[i];
    g.addColorStop(s[0],s[1]);
  }
  return g;
}
export function shadow({shadow},ctx){
  if(!shadow){return;}
  ctx.shadowOffsetX = shadow[0];
  ctx.shadowOffsetY = shadow[1];
  ctx.shadowBlur = shadow[2];
  ctx.shadowColor = shadow[3];  
}
export function getSides(list){
  var first = list[0],minx = first.x,miny = first.y,maxx = first.x,maxy = first.y;
  for(var i = 1; i < list.length; i++){
    var {x,y} = list[i];
    if(x < minx){minx = x;}else if(x > maxx){maxx = x;}
    if(y < miny){miny = y;}else if(y > maxy){maxy = y;}
  }
  return {left:minx,right:maxx,up:miny,down:maxy,center:{x:(minx + maxx)/2,y:(miny + maxy)/2}};
}
export function getTextAlign([x = 0,y = 0]){
  return [['right','center','left'][x + 1],['top','middle','bottom'][y + 1]];
}
export function getAxisPosition({x = '50%',y = '50%'},width,height){
  var X,Y;
  if(x.indexOf('%') !== -1){X = width * parseFloat(x) / 100;}
  else if(x.indexOf('px') !== -1){X = parseFloat(x);}
  else{console.error('canvas axisPosition.x error. correct example: ("10px" or "10%")')}
  if(y.indexOf('%') !== -1){Y = height * parseFloat(y) / 100;}
  else if(y.indexOf('px') !== -1){Y = parseFloat(y);}
  else{console.error('canvas axisPosition.y error. correct example: ("10px" or "10%")')}
  return {x:X,y:Y};
}
export function getBackground(grid,zoom,width,height){
  var {x,y,color='#000'} = grid;
  var a = 100 * zoom;
  var b = x?(getValueByRange(x,0,width) * zoom) + 'px':'100%';
  var c = y?(getValueByRange(y,0,height) * zoom) + 'px':'100%';
  var h1 = `linear-gradient(#000 0px,transparent 0px)`;
  var v1 = `linear-gradient(90deg, #000 0px, transparent 0px)`;
  var h2 = `linear-gradient(rgba(${color},0.3) 1px, transparent 1px)`;
  var v2 = `linear-gradient(90deg, rgba(${color},0.3) 1px, transparent 1px)`;
  return {
    backgroundImage:`${h1},${v1},${h2},${v2}`,
    backgroundSize : `${a}px ${a}px,${a}px ${a}px,${b} ${c},${b} ${c}`,
  }
}
export function getCoordsByPivot(obj){
  var {pivot,type,x,y} = obj;
  if(!pivot){return {x,y};}
  var {x:px = 0,y:py = 0} = pivot,w ,h;
  if(type === 'rectangle'){
    let {width,height} = obj;
    w = width; h = height;
  }
  else if(type === 'arc'){
    let {r} = obj;
    w = r * 2; h = r * 2;
  }
  return {x:x - getValueByRange(px,0,w),y:y - getValueByRange(py,0,h)}
}