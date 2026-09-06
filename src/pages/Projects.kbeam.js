import wixLocation from 'wix-location';
import wixWindow from 'wix-window';
import { collapseIfPresent, revealIfPresent, setHtml } from 'public/fymWixHelpers';
import { FYM, PROJECT_MEDIA, ROUTES, label, media, pageHero, renderSiteShell, textLink } from 'public/fymSiteSystem';

$w.onReady(function () {
    const isMobile = wixWindow.formFactor === 'Mobile';
    const project = wixLocation.query.case;
    const body = project === 'kelly-angelovic'
        ? renderKelly(isMobile)
        : project === 'travelerlenz'
            ? renderTraveler(isMobile)
            : renderWorkIndex(isMobile);
    const html = renderSiteShell('work', body, isMobile);
    setHtml($w, '#Section1ListHeaderTitle1', html);
    setHtml($w, '#comp-mnwivr44', html);
    setHtml($w, '#comp-mnwivr4g', html);
    collapseIfPresent($w, '#Section1ListHeaderLongtext1');
    collapseIfPresent($w, '#Section2List');
    revealIfPresent($w, '#comp-mnwivr44');
    revealIfPresent($w, '#comp-mnwivr4g');
    revealIfPresent($w, '#Section1ListHeaderTitle1');
});

function renderWorkIndex(isMobile) {
    const padding = isMobile ? '68px 22px' : '108px 48px';
    return `${pageHero('OUR WORK', 'Work you can actually<br>point to.', 'A selection of real FYM marketing, brand, content, and analytics work, presented through the original project materials already published by the organization.', isMobile)}
    <section style="background:${FYM.white}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">
        ${projectPreview('PROJECT 01', 'Kelly Angelovic', 'Marketing & Brand Development', 'FYM supported Kelly Angelovic with brand strategy, designed visuals, social media content, and audience analysis.', PROJECT_MEDIA.kellySocial, ROUTES.kelly, isMobile)}
        ${projectPreview('PROJECT 02', 'TravelerLenz LLC', 'Travel Brand Marketing & Audience Growth', 'FYM developed branded visual content, a travel-audience posting strategy, and analytics tracking for TravelerLenz.', PROJECT_MEDIA.travelerCampaign, ROUTES.traveler, isMobile)}
    </div></section>`;
}

function projectPreview(number, name, category, summary, imageUrl, href, isMobile) {
    const direction = number === 'PROJECT 02' && !isMobile ? 'row-reverse' : 'row';
    return `<article style="display:flex; flex-direction:${direction}; flex-wrap:${isMobile ? 'wrap' : 'nowrap'}; gap:${isMobile ? '30px' : '64px'}; align-items:center; padding:${isMobile ? '0 0 72px' : '0 0 112px'}; margin-bottom:${isMobile ? '72px' : '112px'}; border-bottom:1px solid ${FYM.border};">
        <div style="flex:1 1 58%;">${media(imageUrl, `${name} project visual`, isMobile)}</div>
        <div style="flex:1 1 34%;">${label(number)}<h2 style="margin:0 0 12px; font:normal 400 ${isMobile ? '38px' : '52px'}/1.03 hepta-slab,serif;">${name}</h2><p style="margin:0 0 24px; color:${FYM.blue}; font-size:14px; letter-spacing:.06em; text-transform:uppercase;">${category}</p><p style="margin:0 0 28px; color:${FYM.muted};">${summary}</p>${textLink('View Case Study', href)}</div>
    </article>`;
}

function renderKelly(isMobile) {
    return renderCaseStudy({
        name: 'Kelly Angelovic',
        category: 'Marketing & Brand Development',
        intro: 'FYM supported Kelly Angelovic\'s digital presence through brand, content, and audience-focused work.',
        challenge: 'Create a more structured and visually consistent online presence while preserving the character of Kelly\'s existing identity and visual materials.',
        work: 'FYM developed a cohesive content strategy, designed branded visuals, curated social media posts, and analyzed audience engagement to refine posting decisions over time.',
        hero: PROJECT_MEDIA.kellySocial,
        gallery: [
            [PROJECT_MEDIA.kellyPortrait, 'Kelly Angelovic project brand visual', false],
            [PROJECT_MEDIA.kellyAnalytics, 'Audience analysis used for the Kelly Angelovic project', true],
            [PROJECT_MEDIA.kellyOutline, 'Kelly Angelovic project research and strategy outline', true],
            [PROJECT_MEDIA.kellyReport, 'Kelly Angelovic content analysis report', true],
        ],
    }, isMobile);
}

