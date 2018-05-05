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
var fadeTime = 400; var numTasks = 20;
var standardDur = 400;
var completeTasks = [];
var lastDur = null;
var questions = [
	"Being able to organize my activities in time is important for me",
	"The more I focus attention on time, the quicker time passes",
	"The more that I am fascinated by what I am doing, the more slowly time passes",
	"When I am bored, I feel time passes more slowly",
	"When I am waiting, I feel time pass slowly",
	"When I am happy, I feel time passes more quickly",
	"When I am sad, I feel that I have slowed down",	
	"When I am sad, I feel time passes more quickly",
	"When I am doing a pleasant activity, I feel time passes more quickly",
	"In the presence of a joyful person, I feel time passes more quickly",
	"When I am with children, I feel time passes more slowly",
	"When I have pain somewhere, I feel time passes more quickly"
];
var sIndex = 0;

// initialize

var select = document.getElementById("age");
for(var i=18; i<=100; i++){
	var option = document.createElement("option");
	option.text = i;
	option.value = i;
	select.options.add(option);
}
/*
select = document.getElementById("yearEdu");
for(var i=0; i<=16; i++){
	var option = document.createElement("option");
	option.text = i;
	option.value = i;
	select.options.add(option);
}
var option = document.createElement("option");
option.text = "17+";
option.value = "17+";
select.options.add(option);
*/

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
		$("#taskStartButton").html("Next");
	}
	$("#circleForm").fadeOut(fadeTime, function(){
		if(completeTasks.length < numTasks){
			$('#taskStart').fadeIn(fadeTime);
		}
		else{
			console.log("Completed tasks")
			$('#task').fadeOut(fadeTime, function(){
				$('#postQuest').fadeIn(fadeTime);
				$('#navigation').fadeOut(fadeTime);
			});
		}
	});
}

function nextTask(){
	lastDur =  Math.floor(Math.random() * numTasks) +1;
	while(completeTasks.indexOf(lastDur)>=0){
		lastDur =  Math.floor(Math.random() * numTasks)+1;
	}
	completeTasks.push(lastDur)
	if(lastDur >10){lastDur -=10;}
	console.log(lastDur)

	$("#taskStart").fadeOut(fadeTime, function(){
		$('#circleTask').delay(fadeTime*2).fadeIn().delay(lastDur*100).fadeOut(fadeTime, function(){
			$('#circleForm').delay(fadeTime*2).fadeIn(fadeTime);
		});
	});
	updateProgress();
}

function consent(answer){
	console.log("answer")
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
	//data.yearsEdu = $('#yearEdu').val();
 	data.education = $('#edu').val();
 	data.race = $('#race').val();
 	data.gender = $('#gender').val();
 	data.diagnosis = $('input[name=diagnosis]:checked').val();
 	data.medicine = $('input[name=medicine]:checked').val();
 	console.log(JSON.stringify(data))
	if(!data.age || ! data.education || !data.race || !data.gender || !data.medicine || !data.diagnosis){
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
	$("#refStart").fadeOut(fadeTime, function(){
		$('#circleRef').delay(fadeTime*2).fadeIn().delay(standardDur).fadeOut(fadeTime, function(){
			$('#refRepeat').delay(fadeTime*2).fadeIn(fadeTime);
		});
	});
});

$("#refRepeat").click(function(event){
	event.preventDefault();
	$("#refRepeat").fadeOut(fadeTime, function(){
		$('#circleRef').delay(fadeTime*2).fadeIn().delay(standardDur).fadeOut(fadeTime, function(){
			$("#refInfo").delay(fadeTime*2).fadeOut(fadeTime, function(){
				$('#preTask').fadeIn(fadeTime);
			});
		});
	});
});

$("#refDone").click(function(event){
	event.preventDefault();
	$("#reference").delay(fadeTime).fadeOut(fadeTime, function(){
		$('#task').fadeIn(fadeTime);
		$('#taskStart').fadeIn(fadeTime);
	});
});

$("#taskStart").click(function(event){
	event.preventDefault();
	nextTask();
});

$("#next-survey-button").click(function(event){
	if(sIndex <12){
		val = $('input[name=survey]:checked').val();
		if(!val){
			return;
		}
		else{
			sIndex++;
			data["s"+sIndex] = val;
			$("#survey-text").html(questions[sIndex]);
			$("input[name=survey]:checked").attr('checked',false);
		}
	}
	console.log(sIndex)
	if(sIndex === 11){
		$("#next-survey-button").html("Finish");
	}
	if(sIndex === 12){
		console.log(data)
		event.preventDefault();
		$('#postQuest').fadeOut(fadeTime, function(){
				$('#complete').fadeIn(fadeTime);
			sendResults();
		});
	}
	
});

$("#restart-button").click(function(event){
	event.preventDefault();
	console.log("Back to start")
	location.reload();
});
