/**
 * common.js
 * 
 * @version : 1.0
 * @license : Copyright (c) 2012-2015 Usatama
 *            Released under the MIT license
 */

//------------------------------------------------
// not null -> chkval �Anull -> val
//------------------------------------------------
function nvl(chkval , val){

	if(isNvl(chkval)){
		return val
	}

	return chkval
}

//------------------------------------------------
// not null -> true �Anull -> false
//------------------------------------------------
function isNvl(chkval){

	if(chkval==null || typeof chkval == "undefined"){
		return true
	}

	return false
}

//------------------------------------------------
// not blank -> chkval �Ablank -> val
//------------------------------------------------
function blk(chkval , val){

	if(isBlk(chkval)){
		return val
	}

	return chkval
}

//------------------------------------------------
// not blank -> true �Ablank -> false
//------------------------------------------------
function isBlk(chkval){

	if(nvl(chkval,"").length == 0){
		return true
	}

	return false
}

//------------------------------------------------
// eval���s(arg:javascript������)
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
// eval���s(arg:����֐�������)
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
// �S������� s1 �� s2 �ɒu��������
//------------------------------------------------
function replaceAll(orgText, s1, s2){
    return orgText.split(s1).join(s2);
}
//------------------------------------------------
// �[�����߁i�O���j
//------------------------------------------------
function zeroPadding(num, len){
	return (Array(len).join('0')+num).slice(-len);
}

//------------------------------------------------
// �S�p�󔒖��߁i����j
//------------------------------------------------
function blkPadding(txt, len){
	return txt+Array(len-txt.length).join('�@');
}
// END --------------------------------------------

