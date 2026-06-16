import { useState } from 'react';
import { createBooking } from '../../services/api';
import { TIME_SLOTS } from '../../utils/constants';

export const BookingForm = ({ onSuccess }) => {
    const [datePart, setDatePart] = useState('');
    const [timePart, setTimePart] = useState(TIME_SLOTS[0]);
    const [formData, setFormData] = useState({ name: '', phoneNumber: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!datePart) {
            setError("Vui lòng chọn ngày");
            return;
        }

        setIsLoading(true);
        try {
            const [hours, minutes] = timePart.split(':');
            const localDate = new Date(datePart);
            localDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

            const payload = {
                ...formData,
                requestedTime: localDate.toISOString()
            };
            
            await createBooking(payload);

            setError(null);
            setFormData({ name: '', phoneNumber: '' });
            if (onSuccess) onSuccess();
            alert("Đặt lịch thành công!");
            
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        width: '100%', padding: '10px 14px', marginTop: '6px',
        border: '1px solid #d1d5db', borderRadius: '8px',
        boxSizing: 'border-box', fontSize: '0.95rem',
        outlineColor: '#3b82f6'
    };

    const labelStyle = {
        display: 'block', fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginTop: '16px'
    };

    return (
        <form onSubmit={handleSubmit} style={{ 
            backgroundColor: '#ffffff', borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', 
            padding: '32px', maxWidth: '450px', margin: '0 auto', border: '1px solid #f3f4f6'
        }}>
            <h2 style={{ margin: '0 0 24px 0', color: '#111827', fontSize: '1.5rem', fontWeight: '700', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                Đăng ký lịch hẹn
            </h2>
            
            {error && (
                <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.9rem', border: '1px solid #f87171' }}>
                    {error}
                </div>
            )}
            
            <div>
                <label style={labelStyle}>Họ và Tên</label>
                <input 
                    name="name" value={formData.name} required
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                    style={inputStyle} placeholder="Nhập họ và tên..."
                />
            </div>
            
            <div>
                <label style={labelStyle}>Số điện thoại</label>
                <input 
                    name="phoneNumber" value={formData.phoneNumber} required
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
                    style={inputStyle} placeholder="Nhập số điện thoại..."
                />
            </div>
            
            <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ flex: '1' }}>
                    <label style={labelStyle}>Ngày hẹn</label>
                    <input 
                        type="date" value={datePart} required
                        onChange={e => setDatePart(e.target.value)} 
                        style={inputStyle}
                    />
                </div>

                <div style={{ width: '120px' }}>
                    <label style={labelStyle}>Giờ</label>
                    <select value={timePart} onChange={e => setTimePart(e.target.value)} style={inputStyle}>
                        {TIME_SLOTS.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <button 
                type="submit" 
                disabled={isLoading}
                style={{ 
                    width: '100%', marginTop: '32px', padding: '12px', 
                    backgroundColor: isLoading ? '#93c5fd' : '#2563eb', 
                    color: 'white', border: 'none', borderRadius: '8px', 
                    fontSize: '1rem', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s'
                }}
            >
                {isLoading ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
            </button>
        </form>
    );
};