/**
 * TXTA.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 !!!!!セーブ未対応
 */

function TXTA(){

	// 内部変数の宣言 --------------------------------
	var iTxtMax = 0;
	var iTxtShowMax = 0;
	var fTxtUpdate  = true;
	var sTxtEnc = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	var sTxt  = new Array;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		oFunc["SET"].SET("TXTA_RAWNUM" , "15");
		oFunc["SET"].SET("TXTA_ANIME"  , true);
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

		iTxtMax = 1;
		iTxtShowMax = 0;

		var tmp ="";
		var tmp2 ="";
		var cnt = 0;
		var max = oFunc["GET"].GET("TXTA_RAWNUM");
		for(var i=0;i<16;i++){
			if(!isBlk(playList.txt[i])){
				sTxt[cnt]="";
				tmp2 = this.encTxt(true,evalTxt(playList.txt[i]));
				for(var j=0; j<tmp2.length; j++){
					sTxt[cnt] += replaceAll(tmp2.charAt(j),';',',');
					if(j%max==(max-1)){
						if(tmp2.charAt(j+1)=="。" ||
						   tmp2.charAt(j+1)=="、"){j++; sTxt[cnt] += tmp2.charAt(j);}
						tmp += sTxt[cnt] + ":";
						cnt++;
						sTxt[cnt]="";
					}
					iTxtShowMax++;
				}
			}else{
				sTxt[cnt]="";
			}
			tmp += sTxt[cnt] + ":";
			cnt++;
		}
		//if(auto==true){
		//	iPWait = iTxtShowMax + 5;//@仮置き
		//}
		this.saveTxt( playList.mode, tmp+":");

		console.log(' read TXTA ( '+ sTxt[0] +' )');
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		var ct = oFunc["canvas"].getCt();
		var anime = oFunc["GET"].GET("TXTA_ANIME");

		ct.save();
		ct.font          = oFunc["GET"].GET("TXT_FONT");
		ct.fillStyle     = oFunc["GET"].GET("TXT_T_COLOR");
		ct.textAlign     = oFunc["GET"].GET("TXT_ALIGN");
		ct.textBaseline  = oFunc["GET"].GET("TXT_BASEL");
		ct.shadowColor   = oFunc["GET"].GET("TXT_S_COLOR");
		ct.shadowBlur    = 2;
		ct.shadowOffsetX = 1;
		ct.shadowOffsetY = 1;
		ct.globalAlpha   = 1;
		ct.globalCompositeOperation ="source-over";
		ct.setTransform(1, 0, 0, 1, 0, 0);

		var x = oFunc["GET"].GET("TXT_X");
		var y = oFunc["GET"].GET("TXT_Y");
		var h = ct.measureText("あ").width;
		var w = oFunc["GET"].GET("TXT_Y_SPACE") ;

		if( iTxtMax<iTxtShowMax && anime==true ){
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
			for(var i=0;i<sTxt.length;i++){
				ct.fillText( sTxt[i], x, y+(h+w)*i );
			}
		}

		ct.restore();

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
		
		tmp += oFunc["GET"].GET("TXTA_RAWNUM") + ":";
		tmp += oFunc["GET"].GET("TXTA_ANIME")  + ":";
		
		oFunc["SET"].SET("TXTA_LIST" , tmp);
		oFunc["SET"].SET("TXTA_STR"  , txt);
	}
	//------------------------------------------------
	// 暗号化処理
	//------------------------------------------------
	this.encTxt = function(fEnc,lTxt){

		if(fEnc){
			return lTxt;
		}

		var enc = "";

		for(i=0; i<lTxt.length; i++){
			if(lTxt.charAt(i)=='　' ||
			   lTxt.charAt(i)=='「' ||
			   lTxt.charAt(i)=='」' ||
			   lTxt.charAt(i)=='『' ||
			   lTxt.charAt(i)=='』' ||
			   lTxt.charAt(i)=='（' ||
			   lTxt.charAt(i)=='）' ||
			   lTxt.charAt(i)=='【' ||
			   lTxt.charAt(i)=='】' ||
			   lTxt.charAt(i)=='！' ||
			   lTxt.charAt(i)=='？' ||
			   lTxt.charAt(i)=='…' ||
			   lTxt.charAt(i)=='・' ||
			   lTxt.charAt(i)=='，' ||
			   lTxt.charAt(i)=='．' ||
			   lTxt.charAt(i)=='、' ||
			   lTxt.charAt(i)=='。'
			){
				enc += lTxt.charAt(i);
			} else {
				enc += sTxtEnc[lTxt.charCodeAt(i)%26];
			}
		}
		return enc;
	}
	//------------------------------------------------
	this.getTxtMax = function() {
		return iTxtMax;
	}
	//------------------------------------------------
	//------------------------------------------------
	this.getTxtShowMax = function() {
		return iTxtShowMax;
	}
	//------------------------------------------------
	// END -------------------------------------------
}
