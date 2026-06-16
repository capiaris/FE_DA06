import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
    const location = useLocation();

    // Hàm tạo style động: Nếu đang ở trang nào thì tab đó sẽ đổi màu nổi bật
    const getLinkStyle = (path) => {
        const isActive = location.pathname === path;
        return {
            textDecoration: 'none',
            color: isActive ? '#2563eb' : '#4b5563',
            fontWeight: isActive ? '600' : '500',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: isActive ? '#eff6ff' : 'transparent',
            transition: 'all 0.2s ease',
            fontSize: '0.95rem'
        };
    };

    return (
        <header style={{
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '16px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '40px', height: '40px',
                        backgroundColor: '#2563eb', 
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '20px',
                        boxShadow: '0 2px 4px rgba(37,99,235,0.3)'
                    }}>
                        B
                    </div>
                    <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#1f2937', fontWeight: '700', letterSpacing: '-0.5px' }}>
                        BookingSpace
                    </h1>
                </div>
                
                <nav style={{ display: 'flex', gap: '8px' }}>
                    <Link to="/" style={getLinkStyle('/')}>Trang chủ</Link>
                    <Link to="/book" style={getLinkStyle('/book')}>Đặt lịch hẹn</Link>
                    <Link to="/schedule" style={getLinkStyle('/schedule')}>Bảng lịch trình</Link>
                </nav>
            </div>
        </header>
    );
};