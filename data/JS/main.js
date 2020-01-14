/**
 * main.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */
 
// グローバル変数の宣言 --------------------------
	var oFunc     = new Array;
	var sPlayFunc = ["REM","END","SET","SAVE","LOAD","CSV","LIB","ANIME","EXEC","EXEJ","GOTO","GOSUB","ENDSUB",
					 "LABEL","SHOW","VIDEO","PIC","MAP","DEL","GET","IF","ELSEIF","ELSE","ENDIF","FOR","ENDFOR",
					 "UPD","INPUT","AUDIO","TOUCH","WAIT","TXT","TXTA","SPK","CHARA"];
//,"REC"
	var sUseFunc  = ["play","xml","canvas","loading","screen","next","auto","back","db","texture","reload","pop",
					 "merge","plural"];
	sUseFunc = sUseFunc.concat(sPlayFunc);
	var iLdEnd = 0;

	var oVal = new Array;

	var sTitleSc  = "SCENE/S-0";
	var sSceneNm  = sTitleSc;
	var sLabelNm  = "";
	var iLoadCnt  = 0;
	var sGameNm   = "TEST"
	var sStatus   = "initialize";

	var fps = 30;

//------------------------------------------------
// メインループ処理
//------------------------------------------------
var mainLoop = function() {

	// ①初期化処理
	if( sStatus == "initialize" ){ initialize(); }

	// ②シーンロード処理 
	if( sStatus == "loadScene" ){ loadScene(); }

	// ③ロードファイル読込中処理 
	if( sStatus == "loadFile" ){ loadFile(); }

	// ④ロードファイル後、音声読み込み 
	if( sStatus == "loadEnd" ){ loadEnd(); }

	// ⑤ゲーム実行処理
	if( sStatus == "gameMain" ){ gameMain(); }

	requestAnimationFrame(mainLoop);
}

//------------------------------------------------
// ウェイト処理
//------------------------------------------------
window.requestAnimationFrame = (function(f) {
	return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(f) { return window.setTimeout(f, 1000 / fps); };
}());

//------------------------------------------------
// ①初期化処理
//------------------------------------------------
function initialize(){

	//初期化処理
	for(var i in sUseFunc){
		//console.debug('init '+ sUseFunc[i] +' stt');
		evalJs( "oFunc['"+ sUseFunc[i] +"'] = new "+ sUseFunc[i] +"();" );
		//console.debug('init '+ sUseFunc[i] +' end');
	}
	sStatus = "loadScene";
}

//------------------------------------------------
// ②シーンロード処理
//------------------------------------------------
function loadScene() {
	iLdEnd = 0;

	//シーンロード前、初期化
	for(var i in sUseFunc){
		//console.debug('reset '+ sUseFunc[i] +' stt');
		oFunc[ sUseFunc[i] ].reset();
		//console.debug('reset '+ sUseFunc[i] +' end');
	}

	oFunc["loading"].loading( 0 , 1 );

	//シーンファイル読込
	//console.debug('load CSV stt');
	oFunc["CSV"].load(["CSV",sSceneNm,""]);
	oFunc["GOTO"].GOTO("",sLabelNm);
	//console.debug('load CSV end');

	sStatus = "loadFile";
}

//------------------------------------------------
// ③ロードファイル読込中処理
//------------------------------------------------
function loadFile() {

	var ldNow = oFunc["xml"].getLdCnt() + oFunc["PIC"].getLdCnt();
	oFunc["loading"].loading( ldNow , iLdEnd );
	//console.debug('loadFile' + ldNow + '/' + iLdEnd);

	if( ldNow == iLdEnd ){
		sStatus = "loadEnd";
	}
}

//------------------------------------------------
// ④ロードファイル後、音声読み込み
//------------------------------------------------
function loadEnd() {

	var ldNow = oFunc["xml"].getLdCnt() + oFunc["PIC"].getLdCnt() + oFunc["AUDIO"].getLdCnt();
	oFunc["loading"].loading( 1 , 1 );
	//console.debug('loadEnd' + ldNow + '/' + iLdEnd);

	//＠削除iphone
	//
	oFunc["AUDIO"].preLoad();
	
	if( ldNow >= iLdEnd  && oFunc["AUDIO"].getLdAudio() == true ){
		sStatus = "gameMain";
		oFunc["AUDIO"].read({cmd : "RELOAD"});
	}
}

//------------------------------------------------
// ⑤ゲーム実行処理
//------------------------------------------------
function gameMain() {
	//シナリオ読込
	while(oFunc["play"].getKind() != "WAIT"){

		try{
			var funcName = oFunc["play"].getKind();
			var playList = oFunc["play"].getPlayList();

			//console.debug('read '+ funcName +' stt');
			//console.dir(playList);
			oFunc[funcName].read(playList);
			//console.debug('read '+ funcName +' end');
		} catch(e) {
			console.error(e.message);
		}

		if(sStatus == "loadScene"){return;}

		oFunc["play"].incPlayCnt();

		if(oFunc["play"].getKind() == "WAIT"){
			var funcName = oFunc["play"].getKind();
			var playList = oFunc["play"].getPlayList();
			oFunc[funcName].read(playList);
		}
	}

	//実行処理
	oFunc["canvas"].exe();	//仮@
	for(var i in sPlayFunc){
		//console.debug('exe '+ sPlayFunc[i] +' stt');
		oFunc[ sPlayFunc[i] ].exe();
		//console.debug('exe '+ sPlayFunc[i] +' end');
	}
}

// END --------------------------------------------
