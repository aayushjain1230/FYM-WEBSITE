import { fymEmbedContent } from 'public/fymEmbedContent';
import { authentication } from 'wix-members-frontend';

export function mountFymEmbed($w, route = '/') {
    let frame;
    try {
        frame = $w('#html1');
    } catch {
        return false;
    }
    if (!frame || typeof frame.postMessage !== 'function') return false;
    const send = () => frame.postMessage({ ...fymEmbedContent, route, memberLoggedIn: authentication.loggedIn() });
    frame.onMessage(async event => {
        if (!event.data) return;
        if (event.data.type === 'fym:ready') send();
        if (event.data.type === 'fym:height') {
            const height = Math.max(800, Math.min(Number(event.data.height) || 800, 20000));
            try { frame.height = height; } catch { /* Wix may own the element height in some editor modes. */ }
        }
        if (event.data.type === 'fym:member-login') {
            authentication.promptLogin()
                .then(() => frame.postMessage({ type: 'fym:member-state', loggedIn: true }))
                .catch(() => frame.postMessage({ type: 'fym:member-state', loggedIn: false }));
        }
        // The embed is the complete FYM site. Its own router changes views;
        // navigating the parent would expose the legacy Wix page underneath.
    });
    send();
    return true;
}
