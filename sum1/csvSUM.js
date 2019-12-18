

d3.csv("https://raw.githubusercontent.com/svparmar/summative/master/sum1/testtt.csv?token=AKBP7R477PLBW5IESTG2Z5257KXOA",function(data) {


const selector = document.getElementById("dropdown");
//selector.addEventListener("click", eventHandler);


//all 7 gas colours + total at the end
var colourlist = ['#cccccc','#999999','#666666','#b7b7b7','#a3a3a3','#adadad','#e0e0e0','#6b6b6b'];

// var CO2 =#cccccc;

// var CH4 =#999999;

// var N20 =#666666;

// var HFC =#b7b7b7;

// var PFC =#a3a3a3;

// var SF6 =#adadad;

// var NF3 =#e0e0e0;

// var total =#6b6b6b;

  var headerNames = d3.keys(data[0]);
  var check = headerNames[5];


 var col2data = data.map(function(d) { return d[check] });


console.log(headerNames); 
  console.log(check); // outputs: ['aaa2', 'bbb2', 'ccc2']

  console.log(col2data);




//taken from
//https://www.d3-graph-gallery.com/graph/line_select.html
d3.select("#dropdown")
		.selectAll('myOptions')
		.data(headerNames)
        .enter()
        .append('option')
        .text(function (d) { return d; }) 
        .attr("value", function (dropdowndata) { return dropdowndata; })
        

//from https://codepen.io/tarsusi/pen/reovOV
d3.select("#dropdown").on("change",function(d){

        	var dropdowndatainput = d3.select(this).property('value');



  			console.log(dropdowndatainput);

  			createdataballs(dropdowndatainput);
    	
        	});



// function eventHandler(event) {
//   if (event.type == 'click') {
//     /* handle a full screen toggle */

//     var dropdowndatapass = d3.select(this).property('value');
//     var selected = d3.select("#dropdown").node().value;


//     console.log(selected);
//     console.log(dropdowndatapass);
                        

//                    // updateBars(newData);
//     createdata();



//   } else /* fullscreenerror */ {
//     /* handle a full screen toggle error */
//   }
// }



function createdataballs(yeardata){


	console.log('running createdataballs');
	console.log(yeardata);

	
 	var yeargases = data.map(function(d) { return d[yeardata] });
 	console.log(yeargases);


	//div1.innerHTML = (actualSentence),(buttton);

}




});

