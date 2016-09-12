
describe("Suite for data format test ", function() {
    describe("Suite for isTimeIDFormat ", function() {
        
        it("spec for isTimeIDFormat", function() {
            var timeID = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";

            var result = isTimeIDFormat(timeID);

            expect(result).toBe(true);
        });
       
    });
    describe("Suite for isTimeIDFormat ", function() {
        
        it("spec for isTimeFormat", function() {
            var time = "2016/09/02 22:30:46";

            var result = isTimeFormat(time);

            expect(result).toBe(true);
        });
    });
    
    describe("Suite for isPositionFormat ", function() {
        
         it("spec for isPositionFormat with initial position", function() {
            var position = "cat2 2 3";

            var result = isPositionFormat(position);

            expect(result).toBe(true);
        });

        it("spec for isPositionFormat with not-initial position", function() {
            var position = "cat1 12 8 3 4";

            var result = isPositionFormat(position);

            expect(result).toBe(true);
        });

        it("spec for isPositionFormat with not-initial position with negetive number", function() {
            var position = "cat1 10 9 2 -1";

            var result = isPositionFormat(position);

            expect(result).toBe(true);
        });
    });
    
      describe("Suite for isFormatCorrectAndTransferToArr ", function() {
        
        it("spec for isFormatCorrectAndTransferToArrWith with not-correct timeID", function() {
            var sourceDataString = "e4e87cb2-8e9a-4749-abb6-26c59344dfeee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9";

            var result = isFormatCorrectAndTransferToArr(sourceDataString);

            expect(result).toEqual(null);
        });

        it("spec for isFormatCorrectAndTransferToArrWith with not-correct time", function() {
            var sourceDataString = "e4e87cb2-8e9a-4749-abb6-26c59344dfeee\n"+
                   "2016/09/002 22:30:46\n"+
                   "cat1 10 9";
                   
            var result = isFormatCorrectAndTransferToArr(sourceDataString);

            expect(result).toEqual(null);
        });

        it("spec for isFormatCorrectAndTransferToArrWith with not-correct animalInfo", function() {
            var sourceDataString = "e4e87cb2-8e9a-4749-abb6-26c59344dfeee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9 1";
                   
            var result = isFormatCorrectAndTransferToArr(sourceDataString);

            expect(result).toEqual(null);
        });

        it("spec for isFormatCorrectAndTransferToArrWith with not-correct multiLine", function() {
            var sourceDataString = "e4e87cb2-8e9a-4749-abb6-26c59344dfeee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9\n"+
                   "2016/09/02 22:30:46";
                   
            var result = isFormatCorrectAndTransferToArr(sourceDataString);

            expect(result).toEqual(null);
        });

         it("spec for isFormatCorrectAndTransferToArrWith with correct", function() {
            var sourceDataString = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9";
                  
                 
                   
            var result = isFormatCorrectAndTransferToArr(sourceDataString);

            expect(result).toEqual([{
                id: "e4e87cb2-8e9a-4749-abb6-26c59344dfee",
                time: "2016/09/02 22:30:46",
                animal: [
                    {
                        name: "cat1",
                        startX: 10,
                        startY: 9
                    }
                ]
            }]);
        });

    });
    
 
});

describe("Suite for data correct test ", function() {
    describe("Suite for isDataCorrect ", function() {
        
        it("spec for isDataCorrect with not-correct", function() {
            var positionArr = [
                {
                    "cat1": [11, 8, 3, 4]
                },
                {
                    "cat1": [10, 9, 2, -1],
                    "cat2": [2, 3]
                },
                {
                    "cat1": [10, 9]
                }
            ];

            var result = isDataCorrect(positionArr);

            expect(result).toBe(false);
        });
        it("spec for isDataCorrect with correct", function() {
            var positionArr = [
                {
                    "cat1": [12, 8, 3, 4]
                },
                {
                    "cat1": [10, 9, 2, -1],
                    "cat2": [2, 3]
                },
                {
                    "cat1": [10, 9]
                }
            ];

            var result = isDataCorrect(positionArr);

            expect(result).toBe(true);
        });
       
    });
});




