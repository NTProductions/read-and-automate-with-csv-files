// read csv file script
// we will read a csv file to automate the creation of compositions and apply effects
var csvFile = File("~/Documents/comps.csv");

var csvData = [];

csvFile.open("r");
do {
    csvData.push(csvFile.readln());
    } while(!csvFile.eof);

csvFile.close();

//~ alert(csvData);
//~ alert(csvData[0]);

app.beginUndoGroup("Read and process CSV File");

var thisCSVRow, myComp, myAdjustmentLayer, theseEffects;
for(var i = 1; i < csvData.length; i++) {
    thisCSVRow = csvData[i].split(",");
    myComp = app.project.items.addComp(thisCSVRow[0], parseInt(thisCSVRow[1]), parseInt(thisCSVRow[2]), 1, 10, 30);
    myAdjustmentLayer = myComp.layers.addSolid([1, 1, 1], "Effects Adjustment Layer", myComp.width, myComp.height, 1);
    myAdjustmentLayer.adjustmentLayer = true;
    
    theseEffects = thisCSVRow[3].slice(1, thisCSVRow[3].length-1).split("|");
    for(var e = 0; e < theseEffects.length; e++) {
        myAdjustmentLayer.Effects.addProperty(theseEffects[e]);
        }
    myComp.openInViewer();
    }

app.endUndoGroup();