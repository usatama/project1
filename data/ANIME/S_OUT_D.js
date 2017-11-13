/**
 *
 */

hAnime["ANIME/S_OUT_D"].ANIME_ypoint = function(ypoint) {
	return ypoint-oFunc["ANIME"].getCnt()*(500/60);
}

hAnime["ANIME/S_OUT_D"].ANIME_alpha = function(alpha) {
	return 1.2-oFunc["ANIME"].getCnt()/60;
}
