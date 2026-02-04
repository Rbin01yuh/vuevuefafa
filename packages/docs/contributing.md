# Berkontribusi

Terima kasih atas minat Anda untuk berkontribusi pada vuevuefafa!

## Setup Development

```bash
# Clone repository
git clone https://github.com/user/vuevuefafa.git
cd vuevuefafa

# Install dependencies
pnpm install

# Build UI package
pnpm build:ui

# Start development
pnpm dev
```

## Struktur Proyek

```
vuevuefafa/
├── packages/
│   ├── ui/           # Core library
│   ├── docs/         # VitePress documentation
│   ├── storybook/    # Component stories
│   └── playground/   # Demo app
├── e2e/              # E2E tests
└── .github/          # CI/CD workflows
```

## Workflow Kontribusi

1. Fork repository
2. Buat branch: `git checkout -b feature/nama-fitur`
3. Buat perubahan
4. Tulis tests
5. Commit: `git commit -m "feat: deskripsi"`
6. Push dan buat Pull Request

## Commit Convention

Kami menggunakan [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Fitur baru
- `fix:` - Bug fix
- `docs:` - Dokumentasi
- `style:` - Formatting
- `refactor:` - Refactoring
- `test:` - Tests
- `chore:` - Maintenance

## Code Style

- TypeScript strict mode
- Composition API dengan `<script setup>`
- Tailwind CSS untuk styling
- ESLint + Prettier untuk formatting

```bash
# Lint
pnpm lint

# Format
pnpm format
```

## Pull Request Guidelines

- Deskripsi jelas tentang perubahan
- Tests untuk fitur/fix baru
- Dokumentasi diupdate jika perlu
- No breaking changes tanpa RFC
