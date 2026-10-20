// Counts the page view with Planary's own counter (worker/, stats.planary.ch). No cookies, nothing
// stored in the browser; the Worker keeps the path, the referring site, country and device type.
const ENDPOINT = 'https://stats.planary.ch/e';

function track() {
  const { hostname, href } = window.location;
  // Only the live site counts: not localhost, previews or other hosts.
  if (hostname !== 'planary.ch' && !hostname.endsWith('.planary.ch')) return;
  if (navigator.doNotTrack === '1') return;
  const body = JSON.stringify({ u: href, r: document.referrer });
  // text/plain keeps it a simple request, so the browser sends it without a preflight.
  const blob = new Blob([body], { type: 'text/plain' });
  if (!navigator.sendBeacon?.(ENDPOINT, blob)) {
    fetch(ENDPOINT, { method: 'POST', body, keepalive: true, mode: 'cors', credentials: 'omit' }).catch(() => {});
  }
}

track();
