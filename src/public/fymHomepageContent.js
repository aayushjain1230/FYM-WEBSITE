const ROUTES = {
  home: '/',
  about: '/about-2',
  work: '/projects-7',
  founder: '/meet-the-founder',
  getInvolved: '/about-2?view=get-involved',
};

export const siteNavigation = [
  { label: 'Home', href: ROUTES.home },
  { label: 'About', href: ROUTES.about },
  { label: 'Our Work', href: ROUTES.work },
  { label: 'Team', href: ROUTES.founder },
  { label: 'Get Involved', href: ROUTES.getInvolved },
];

export const homepageContent = {
  hero: {
    eyebrow: 'STUDENT-LED. PROJECT-DRIVEN.',
    brand: 'FYM',
    logoUrl: '',
    lockupUrl: 'https://static.wixstatic.com/media/6b98f9_48aa4c7f0d7844cf85e465568c78095f~mv2.png',
    heroCompositeUrl: 'https://static.wixstatic.com/media/6b98f9_90da20f983ce466fbc057b366b31227f~mv2.png',
    title: 'Built by students. Made for the real world.',
    body:
      'Future Youth Market is a student-led organization where high school students collaborate to research, build, and publish real projects.',
    primaryCta: { label: 'Explore Our Work', href: ROUTES.work },
    secondaryCta: { label: 'Get Involved', href: ROUTES.getInvolved },
  },
  whatWeDo: {
    label: 'WHAT WE DO',
    heading: 'Ideas become real projects.',
    items: [
      {
        number: '01',
        title: 'Research',
        description:
          'Students investigate real topics, problems, and opportunities.',
      },
      {
        number: '02',
        title: 'Build',
        description:
          'Teams turn research and ideas into polished digital projects.',
      },
      {
        number: '03',
        title: 'Publish',
        description:
          'Finished projects are released publicly so people can actually see and use them.',
      },
    ],
  },
  featuredWork: {
    label: 'SELECTED WORK',
    heading: 'A closer look at FYM work.',
    projects: [
      {
        name: 'Kelly Angelovic',
        category: 'Marketing & Brand Development',
        summary:
          'Brand strategy, social content, and audience analysis shaped through real project materials.',
        href: ROUTES.kelly,
        imageAlt: 'Project visual for Kelly Angelovic marketing and brand development work',
      },
    ],
  },
  why: {
    label: 'WHY FYM',
    heading: '',
    body: 'A finished project says more than a practice assignment.',
  },
  closingCta: {
    heading: 'Help build what FYM publishes.',
    body: 'Join FYM and take part in student-led work with a clear final product.',
    cta: { label: 'Join FYM', href: 'https://docs.google.com/forms/d/e/1FAIpQLSevrzNFQWZwz5mbwL5e_55xC7Ov_JU1O-XVfndWGuBN4_w-hQ/viewform' },
  },
  footer: {
    name: 'Future Youth Market',
    links: [
      { label: 'Home', href: ROUTES.home },
      { label: 'About', href: ROUTES.about },
      { label: 'Our Work', href: ROUTES.work },
      { label: 'Team', href: ROUTES.founder },
      { label: 'Get Involved', href: ROUTES.getInvolved },
    ],
  },
};

export const designTokens = {
  colors: {
    bg: '#F5EEDD',
    surface: '#FFFFFF',
    text: '#24313D',
    muted: '#65717C',
    primary: '#769DB8',
    deepBlue: '#496D86',
    border: 'rgba(36, 49, 61, 0.14)',
  },
};
