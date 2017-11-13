/**
 *
 */

hAnime["PAN5"].ANIME_ypoint = function(ypoint) {
	var pt = [6,6.5,7,7.5,8,9,7,1,0,0,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5];
	return ypoint+pt[Math.floor((iCnt.animMov)%20)]*10;
}

hAnime["PAN5"].ANIME_xscale = function(xscale) {
	var pt = [0.945,0.94,0.935,0.93,0.925,0.92,0.915,0.99,1.00,1.00,0.995,0.99,0.985,0.98,0.975,0.97,0.965,0.96,0.955,0.95];
	return xscale*pt[Math.floor((iCnt.animMov)%20)];
}

hAnime["PAN5"].ANIME_yscale = function(yscale) {
	var pt = [0.945,0.94,0.935,0.93,0.925,0.92,0.915,0.99,1.00,1.00,0.995,0.99,0.985,0.98,0.975,0.97,0.965,0.96,0.955,0.95];
	return yscale*pt[Math.floor((iCnt.animMov)%20)];
}
