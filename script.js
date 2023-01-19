let data_url = "twitter-users-data.json";

// set the dimensions and margins of the graph
var margin = {top: 50, right: 100, bottom: 50, left: 100},
    width = window.innerWidth * 10 - margin.left - margin.right,
    height = window.innerHeight * 1 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.json(data_url)
  .then(res => {

    const formatDate = d3.timeFormat("%d %b");

    // Add X axis
    var x = d3.scaleTime()
        .domain([new Date(2006, 2, 21), Date.now()])
        .range([ 0, width ])

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues([
            new Date(2007, 0, 1),
            new Date(2008, 0, 1),
            new Date(2009, 0, 1),
            new Date(2010, 0, 1),
            new Date(2011, 0, 1),
            new Date(2012, 0, 1),
            new Date(2013, 0, 1),
            new Date(2014, 0, 1),
            new Date(2015, 0, 1),
            new Date(2016, 0, 1),
            new Date(2017, 0, 1),
            new Date(2018, 0, 1),
            new Date(2019, 0, 1),
            new Date(2020, 0, 1),
            new Date(2021, 0, 1),
            new Date(2022, 0, 1),
            new Date(2023, 0, 1),
        ]));

    // Add Y axis
    var y = d3.scaleLog()
        .domain([300000, 5000000])
        .range([ height, 0])

    svg.append("g")
        .call(d3.axisLeft(y).ticks(100));

    
    //let parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;
    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * Math.max(value - low1, 0) / (high1 - low1);
    }

    // Add dots
    let node = svg.append('g')
        .selectAll("dot")
        .data(Object.values(res.existing_users))
        .enter()
    
    let text = svg.append('g')
        .selectAll("label")
        .data(Object.values(res.existing_users))
        .enter()

    text.append("text")
        .attr("id", function (d) { return ("label-" + d.name.toLowerCase()); } )
        .attr("x", function (d) { return x(Date.parse(d.user_data.created_at)); } )
        .attr("y", function (d) { return y(d.name_popularity); } )
        .text(function (d) { return ("@" + d.name.toLowerCase()); } )
        .style("text-align", "center")
        .style("text-anchor", "middle")
        .style("opacity", "0.0")
        .style("z-index", 1000)
        .on('mouseover', function (d, i) {
          d3.select("#circle-" + d.name.toLowerCase()).transition()
               .duration('100')
               .style('fill', 'rgba(29, 161, 242, 1.0)');
          d3.select(this).transition()
               .duration('100')
               .style("opacity", 1);
        })
        .on('mouseout', function (d, i) {
            d3.select("#circle-" + d.name.toLowerCase()).transition()
                .duration('100')
                .style("fill", function(d) { return "rgba(29, 161, 242, " + map_range(1 / (Math.log(d.user_data.follower_count) + 1), 0.0, 1.0, 0.2, 0.8) + ")" })
            d3.select(this).transition()
                .duration('100')
                .style("opacity", 0);
        });
    

    node.append("circle")
        .attr("id", function (d) { return ("circle-" + d.name.toLowerCase()); } )
        .attr("cx", function (d) { return x(Date.parse(d.user_data.created_at)); } )
        .attr("cy", function (d) { return y(d.name_popularity); } )
        .attr("r", function(d) { return map_range(Math.log10(d.user_data.follower_count), 3, 10, 10, 250) })
        .attr("alt", function (d) { return (d.user_data.display_name); } )
        .style("fill", function(d) { return "rgba(29, 161, 242, " + map_range(1 / (Math.log(d.user_data.follower_count) + 1), 0.0, 1.0, 0.2, 0.8) + ")" })
        .style("z-index", -1)
        .on('mouseover', function (d, i) {
          d3.select(this).transition()
               .duration('100')
               .style('fill', 'rgba(29, 161, 242, 1.0)');
          d3.select("#label-" + d.name.toLowerCase()).transition()
               .duration('100')
               .style("opacity", 1);
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('100')
                .style("fill", function(d) { return "rgba(29, 161, 242, " + map_range(1 / (Math.log(d.user_data.follower_count) + 1), 0.0, 1.0, 0.2, 0.8) + ")" })
            d3.select("#label-" + d.name.toLowerCase()).transition()
                .duration('100')
                .style("opacity", 0);
        });

    

  })
  .catch(() => {

  })

//Read the data
d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv", function(data) {


  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.GrLivArea); } )
      .attr("cy", function (d) { return y(d.SalePrice); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

})