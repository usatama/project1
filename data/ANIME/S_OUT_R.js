/**
 *
 */

hAnime["ANIME/S_OUT_R"].ANIME_xpoint = function(xpoint) {
	var pt = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
	return xpoint-pt[Math.floor((oFunc["ANIME"].getCnt())%20)]*(240/20);
}

hAnime["ANIME/S_OUT_R"].ANIME_alpha = function(alpha) {

	var pt = [0.95,0.9,0.85,0.8,0.75,0.7,0.65,0.6,0.55,0.5,0.45,0.4,0.35,0.3,0.25,0.2,0.15,0.1,0.05,0.0];

	return pt[Math.floor((oFunc["ANIME"].getCnt())%20)];
}
