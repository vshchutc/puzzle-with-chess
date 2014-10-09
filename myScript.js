function addAllQueens(arr, num){
		for(var i=0;i<arr[num].length;i++){
			addQueen(arr[num][i].x, arr[num][i].y)
		}
};

function addQueen(Dx,Dy){
	$(".chessCell[x="+Dx+"][y="+Dy+"]").addClass("hasQueen");
};

function drawChessBoard(){
	var chessString = "";
		for (i = 1; i < 9;i++){
			chessString += "<div class='contain'>";
			for (var j = 1; j < 9; j++){
				chessString += "<div class='chessCell' x='"+j+"' y='"+i+"' >"
				chessString += "</div>"
			}
			chessString += "</div>"
		}
	return chessString;
};

function getFreeCells(allCls,queenPstn){
	var freeCells=[];
		for(var i=0; i<allCls.length;i++){
			if(allCls[i].x != queenPstn.x && allCls[i].y != queenPstn.y && queenPstn.x-allCls[i].x != queenPstn.y-allCls[i].y && queenPstn.x-allCls[i].x != allCls[i].y-queenPstn.y){
				freeCells.push({"x":allCls[i].x, "y":allCls[i].y});
			}
		}
	return freeCells;
};

function getRowCells(rowNumber){
	var arr=[];
	for(var i=1; i<9; i++){
		arr.push({x:i, y:rowNumber});
	}
	return arr;
}

function getPossibleSolutionsForRow(queenPositions, numberOfRow){
	var possibleSolutions = [];
	var newRow=getRowCells(numberOfRow);
	for(var i=0; i < queenPositions.length;i++){
		newRow = getFreeCells(newRow,queenPositions[i]);
	}
	for (var i=0; i < newRow.length; i++) {
		var queenPositionsClone = queenPositions.slice(0);
		queenPositionsClone.push(newRow[i]);
		possibleSolutions.push(queenPositionsClone);
	}
	return possibleSolutions;
}

function getAllPossibleSolutions(){
	var solutions = getPossibleSolutionsForRow([], 1),
			tempSolution;
	for (var numberOfRow = 2; numberOfRow < 9; numberOfRow++) {
		tempSolution = [];
		for (var i = 0; i < solutions.length; i++) {
				var sol = getPossibleSolutionsForRow(solutions[i], numberOfRow);
				tempSolution = tempSolution.concat(sol);
		}
		solutions = tempSolution;
	}
	return solutions;
}

function fillChessDesk(rows, colums){
	var arr=[];
	for(var i = 1; i<rows+1; i++){
		for(j=1; j<colums+1; j++){
			arr.push({'x':j, 'y':i});
		}
	}
	return arr;
};

function fillSolutions(arr){
	for(var i = 1; i<17; i++){
		arr.push({"x":1, "y":i});
	};
};

$(document).ready(function() {
	$(".chessDesk").append(drawChessBoard());
	
	var solutions = [];
	var counter=0;
	var solutionsQuantity=getAllPossibleSolutions().length;
	
	addAllQueens(getAllPossibleSolutions(), counter);
	$('#numberOfSolutions').html(solutionsQuantity);
	$("#currentSolution").html(counter+1);
	
	$("#previousSolution").click(function(){
		if(counter>0){
			counter--;
			$("#currentSolution").html(counter + 1);
			$(".chessCell").removeClass("hasQueen");
			addAllQueens(getAllPossibleSolutions(),counter);
		} else if (counter==0){
			counter=getAllPossibleSolutions().length-1;
			$("#currentSolution").html(counter + 1);
			$(".chessCell").removeClass("hasQueen");
			addAllQueens(getAllPossibleSolutions(),counter);
		};
	});
	
	$("#nextSolution").click(function(){
		if(counter<getAllPossibleSolutions().length-1){
		 	counter++;
			$("#currentSolution").html(counter+1)
			$(".chessCell").removeClass("hasQueen");
			addAllQueens(getAllPossibleSolutions(),counter);
		}else if (counter == getAllPossibleSolutions().length-1){
			counter=0;
			$("#currentSolution").html(counter + 1);
			$(".chessCell").removeClass("hasQueen");
			addAllQueens(getAllPossibleSolutions(),counter);
		};
	});
})
