export const FYM = {
    cream: '#F5EEDD',
    warmWhite: '#FBF9F4',
    white: '#FFFFFF',
    creamDeep: '#F2E9D8',
    paleBlue: '#DFE9EE',
    blue: '#496D86',
    blueSoft: '#769DB8',
    navy: '#24313D',
    muted: '#65717C',
    border: 'rgba(36,49,61,0.14)',
    maxWidth: '1180px',
    email: 'futureyouthmarket@gmail.com',
    instagram: 'https://instagram.com/future.youth.market',
    signUp: 'https://docs.google.com/forms/d/e/1FAIpQLSevrzNFQWZwz5mbwL5e_55xC7Ov_JU1O-XVfndWGuBN4_w-hQ/viewform',
};

export const ROUTES = {
    home: '/',
    about: '/about-2',
    work: '/projects-7',
    team: '/meet-the-founder',
    getInvolved: '/about-2?view=get-involved',
    kelly: '/projects-7?case=kelly-angelovic',
    traveler: '/projects-7?case=travelerlenz',
};

export const PROJECT_MEDIA = {
    kellySocial: 'https://static.wixstatic.com/media/20e3eb_5f76f47525f64de18423a40985d172d9~mv2.jpg',
    kellyAnalytics: 'https://static.wixstatic.com/media/20e3eb_706801cb81104c3a918d1bf205b9f706~mv2.jpg',
    travelerPost: 'https://static.wixstatic.com/media/20e3eb_293bb8563c6b470485b21a73055e5c26~mv2.png',
    travelerCampaign: 'https://static.wixstatic.com/media/20e3eb_4f202af6246e47f2bec38eea5dd36455~mv2.jpg',
    travelerAnalytics: 'https://static.wixstatic.com/media/20e3eb_79c720f5346a4a208a0e7693cd34505a~mv2.jpg',
    kellyOutline: 'https://static.wixstatic.com/media/20e3eb_36f469399a804c1fb2275b08b74895c2~mv2.jpg',
    kellyPortrait: 'https://static.wixstatic.com/media/20e3eb_dc4c19dd330a484c93a8bc667e628f1b~mv2.jpg',
    kellyReport: 'https://static.wixstatic.com/media/20e3eb_51db7922760149a8b2cfacf4a611212d~mv2.jpg',
};

const NAV = [
    ['Home', ROUTES.home, 'home'],
    ['About', ROUTES.about, 'about'],
    ['Our Work', ROUTES.work, 'work'],
    ['Team', ROUTES.team, 'team'],
    ['Get Involved', ROUTES.getInvolved, 'get-involved'],
];

export function renderSiteShell(active, body, isMobile) {
    const gutter = isMobile ? '22px' : '48px';
    const nav = NAV.map(([label, href, key]) => {
        const activeStyle = key === active ? `color:${FYM.blue}; border-bottom:1px solid ${FYM.blue};` : `color:${FYM.navy};`;
        return `<a href="${href}" style="${activeStyle} display:inline-block; padding:8px 0 6px; text-decoration:none; white-space:nowrap;">${label}</a>`;
    }).join('');
    const header = isMobile
        ? `<header style="background:${FYM.cream}; border-bottom:1px solid ${FYM.border};">
            <div style="padding:18px ${gutter} 12px;"><a href="${ROUTES.home}" style="color:${FYM.blue}; font:normal 400 28px/1 hepta-slab,serif; letter-spacing:.08em; text-decoration:none;">FYM</a></div>
            <nav aria-label="Primary" style="display:flex; gap:10px 18px; flex-wrap:wrap; padding:0 ${gutter} 16px; font-size:12px; line-height:1.2; letter-spacing:.03em;">${nav}<a href="${FYM.signUp}" target="_blank" style="color:${FYM.blue}; text-decoration:none; padding:8px 0 6px; border-bottom:1px solid ${FYM.blue};">Join FYM</a></nav>
        </header>`
        : `<header style="background:${FYM.cream};">
            <div style="width:calc(100% - 96px); max-width:${FYM.maxWidth}; margin:0 auto; min-height:76px; padding:22px 0 18px; border-bottom:1px solid ${FYM.border}; box-sizing:border-box;">
                <a href="${ROUTES.home}" style="display:inline-block; color:${FYM.blue}; font:normal 400 30px/1 hepta-slab,serif; letter-spacing:.08em; text-decoration:none;">FYM</a>
                <nav aria-label="Primary" style="float:right; display:flex; align-items:center; gap:28px; font-size:14px; line-height:1.2; letter-spacing:.04em;">${nav}<a href="${FYM.signUp}" target="_blank" style="display:inline-flex; align-items:center; min-height:40px; padding:0 15px; color:${FYM.blue}; border:1px solid ${FYM.blue}; border-radius:4px; text-decoration:none; box-sizing:border-box;">Join FYM</a></nav>
                <div style="clear:both;"></div>
            </div>
        </header>`;

    return `<div style="position:fixed; inset:0; z-index:999999; width:100vw; height:100vh; overflow:auto; overflow-x:hidden; background:${FYM.cream}; color:${FYM.navy}; font:normal 400 ${isMobile ? '16px/1.62' : '17px/1.68'} helvetica-w01-light,helvetica-w02-light,sans-serif; text-align:left; box-sizing:border-box;">
        ${header}
        <main>${body}</main>
        ${renderFooter(isMobile, gutter)}
    </div>`;
}

