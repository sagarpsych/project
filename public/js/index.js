// the users results in seconds
var data = {
	yearBorn: null,
	education: null,
	ethnicity: null,
	race: null,
	gender: null,
	zip: null,
	spacetime9: 0,
	spacetime30: 0,
	spacetime60: 0,
	spacehit9: 0,
	spacehit30: 0,
	spacehit60: 0,
	video9: 0,
	video30: 0,
	video60: 0,
	audio9: 0,
	audio30: 0,
	audio60: 0,
	math1: 0,
	math2: 0,
	math3: 0}
// Global variables
var fadeTime = 300; var numTasks = 18;
var completeTasks = []; var current = info;
var spaceEvent = false; var spaceStart1 = 0; var spaceStart2 = 0; var spaceStart3 = 0; var spaceHit = 0;
var math1Time = 0;  var math2Time = 0; var math3Time = 0; mathAnswer = null;
var memNun = null;


/************************************************Connect the Dots**************************************************************************/
/*var dots = [125, 125, 63, 20, 0, 125, 125, 63, 0, 63, 125, 125]

//Initialization....
var $graph = $('#graph'), gpos = $graph.position();
var $timer = $('#timer');
var points = new Array();
var ctx = $graph.get(0).getContext("2d");

//Parameters...
var indexes = getRandomPoints(7),
	ratio = 3,
	hops = 0,
	point = 0,
	maxTotalHops = 60,
	radius = 12;
var lineWidth = 1.5;

function contains(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) return true;
    }
    return false;
}

function getRandomPoints(totalPoints) {
    var indexes = new Array();
    for (var i = 0; i < totalPoints; i++) {
        var done = false;
        while (!done) {
            var index = Math.floor(Math.random() * dots.length);
            if (index % 2 != 0) {
                index++;
                if (index > dots.length) continue;
            }
            if (!contains(indexes, index)) {
                indexes.push(index);
                done = true;
            }
        }
    }
    return indexes.sort(function(a, b) {
        return a - b;
    });
}

function displayGrid(ctx) {
    var gridSize = 20,
        width = 380;
    for (var ypos = 0; ypos < width; ypos += gridSize) {
        ctx.moveTo(0, ypos);
        ctx.lineTo(width, ypos);
    }
    for (var xpos = 0; xpos < width; xpos += gridSize) {
        ctx.moveTo(xpos, 0);
        ctx.lineTo(xpos, width);
    }

    ctx.strokeStyle = "#eee";
    ctx.lineWidth = .7;
    ctx.stroke();
}

function addPoint(index, x1, y1) {
    for (var i = 0; i < points.length; i++) {
        var x2 = points[i].x,
            y2 = points[i].y;
        var d1 = Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
        var d2 = radius * 2 + 2;
        if (d2 > d1) {
            return false;
        }
    }

    points.push({
        'x': x1,
        'y': y1,
        'index': index
    });
    return true;
}

function startDots(){
	$('#startDots').prop('hidden', true);
	$('#graph').prop('hidden', false);
	$('#timer').prop('hidden', false);
	// set up connect the dots
	$graph = $('#graph'), gpos = $graph.position();
	var xDisplacement = 0,
		yDisplacement = 0;
	var borderColor = 'rgb(0,102,204)';

	//Display background grid...
	displayGrid(ctx);

	//Display the character's fixed lines...
	ctx.beginPath();
	ctx.translate(xDisplacement, yDisplacement);
	ctx.lineWidth = lineWidth;

	for (var i = 0; i < dots.length; i += 2) {
	    var newLine = dots[i] == -1;
	    if (newLine) i += 2;
	    var x = ratio * dots[i], y = ratio * dots[i + 1];
	    if (hops == 0 && contains(indexes, i)) {
	        hops++;
	        ctx.moveTo(x, y);
	        continue;
	    }
	    if (newLine || i == 0) {
	        ctx.moveTo(x, y);
	    } else {
	        if (hops == 0) {
	            ctx.lineTo(x, y);
	        } else {
	            ctx.strokeStyle = borderColor;
	            ctx.stroke();
	            ctx.beginPath();

	            if (addPoint(i, x, y)) {
	                var cx = gpos.left + xDisplacement - radius + 1 + x;
	                var cy = gpos.top + yDisplacement - radius + 1 + y;
	                $('<span></span>')
	                    .addClass('circle')
	                    .html(++point)
	                    .data('pos', {'x': cx,'y': cy})
	                    .css({'top': 0, 'left': 0})
	                    .insertAfter($graph);
	            }
	        }
	    }

	    if (hops > maxTotalHops) hops = 0;
	    else if (hops > 0) hops++;
	}

	ctx.strokeStyle = borderColor;
	ctx.stroke();

	//Create and initialize hotspots...
	var passed = 0;
	$('.circle').each(function() {
	    var pos = $(this).data('pos');
	    $(this).animate({
	        left: pos.x,
	        top: pos.y
	    }, 700);
	}).mouseover(function() {
	    var index = parseInt($(this).text());
	    if (passed != index - 1) {
	        return;
	    }
	    $(this).css({
	        'color': '#c00',
	        'font-weight': 'bold'
	    }).animate({
	        left: 0,
	        top: 0,
	        opacity: 0
	    }, 1000);

	    ctx.beginPath();

	    var start, end, done = passed + 1 == points.length;
	    if (done) /*The entire hotspots are detected... {
	        start = 0;
	        end = dots.length - 2;
	        clearInterval(tid);

	        $timer.html('Well done, it took ' + $timer.html() + ' seconds!').animate({
	            left: gpos.left + $graph.width() - $timer.width() - 20
	        }, 1000);
	        $('#dotsDone').prop('hidden', false);
	    } else {
	        start = passed == 0 ? points[passed].index - 4 : points[passed - 1].index;
	        end = points[passed].index;
	    }

	    for (var i = start; i <= end; i += 2) {
	        var newLine = dots[i] == -1;
	        if (newLine) {
	            i += 2;
	        }

	        var x = ratio * dots[i],
	            y = ratio * dots[i + 1];
	        if (newLine || i == start) {
	            ctx.moveTo(x, y);
	        } else {
	            ctx.lineTo(x, y);
	        }
	    }

	    ctx.lineWidth = lineWidth;
	    ctx.strokeStyle = borderColor;
	    ctx.stroke();

	    if (done) {
	        $('.filled').css({
	            left: gpos.left + xDisplacement + 10,
	            top: gpos.top + yDisplacement + 150
	        }).fadeIn('slow');
	    }

	    passed++;
	});

	//Initialize timer...
	$timer.css({
	    top: gpos.top + 10,
	    left: gpos.left + 10
	});
	var timer = 0;
	var tid = setInterval(function() {
	    timer += 30 / 1000;
	    $timer.html(timer.toFixed(2));
	}, 30);
}*/

