import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from 'next-themes';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ChatHistory } from '../components/ChatHistory';
import { ThemeToggle } from '../components/ThemeToggle';
import useChatStore from '../../utils/store';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function App() {
  const {
    conversations,
    activeConversationId,
    addMessage,
    isTyping,
    setTyping,
    createNewChat,
  } = useChatStore();

  const messagesEndRef = useRef(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  useEffect(() => {
    if (conversations.length === 0) {
      createNewChat();
    }
  }, [conversations, createNewChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSend = async (message) => {
    try {
      const apiKey = 'AIzaSyCjKig1gbcjrHj_Bnqd1sd_r9XTgtLstvI';
      const genAI = new GoogleGenerativeAI(apiKey);

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-exp',
      });

      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      };

      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(message);

      console.log('AI Result:', result);

      let aiMessage = 'Invalid AI response';

      if (result.response && typeof result.response === 'object') {
        aiMessage = result.response.text() || 'Invalid AI response';
      }

      console.log('User Message:', message, 'AI Message:', aiMessage);

      addMessage(message,"user");

      setTyping(true);
      setTimeout(() => {
        addMessage(aiMessage);
        setTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error during chat processing:', error);
    }
  };

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              AI Chat
            </h1>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-grow container mx-auto flex">
          <ChatHistory />

          <div className="flex-1 p-4 flex flex-col min-h-[calc(100vh-4rem)]">
            <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 flex flex-col">
              <div className="flex-grow overflow-y-auto messages-container">
                {activeConversation?.messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    content={msg.content}
                    role={msg.role}
                  />
                ))}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 p-4">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="mt-4">
                <ChatInput onSend={handleSend} disabled={isTyping} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
