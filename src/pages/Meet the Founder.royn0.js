import wixWindow from 'wix-window';
import { collapseIfPresent, revealIfPresent, setHtml } from 'public/fymWixHelpers';
import { FYM, ROUTES, label, pageHero, renderSiteShell, textLink } from 'public/fymSiteSystem';

$w.onReady(function () {
    const isMobile = wixWindow.formFactor === 'Mobile';
    const html = renderSiteShell('team', renderTeam(isMobile), isMobile);
    setHtml($w, '#Section1RegularTitle1', html);
    setHtml($w, '#comp-mbu061fr', html);
    setHtml($w, '#comp-mbu061fu2', html);
    collapseIfPresent($w, '#Section1RegularLongtext1');
    collapseIfPresent($w, '#Section3Regular');
    revealIfPresent($w, '#comp-mbu061fr');
    revealIfPresent($w, '#comp-mbu061fu2');
    revealIfPresent($w, '#Section1RegularTitle1');
});

function renderTeam(isMobile) {
    const padding = isMobile ? '68px 22px' : '108px 48px';
    const heading = isMobile ? '38px' : '58px';
    const roles = [
        ['President', 'Guides FYM’s direction and keeps the organization focused on work students can actually finish and share.'],
        ['Vice President', 'Supports leadership decisions and helps keep teams connected as projects move forward.'],
        ['Website and Digital Director', 'Works on FYM’s digital presence and the way project work appears online.'],
        ['Director of Recruitment', 'Helps bring interested students into FYM and explains where they can contribute.'],
        ['Content and Media Director', 'Shapes written and visual content so FYM’s work is clear and consistent.'],
        ['Project Operations Social Media Director', 'Supports project coordination and social media execution.'],
        ['General Member', 'Contributes to projects through research, content, marketing, digital work, or other needs.'],
    ];

    return `${pageHero('TEAM', 'The people behind FYM.', 'FYM is led by its founder and supported by students who take on clear responsibilities across projects.', isMobile)}
    <section style="background:${FYM.white}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto; display:grid; grid-template-columns:${isMobile ? '1fr' : 'minmax(260px,.8fr) minmax(0,1.5fr)'}; gap:${isMobile ? '32px' : '100px'};">
        <div>${label('FOUNDER')}<h2 style="margin:0 0 12px; font:normal 400 ${heading}/1.03 hepta-slab,serif;">Olivia Chevalier</h2><p style="margin:0; color:${FYM.blue}; letter-spacing:.08em; text-transform:uppercase; font-size:13px;">Founder, Future Youth Market</p></div>
        <div><p style="margin:0 0 22px; font-size:${isMobile ? '18px' : '22px'}; line-height:1.58;">Olivia founded FYM as a freshman in high school, bringing together her interests in marketing, creativity, and entrepreneurship with a desire to create hands-on opportunities for students.</p><p style="margin:0 0 28px; color:${FYM.muted};">FYM began around marketing work for small businesses. Olivia’s goal was to create a place where students could take on leadership, strategy, and design responsibilities while gaining experience through real work.</p><a href="mailto:olivias.market01@gmail.com" style="display:inline-flex; align-items:center; color:${FYM.blue}; text-decoration:none; border-bottom:1px solid rgba(73,109,134,.45); padding-bottom:3px;">Email Me Personally</a></div>
    </div></section>
    <section style="background:${FYM.cream}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">${label('HOW FYM TEAMS WORK')}<h2 style="max-width:800px; margin:0 0 28px; font:normal 400 ${heading}/1.03 hepta-slab,serif;">Clear roles make collaboration easier.</h2><p style="max-width:720px; margin:0 0 52px; color:${FYM.muted};">These are FYM role areas, not a list of fake staff profiles. Students contribute based on what the organization and each project need.</p><div style="display:grid; grid-template-columns:repeat(${isMobile ? '1' : '2'},minmax(0,1fr)); column-gap:60px;">${roles.map(([title, body], index) => functionRow(index + 1, title, body)).join('')}</div></div></section>
    <section style="background:${FYM.warmWhite}; padding:${padding};"><div style="max-width:${FYM.maxWidth}; margin:0 auto;">${label('CONTRIBUTE')}<h2 style="margin:0 0 26px; font:normal 400 ${heading}/1.03 hepta-slab,serif;">Want to contribute to FYM?</h2>${textLink('Get Involved', ROUTES.getInvolved)}</div></section>`;
}

function functionRow(number, title, body) {
    return `<article style="display:grid; grid-template-columns:48px 1fr; gap:12px; padding:22px 0; border-top:1px solid ${FYM.border};"><p style="margin:0; color:${FYM.blue}; font-size:12px; letter-spacing:.14em;">0${number}</p><div><h3 style="margin:0 0 8px; font:normal 400 25px/1.1 hepta-slab,serif;">${title}</h3><p style="margin:0; color:${FYM.muted}; font-size:16px;">${body}</p></div></article>`;
}
