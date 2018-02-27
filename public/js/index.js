// the users results in seconds
var data = {
	age: null,
	yearsEdu: null,
	education: null,
	race: null,
	gender: null,
	diagnosis: null
}
// Global variables
var fadeTime = 300; var numTasks = 20;
var standardDur = 400;
var completeTasks = [];
var lastDur = null;

function sendResults(){
	console.log(data)
	// do api call that will generate data into an excel to be emailed
	// or commit to database
	$.ajax({
			type: "POST",
			url: "/commit",
			data: data,
			dataType: "json",
			success: function(data){
				if(mdata){
					data = mdata;
					generateResult();
				}
			}
	});
}

function updateProgress(){
	if(parseInt(current)){
		var progress = (parseInt(completeTasks.length)/(numTasks +1))*100;
		$('#progress').css('width', progress+"%");
	}
}

$("#next").click(function(event){
	event.preventDefault();
	nextTask();
});

function resetTask(answer){
	var result = lastDur === 4 ? (answer === "yes" ? "hit" : "miss") : (answer === "yes" ? "false positive" : "correct rejection")
	if(data[lastDur+"_1"]){
		data[lastDur+"_2"] = result;
	}
	else{
		data[lastDur+"_1"] = result;
	}
	if(completeTasks.length ===1){
		$("#taskStart").html("Next");
	}
	$("#circleForm").fadeOut(fadeTime, function(){
		$('#taskStart').fadeIn(fadeTime);
	});
}
function nextTask(){
	if(completeTasks.length < numTasks){
		lastDur =  Math.floor(Math.random() * numTasks) +1;
		while(completeTasks.indexOf(lastDur)>=0){
			lastDur =  Math.floor(Math.random() * numTasks)+1;
		}
		completeTasks.push(lastDur)
		if(lastDur >10){lastDur -=10;}
		console.log(lastDur)

		$("#taskStart").hide();
	 	$('#circleTask').show().delay(lastDur*100).fadeOut(fadeTime, function(){
	 		$('#circleForm').fadeIn(fadeTime);
		});
		/*
		console.log("Entering task "+lastDur)
 		$('#task').fadeOut(fadeTime, function(){
 			$('#taskStart').show();
 			$('#task').fadeIn(fadeTime);
 		});
 		console.log(data)
		*/
	}
	else{
		console.log("Completed tasks")
 		$('#task').fadeOut(fadeTime, function(){
 			$('#postQuest').fadeIn(fadeTime);
 			$('#navigation').fadeOut(fadeTime);
 		});
	}
	updateProgress();
}

function consent(answer){
	console.log("anser")
	if(answer === 'agree'){
		$('#consent').fadeOut(fadeTime, function(){
	 		$('#userInput').fadeIn(fadeTime);
	 	});
	}
	else if(answer === 'disagree'){
		$('#consent').fadeOut(fadeTime, function(){
	 		$('#complete').fadeIn(fadeTime);
	 	});
	}
}

$("#cont-button").click(function(event){
	event.preventDefault();
	console.log("Entering Consent Form")
 	$('#info').fadeOut(fadeTime, function(){
 		$('#consent').fadeIn(fadeTime);
 	});
});

$("#start-button").click(function(event){
	data.age = $('#age').val();
	data.yearsEdu = $('#yearEdu').val();
 	data.education = $('#edu').val();
 	data.race = $('#race').val();
 	data.gender = $('#gender').val();
 	data.diagnosis = $('#diagnosis').val();
 	data.medicine = $('#medicine').val();
	if(!data.age || !data.yearsEdu || ! data.education | !data.race| !data.gender | !data.diagnosis | !data.medicine){
		 return;
	}
	$('#userInput').fadeOut(fadeTime, function(){
 		$('#taskInfo').fadeIn(fadeTime);
	});
});

$("#task-cont-button").click(function(event){
	event.preventDefault();
	console.log("Entering task 1")
 	$('#taskInfo').fadeOut(fadeTime, function(){
 		$('#reference').fadeIn(fadeTime);
 		$('#navigation').fadeIn(fadeTime);
 		current = "1";
 		completeTasks = [];
 		updateProgress();
	});
});

$("#refStart").click(function(event){
	event.preventDefault();
	$("#refStart").hide();
 	$('#circleRef').show().delay(standardDur).fadeOut(fadeTime, function(){
 		$('#refRepeat').fadeIn(fadeTime);
	});
});

$("#refRepeat").click(function(event){
	event.preventDefault();
	$("#refRepeat").hide();
 	$('#circleRef').show().delay(standardDur).fadeOut(fadeTime, function(){
		$("#refInfo").hide();
		$('#preTask').fadeIn(fadeTime);
 		$('#refDone').fadeIn(fadeTime);
	});
});

$("#refDone").click(function(event){
	event.preventDefault();
	$("#reference").fadeOut(fadeTime, function(){
		$('#task').fadeIn(fadeTime);
		$('#taskStart').show()
	});
});

$("#taskStart").click(function(event){
	event.preventDefault();
	nextTask();
});

$("#end-button").click(function(event){
	for(var i=1; i<13; i++){
		data["s"+i] = $('#s' +i).val();
		if(!$('#s' +i).val()){
			return;
		}
	}
	console.log(data)
	event.preventDefault();
 	$('#postQuest').fadeOut(fadeTime, function(){
 		$('#complete').fadeIn(fadeTime);
		sendResults();
	});
});

$("#restart-button").click(function(event){
	event.preventDefault();
	console.log("Back to start")
	location.reload();
});