/**************************************************************Hold Key Timed***************************************************************/
// key press listens for space bar event
// Z= 122, N=110
/*
$(window).keydown(function (e) {
	if (e.keyCode === 90) {
    	e.preventDefault();
    	if($('#task2').css('display') !== "none" && !spaceEvent){
    		spaceEvent = true;
    		spaceStart1 = (new Date()).getTime();
    		$('#z1').addClass('shaded')
    		$( "#space1done" ).prop( "disabled", false );
    	}
    	else if($('#task3').css('display') !== "none" && !spaceEvent){
    		spaceEvent = true;
    		spaceStart2 = (new Date()).getTime();
    		$('#z2').addClass('shaded')
    		$( "#space2done" ).prop( "disabled", false );
    	}
    	else if($('#task4').css('display') !== "none" && !spaceEvent){
    		spaceEvent = true;
    		spaceStart3 = (new Date()).getTime();
    		$('#z3').addClass('shaded')
    		$( "#space3done" ).prop( "disabled", false );
    	}
  	}
  	else if (e.keyCode === 78) {
    	e.preventDefault();
    	if($('#task2').css('display') !== "none"){
    		$('#n1').addClass('shaded')
    	}
    	else if($('#task3').css('display') !== "none"){
    		$('#n2').addClass('shaded')
    	}
    	else if($('#task4').css('display') !== "none"){
    		$('#n3').addClass('shaded')
    	}
  	}
});

$(window).keyup(function (e) {
	if (e.keyCode === 90) {
    	e.preventDefault();
    	if(spaceEvent){
    		if(spaceStart1 !== 0){
    			var delta = (new Date()).getTime() - spaceStart1;
    			$('#z1').removeClass('shaded')
    			spaceStart1 = 0;
    			spaceEvent = false;
    			data["spacetime9"] = delta / 1000.00;
    			data["spacehit9"] = spaceHit;
    			spaceHit = 0;
    		}
    		else if(spaceStart2 !== 0){
    			var delta = (new Date()).getTime() - spaceStart2;
    			$('#z2').removeClass('shaded')
    			spaceStart2 = 0;
    			spaceEvent = false;
    			data["spacetime30"] = delta / 1000.00;
    			data["spacehit30"] = spaceHit;
    			spaceHit = 0;
    		}
    		else if(spaceStart3 !== 0){
    			var delta = (new Date()).getTime() - spaceStart3;
    			$('#z3').removeClass('shaded')
    			spaceStart3 = 0;
    			spaceEvent = false;
    			data["spacetime60"] = delta / 1000.00;
    			data["spacehit60"] = spaceHit;
    			spaceHit = 0;
    		}
    	}
  	}
  	else if (e.keyCode === 78) {
    	e.preventDefault();
      	if($('#task2').css('display') !== "none"){
    		$('#n1').removeClass('shaded');
    		if(spaceEvent) spaceHit +=1;
    	}
    	else if($('#task3').css('display') !== "none"){
    		$('#n2').removeClass('shaded');
    		if(spaceEvent) spaceHit +=1;
    	}
    	else if($('#task4').css('display') !== "none"){
    		$('#n3').removeClass('shaded');
    		if(spaceEvent) spaceHit +=1;
    	}


  	}
});
*/
/**************************************************************Math Problems******************************************************************/
/*
function generateMath(task){
	var div = null;
	var ops = ["+", "-", "x"]
	if(task ===1) {
		div = document.getElementById("math1");
		if(math1Time === 0) math1Time = (new Date()).getTime();
	}
	else if(task ===2) {
		div = document.getElementById("math2");
		if(math2Time === 0) math2Time = (new Date()).getTime();
	}
	else if(task ===3) {
		div = document.getElementById("math3");
		if(math3Time === 0) math3Time = (new Date()).getTime();
	}
	var n1 = document.createElement("H1");
	var n2 = document.createElement("H1");
	var num1 = Math.floor(Math.random() * 10);
	var num2 = Math.floor(Math.random() * 10)
	var operation = ops[Math.floor(Math.random() * 3)];
	if(operation ==="+") mathAnswer = num1 + num2;
	else if(operation ==="-") mathAnswer = num1 - num2;
	else if(operation ==="x") mathAnswer = num1 * num2;
	n1.innerHTML = "   " + num1;
	n2.innerHTML = "<u>" + operation +" " + num2 +"</u>"
	n1.setAttribute("align", "center");
	n2.setAttribute("align", "center");
	div.appendChild(n1);
	div.appendChild(n2);
}

$("#math1Go").click(function(event){
	event.preventDefault();
	$("#math1").html("");
	$( "#mathform1" ).prop( "hidden", false );
	generateMath(1)
});

$("#math2Go").click(function(event){
	event.preventDefault();
	$("#math2").html("");
	$( "#mathform2" ).prop( "hidden", false );
	generateMath(2)
});

$("#math3Go").click(function(event){
	event.preventDefault();
	$("#math3").html("");
	$( "#mathform3" ).prop( "hidden", false );
	generateMath(3)
});

$("#next-math1").click(function(event){
	event.preventDefault();
	var ans = parseInt($('#math1-input').val());
	if(mathAnswer === ans) data["math1"] += 1;
	$("#math1").html("")
	$('#math1-input').val("");
	if((new Date()).getTime() - math1Time < 30000){
		generateMath(1);
	}
	else{
		$("#math1").html("Done");
		$('#math1-input').prop('disabled', true);
		$('#next-math1').prop('hidden', true);
		$('#math1done').prop('hidden', false);
		math1Time = 0;
	}
});

$("#next-math2").click(function(event){
	event.preventDefault();
	var ans = parseInt($('#math2-input').val());
	if(mathAnswer === ans) data["math2"] += 1;
	$("#math2").html("");
	$('#math2-input').val("");
	if((new Date()).getTime() - math2Time < 30000){
		generateMath(2);
	}
	else{
		$("#math2").html("Done");
		$('#math2-input').prop('disabled', true);
		$('#next-math2').prop('hidden', true);
		$('#math2done').prop('hidden', false);
		math2Time = 0;
	}
});

$("#next-math3").click(function(event){
	event.preventDefault();
	var ans = parseInt($('#math3-input').val());
	if(mathAnswer === ans) data["math3"] += 1;
	$("#math3").html("");
	$('#math3-input').val("");
	if((new Date()).getTime() - math3Time < 30000){
		generateMath(3);
	}
	else{
		$("#math3").html("Done");
		$('#math3-input').prop('disabled', true);
		$('#next-math3').prop('hidden', true);
		$('#math3done').prop('hidden', false);
		math3Time = 0;
	}
});
*/
/**************************************************************Remember the number*************************************************************/
/*function generateMemory(task){
	var div = null; var timeH = null;
	var num = Math.floor(Math.random() * 89999) + 10000;
	memNum = num.toString();
	var components = num.toString().split("");
	var options = [];
	options[0] = components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)];
	options[1] = components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)];
	options[2] = components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)];
	options[3] = components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)]
		+ components[Math.floor(Math.random() * 5)];
	options[Math.floor(Math.random() * 3)] = memNum; // set one of the options to the right answer
	if(task == 1) {
		div= document.getElementById('memory1');
		timeH =  $('#mem1Time');
	}
	else if(task == 2) {
		div= document.getElementById('memory2');
		timeH =  $('#mem2Time');
	}
	var mem = document.createElement("H1");
	mem.innerHTML = num;
	mem.setAttribute("align", "center");
	div.appendChild(mem);
	var timeout = 5000;
	var time = 0;
	memoryTimer(timeH, div, options, time, timeout);
}

function memoryTimer(timeH, div, options, time, timeout){
	if(time <timeout){
		var old = timeH.html();
		timeH.html(old.substring(2, old.length));
		time += 500;
		window.setTimeout(function(){memoryTimer(timeH, div, options, time, timeout)}, 500);
	}
	else{
		var header = document.createElement("H1");
		header.setAttribute("align", "center");
		div.innerHTML = "";
		header.innerHTML = "Ok, what was the number?";
		div.appendChild(header)
		for(var i=0; i<options.length; i++){
			var label = document.createElement("LABEL");
			var op = document.createElement('INPUT');
			op.setAttribute("type", "radio");
			op.setAttribute("name", "memRadio");
			op.setAttribute("value", options[i]);
			label.setAttribute("style", "font-size: 30px;")
			label.appendChild(op);
			label.appendChild(document.createTextNode(" " + options[i]));
			div.appendChild(document.createElement("BR"));
			div.appendChild(label);
			div.appendChild(document.createElement("BR"));
		}
		var button = document.createElement("BUTTON");
		button.setAttribute("id", "memClick");
		button.setAttribute("onClick", "submitMEM()");
		button.innerHTML ="Next Task";
		div.appendChild(button)
	}
}

function submitMEM(event){
	var ans = $("input:radio[name='memRadio']:checked").val();
	if(memNum === ans){
		//save answer
	}
	nextTask();
}

$("#mem1Go").click(function(event){
	event.preventDefault();
	var element = document.getElementById("mem1Go");
	element.parentNode.removeChild(element);
	generateMemory(1)
});

$("#mem2Go").click(function(event){
	event.preventDefault();
	var element = document.getElementById("mem2Go");
	element.parentNode.removeChild(element);
	generateMemory(2)
});
*/
/**************************************************************Identify the pictures***********************************************************/

