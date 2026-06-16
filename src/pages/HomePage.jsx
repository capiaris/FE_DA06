import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ marginBottom: '24px' }}>
                <span style={{ 
                    backgroundColor: '#dbeafe', color: '#1e40af', 
                    padding: '6px 16px', borderRadius: '20px', 
                    fontSize: '0.875rem', fontWeight: '600' 
                }}>
                    Hệ thống đặt lịch thông minh
                </span>
            </div>
            
            <h2 style={{ fontSize: '2.5rem', color: '#111827', marginBottom: '16px', fontWeight: '800', letterSpacing: '-1px' }}>
                Chào mừng đến với hệ thống
            </h2>
            
            <p style={{ color: '#6b7280', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto 40px', lineHeight: '1.6' }}>
                Quản lý lịch hẹn làm việc của bạn một cách dễ dàng, trực quan và tiện lợi. Vui lòng chọn một chức năng bên dưới để bắt đầu.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <Link to="/book" style={{
                    textDecoration: 'none', backgroundColor: '#2563eb', color: 'white',
                    padding: '12px 28px', borderRadius: '10px', fontWeight: '600', 
                    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.25)', transition: 'opacity 0.2s'
                }}>
                    + Đặt lịch mới
                </Link>
                <Link to="/schedule" style={{
                    textDecoration: 'none', backgroundColor: '#ffffff', color: '#374151', 
                    border: '1px solid #d1d5db', padding: '12px 28px', borderRadius: '10px', 
                    fontWeight: '600', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                }}>
                    Xem lịch trình
                </Link>
            </div>
        </div>
    );
};