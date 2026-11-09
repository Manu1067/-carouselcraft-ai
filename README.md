
# 🎨 CarouselCraft AI

**From raw ideas to polished social media carousels with AI.**

CarouselCraft AI is an AI-powered content creation platform designed to simplify the process of creating engaging Instagram and LinkedIn carousels.

It transforms a topic or raw idea into structured slide content, visual directions and editable carousel designs, helping creators and professionals move from ideation to publishing more efficiently.

🔗 **Live Demo:** [Add your deployed application URL]  
💻 **GitHub:** https://github.com/Manu1067/carouselcraft-ai

## ✨ Features

- **AI Content Generation:** Generate structured carousel content from a topic, audience, platform and objective.
- **Structured Storytelling:** Create hooks, informative slides and closing calls to action.
- **Visual Direction:** Generate layout suggestions, visual archetypes and icon recommendations.
- **Interactive Slide Editor:** Edit and organize individual carousel slides.
- **Multiple Templates:** Choose from different visual styles.
- **Slide Management:** Add, duplicate, delete and reorder slides.
- **Founder Review:** Review content and improve slide quality before exporting.
- **Export Options:** Export carousel designs in supported formats, including PNG, ZIP, PDF and JSON.
- **Project Persistence:** Save project data locally for continued editing.
- **Demo Fallback:** Provides a demo-generation experience when live AI generation is unavailable.

## 🔄 AI Workflow

1. **Raw Idea Input:** Enter the topic, target audience, platform, tone and objective.
2. **AI Content Generation:** Generate structured content using the Gemini API.
3. **Content Structuring:** Organize the content into a narrative sequence of slides.
4. **Visual Direction:** Generate layout guidance, visual archetypes and icon suggestions.
5. **Founder Review:** Edit, refine and review the carousel.
6. **Final Export:** Export the completed carousel in supported formats.

## 🛠️ Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Node.js
- Express.js
- Google Gemini API (`@google/genai`)
- jsPDF
- JSZip
- html-to-image
- Lucide React

## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/Manu1067/carouselcraft-ai.git
cd carouselcraft-ai
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

Run the application:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run TypeScript checks:

```bash
npm run lint
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| `GEMINI_API_KEY` | Server-side Google Gemini API key |
| `PORT` | Express server port |

**Security:** Never commit your `.env` file or expose your Gemini API key in frontend code. Configure secrets through the deployment platform's environment settings.

## 🧠 AI Integration

The backend uses the Google GenAI SDK to request structured carousel content from Gemini.

The generated response includes:
- Carousel title and summary.
- Slide headlines and body content.
- Supporting bullet points.
- Calls to action.
- Visual direction and layout guidance.
- Verification notes for claims that should be checked before publishing.

AI-generated content should be reviewed and fact-checked before publication.

## 🔮 Future Enhancements

- User authentication and cloud project storage.
- Brand kits and custom typography.
- More carousel templates.
- Direct social media publishing integrations.
- Advanced AI research and source verification.
- Team collaboration and approval workflows.

## ⚠️ Note

This project is an MVP/prototype. Live AI generation depends on a valid Gemini API key and the availability and permissions of the configured model. Demo fallback functionality may be used when live generation is unavailable.

## 👩‍💻 Author

**Manushree V.**  
GitHub: [Manu1067](https://github.com/Manu1067)
