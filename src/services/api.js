const API_URL = '/api';

export const createBooking = async (data) => {
    const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
    }
    return response.json();
};

export const getBookingsByDate = async (date) => {
    const response = await fetch(`${API_URL}/bookings?date=${date}&limit=100`);
    if (!response.ok) throw new Error('Request failed');
    return response.json();
};