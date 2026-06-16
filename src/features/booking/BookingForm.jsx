import { useState } from 'react';
import { createBooking } from '../../services/api';
import { TIME_SLOTS } from '../../utils/constants';

export const BookingForm = ({ onSuccess }) => {
    const [datePart, setDatePart] = useState('');
    const [timePart, setTimePart] = useState(TIME_SLOTS[0]);
    const [formData, setFormData] = useState({ name: '', phoneNumber: '' });
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!datePart) {
            setError("Please select a date");
            return;
        }

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
            alert("Booking successful!");
            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '20px' }}>
            <h2>Create Booking</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <div>
                <label>Name: </label>
                <input 
                    name="name" value={formData.name} required
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                />
            </div>
            
            <div style={{ marginTop: '10px' }}>
                <label>Phone: </label>
                <input 
                    name="phoneNumber" value={formData.phoneNumber} required
                    onChange={e => setFormData({...formData, phoneNumber: e.target.value})} 
                />
            </div>
            
            <div style={{ marginTop: '10px' }}>
                <label>Date: </label>
                <input 
                    type="date" value={datePart} required
                    onChange={e => setDatePart(e.target.value)} 
                />
            </div>

            <div style={{ marginTop: '10px' }}>
                <label>Time: </label>
                <select value={timePart} onChange={e => setTimePart(e.target.value)}>
                    {TIME_SLOTS.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                    ))}
                </select>
            </div>
            
            <button type="submit" style={{ marginTop: '15px' }}>Submit</button>
        </form>
    );
};