/**
 *
 */

hAnime["PAN_F2"].ANIME_ypoint = function(ypoint) {
	var pt = [6,7,8,9,5,0,0,1,2,3,4,5];
	return ypoint+pt[Math.floor((iCnt.animMov)%12)]*6;
}
hAnime["PAN_F2"].ANIME_xpoint = function(xpoint) {
	var pt = [6,7,8,9,5,0,0,1,2,3,4,5];
	return xpoint-pt[Math.floor((iCnt.animMov)%12)]*10;
}

hAnime["PAN_F2"].ANIME_xscale = function(xscale) {
	var pt = [0.945,0.94,0.935,0.93,0.96,1.00,1.00,0.99,0.98,0.97,0.96,0.95];
	return xscale*pt[Math.floor((iCnt.animMov)%12)];
}

hAnime["PAN_F2"].ANIME_yscale = function(yscale) {
	var pt = [0.945,0.94,0.935,0.93,0.96,1.00,1.00,0.99,0.98,0.97,0.96,0.95];
	return yscale*pt[Math.floor((iCnt.animMov)%12)];
}

