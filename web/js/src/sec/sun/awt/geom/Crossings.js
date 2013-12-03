var sec=sec || {};
sec.sun=sec.sun || {};
sec.sun.awt=sec.sun.awt || {};
sec.sun.awt.geom=sec.sun.awt.geom || {};
sec.sun.awt.geom.Crossings=function()
{
    //﻿Clazz.declarePackage ("sec.sun.awt.geom");
    //c$ = Clazz.decorateAsClass (function () {
    this.limit = 0;
    this.yranges = null;
    this.xlo = 0;
    this.ylo = 0;
    this.xhi = 0;
    this.yhi = 0;
    //Clazz.instantialize (this, arguments);
    //}, sec.sun.awt.geom, "Crossings");
    //Clazz.prepareFields (c$, function () {
    this.yranges =  Clazz.newArray (10, 0);
    //});
    //Clazz.makeConstructor (c$, 
    //function (xlo, ylo, xhi, yhi) {
    var xlo=arguments[0];
    var ylo=arguments[1];
    var xhi=arguments[2];
    var yhi=arguments[3];
    this.xlo = xlo;
    this.ylo = ylo;
    this.xhi = xhi;
    this.yhi = yhi;
    //}, "~N,~N,~N,~N");
    //Clazz.defineMethod (c$, "getXLo", 
    this.getXLo=function () {
        return this.xlo;
    };//);
    //Clazz.defineMethod (c$, "getYLo", 
    this.getYLo=function () {
        return this.ylo;
    };//);
    //Clazz.defineMethod (c$, "getXHi", 
    this.getXHi=function () {
        return this.xhi;
    };//);
    //Clazz.defineMethod (c$, "getYHi", 
    this.getYHi=function () {
        return this.yhi;
    };//);
    //Clazz.defineMethod (c$, "isEmpty", 
    this.isEmpty=function () {
        return (this.limit == 0);
    };//);
    //Clazz.defineMethod (c$, "accumulateLine", 
    this.accumulateLine=function (x0, y0, x1, y1) {
        if (y0 <= y1) {
            return this.accumulateLine2 (x0, y0, x1, y1, 1);
        } else {
            return this.accumulateLine2 (x1, y1, x0, y0, -1);
        }
    };//, "~N,~N,~N,~N");
    //Clazz.defineMethod (c$, "accumulateLine2", 
    this.accumulateLine2=function (x0, y0, x1, y1, direction) {
        if (this.yhi <= y0 || this.ylo >= y1) {
            return false;
        }
        if (x0 >= this.xhi && x1 >= this.xhi) {
            return false;
        }
        if (y0 == y1) {
            return (x0 >= this.xlo || x1 >= this.xlo);
        }
        var xstart;
        var ystart;
        var xend;
        var yend;
        var dx = (x1 - x0);
        var dy = (y1 - y0);
        if (y0 < this.ylo) {
            xstart = x0 + (this.ylo - y0) * dx / dy;
            ystart = this.ylo;
        } else {
            xstart = x0;
            ystart = y0;
        }
        if (this.yhi < y1) {
            xend = x0 + (this.yhi - y0) * dx / dy;
            yend = this.yhi;
        } else {
            xend = x1;
            yend = y1;
        }
        if (xstart >= this.xhi && xend >= this.xhi) {
            return false;
        }
        if (xstart > this.xlo || xend > this.xlo) {
            return true;
        }
        this.record (ystart, yend, direction);
        return false;
    };//, "~N,~N,~N,~N,~N");
    //Clazz.defineMethod (c$, "record", 
    this.record=function (ystart, yend, direction) {
        if (ystart >= yend) {
            return ;
        }
        var from = 0;
        while (from < this.limit && ystart > this.yranges[from + 1]) {
            from += 2;
        }
        var to = from;
        while (from < this.limit) {
            var yrlo = this.yranges[from++];
            var yrhi = this.yranges[from++];
            if (yend < yrlo) {
                this.yranges[to++] = ystart;
                this.yranges[to++] = yend;
                ystart = yrlo;
                yend = yrhi;
                continue ;
            }
            var yll;
            var ylh;
            var yhl;
            var yhh;
            if (ystart < yrlo) {
                yll = ystart;
                ylh = yrlo;
            } else {
                yll = yrlo;
                ylh = ystart;
            }
            if (yend < yrhi) {
                yhl = yend;
                yhh = yrhi;
            } else {
                yhl = yrhi;
                yhh = yend;
            }
            if (ylh == yhl) {
                ystart = yll;
                yend = yhh;
            } else {
                if (ylh > yhl) {
                    ystart = yhl;
                    yhl = ylh;
                    ylh = ystart;
                }
                if (yll != ylh) {
                    this.yranges[to++] = yll;
                    this.yranges[to++] = ylh;
                }
                ystart = yhl;
                yend = yhh;
            }
            if (ystart >= yend) {
                break;
            }
        }
        if (to < from && from < this.limit) {
            System.arraycopy (this.yranges, from, this.yranges, to, this.limit - from);
        }
        to += (this.limit - from);
        if (ystart < yend) {
            if (to >= this.yranges.length) {
                var newranges =  Clazz.newArray (to + 10, 0);
                System.arraycopy (this.yranges, 0, newranges, 0, to);
                this.yranges = newranges;
            }
            this.yranges[to++] = ystart;
            this.yranges[to++] = yend;
        }
        this.limit = to;
    };//, "~N,~N,~N");
//Clazz.defineStatics (c$,
//"debug", false);

};
sec.sun.awt.geom.Crossings.debug=false;