import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../features/booking/BookingForm';

export const BookingPage = () => {
    const navigate = useNavigate();

    const handleBookingSuccess = () => {
        navigate('/schedule');
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <BookingForm onSuccess={handleBookingSuccess} />
        </div>
    );
};