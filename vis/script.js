let USERS_DATA = "twitter-users-data.json";
let HISTORY_DATA = "twitter-history.json";
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
const USER_LINK = USER_DETAILS.querySelector("#user-link");

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

let jack_clicked = false;
const KEY1_BLOCK = window.document.getElementById("key1-user-details");
const KEY1_HELPER = window.document.getElementById("key1-helper");
const KEY1_DETAILS = window.document.getElementById("key1-details");
const KEY1_PROFILE_IMG = KEY1_DETAILS.querySelector("#profile-img");
const KEY1_DISPLAY_NAME = KEY1_DETAILS.querySelector("#display-name");
const KEY1_USERNAME = KEY1_DETAILS.querySelector("#username");
const KEY1_FOLLOWER_COUNT = KEY1_DETAILS.querySelector("#follower-count");

var key1 = d3.select("#key1")
  .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", "300px")

key1
    .append("circle")
    .attr("id", "key1-circle-jack")
    .attr("class", "node")
    .attr("cx", window.innerWidth / 3)
    .attr("cy", "150px")
    .attr("r", "100px")
    .attr("alt", "@jack")
    .style('fill', getNodeColor("Technology", "transp"))
    .style('stroke', getNodeColor("Technology", "opaque"))
    .on('mouseover', function () {
        if (!jack_clicked) {
            d3.select(this).raise().transition()
                .style('fill', getNodeColor("Technology", "opaque"))
            d3.select("#key1-label-jack").raise().transition()
                .style("opacity", 1);
        }
    })
    .on('mouseout', function () {
        if (!jack_clicked) {
            d3.select(this).raise().transition()
                .style('fill', getNodeColor("Technology", "transp"))
            d3.select("#key1-label-jack").transition()
                .style("opacity", 0);
        }
    })
    .on('click', function() {
        jack_clicked = true;
        d3.select(this).raise().transition()
            .style('fill', getNodeColor("Technology", "opaque"))
        d3.select("#key1-label-jack").raise().transition()
            .style("opacity", 1);
        KEY1_BLOCK.style.top = "50px";
        KEY1_HELPER.style.display = "none";
        KEY1_DETAILS.style.display = "flex";
        KEY1_PROFILE_IMG.style.border = "5px solid " + getNodeColor("Technology", "opaque");
        KEY1_PROFILE_IMG.src = "images/profile_images/jack.jpg";
        KEY1_DISPLAY_NAME.innerHTML = "jack"
        KEY1_USERNAME.innerHTML = "@jack";
        KEY1_FOLLOWER_COUNT.innerHTML = "6,573,752 FOLLOWERS";
    })

key1
    .append("text")
    .attr("id", "key1-label-jack")
    .attr("class", "text-handle")
    .attr("x", window.innerWidth / 3)
    .attr("y", "150px")
    .text("@jack")

const KEY2_BLOCK = window.document.getElementById("key2-user-details");
const KEY2_HELPER = window.document.getElementById("key2-helper");
const KEY2_DETAILS = window.document.getElementById("key2-details");
const KEY2_PROFILE_IMG = KEY2_DETAILS.querySelector("#profile-img");
const KEY2_DISPLAY_NAME = KEY2_DETAILS.querySelector("#display-name");
const KEY2_USERNAME = KEY2_DETAILS.querySelector("#username");
const KEY2_FOLLOWER_COUNT = KEY2_DETAILS.querySelector("#follower-count");

var key2 = d3.select("#key2")
  .append("svg")
    .attr("width", window.innerWidth)
    .attr("height", "300px")
    .append("g")

key2
    .append("circle")
    .attr("id", "key2-circle-noah")
    .attr("class", "node")
    .attr("cx", window.innerWidth / 3)
    .attr("cy", "180px")
    .attr("r", "50px")
    .attr("alt", "@noah")
    .style('fill', getNodeColor("Technology", "transp"))
    .style('stroke', getNodeColor("Technology", "opaque"))
    .on('mouseover', function () {
        d3.select(this).raise().transition()
            .style('fill', getNodeColor("Technology", "opaque"))
        d3.select("#key2-label-noah").raise().transition()
            .style("opacity", 1);
    })
    .on('mouseout', function () {
        d3.select(this).raise().transition()
            .style('fill', getNodeColor("Technology", "transp"))
        d3.select("#key2-label-noah").lower().transition()
            .style("opacity", 0);
    })
    .on("click", function() {
        KEY2_BLOCK.style.top = "50px";
        KEY2_HELPER.style.display = "none";
        KEY2_DETAILS.style.display = "flex";
        KEY2_PROFILE_IMG.style.border = "5px solid " + getNodeColor("Technology", "opaque");
        KEY2_PROFILE_IMG.src = "images/profile_images/noah.jpg";
        KEY2_DISPLAY_NAME.innerHTML = "noah"
        KEY2_USERNAME.innerHTML = "@noah";
        KEY2_FOLLOWER_COUNT.innerHTML = "48,191 FOLLOWERS";
    })

key2
    .append("text")
    .attr("id", "key2-label-noah")
    .attr("class", "text-handle")
    .attr("x", window.innerWidth / 3)
    .attr("y", "180px")
    .text("@noah")

key2
    .append("circle")
    .attr("id", "key2-circle-jack")
    .attr("class", "node")
    .attr("cx", window.innerWidth / 3)
    .attr("cy", "150px")
    .attr("r", "100px")
    .attr("alt", "@jack")
    .style('fill', getNodeColor("Technology", "transp"))
    .style('stroke', getNodeColor("Technology", "opaque"))
    .on('mouseover', function () {
        d3.select(this).raise().transition()
            .style('fill', getNodeColor("Technology", "opaque"))
        d3.select("#key2-label-jack").raise().transition()
            .style("opacity", 1);
    })
    .on('mouseout', function () {
        d3.select(this).raise().transition()
            .style('fill', getNodeColor("Technology", "transp"))
        d3.select("#key2-label-jack").lower().transition()
            .style("opacity", 0);
    })
    .on("contextmenu", function() {
        d3.event.preventDefault();
        d3.select(this).lower().transition()
            .duration('100')
            .style("fill", getNodeColor("Technology", "transp"))
        d3.select("#key2-label-jack").lower().transition()
            .duration('100')
            .style("opacity", 0);
    })

