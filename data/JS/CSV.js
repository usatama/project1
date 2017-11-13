/**
 * CSV.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      csvNm         : CSVファイル名（拡張子抜き）
 *  exec : disable
 * 
 */

function CSV(){

	// 内部変数の宣言 --------------------------------
	var hCsv;

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
		hCsv = new Array();
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var csvNm   = colData[1];
		if(typeof hCsv[csvNm] == "undefined"){
			hCsv[csvNm] = oFunc["CSV"].loadCsv(csvNm);
		}

		//文字列置き換え処理
		var lCsv = new Array();
		for(var i=0;i<hCsv[csvNm].length;i++){
			var tmp = hCsv[csvNm][i];
			for(var j=2;j<colData.length;j+=2){
				tmp = replaceAll(tmp, "%" + blk(colData[j],"") + "%", blk(colData[j+1],""));
			}
			lCsv[i] = tmp;
		}

		this.loadScene( lCsv );
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
	}

	//------------------------------------------------
	// CSVファイルロード処理
	//------------------------------------------------
	this.loadCsv = function(csvNm) {

		var csvPath = "./data/" + csvNm + ".csv";	
		var resTxt = oFunc["xml"].loadXml(csvPath);
		
		if(isBlk(resTxt)){
			var resTxt = oFunc["xml"].loadXml("./data/" + sTitleSc + ".csv");
		}
		
		//「\n」を削除
		resTxt = replaceAll(resTxt, String.fromCharCode(13), "")
		//「\t」を削除
		resTxt = replaceAll(resTxt, String.fromCharCode(9), "")
		//「\+\r」を削除
		resTxt = replaceAll(resTxt, String.fromCharCode(92)+String.fromCharCode(10), "")
		//「\r」で分割して返却する
		return resTxt.split(String.fromCharCode(10));
	}

	//------------------------------------------------
	// シーンファイル切分＆ロード処理（※再帰呼出処理）
	//------------------------------------------------
	this.loadScene = function(rowData) {

		var colData ;

		//１行毎にロード処理実行
		for(var i=0;i<rowData.length;i++){

			colData = rowData[i].split(",");
			if(isBlk(colData[0])){ colData[0] = "WAIT" }

			try{
				oFunc[ colData[0] ].load(colData);
			}catch(e){
				console.warn('  warn loadScene '+ colData + '\n  warn '+e.message);
			}
		}
	}
	// END -------------------------------------------
}
