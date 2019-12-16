//d3.csv('url of github raw').then(function(data))

//d3.csv("https://raw.githubusercontent.com/svparmar/summative/master/sum1/cut%20version%20of%20data%20copy.csv?token=AKBP7R3QKCOUWM4XD64GIOC5566HW").then(function(data){});
var datata = '';
d3.csv("https://raw.githubusercontent.com/svparmar/summative/master/sum1/testtt.csv?token=AKBP7R5JGOFZWUM4B5N4BUK57AAWA",function(data) {


  //console.log(d3.csv.parse(string[data]));
  //console.log(data[0]);

// List of subgroups = header of the csv files = soil condition here
 // var subgroups = data.columns.slice(1)



  var headerNames = d3.keys(data[0]);
  var check = headerNames[5];


//var year = 1990;

// var col2data = data.map(function(d) { return d.headerNames[5]});
 // var col3data = data.map(function(d) { return d.djs });
 var col2data = data.map(function(d) { return d[check] });

// console.log(t);
console.log(headerNames); 
  console.log(check); // outputs: ['aaa2', 'bbb2', 'ccc2']

  console.log(col2data);

//var dataq = 'Methane (CH4)'
//  for (var i = 0; i < data.length; i++) {
  //    console.log(data[i]);
   //   var data222 = data.split(',');
   //};

  //  for (var m = 0; m < data.length; m++) {
        
    //    for (var n = 0; n < 7; n++) {
        //  console.log(data[n]);
    //  };
    //};

    //console.log(data.);


//      d3.csv("/data/cities.csv").then(function(data) {
//   data.forEach(function(d) {
//     d.population = +d.population;
//     d["land area"] = +d["land area"];
//   });
//   console.log(data[0]);
// });


    //data.forEach(function(data){
    
    //return data;


    

   // length: +data.1990; // convert "Length" column to number
  
  //  console.log(length);
   
//    var cols2and3 = data.map(function(d) {
//   return {
//     col2: d.+1990,
//     col3: d.col3
//   }
// });

// console.log(cols2and3)
   


      //});

});

