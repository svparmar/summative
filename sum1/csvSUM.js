
/** Class creating balls for a particular year in the dataset. */
class BallMaker {
  /**
 * This class represents the circles that will be made for the svg. The reason I have used collision detection is to model the particles in the atmosphere that
 collide with each other in the air.
 * This class contains year and gases of that year parameters - used to create svg from the dataset.
 * @param {string} actualCol allows the year selected from the dropdown menu to be used in creating the svg from the data of that year.
 * @param {string} actualColData is the data of the specific year which has been put into an array.
 */
    // (year, yeargases, itemName) repectively
    constructor (actualCol, actualColData, itemName) {
      this.actualCol = actualCol;
      this.actualColData = actualColData;
      this.itemName = itemName;
    }

    /** Function that is called when an object of BallMaker has been made. Allows the amount of balls for each colour to be calculated along with the
    radii of each ball.
    *Sets the coloured labels to the correct data retrived from the data set.
    This function also includes loops that check how many balls will be required in a particular colour, i.e how many balls should be coloured orange with a
    given amount of data in a particular year.

   */

    runSVG () {
      console.log('RUNNING SVG');
      console.log(this.actualColData);

      // colour list of balls used: red,orange,pink,green.blue,purple
      var colors = ['#ff0000', '#ffa500', '#FFC0EB', '#008000', '#0000ff', '#4b0082'];

      // displays each cell of csv of a particular year column
      var ul = document.getElementById('list');
      ul.innerHTML = '';

      for (var i = 0; i < this.actualColData.length; i++) {
        var li0 = document.createElement('li');
        li0.appendChild(document.createTextNode(this.itemName[i]));
        ul.appendChild(li0);

        var li1 = document.createElement('li');
        li1.appendChild(document.createTextNode(this.actualColData[i]));

        ul.appendChild(li1);

        li1.style.color = colors[i];
        li1.style.fontWeight = 'bold';
      }

      // stores colour for each individual ball
      var newcolours = [];

      // array of how many ball values to include a given amount of times, i.e displaying a value of 500 for CO2 could be represented as 20 red balls
      var newnodenum = [];

      // total value of all gases in a given year
      var totaltotal = 0;

      // amount of balls to use in the svg
      var amountBalls = [];

      var nodesNum = 31;

      // allows the smaller balls to be seen
      for (i = 0; i < this.actualColData.length; i++) {
        //
        this.actualColData[i] = parseFloat(this.actualColData[i]);
        // if value <1, ball still needs to be represented so given as 1 ball
         if (this.actualColData[i] < 1) {
            amountBalls.push(1);
         } else {
          amountBalls.push(this.actualColData[i]);
         }
         totaltotal = totaltotal + (amountBalls[i]);
      }

      // CALCULATING AMOUNT OF BALLS FOR EACH GAS, allowing for redistribution if necessary i.e taking from the larger populated balls and giving to the less populated
      var tempAmount = [];
      var thelargest = 0;
      var check = 0;
      for (i = 0; i < this.actualColData.length; i++) {
        tempAmount.push(parseInt((((amountBalls[i]) / totaltotal) * nodesNum)));

        check = check + tempAmount[i];
      }

      var largeCount = 0;
      for (i = 0; i < this.actualColData.length; i++) {
        if (tempAmount[i] > thelargest) {
          thelargest = tempAmount[i];
          largeCount = i;
        }
}

      for (i = 0; i < this.actualColData.length; i++) {
        if (tempAmount[i] < 1) {
          if (check <= (nodesNum - 1)) {
            tempAmount[i] = 1;
            check = check + 1;
          } else {
            tempAmount[largeCount] = (tempAmount[largeCount]) - 1;
            tempAmount[i] = 1;
            check = check + 1;
          }
        }
      }

      for (i = 0; i < this.actualColData.length; i++) {
        amountBalls[i] = amountBalls[i] / 20 * 2 + 12;
      }

      // add the balls for a single gas with a given radii j amount of times
      // with the colour specified
     for (i = 0; i < this.actualColData.length; i++) {
          for (var j = 0; j < tempAmount[i]; j++) {
            newnodenum.push(amountBalls[i]);
            newcolours.push(colors[i]);
          }
      }

      // reassign newnodenum. access each value in the lists to correspond to one ball
      newnodenum = d3.scale.ordinal().range(newnodenum);

      // reassignment of newcolours
      newcolours = d3.scale.ordinal().range(newcolours);

      // call function runforce with the above values to make the svg and use the d3 visalisation to interact with the data
      runforce(newnodenum, newcolours);

    /**
 * Function runforce is called to produce the balls in svg form. The visualisation code involving the gravitational force between the balls and collisions is included in
 this function as well as implementing the properties for each ball. The number of nodes (balls) available has been fixed to 31, to give a representation of the concentation
 of gases in air. This function removes the previous svg and adds the new one created for another year with the parameters passed into the function.
 * @memberof BallMaker
 * @function runforce
 * @param radiusSize {string} holds the list of ball radii - carried in from runSVG()
 * @param colour {string} allows the colours in the list to be used to colour the corresponding ball with the radiusSize (size of radius)
    */
      function runforce (radiusSize, colour) {
        // remove old svg
        d3.select('svg').remove();

        // uses 31 nodes to give a representation of gases in the air
        var nodes = d3.range(32).map(function () { return { radius: Math.random() * 12 + 50 }; });
        var root = nodes[0];
        root.radius = 0;
        root.fixed = true;

        // force layout of svg to show where balls with feel force in a given space
        var force = d3.layout.force()
            .gravity(0.05)
            .charge(function (d, i) { return i ? 0 : -2000; })
            .nodes(nodes)
            .size([1060, 720]);

        force.start();

        // new svg added with data and colour passed in
          var svg = d3.select('body').append('svg').attr('width', 1060).attr('height', 720);
          svg.selectAll('circle').data(nodes.slice(1)).enter().append('circle').attr('r', function (d) { return radiusSize(d.index); }).attr('fill', function (d) { return colour(d.index); });

          force.on('tick', function (e) {
            var q = d3.geom.quadtree(nodes); var i = 0; var n = nodes.length;

            // when balls collide, ensure that they are able to move to different places of the screen
            while (++i < n) q.visit(collide(nodes[i]));

            svg.selectAll('circle')
                .attr('cx', function (d) { return d.x; })
                .attr('cy', function (d) { return d.y; });
          });

          // if the mouse touches the ball, ensure it moves away
          svg.on('mousemove', function () {
            var p1 = d3.mouse(this);
            root.px = p1[0];
            root.py = p1[1];
            force.resume();
});

/**
 * Function collide is part of runforce and is used to control the balls position when they come into contact with the mouse or other balls.
 * @memberof BallMaker
 * @function collide (node)
 * @param node {number} to pass in each ball with their seperate attributes.
    */
          function collide (node) {
            var r = node.radius + 16;
                var nx1 = node.x - r;
                var nx2 = node.x + r;
                var ny1 = node.y - r;
                var ny2 = node.y + r;
            return function (quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x;
                    var y = node.y - quad.point.y;
                    var l = Math.sqrt(x * x + y * y);
                    var r = node.radius + quad.point.radius;
                if (l < r) {
                  l = (l - r) / l * 0.5;
                  node.x -= x *= l;
                  node.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            };
        }
      }
  }
}
