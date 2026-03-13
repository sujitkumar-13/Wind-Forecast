# Wind Power Forecast Monitoring & Analysis

This project is a submission for the Full Stack SWE challenge. It includes a web application for monitoring wind power forecasts and a Jupyter notebook for deep analysis of forecast errors and wind generation reliability in the UK.

## 🚀 Live Demo
- **App Link**: [Deploy on Vercel/Heroku/Similar](https://your-app-link.vercel.app)
- **Demo Video**: [YouTube Link](https://youtube.com/link-to-video)
- **Repo Link**: [Google Drive Link](https://drive.google.com/link-to-zip)

## 📁 Repository Structure
- `app/`: Next.js App Router containing pages, globals, and layout.
- `components/`: Reusable UI components (Charts, Controls, Stats, UI primitives).
- `lib/`: Core logic including API fetching, forecast selection logic, and data processing.
- `hooks/`: Custom React hooks for data management and UI state.
- `public/`: Static assets and icons.
- `analysis.ipynb`: Jupyter notebook containing detailed forecast and reliability analysis.

## 🛠️ Technologies Used
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui.
- **Charts**: Recharts, Framer Motion for animations.
- **Analysis**: Python (Pandas, Numpy, Matplotlib, Seaborn).
- **AI Tools**: **Yes**, AI tools were used to assist with UI design refinement, boilerplate generation, and debugging logic (as permitted by the challenge).

## ⚙️ How to Start the Application
### Local Development
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Analysis
1. Ensure Python and Jupyter are installed.
2. Install requirements: `pip install pandas numpy matplotlib seaborn`.
3. Open `analysis.ipynb` to view the forecast error and reliability study.

## 📊 Forecast Monitoring App Features
- **Actual vs Forecast**: Compare **Actual Generation** (blue) with **Forecasted Generation** (green).
- **Forecast Horizon**: Configurable 0-48h horizon slider.
- **Dynamic Stats**: Real-time calculation of MAE, RMSE, P99 Error, and P10 Reliability.
- **Responsive Design**: Optimized for both Desktop and Mobile views.

## 🧪 Analysis Highlights
- **Error Characteristics**: Detailed breakdown of Mean, Median, and P99 errors.
- **Horizon Sensitivity**: Analysis of how accuracy degrades over time.
- **Reliability Recommendation**: Data-backed recommendation for reliable wind capacity (P10) for grid stability.

---
*Created as part of the hiring process for Reint.*
