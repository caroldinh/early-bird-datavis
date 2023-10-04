let data_url = "twitter-users-data.json";
const TWITTER_LAUNCH = new Date(2006, 2, 21);
const END_VIS_DATE = new Date(2022, 9, 27)

const USER_DETAILS_BLOCK = window.document.getElementById("user-details");
USER_DETAILS_BLOCK.style.left = (window.innerWidth - USER_DETAILS_BLOCK.offsetWidth - 60) + "px";
USER_DETAILS_BLOCK.style.top = (window.innerHeight - USER_DETAILS_BLOCK.offsetHeight - 30) + "px";
const CHART = window.document.getElementById("chart");
const DETAILS_HELPER = window.document.getElementById("helper");
const USER_DETAILS = window.document.getElementById("details");
const PROFILE_IMG = USER_DETAILS.querySelector("#profile-img");
const DISPLAY_NAME = USER_DETAILS.querySelector("#display-name");
const USERNAME = USER_DETAILS.querySelector("#username");
const FOLLOWER_COUNT = USER_DETAILS.querySelector("#follower-count");
const USER_INDUSTRY = USER_DETAILS.querySelector("#user-industry");

let activeUser = "";

let techColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--tech-color-${opacity}`);
let unknownColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--unknown-color-${opacity}`);
let businessColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--business-color-${opacity}`);
let artsColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--arts-color-${opacity}`);
let vcColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--vc-color-${opacity}`);
let mediaColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--media-color-${opacity}`);
let communityColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--community-color-${opacity}`);
let bloggerColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--blogger-color-${opacity}`);
let fineArtsColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--fine-arts-color-${opacity}`);
let researchColor = (opacity) => getComputedStyle(document.documentElement).getPropertyValue(`--research-color-${opacity}`);

let getNodeColor = (industry, opacity) => {
    if (industry === "Technology") {
        return techColor(opacity);
    } else if (industry === "Business") {
        return businessColor(opacity);
    } else if (industry === "Arts / Entertainment") {
        return artsColor(opacity);
    } else if (industry === "VC / Investing") {
        return vcColor(opacity);
    } else if (industry === "Media / Journalism") {
        return mediaColor(opacity);
    } else if (industry === "Community / Company") {
        return communityColor(opacity);
    } else if (industry === "Blogger / Content Creator") {
        return bloggerColor(opacity);
    } else if (industry === "Fine Arts / Small Business") {
        return fineArtsColor(opacity);
    } else if (industry === "Research / Education") {
        return researchColor(opacity);
    }
    return unknownColor(opacity);
}

// set the dimensions and margins of the graph
var margin = {top: 100, right: 280, bottom: 100, left: 250},
    width = window.innerWidth * 6 - margin.left - margin.right,
    height = window.innerHeight * 1 - margin.top - margin.bottom;

let isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= 0;
}

let isDoneScrolling = (el, deltaY) => {
    if (deltaY > 0) {
        console.log(el.scrollLeft + window.innerWidth, el.scrollWidth + 16)
        return Math.round(el.scrollLeft + window.innerWidth) >= el.scrollWidth + 16;
    }
    return el.scrollLeft === 0;
}

let chartContainer = document.getElementById("chart-container");
let chartOnScroll = (e) => {
    if (isElementInViewport(chartContainer) && !isDoneScrolling(chartContainer, e.deltaY)) {
        e.preventDefault();
        chartContainer.scrollIntoView();
        window.document.body.style.overflowY = "hidden";
        chartContainer.scrollLeft += e.deltaY;
    } else if (isDoneScrolling(chartContainer, e.deltaY)) {
        window.document.body.style.overflowY = "scroll";
    }
}
window.addEventListener("wheel", (e) => {
    chartOnScroll(e);
})


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
    let max = END_VIS_DATE - TWITTER_LAUNCH;
    let min = d3.min(Object.values(res.existing_users), d => Date.parse(d.user_data.created_at)) - TWITTER_LAUNCH
    let median = d3.median(Object.values(res.existing_users), d => Date.parse(d.user_data.created_at)) - TWITTER_LAUNCH
    console.log(min);
    //console.log(Date.parse("2008-07-07T23:12:53.000Z") - TWITTER_LAUNCH);

    // Add X axis
    var x = d3.scaleSqrt()
        .domain([ min, max ])
        .range([ 0, width ]) 

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
                .ticks(50)
                .tickFormat(x => {
                    let date = (new Date(x + TWITTER_LAUNCH.getTime()));
                    return date.toLocaleString('default', { month: 'short' }) + " " 
                    + date.getFullYear()
                }));

    // Add Y axis
    var y = d3.scaleLog()
        .domain([300000, 5000000])
        .range([ height, 0])

    svg.append("g")
        .call(d3.axisLeft(y).ticks(10).tickFormat(y => y.toLocaleString("en-US")));
    

    svg.append("text")
        .attr("class", "axis-title")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 40)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Popularity of Name");

    svg.append("text")
        .attr("class", "axis-subtitle")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 72)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("(in # of occurrances between 1923 – 2023)");

    svg.append("text")
        .attr("class", "axis-title")
        .attr("x", window.innerWidth / 2 - margin.left)
        .attr("y", height + margin.bottom / 2)
        .attr("dy", ".75em")
        .text("Date Joined Twitter");

    svg.append("text")
        .attr("class", "axis-subtitle")
        .attr("x", window.innerWidth / 2 - margin.left)
        .attr("y", height + margin.bottom / 2 + 32)
        .attr("dy", ".75em")
        .text("(April 2006 – October 2022)");

    
    //let parseDate = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ").parse;
    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * Math.max(value - low1, 0) / (high1 - low1);
    }

    let getNodeRadius = (d) => map_range(Math.log10(d.user_data.follower_count), 3, 10, 10, 250);

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
        .attr("class", "text-handle")
        .attr("id", function (d) { return ("label-" + d.name.toLowerCase()); } )
        .attr("x", function (d) { 
            return x(Date.parse(d.user_data.created_at) - TWITTER_LAUNCH); } )
        .attr("y", function (d) { 
            if ((1 + d.name.length) * 10 > 2 * getNodeRadius(d)) {
                return y(d.name_popularity) - 8 - getNodeRadius(d);
            }
            return y(d.name_popularity) 
        })
        .text(function (d) { return ("@" + d.name.toLowerCase()); } )
        .on('mouseover', function (d, i) {
          d3.select("#circle-" + d.name.toLowerCase()).transition()
               .style('fill', 'rgba(29, 161, 242, 1.0)');
          d3.select(this).transition()
               .style("opacity", 1);
            d3.select("#bg-" + d.name.toLowerCase()).transition()
                .style("opacity", 1);
        })
        .on('mouseout', function (d, i) {
            d3.select("#circle-" + d.name.toLowerCase()).transition()
                .style("fill", "rgba(29, 161, 242, 0.3)")
            d3.select(this).transition()
                .style("opacity", 0);
            d3.select("#bg-" + d.name.toLowerCase()).transition()
                .style("opacity", 0);
        })

    node.append("circle")
        .attr("class", "node")
        .attr("id", function (d) { return ("circle-" + d.name.toLowerCase()); } )
        .attr("cx", function (d) { 
            return x(Date.parse(d.user_data.created_at) - TWITTER_LAUNCH);
        })
        .attr("cy", function (d) { return y(d.name_popularity); } )
        .attr("r", function(d) { return getNodeRadius(d); })
        .attr("alt", function (d) { return (d.user_data.display_name); } )
        .style('fill', function(d) { return getNodeColor(d.user_data.industry, "transp"); })
        .style('stroke', function(d) { return getNodeColor(d.user_data.industry, "opaque"); })
        .on('mouseover', function (d, i) {
          d3.select(this).raise().transition()
               .style('fill', getNodeColor(d.user_data.industry, "opaque"))
          d3.select("#label-" + d.name.toLowerCase()).transition()
               .style("opacity", 1);
            d3.select("#bg-" + d.name.toLowerCase()).transition()
                .style("opacity", 1);
        })
        .on('mouseout', function (d, i) {
            if (activeUser !== d.name.toLowerCase()) {
                d3.select(this).transition()
                    .duration('100')
                    .style("fill", getNodeColor(d.user_data.industry, "transp"))
                d3.select("#label-" + d.name.toLowerCase()).transition()
                    .duration('100')
                    .style("opacity", 0);
                d3.select("#bg-" + d.name.toLowerCase()).transition()
                    .style("opacity", 0);
            }
        })
        .on("contextmenu", function(d, i) {
            d3.event.preventDefault();
            d3.select(this).lower();
            d3.select(this).transition()
                .duration('100')
                .style("fill", getNodeColor(d.user_data.industry, "transp"))
            d3.select("#label-" + d.name.toLowerCase()).transition()
                .duration('100')
                .style("opacity", 0);
            d3.select("#bg-" + d.name.toLowerCase()).transition()
                .style("opacity", 0);
        })
        .on("click", function(d, i) {
            console.log(activeUser);
            if (activeUser.length > 0) {
                if (res.existing_users[activeUser] !== undefined) {
                    d3.select("#circle-" + activeUser).transition()
                        .duration('100')
                        .style("fill", getNodeColor(res.existing_users[activeUser].user_data.industry, "transp"))
                    d3.select("#label-" + activeUser).transition()
                        .duration('100')
                        .style("opacity", 0);
                    d3.select("#bg-" + activeUser).transition()
                        .style("opacity", 0);
                }
            } else {
                DETAILS_HELPER.style.display = "none";
                USER_DETAILS.style.display = "flex";
            }
            activeUser = d.name.toLowerCase();
            fetch(d.user_data.profile_image).then(function(response) {
                return response;
            }).then(function(data) {
                if (data.ok) {
                    PROFILE_IMG.src = d.user_data.profile_image;
                } else {
                    PROFILE_IMG.src = "default.png";
                }
            }).catch(function(err) {
            });
            PROFILE_IMG.style.border = "5px solid " + getNodeColor(d.user_data.industry, "opaque");
            DISPLAY_NAME.innerHTML = d.user_data.display_name;
            USERNAME.innerHTML = "@" + d.name.toLowerCase();
            FOLLOWER_COUNT.innerHTML = d.user_data.follower_count + " FOLLOWERS";
            USER_INDUSTRY.innerHTML = d.user_data.industry;
            CHART.style.marginTop = ((-USER_DETAILS_BLOCK.offsetHeight / 2) - 250) + "px";
            USER_DETAILS_BLOCK.style.left = (window.innerWidth - USER_DETAILS_BLOCK.offsetWidth - 30) + "px";
            USER_DETAILS_BLOCK.style.top = (window.innerHeight - USER_DETAILS_BLOCK.offsetHeight - 30) + "px";
        })
  })
  .catch(() => {

  })