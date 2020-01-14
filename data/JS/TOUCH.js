/** 
 * TOUCH.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * ref:
 * https://qiita.com/yukiTTT/items/773356c2483b96c9d4e0
 */

function TOUCH(){

	// 内部変数の宣言 --------------------------------
	var sTouchAria = "";
	var iAriaMax   = 0;
	var iMouseX    = 0;
	var iMouseY    = 0;
	var iMouseW    = 0;
	var iWheelUD   = 0;
	var fMousePush = false;
	var fMouseTgl  = false;
	var iKeyLEFT   = 0;
	var iKeyRIGHT  = 0;
	var iKeyUP     = 0;
	var iKeyDOWN   = 0;
	var iKeyZ      = 0;
	var iKeyX      = 0;
	var iKeyC      = 0;
	var iAnyKey    = 0;
	var sAnyKey    = "";
	var oTouchList;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		//入力リスナー作成
		oFunc["canvas"].getCv().addEventListener("mousemove"     ,mouseMoveListner   ,false);
		oFunc["canvas"].getCv().addEventListener("touchmove"     ,mouseMoveListner   ,false);
		oFunc["canvas"].getCv().addEventListener("mouseout"      ,mouseOutListner    ,false);
		oFunc["canvas"].getCv().addEventListener("mousedown"     ,mouseDownListner   ,false);
		oFunc["canvas"].getCv().addEventListener("touchstart"    ,mouseDownListner   ,false);
		oFunc["canvas"].getCv().addEventListener("mouseup"       ,mouseUpListner     ,false);
		oFunc["canvas"].getCv().addEventListener("touchend"      ,mouseUpListner     ,false);
		oFunc["canvas"].getCv().addEventListener("touchcancel"   ,mouseUpListner     ,false);
		oFunc["canvas"].getCv().addEventListener("mousewheel"    ,mouseWheelListner  ,false);
		oFunc["canvas"].getCv().addEventListener("DOMMouseScroll",mouseWheelListner  ,false);
		document.addEventListener("keydown"       ,keydownListner     ,false);
		document.addEventListener("keyup"         ,keyupListner       ,false);
		document.addEventListener("touchmove"     ,handleTouchMove    ,{ passive: false });
		//window.addEventListener("orientationchange resize", oFunc["screen"].screen(),false );
		//SAVE用
		oFunc["SET"].SET("TOUCH_LIST", "");
		oFunc["SET"].SET("TOUCH_MAX", 0);
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		oTouchList = new Array();
		sTouchAria = "";
		iAriaMax   = 0;
		iMouseW    = 0;
		iWheelUD   = 0;
		fMousePush = false;
		fMouseTgl  = false;
		iKeyLEFT   = 0;
		iKeyRIGHT  = 0;
		iKeyUP     = 0;
		iKeyDOWN   = 0;
		iKeyZ      = 0;
		iKeyX      = 0;
		iKeyC      = 0;
		iAnyKey    = 0;
		sAnyKey    = "";
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0] ,
			funcNm    : colData[1] ,
			mode      : colData[2] ,
			xpoint    : colData[3] ,
			ypoint    : colData[4] ,
			xsize     : colData[5] ,
			ysize     : colData[6] ,
			showNm    : colData[7] ,
			power     : colData[8] ,
			range     : colData[9]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {

		if(oFunc["play"].getPlayList().mode == "CLR"){
			//this.reset();
			oTouchList = new Array();
			iAriaMax   = 0;
			//SAVE用
			oFunc["SET"].SET("TOUCH_LIST", "");
			oFunc["SET"].SET("TOUCH_MAX", 0);
		}else{
			oTouchList[iAriaMax] = Object.assign({}, playList);
			oTouchList[iAriaMax].xpoint = evalTxt(playList.xpoint);
			oTouchList[iAriaMax].ypoint = evalTxt(playList.ypoint);
			oTouchList[iAriaMax].xsize  = evalTxt(playList.xsize);
			oTouchList[iAriaMax].ysize  = evalTxt(playList.ysize);
			//SAVE用
			var tmp = ""
			tmp += oTouchList[iAriaMax].kind      + ":";
			tmp += oTouchList[iAriaMax].funcNm    + ":";
			tmp += oTouchList[iAriaMax].mode      + ":";
			tmp += oTouchList[iAriaMax].xpoint    + ":";
			tmp += oTouchList[iAriaMax].ypoint    + ":";
			tmp += oTouchList[iAriaMax].xsize     + ":";
			tmp += oTouchList[iAriaMax].ysize     + ":";
			tmp += oTouchList[iAriaMax].showNm    + ":";
			tmp += oTouchList[iAriaMax].power     + ":";
			tmp += oTouchList[iAriaMax].range     + ":";

			if(iAriaMax > 0){
				tmp = oFunc["GET"].GET("TOUCH_LIST") + tmp;
			}

			oFunc["SET"].SET("TOUCH_LIST", tmp);

			iAriaMax++;
		}
		
		//SAVE用
		oFunc["SET"].SET("TOUCH_MAX", iAriaMax);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

		//選択中、エリア名を初期化
		sTouchAria = "";

		//AUTO処理中は入力で解除する
		if(oFunc["auto"].getAuto() == true ){
			if(fMouseTgl != fMousePush && fMousePush == false){
				oFunc["auto"].auto();
			}
			fMouseTgl = fMousePush;
			return;
		}

		//WAIT処理中は入力判定しない
		if(oFunc["WAIT"].getWait() > -1 && oFunc["WAIT"].getWait() == true){
			return;
		}

		//入力処理
		for(i=0;i<iAriaMax;i++){
			var oTouch = oTouchList[i];

			//画像の表示名から判定領域を算出
			if(!isBlk(oTouch.showNm)){
				if(oTouch.mode=="BOX"){
					oTouch.xsize  = oFunc["PIC"].getHImgInf(oTouch.showNm).wtouch * blk(oTouch.power, 1);
					oTouch.ysize  = oFunc["PIC"].getHImgInf(oTouch.showNm).htouch * blk(oTouch.power, 1);
					oTouch.xpoint = oFunc["PIC"].getHImgInf(oTouch.showNm).xtouch + (oFunc["PIC"].getHImgInf(oTouch.showNm).wtouch - oTouch.xsize) / 2;
					oTouch.ypoint = oFunc["PIC"].getHImgInf(oTouch.showNm).ytouch + (oFunc["PIC"].getHImgInf(oTouch.showNm).htouch - oTouch.ysize) / 2;
				} else if(oTouch.mode=="SQRT"){
					oTouch.xpoint = oFunc["PIC"].getHImgInf(oTouch.showNm).xtouch + oFunc["PIC"].getHImgInf(oTouch.showNm).wtouch / 2;
					oTouch.ypoint = oFunc["PIC"].getHImgInf(oTouch.showNm).ytouch + oFunc["PIC"].getHImgInf(oTouch.showNm).htouch / 2;
					oTouch.xsize  = oFunc["PIC"].getHImgInf(oTouch.showNm).wtouch / 2 * blk(oTouch.power, 1) ;
				}
			}
			
			//領域内を選択したか判定・表示
			if(    (oTouch.mode == "BOX"
						&& oTouch.xpoint < iMouseX 
						&& oTouch.ypoint < iMouseY 
						&& Number(oTouch.xpoint) + Number(oTouch.xsize) > iMouseX 
						&& Number(oTouch.ypoint) + Number(oTouch.ysize) > iMouseY  )
				|| (oTouch.mode == "SQRT"
						&& Math.floor(Math.sqrt(
							Math.pow(Math.abs(oTouch.xpoint-iMouseX), 2)
						  + Math.pow(Math.abs(oTouch.ypoint-iMouseY), 2))) < oTouch.xsize )
				){

				//選択エリア名を設定
				if( isBlk(sTouchAria) ) sTouchAria = oTouch.showNm;

				if(fMouseTgl != fMousePush && fMousePush == false){
					//実行
					evalTxt(oTouch.funcNm);
					break;
				} else if( fMousePush == true && oTouch.mode=="BOX" && !isBlk(oTouch.range)) {
					//領域表示
					oFunc["canvas"].getCt().save();
					oFunc["canvas"].getCt().strokeStyle='#'+oTouch.range;
					oFunc["canvas"].getCt().beginPath();
					oFunc["canvas"].getCt().strokeRect(oTouch.xpoint, oTouch.ypoint, oTouch.xsize, oTouch.ysize);
					oFunc["canvas"].getCt().restore();
				} else if( fMousePush == true && oTouch.mode=="SQRT" && !isBlk(oTouch.range)) {
					//領域表示
					oFunc["canvas"].getCt().save();
					oFunc["canvas"].getCt().strokeStyle='#'+oTouch.range;
					oFunc["canvas"].getCt().beginPath();
					oFunc["canvas"].getCt().arc(oTouch.xpoint, oTouch.ypoint, oTouch.xsize, 0, Math.PI*2, false);
					oFunc["canvas"].getCt().stroke();
					oFunc["canvas"].getCt().restore();
				}

			}

			//マウスホイールを使用した場合の実行処理
			if( iMouseW != 0
				&& ( (oTouch.mode=="WHEELUP" && iMouseW == -1)
					|| (oTouch.mode=="WHEELDOWN" && iMouseW == 1) )
				){

				//実行
				evalTxt(oTouch.funcNm);
				break;
			}

			//キーボードを使用した場合の実行処理
			if(    (oTouch.mode == "KEYUP"    && iKeyUP    == 2)
				|| (oTouch.mode == "KEYLEFT"  && iKeyLEFT  == 2)
				|| (oTouch.mode == "KEYRIGHT" && iKeyRIGHT == 2)
				|| (oTouch.mode == "KEYDOWN"  && iKeyDOWN  == 2)
				|| (oTouch.mode == "KEYZ"     && iKeyZ     == 2)
				|| (oTouch.mode == "KEYX"     && iKeyX     == 2)
				|| (oTouch.mode == "KEYC"     && iKeyC     == 2)
				|| (oTouch.mode == "ANYKEY"   && iAnyKey   == 2)
				){

				//alert(oTouch.funcNm);
				//実行
				evalTxt(oTouch.funcNm);
				iKeyLEFT   = 0;
				iKeyRIGHT  = 0;
				iKeyUP     = 0;
				iKeyDOWN   = 0;
				iKeyZ      = 0;
				iKeyX      = 0;
				iKeyC      = 0;
				iAnyKey    = 0;
				oFunc["SET"].SET("TOUCH_ANYKEY", blk(sAnyKey,"?"));
				sAnyKey    = "";
				break;
			}
		}
		iMouseW = 0;
		fMouseTgl = fMousePush;
	}

	//------------------------------------------------
	// シーンファイル内、処理一覧の最大の返却
	//------------------------------------------------
	this.getTouchList = function() {
		return oTouchList;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.setAriaMax = function(max) {
		iAriaMax=max;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getMousePush = function() {
		return fMousePush;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getMouseX = function() {
		return iMouseX;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getMouseY = function() {
		return iMouseY;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getTouchAria = function() {
		return sTouchAria;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.getAnyKey = function() {
		return sAnyKey;
	}

	//////////////////////////////////////////////////
	// 入力関連処理
	//////////////////////////////////////////////////
	function mouseMoveListner(e) {
		if(fMousePush == true){
			adjustXY(e);
		}
	}
	function mouseDownListner(e) {
		adjustXY(e);
		fMousePush = true;
	}
	function mouseUpListner(e) {
		adjustXY(e);
		fMousePush = false;
		oFunc["AUDIO"].preLoad();
	}
	function mouseOutListner(e) {
		//adjustXY(e);
		fMousePush = false;
	}
	function adjustXY(e) {
		if(e.touches != undefined){
			var rect = e.target.getBoundingClientRect();
			if(e.touches.length > 0){
				var touh = e.targetTouches[0];
				if( oFunc["screen"].getDeg() == true ){
					iMouseY = Math.floor(touh.clientX*oFunc["screen"].getZoom() - rect.right*oFunc["screen"].getZoom()) * -1;
					iMouseX = Math.floor(touh.clientY*oFunc["screen"].getZoom() - rect.top*oFunc["screen"].getZoom());
				}else{
					iMouseX = Math.floor(touh.clientX*oFunc["screen"].getZoom() - rect.left*oFunc["screen"].getZoom());
					iMouseY = Math.floor(touh.clientY*oFunc["screen"].getZoom() - rect.top*oFunc["screen"].getZoom());
				}
			}
/*			if(e.touches.length > 1){
				var touh = e.targetTouches[1];
				if( oFunc["screen"].getDeg() == true ){
					iMouseX = Math.floor(touh.clientX*oFunc["screen"].getZoom() - rect.right*oFunc["screen"].getZoom()) * -1;
				}else{
					iMouseX = Math.floor(touh.clientX*oFunc["screen"].getZoom() - rect.left*oFunc["screen"].getZoom());
				}
				iMouseY = Math.floor(touh.clientY*oFunc["screen"].getZoom() - rect.top*oFunc["screen"].getZoom());
			}
*/
		}else{
			var rect = e.target.getBoundingClientRect();
			if( oFunc["screen"].getDeg() == true ){
				iMouseY = Math.floor(e.clientX*oFunc["screen"].getZoom() - rect.right*oFunc["screen"].getZoom()) * -1;
				iMouseX = Math.floor(e.clientY*oFunc["screen"].getZoom() - rect.top*oFunc["screen"].getZoom());
			}else{
				iMouseX = Math.floor(e.clientX*oFunc["screen"].getZoom() - rect.left*oFunc["screen"].getZoom());
				iMouseY = Math.floor(e.clientY*oFunc["screen"].getZoom() - rect.top*oFunc["screen"].getZoom());
			}

		}
		//console.log(iMouseX + "," + iMouseY);
		oFunc["SET"].SET("DEBUG", iMouseX + "," + iMouseY);
	}
	function mouseWheelListner(e) {
		//alert(e.detail +" "+ e.wheelDelta);
		if(e.detail > 0 || e.wheelDelta < 0) iMouseW = 1;
		if(e.detail < 0 || e.wheelDelta > 0) iMouseW = -1;

		//iMouseW = e.detail > 0 ? e.detail / 10.0 : e.wheelDelta / -120.0;
		//iMouseW = e.detail > 0 ? 1.0 : -1.0;
	}
	function keydownListner(e) {
		if( oFunc["WAIT"].getWait() == -1 ){
			if( e.keyCode == 37 ) iKeyLEFT   = 1;
			if( e.keyCode == 39 ) iKeyRIGHT  = 1;
			if( e.keyCode == 38 ) iKeyUP     = 1;
			if( e.keyCode == 40 ) iKeyDOWN   = 1;
			if( e.keyCode == 90 ) iKeyZ      = 1;
			if( e.keyCode == 88 ) iKeyX      = 1;
			if( e.keyCode == 67 ) iKeyC      = 1;
			if( e.keyCode >= 48 && e.keyCode <= 57 ) iAnyKey = 1;
			if( e.keyCode >= 65 && e.keyCode <= 90 ) iAnyKey = 1;
			if( e.keyCode == 13 ) iAnyKey = 1;
			//32 space 190 . 13 return
			//alert(e.keyCode);
		}
	}
	function keyupListner(e) {
		if( oFunc["WAIT"].getWait() == -1 ){
			if( e.keyCode == 37 && iKeyLEFT  == 1 ) iKeyLEFT   = 2;
			if( e.keyCode == 39 && iKeyRIGHT == 1 ) iKeyRIGHT  = 2;
			if( e.keyCode == 38 && iKeyUP    == 1 ) iKeyUP     = 2;
			if( e.keyCode == 40 && iKeyDOWN  == 1 ) iKeyDOWN   = 2;
			if( e.keyCode == 90 && iKeyZ     == 1 ) iKeyZ      = 2;
			if( e.keyCode == 88 && iKeyX     == 1 ) iKeyX      = 2;
			if( e.keyCode == 67 && iKeyC     == 1 ) iKeyC      = 2;
			if( e.keyCode >= 48 && e.keyCode <= 57 && iAnyKey   == 1 ) {
				sAnyKey = String.fromCharCode(e.keyCode); iAnyKey    = 2; }
			if( e.keyCode >= 65 && e.keyCode <= 90 && iAnyKey   == 1 ) {
				sAnyKey = String.fromCharCode(e.keyCode); iAnyKey    = 2; }
			if( e.keyCode == 13  && iAnyKey   == 1 ) {
				sAnyKey = String.fromCharCode(e.keyCode); iAnyKey    = 2; }
		}
	}
	function handleTouchMove(e) {
		e.preventDefault();
	}
	// END -------------------------------------------
}
