import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vuevuefafa',
  description: 'UI Kit Vue 3 yang Production-Ready untuk Aplikasi Modern',
  lang: 'id-ID',

  head: [
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'id_ID' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Beranda', link: '/' },
      { text: 'Panduan', link: '/getting-started' },
      { text: 'Komponen', link: '/components/button' },
    ],

    sidebar: [
      {
        text: 'Pengenalan',
        items: [
          { text: 'Memulai', link: '/getting-started' },
          { text: 'Arsitektur', link: '/architecture' },
        ],
      },
      {
        text: 'Komponen',
        items: [
          { text: 'Button', link: '/components/button' },
          { text: 'Input', link: '/components/input' },
          { text: 'Modal', link: '/components/modal' },
          { text: 'Card', link: '/components/card' },
          { text: 'Select', link: '/components/select' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Radio', link: '/components/radio' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Dropdown', link: '/components/dropdown' },
          { text: 'Tooltip', link: '/components/tooltip' },
        ],
      },
      {
        text: 'Panduan Lanjutan',
        items: [
          { text: 'Design Tokens & Theming', link: '/design-tokens' },
          { text: 'Aksesibilitas', link: '/accessibility' },
          { text: 'Testing & QA', link: '/testing' },
          { text: 'Berkontribusi', link: '/contributing' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Rbin01yuh/vuevuefafa' },
    ],

    footer: {
      message: 'Dirilis di bawah Lisensi MIT.',
      copyright: 'Hak Cipta © 2024 vuevuefafa',
    },

    search: {
      provider: 'local',
    },
  },
})