describe("Suite for data transfer test.",function(){

    describe("Suite for strToArr.",function(){
         it("spec for strToArr with initial position", function(){
             var animalDataStr = "cat1 12 8";

             var result = strToArr(animalDataStr);

             expect(result).toEqual(["cat1", "12", "8"]);

        });
        it("spec for strToArr with not-initial position", function(){
             var animalDataStr = "cat1 12 8 3 4";

             var result = strToArr(animalDataStr);

             expect(result).toEqual(["cat1", "12", "8", "3", "4"]);

        });
        
    });

    describe("Suite for arrToOutputStr.",function(){
         it("spec for arrToOutputStr", function(){
             var arr = [["cat1", 12, 8], ["cat2", 9, 10]];

             var result = arrToOutputStr(arr);

             expect(result).toEqual("cat1 12 8\ncat2 9 10\n");

        });
       
        
    });
     
    
});
//
describe("Suite for data sort test.",function(){
     it("spec for sourceDataSortByTimeDesc ", function(){
         var sourceData = [{
            id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",
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
             id:"351055db-33e6-4f9b-bfe1-16f1ac446ac1",
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
         }
         ];

         var result = sourceDataSortByTimeDesc(sourceData);

         expect(result).toEqual([
            {
                id:"351055db-33e6-4f9b-bfe1-16f1ac446ac1",
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
                id:"e4e87cb2-8e9a-4749-abb6-26c59344dfee",
                time: "2016/09/02 22:30:46",
                animal: [
                    {
                        name: "cat1",
                        startX: 10,
                        startY: 9
                    }
                ]
                       
             }
         ]);

    });
    it("spec for animalSortOrderByIDASC", function(){
         var animals = ["cat2", "cat1", "dog1"];

         var result = animalSortOrderByIDASC(animals);

         expect(result).toEqual(["cat1", "cat2", "dog1"]);

    });
    
});

describe("Suite for get data test.",function(){

    describe("Suite for idDataCorrectWithGetAnimalsInfoAndPositionInfoFromArrData.",function(){
        it("spec for idDataCorrectWithGetAnimalsInfoAndPositionInfoFromArrData", function(){
            var data = [
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
                id: "e4e87cb2-8e9a-4749-abb6-26c59344dfee",
                time: "2016/09/02 22:30:46",
                animal: [
                    {
                        name: "cat1",
                        startX: 10,
                        startY: 9
                    }
                ]
            }]; 
            var id = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";

            var result = idDataCorrectWithGetAnimalsInfoAndPositionInfoFromArrData(data, id);

            expect(result).toEqual(
             {
                positionData: [
                    {
                        "cat1": [12, 8, 3, 4]
                    },
                    {
                        "cat1": [10, 9, 2, -1],
                        "cat2": [2, 3]
                    },
                    {
                        "cat1": [10, 9]
                    }
                ],
                animals: ["cat1", "cat2"]
            });
  
        });
    });

    describe("Suite for getPositionWithAnimalsInfoAndPositionInfo.",function(){
         it("spec for getPositionWithAnimalsInfoAndPositionInfo", function(){
            
            var animals = ["cat1", "cat2"];
            var positionArr = [
                    {
                        "cat1": [12, 8, 3, 4]
                    },
                    {
                        "cat1": [10, 9, 2, -1],
                        "cat2": [2, 3]
                    },
                    {
                        "cat1": [10, 9]
                    }
                ];

             var result = getPositionWithAnimalsInfoAndPositionInfo(animals, positionArr);

             expect(result).toEqual([["cat1", 15, 12], ["cat2", 2, 3]]);
  
        });
    });

   
    
});



describe("Suite for getSnapshot.",function(){

        it("spec for arrToOutputStr", function(){
             var historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfeee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9\n"+
                   "351055db-33e6-4f9b-bfe1-16f1ac446ac1\n"+
                   "2016/09/02 22:30:52\n"+
                   "cat1 10 9 2 -1\n"+
                   "cat2 2 3\n"+
                   "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n"+
                   "2016/09/02 22:31:02\n"+
                   "cat1 12 8 3 4";
            var id = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
            var result = getSnapshot(historyData, id);

            expect(result).toEqual("Invalid format");

        });

        it("spec for getSnapshot with not-correct data", function(){
            
            var historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9\n"+
                   "351055db-33e6-4f9b-bfe1-16f1ac446ac1\n"+
                   "2016/09/02 22:30:52\n"+
                   "cat1 10 9 2 -1\n"+
                   "cat2 2 3\n"+
                   "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n"+
                   "2016/09/02 22:31:02\n"+
                   "cat1 12 7 3 4";
            var id = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";

            var result = getSnapshot(historyData, id);

            expect(result).toEqual("Conflict found at "+id);
  
        });

        it("spec for getSnapshot with correct", function(){
            
            var historyData = "e4e87cb2-8e9a-4749-abb6-26c59344dfee\n"+
                   "2016/09/02 22:30:46\n"+
                   "cat1 10 9\n"+
                   "351055db-33e6-4f9b-bfe1-16f1ac446ac1\n"+
                   "2016/09/02 22:30:52\n"+
                   "cat1 10 9 2 -1\n"+
                   "cat2 2 3\n"+
                   "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155\n"+
                   "2016/09/02 22:31:02\n"+
                   "cat1 12 8 3 4";
            var id = "dcfa0c7a-5855-4ed2-bc8c-4accae8bd155";
            var result = getSnapshot(historyData, id);

            expect(result).toEqual("cat1 15 12\ncat2 2 3\n");
  
        });
    });
