
var json = httpGet("https://www.google.com/calendar/feeds/kendall.ahrendsen%40gmail.com/private-2acd1b3caf89da6a3d7b83996c66acb7/full?singleevents=true&orderby=starttime&sortorder=ascending&start-min=" + todaysdate + "T00:00:00&start-max=" + todaysdate + "T23:59:59&alt=json");
var jsonobject = jQuery.parseJSON(json);
if(jsonobject.feed.hasOwnProperty("entry"))
{
	var events = jsonobject.feed.entry;
	dayeventstring = "";
	eventstring = "";
	for (var i = 0; i < events.length; i++) {
		var event = events[i];
		if (event.hasOwnProperty("gd$originalEvent")) {
			dayeventstring += event.title.$t + ". ";
		} else {
			var morningOrNoon = "AM";
			var startTimeFull = event.gd$when[0].startTime;
			var hour = parseInt(startTimeFull.substr(startTimeFull.indexOf("T")+1,2));
			var minute = startTimeFull.substr(startTimeFull.indexOf("T")+4,2);
			if(hour>12)
			{
				hour-=12;
				morningOrNoon = "PM";
			}
			var time = hour + ":" + minute + " " + morningOrNoon;
			
			eventstring += event.title.$t +" at " + time +". ";
		}
	}
	if(dayeventstring.length == 0)
	{
		dayeventstring = "NODAY"; //signals no events of this kind
	}
	else if(eventstring.length ==0)
	{
		eventstring = "NOEVENT";
	}
}
else
{
	dayeventstring = "NONE"; //Signals no events at all
	eventstring = "NONE";
}

var weatherjson = httpGet( "https://api.forecast.io/forecast/ead91069a070e4f95c0861d137bb6c5b/"+global("%LOC"));
var weatherjsonobj = jQuery.parseJSON(weatherjson);
weather = "Here are the current weather conditions. "+ weatherjsonobj.currently.summary + ". The temperature is "+Math.round(weatherjsonobj.currently.temperature) + " degrees. ";
weather+= "Here is today's forcast. "+weatherjsonobj.hourly.summary+" Low of "+Math.round(weatherjsonobj.daily.data[0].temperatureMin)+". High of "+Math.round(weatherjsonobj.daily.data[0].temperatureMax)+".";

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}