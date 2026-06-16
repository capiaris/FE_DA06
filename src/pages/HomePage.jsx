import { useState } from 'react';
import { BookingForm } from '../features/booking/BookingForm';
import { ScheduleBoard } from '../features/schedule/ScheduleBoard';

export const HomePage = () => {
    const [refreshCount, setRefreshCount] = useState(0);

    const handleBookingSuccess = () => {
        setRefreshCount(prev => prev + 1);
    };

    return (
        <div style={{ display: 'flex', gap: '30px', padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ flex: '0 0 350px' }}>
                <BookingForm onSuccess={handleBookingSuccess} />
            </div>
            <div style={{ flex: '1' }}>
                <ScheduleBoard refreshTrigger={refreshCount} />
            </div>
        </div>
    );
};