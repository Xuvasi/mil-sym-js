var armyc2 = armyc2 || {};
/** namespace */
armyc2.c2sd = armyc2.c2sd || {};
armyc2.c2sd.renderer = armyc2.c2sd.renderer || {};
armyc2.c2sd.renderer.so = armyc2.c2sd.renderer.so || {};


/**
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2
 * @returns {Line}
 */
armyc2.c2sd.renderer.so.Line = function (x1,y1,x2,y2) {

    
    this.rectangle = null;
    //this.points = new Array();
    this.pt1 = null;
    this.pt2 = null;

    //contructor
    if(arguments.length===4)
    {
        //this.points.push(new armyc2.c2sd.renderer.so.Point(x1,y1));
        //this.points.push(new armyc2.c2sd.renderer.so.Point(x2,y2));
        this.pt1 = new armyc2.c2sd.renderer.so.Point(x1,y1);
        this.pt2 = new armyc2.c2sd.renderer.so.Point(x2,y2);

        this.rectangle = new armyc2.c2sd.renderer.so.Rectangle(x1,y1,1,1);
        this.rectangle.unionPoint(new armyc2.c2sd.renderer.so.Point(x2,y2));            
    }

};
     
    // <editor-fold defaultstate="collapsed" desc="Public Functions">
    armyc2.c2sd.renderer.so.Line.prototype.getShapeType = function(){
        return armyc2.c2sd.renderer.so.ShapeTypes.LINE;
    };

    armyc2.c2sd.renderer.so.Line.prototype.getBounds = function(){
        return new armyc2.c2sd.renderer.so.Rectangle(this.rectangle.getX(),
                                this.rectangle.getY(),
                                this.rectangle.getWidth(),
                                this.rectangle.getHeight());
    };
    armyc2.c2sd.renderer.so.Line.prototype.getP1 = function()
    {
        return this.pt1;
    };
    armyc2.c2sd.renderer.so.Line.prototype.getP2 = function()
    {
        return this.pt2;
    };
    
    armyc2.c2sd.renderer.so.Line.prototype.shift = function(x,y){

        this.rectangle.shift(x,y);
        
        this.pt1.shift(x,y);
        this.pt2.shift(x,y);

    };
        /**
     * Tests if the specified line segment intersects this line segment.
     * @param line the specified <code>Line</code>
     * @return <code>true</code> if this line segment and the specified line
     *			segment intersect each other; 
     *			<code>false</code> otherwise.
     */
    armyc2.c2sd.renderer.so.Line.prototype.intersectsLine = function(line)
    {
        return armyc2.c2sd.renderer.so.utilities.linesIntersect(
                    this.getP1().getX(),this.getP1().getY(),
                    this.getP2().getX(),this.getP2().getY(),
                    line.getP1().getX(),line.getP1().getY(),
                    line.getP2().getX(),line.getP2().getY());
        
    };


    armyc2.c2sd.renderer.so.Line.prototype.setPath = function(context){

        //context.beginPath();
        context.moveTo(this.pt1.getX(),this.pt1.getY());
        context.lineTo(this.pt2.getX(),this.pt2.getY());

    };
    armyc2.c2sd.renderer.so.Line.prototype.stroke = function(context){
        context.beginPath();
        context.moveTo(this.pt1.getX(),this.pt1.getY());
        context.lineTo(this.pt2.getX(),this.pt2.getY());
        context.stroke();
    };
    armyc2.c2sd.renderer.so.Line.prototype.fill = function(context){
        context.beginPath();
        context.moveTo(this.pt1.getX(),this.pt1.getY());
        context.lineTo(this.pt2.getX(),this.pt2.getY());
        context.fill();
    };
    
	// </editor-fold>