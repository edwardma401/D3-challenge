// @TODO: YOUR CODE HERE!

// When you want to start, read through class2. act. 3 before you begin.

// set svg width and height

// set margins for the chart

// set chart width and height

// asign svg properties to svg variable

// set chart group that will append 'g' and transform, translate chart margins.

// read csv file with then function.

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);


var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("data.csv").then(function(theData) {
    console.log(theData);
    
    theData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
      });
    
    var xLinearScale = d3.scaleLinear()
      .domain([0, d3.max(theData, d => d.healthcare)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(theData, d => d.poverty)])
      .range([height, 0]);
    
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
    
    chartGroup.append("g")
      .call(leftAxis);
    
    var circlesGroup = chartGroup.selectAll("circle")
      .data(theData)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.healthcare))
      .attr("cy", d => yLinearScale(d.poverty))
      .attr("r", "15")
      .attr("fill", "purple")
      .attr("opacity", ".5");
    
    
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Poverty");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Healthcare");
  }).catch(function(error) {
    console.log(error);


} )