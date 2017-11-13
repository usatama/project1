/**
 *
 */

hAnime["ANIME/S_OUT_U"].ANIME_ypoint = function(ypoint) {
	return ypoint+oFunc["ANIME"].getCnt()*(500/60);
}

hAnime["ANIME/S_OUT_U"].ANIME_alpha = function(alpha) {
	return 0.4+oFunc["ANIME"].getCnt()/60;
}
