import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const MainLayout = () => {
    return (
        <div style={{ 
            minHeight: '100vh', 
            backgroundColor: '#f3f4f6', 
            fontFamily: 'system-ui, -apple-system, sans-serif' 
        }}>
            <Header />
            <main style={{ 
                maxWidth: '1200px', 
                margin: '32px auto', 
                padding: '0 24px'
            }}>
                <div style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '16px', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: '32px',
                    minHeight: '65vh'
                }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};