var csvData;

d3.csv("/home/jack/Documents/IS(H)/ClydeCuisineMajor/Templates/data_new.csv", function(data) {
	csvData = data;	
});

function printAll(csvData){
	for(i = 0; i < csvData.length; i++){
		console.log(csvData[i]);
	}
}

function getRandom(csvData, num){
	var outArray = [];
	while (outArray.length < num){
		var rand = Math.floor(Math.random() * csvData.length);
		if(_.indexOf(outArray, csvData[rand]) == -1){
			outArray[outArray.length] = csvData[rand];
		}
	}
	for(i = 0; i < outArray.length; i++){
		console.log(outArray[i].BusinessName);
	}
	return outArray;
}

function itemPos(item){
	var out = item+(Math.floor(Math.random() * 10));
	return out;
}





// Drawing with svg

// Make an SVG Container
var svgContainer = d3.select("body").append("svg")
                                    .attr("width", "100%")
                                    .attr("height", "100%")
                                    .attr("fill", "#6699ff")
                                    .classed("svg-content-responsive", true); 
var bg = svgContainer.append("rect")
                         .attr("x", 0)
                         .attr("y", 0)
                         .attr("width", "100%")
                         .attr("height", "100%")
                         .on('mouseover', function(d){
                         	d3.selectAll(".circle-small").transition().duration(900).style("opacity", 0).remove();
                         	d3.selectAll(".text-small").transition().duration(900).style("opacity", 0).remove();
                         })
                         .classed("filled", true);

                               
function addBubble(textAdd, centreX, centreY){
svgContainer.append("circle")
			.style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
                         .attr("cx", centreX+"%")
                         .attr("cy", centreY+"%")
                         .attr("r", "12%")
                         .attr("class", "circle-under")
                         .attr("stroke", "#6699ff")
                         .attr("stroke-width", 3);

// Draw a Circle
var text = svgContainer.append("foreignObject")
					   .style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
					   .attr("x", (centreX-9)+"%")
					   .attr("y", (centreY-6)+"%")
					   .attr("width", "18%")
					   .attr("height", 100)
					   .attr("class", "restaurant-name")
                       .text(textAdd.BusinessName);
var circle = svgContainer.append("circle")
                         .attr("cx", centreX+"%")
                         .attr("cy", centreY+"%")
                         .attr("r", "12%")
                         .attr("class", "circle")
                         .attr("stroke", "#6699ff")
                         .on('mouseover', function(d){
                         	var resultsSmall = getRandom(csvData, 6);
                         	addSmallCircle(centreX-11.5, centreY-18.5, resultsSmall[0]);
    						addSmallCircle(centreX-14.5, centreY, resultsSmall[1]);
                         	addSmallCircle(centreX-11.5, centreY+18.5, resultsSmall[2]);
                         	addSmallCircle(centreX+11.5, centreY-18.5, resultsSmall[3]);
                         	addSmallCircle(centreX+14.5, centreY, resultsSmall[4]);
                         	addSmallCircle(centreX+11.5, centreY+18.5, resultsSmall[5]);
						 })
                         .attr("stroke-width", 3);

// Add text

                       
}

function addSmallCircle(x, y, textBit){
	svgContainer.append("circle")
	.style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
    			.attr("cx", (x)+"%")
                .attr("cy", (y)+"%")
                .attr("r", "6%")
                .attr("class", "circle-small");
   svgContainer.append("foreignObject")
   .style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
			   .attr("x", (x-3)+"%")
			   .attr("y", (y-3)+"%")
			   .attr("width", "6%")
			   .attr("height", 100)
			   .attr("class", "text-small")
               .text(textBit.BusinessName);
}

var svgDefs = svgContainer.append('defs');

var mainGradient = svgDefs.append('linearGradient')
						  .attr('id', 'mainGradient');

mainGradient.append('stop')
			.attr('class', 'stop-top')
			.attr('offset', '0');

mainGradient.append('stop')
			.attr('class', 'stop-bottom')
			.attr('offset', '1');
			









