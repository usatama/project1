/**
 * canvas.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function canvas(){

	// 内部変数の宣言 --------------------------------
	var hCanvas;
	var hContext;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		hCanvas=document.getElementById('CANVAS1');
		try{
			hContext=hCanvas.getContext('2d');
		}catch(e){
			console.error("init canvas " + e);
			return;
		}
		//＠ドットを荒くするよ
		//hContext.imageSmoothingEnabled = false;
		//hContext.mozImageSmoothingEnabled = false;
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		
	}

	//------------------------------------------------
	// Contextハンドルの返却
	//------------------------------------------------
	this.getCt = function() {
		return hContext;
	}

	//------------------------------------------------
	// Canvasハンドルの返却
	//------------------------------------------------
	this.getCv = function() {
		return hCanvas;
	}

	//------------------------------------------------
	// 
	//------------------------------------------------
	this.exe = function() {
		hContext.fillStyle = "#000000";
		hContext.fillRect(0, 0, hCanvas.width, hCanvas.height);//仮置き
		hContext.fillStyle = "#FFFFFF";
	}

	// END -------------------------------------------
}
