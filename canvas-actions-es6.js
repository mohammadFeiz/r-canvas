import RActions from 'r-actions';
import $ from 'jquery';
var {eventHandler,getClient,getValueByRange} = new RActions();
export default{
  panmousedown(e){
    eventHandler("window", "mousemove", $.proxy(this.panmousemove,this));
    eventHandler("window", "mouseup", $.proxy(this.panmouseup,this));
    this.panned = false;
    var {screenPosition} = this.props;
    var client = getClient(e);
    this.startOffset = { 
        x: client.x, y: client.y, 
        endX: screenPosition[0], endY: screenPosition[1] 
    };
  },
  panmouseup() {
    eventHandler("window", "mousemove", this.panmousemove,'unbind');
    eventHandler("window", "mouseup", this.panmouseup,'unbind');
  },
  panmousemove(e) {
    var so = this.startOffset, {zoom,onpan} = this.props, coords = getClient(e);
    //if(!this.panned && this.getLength({x:so.x,y:so.y},coords) < 5){return;}
    this.panned = true;
    var x = (so.x - coords.x) / zoom + so.endX,y = (coords.y - so.y) / zoom + so.endY;
    onpan([x,y]);
  },
  setScreen(){
    var {zoom,screenPosition} = this.props;
    var canvas = this.dom.current;
    this.translate = { 
      x: (this.axisPosition.x) - (screenPosition[0] * zoom), 
      y: (this.axisPosition.y) - (screenPosition[1] * zoom * -1) 
    }
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.translate(this.translate.x, this.translate.y);
    $(canvas).css({
      backgroundPosition: this.translate.x + "px " + this.translate.y + "px",  
    });
  },
  mouseDown(e){
    this.mousePosition = this.getMousePosition(e);
    var {mouseDown,onpan,getMousePosition} = this.props;
    if(getMousePosition){getMousePosition(this.mousePosition);}
    if(mouseDown){mouseDown(e);} 
    if(onpan){this.panmousedown(e);}
  },
  mouseMove(e){
    this.mousePosition = this.getMousePosition(e);
    if(this.props.getMousePosition){this.props.getMousePosition(this.mousePosition);}
  },
  getMousePosition(e) { 
    var {unit,screenPosition:sp,zoom} = this.props;
    var client = getClient(e);
    var offset = $(this.dom.current).offset();
    client = {x:client.x - offset.left + window.pageXOffset,y:client.y - offset.top + window.pageYOffset}
    var x = Math.floor((client.x - (this.axisPosition.x) + (sp[0] * zoom)) / zoom);
    var y = Math.floor((client.y - (this.axisPosition.y) + (sp[1] * zoom * -1)) / zoom); 
    return {x,y,px:x * 100 / this.width,py:y * 100 / this.height};
  }
}