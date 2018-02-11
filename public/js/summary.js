 var data = [{"age":"23",
 "education":"Not Selected",
 "ethnicity":"Not Selected",
 "race":"Not Selected",
 "gender":"Not Selected",
 "zip":"",
 "spacetime9":"2.199",
 "spacetime30":"2.172",
 "spacetime60":"1.376",
 "spacehit9":"12",
 "spacehit30":"13",
 "spacehit60":"7",
 "video9":"0",
 "video30":"0",
 "video60":"0",
 "audio9":"0",
 "audio30":"0",
 "audio60":"0",
 "math1":"4",
 "math2":"8",
 "math3":"6"},
 {"age":"3",
 "education":"Not Selected",
 "ethnicity":"Not Selected",
 "race":"Not Selected",
 "gender":"Male",
 "zip":"",
 "spacetime9":"2.199",
 "spacetime30":"2.172",
 "spacetime60":"1.376",
 "spacehit9":"12",
 "spacehit30":"13",
 "spacehit60":"7",
 "video9":"0",
 "video30":"0",
 "video60":"0",
 "audio9":"0",
 "audio30":"0",
 "audio60":"0",
 "math1":"4",
 "math2":"8",
 "math3":"6"},
 {"age":"45",
 "education":"Bachelors",
 "ethnicity":"Hispanic",
 "race":"Black",
 "gender":"Female",
 "zip":"91104",
 "spacetime9":"1.478",
 "spacetime30":"3.239",
 "spacetime60":"0.959",
 "spacehit9":"9",
 "spacehit30":"17",
 "spacehit60":"5",
 "video9":"0",
 "video30":"0",
 "video60":"0",
 "audio9":"0",
 "audio30":"0",
 "audio60":"0",
 "math1":"1",
 "math2":"3",
 "math3":"5"}];
 var fadeTime = 300;

/********************************************************General page function and event handlers**********************************************/

function getResults(){
	$.ajax({
  		type: "GET",
  		url: "/data",
  		data: {'secure': true},
  		dataType: "json",
  		success: function(data){
  			if(mdata){
  				data = mdata;
  				generateResult();
  			}
  		}
	});
}

function generateResult(){
	generateDemographics();
	generateMathResults();
	generateVideoResults();
	generateAudioResults();
	generateTappingResults();
}

