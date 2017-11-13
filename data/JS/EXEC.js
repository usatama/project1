/**
 * EXEC.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 * @argment
 *      prog <eval>  : JS似非文字列
 *  exec : enable
 * 
 */

function EXEC(){

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

		var prog = "";
		for(var i=1; i< colData.length; i++){
			if(i == 1){ prog = colData[i]; continue;}
			if(!isBlk(colData[i])){ prog = prog + "," + blk(colData[i],"");}
		}

		var playList = {
			kind      : colData[0] ,
			prog      : prog
		}
		
		oFunc["play"].setPlayList(playList);
	}

	//------------------------------------------------
	// （共通）カーソル通過時、実行処理
	//------------------------------------------------
	this.read = function(playList) {
		this.EXEC(playList.prog);
	}

	//------------------------------------------------
	// （共通）メインループ終了時、実行処理
	//------------------------------------------------
	this.exe = function() {
		
	}


	//------------------------------------------------
	// EXECによる呼び出し処理
	//------------------------------------------------
	this.EXEC = function(txt) {

		//「XXX()」のカッコがないときは、そのままの文字列を返す
		if( isBlk(txt) || txt.indexOf('(')==-1 ){
			return txt;
		}

		//txt = "GET(TEST(TT()|AAA|DDD|GES())|BBB|NEXT(LLL|LLL()|KKK)|CCC|KKK())"
		var func = txt.substring( 0 , txt.indexOf("(") );
		var tmp = txt.substring( txt.indexOf("(") , txt.length);
		tmp = "oFunc['" + func + "']." + func + "(" + this.test(tmp) + ")" 

		//console.debug(' EXEC ' + func + ' stt ( ' + tmp + ' )');
		//alert(tmp);
		var rtn = evalJs(tmp);
		//console.debug(' EXEC ' + func + ' end ( ' + rtn + ' )');
		//alert(rtn);
		return rtn;
	}

	// 表示開始位置変更
	this.test = function(txt){

		var tmp0="";

		if(txt.indexOf("(") != -1){
	//		var func1 = txt.substring( 0 , txt.indexOf("(") );
			var tmp1 = txt.substring( txt.indexOf("(") , txt.length);

			var tmp3 = new Array;
			var tmp2 = tmp1.substring( 1 , tmp1.length -1 );

			var j=0;
			tmp3[j]="";
			var k=0;
			for(var i=0; i<tmp2.length; i++){
				switch (tmp2.charAt(i)) {
					case "|":
						if(k==0){
							j++;
							tmp3[j]="";
						}else{
							tmp3[j] += tmp2.charAt(i);
						}
						break;
					case "(":
						tmp3[j] += tmp2.charAt(i);
						k++;
						break;
					case ")":
						tmp3[j] += tmp2.charAt(i);
						k--;
						break;
					default :
						tmp3[j] += tmp2.charAt(i);
						break;
				}
			}

			for(var i in tmp3){

				if(tmp3[i].indexOf("(") != -1){
					var func2 = tmp3[i].substring( 0 , tmp3[i].indexOf("(") );
					tmp0 += "oFunc['" + func2 + "']." + func2 + "(" + this.test(tmp3[i]) + "),";
				}else{
					tmp0 += "'" + tmp3[i] + "',";
				}
			}
			tmp0 = tmp0.slice(0, -1)
		}else{

			tmp0 += "'" + txt + "'";

		}
		return tmp0;
		
	}

	// END -------------------------------------------
}
