function scroll(){
	var table = document.getElementById("runTable")
	var tableRows = table.rows
	
	var currentDate = ""
	for(var  i = 0; i < tableRows.length; i++){
		var curRow = tableRows[i]
		// Skip rows that are not relevant 
		if(curRow.classList.contains("second-row")){
			curRow.style.backgroundColor = ""
			continue
		}
		
		// If it is a day split (black day header) then get the date from it
		if(curRow.classList.contains("day-split")){
			var split = curRow.cells[0].innerText.split(" ")
			var month = split[1]
			var day = split[2].slice(0,-2)
			// Format like 'January 5th, 2020 '
			currentDate = month + " " + day + ", " + new Date().getFullYear() + " "
			continue
		}
		// Clear the background color in the event user clicks again for different run
		curRow.style.backgroundColor = ""

		var rowTime = new Date(currentDate + curRow.cells[0].innerText)
		if(rowTime > new Date()){
			// We found the run after the one we care about, so shift back two places
			var shiftAmount = -2
			// If there is a day split, shift back 3
			if(tableRows[i - 2].classList.contains("day-split")){
				shiftAmount = -3;
			}

			var correctRowPos = i + shiftAmount
			// If this results in negative or 0 numbers, reset to 2
			if(correctRowPos < 1){
				correctRowPos = 2;
			}
			// Set the blue colors and scroll to the correct position 
			tableRows[correctRowPos].style.backgroundColor = "#46BDED"
			tableRows[correctRowPos + 1].style.backgroundColor = "#46BDED"
			tableRows[correctRowPos].scrollIntoView({behavior: "smooth", block: "center"})
			break
		}
	}
}


