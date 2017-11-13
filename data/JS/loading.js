/**
 * loading.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function loading(){

	// 内部変数の宣言 --------------------------------
	var iTxtMax = 0;
	var iTxtShowMax = 0;
	var sTxt    = new Array;
	var iAlpha  = 0.0;
	var fUpDown = true;


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

		iTxtMax = 1;
		iTxtShowMax = 0;
		fAlpha  = 0;
		fUpDown = true;

		sTxt = this.loadMsg(sSceneNm);
		for(var i=0;i<16;i++){
			iTxtShowMax += sTxt[0].length;
		}

	}

	//------------------------------------------------
	// 各ファイルロード実行中の「待ってね」処理
	//------------------------------------------------
	this.loading = function(ldCnt, ldEnd) {

		var ct = oFunc["canvas"].getCt();
		var cv = oFunc["canvas"].getCv();
		
		ct.save();
		//画面黒塗り
		ct.fillStyle = "#000000";
		ct.fillRect(0, 0, cv.width, cv.height);

		//アルファ処理
		if(fUpDown == true){
			iAlpha += 0.02;
		}else{
			iAlpha -= 0.02;
		}
		if(iAlpha >= 1.0){
			fUpDown = false;
			iAlpha  = 1.0;
		}
		if(iAlpha <= 0.0){
			fUpDown = true;
			iAlpha  = 0.0;
		}

		ct.font          = "bold 20px kokumr";
		ct.fillStyle     = "#FFFFFF";
		ct.textAlign     = "center";
		ct.textBaseline  = "top";
		ct.shadowColor   = "#0000FF";
		ct.shadowBlur    = 2;
		ct.shadowOffsetX = 1;
		ct.shadowOffsetY = 1;
		ct.globalAlpha   = iAlpha;
		ct.globalCompositeOperation ="source-over";
		ct.setTransform(1, 0, 0, 1, 0, 0);

		//バー表示
		//var bar="世界再構築中........................................完了";
		//var max = 30 + parseInt((ldEnd / ldCnt)*40)
		//if(ldEnd==ldCnt){max+=2}
		//ct.fillText(bar.slice(0,max), 568, 580 );
		if(ldEnd==ldCnt){
			ct.fillText("＊ クリックで開始します ＊", 568, 600 );
		}else{
			ct.globalAlpha   = 1;
			ct.fillText("… データロード中です …", 568, 600 );
		}

		
		
		//読み込み時表示
		ct.font          = "bold 30px kokumr";
		ct.textAlign     = "start";
		ct.globalAlpha   = 1;
		ct.shadowColor   = "#0000FF";
		var x = 250;
		var y = 20;
		var h = ct.measureText("あ").width;
		var w = 15 ;

/*		if(iTxtMax<iTxtShowMax){
			var iTxtNum = 0;
			for(var i=0;i<sTxt.length;i++){
				var sTxtShow=""
				for(var j=0; j<sTxt[i].length; j++){
					sTxtShow += sTxt[i].charAt(j);
					if(iTxtNum>iTxtMax){ break; }
					iTxtNum++;
				}
				ct.fillText( sTxtShow, x, y+(h+w)*i );
				if(iTxtNum>iTxtMax){ break; }
			}
			iTxtMax++;
		}else{
*/			for(var i=0;i<sTxt.length;i++){
				ct.fillText( sTxt[i], x, y+(h+w)*i );
			}
//		}

		ct.restore();
	}

	//------------------------------------------------
	// 各ファイルロード実行中の「待ってね」メッセージ処理
	//------------------------------------------------
	this.loadMsg = function(lSceneNm) {

		var no = Math.floor(Math.random()*2);
		if(lSceneNm == "SCENE/S-0"){ no=100 }

		if(no == 100){ //キーワード：初回注記
			return ["※注意",
					"このゲームはフィクションです。",
					"登場する人物・団体・名称はすべて架空ものであり、",
					"実在するものとは一切関係ありません。",
					"",
					"このゲームにより発生した、いかなる問題に対しても",
					"当方は一切責任を負いません。",
					""];
		}
		return [""];

	}
	// END -------------------------------------------
}
