/**
 *
 */

hAnime["ANIME/SK"].ANIME_rotate = function(rotate) {
	//var pt = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0];
	//var pt = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
	//return rotate - pt[Math.floor((iCnt.animPtn)%30)]*12;
	return rotate - oFunc["ANIME"].getCnt()*10;
}

hAnime["ANIME/SK"].ANIME_xpoint = function(xpoint) {
//	var pt = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0];
//	return xpoint + pt[Math.floor(iCnt.animMov)]*20;
	return xpoint + oFunc["ANIME"].getCnt()*10;
}