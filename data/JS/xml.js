/**
 * xml.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

function xml(){

	// 内部変数の宣言 --------------------------------
	var hXml = null;

	var iLdCnt;

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
		iLdCnt=0;
	}

	//------------------------------------------------
	// XMLファイルロード処理
	//------------------------------------------------
	this.loadXml = function(fileNm) {
		console.log(' loadXml xml fileNm: ' + fileNm);

		iLdCnt++;

		try{
			hXml = this.getXmlhttp();
			hXml.onreadystatechange = function(){if(oFunc["xml"].getHXml().readyState == 4){iLdEnd++;};};
			hXml.open("GET", fileNm , false);
			hXml.send(null);
		} catch(e) {
			iLdCnt=0;
			iLdEnd=0;
			//@alert("XMLHttpRequestが作成できませんでした");
			console.log(fileNm +"\n"+ e.message);
			return "";
		}

		while(hXml.readyState != 4){
			var i = 0;
			i++;
		}

		return hXml.responseText;
/*
		var test =  "SHOW,bkgnd,MAP,chara1,chara2,chara3,event,window,TXT,puth,point,\n\
PIC,PIC/system,TXT.png,TXT,1,1,1,0,0,1,1,0,1,0,0,0,ANIME/COM,\n\
SET,TXT_X,200\n\
SET,TXT_Y,0\n\
SET,TXT_Y_SPACE,9.5\n\
TOUCH,,CLR,\n\
TOUCH,reload(),BOX,0,0,200,640,\n\
TOUCH,SAVE(LOCAL),BOX,600,560,400,30,\n\
TOUCH,LOAD(LOCAL),BOX,600,600,400,30,\n\
TXT,,■　S-farland,\n\
\n\
\n\
END\n\
"
		return test;
*/
	}

	//------------------------------------------------
	// 
	//------------------------------------------------
	this.getXmlhttp = function() {
		if (window.ActiveXObject){
			try{
				return new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
			}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}catch(e){
			}
			try{
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}catch(e){
			}
		} else if(window.XMLHttpRequest) {
			try{
				return new XMLHttpRequest();
			}catch(e){
			}
		}
		return null;
	}
	//------------------------------------------------
	// XMLハンドルの返却
	//------------------------------------------------
	this.getHXml = function() {
		return hXml;
	}
	//------------------------------------------------
	// XMLロード件数の返却
	//------------------------------------------------
	this.getLdCnt = function() {
		return iLdCnt;
	}

	// END -------------------------------------------
}
