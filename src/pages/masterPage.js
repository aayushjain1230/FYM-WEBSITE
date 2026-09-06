import { homepageContent, siteNavigation } from 'public/fymHomepageContent';
import {
    bindRepeater,
    collapseIfPresent,
    setBackgroundColor,
    setHtml,
    setLink,
    setText,
} from 'public/fymWixHelpers';

$w.onReady(function () {
    applyGlobalNavigation();
    applyFooterContent();
});

function applyGlobalNavigation() {
    collapseIfPresent($w, '#SITE_HEADER');
    collapseIfPresent($w, '#SITE_FOOTER');
    collapseIfPresent($w, '#header1');
    collapseIfPresent($w, '#footer1');
    setText($w, '#siteLogoText', 'FYM');
    setLink($w, '#joinFymButton', 'https://docs.google.com/forms/d/e/1FAIpQLSevrzNFQWZwz5mbwL5e_55xC7Ov_JU1O-XVfndWGuBN4_w-hQ/viewform', 'Join FYM');
    setBackgroundColor($w, '#siteHeader', '#F5EEDD');
    setBackgroundColor($w, '#SITE_HEADER', '#F5EEDD');

    bindRepeater($w, '#navRepeater', siteNavigation, ($item, itemData) => {
        setLink($item, '#navItemLink', itemData.href, itemData.label);
    });

    updateMenuItems('#comp-mbu032nh', siteNavigation);
    updateMenuItems('#horizontalMenu2', siteNavigation);
}

function applyFooterContent() {
    const { footer } = homepageContent;

    setText($w, '#footerBrandName', footer.name);
    setText($w, '#footerCopyright', '');
    setText($w, '#text4', '');
    setHtml(
        $w,
        '#comp-ivruyqsx',
        ''
    );

    bindRepeater($w, '#footerLinksRepeater', footer.links, ($item, itemData) => {
        setLink($item, '#footerLink', itemData.href, itemData.label);
    });
}

function updateMenuItems(selector, items) {
    let menu;

    try {
        menu = $w(selector);
    } catch {
        return;
    }

    if (!menu || typeof menu.menuItems === 'undefined') {
        return;
    }

    menu.menuItems = items.map((item) => ({
        label: item.label,
        link: item.href,
    }));
}
