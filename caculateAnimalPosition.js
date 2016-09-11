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
	var positionPattern = /^-?\w+\s(-?\d+\s-?\d+\s-?\d+\s-?\d+|-?\d+\s-?\d+)$/;
	if(positionPattern.test(str)){
		return true;
	}else{
		return false;
	}
}

function isFormatCorrectAndTransferToArrOrderByTime(sourceDataString){

	var sourceDataAttr = sourceDataString.split('\n');

	var sourceData = [];
	var data, animal, animalDataAttr;
	var i;
	var flag;
	i = 0;
	while( i<sourceDataAttr.length){
		if(isTimeIDFormat(sourceDataAttr[i])){//判断是否是时间id
			
			data = {};
			data.id = sourceDataAttr[i];
			i ++;
			if(isTimeFormat(sourceDataAttr[i])){//如果下一行是时间，就没问题，否则格式错误
				data.time = sourceDataAttr[i];
				i ++;
			}else{
				flag = false;
				break;
			}
			data.animal = [];
			while(isPositionFormat(sourceDataAttr[i])){//循环遍历该时刻的所有动物记录
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
		}else{//如果格式错误，就退出循环
			flag = false;
			break;
		}
	}
	if(flag === false){//格式错误返回null,否则返回对象
		return null;
	}else{
		sourceData = sourceData.sort(function(a, b){
			if(a.time > b.time){
				return false;
			}else{
				return true;
			}
		});
		return sourceData;
	}
}

function isDataCorrectThenReturnAnimalsInfoAndPositionInfo(data, id){
	var animalTemp;
	var i, j;
	var positionArr = [];
	var tempObj;
	var start = 0;
	var isStart = false;
	var animals = [];
	
	for(i = 0; i<data.length; i++){
		if(data[i].id === id){
			start = i;
			isStart = true;
		}
		animalTemp = data[i].animal;
		tempObj = {};
		for(j=0; j<animalTemp.length; j++){
			
			if(animalTemp[j].startX !== undefined){
				if(isStart){
					animals.push(animalTemp[j].name);
				}
				tempObj[animalTemp[j].name] = [animalTemp[j].startX, animalTemp[j].startY]
			}else{
				tempObj[animalTemp[j].name] = [animalTemp[j].preX, animalTemp[j].preY,animalTemp[j].disX,  animalTemp[j].disY];
			}
		}
		positionArr.push(tempObj);
 		
		
	}
	//判断动物位置数据是否正确
	var flag = true;
	for(i=1; i<positionArr.length; i++){//从第1个时刻的数据开始判断，是否与后面时刻的数据有冲突
		for(key in positionArr[i]){
			if(positionArr[i][key].length === 2){//如果是初始位置，就判断一下下一次发生变化时的位置信息是否与初始位置一致
				j = i-1;
				while(j>=0 && positionArr[j][key] === undefined){//一直向前找到下一时刻key的位置信息
					j --;
				}
				if(j >= 0){//找到了，就判断一下，是否正确
					if(positionArr[j][key][0] !== positionArr[i][key][0]||positionArr[j][key][1] !== positionArr[i][key][1]){
						flag = false;
						break;
					}
				}
			}else{//如果不是是初始位置，就计算一下该时刻的位置信息，并判断一下下一次发生变化时的位置信息是否与该时刻的位置是否一致
				j = i-1;
				while(j>=0 && positionArr[j][key] === undefined ){
					j --;
				}
				if(j >= 0){
					if(positionArr[j][key][0] !== positionArr[i][key][0]+positionArr[i][key][2]||positionArr[j][key][1] !== positionArr[i][key][1]+positionArr[i][key][3]){
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
		return null;
	}else{
		return {
			positionData: positionArr.slice(start),
			animals: animals
		};
	}
}



function getSnapshot(historyData, id){
	var data;
	var animals = [];
	var i, j;
	var positionArr = [];

	data = isFormatCorrectAndTransferToArrOrderByTime(historyData);
	if(data === null){
		return "Invalid format";
	}else{
		data = isDataCorrectThenReturnAnimalsInfoAndPositionInfo(data, id);
		if(data === null){
			return "Conflict found at "+id;
		}else{
			positionArr = data.positionData;
			animals = data.animals;
			animals = animals.sort(function(a, b){
				if(a < b){
					return false;
				}else{
					return true;
				}
			});
			var result = [];
			var animalInfo;
			
			for(i=0; i<animals.length; i++){
				for(j=0; j<positionArr.length; j++){
					if(animals[i] in positionArr[j]){
						if(positionArr[j][animals[i]].length === 2){//第一次找到就是初始位置时，直接输出位置信息
							animalInfo = [animals[i], positionArr[j][animals[i]][0], positionArr[j][animals[i]][1]]
						}else{//第一次找到不在初始位置时，需要计算
							animalInfo = [animals[i], positionArr[j][animals[i]][0]+positionArr[j][animals[i]][2], positionArr[j][animals[i]][1]+positionArr[j][animals[i]][3]];
						}
						result.push(animalInfo);
						break;
					}
				}

			}
			return result;
		}
	}
}

var result = getSnapshot(sourceDataString, "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155");
console.log(result);

