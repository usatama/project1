/**
 * GOTO.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      scene         : CSVファイル名
 *      label         : CSV内ラベル名
 *  exec : enable
 * 
 */

function GOTO(){

	// 内部変数の宣言 --------------------------------


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
		
	}

	//------------------------------------------------
	// （共通）ファイル読込時、実行処理
	//------------------------------------------------
	this.load = function(colData) {

		var playList = {
			kind      : colData[0] ,
			scene     : colData[1] ,
			label     : colData[2]
		}
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
			this.GOTO(playList.scene ,
					  playList.label);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {

	}

	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.GOTO = function(scene, label) {

		console.log(' read GOTO SCENE( '+ scene +' )');
		console.log(' read GOTO LABEL( '+ label +' )');

		if( !isBlk(scene) ){
			sSceneNm = scene;
			sLabelNm = label;
			sStatus  = "loadScene"
			console.log(' read GOTO SCENE');

		}else if( !isBlk(label) ){

			var tmpPlayCnt = oFunc["play"].getPlayCnt();
			while( oFunc["play"].getPlayList().kind != "LABEL"
				   || oFunc["play"].getPlayList().label != label ){

				oFunc["play"].incPlayCnt();

				if( oFunc["play"].getPlayCnt() == oFunc["play"].getPlayLdCnt() ){
					oFunc["play"].setPlayCnt(0);

				}else if( oFunc["play"].getPlayCnt() == tmpPlayCnt ){
					alert("ラベルないよ");
					break;
				}
			}

			sLabelNm = "";
			console.log(' read GOTO LABEL');
		}else if(iLoadCnt > 0){
			//＠のちにLOADに移す
			var tmpList;
			var tmpList1 = new Array();
			var tmpList2 = new Array();
			var maxCnt;
			oFunc["play"].setPlayCnt(iLoadCnt);
//			oFunc["back"].back();
//			oFunc["WAIT"].setWait(-1);
			iLoadCnt=0;

			//TXT
			//oFunc["TXT"].reset();
			//alert(oFunc["GET"].GET("TXT_MAX"));
			maxCnt = oFunc["GET"].GET("TXT_MAX");
			for(var i=0; i<maxCnt; i++){
				tmpList1[i] = oFunc["GET"].GET("TXT_LIST_"+i).split(":");
				tmpList2[i] = oFunc["GET"].GET("TXT_STR_"+i).split(":");
			}
			for(var i=0; i<maxCnt; i++){
				var sMode = tmpList1[i][0];
				oFunc["SET"].SET("TXT_FONT"   , tmpList1[i][1]);
				oFunc["SET"].SET("TXT_T_COLOR", tmpList1[i][2]);
				oFunc["SET"].SET("TXT_ALIGN"  , tmpList1[i][3]);
				oFunc["SET"].SET("TXT_BASEL"  , tmpList1[i][4]);
				oFunc["SET"].SET("TXT_S_COLOR", tmpList1[i][5]);
				oFunc["SET"].SET("TXT_VH"     , tmpList1[i][6]);
				oFunc["SET"].SET("TXT_X"      , tmpList1[i][7]);
				oFunc["SET"].SET("TXT_Y"      , tmpList1[i][8]);
				oFunc["SET"].SET("TXT_Y_SPACE", tmpList1[i][9]);
				oFunc["TXT"].read({mode : sMode , txt : tmpList2[i]});
			}
			
			//TXTA
			tmpList1 = oFunc["GET"].GET("TXTA_LIST").split(":");
			tmpList2 = oFunc["GET"].GET("TXTA_STR").split(":");
			var sMode = tmpList1[0];
			oFunc["SET"].SET("TXT_FONT"   , tmpList1[1]);
			oFunc["SET"].SET("TXT_T_COLOR", tmpList1[2]);
			oFunc["SET"].SET("TXT_ALIGN"  , tmpList1[3]);
			oFunc["SET"].SET("TXT_BASEL"  , tmpList1[4]);
			oFunc["SET"].SET("TXT_S_COLOR", tmpList1[5]);
			oFunc["SET"].SET("TXT_VH"     , tmpList1[6]);
			oFunc["SET"].SET("TXT_X"      , tmpList1[7]);
			oFunc["SET"].SET("TXT_Y"      , tmpList1[8]);
			oFunc["SET"].SET("TXT_Y_SPACE", tmpList1[9]);
			oFunc["TXTA"].read({mode : sMode , txt : tmpList2});

			//SHOW
			oFunc["SHOW"].reset();
			//alert(oFunc["GET"].GET("SHOW_LIST"));
			tmpList = oFunc["GET"].GET("SHOW_LIST").split(":");
			//alert(oFunc["GET"].GET("SHOW_MAX"));
			for(var i=0; i<oFunc["GET"].GET("SHOW_MAX"); i++){
				//alert(i);
				oFunc["SHOW"].getShowList()[i]
					= {
						picName : tmpList[(i*2)  ] ,
						hPicNo  : parseInt(tmpList[(i*2)+1])
					};
			}
			
			//TOUCH
			oFunc["TOUCH"].reset();
			//alert(oFunc["GET"].GET("TOUCH_LIST"));
			tmpList = oFunc["GET"].GET("TOUCH_LIST").split(":");
			//alert(oFunc["GET"].GET("TOUCH_MAX"));
			for(var i=0; i<oFunc["GET"].GET("TOUCH_MAX"); i++){
				//alert(i);
				oFunc["TOUCH"].getTouchList()[i]
					= {
						kind      : tmpList[(i*10)  ] ,
						funcNm    : tmpList[(i*10)+1] ,
						mode      : tmpList[(i*10)+2] ,
						xpoint    : tmpList[(i*10)+3] ,
						ypoint    : tmpList[(i*10)+4] ,
						xsize     : tmpList[(i*10)+5] ,
						ysize     : tmpList[(i*10)+6] ,
						showNm    : tmpList[(i*10)+7] ,
						power     : tmpList[(i*10)+8] ,
						range     : tmpList[(i*10)+9]
					};
				//alert(oFunc["TOUCH"].getTouchList()[i].funcNm);
			}
			oFunc["TOUCH"].setAriaMax(oFunc["GET"].GET("TOUCH_MAX"));

			//PIC
			for(var i=0; i<oFunc["SHOW"].getShowList().length; i++){
				var picName = oFunc["SHOW"].getShowList()[i].picName;
				tmpList = oFunc["GET"].GET("PIC_P_"+picName).split(":");
				//oFunc["PIC"].hImgInf = new Array();
				//oFunc["PIC"].hImgInf[picName] = new Object();
				oFunc["PIC"].setHImgInf(picName,
					{
						charaName : tmpList[ 0] ,
						fileName  : tmpList[ 1] ,
						picName   : tmpList[ 2] ,
						hPicNo    : parseInt(tmpList[ 3]) ,
						xslice    : tmpList[ 4] ,
						yslice    : tmpList[ 5] ,
						place     : tmpList[ 6] ,
						xplace    : parseInt(tmpList[ 7]) ,
						yplace    : parseInt(tmpList[ 8]) ,
						xpoint    : parseInt(tmpList[ 9]) ,
						ypoint    : parseInt(tmpList[10]) ,
						xscale    : tmpList[11] ,
						yscale    : tmpList[12] ,
						rotate    : tmpList[13] ,
						alpha     : tmpList[14] ,
						operation : tmpList[15] ,
						xcolumn   : tmpList[16] ,
						ycolumn   : tmpList[17] ,
						anime     : tmpList[18] ,
						xslicemag : tmpList[19] ,
						yslicemag : tmpList[20] 
					});
			}

			//AUDIO
			oFunc["AUDIO"].setPlayBgmNo(oFunc["GET"].GET("SYS_BGM_NO"));
			oFunc["AUDIO"].setPlayBgsNo(oFunc["GET"].GET("SYS_BGS_NO"));
			oFunc["AUDIO"].read({cmd:"RELOAD"});

			//GOSUB
			oFunc["GOSUB"].setCnt(oFunc["GET"].GET("GOSUB_CNT"));
			oFunc["GOSUB"].setRetList(oFunc["GET"].GET("GOSUB_LINE").split(":"));
		}
	}

	// END -------------------------------------------
}
