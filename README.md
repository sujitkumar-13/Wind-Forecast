# Wind Power Forecast Monitoring & Analysis

This project is a submission for the Full Stack SWE challenge. It includes a web application for monitoring wind power forecasts and a Jupyter notebook for deep analysis of forecast errors and wind generation reliability.

## 🚀 Live Demo
- **App Link**: [Deploy on Vercel/Heroku/Similar](https://your-app-link.vercel.app)
- **Demo Video**: [YouTube Link](https://youtube.com/link-to-video)

## 📁 Repository Structure
- `src/`: Core React application logic.
    - `components/`: UI components (Charts, Controls, Stats).
    - `lib/`: Data fetching, forecast logic, and processing.
    - `pages/`: Main application view.
- `analysis.ipynb`: Jupyter notebook containing detailed forecast analysis.
- `public/`: Static assets and icons.

## 🛠️ Technologies Used
- **Frontend**: Vite, React, TypeScript, Tailwind CSS, shadcn/ui.
- **Charts**: Recharts, Framer Motion for animations.
- **Analysis**: Python (Pandas, Numpy, Matplotlib, Seaborn).
- **AI Tools**: Assisted with UI design refinement and logic debugging.

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
4. Build for production:
   ```bash
   npm run build
   ```

### Running Analysis
1. Ensure Python and Jupyter are installed.
2. Install requirements: `pip install pandas numpy matplotlib seaborn`.
3. Open `analysis.ipynb` in your preferred editor.

## 📊 Forecast Monitoring App
The application allows users to:
- Compare **Actual Generation** (blue) vs **Forecasted Generation** (green).
- Adjust the **Forecast Horizon** (0-48h) via a slider.
- Select date ranges for analysis.
- View real-time error statistics (Mean Error, MAE, RMSE, P99).
- Analyze wind reliability (P10 value) for capacity planning.

## 🧪 Analysis Highlights
- **Error Sensitivity**: Analysis of how forecast accuracy degrades over longer horizons.
- **Reliability Recommendation**: Calculated reliable wind capacity (P10) based on historical variability.
- **Visualizations**: Distribution plots, hourly error trends, and cumulative generation curves.

---
*Created as part of the hiring process for Reint.*
