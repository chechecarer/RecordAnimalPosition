
/*
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
*/
function strToArr(animalDataStr){
	var animalDataAttr = animalDataStr.split(" ");
	animalDataAttr = animalDataAttr.filter(function(item){
		if(item !== " "){
			return true;
		}
	});
	return animalDataAttr;
}

function isTimeIDFormat(str){
	var timeIDPattern = /^((\d|[a-f]){8})-((\d|[a-f]){4})-((\d|[a-f]){4})-((\d|[a-f]){4})-((\d|[a-f]){12})$/;
	if(timeIDPattern.test(str)){
		return true;
	}else{
		return false;
	}

}

function isTimeFormat(str){
	var timePattern = /^[0-9]{4}\/(0[1-9]{1}|1[0-2]{1})\/(0[1-9]{1}|[1-2]{1}[0-9]{1}|30)\s{1}(0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/;
	if(timePattern.test(str)){
		return true;
	}else{
		return false;
	}
}

function isPositionFormat(str){
	var positionPattern = /^\w+\s(-?\d+\s-?\d+\s-?\d+\s-?\d+|-?\d+\s-?\d+)$/;
	if(positionPattern.test(str)){
		return true;
	}else{
		return false;
	}
}

function sourceDataSortByTimeDesc(sourceData){
	sourceData = sourceData.sort(function(a, b){
		if(a.time > b.time){
			return false;
		}else{
			return true;
		}
	});
	return sourceData;

}

function animalSortOrderByIDASC(animals){
	animals = animals.sort(function(a, b){
		if(a < b){
			return false;
		}else{
			return true;
		}
	});
	return animals;
}


function isFormatCorrectAndTransferToArr(sourceDataString){

	var sourceDataAttr = sourceDataString.split('\n');
	var sourceData = [];
	var data, animal, animalDataAttr;
	var i;
	var flag = true;

	i = 0;
	while( i<sourceDataAttr.length){
		if(isTimeIDFormat(sourceDataAttr[i])){
			
			data = {};
			data.id = sourceDataAttr[i++];

			if(isTimeFormat(sourceDataAttr[i])){
				data.time = sourceDataAttr[i++];
		
			}else{
				flag = false;
				break;
			}

			data.animal = [];
			while(isPositionFormat(sourceDataAttr[i])){
				animalDataAttr = strToArr(sourceDataAttr[i++]);
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
}

function isDataCorrect(positionArr){

	var flag = true;
	var i = 1;
	while(i<positionArr.length){
		for(var animal in positionArr[i]){
			if(positionArr[i][animal].length === 2){
				j = i-1;
				while(j>=0 && positionArr[j][animal] === undefined){
					j --;
				}
				if(j >= 0){
					if(positionArr[j][animal][0] !== positionArr[i][animal][0]||positionArr[j][animal][1] !== positionArr[i][animal][1]){
						flag = false;
						break;
					}
				}
			}else{
				j = i-1;
				while(j>=0 && positionArr[j][animal] === undefined ){
					j --;
				}
				if(j >= 0){
					if(positionArr[j][animal][0] !== positionArr[i][animal][0]+positionArr[i][animal][2]||positionArr[j][animal][1] !== positionArr[i][animal][1]+positionArr[i][animal][3]){
						flag = false;
						break;
					}
				}
			}
		}
		if(flag === false){
			break;
		}
		i++;
	}
	return flag;

}

function idDataCorrectWithGetAnimalsInfoAndPositionInfoFromArrData(data, id){
	
	var i, j;
	var positionArr = [];
	
	var startPos = 0;
	var isStart = false;
	var animals = [];
	var result, isdataCorrect;

	var animalTemp;
	var tempObj;
	
	for(i = 0; i<data.length; i++){
		if(data[i].id === id){
			startPos = i;
			isStart = true;
			console.log('start')
		}

		animalTemp = data[i].animal;
		tempObj = {};
		for(j=0; j<animalTemp.length; j++){
			
			if(animalTemp[j].startX !== undefined){

				tempObj[animalTemp[j].name] = [animalTemp[j].startX, animalTemp[j].startY];

			}else{
				tempObj[animalTemp[j].name] = [animalTemp[j].preX, animalTemp[j].preY,animalTemp[j].disX,  animalTemp[j].disY];
			}
			if(isStart){
				if(animals.indexOf(animalTemp[j].name) === -1){
					animals.push(animalTemp[j].name);
				}
				
			}
		}
		positionArr.push(tempObj);
 		
	}

	isdataCorrect = isDataCorrect(positionArr);

	
	if(isdataCorrect === false){
		return null;
	}else{
		result = {
			positionData: positionArr.slice(startPos),
			animals: animals
		}
		return result;
	}
}



function getPositionWithAnimalsInfoAndPositionInfo(animals, positionArr){
	
	var result = [];
	var animalInfo;
	var i, j;
	
	for(i=0; i<animals.length; i++){
		for(j=0; j<positionArr.length; j++){
			if(animals[i] in positionArr[j]){
				if(positionArr[j][animals[i]].length === 2){
					animalInfo = [animals[i], positionArr[j][animals[i]][0], positionArr[j][animals[i]][1]]
				}else{
					animalInfo = [animals[i], positionArr[j][animals[i]][0]+positionArr[j][animals[i]][2], positionArr[j][animals[i]][1]+positionArr[j][animals[i]][3]];
				}
				result.push(animalInfo);
				break;
			}
		}

	}
	return result;
}

function arrToOutputStr(result){
	var output = "";
	for(i=0; i<result.length; i++){
		for(j=0; j<result[i].length; j ++){
			output += result[i][j];
			if(j === result[i].length -1){
				output += "\n";
			}else{
				output += " ";
			}
		}
	}
	return output;
}


function getSnapshot(historyData, id){
	var data;
	var animals = [];
	var i, j;
	var positionArr = [];
	var result, animalInfo;

	data = isFormatCorrectAndTransferToArr(historyData);

	if(data === null){
		return "Invalid format";
	}else{
		data = sourceDataSortByTimeDesc(data);
		data = idDataCorrectWithGetAnimalsInfoAndPositionInfoFromArrData(data, id);

		if(data === null){
			return "Conflict found at "+id;
		}else{
			positionArr = data.positionData;
			animals = data.animals;
			animals = animalSortOrderByIDASC(animals);
			//result = [];
			result = getPositionWithAnimalsInfoAndPositionInfo(animals, positionArr);
			result = arrToOutputStr(result)
			return result;
		}
	}
}



