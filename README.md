# Wind Power Forecast Monitoring & Analysis

This project is a submission for the Full Stack SWE challenge. It includes a web application for monitoring wind power forecasts and a Jupyter notebook for deep analysis of forecast errors and wind generation reliability in the UK.

## 🚀 Live Demo
- **App Link**: [Wind-Forecast](https://wind-forecast.vercel.app/)
- **Github Repo Link**: [Wind-Forecast](https://github.com/sujitkumar-13/Wind-Forecast)
- **Repo Link**: [Google Drive Link](https://drive.google.com/drive/folders/1KEOJ8uMS5DU3rnJWuJuCd1A8H2cXzRGz?usp=sharing)

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

## � Environment Variables
The application requires the following environment variables to be set in a `.env` file in the root directory:

```env
NEXT_PUBLIC_ACTUAL_API_URL=https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH/stream
NEXT_PUBLIC_FORECAST_API_URL=https://data.elexon.co.uk/bmrs/api/v1/datasets/WINDFOR/stream
NEXT_PUBLIC_DEFAULT_START_DATE=2024-01-01
NEXT_PUBLIC_DEFAULT_END_DATE=2024-01-31
```

> [!IMPORTANT]
> Ensure these variables are also configured in your deployment platform (e.g., Vercel Environment Variables).

## �📊 Forecast Monitoring App Features
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
