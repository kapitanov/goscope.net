export const APP_NAME = 'goscope.net';
export const APP_NAME_SHORT = 'scope.net';
export const APP_URL = 'https://goscope.net';
export const MAINTAINER_NAME = 'Albert Kapitanov';
export const MAINTAINER_URL = 'https://github.com/kapitanov';
export const GITHUB_URL = 'https://github.com/kapitanov/goscope.net';
export const GITHUB_ISSUES_URL =  `${GITHUB_URL}/issues`;

export const githubCommitUrl = (commitHash: string) => {
  return `${GITHUB_URL}/commit/${commitHash}`;
};

export const ICONS = {
  GITHUB: 'ph:github-logo',
  ARROW_RIGHT: 'ph:arrow-right',
  ARROW_LEFT: 'ph:arrow-left',
  COPY: 'ph:copy',
  COPY_OK: 'ph:check-square-offset',
  COPY_ERROR: 'ph:warning-circle-fill',
  PASTE: 'ph:clipboard',
  CLEAR: 'ph:trash',
  USE_EXAMPLE: 'ph:bookmark-simple',
  GO: 'ph:play-fill',
  RESET: 'ph:arrow-arc-left',
  CARET_DOWN: 'ph:caret-down-fill',
  QUESTION: 'ph:question',
  COPYRIGHT: 'ph:copyright',
  BETA: 'mdi:beta',
  X: 'ph:x',
  SHARE: 'ph:share-network',
  LINK: 'ph:link',
  EXPAND: 'mdi:arrow-expand-vertical',
  COLLAPSE: 'mdi:arrow-collapse-vertical',
  EXPAND_ROW: 'ph:plus-square',
  COLLAPSE_ROW: 'ph:minus-square',

  GOLANG: 'tabler:brand-golang',
  GOPHER: 'logos:gopher'
};

export const HEAD = {
  title: APP_NAME,
  bodyAttrs: {
    class: 'bg-background'
  },
  link: [
    // Favicon
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png'
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0e7490' },

    // Sitemap
    {
      rel: 'sitemap',
      type: 'application/xml',
      title: 'Sitemap',
      href: '/sitemap.xml'
    }
  ],
  meta: [
    // App theme
    { name: 'theme-color', content: '#0e7490' },
    { name: 'msapplication-TileColor', content: '#ffffff' }
  ]
};
