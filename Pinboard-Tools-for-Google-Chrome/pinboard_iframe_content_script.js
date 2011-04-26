//Content script for the pinboard save bookmark iFrame
//Use local storage to save tags and description entered so if you
//accidentally close the popup before saving the bookmark the 
//values will be restored next time.
//
//Very rudimentary initial implementation of this:
// - works globally so you can only "draft" one bookmark, i.e. can't
//   draft tags and description for different tabs simultaneously.
// - Is a little bit clever though: if you are drafting a bookmark
//   from tab A and close the popup and switch to tab B and click on
//   the save bookmark option it won't fill in the draft values from 
//   tab A (since it is a different url). It also won't overwrite the
//   the stored values unless you enter some info whilst on tab B. I.e.
//   that means you can close the popup (say you got the wrong tab),
//   switch back to tab A and the draft values will still be there.
// - will attempt to restore values only if the fields are blank. i.e.
//   an unsaved bookmark. Also, no good for drafting changes to previously
//   saved bookmarks.
// - Only works on the tags and description fields.
// - Effects the pinboard.in bookmarklets and any window saving via
//   the "https://pinboard.in/add/" url.
//
//TODO: Make it better. I have a feeling I should really use messaging
//between this iFrame and the extension and do the local storage from
//there. Also would be nice if it could be made properly URL aware so
//you can draft multiple bookmarks and somehow draft changes to 
//oreviously saved ones


//Local storage functions from: http://www.rajdeepd.com/articles/chrome/localstrg/LocalStorageSample.htm
	var logging  = false;

	function setItem(key, value) {
		try {
			log("Inside setItem:" + key + ":" + value);
			window.localStorage.removeItem(key);
			window.localStorage.setItem(key, value);
		}catch(e) {
			log("Error inside setItem");
			log(e);
		}
		log("Return from setItem" + key + ":" +  value);
	}
function getItem(key) {
	var value;
	log('Get Item:' + key);
	try {
		value = window.localStorage.getItem(key);
	}catch(e) {
		log("Error inside getItem() for key:" + key);
		log(e);
		value = "null";
	}
	log("Returning value: " + value);
	return value;
}

function log(txt) {
	if(logging) {
		console.log(txt);
	}
}

//Modify the iFrame
	//Save values on onload, but only if none blank and it's not a previously saved bookmark
	//Provides a bit of safety if accidentally click on popup in different tab
	document.body.onunload = function () {
		if ((document.forms[0].tags.value != "") && (document.forms[0].description.value != "" ) && (document.getElementsByClassName('alert')[0] == undefined)) {
			setItem('url',document.forms[0].url.value); 
			setItem('tags',document.forms[0].tags.value); 
			setItem('description', document.forms[0].description.value)
		}
	}
	
	//Check if url matches
	if (document.forms[0].url.value == getItem("url")) {
		//For this first attempt, let's just check if fields are blank, if so try to pull from local storage
		
		if (document.forms[0].tags.value == "") {
			document.forms[0].tags.value = getItem("tags")
		}
		if (document.forms[0].description.value == "") {
			document.forms[0].description.value = getItem("description")
		}
	}
