import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { collapseIfPresent, setHtml } from 'public/fymWixHelpers';
import { FYM, PROJECT_MEDIA, ROUTES, label, media, pageHero, primaryButton, renderSiteShell, textLink } from 'public/fymSiteSystem';

$w.onReady(function () {
    const isMobile = wixWindow.formFactor === 'Mobile';
    const isGetInvolved = wixLocation.query.view === 'get-involved';
    const html = renderSiteShell(isGetInvolved ? 'get-involved' : 'about', isGetInvolved ? renderGetInvolved(isMobile) : renderAbout(isMobile), isMobile);
    setHtml($w, '#Section1RegularTitle1', html);
    setHtml($w, '#comp-mbtymhwu', html);
    collapseLegacyAboutCanvas();
});

function collapseLegacyAboutCanvas() {
    [
        '#Section1RegularMediaImage1',
        '#Section1RegularMediaImage2',
        '#Section2Regular',
        '#Section3Regular',
        '#section4',
    ].forEach((selector) => collapseIfPresent($w, selector));
}

function renderAbout(isMobile) {
    const sectionPadding = isMobile ? '68px 22px' : '108px 48px';
    const heading = isMobile ? '38px' : '58px';
    const modelGrid = isMobile ? 'display:block;' : 'display:grid; grid-template-columns:1fr 1.25fr; gap:60px; align-items:start;';
    const thenNow = isMobile ? 'display:block;' : 'display:grid; grid-template-columns:1fr 80px 1fr; gap:30px; align-items:start;';

    return `${pageHero('ABOUT FYM', "Students don't just learn.<br>They build.", 'FYM gives high school students room to take ideas seriously, work with a team, and turn them into something public.', isMobile)}
    <section style="background:${FYM.cream}; padding:${sectionPadding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto; ${modelGrid}">
        <div>${label('WHY FYM EXISTS')}<h2 style="margin:0; font:normal 400 ${heading}/1.03 hepta-slab,serif;">Students need real responsibility.</h2></div>
        <div style="display:grid; grid-template-columns:${isMobile ? '1fr' : '1fr 1fr'}; gap:20px;">
            ${experiencePath('Typical student experience', ['Assignment', 'Submit', 'Done'], isMobile)}
            ${experiencePath('FYM experience', ['Problem', 'Team', 'Work', 'Published result'], isMobile)}
        </div>
    </div></section>
    <section style="background:${FYM.warmWhite}; padding:${sectionPadding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">
        ${label('OUR STORY')}<h2 style="max-width:880px; margin:0 0 38px; font:normal 400 ${heading}/1.04 hepta-slab,serif;">We started by working for others.<br>Then we started building our own.</h2>
        <div style="${thenNow}">${storyColumn('THEN', 'Client-based work', ['Small businesses', 'Artists', 'Startups', 'Branding, content, and strategy'])}${isMobile ? '<div style="height:26px;"></div>' : '<div aria-hidden="true" style="padding-top:70px; color:' + FYM.blue + '; font-size:32px; text-align:center;">→</div>'}${storyColumn('NOW', 'Original FYM projects', ['Student teams', 'Digital work and resources', 'Research-led project material', 'Published under the FYM name'])}</div>
        <p style="max-width:780px; margin:42px 0 0; color:${FYM.muted};">Client work helped students practice communication, design, and strategy. Over time, FYM shifted toward projects students could guide from idea to finished release with more consistency and ownership.</p>
    </div></section>
    <section style="background:linear-gradient(to bottom, ${FYM.warmWhite} 0%, ${FYM.cream} 100%); padding:${sectionPadding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">
        ${label('REAL WORK')}<h2 style="max-width:780px; margin:0 0 42px; font:normal 400 ${heading}/1.04 hepta-slab,serif;">The story has visible proof.</h2>
        <div style="display:grid; grid-template-columns:${isMobile ? '1fr' : '1.2fr .8fr .9fr'}; gap:${isMobile ? '18px' : '24px'}; align-items:end;">
            <figure style="margin:0;">${media(PROJECT_MEDIA.kellySocial, 'Kelly Angelovic project visual', isMobile)}</figure>
            <figure style="margin:0;">${media(PROJECT_MEDIA.travelerPost, 'TravelerLenz project visual', isMobile, true)}</figure>
            <figure style="margin:0;">${media(PROJECT_MEDIA.kellyAnalytics, 'Kelly Angelovic audience analysis material', isMobile, true)}</figure>
        </div>
        <p style="max-width:520px; margin:24px 0 0; color:${FYM.muted}; font-size:14px;">Selected work from FYM's earlier client projects.</p>
    </div></section>
    <section style="background:${FYM.cream}; padding:${isMobile ? '42px 22px 72px' : '72px 48px 118px'};"><div style="max-width:${FYM.maxWidth}; margin:0 auto; display:grid; grid-template-columns:${isMobile ? '1fr' : 'minmax(240px,.8fr) minmax(0,1.4fr)'}; gap:${isMobile ? '26px' : '74px'};">
        ${label('WHAT FYM GIVES STUDENTS')}<div><h2 style="max-width:760px; margin:0 0 20px; font:normal 400 ${heading}/1.04 hepta-slab,serif;">A reason to care about the final product.</h2><p style="max-width:720px; margin:0; color:${FYM.muted};">When work is meant to be shared, the details matter more. FYM gives students a space to think about the audience, make careful choices, and finish work with pride.</p></div>
    </div></section>
    <section style="background:linear-gradient(to bottom, ${FYM.paleBlue} 0, ${FYM.blue} 96px, ${FYM.blue} 100%); color:${FYM.cream}; padding:${isMobile ? '112px 22px 78px' : '156px 48px 124px'};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">
        <h2 style="max-width:900px; margin:0; color:${FYM.cream}; font:normal 400 ${isMobile ? '48px' : '82px'}/.98 hepta-slab,serif;">Experience should be real.</h2><p style="margin:28px 0 0; color:${FYM.cream}; font-size:${isMobile ? '22px' : '30px'}; line-height:1.3;">Not simulated. Not theoretical.<br>Created, executed, and shared.</p>
        <p style="margin:42px 0 0;">${primaryButton('Explore Our Work', ROUTES.work).replace(`color:${FYM.cream}; background:${FYM.blue}; border:1px solid ${FYM.blue}`, `color:${FYM.blue}; background:${FYM.cream}; border:1px solid ${FYM.cream}`)} <span style="display:inline-block; width:24px;"></span>${textLink('Get Involved', ROUTES.getInvolved)}</p>
    </div></section>
    `;
}

