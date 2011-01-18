var pinboardUrl = "http://pinboard.in/add?";
var url;
var title;
function add_bookmark() {
	chrome.tabs.getSelected( null , function(tab) {
 		url = (tab.url);
 		title = (tab.title);
		docurl = pinboardUrl + 'url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + '&description=' + encodeURIComponent(pbdescription) + ' ','Pinboard','toolbar=no,width=700,height=350';
		//Load save bookmark window in iFrame
		pbiframe = document.createElement('iframe');
		pbiframe.src = docurl;
		pbiframe.frameBorder = "0";
		pbiframe.width = "100%";
		pbiframe.height = "100%";
		document.body.innerHTML = "" ; //clear popup window
		document.body.style.width = "700px";
		document.body.style.height = "350px";//grow window
		document.body.appendChild(pbiframe);
	});
}

function add_later() {
	chrome.tabs.getSelected( null , function(tab) {
 		url = (tab.url);
 		title = (tab.title);
 		window.open(pinboardUrl + 'later=yes&noui=yes&jump=close&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=100,height=100');
	});
}
