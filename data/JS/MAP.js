/**
 * MAP.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function MAP(){

	// 内部変数の宣言 --------------------------------
	var sPicName  = "";
	var iChipsize = 1;
	var iChipcol  = 1;
	var oMap      = new Array(0);

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {

		hMapCv=document.getElementById('CANVAS_MAP');
		try{
			hMapCt=hMapCv.getContext('2d');
		}catch(e){
			console.error("init MAP " + e);
			return;
		}
		
		//＠ドットを荒くするよ
		//hMapCt.imageSmoothingEnabled = false;
		//hMapCt.mozImageSmoothingEnabled = false;

	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0],
			JsMap     : colData[1]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {

		var jsPath = "./data/" + playList.JsMap + ".js";	
		evalJs( oFunc["xml"].loadXml(jsPath) );

		var iFilecol  = Math.floor( oFunc["PIC"].getHImage(sPicName).width / iChipsize );

		hMapCt.clearRect(0, 0, hMapCt.canvas.width, hMapCt.canvas.height);

		for(i=0;i<oMap.length;i++){
			hMapCt.drawImage(oFunc["PIC"].getHImage(sPicName), 
							( oMap[i] % iFilecol ) * iChipsize,
							Math.floor( oMap[i] / iFilecol ) * iChipsize,
							iChipsize,
							iChipsize,
							( i % iChipcol ) * iChipsize,
							Math.floor( i / iChipcol ) * iChipsize,
							iChipsize,
							iChipsize  );
		}

/*
		oFunc["texture"].texture(hMapCt, oFunc["PIC"].getHImage(sPicName),
								 250, 150,
								 350, 150,
								 200, 200,
								 400, 200 );
		oFunc["texture"].texture(hMapCt, oFunc["PIC"].getHImage(sPicName),
								 450, 150,
								 550, 150,
								 400, 200,
								 600, 200 );
		oFunc["texture"].texture(hMapCt, oFunc["PIC"].getHImage(sPicName),
								 250, 100,
								 350, 100,
								 200, 150,
								 400, 150 );
		oFunc["texture"].texture(hMapCt, oFunc["PIC"].getHImage(sPicName),
								 450, 100,
								 550, 100,
								 400, 150,
								 600, 150 );
*/
		oFunc["PIC"].resMapInf(hMapCv.toDataURL());
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	//------------------------------------------------
	this.setMap = function( picName, chipsize, chipcol, map ) {
		sPicName  = picName;
		iChipsize = chipsize;
		iChipcol  = chipcol;
		oMap      = map;
	}

	// END -------------------------------------------
}
