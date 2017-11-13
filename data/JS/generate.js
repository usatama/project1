/**
 * generate.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

//------------------------------------------------
// JSファイルの宣言
//------------------------------------------------
function generateJs() {

	for(var i in sUseFunc){
		var script = document.createElement('script');
		script.type="text/javascript";
		script.src ="data/JS/"+sUseFunc[i]+".js";
		document.head.appendChild(script);

		//console.debug('generateJs: ' + sUseFunc[i]);
	}
}
generateJs();

// END --------------------------------------------