function renderFooter(isMobile, gutter) {
    return `<footer style="background:${FYM.navy}; color:${FYM.cream}; padding:${isMobile ? '54px' : '68px'} ${gutter} 34px;">
        <div style="max-width:${FYM.maxWidth}; margin:0 auto;">
            <div style="display:flex; flex-wrap:wrap; gap:${isMobile ? '34px' : '70px'}; justify-content:space-between; align-items:flex-start; padding-bottom:42px; border-bottom:1px solid rgba(245,238,221,.24);">
                <div style="max-width:390px;"><p style="margin:0 0 14px; color:${FYM.cream}; font:normal 400 34px/1 hepta-slab,serif; letter-spacing:.06em;">FYM</p><p style="margin:0; color:${FYM.cream}; opacity:.82;">Student-led work, built with care.</p></div>
                <div style="display:flex; flex-wrap:wrap; gap:14px 28px; max-width:430px;"><a href="${ROUTES.home}" style="color:${FYM.cream}; text-decoration:none;">Home</a><a href="${ROUTES.about}" style="color:${FYM.cream}; text-decoration:none;">About</a><a href="${ROUTES.work}" style="color:${FYM.cream}; text-decoration:none;">Our Work</a><a href="${ROUTES.team}" style="color:${FYM.cream}; text-decoration:none;">Team</a><a href="${ROUTES.getInvolved}" style="color:${FYM.cream}; text-decoration:none;">Get Involved</a><a href="mailto:${FYM.email}" style="color:${FYM.cream}; text-decoration:none;">${FYM.email}</a><a href="${FYM.instagram}" target="_blank" style="color:${FYM.cream}; text-decoration:none;">Instagram</a></div>
            </div>
        </div>
    </footer>`;
}

export function pageHero(label, headline, body, isMobile) {
    return `<section style="background:${FYM.cream}; padding:${isMobile ? '58px 22px 66px' : '96px 48px 108px'}; border-bottom:1px solid ${FYM.border};">
        <div style="max-width:${FYM.maxWidth}; margin:0 auto;">
            <p style="margin:0 0 20px; color:${FYM.blue}; font-size:12px; line-height:1.4; letter-spacing:.22em; text-transform:uppercase;">${label}</p>
            <h1 style="max-width:920px; margin:0; color:${FYM.navy}; font:normal 400 ${isMobile ? '43px/1.04' : '76px/.99'} hepta-slab,serif; letter-spacing:0;">${headline}</h1>
            <p style="max-width:700px; margin:28px 0 0; color:${FYM.navy}; font-size:${isMobile ? '17px' : '19px'}; line-height:1.62;">${body}</p>
        </div>
    </section>`;
}

export function label(text) {
    return `<p style="margin:0 0 18px; color:${FYM.blue}; font-size:12px; line-height:1.4; letter-spacing:.22em; text-transform:uppercase;">${text}</p>`;
}

export function primaryButton(text, href, external = false) {
    return `<a href="${href}"${external ? ' target="_blank"' : ''} style="display:inline-flex; align-items:center; justify-content:center; min-height:48px; padding:0 24px; color:${FYM.cream}; background:${FYM.blue}; border:1px solid ${FYM.blue}; border-radius:4px; text-decoration:none; box-sizing:border-box;">${text}</a>`;
}

export function textLink(text, href, external = false) {
    const isBack = text.includes('Back');
    const cleanText = text
        .replace(/(&#8594;|->)/g, '')
        .replace(/(&#8592;|<-)/g, '')
        .trim();
    const arrow = `<span aria-hidden="true" style="width:15px; height:9px; display:inline-block; background:currentColor; clip-path:polygon(0 42%,72% 42%,72% 0,100% 50%,72% 100%,72% 58%,0 58%); transform:${isBack ? 'rotate(180deg)' : 'none'};"></span>`;
    return `<a href="${href}"${external ? ' target="_blank"' : ''} style="display:inline-flex; align-items:center; gap:8px; color:${FYM.blue}; text-decoration:none; border-bottom:1px solid rgba(73,109,134,.45); padding-bottom:3px;">${isBack ? `${arrow}${cleanText}` : `${cleanText}${arrow}`}</a>`;
}

export function media(url, alt, isMobile, contain = false) {
    return `<img src="${url}" alt="${alt}" loading="lazy" style="display:block; width:100%; height:${isMobile ? '280px' : '520px'}; object-fit:${contain ? 'contain' : 'cover'}; object-position:center; background:${FYM.white}; border:0;" />`;
}
