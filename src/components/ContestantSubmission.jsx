import { useState } from 'react';
import { ethers } from 'ethers';

function ContestantSubmission() {
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('photo', photo);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            // Handle response
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button type="submit">Submit Photo</button>
        </form>
    );
} 