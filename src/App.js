import React from 'react';
import AIChatInput from './components/AIChatInput';
import AIChatHistory from './components/AIChatHistory';
import './App.css';

function App() {
    const [messages, setMessages] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSendMessage = async (message) => {
        setIsLoading(true);
        setMessages(prev => [...prev, { role: 'user', content: message }]);

        try {
            // Replace with your actual API call
            const response = await fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1>AI Chat Application</h1>
            </header>
            <main className="app-main">
                <AIChatHistory messages={messages} isLoading={isLoading} />
                <AIChatInput onSendMessage={handleSendMessage} />
            </main>
        </div>
    );
}

export default App; 