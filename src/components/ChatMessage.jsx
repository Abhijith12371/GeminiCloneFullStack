import React from 'react';
import PropTypes from 'prop-types';
import { LucideUser, Bot } from 'lucide-react';

export function ChatMessage({ content, role }) {
  const isUser = role === 'user';

  // Render content as plain text or JSON, prioritizing readability
  const renderContent = () => {
    if (typeof content === 'string') {
      return content; // Display plain text
    }
    if (typeof content === 'object' && content !== null) {
      // Check if there's a specific field to display
      if (content.text) {
        return content.text;
      }
      return JSON.stringify(content, null, 2); // Pretty-print JSON as fallback
    }
    return String(content); // Handle other data types gracefully
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-start max-w-[80%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* User or AI Avatar */}
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${
            isUser
              ? 'bg-blue-500 ml-2'
              : 'bg-gray-600 dark:bg-gray-500 mr-2'
          }`}
        >
          {isUser ? (
            <LucideUser className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`p-3 rounded-lg ${
            isUser
              ? 'bg-blue-500 text-white rounded-tr-none'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
          }`}
        >
          <p>{renderContent()}</p>
        </div>
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
};
