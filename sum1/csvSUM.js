

d3.csv("https://raw.githubusercontent.com/svparmar/summative/master/sum1/testtt.csv?token=AKBP7R5JGOFZWUM4B5N4BUK57AAWA",function(data) {





  var headerNames = d3.keys(data[0]);
  var check = headerNames[5];


 var col2data = data.map(function(d) { return d[check] });


console.log(headerNames); 
  console.log(check); // outputs: ['aaa2', 'bbb2', 'ccc2']

  console.log(col2data);




});

