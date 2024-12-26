import React from 'react';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import useChatStore from '../../utils/store';

export function ChatHistory() {
  const { conversations, activeConversationId, createNewChat, setActiveConversation, deleteConversation } = useChatStore();

  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col h-full">
      <div className="p-4">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setActiveConversation(conv.id)}
            className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              conv.id === activeConversationId
                ? 'bg-gray-100 dark:bg-gray-800'
                : ''
            }`}
          >
            <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="flex-1 truncate text-sm text-gray-700 dark:text-gray-300">
              {conv.title || 'New Chat'}
            </span>
            {conv.id === activeConversationId && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