function experiencePath(title, items, isMobile) {
    return `<article style="border-top:1px solid ${FYM.border}; padding-top:20px; margin-bottom:${isMobile ? '26px' : '0'};">
        <h3 style="margin:0 0 24px; color:${FYM.blue}; font-size:13px; letter-spacing:.18em; text-transform:uppercase;">${title}</h3>
        <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center;">${items.map((item, index) => `<span style="display:inline-flex; align-items:center; gap:10px; color:${FYM.navy};">${index > 0 ? '<span style="color:' + FYM.blue + '; opacity:.7;">→</span>' : ''}<span style="border:1px solid rgba(73,109,134,.28); padding:10px 12px; background:${FYM.warmWhite};">${item}</span></span>`).join('')}</div>
    </article>`;
}

function storyColumn(kicker, title, items) {
    return `<article style="border-top:1px solid ${FYM.border}; padding-top:20px;"><p style="margin:0 0 28px; color:${FYM.blue}; font-size:12px; letter-spacing:.22em;">${kicker}</p><h3 style="margin:0 0 22px; font:normal 400 30px/1.12 hepta-slab,serif;">${title}</h3>${items.map((item) => `<p style="margin:0; padding:13px 0; border-top:1px solid rgba(36,49,61,.09); color:${FYM.muted};">${item}</p>`).join('')}</article>`;
}

