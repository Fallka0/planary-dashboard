// Every outbound and internal URL on the homepage, in one place.

export const HOME_URL = '/';
export const AUTH_URL = 'https://auth.planary.ch';
export const CASINO_LIVE_URL = 'https://casino.planary.ch';
export const CONTACT_EMAIL = 'info@planary.ch';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

// Detail pages (simple stubs for now, see src/pages/).
export const TEAM_URL = '/team';
export const CASINO_INFO_URL = '/casino';
export const TOURNAMENT_INFO_URL = '/tournament';
export const WISHLIST_INFO_URL = '/wishlist';
export const ACCOUNT_INFO_URL = '/account';

export const TOURNAMENT_LIVE_URL = 'https://tournament.planary.ch';
export const WISHLIST_LIVE_URL = 'https://wishlist.planary.ch';

export const INSTAGRAM_URL = 'https://instagram.com/planaryofficial';
export const TIKTOK_URL = 'https://www.tiktok.com/@planaryofficial';
export const GITHUB_URL = 'https://github.com/planary';

// The hero object's Spline scene (Export → Code).
export const HERO_SCENE_URL: string | null = 'https://prod.spline.design/41KY7bgh6DAdRR7y/scene.splinecode';
// The scene turns this object itself: a Start event spins it 720° on Y over
// 10 s. If that spin doesn't loop, the page keeps it turning at one turn per
// 12 s afterwards. Set to null to rotate the whole canvas as in the reference.
export const HERO_SCENE_SPIN_OBJECT: string | null = 'Group 2';
