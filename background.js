//Add later function here so can close popup straight away.

function reset_icon() {
	chrome.browserAction.setIcon({path:"img/pinboard16.png"})
}

function add_later_bg(docurl) {
	//Let's do this in an iFrame as well
	pbiframe = document.createElement('iframe');
	pbiframe.src = docurl;
	document.body.innerHTML = "" ; //clear any existing one
	document.body.appendChild(pbiframe); 
	//Change icon based on success (How to check? If not logged in, etc). Could use setBadgeText({text:"OK"})
	chrome.browserAction.setIcon({path:"img/pinboard16-green.png"})
	//Delay and then change back. 
	setTimeout(reset_icon, 2000)
}
