import { fymEmbedContent } from 'public/fymEmbedContent';

export function mountFymEmbed($w, route = '/') {
    let frame;
    try {
        frame = $w('#html1');
    } catch {
        return false;
    }
    if (!frame || typeof frame.postMessage !== 'function') return false;
    const send = () => frame.postMessage({ ...fymEmbedContent, route });
    frame.onMessage(async event => {
        if (!event.data) return;
        if (event.data.type === 'fym:ready') send();
        // The embed is the complete FYM site. Its own router changes views;
        // navigating the parent would expose the legacy Wix page underneath.
    });
    send();
    return true;
}