/**************************************************************Shape/Color Matching************************************************************/

/**************************************************************Audio Timer*********************************************************************/
/*$("#audioTime1").change(function(event){
	event.preventDefault();
	$('#audio1done').prop('hidden', false);
})

$("#audioTime2").change(function(event){
	event.preventDefault();
	$('#audio2done').prop('hidden', false);
})

$("#audioTime3").change(function(event){
	event.preventDefault();
	$('#audio3done').prop('hidden', false);
}) */
/**************************************************************Video Timer*********************************************************************/
/*$("#videoTime1").change(function(event){
	event.preventDefault();
	$('#video1done').prop('hidden', false);
})

$("#videoTime2").change(function(event){
	event.preventDefault();
	$('#video2done').prop('hidden', false);
})

$("#videoTime3").change(function(event){
	event.preventDefault();
	$('#video3done').prop('hidden', false);
}) */
/********************************************************General page function and event handlers**********************************************/

function sendResults(){
	console.log(data)
	// do api call that will generate data into an excel to be emailed
	// or commit to database
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

function nextTask(){
	if(completeTasks.length < numTasks){
		completeTasks.push(current);
		var old = current;
		while (completeTasks.indexOf(current) >= 0){
			current = Math.floor(Math.random() * numTasks) + 2
		}
		console.log("Entering task "+current)
 		$('#task'+old).fadeOut(fadeTime, function(){
 			$('#task'+current).fadeIn(fadeTime);
 		});
 		console.log(data)
	}
	else{
		console.log("Completed tasks")
 		$('#task'+current).fadeOut(fadeTime, function(){
 			$('#complete').fadeIn(fadeTime);
 			$('#navigation').fadeOut(fadeTime);
 			sendResults();
 		});
	}
	updateProgress();
}

/*$("#previous").click(function(event){
	event.preventDefault();
	if(current =="1"){
	 	current = "info";
		console.log("Back to info")
 		$('#task1').fadeOut(fadeTime, function(){
 			$('#info').fadeIn(fadeTime);
 			$('#navigation').fadeOut(fadeTime);
 		});
	}
	else if(current =="2"){
	 	current = "1";
		// store task 2: video results
		data["video"] = $('#videoTime').val();
		console.log("Back to task 1")
 		$('#task2').fadeOut(fadeTime, function(){
 			$('#task1').fadeIn(fadeTime);
 		});
	}
	else if(current =="3"){
	 	current = "2";
		console.log("Back to task 2")
 		$('#task3').fadeOut(fadeTime, function(){
 			$('#task2').fadeIn(fadeTime);
 		});
	}
	else if(current =="4"){
	 	current = "3";
		console.log("Back to task 3")
 		$('#task4').fadeOut(fadeTime, function(){
 			$('#task3').fadeIn(fadeTime);

 		});
	}
	updateProgress();
});*/

$("#login-button").click(function(event){
 	event.preventDefault();
	if($('#username').val() == "admin" && $('#password').val() == "ssdjjlad"){
	 	$('#errorText').text('');
	 	//$('.wrapper').addClass('form-success');
	 	$('#loginForm').fadeOut(fadeTime, function(){
	 		$('#info').fadeIn(fadeTime);
	 	});
	 }
	 else {
	 	$('#errorText').text('Invalid Credentials');
	 }
});

$("#cont-button").click(function(event){
	event.preventDefault();
	console.log("Entering Form Input")
 	$('#info').fadeOut(fadeTime, function(){
 		$('#userInput').fadeIn(fadeTime);
 		current = "form";
 	});
});

$("#start-button").click(function(event){
	event.preventDefault();
	console.log("Entering task 1")
	data["age"] = $('#age').val();
 	data["education"] = $('#edu').val();
 	data["ethnicity"] = $('#eth').val();
 	data["race"] = $('#race').val();
 	data["gender"] = $('#gen').val();
 	data["zip"] = $('#zip').val();
 	$('#userInput').fadeOut(fadeTime, function(){
 		$('#task1').fadeIn(fadeTime);
 		$('#navigation').fadeIn(fadeTime);
 		current = "1";
 		completeTasks = [];
 		updateProgress();
	});
});

$("#restart-button").click(function(event){
	event.preventDefault();
	console.log("Back to start")
	location.reload();
});
