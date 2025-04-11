# 📸 Photobooth App

A sleek and responsive web-based photobooth application built with **Next.js**, **Tailwind CSS**, and **TypeScript**. Designed for events, parties, or personal use, this app allows users to capture and download photos directly from their browser.

## ✨ Features

- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast and optimized with Next.js
- 📷 Capture photos using the device's webcam
- 💾 Download captured images
- 🔧 Easy to configure and deploy

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [pnpm](https://pnpm.io/) (or use `npm` or `yarn`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nadialvy/photobooth-app.git
   cd photobooth-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   pnpm dev
   ```
   Open your browser and navigate to `http://localhost:3000`. You should see the photobooth app running.
4. **Build for production:**

   ```bash
   pnpm build
   ```

   This will create an optimized production build in the `.next` directory.

5. **Start the production server:**
   ```bash
    pnpm start
   ```
   This will start the server in production mode. Open your browser and navigate to `http://localhost:3000` to see the live app.

## 📸 Usage

1. Allow camera access when prompted.
2. Click the "Capture" button to take a photo.
3. Click the "Download" button to save the photo to your device.
4. Click the "Retake" button to take another photo.
5. Click the "Reset" button to clear the captured photo and start over.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
