/**
 * plural.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function plural(){

	// 内部変数の宣言 --------------------------------


	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		
	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.plural = function(txt) {
		alert(txt)
		//alert(";".charCodeAt())
		//alert(String.fromCharCode(59))
		colData = txt.split(";");
		for( i=0; i<colData.length; i++){
			alert(colData[i]);
			oFunc["EXEC"].EXEC(colData[i]);
		}

	}

	// END -------------------------------------------
}