function renderTraveler(isMobile) {
    return renderCaseStudy({
        name: 'TravelerLenz LLC',
        category: 'Travel Brand Marketing & Audience Growth',
        intro: 'TravelerLenz LLC is a travel-focused business centered on destinations, experiences, and visual storytelling. FYM worked with TravelerLenz on brand identity, visual content, and digital marketing materials.',
        challenge: 'Bring greater consistency to the brand and create a clearer content direction for a travel-focused audience.',
        work: 'FYM created branded visual content, developed a posting strategy tailored to travel audiences, and used analytics tracking to monitor engagement.',
        hero: PROJECT_MEDIA.travelerCampaign,
        gallery: [
            [PROJECT_MEDIA.travelerPost, 'TravelerLenz guided tour campaign graphic', false],
            [PROJECT_MEDIA.travelerAnalytics, 'TravelerLenz content analytics tracking', true],
        ],
    }, isMobile);
}

function renderCaseStudy(project, isMobile) {
    const padding = isMobile ? '60px 22px' : '94px 48px';
    const heading = isMobile ? '36px' : '52px';
    const galleryColumns = isMobile ? '1fr' : 'repeat(2,minmax(0,1fr))';
    return `<section style="background:${FYM.cream}; padding:${isMobile ? '42px 22px 64px' : '64px 48px 96px'};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">${textLink('Back to Our Work', ROUTES.work)}<p style="margin:54px 0 18px; color:${FYM.blue}; font-size:12px; letter-spacing:.22em;">CASE STUDY</p><h1 style="margin:0; font:normal 400 ${isMobile ? '48px' : '78px'}/.98 hepta-slab,serif;">${project.name}</h1><p style="margin:20px 0 42px; color:${FYM.blue}; font-size:14px; letter-spacing:.08em; text-transform:uppercase;">${project.category}</p>${media(project.hero, `${project.name} project feature visual`, isMobile)}</div></section>
    <section style="background:${FYM.white}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto; display:grid; grid-template-columns:${isMobile ? '1fr' : 'minmax(220px,1fr) minmax(0,2fr)'}; gap:${isMobile ? '24px' : '80px'};">${label('OVERVIEW')}<p style="margin:0; max-width:760px; font-size:${isMobile ? '18px' : '23px'}; line-height:1.55;">${project.intro}</p></div></section>
    <section style="background:${FYM.warmWhite}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto; display:grid; grid-template-columns:${isMobile ? '1fr' : 'repeat(2,minmax(0,1fr))'}; gap:${isMobile ? '34px' : '44px'};">${caseColumn('01', 'The challenge', project.challenge)}${caseColumn('02', 'What FYM did', project.work)}</div></section>
    <section style="background:${FYM.white}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">${label('PROJECT GALLERY')}<h2 style="margin:0 0 44px; font:normal 400 ${heading}/1.03 hepta-slab,serif;">The work, up close.</h2><div style="display:grid; grid-template-columns:${galleryColumns}; gap:${isMobile ? '18px' : '28px'};">${project.gallery.map(([url, alt, contain]) => `<figure style="margin:0; background:${FYM.warmWhite};">${media(url, alt, isMobile, contain)}</figure>`).join('')}</div><p style="margin:48px 0 0;">${textLink('Back to Our Work', ROUTES.work)}</p></div></section>`;
}

function caseColumn(number, title, body) {
    return `<article style="border-top:1px solid rgba(73,109,134,.42); padding-top:18px;"><p style="margin:0 0 24px; color:${FYM.blue}; font-size:12px; letter-spacing:.18em;">${number}</p><h2 style="margin:0 0 14px; font:normal 400 30px/1.08 hepta-slab,serif;">${title}</h2><p style="margin:0; color:${FYM.muted};">${body}</p></article>`;
}
