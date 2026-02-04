import type { Preview } from '@storybook/vue3'
import 'vuevuefafa/dist/style.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#18181b' },
        { name: 'gray', value: '#f4f4f5' },
      ],
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div style="padding: 1rem;"><story /></div>',
    }),
  ],
}

export default preview
