function copySelectedUrls() {
	chrome.tabs.query({currentWindow:true,highlighted:true}, function(tabs) {
		if ((tabs != undefined) && (tabs.length>1)){//copy selected tabs if existed
			createText(tabs);
		}else{
			chrome.tabs.query({currentWindow:true, active:true}, function(tabs) {
				//console.log("only current");
				createText(tabs);
			});
		}
	});
}

function copyAllUrls(){
	chrome.tabs.query({currentWindow:true}, function(tabs) {
		createText(tabs);
	});
}

function createText(tabs){
	var format = localStorage["copy_all_urls_format"];
	if (!format) { format = "%text% %url%"; }
	var result = "";
	for (i = 0; i < tabs.length; i++) {
		result += format.replace(/%text%/g, tabs[i].title).
			replace(/%url%/g, tabs[i].url).
			replace(/\\t/g, "\t").
			replace(/\\n/g, "\n");
		result += '\n';
	}
	printText(result);
}

function printText(result){
	var target = document.getElementById('target');
	target.value = result;
	target.select();
	document.execCommand("copy", false, null);
	var range = target.setSelectionRange();//unSelect
	range.moveStart( "character", 0) 
	range.moveEnd( "character", 0); 
	range.select(); 
}

document.addEventListener("DOMContentLoaded", copySelectedUrls);
document.getElementById('all').addEventListener("click", copyAllUrls);
