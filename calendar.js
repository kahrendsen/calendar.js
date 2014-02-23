
var json = httpGet("https://www.google.com/calendar/feeds/kendall.ahrendsen%40gmail.com/private-2acd1b3caf89da6a3d7b83996c66acb7/full?singleevents=true&orderby=starttime&sortorder=ascending&start-min=" + todaysdate + "T00:00:00&start-max=" + todaysdate + "T23:59:59&alt=json");
var jsonobject = jQuery.parseJSON(json);
var events = jsonobject.feed.entry;
dayeventstring = "";
eventstring = "";
for (var i = 0; i < events.length; i++) {
    alert(i)
    var event = events[i];
    if (event.hasOwnProperty("gd$originalEvent")) {
        dayeventstring += event.title.$t + ". ";
    } else {
        eventstring += event.title.$t + ". ";
    }
}

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}