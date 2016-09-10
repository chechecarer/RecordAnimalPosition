var sourceData = [
	{
		id: "e4e87cb2-8e9a-4749-abb6-26c59344dfee",
		time: "2016/09/02 22:30:46",
		animal: [
			{
				name: "cat1",
				startX: 10,
				startY: 9
			}
		]
	},
	{
		id: "351055db-33e6-4f9b-bfe1-16f1ac446ac1",
		time: "2016/09/02 22:30:52",
		animal: [
			{
				name: "cat1",
				preX: 10,
				preY: 9,
				disX: 2,
				disY: -1
			},
			{
				name: "cat2",
				startX: 2,
				startY: 3
			}
		]
	},
	{
		id: "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155",
		time: "2016/09/02 22:31:02",
		animal: [
			{
				name: "cat1",
				preX: 12,
				preY: 8,
				disX: 3,
				disY: 4
			}
		]
	}
]



function caculateAnimalPosition(historyData, id){
	var data = historyData.sort(function(a, b){
		if(a.time > b.time){
			return false;
		}else{
			return true;
		}
	});
	//console.log(data);
	var animals = [];
	var animalTemp;
	var i, j, k;
	for(i=0; i<data.length; i++){
		animalTemp = data[i].animal;
		//console.log(animalTemp);
		for(j=0; j<animalTemp.length; j++){
			if(animalTemp[j].startX !== undefined){
				animals.push(animalTemp[j].name);
			}
		}

	}
	animals = animals.sort(function(a, b){
		if(a < b){
			return false;
		}else{
			return true;
		}
	});

	var result = [];
	var animalInfo;
	//console.log(animals);
	for(i=0; i<animals.length; i++){
		for(j=0; j<data.length; j ++){
			animalTemp = data[j].animal;
			//console.log(animalTemp);
			for(k=0; k<animalTemp.length; k++){
				if(animalTemp[k].name === animals[i]){
					if(animalTemp[k]["startX"] === undefined){
						animalInfo = [animalTemp[k].name, animalTemp[k].preX+animalTemp[k].disX, animalTemp[k].preY+animalTemp[k].disY];
						result.push(animalInfo);
					}else{
						animalInfo = [animalTemp[k].name, animalTemp[k].startX, animalTemp[k].startY];
						result.push(animalInfo);
					}
					break;
				}
			}
			if(k<animalTemp.length){
				break;
			}
			
		}
	}

	return result;
}

var result = caculateAnimalPosition(sourceData, "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155");
console.log(result);

