// Every outbound and internal URL on the homepage, in one place.

export const HOME_URL = '/';
export const AUTH_URL = 'https://auth.planary.ch';
export const CASINO_LIVE_URL = 'https://casino.planary.ch';
export const CONTACT_EMAIL = 'info@planary.ch';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;

// Detail pages are planned at these paths but don't exist yet.
export const TEAM_URL = '/team';
export const CASINO_INFO_URL = '/casino';
export const TOURNAMENT_INFO_URL = '/tournament';
export const WISHLIST_INFO_URL = '/wishlist';
export const ACCOUNT_INFO_URL = '/account';

// TODO(planary): live product URLs not confirmed yet. Replace these placeholders.
export const TOURNAMENT_LIVE_URL = '#todo-tournament-live-url';
export const WISHLIST_LIVE_URL = '#todo-wishlist-live-url';

export const INSTAGRAM_URL = 'https://instagram.com/planaryofficial';
export const TIKTOK_URL = 'https://www.tiktok.com/@planaryofficial';
export const GITHUB_URL = 'https://github.com/planary';

// TODO(planary): Spline code-export URL for the hero object
// (Spline → Export → Code → …/scene.splinecode). Until it is set, the hero
// shows the SVG poster only and the Spline runtime is never downloaded.
export const HERO_SCENE_URL: string | null = null;
// Set to true if the Spline scene already carries the 12 s rotation and the
// pointer tilt; otherwise both are applied to the wrapper, as in the reference.
export const HERO_SCENE_HAS_OWN_MOTION = false;
