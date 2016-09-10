/*var sourceData = [
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
]*/

var sourceDataString = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n"+
				   "2016/09/02 22:30:46\n"+
				   "cat1 10 9\n"+
				   "351055db-33e6-4f9b-bfe1-16f1ac446ac1\n"+
				   "2016/09/02 22:30:52\n"+
				   "cat1 10 9 2 -1\n"+
				   "cat2 2 3\n"+
				   "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n"+
				   "2016/09/02 22:31:02\n"+
				   "cat1 12 8 3 4";

function animalSplit(animalDataStr){
	var animalDataAttr = animalDataStr.split(" ");
	return animalDataAttr;
}

function strToObject(sourceDataString){
	var timeIDPattern = /^((\d|[a-f]){8})-((\d|[a-f]){4})-((\d|[a-f]){4})-((\d|[a-f]){4})-((\d|[a-f]){12})$/;//
	var timePattern = /^[0-9]{4}\/(0[1-9]{1}|1[0-2]{1})\/(0[1-9]{1}|[1-2]{1}[0-9]{1}|30)\s{1}(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/;
	var positionPattern = /^-?\w+\s(-?\d+\s-?\d+\s-?\d+\s-?\d+|-?\d+\s-?\d+)$/;

	var sourceDataAttr = sourceDataString.split('\n');

	var sourceData = [];
	var data, animal, animalDataAttr;
	var i;
	var flag;
	i = 0;
	while( i<sourceDataAttr.length){
		if(timeIDPattern.test(sourceDataAttr[i])){
			//console.log(sourceDataAttr[i]);
			data = {};
			data.id = sourceDataAttr[i];
			i ++;
			if(timePattern.test(sourceDataAttr[i])){
				data.time = sourceDataAttr[i];
				i ++;
			}else{
				flag = false;
				break;
			}
			data.animal = [];
			while(positionPattern.test(sourceDataAttr[i])){
				animalDataAttr = animalSplit(sourceDataAttr[i]);
				animal = {};
				animal.name = animalDataAttr[0];
				if(animalDataAttr.length === 3){
					animal.startX = parseInt(animalDataAttr[1]);
					animal.startY = parseInt(animalDataAttr[2]);
				}else{
					animal.preX = parseInt(animalDataAttr[1]);
					animal.preY = parseInt(animalDataAttr[2]);
					animal.disX = parseInt(animalDataAttr[3]);
					animal.disY = parseInt(animalDataAttr[4]);
				}
				data.animal.push(animal);
				i ++;
			}
			sourceData.push(data);
		}else{
			flag = false;
			break;
		}
	}
	if(flag === false){
		return null;
	}else{
		return sourceData;
	}
	//console.log(sourceData);
}




function getSnapshot(historyData, id){

	historyData = strToObject(historyData);
	if(historyData === null){
		return "Invalid format";
	}

	var data = historyData.sort(function(a, b){
		if(a.time > b.time){
			return false;
		}else{
			return true;
		}
	});

	var animals = [];
	var animalTemp;
	var i, j, k;
	var positionArr = [];
	var tempObj;
	for(i = 0; i<data.length; i++){
		animalTemp = data[i].animal;
		tempObj = {};
		for(j=0; j<animalTemp.length; j++){
			
			if(animalTemp[j].startX !== undefined){
				animals.push(animalTemp[j].name);

				tempObj[animalTemp[j].name] = [animalTemp[j].startX, animalTemp[j].startY]
			}else{
				tempObj[animalTemp[j].name] = [animalTemp[j].preX, animalTemp[j].preY,animalTemp[j].disX,  animalTemp[j].disY];
			}
		}
		positionArr.push(tempObj);
	}
	console.log(positionArr);
	var flag = true;
	for(i=1; i<positionArr.length; i++){
		for(key in positionArr[i]){
			if(positionArr[i][key].length === 2){
				j = i-1;
				while(positionArr[j][key] === undefined && j>=0){
					j --;
				}
				if(j >= 0){
					if(positionArr[j][key][1] !== positionArr[i][key][1]||positionArr[j][key][2] !== positionArr[i][key][2]){
						flag = false;
						break;
					}
				}
			}else{
				j = i-1;
				while(positionArr[j][key] === undefined && j>=0){
					j --;
				}
				if(j >= 0){
					if(positionArr[j][key][1] !== positionArr[i][key][1]+positionArr[i][key][3]||positionArr[j][key][2] !== positionArr[i][key][2]+positionArr[i][key][4]){
						flag = false;
						break;
					}
				}
			}
		}
		if(flag === false){
			break;
		}
	}
	if(flag === false){
		return "Conflict found at "+id;
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
	
	var cur = 0;
	while(data[cur].id != id){
		cur ++;
	}

	for(i=0; i<animals.length; i++){
		for(j=0; j<data.length; j ++){
			animalTemp = data[j].animal;
			
			for(k=cur; k<animalTemp.length; k++){
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

var result = getSnapshot(sourceDataString, "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155");
console.log(result);