function renderGetInvolved(isMobile) {
    const sectionPadding = isMobile ? '68px 22px' : '108px 48px';
    const heading = isMobile ? '38px' : '58px';
    const contributions = ['Project leadership', 'Research and analytics', 'Marketing and social media', 'Writing and content', 'Website and digital work', 'Project operations'];
    const joinButton = primaryButton('Join FYM', FYM.signUp, true).replace(`color:${FYM.cream}; background:${FYM.blue}; border:1px solid ${FYM.blue}`, `color:${FYM.blue}; background:${FYM.cream}; border:1px solid ${FYM.cream}`);

    return `${pageHero('GET INVOLVED', 'Build something you can<br>stand behind.', 'Join other students in taking responsibility for meaningful work and contributing to a finished project under the FYM name.', isMobile)}
    <section style="background:${FYM.white}; padding:${sectionPadding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto; display:flex; flex-wrap:wrap; gap:${isMobile ? '44px' : '90px'};">
        <div style="flex:1 1 320px;">${label('WHY JOIN')}<h2 style="margin:0; font:normal 400 ${heading}/1.04 hepta-slab,serif;">Responsibility changes how you learn.</h2></div>
        <div style="flex:1 1 430px;">${valueRow('01', 'Take ownership', 'Contribute to a project with a real goal and a finished outcome.')}${valueRow('02', 'Work with others', 'Collaborate with students bringing different strengths to one shared project.')}${valueRow('03', 'Learn through execution', 'Develop useful skills by applying them to actual work.')}${valueRow('04', 'Make something tangible', 'Help create work that can be published, shared, and used.')}</div>
    </div></section>
    <section style="background:${FYM.cream}; padding:${sectionPadding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">${label('WAYS TO CONTRIBUTE')}<h2 style="max-width:760px; margin:0 0 46px; font:normal 400 ${heading}/1.04 hepta-slab,serif;">Find where your strengths can help.</h2><div style="display:grid; grid-template-columns:repeat(${isMobile ? '1' : '2'},minmax(0,1fr)); column-gap:52px;">${contributions.map((item, index) => `<p style="margin:0; padding:18px 0; border-top:1px solid ${FYM.border};"><span style="display:inline-block; width:48px; color:${FYM.blue}; font-size:12px; letter-spacing:.14em;">0${index + 1}</span>${item}</p>`).join('')}</div><p style="max-width:720px; margin:34px 0 0; color:${FYM.muted};">Contribution areas depend on the needs of each project; they are not presented as guaranteed open positions.</p></div></section>
    <section style="background:${FYM.blue}; color:${FYM.cream}; padding:${isMobile ? '72px 22px' : '104px 48px'};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;"><p style="margin:0 0 18px; color:${FYM.cream}; opacity:.8; font-size:12px; letter-spacing:.22em;">HOW TO JOIN</p><h2 style="max-width:780px; margin:0 0 22px; color:${FYM.cream}; font:normal 400 ${heading}/1.04 hepta-slab,serif;">Start with the FYM student sign-up form.</h2><p style="max-width:680px; margin:0 0 30px; color:${FYM.cream}; opacity:.9;">Use the current FYM form to share your information and interest. For questions, contact <a href="mailto:${FYM.email}" style="color:${FYM.cream};">${FYM.email}</a>.</p>${joinButton}</div></section>`;
}

function valueRow(number, title, body) {
    return `<article style="display:grid; grid-template-columns:48px 1fr; gap:12px; padding:22px 0; border-top:1px solid ${FYM.border};"><p style="margin:0; color:${FYM.blue}; font-size:12px; letter-spacing:.14em;">${number}</p><div><h3 style="margin:0 0 8px; font:normal 400 26px/1.1 hepta-slab,serif;">${title}</h3><p style="margin:0; color:${FYM.muted};">${body}</p></div></article>`;
}
