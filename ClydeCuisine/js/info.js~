		function get_cookie(cookie_name){
  			cookie_string = document.cookie;
  			if (cookie_string.length != 0) {
    			var cookie_value = cookie_string.match(cookie_name + '=([^;]*)' );
    			return decodeURIComponent(cookie_value[1]);
  		}
  		return "couldn't find it" ;
		}  
		
		
		function delete_cookie ( cookie_name){
  			document.cookie = cookie_name + "=; max-age=0; path=/";
		}
		
		function getDetails(csvData){
			for(i = 0; i < csvData.length; i++){
				if(csvData[i].Bus_ID == bar){
					name = csvData[i].BusinessName;
					address = csvData[i].AddressLine2;
					postCode = csvData[i].PostCode;
					cost = csvData[i].Cost;
					quality = csvData[i].Quality;
					cuisine = csvData[i].Food_Type_1;
					if(csvData[i].Food_Type_2 != ''){
						cuisine += " | " + csvData[i].Food_Type_2;
					}
					if(csvData[i].Food_Type_3 != ''){
						cuisine += " | " + csvData[i].Food_Type_3;
					}
				}
			}
		}
		
		function logAll(){
			console.log(name);
			console.log(address);
			console.log(quality);
			console.log(postCode);
		}
		
		function setupPage(){
			d3.select(".name").text(name);
			d3.select(".cuisines").text(cuisine);
			d3.select(".price").text("Price range: " + cost);
			d3.select(".rating").text("Quality: " + quality);
			d3.select(".address").text("\nAddress\n" + address);
			d3.select(".post-code").text(postCode);
		}
		
		
