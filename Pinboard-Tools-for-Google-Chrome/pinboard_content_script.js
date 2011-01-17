//From http://code.google.com/chrome/extensions/messaging.html
//Used to get selected text on page
chrome.extension.onRequest.addListener(
		function(request, sender, sendResponse) {
			if (request.action == "getTXT")
				sendResponse({description: document.getSelection().toString()});
			else
				sendResponse({description: ""}); // Send nothing..
		}
);


