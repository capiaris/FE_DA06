import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { SchedulePage } from './pages/SchedulePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="book" element={<BookingPage />} />
                    <Route path="schedule" element={<SchedulePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;