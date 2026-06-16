import { useState, useEffect } from 'react';
import { getBookingsByDate } from '../../services/api';
import { TIME_SLOTS } from '../../utils/constants';

export const ScheduleBoard = ({ refreshTrigger }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByDate(date);
                setBookings(response.data || []);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setBookings([]);
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
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h2>Schedule Board</h2>
            <input 
                type="date" value={date} 
                onChange={(e) => setDate(e.target.value)} 
                style={{ marginBottom: '20px' }}
            />
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {TIME_SLOTS.map(slot => {
                    const slotBookings = getSlotBookings(slot);
                    return (
                        <div key={slot} style={{ border: '1px solid #999', padding: '10px' }}>
                            <h4>{slot} ({slotBookings.length}/3)</h4>
                            <ul>
                                {slotBookings.map(b => (
                                    <li key={b._id}>{b.name}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};