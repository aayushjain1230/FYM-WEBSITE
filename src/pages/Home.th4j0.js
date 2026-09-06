import { designTokens, homepageContent } from 'public/fymHomepageContent';
import { FYM } from 'public/fymSiteSystem';
import {
    bindRepeater,
    collapseIfPresent,
    revealIfPresent,
    setBackgroundColor,
    setBorderColor,
    setHtml,
    setLink,
    setText,
} from 'public/fymWixHelpers';
import wixWindow from 'wix-window';

$w.onReady(function () {
    applyHomepageContent();
    applyHomepageStylingHooks();
});

function applyHomepageContent() {
    const { hero, whatWeDo, featuredWork, why, closingCta } = homepageContent;

    applyCurrentHomeFallback(hero);

    setText($w, '#heroEyebrow', hero.eyebrow);
    setText($w, '#heroTitle', hero.title);
    setText($w, '#heroBody', hero.body);
    setLink($w, '#heroPrimaryButton', hero.primaryCta.href, hero.primaryCta.label);
    setLink($w, '#heroSecondaryButton', hero.secondaryCta.href, hero.secondaryCta.label);

    setText($w, '#whatWeDoLabel', whatWeDo.label);
    setText($w, '#whatWeDoHeading', whatWeDo.heading);
    bindRepeater($w, '#whatWeDoRepeater', whatWeDo.items, ($item, itemData) => {
        setText($item, '#whatWeDoItemNumber', itemData.number);
        setText($item, '#whatWeDoItemTitle', itemData.title);
        setText($item, '#whatWeDoItemDescription', itemData.description);
    });

    setText($w, '#featuredWorkLabel', featuredWork.label);
    setText($w, '#featuredWorkHeading', featuredWork.heading);
    bindRepeater($w, '#featuredWorkRepeater', featuredWork.projects, ($item, itemData, index) => {
        setText($item, '#projectNumber', `PROJECT ${String(index + 1).padStart(2, '0')}`);
        setText($item, '#projectName', itemData.name);
        setText($item, '#projectCategory', itemData.category);
        setText($item, '#projectSummary', itemData.summary);
        setText($item, '#projectImageAltText', itemData.imageAlt);
        setLink($item, '#projectLink', itemData.href, 'View Project');
    });

    setText($w, '#whyLabel', why.label);
    setText($w, '#whyHeading', why.heading);
    setText($w, '#whyBody', why.body);

    setText($w, '#closingCtaHeading', closingCta.heading);
    setText($w, '#closingCtaBody', closingCta.body);
    setLink($w, '#closingCtaButton', closingCta.cta.href, closingCta.cta.label);

    collapseIfPresent($w, '#brokenFormSection');
    collapseIfPresent($w, '#homeFormSection');
    collapseIfPresent($w, '#contactFormSection');
    collapseIfPresent($w, '#371Ee199389C4A93849Ee35B8A15B7Ca1');
    collapseIfPresent($w, '#comp-m0m3l1u7');
}

function applyHomepageStylingHooks() {
    const { colors } = designTokens;

    setBackgroundColor($w, '#section1', colors.bg);
    setBackgroundColor($w, '#comp-lt8phayo', colors.bg);

    [
        '#heroSection',
        '#whatWeDoSection',
        '#featuredWorkSection',
        '#whySection',
        '#processSection',
        '#closingCtaSection',
    ].forEach((selector) => setBackgroundColor($w, selector, colors.bg));

    [
        '#whatWeDoRepeater',
        '#featuredWorkRepeater',
        '#processRepeater',
    ].forEach((selector) => setBorderColor($w, selector, colors.border));

    setBackgroundColor($w, '#heroPrimaryButton', colors.primary);
    setBackgroundColor($w, '#closingCtaButton', colors.primary);
}

function applyCurrentHomeFallback(hero) {
    if (wixWindow.formFactor === 'Mobile') {
        applyCurrentHomeMobileFallback(hero);
        return;
    }

    const titleHtml = renderIntegratedHomepage(hero);

    setHtml($w, '#text3', '');
    setHtml($w, '#comp-ivrv2qhg', '');
    setHtml($w, '#text2', titleHtml);
    setHtml($w, '#comp-ivrv2qhg1', titleHtml);
    revealIfPresent($w, '#text3');
    revealIfPresent($w, '#comp-ivrv2qhg');
    revealIfPresent($w, '#text2');
    revealIfPresent($w, '#comp-ivrv2qhg1');
}

