/**
 * TXT.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function TXT(){

	// 内部変数の宣言 --------------------------------
	var hTxtCv;
	var hTxtCt;
	var iTxtMax = 0;
	var iTxtShowMax = 0;
	var fTxtUpdate  = true;
	var sTxtEnc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var sTxt  = new Array;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {

		hTxtCv=document.getElementById('CANVAS_TXT');
		try{
			hTxtCt=hTxtCv.getContext('2d');
		}catch(e){
			console.error("init TXT " + e);
			return;
		}
		
		//＠ドットを荒くするよ
		//hTxtCt.imageSmoothingEnabled = false;
		//hTxtCt.mozImageSmoothingEnabled = false;

		oFunc["SET"].SET("TXT_FONT"   , "bold 30px pixel");
		oFunc["SET"].SET("TXT_T_COLOR", "#FFFFFF");
		oFunc["SET"].SET("TXT_ALIGN"  , "start");
		oFunc["SET"].SET("TXT_BASEL"  , "top");
		oFunc["SET"].SET("TXT_S_COLOR", "#FF0000");

		oFunc["SET"].SET("TXT_VH"     , 'H');
		oFunc["SET"].SET("TXT_X"      , 0);
		oFunc["SET"].SET("TXT_Y"      , 0);
		oFunc["SET"].SET("TXT_Y_SPACE", 40);

		oFunc["SET"].SET("TXT_MAX"    , 0);
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
			mode      : colData[1]
		}
		
		playList.txt =  new Array;
		for(i=0; i<colData.length; i++){
			playList.txt[i] = colData[i+2];
		}
		
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		iTxtShowMax = 0;
		fTxtUpdate  = true;

		//SAVE用
		var tmp ="";
		for(i=0;i<16;i++){
			if(!isBlk(playList.txt[i])){
				sTxt[i] = evalTxt(playList.txt[i]);
				tmp += sTxt[i] + ":";
				iTxtShowMax += sTxt[i].length;
			}else{
				sTxt[i]="";
			}
		}
		
		if(playList.mode != "ADD"){
			hTxtCt.clearRect(0, 0, hTxtCt.canvas.width, hTxtCt.canvas.height);
			for(i=0; i<oFunc["GET"].GET("TXT_MAX"); i++){
				oFunc["DEL"].DEL("TXT_LIST_" + i );
				oFunc["DEL"].DEL("TXT_STR_"  + i );
			}
			oFunc["SET"].SET("TXT_MAX", 0);
		}
		this.saveTxt( playList.mode, tmp+":");

		if(oFunc["auto"].getSkip()){
			return;
		}

		hTxtCt.save();
		hTxtCt.font          = oFunc["GET"].GET("TXT_FONT");
		hTxtCt.fillStyle     = oFunc["GET"].GET("TXT_T_COLOR");
		hTxtCt.textAlign     = oFunc["GET"].GET("TXT_ALIGN");
		hTxtCt.textBaseline  = oFunc["GET"].GET("TXT_BASEL");
		hTxtCt.shadowColor   = oFunc["GET"].GET("TXT_S_COLOR");
		hTxtCt.shadowBlur    = 2;
		hTxtCt.shadowOffsetX = 1;
		hTxtCt.shadowOffsetY = 1;
		hTxtCt.globalAlpha   = 1;
		hTxtCt.globalCompositeOperation ="source-over";
		hTxtCt.setTransform(1, 0, 0, 1, 0, 0);

		if(oFunc["GET"].GET("TXT_VH")=="'V'"){
			var x = oFunc["GET"].GET("TXT_X");
			var y = oFunc["GET"].GET("TXT_Y");
			var h = hTxtCt.measureText("あ").width;
			var w = oFunc["GET"].GET("TXT_Y_SPACE");
			sTxt.forEach(function(elm, i) {
				Array.prototype.forEach.call(elm, function(ch, j) {
					hTxtCt.save();
					if(ch.match(/、|。|，|．/) !== null) {
						// 点系
						hTxtCt.translate(x-w*i,y+h*j);
						hTxtCt.rotate(0);
						hTxtCt.fillText(ch, w/2, h/-2);
					} else if (ch.match(/ー|－|―|～|…|（|）|「|」|『|』|【|】|：|；/) !== null) {
						// 縦棒&括弧系
						hTxtCt.translate(x-w*(i-0.75),y+h*j);
						hTxtCt.rotate(Math.PI/2);
						hTxtCt.fillText(ch, 0, 0);
					} else if (ch.match(/ぁ|ぃ|ぅ|ぇ|ぉ|っ|ゃ|ゅ|ょ|ァ|ィ|ゥ|ェ|ォ|ッ|ャ|ュ|ョ|ｧ|ｨ|ｩ|ｪ|ｫ|ｯ|ｬ|ｭ|ｮ/) !== null) {
						// 小文字系
						hTxtCt.translate(x-w*i,y+h*j);
						hTxtCt.rotate(0);
						hTxtCt.fillText(ch, w/6, h/-5);
					} else if (ch.match(/♥|♡/) !== null) {
						// 小文字系
						hTxtCt.translate(x-w*i,y+h*(j-1));
						hTxtCt.rotate(0);
						hTxtCt.fillText(ch, w/7, h);
					} else {
						// その他
						hTxtCt.translate(x-w*i,y+h*j);
						hTxtCt.rotate(0);
						hTxtCt.fillText(ch, 0, 0);
					}
					hTxtCt.restore();
				});
			});
		}else{
			var x = oFunc["GET"].GET("TXT_X");
			var y = oFunc["GET"].GET("TXT_Y");
			var h = hTxtCt.measureText("あ").width;
			var w = oFunc["GET"].GET("TXT_Y_SPACE");
			for(i=0;i<sTxt.length;i++){
				hTxtCt.fillText(
					sTxt[i],
					x,
					y+(h+w)*i );
			}
		}

		hTxtCt.restore();
		
		console.log(' read TXT ( '+ sTxt[0] +' )');
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		if(fTxtUpdate){
			oFunc["PIC"].resTxtInf(hTxtCv.toDataURL());
			fTxtUpdate = false;
		}
	}
	//------------------------------------------------
	//------------------------------------------------
	this.saveTxt = function(mode, txt) {
		//SAVE用
		var tmp = ""
		tmp += mode + ":";
		tmp += oFunc["GET"].GET("TXT_FONT")    + ":";
		tmp += oFunc["GET"].GET("TXT_T_COLOR") + ":";
		tmp += oFunc["GET"].GET("TXT_ALIGN")   + ":";
		tmp += oFunc["GET"].GET("TXT_BASEL")   + ":";
		tmp += oFunc["GET"].GET("TXT_S_COLOR") + ":";
		tmp += oFunc["GET"].GET("TXT_VH")      + ":";
		tmp += oFunc["GET"].GET("TXT_X")       + ":";
		tmp += oFunc["GET"].GET("TXT_Y")       + ":";
		tmp += oFunc["GET"].GET("TXT_Y_SPACE") + ":";
		
		oFunc["SET"].SET("TXT_LIST_" + oFunc["GET"].GET("TXT_MAX") , tmp);
		oFunc["SET"].SET("TXT_STR_"  + oFunc["GET"].GET("TXT_MAX") , txt);
		oFunc["UPD"].UPD("TXT_MAX", "+=" , 1);
	}

	// END -------------------------------------------
}