key2
    .append("text")
    .attr("id", "key2-label-jack")
    .attr("class", "text-handle")
    .attr("x", window.innerWidth / 3)
    .attr("y", "150px")
    .text("@jack")


// set the dimensions and margins of the graph
var margin = {top: 100, right: 280, bottom: 100, left: 250},
    width = window.innerWidth * 6 - margin.left - margin.right,
    height = window.innerHeight * 1 - margin.top - margin.bottom;

let isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight / 5) && rect.top >= -(window.innerHeight / 5);
}

let isDoneScrolling = (el, deltaY) => {
    if (deltaY > 0) {
        return Math.round(el.scrollLeft + window.innerWidth) >= el.scrollWidth + 16;
    }
    return el.scrollLeft === 0;
}

let chartContainer = document.getElementById("chart-container");
let chartOnScroll = (e) => {
    if (isElementInViewport(chartContainer) && !isDoneScrolling(chartContainer, e.deltaY)) {
        e.preventDefault();
        chartContainer.scrollIntoView();
        window.scrollTo(chartContainer.offsetLeft, chartContainer.offsetTop);
        window.document.body.style.overflowY = "hidden";
        chartContainer.scrollLeft += e.deltaY;
    } else if (isDoneScrolling(chartContainer, e.deltaY)) {
        window.document.body.style.overflowY = "scroll";
    }
}
window.addEventListener("wheel", (e) => {
    chartOnScroll(e);
}, {
    passive: false
})



// append the svg object to the body of the page
var svg = d3.select("#chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.json(USERS_DATA)
  .then(res => {

    const formatDate = d3.timeFormat("%d %b");
    let max = END_VIS_DATE - TWITTER_LAUNCH;
    let min = d3.min(Object.values(res.existing_users), d => Date.parse(d.user_data.created_at)) - TWITTER_LAUNCH
    let median = d3.median(Object.values(res.existing_users), d => Date.parse(d.user_data.created_at)) - TWITTER_LAUNCH

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

    d3.json(HISTORY_DATA)
    .then(res => {

        let text = svg.append('g')
            .selectAll("label")
            .data(res)
            .enter()
        
        text.append("text")
            .attr("class", "timeline-text")
            .attr("x", function (d) { return x(Date.parse(d.date) - TWITTER_LAUNCH); })
            .attr("y", 0)
            .text(function (d) { return d.content; })
            .call(wrap, 300)


        function wrap(text, width) {
            text.each(function() {
                var text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.1, // ems
                    x = text.attr("x"),
                    y = text.attr("y"),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", "0em");
                while (word = words.pop()) {
                    line.push(word);
                    tspan.text(line.join(" "));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(" "));
                        line = [word];
                        tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + "em").text(word);
                    }
                    tspan.attr("dx", -(tspan.node().getComputedTextLength() / 2));
                }
            });
        }

    });

    
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
        })
        .on('mouseout', function (d, i) {
            d3.select("#circle-" + d.name.toLowerCase()).transition()
                .style("fill", "rgba(29, 161, 242, 0.3)")
            d3.select(this).transition()
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
        })
        .on('mouseout', function (d, i) {
            if (activeUser !== d.name.toLowerCase()) {
                d3.select(this).transition()
                    .duration('100')
                    .style("fill", getNodeColor(d.user_data.industry, "transp"))
                d3.select("#label-" + d.name.toLowerCase()).transition()
                    .duration('100')
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
        })
        .on("click", function(d, i) {

            function followerCountCommas(x) {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            if (activeUser.length > 0) {
                if (res.existing_users[activeUser] !== undefined) {
                    d3.select("#circle-" + activeUser).transition()
                        .duration('100')
                        .style("fill", getNodeColor(res.existing_users[activeUser].user_data.industry, "transp"))
                    d3.select("#label-" + activeUser).transition()
                        .duration('100')
                        .style("opacity", 0);
                }
            } else {
                DETAILS_HELPER.style.display = "none";
                USER_DETAILS.style.display = "flex";
                USER_DETAILS.style.width = "200px";
            }
            activeUser = d.name.toLowerCase();
            PROFILE_IMG.src = "/images/profile_images/" + d.name.toLowerCase() + ".jpg";
            PROFILE_IMG.style.border = "5px solid " + getNodeColor(d.user_data.industry, "opaque");
            DISPLAY_NAME.innerHTML = d.user_data.display_name;
            USERNAME.innerHTML = "@" + d.name.toLowerCase();
            FOLLOWER_COUNT.innerHTML = followerCountCommas(d.user_data.follower_count) + " FOLLOWERS";
            USER_INDUSTRY.innerHTML = d.user_data.description ? d.user_data.description : d.user_data.industry;
            CHART.style.marginTop = ((-USER_DETAILS_BLOCK.offsetHeight / 2) - 250) + "px";
            USER_DETAILS_BLOCK.style.left = (window.innerWidth - USER_DETAILS_BLOCK.offsetWidth - 30) + "px";
            USER_DETAILS_BLOCK.style.top = (window.innerHeight - USER_DETAILS_BLOCK.offsetHeight - 30) + "px";
            USER_LINK.href = "https://twitter.com/" + d.name.toLowerCase();
        })
  })
  .catch(() => {

  })