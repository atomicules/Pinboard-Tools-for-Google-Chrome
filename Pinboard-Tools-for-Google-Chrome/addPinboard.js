var pinboardUrl = "http://pinboard.in/add?";
var url;
var title;
function add_bookmark() {
	chrome.tabs.getSelected( null , function(tab) {
 		url = (tab.url);
 		title = (tab.title);
 		window.open(pinboardUrl + 'url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=700,height=350');
	});
}

function add_later() {
	chrome.tabs.getSelected( null , function(tab) {
 		url = (tab.url);
 		title = (tab.title);
 		window.open(pinboardUrl + 'later=yes&noui=yes&jump=close&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title) + ' ','Pinboard','toolbar=no,width=100,height=100');
	});
}