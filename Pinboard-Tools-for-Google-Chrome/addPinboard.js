var BASE_URL = 'https://pinboard.in';
var pinboardUrl = BASE_URL+"/add?";
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

//Below based on Pinboard.In Safari extension
//https://pinboard.in/resources/safari/save_tabs/
var SUBMIT_URL  = BASE_URL + '/tabs/save/';
var DISPLAY_URL = BASE_URL + '/tabs/show/';

function save_tabs() {
	chrome.windows.getAll({"populate" : true}, makeTabList);
}

/*
// Not doing this yet, but could do with removing any chrome://, about:, etc tabs
// check if there are any nonempty tabs open
function hasContentTabs()
{
    var winz = safari.application.browserWindows;
    
    for (var i = 0; i < winz.length; i++)
    {
        var tabz = winz[i].tabs;
        for (var j = 0; j < tabz.length; j++)
        {
            if (tabz[j].url)
            {
                return true;
            }
        }
    }   
    return false;
}*/

//Callback thingyamabob based on Chromium Developer Examples
//http://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/api/windows/merge_windows/background.html?revision=39116&view=markup

function makeTabList(windows) {
	winz = [];
	result = { browser: "chrome",  windows: winz }; 

	var chromeWinz = windows;

	for (var i = 0; i < chromeWinz.length; i++) {
		var chromeTabz = chromeWinz[i].tabs;
		var tabz = [];

		for (var j = 0; j < chromeTabz.length; j++) {
			var cTab = chromeTabz[j];
			if (cTab.url) {
				tabz.push({	title:   cTab.title, 
											url:     cTab.url }); 
			}
		}
		winz.push(tabz);
	}   
	console.log(result);
	tabList = result;

	var params = new FormData();
	var req   = new XMLHttpRequest(); 

	params.append("data", JSON.stringify(result));
	console.log(JSON.stringify(result));
	req.open("POST", SUBMIT_URL, true);        

	req.onreadystatechange = function() {
	  if (req.readyState == 4) {
			chrome.tabs.create({url:DISPLAY_URL});
		}
  }   
	req.send(params);
}

