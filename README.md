# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# techEvaluation-Front-end

## Voting Dashboard App (Full-Stack, Path 3)

This is a full-stack web-based voting application dashboard. Users can submit votes and view aggregated results in charts. The project demonstrates a functional dashboard, vote aggregation, and responsive UI.

- Frontend: React
- Backend: Node.js + Express (Also contained in the email)
- Database: MongoDB

## Folder structure
- `votingSystem` -> front-end
- `package.json` -> frontend dependencies and scripts
- `src` -> contain alll components, front-end root file and css
- `components` -> contain functions and components of the application
- `aFormVote` -> default json data to use in the post vote
- `chartMaker` -> create bar chart

### Frontend
1. Install dependencies: ```npm install```
2. Build the application's front-end: ```npm run build```
3. Run the app: ```npm run dev```


## Front-end Endpoints

- `/` → see all the results throughout each years. Have all information of votes result from each countries
- `GET /votes/stats` → get aggregated results (counts, percentages)
- `GET /votes/:candidateId` → get votes per candidate
