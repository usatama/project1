/**
 * SHOW.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function SHOW(){

	// 内部変数の宣言 --------------------------------
	var oShowList;

	//------------------------------------------------
	// （共通）ファンクション生成時、初期化処理
	//------------------------------------------------
	this.init = function() {
		//SAVE用
		oFunc["SET"].SET("SHOW_LIST", "");
		oFunc["SET"].SET("SHOW_MAX", 0);
	}
	this.init();

	//------------------------------------------------
	// （共通）シーンロード前、再初期化処理
	//------------------------------------------------
	this.reset = function() {
		oShowList = new Array();
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0]
		}

		playList.showName = new Array();
		for(var i=0; i<colData.length+1; i++){
			if(colData[i+1]){
				playList.showName[i] = colData[i+1];
				//console.debug(' load SHOW ( '+ i +' : '+ colData[i+1] +' )');
			}
		}

		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {

		var oShowList_old = oShowList;	//@test修正中
		oShowList = new Array();

		if(oShowList_old.length == 0){
			for(var i=0; i<playList.showName.length; i++){
				oShowList[i] = {picName : playList.showName[i] ,
								hPicNo  : -1};
				//console.debug(' read SHOW ( '+ i +' : '+ oShowList[i].picName +'['+oShowList[i].hPicNo+'] )');
			}
		}else{
			for(var i=0; i<playList.showName.length; i++){
				for(var j=0; j<oShowList_old.length; j++){
					if(playList.showName[i] == oShowList_old[j].picName){
						oShowList[i] = {picName : playList.showName[i] ,
										hPicNo  : oShowList_old[j].hPicNo};
						break;
					}else{
						oShowList[i] = {picName : playList.showName[i] ,
										hPicNo  : -1};
					}
				}
				//console.debug(' read SHOW ( '+ i +' : '+ oShowList[i].picName +'['+oShowList[i].hPicNo+'] )');
			}
		}
		//SAVE用
		this.saveShow();
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}

	//------------------------------------------------
	// シーンファイル内、処理一覧の最大の返却
	//------------------------------------------------
	this.getShowList = function() {
		return oShowList;
	}

	//------------------------------------------------
	//------------------------------------------------
	this.saveShow = function() {
		//SAVE用
		var tmp = ""
		for(var i=0; i<oShowList.length; i++){
			tmp += oShowList[i].picName + ":";
			tmp += oShowList[i].hPicNo  + ":";
		}
		oFunc["SET"].SET("SHOW_LIST", tmp);
		oFunc["SET"].SET("SHOW_MAX",  oShowList.length );
	}

	// END -------------------------------------------
}
