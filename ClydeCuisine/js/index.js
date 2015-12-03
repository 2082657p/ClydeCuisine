	
	 function set_cookie ( cookie_name, cookie_value, lifespan_in_days)
			{
  			document.cookie = cookie_name + "=" + encodeURIComponent(cookie_value)+
      			"; max-age=" + 60 * 60 * 24 * lifespan_in_days +
      			"; path=/";
			} 
		function get_cookie ( cookie_name ){
  			cookie_string = document.cookie;
  			if (cookie_string.length != 0) {
    			var cookie_value = cookie_string.match(cookie_name + '=([^;]*)' );
    			return decodeURIComponent(cookie_value[1]);
  		}
  		return "couldn't find it" ;
		} 
			
		function delete_cookie(cookie_name){
  			document.cookie = cookie_name + "=; max-age=0; path=/";
		}
		
		
		



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
	return outArray;
}

function getRandomWithCuisine(csvData, num, cuisine){
	var outArray = [];
	while (outArray.length < num){
		var rand = Math.floor(Math.random() * csvData.length);
		if(_.indexOf(outArray, csvData[rand]) == -1 &&( csvData[rand].Food_Type_1 == cuisine
													 || csvData[rand].Food_Type_2 == cuisine
													 || csvData[rand].Food_Type_3 == cuisine)){
			outArray[outArray.length] = csvData[rand];
		}
	}
	return outArray;
}

function getRandomCuisine(csvData, num){
	var outArray = [];
	while (outArray.length < num){
		var rand = Math.floor(Math.random() * csvData.length);
		if(_.indexOf(outArray, csvData[rand].Food_Type_1) == -1){
			outArray[outArray.length] = csvData[rand].Food_Type_1;
		}
	}
	return outArray;	
}

function refineCuisine(cuisine){
	var out = [];
	for(i = 0; i < csvDataMain.length; i++){
		if(csvDataMain[i].Food_Type_1 == cuisine || csvDataMain[i].Food_Type_2 == cuisine || csvDataMain[i].Food_Type_3 == cuisine){
			out[out.length] = csvDataMain[i];
		}
	}
	csvData = out;
	refresh();
}

function refineQualityUp(){
	var numRange = _.range(qualityStart, 5);
	var out = [];
	for(i = 0; i<csvData.length; i++){
		if(numRange.indexOf(csvData[i].Quality) > -1){
			out[out.length] = csvData[i];
		}
	}
	if(costStart < 5){
		qualityStart++;
	}
	csvData = out;
	refresh();
}

function refineQualityDown(){
	var numRange = _.range(1, qualityStart);
	var out = [];
	for(i = 0; i<csvData.length; i++){
		if(numRange.indexOf(csvData[i].Quality) > -1){
			out[out.length] = csvData[i];
		}
	}
	if(costStart > 1){
		qualityStart--;
	}
	csvData = out;
	refresh();
}

function refineCostUp(){
	var numRange = _.range(costStart, 5);
	var out = [];
	for(i = 0; i<csvData.length; i++){
		if(numRange.indexOf(csvData[i].Cost) > -1){
			out[out.length] = csvData[i];
		}
	}
	if(costStart < 5){
		costStart++;
	}
	csvData = out;
	refresh();
}

function refineCostDown(){
	var numRange = _.range(1, costStart);
	var out = [];
	for(i = 0; i<csvData.length; i++){
		if(numRange.indexOf(csvData[i].Cost) > -1){
			out[out.length] = csvData[i];
		}
	}
	if(costStart > 1){
		costStart--;
	}
	csvData = out;
}

function flushRefinements(){
	csvData = csvDataMain;
}

function refresh(){
	d3.selectAll(".circle-under").transition().duration(900).style("opacity", 0).remove();
	d3.selectAll(".circle").transition().duration(900).style("opacity", 0).remove();
	d3.selectAll(".restaurant-name").transition().duration(900).style("opacity", 0).remove();
	var results = getRandom(csvData, 4);
	var cuisines = getRandomCuisine(csvDataMain, 2);
	addBubble(results[0], 20, 29);
	addBubble(results[1], 50, 29);
	addBubble(results[2], 80, 29);
	addBubble(results[3], 20, 71);
	addCuisineBubble(cuisines[0], 50, 71);
	addCuisineBubble(cuisines[1], 80, 71);
}

function refreshRestOnly(){
	d3.selectAll(".circle-under").transition().duration(900).style("opacity", 0).remove();
	d3.selectAll(".circle").transition().duration(900).style("opacity", 0).remove();
	d3.selectAll(".restaurant-name").transition().duration(900).style("opacity", 0).remove();
	var results = getRandom(csvData, 6);
	addBubble(results[0], 20, 29);
	addBubble(results[1], 50, 29);
	addBubble(results[2], 80, 29);
	addBubble(results[3], 20, 71);
	addBubble(results[4], 50, 71);
	addBubble(results[5], 80, 71);
}

