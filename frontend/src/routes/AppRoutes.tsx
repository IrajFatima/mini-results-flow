import { Routes, Route } from 'react-router-dom';

import FormPage from '../features/form/FormPage.tsx';
import ResultsPage from '../features/results/ResultsPage';
import SalesPage from '../features/sales/SalesPage';
import AIRecommendationsPage from '../features/aiRecommendations/AIRecommendationPage.tsx';
import LoginPage from '../features/login/LoginPage.tsx';
import SignupPage from '../features/signup/SignupPage.tsx';
import DashboardPage from '../features/dashboard/DashboardPage.tsx';

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<FormPage />} />
            <Route path="/results/" element={<ResultsPage />} />
            <Route path="/results/:formId" element={<ResultsPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/recommendations" element={<AIRecommendationsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />
            </Route>
        </Routes >
    )
}
