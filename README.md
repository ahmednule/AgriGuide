```
# Agriguide - AI-Powered Plant Disease and Pest Identification

Agriguide is an AI-driven platform designed to assist users in identifying diseases and pests affecting plants. By simply uploading an image of a plant, the system leverages AI models to analyze the image and provide accurate feedback on what type of disease or pest is impacting the plant.

## Project Overview

### Purpose
Agriguide aims to help farmers, gardeners, and agricultural experts diagnose plant health issues efficiently. By using advanced AI technology, the platform ensures that plant diseases and pests are identified correctly, allowing users to take appropriate action to protect their crops.

### How AI is Solving the Problem
The project uses deep learning and computer vision techniques to detect and classify plant diseases and pests. The system is trained on a diverse dataset of plant images with known diseases and pests, allowing the model to recognize patterns and symptoms in new images uploaded by users.

Key benefits of using AI for plant disease and pest identification:
- **Speed**: AI rapidly analyzes plant images, reducing the time needed to identify the problem.
- **Accuracy**: Trained on thousands of images, AI can accurately detect diseases and pests that might be difficult for the human eye to spot.
- **Efficiency**: By automating the identification process, AI helps users make faster decisions, improving crop management and yield.

## Getting Started

This is a Next.js project bootstrapped with `create-next-app`.

### Prerequisites
- Node.js 16.x or later
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ahmednule/AgriGuide.git
   ```

2. Install the required dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Development Server
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Fonts
This project uses `next/font` to automatically optimize and load Inter, a custom Google Font.

### Learn More
To learn more about Next.js, take a look at the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can also check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) - Your feedback and contributions are welcome!

### Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Repository Structure

The repository is organized as follows:

```
AgriGuide/
├── prisma/
│   └── # Prisma schema files and configuration
├── public/
│   └── # Public assets like images, fonts, etc.
├── src/
│   ├── app/
│   │   └── # Application-specific code and pages
│   ├── components/
│   │   └── # Reusable React components
│   ├── lib/
│   │   └── # Library files and utilities
│   ├── auth.ts         # Authentication related code
│   ├── providers.tsx   # Providers for context and other dependencies
│   └── _middleware.ts  # Middleware for request handling
├── .eslintrc.json      # ESLint configuration
├── .gitignore           # Git ignore file
├── next-auth.d.ts       # TypeScript definitions for next-auth
├── next.config.mjs      # Next.js configuration file
├── package-lock.json    # npm package lock file
├── package.json         # npm package manifest
├── postcss.config.mjs   # PostCSS configuration file
├── README.md            # Project documentation
├── tailwind.config.ts   # Tailwind CSS configuration file
└── tsconfig.json        # TypeScript configuration file
```

## Future Enhancements

- **Add Market Page**: Integrate a market page to help farmers track the prices of farm products in the market.
- **Integrate Map Page**: Develop a map page that provides location-based suggestions and enhances the user experience.
- **Mobile Application**: Develop a mobile app for easier access and field use.

## License
This project is licensed under the A2SV

## Acknowledgments
- Special thanks to the mentors and advisors who provided guidance throughout the project @Yared @Mohammed @A2SV.
```
