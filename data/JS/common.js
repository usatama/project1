/**
 * common.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

//------------------------------------------------
// not null -> chkval 、null -> val
//------------------------------------------------
function nvl(chkval , val){

	if(isNvl(chkval)){
		return val
	}

	return chkval
}

//------------------------------------------------
// not null -> true 、null -> false
//------------------------------------------------
function isNvl(chkval){

	if(chkval==null || typeof chkval == "undefined"){
		return true
	}

	return false
}

//------------------------------------------------
// not blank -> chkval 、blank -> val
//------------------------------------------------
function blk(chkval , val){

	if(isBlk(chkval)){
		return val
	}

	return chkval
}

//------------------------------------------------
// not blank -> true 、blank -> false
//------------------------------------------------
function isBlk(chkval){

	if(nvl(chkval,"").length == 0){
		return true
	}

	return false
}

//------------------------------------------------
// eval実行(arg:javascript文字列)
//------------------------------------------------
function evalJs(exej){

	if(!isBlk(exej)){
		try{
			return eval(exej);
		}catch(e){
			console.error("evalJs ( " + exej + " ) " + e);
		}
	}
	return "";
}


//------------------------------------------------
// eval実行(arg:似非関数文字列)
//------------------------------------------------
function evalTxt(exec){

	if(!isBlk(exec)){
		try{
			return oFunc["EXEC"].EXEC(exec);
		}catch(e){
			console.error("evalTxt ( " + exec + " ) "  + e);
		}
	}
	return "";
}

//------------------------------------------------
// 全文字列の s1 を s2 に置き換える
//------------------------------------------------
function replaceAll(orgText, s1, s2){
    return orgText.split(s1).join(s2);
}
//------------------------------------------------
// ゼロ埋め（前方）
//------------------------------------------------
function zeroPadding(num, len){
	return (Array(len).join('0')+num).slice(-len);
}

//------------------------------------------------
// 全角空白埋め（後方）
//------------------------------------------------
function blkPadding(txt, len){
	return txt+Array(len-txt.length).join('　');
}
// END --------------------------------------------

