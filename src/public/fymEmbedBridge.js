import { fymEmbedContent } from 'public/fymEmbedContent';
import wixLocation from 'wix-location';

const wixRoutes = {
    '/': '/',
    '/about/': '/about-2',
    '/our-work/': '/projects-7',
    '/our-work/kelly-angelovic/': '/kelly-angelovic',
    '/our-work/travelerlenz/': '/travelerlenz',
    '/team/': '/meet-the-founder',
    '/get-involved/': '/get-involved',
    '/projects/': '/projects',
    '/projects/scholarship-opportunity-finder/': '/scholarship-opportunity-finder',
};

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
        if (event.data.type === 'fym:navigate' && wixRoutes[event.data.route]) {
            wixLocation.to(wixRoutes[event.data.route]);
        }
    });
    send();
    return true;
}
