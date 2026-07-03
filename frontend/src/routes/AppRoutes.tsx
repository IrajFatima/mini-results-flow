import {Routes , Route } from 'react-router-dom';

import FormPage from '../features/form/FormPage.tsx';
import ResultsPage from '../features/results/ResultsPage';
import SalesPage from '../features/sales/SalesPage';
import AIRecommendationsPage from '../features/aiRecommendations/aiRecommendationPage.tsx';


export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<FormPage/>} />
            <Route path="/results" element={<ResultsPage/>} />
            <Route path="/sales" element={<SalesPage/>} />
            <Route path="/recommendations" element={<AIRecommendationsPage/>} />

        </Routes>
    )
}
