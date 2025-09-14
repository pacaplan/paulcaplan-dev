# Next.js AI Chat Starter 🚀

A modern Next.js starter project with AI chat capabilities, featuring a nostalgic 90s web aesthetic and comprehensive testing setup.

## ✨ Features

- **🎨 90s Aesthetic**: Retro "Under Construction" home page with rainbow text and blinking animations
- **🤖 AI Chat**: Real-time chat interface powered by OpenRouter.ai with multiple model support
- **⚡ Modern Stack**: Next.js 14, React 18, TypeScript, and Tailwind CSS
- **🛡️ Error Handling**: Comprehensive error boundaries and environment validation
- **🧪 Testing**: Unit tests with Vitest and E2E tests with Playwright
- **🔄 CI/CD**: GitHub Actions workflow for linting, testing, and building
- **📏 Code Quality**: StandardJS (ts-standard) for consistent code formatting

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenRouter.ai API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nextjs-ai-chat-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenRouter API key:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   OPENROUTER_MODEL=gpt-4
   ```

4. **Get your OpenRouter API key**
   - Visit [OpenRouter.ai](https://openrouter.ai/keys)
   - Create an account and generate an API key
   - Choose your preferred model (GPT-4, Claude, etc.)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── api/chat/          # OpenRouter API proxy
│   ├── chat/              # Chat page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   └── ErrorBoundary.tsx  # Error boundary component
├── lib/                   # Utility functions
│   └── env.ts            # Environment validation
├── tests/                 # Test files
│   ├── e2e/              # Playwright E2E tests
│   ├── unit/             # Vitest unit tests
│   └── setup.ts          # Test setup
├── .github/workflows/     # GitHub Actions
└── ...config files
```

## 🧪 Testing

### Unit Tests (Vitest)
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:ui

# Run tests once
npm run test:run
```

### E2E Tests (Playwright)
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run StandardJS linter |
| `npm run lint:fix` | Fix linting issues |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

## 🌐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | ✅ | Your OpenRouter.ai API key |
| `OPENROUTER_MODEL` | ✅ | AI model to use (e.g., `gpt-4`, `claude-3-sonnet`) |
| `NEXT_PUBLIC_APP_URL` | ❌ | App URL for production |
| `NODE_ENV` | ❌ | Node environment (auto-set by Next.js) |

## 🎨 Customization

### Changing the AI Model
Update the `OPENROUTER_MODEL` in your `.env.local`:
```env
OPENROUTER_MODEL=claude-3-sonnet  # or any model from OpenRouter
```

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Use Tailwind classes

### Adding New Pages
1. Create a new file in the `app/` directory
2. Export a default React component
3. Add navigation links as needed

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔍 Troubleshooting

### Environment Variables Not Working
- Ensure `.env.local` is in the project root
- Check that variable names match exactly
- Restart the development server after changes

### Chat Not Working
- Verify your OpenRouter API key is correct
- Check that the model name is valid
- Look at browser console for error messages

### Tests Failing
- Run `npm install` to ensure dependencies are up to date
- Check that environment variables are set for testing
- For E2E tests, ensure the app builds successfully

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [OpenRouter.ai](https://openrouter.ai/) - AI model access
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI integration
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Playwright](https://playwright.dev/) - E2E testing
- [Vitest](https://vitest.dev/) - Unit testing

---

**Made with ❤️ and a touch of 90s nostalgia**
