import { useState, useEffect } from 'react';
import { getBookingsByDate } from '../../services/api';
import { TIME_SLOTS } from '../../utils/constants';

export const ScheduleBoard = ({ refreshTrigger }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBookings = async () => {
            setIsLoading(true);
            try {
                const response = await getBookingsByDate(date);
                setBookings(response.data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setBookings([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBookings();
    }, [date, refreshTrigger]);

    const getSlotBookings = (slotTime) => {
        return bookings.filter(b => {
            const bDate = new Date(b.requestedTime);
            const hours = bDate.getHours().toString().padStart(2, '0');
            const minutes = bDate.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}` === slotTime;
        });
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
                <h2 style={{ margin: 0, color: '#111827', fontSize: '1.5rem', fontWeight: '700' }}>
                    Bảng Lịch Trình
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#4b5563' }}>Chọn ngày:</label>
                    <input 
                        type="date" value={date} 
                        onChange={(e) => setDate(e.target.value)} 
                        style={{ padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '8px', outlineColor: '#3b82f6', color: '#1f2937', fontWeight: '500' }}
                    />
                </div>
            </div>
            
            {isLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Đang tải dữ liệu...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                    {TIME_SLOTS.map(slot => {
                        const slotBookings = getSlotBookings(slot);
                        const isFull = slotBookings.length >= 3;
                        const isEmpty = slotBookings.length === 0;

                        return (
                            <div key={slot} style={{ 
                                border: `1px solid ${isFull ? '#fca5a5' : '#e5e7eb'}`, 
                                borderRadius: '12px', overflow: 'hidden',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{ 
                                    backgroundColor: isFull ? '#fee2e2' : '#f9fafb', 
                                    padding: '12px 16px', borderBottom: `1px solid ${isFull ? '#fca5a5' : '#e5e7eb'}`,
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <h4 style={{ margin: 0, color: isFull ? '#991b1b' : '#374151', fontSize: '1.1rem' }}>{slot}</h4>
                                    <span style={{ 
                                        backgroundColor: isFull ? '#f87171' : '#dbeafe', 
                                        color: isFull ? 'white' : '#1e40af', 
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'
                                    }}>
                                        {slotBookings.length}/3
                                    </span>
                                </div>
                                
                                <div style={{ padding: '12px 16px', minHeight: '80px', backgroundColor: '#ffffff' }}>
                                    {isEmpty ? (
                                        <div style={{ color: '#9ca3af', fontSize: '0.9rem', fontStyle: 'italic', textAlign: 'center', marginTop: '10px' }}>Trống</div>
                                    ) : (
                                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {slotBookings.map(b => (
                                                <li key={b._id} style={{ 
                                                    backgroundColor: '#eff6ff', color: '#1e3a8a', 
                                                    padding: '8px 12px', borderRadius: '6px', 
                                                    fontSize: '0.9rem', fontWeight: '500',
                                                    border: '1px solid #bfdbfe'
                                                }}>
                                                    👤 {b.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};