function itemPos(item){
	var out = item+(Math.floor(Math.random() * 10));
	return out;
}




                               
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
svgContainer.append("foreignObject")
			.style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
			.attr("x", (centreX-9)+"%")
			.attr("y", (centreY-6)+"%")
			.attr("width", "18%")
			.attr("height", 100)
			.attr("class", "restaurant-name")
            .text(textAdd.BusinessName);
svgContainer.append("foreignObject")
			.style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
			.attr("x", (centreX-9)+"%")
			.attr("y", (centreY)+"%")
			.attr("width", "18%")
			.attr("height", 100)
			.attr("class", "quality-name")
            .text("Quality: "+textAdd.Quality);
svgContainer.append("circle")
            .attr("cx", centreX+"%")
            .attr("cy", centreY+"%")
            .attr("r", "12%")
            .attr("class", "circle")
            .attr("stroke", "#6699ff")
            .on('mouseover', function(d){
				var resultsSmall = getRandom(csvData, 3);
                addSmallCircle(centreX-11.5, centreY-18.5, resultsSmall[0]);
    			addSmallCircle(centreX-14.5, centreY, resultsSmall[1]);
                addSmallCircle(centreX-11.5, centreY+18.5, resultsSmall[2]);
                addSmallCircleFunction(centreX+11.5, centreY-18.5, "Too Expensive");
             	addSmallCircleFunction(centreX+14.5, centreY, "More Upmarket");
             	addSmallCircleFunction(centreX+11.5, centreY+18.5, "Change Cuisine");
                })
			 .on('click', function(d){
			 	delete_cookie("this_restaurant");
			 	set_cookie("this_restaurant", textAdd.Bus_ID, 7);
			 	window.location.href = "info.html";
			 })
             .attr("stroke-width", 3);                      
}

function addCuisineBubble(textAdd, centreX, centreY){
svgContainer.append("circle")
			.style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
            .attr("cx", centreX+"%")
            .attr("cy", centreY+"%")
            .attr("r", "12%")
            .attr("class", "circle-under")
            .attr("stroke", "#6699ff")
            .attr("stroke-width", 3);
svgContainer.append("foreignObject")
			.style("opacity", 0)
			.transition().duration(900).style("opacity", 1)
			.attr("x", (centreX-9)+"%")
			.attr("y", (centreY-6)+"%")
			.attr("width", "18%")
			.attr("height", 100)
			.attr("class", "restaurant-name")
            .text(textAdd);
svgContainer.append("circle")
            .attr("cx", centreX+"%")
            .attr("cy", centreY+"%")
            .attr("r", "12%")
            .attr("class", "circle")
            .attr("stroke", "#6699ff")
            .on('mouseover', function(d){
				var resultsSmall = getRandomWithCuisine(csvData, 3, textAdd);
                addSmallCircle(centreX-11.5, centreY-18.5, resultsSmall[0]);
    			addSmallCircle(centreX-14.5, centreY, resultsSmall[1]);
                addSmallCircle(centreX-11.5, centreY+18.5, resultsSmall[2]);
                addSmallCircleFunction(centreX+11.5, centreY-18.5, "Too Steep");
             	addSmallCircleFunction(centreX+14.5, centreY, "More Upmarket");
             	addSmallCircleFunction(centreX+11.5, centreY+18.5, "Change Cuisine");
                })
			 .on('click', function(d){
			 	refineCuisine(textAdd);
			 })
             .attr("stroke-width", 3);                      
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
   svgContainer.append("circle")
				.style("opacity", 0)
    			.attr("cx", (x)+"%")
                .attr("cy", (y)+"%")
                .attr("r", "6%")
                .on('click', function(d){
			 		delete_cookie("this_restaurant");
			 		set_cookie("this_restaurant", textBit.Bus_ID, 7);
			 		window.location.href = "info.html";
			 	})
                .attr("class", "circle-small-cover");
}

function addSmallCircleFunction(x, y, textBit){
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
               .text(textBit);
   svgContainer.append("circle")
				.style("opacity", 0)
    			.attr("cx", (x)+"%")
                .attr("cy", (y)+"%")
                .attr("r", "6%")
                .on('click', function(d){
			 		switch(textBit){
			 			case "Too Steep":
			 				refineCostDown();
			 				break;
			 			case "More Upmarket":
			 				refineCostDown();
			 				break;
			 			case "Change Cuisine":
			 				refineCuisine(getRandomCuisine(csvDataMain, 1));
			 				break;
			 		}
			 	})
                .attr("class", "circle-small-cover");
}

function searchFunc(){
	var out = [];
	var search = document.getElementById("search-bar").value;
	for(i = 0; i<csvDataMain.length; i++){
		if((csvDataMain[i].BusinessName).indexOf(string) > -1
		|| (csvDataMain[i].Food_Type_1).indexOf(string) > -1
		|| (csvDataMain[i].Food_Type_2).indexOf(string) > -1
		|| (csvDataMain[i].Food_Type_3).indexOf(string) > -1){
			out[out.length] = csvDataMain[i];
		}
	csvData = out;
	refreshRestOnly();
	}
}


// perform function on load


