
/** Class creating balls for a particular year in the dataset. */
class ballMaker{
  /**
 * This class represents the circles that will be made for the svg.
 * containing year and yeargases parameters - used to create svg from dataset
 * @param {string} year allows the year selected from the dropdown menu to be used in creating the svg from the data of that year
 * @param {string} yeargases is the data of the specific year which has been put into an array
 */


    constructor(year,yeargases){
      this.year = year;
      this.yeargases = yeargases; }

    /** Function that is called when an object of ballMaker has been made. Allows the amount of balls for each colour to be calculated along with the 
    radii of each ball.
    *Sets the coloured labels to the correct data retrived from the data set. 
    This function also includes loops that check how many balls will be required in a particular colour, i.e how many balls should be coloured orange with a 
    given amount of data in a particular year.

   */

    runSVG() {
     
      console.log('RUNNING SVG');
      console.log(this.yeargases);

      //displays each cell of csv of a particular year column
      d3.select('#co2').text(this.yeargases[0]);
      document.getElementById("co2").style.fontWeight = "bold";
      d3.select('#ch4').text(this.yeargases[1]);
      document.getElementById("ch4").style.fontWeight = "bold";
      d3.select('#n2o').text(this.yeargases[2]);
      document.getElementById("n2o").style.fontWeight = "bold";
      d3.select('#hfc').text(this.yeargases[3]);
      document.getElementById("hfc").style.fontWeight = "bold";
      d3.select('#pfc').text(this.yeargases[4]);
      document.getElementById("pfc").style.fontWeight = "bold";
      d3.select('#sf6').text(this.yeargases[5]);
      document.getElementById("sf6").style.fontWeight = "bold";
      

      //colour list of balls used: red,orange,pink,green.blue,purple
      var colors = ['#ff0000',"#ffa500",'#FFC0EB', '#008000',"#0000ff","#4b0082"];

      //stores colour for each individual ball
      var newcolours = [];

      //array of how many ball values to include a given amount of times, i e displaying a value of 500 for CO2 could be represneted as 20 red balls
      var newnodenum = []; 

      //total value of all gases in a given year
      var totaltotal=0;

      //amount of balls to use in the svg
      var amountBalls=[];
      
      //allows the smaller balls to be seen
      for (var i = 0; i < this.yeargases.length; i++)
      {
        //
        this.yeargases[i] = Math.ceil(this.yeargases[i]);
      
         if (this.yeargases[i]<1)
         {
            amountBalls.push(this.yeargases[i]+3);
         }

         else
         {
          amountBalls.push(this.yeargases[i]);
          totaltotal = totaltotal+Math.ceil(this.yeargases[i]);
         }
      }

      //CALCULATING AMOUNT OF BALLS FOR EACH GAS
      var tempAmount=[];
      for (var i = 0; i < 6; i++)
      {
        
        tempAmount.push(Math.ceil(((amountBalls[i]*5)/totaltotal)*5));

      }
      
      //adjusting size of balls radii
      amountBalls[0] = amountBalls[0]/10;
      amountBalls[1]=amountBalls[1]/10*2+25;
      amountBalls[2]=amountBalls[2]/10*5+20;
      amountBalls[3]=amountBalls[3]/10*4+20;

      //small ball radii adjustment, comparing the last two values to each other as they are the smallest and need to be displayed against the biggest
      if (this.yeargases[4]<this.yeargases[5]) {
        console.log('purple is bigger than blue')
        amountBalls[5]=amountBalls[5]+10;
        amountBalls[4]=amountBalls[4]+5;
      }

      else if (this.yeargases[4]==this.yeargases[5]) {
        console.log('purple is equal to blue')
        amountBalls[5]=amountBalls[5]+10;
        amountBalls[4]=amountBalls[4]+10;
      }

      else{
        console.log('blue is bigger than purple');
        amountBalls[4]=amountBalls[4]+10;
        amountBalls[5]=amountBalls[5]+5;
      }
  
      //add the balls for a single gas with a given radii j amount of times with the colour specified
     for (i = 0; i < this.yeargases.length; i++)
     {
          for (var j = 0; j < tempAmount[i]; j++)
          {
            newnodenum.push(amountBalls[i]);
            newcolours.push(colors[i]);
          }
      }
  
      //reassign newnodenum. access each value in the lists to correspond to one ball
      newnodenum = d3.scale.ordinal().range(newnodenum);

      //reassignment of newcolours
      newcolours = d3.scale.ordinal().range(newcolours);
      
      //call function runforce with the above values to make the svg and use the d3 visalisation to interact with the data
      runforce(newnodenum,newcolours);


    /**
 * Function runforce is called to produce the balls in svg form. The visualisation code involving the gravitational force between the balls and collisions is included in
 this function as well as implemetning the properties for each ball. The number of nodes (balls) avaiable has been fixed to 31, to give a representation of the concentation
 of gases in air. This functino removes the previous svg and adds the new one created for another year with the paramters passed into the function.
 * @memberof ballMaker 
 * @function runforce 
 * @param gasSize {string} holds the list of ball radii - carried in from runSVG()
 * @param colour {string} allows the colours in the list to be used to colour the corresponding ball with the gasSize (size of radius)
    */
      function runforce(gasSize,colour){

        console.log('running runforce');

        //remove old svg
        var svg1=d3.select("svg").remove();

        //uses 31 nodes to give a representation of gases in the air
        var nodes = d3.range(31).map(function() { return {radius: Math.random() * 12 + 50}; });
        var root = nodes[0];
        root.radius = 0;
        root.fixed = true;

        //force layout of svg to show where balls with feel force in a given space
        var force = d3.layout.force()
            .gravity(0.05)
            .charge(function(d, i) { return i ? 0 : -2000; })
            .nodes(nodes)
            .size([1060, 720]);

        force.start();


        console.log(' ADDING new SVG');

        //new svg added with data and colour passed in 
          var svg = d3.select("body").append("svg").attr("width", 1060).attr("height", 720);
          svg.selectAll("circle").data(nodes.slice(1)).enter().append("circle").attr("r",function(d) {return gasSize(d.index); }).attr("fill", function(d) {return colour(d.index);  })


          force.on("tick", function(e) {
            var q = d3.geom.quadtree(nodes), i = 0, n = nodes.length;

            //when balls collide, ensure that they are able to move to different places of the screen
            while (++i < n) q.visit(collide(nodes[i]));

            svg.selectAll("circle")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
          });

          //if the mouse touches the ball, ensure it moves away
          svg.on("mousemove", function() {
            var p1 = d3.mouse(this);
            root.px = p1[0];
            root.py = p1[1];
            force.resume();});

          function collide(node) {
            var r = node.radius + 16,
                nx1 = node.x - r,
                nx2 = node.x + r,
                ny1 = node.y - r,
                ny2 = node.y + r;
            return function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                  l = (l - r) / l * .5;
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

  
  }//end of run svg
}
 
/**
 * This function allowes access to the csv file containing data for my csv through a public github repository. This function puts all the column names of the csv (the years 1990-2017)
 into a  variable to be  used as options for the dropdown menu. This allows the user to select a particular year to display the gas concentration of a particular year.
 Within this function, the class ballMaker can be accessed by calling it based on the data selected from the dropdown.
 * @function csv 
 * @param data {string} holds the list all the data collected from the csv
    */
d3.csv("https://raw.githubusercontent.com/svparmar/summative/master/sum1/eve2.csv",function(data) {

//headerNames holds list of years from csv
  var headerNames = d3.keys(data[0]);

  //modification of dropdown to put 'Year' at the start of dropdown
  headerNames.splice(0,0,'Year');
  headerNames.pop();

  console.log('headerNames'); 
  console.log(headerNames); 
  
  //creates dropdown
  d3.select("#dropdown")
      .selectAll('myOptions')
      .data(headerNames)
      .enter().append('option').text(function (d) { return d; })
      .attr("value", function (dropdowndata) { return dropdowndata; })


  //when an item has been selected on the dropdown, create an object of class ballMaker and pass in the value of the year selected along with the data from the csv for
  //that particular year
  d3.select("#dropdown").on("change",function(d){
  var yeardata = d3.select(this).property('value');
  var yeargasesSel = (data.map(function(d) { return d[yeardata] }));
 
  console.log(yeardata);

  let b = new ballMaker(yeardata , yeargasesSel);
  b.runSVG();

  });
});