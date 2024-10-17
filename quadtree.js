class Point {
    constructor(x, y, userData) {
      this.x = x;
      this.y = y;
      this.userData = userData;
    }
  }
  
  class Circle {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }
    
    contains(point) {
      let distX = Math.abs(this.x - point.x);
      let distY = Math.abs(this.y - point.y);
      let distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    
      if (distance <= this.r) {
        return true;
      } else {
        return false;
      }
    }
    
    intersects(boundary) {
      let closeX = this.x; 
      let closeY = this.y;
  
      if (this.x < boundary.x - boundary.w) {
        closeX = boundary.x - boundary.w;
      } else if (closeX > boundary.x + boundary.w) {
        closeX = boundary.x + boundary.w;
      }
      
      if (this.y > boundary.y + boundary.h) {
        closeY = boundary.y + boundary.h;
      } else if (this.y < boundary.y - boundary.h) {
        closeY = boundary.y - boundary.h;
      }
      
      let distX = Math.abs(this.x - closeX);
      let distY = Math.abs(this.y - closeY);
      let distance = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
      
      if (distance <= this.r) {
        return true;
      } else {
        return false;
      }
      
    }
  }
  
  class Rect {
    constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w; 
      this.h = h;
    }
    
    contains(point) {
      if (point.x >= this.x - this.w &&
         point.x < this.x + this.w &&
         point.y >= this.y - this.h &&
         point.y < this.y + this.h) {
        return true;
      } else {
        return false;
      }
    }
    
    intersects(boundary) {
      let boundaryR = boundary.x + boundary.w;
      let boundaryL = boundary.x - boundary.w;
      let boundaryT = boundary.y - boundary.h;
      let boundaryB = boundary.y + boundary.h;
      
      let rangeR = this.x + this.w;
      let rangeL = this.x - this.w;
      let rangeT = this.y - this.h;
      let rangeB = this.y + this.h;
      
      if (boundaryR >= rangeL &&
         boundaryL <= rangeR &&
         boundaryT <= rangeB &&
         boundaryB >= rangeT) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  class QuadTree {
    constructor(boundary, capacity) {
      this.boundary = boundary;
      this.capacity = capacity;
      this.points = [];
      this.divided = false;
    }
    
    clearQuadtree() {
      this.points = [];
      this.divided = false;
    }
    
    insert(point) {
      if (!this.boundary.contains(point)) {
        return false;
      }
      
      if (this.points.length < this.capacity) {
        this.points.push(point);
        return true;
      } else {
        if (!this.divided) {
          this.subdivide();
        }
        
        if (this.northeast.insert(point)) {
          return true;
        } else if (this.northwest.insert(point)) {
          return true;
        } else if (this.southeast.insert(point)) {
          return true;
        } else if (this.southwest.insert(point)) {
          return true;
        }
      }
      return false;
    }
    
    subdivide() {
      let x = this.boundary.x;
      let y = this.boundary.y; 
      let w = this.boundary.w;
      let h = this.boundary.h;
      
      let northeastBoundary = new Rect(x + w/2, y - h/2, w/2, h/2);
      this.northeast = new QuadTree(northeastBoundary, this.capacity); 
      let northwestBoundary = new Rect(x - w/2, y - h/2, w/2, h/2);
      this.northwest = new QuadTree(northwestBoundary, this.capacity);
      let southeastBoundary = new Rect(x + w/2, y + h/2, w/2, h/2);
      this.southeast = new QuadTree(southeastBoundary, this.capacity);
      let southwestBoundary = new Rect(x - w/2, y + h/2, w/2, h/2);
      this.southwest = new QuadTree(southwestBoundary, this.capacity);
      
      this.divided = true;
    }
    
    query(range, found) {
      if (!range.intersects(this.boundary)) {
        return false;
      } else {
        for (let i=0; i<this.points.length; i++) {
          if (range.contains(this.points[i])) {
            found.push(this.points[i]);
          }
        }
        if (this.divided) {
            this.northeast.query(range, found);
            this.northwest.query(range, found);
            this.southeast.query(range, found);
            this.southwest.query(range, found);
          }
      }
      return found;
    }
    
    display() {
      noFill();
      stroke(0);
      rectMode(CENTER);
      rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
    
      // for (let i=0; i<this.points.length; i++) {
      //   noStroke();
      //   fill(255, 0, 0);
      //   ellipse(this.points[i].x, this.points[i].y, radius * 2, radius * 2);
      // }
      
      if (this.divided) {
        this.northeast.display();
        this.northwest.display();
        this.southeast.display();
        this.southwest.display();
      }
    
    }
  }
    
    
    
    