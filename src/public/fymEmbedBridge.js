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
    frame.onMessage(event => {
        if (event.data && event.data.type === 'fym:ready') send();
    });
    send();
    return true;
}