function applyCurrentHomeMobileFallback(hero) {
    const mobileHeroHtml = renderIntegratedHomepage(hero);

    setHtml($w, '#text3', mobileHeroHtml);
    setHtml($w, '#comp-ivrv2qhg', mobileHeroHtml);
    setHtml($w, '#text2', '');
    setHtml($w, '#comp-ivrv2qhg1', '');
    revealIfPresent($w, '#text3');
    revealIfPresent($w, '#comp-ivrv2qhg');
}

function renderIntegratedHomepage(hero) {
    return `
        <style>
            .fymShell, .fymShell * { box-sizing: border-box; }
            .fymShell { position:fixed; inset:0; z-index:999999; width:100vw; height:100vh; overflow:auto; overflow-x:hidden; background:#F5EEDD; color:#24313D; font:400 17px/1.66 helvetica-w01-light,helvetica-w02-light,Helvetica,Arial,sans-serif; text-align:left; }
            .fymNav { width:min(calc(100% - 96px),1180px); min-height:76px; margin:0 auto; padding:22px 0 18px; border-bottom:1px solid rgba(36,49,61,.14); display:flex; align-items:center; justify-content:space-between; gap:28px; }
            .fymBrand { color:#496D86; font-family:hepta-slab,Georgia,serif; font-size:30px; line-height:1; letter-spacing:.08em; text-decoration:none; }
            .fymLinks { display:flex; align-items:center; gap:24px; font-size:14px; line-height:1.2; letter-spacing:.04em; }
            .fymLinks a { color:#24313D; text-decoration:none; padding:8px 0 6px; border-bottom:1px solid transparent; white-space:nowrap; }
            .fymLinks a:hover, .fymLinks a[aria-current="page"] { color:#496D86; border-bottom-color:#496D86; }
            .fymLinks .join { min-height:40px; padding:0 15px; display:inline-flex; align-items:center; border:1px solid #496D86; border-radius:4px; color:#496D86; }
            .fymHero { position:relative; overflow:hidden; background:linear-gradient(to bottom, rgba(245,238,221,0) 0%, rgba(245,238,221,0) 72%, #FBF9F4 100%), radial-gradient(circle at 50% 32%, rgba(255,252,244,.78) 0, rgba(245,238,221,0) 42%), #F5EEDD; border-bottom:0; }
            .fymHeroInner { position:relative; z-index:1; width:min(calc(100% - 96px),1180px); margin:0 auto; padding:clamp(24px,3.2vw,40px) 0 clamp(42px,4.8vw,62px); text-align:center; }
            .fymEyebrow, .fymLabel { margin:0 0 18px; color:#496D86; font-size:13px; line-height:1.4; letter-spacing:.24em; text-transform:uppercase; }
            .fymEyebrow { margin-bottom:10px; }
            .fymLockup { position:relative; width:min(88vw,640px); aspect-ratio:2.25/1; margin:0 auto 12px; display:grid; place-items:center; }
            .fymLockupLarge { color:#638EAA; font-family:hepta-slab,Georgia,serif; font-size:clamp(188px,20vw,306px); line-height:.8; letter-spacing:-.045em; }
            .fymLockupName { position:static; width:100%; padding:0; margin-top:-14px; color:#496D86; font-size:clamp(12px,1.14vw,15px); line-height:1; letter-spacing:.24em; text-transform:uppercase; white-space:nowrap; display:flex; align-items:center; justify-content:center; }
            .fymTitle, .fymSectionTitle, .fymPortfolioTitle { color:#24313D; font-family:hepta-slab,Georgia,serif; font-weight:400; letter-spacing:0; }
            .fymTitle { max-width:820px; margin:0 auto; font-size:clamp(41px,5.1vw,60px); line-height:.98; }
            .fymHeroCopy { max-width:610px; margin:20px auto 0; font-size:17px; line-height:1.65; }
            .fymActions { margin-top:26px; display:flex; justify-content:center; align-items:center; gap:34px; flex-wrap:wrap; }
            .fymButton { min-height:50px; display:inline-flex; align-items:center; justify-content:center; padding:0 28px; border:1px solid #496D86; border-radius:4px; background:#496D86; color:#F5EEDD; text-decoration:none; }
            .fymTextLink { display:inline-flex; align-items:center; gap:8px; color:#496D86; text-decoration:none; border-bottom:1px solid rgba(73,109,134,.24); padding-bottom:3px; }
            .fymTextLink:after { content:""; width:15px; height:9px; display:inline-block; background:currentColor; clip-path:polygon(0 42%,72% 42%,72% 0,100% 50%,72% 100%,72% 58%,0 58%); }
            .fymSection { padding:clamp(58px,7vw,94px) clamp(22px,5vw,64px); }
            .fymInner { max-width:1180px; margin:0 auto; }
            .warm { background:#FBF9F4; }
            .white { background:#FFFFFF; }
            .cream { background:#F5EEDD; }
            .fadeOffToCream { background:linear-gradient(to bottom, #FBF9F4 0%, #F7F2E6 48%, #F5EEDD 100%); }
            .blue { background:linear-gradient(to bottom, #DFE9EE 0, #496D86 118px, #496D86 100%); color:#F5EEDD; padding-top:calc(clamp(58px,7vw,94px) + 52px); }
            .blue .fymSectionTitle { color:#F5EEDD; }
            .fymSectionTitle { max-width:900px; margin:0; font-size:clamp(42px,6vw,68px); line-height:1; }
            .fymColumns, .fymProcess { display:grid; gap:34px; margin-top:54px; }
            .fymColumns { grid-template-columns:repeat(3,minmax(0,1fr)); }
            .fymProcess { grid-template-columns:repeat(4,minmax(0,1fr)); gap:24px; margin-top:52px; }
            .fymRuled { border-top:1px solid rgba(73,109,134,.38); padding-top:20px; }
            .fymNumber { margin:0 0 24px; color:#496D86; font-size:12px; letter-spacing:.18em; text-transform:uppercase; }
            .fymSmallHeading { margin:0 0 12px; color:#24313D; font-family:helvetica-w01-light,helvetica-w02-light,Helvetica,Arial,sans-serif; font-size:16px; line-height:1.3; letter-spacing:.14em; text-transform:uppercase; }
            .fymMuted { color:#65717C; }
            .fymPortfolioRow { display:grid; grid-template-columns:1.25fr .75fr; gap:clamp(34px,6vw,64px); align-items:center; padding-bottom:96px; margin-bottom:96px; border-bottom:1px solid rgba(36,49,61,.14); }
            .fymPortfolioRow:nth-child(even) { grid-template-columns:.75fr 1.25fr; }
            .fymPortfolioRow:nth-child(even) img { order:2; }
            .fymPortfolioImage { width:100%; height:min(42vw,520px); display:block; object-fit:cover; background:#FBF9F4; }
            .fymPortfolioTitle { margin:0 0 12px; font-size:clamp(38px,5vw,54px); line-height:1.02; }
            .fymCategory { color:#496D86; font-size:14px; letter-spacing:.07em; text-transform:uppercase; }
            .fymSplit { display:grid; grid-template-columns:minmax(260px,.9fr) minmax(0,1.4fr); gap:clamp(42px,8vw,100px); align-items:end; }
            .fymFooter { background:linear-gradient(to bottom, #35566B 0, #24313D 76px, #24313D 100%); color:#F5EEDD; padding:68px clamp(22px,5vw,64px) 34px; }
            .fymFooterTop { display:flex; justify-content:space-between; gap:70px; padding-bottom:42px; border-bottom:1px solid rgba(245,238,221,.24); }
            .fymFooterBrand { max-width:390px; }
            .fymFooterBrand strong { display:block; margin-bottom:14px; font-family:hepta-slab,Georgia,serif; font-size:34px; line-height:1; letter-spacing:.06em; font-weight:400; }
            .fymFooterLinks { max-width:430px; display:flex; flex-wrap:wrap; gap:14px 28px; }
            .fymFooterLinks a { color:#F5EEDD; text-decoration:none; }
            @media (max-width:850px) {
                .fymShell { font-size:16px; }
                .fymNav { width:calc(100% - 44px); display:block; }
                .fymLinks { margin-top:14px; flex-wrap:wrap; gap:10px 18px; font-size:12px; }
                .fymHeroInner { width:calc(100% - 44px); padding:58px 0 72px; }
                .fymLockup { width:min(90vw,460px); margin-bottom:20px; }
                .fymTitle { font-size:clamp(40px,11vw,54px); }
                .fymActions { justify-content:center; }
                .fymColumns, .fymProcess, .fymPortfolioRow, .fymPortfolioRow:nth-child(even), .fymSplit { grid-template-columns:1fr; }
                .fymPortfolioRow:nth-child(even) img { order:0; }
                .fymPortfolioImage { height:300px; }
                .fymFooterTop { display:block; }
                .fymFooterLinks { margin-top:34px; }
            }
        </style>
        <div class="fymShell">
            <header>
                <div class="fymNav">
                    <a class="fymBrand" href="/" aria-label="Future Youth Market home">FYM</a>
                    <nav class="fymLinks" aria-label="Primary">
                        <a href="/" aria-current="page">Home</a>
                        <a href="/about-2">About</a>
                        <a href="/projects-7">Our Work</a>
                        <a href="/meet-the-founder">Team</a>
                        <a href="/about-2?view=get-involved">Get Involved</a>
                        <a class="join" href="https://docs.google.com/forms/d/e/1FAIpQLSevrzNFQWZwz5mbwL5e_55xC7Ov_JU1O-XVfndWGuBN4_w-hQ/viewform" target="_blank">Join FYM</a>
                    </nav>
                </div>
            </header>

            <section class="fymHero">
                <div class="fymHeroInner">
                    <p class="fymEyebrow">${hero.eyebrow}</p>
                    <div class="fymLockup" aria-label="FYM Future Youth Market">
                        <div class="fymLockupLarge">FYM</div>
                        <div class="fymLockupName">Future Youth Market</div>
                    </div>
                    <h1 class="fymTitle">Built by students.<br>Made for the real world.</h1>
                    <p class="fymHeroCopy">${hero.body}</p>
                    <div class="fymActions">
                        <a class="fymButton" href="${hero.primaryCta.href}">${hero.primaryCta.label}</a>
                        <a class="fymTextLink" href="${hero.secondaryCta.href}">${hero.secondaryCta.label}</a>
                    </div>
                </div>
            </section>

            <section class="fymSection warm">
                <div class="fymInner">
                    <p class="fymLabel">What We Do</p>
                    <h2 class="fymSectionTitle">Ideas become real projects.</h2>
                    <div class="fymColumns">
                        <article class="fymRuled"><p class="fymNumber">01</p><h3 class="fymSmallHeading">Research</h3><p>Students investigate real topics, problems, and opportunities.</p></article>
                        <article class="fymRuled"><p class="fymNumber">02</p><h3 class="fymSmallHeading">Build</h3><p>Teams turn research and ideas into polished digital projects.</p></article>
                        <article class="fymRuled"><p class="fymNumber">03</p><h3 class="fymSmallHeading">Publish</h3><p>Finished projects are released publicly so people can actually see and use them.</p></article>
                    </div>
                </div>
            </section>

            <section class="fymSection white">
                <div class="fymInner">
                    <p class="fymLabel">Featured Work</p>
                    <h2 class="fymSectionTitle">A closer look at FYM work.</h2>
                    <div style="margin-top:54px;">
                    <article class="fymPortfolioRow" style="margin-bottom:34px;">
                        <img class="fymPortfolioImage" src="https://static.wixstatic.com/media/20e3eb_5f76f47525f64de18423a40985d172d9~mv2.jpg" alt="Kelly Angelovic project visual">
                        <div><p class="fymLabel">Project 01</p><h3 class="fymPortfolioTitle">Kelly Angelovic</h3><p class="fymCategory">Marketing &amp; Brand Development</p><p class="fymMuted">Brand strategy, social content, and audience analysis shaped through real project materials.</p><a class="fymTextLink" href="/projects-7?case=kelly-angelovic">View Project</a></div>
                    </article>
                    <p><a class="fymTextLink" href="/projects-7">Explore All Work</a></p>
                    </div>
                </div>
            </section>

            <section class="fymSection fadeOffToCream">
                <div class="fymInner" style="display:grid; grid-template-columns:minmax(220px,.7fr) minmax(0,1.5fr); gap:clamp(34px,7vw,86px); align-items:start;">
                    <p class="fymLabel">Why FYM</p>
                    <p style="margin:0; max-width:840px; color:#24313D; font-family:hepta-slab,Georgia,serif; font-size:clamp(30px,4.6vw,54px); line-height:1.08;">A finished project says more than a practice assignment.</p>
                </div>
            </section>

            <section class="fymSection blue">
                <div class="fymInner fymSplit">
                    <h2 class="fymSectionTitle">Help build what FYM publishes.</h2>
                    <div><p style="margin:0 0 24px; color:#F5EEDD; font-size:18px; line-height:1.6;">Join FYM and take part in student-led work with a clear final product.</p><a class="fymButton" href="${FYM.signUp}" target="_blank" style="background:#F5EEDD; color:#496D86; border-color:#F5EEDD;">Join FYM</a></div>
                </div>
            </section>

            <footer class="fymFooter">
                <div class="fymInner"><div class="fymFooterTop"><div class="fymFooterBrand"><strong>FYM</strong><p style="margin:0; color:rgba(245,238,221,.82);">Student-led work, built with care.</p></div><nav class="fymFooterLinks" aria-label="Footer"><a href="/">Home</a><a href="/about-2">About</a><a href="/projects-7">Our Work</a><a href="/meet-the-founder">Team</a><a href="/about-2?view=get-involved">Get Involved</a><a href="mailto:futureyouthmarket@gmail.com">futureyouthmarket@gmail.com</a><a href="http://instagram.com/future.youth.market" target="_blank">Instagram</a></nav></div></div>
            </footer>
        </div>
    `;
}
