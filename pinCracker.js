function generateCombinations(length, maxValue, baseArray){
	if(!maxValue){maxValue = 10}
	if(!baseArray){baseArray = Array(maxValue).fill(0).map((v,i)=>{return i})}
	if(length == 1){
		return baseArray;
	}
	var options = [];
	baseArray.forEach((v)=>{
		generateCombinations(length - 1, maxValue, baseArray).forEach((vv)=>{
			options.push([v,vv]);
		});
	});
	return options;
}
function flattenArray(array){
	if(array.length === 0){return []}

	var arr = [];
	array.forEach((v)=>{
		if(Array.isArray(v)){
			flattenArray(v).forEach((vv)=>{
				arr.push(vv);
			})
		}else{
			arr.push(v);
		}
	});
	return arr
}
module.exports = function(length,maxValue){
	return {
		pins: generateCombinations(length,maxValue + 1).map((v)=>{
			return flattenArray(v)
		}),
		contains: function(array){
			if(array && array.length > 0){
				this.pins = this.pins.filter((v)=>{
    	  			return array.every((vv)=>{
        	   			return v.includes(vv)
					}) 
				})
			}
			return this
		},
		excludes: function(array){
			if(array && array.length > 0){
				this.pins = this.pins.filter((v)=>{
					return !v.some((vv)=>{
						return array.includes(vv)
					})
				})
			}
			return this
		},
		startsWith: function(number){
			if(number && typeof number == 'number'){
				this.pins = this.pins.filter((v)=>{
					return v[0] == number
				})
			}
			return this
		},
		endsWith: function(number){
			if(number && typeof number == 'number'){
				this.pins = this.pins.filter((v)=>{
					return v[v.length - 1] == number
				})
			}
			return this
		},
		matches: function(object){
			if(object && typeof object === 'object'){
				this.pins = this.pins.filter((v)=>{
					var test = 0;
					var tests = 0;
					for(var key in object){
						if(object[key] != v[Number(key)]){
							return false
						}
					}
					return true
				})
			}
			return this
		},
		done: function(){
			return this.pins
		}
	}
}



