/**
 *
 */

hAnime["PAN_S"].ANIME_ypoint = function(ypoint) {
	var pt = [6,6.5,7,7.5,8,9,9,8.5,8,7,6,5,4,3,2,1,0.5,0,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5];
	return ypoint+pt[Math.floor((iCnt.animMov)%30)]*11;
}
hAnime["PAN_S"].ANIME_xpoint = function(xpoint) {
	var pt = [6,6.5,7,7.5,8,9,9,8.5,8,7,6,5,4,3,2,1,0.5,0,0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5];
	return xpoint-pt[Math.floor((iCnt.animMov)%30)]*7;
}

hAnime["PAN_S"].ANIME_xscale = function(xscale) {
	var pt = [0.95,0.945,0.94,0.935,0.93,0.93,0.93,0.93,0.94,0.95,0.96,0.97,0.98,0.99,0.9925,0.995,0.9975,1.00,1.00,0.9925,0.995,0.9975,0.99,0.985,0.98,0.975,0.97,0.965,0.96,0.955];
	return xscale*pt[Math.floor((iCnt.animMov)%30)];
}

hAnime["PAN_S"].ANIME_yscale = function(yscale) {
	var pt = [0.95,0.945,0.94,0.935,0.93,0.93,0.93,0.93,0.94,0.95,0.96,0.97,0.98,0.99,0.9925,0.995,0.9975,1.00,1.00,0.9925,0.995,0.9975,0.99,0.985,0.98,0.975,0.97,0.965,0.96,0.955];
	return yscale*pt[Math.floor((iCnt.animMov)%30)];
}