function generateDemographics(){
	var age = {};
	var ethnicity = {};
	var race = {};
	var education = {};
	var zip = {};
	var gender = {};
	for(var i=0; i<data.length; i++){
		if(age[data[i]["age"]]) age[data[i]["age"]] +=1;
		else age[data[i]["age"]] =1;
		if(ethnicity[data[i]["ethnicity"]]) ethnicity[data[i]["ethnicity"]] +=1;
		else ethnicity[data[i]["ethnicity"]] =1;
		if(race[data[i]["race"]]) race[data[i]["race"]] +=1;
		else race[data[i]["race"]] =1;
		if(education[data[i]["education"]]) education[data[i]["education"]] +=1;
		else education[data[i]["education"]] =1;
		if(zip[data[i]["zip"]]) zip[data[i]["zip"]] +=1;
		else zip[data[i]["zip"]] =1;
		if(gender[data[i]["gender"]]) gender[data[i]["gender"]] +=1;
		else gender[data[i]["gender"]] =1;
	}
	var ages = Object.keys(age);
	var ageData =[]; var ageLabel = [];
	for(var i=0; i< ages.length; i++){
		ageData.push(age[ages[i]]);
		ageLabel.push(ages[i] +" = " + age[ages[i]])
	}
	var ethnicitys = Object.keys(ethnicity);
	var ethnicityData =[]; var ethnicityLabel = [];
	for(var i=0; i< ethnicitys.length; i++){
		ethnicityData.push(ethnicity[ethnicitys[i]]);
		ethnicityLabel.push(ethnicitys[i] +" = " + ethnicity[ethnicitys[i]])
	}
	var races = Object.keys(race);
	var raceData =[]; var raceLabel = [];
	for(var i=0; i< races.length; i++){
		raceData.push(race[races[i]]);
		raceLabel.push(races[i] +" = " + race[races[i]])
	}
	var edus = Object.keys(education);
	var eduData =[]; var eduLabel = [];
	for(var i=0; i< edus.length; i++){
		eduData.push(education[edus[i]]);
		eduLabel.push(edus[i] +" = " + education[edus[i]])
	}
	var zips = Object.keys(zip);
	var zipData =[]; var zipLabel = [];
	for(var i=0; i< zips.length; i++){
		zipData.push(zip[zips[i]]);
		zipLabel.push(zips[i] +" = " + zip[zips[i]])
	}
	var genders = Object.keys(gender);
	var genderData =[]; var genderLabel = [];
	for(var i=0; i< genders.length; i++){
		genderData.push(gender[genders[i]]);
		genderLabel.push(genders[i] +" = " + gender[genders[i]])
	} 
	var age_pie = new RGraph.Pie({
        id: 'age',
        data: ageData,
        options: {
            gutterLeft: 20,
            linewidth: 0,
            strokestyle: 'rgba(0,0,0,0)',
            tooltips: ageLabel,
            labels: ages,
            colors: ['red','yellow','blue','cyan'],
            //variant: 'pie3d',
            radius: 40,
            labelsSticksList: true,
            shadowOffsety: 5,
            shadowColor: '#aaa',
            textAccessible: false,
            title: "Age",
            titleColor: "white"
         }
    }).draw();
    var eth_pie = new RGraph.Pie({
        id: 'eth',
        data: ethnicityData,
        options: {
            gutterLeft: 20,
            linewidth: 0,
            strokestyle: 'rgba(0,0,0,0)',
            tooltips: ethnicityLabel,
            labels: ethnicitys,
            colors: ['red','yellow','blue','cyan'],
            //variant: 'pie3d',
            radius: 40,
            labelsSticksList: true,
            shadowOffsety: 5,
            shadowColor: '#aaa',
            textAccessible: false,
            title: "Ethnicity",
            titleColor: "white"         
         }
    }).draw();
    var race_pie = new RGraph.Pie({
        id: 'rac',
        data: raceData,
        options: {
            gutterLeft: 20,
            linewidth: 0,
            strokestyle: 'rgba(0,0,0,0)',
            tooltips: raceLabel,
            labels: races,
            colors: ['red','yellow','blue','cyan'],
            //variant: 'pie3d',
            radius: 40,
            labelsSticksList: true,
            shadowOffsety: 5,
            shadowColor: '#aaa',
            textAccessible: false,
            title: "Race",            
            titleColor: "white"
         }
    }).draw();
	var edu_pie = new RGraph.Pie({
        id: 'edu',
        data: eduData,
        options: {
            gutterLeft: 20,
            linewidth: 0,
            strokestyle: 'rgba(0,0,0,0)',
            tooltips: eduLabel,
            labels: edus,
            colors: ['red','yellow','blue','cyan'],
            //variant: 'pie3d',
            radius: 40,
            labelsSticksList: true,
            shadowOffsety: 5,
            shadowColor: '#aaa',
            textAccessible: false,
            title: "Education",            
            titleColor: "white"
         }
    }).draw();
    var zip_pie = new RGraph.Pie({
        id: 'zip',
        data: zipData,
        options: {
            gutterLeft: 20,
            linewidth: 0,
            strokestyle: 'rgba(0,0,0,0)',
            tooltips: zipLabel,
            labels: zips,
            colors: ['red','yellow','blue','cyan'],
            //variant: 'pie3d',
            radius: 40,
            labelsSticksList: true,
            shadowOffsety: 5,
            shadowColor: '#aaa',
            textAccessible: false,
            title: "Zipcode",
            titleColor: "white"
         }
    }).draw();
	var gender_pie = new RGraph.Pie({
        id: 'gen',
        data: genderData,
        options: {
            gutterLeft: 20,
            linewidth: 0,
            strokestyle: 'rgba(0,0,0,0)',
            tooltips: genderLabel,
            labels: genders,
            colors: ['red','yellow','blue','cyan'],
            //variant: 'pie3d',
            radius: 40,
            labelsSticksList: true,
            shadowOffsety: 5,
            shadowColor: '#aaa',
            textAccessible: false,
            title: "Gender",
            titleColor: "white"
         }
    }).draw();   
}

function generateMathResults(){
	var math = {};
	var max = 0;
	for(var i=0; i<data.length; i++){
		if(math[data[i]["math1"]]) math[data[i]["math1"]] +=1;
		else math[data[i]["math1"]] =1;
		if(math[data[i]["math2"]]) math[data[i]["math2"]] +=1;
		else math[data[i]["math2"]] =1;
		if(math[data[i]["math3"]]) math[data[i]["math3"]] +=1;
		else math[data[i]["math3"]] =1;
	}
	console.log(math)
	var mathKeys = Object.keys(math);
	var mathData =[]; var mathLabel = [];
	for(var i=0; i< mathKeys.length; i++){
		mathData.push([parseInt(mathKeys[i]), math[mathKeys[i]]]);
		mathLabel.push(mathKeys[i] +", " + math[mathKeys[i]])
		if(mathKeys[i]> max) max = mathKeys[i];
	} 
	console.log(mathData)
	var math_scatter = new RGraph.Scatter({

        id: 'math',
        data: mathData,            
        options: {
            backgroundBarcolor1: 'white',
            backgroundGridColor: 'rgba(238,238,238,1)',
            gutterLeft: 20,
            tooltips: mathLabel,
            xmax: mathKeys +1
        }
    }).draw();
}

function generateVideoResults(){
	return;
}

function generateAudioResults(){
	return;
}

function generateTappingResults(){
	return;
}

$("#login-button").click(function(event){
 	event.preventDefault();
	if($('#username').val() == "" && $('#password').val() == ""){
	 	$('#errorText').text('');
	 	//$('.wrapper').addClass('form-success');
	 	$('#login').fadeOut(fadeTime, function(){
	 		$('#summary').fadeIn(fadeTime);
	 		//getResults();
	 		$( ".accordion" ).accordion({
        		heightStyle: "content",
        		collapsible: true,
        		active: 1
   			});
	 		generateResult();
	 	});
	 }
	 else {
	 	$('#errorText').text('Invalid Credentials');
	 } 
});
