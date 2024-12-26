import React from 'react';
import { create } from 'zustand';

// Zustand store
const useChatStore = create((set) => ({
  conversations: [],
  activeConversationId: null,
  isTyping: false,

  setActiveConversation: (id) => {
    set({ activeConversationId: id });
  },

  deleteConversation: (id) => {
    set((state) => {
      const newConversations = state.conversations.filter((c) => c.id !== id);
      const newActiveId =
        state.activeConversationId === id
          ? newConversations[0]?.id || null
          : state.activeConversationId;

      return {
        conversations: newConversations,
        activeConversationId: newActiveId,
      };
    });
  },

  addMessage: (content, role) => {
    set((state) => {
      const activeConversation = state.conversations.find(
        (c) => c.id === state.activeConversationId
      );

      if (!activeConversation) {
        const newConversation = {
          id: Math.random().toString(36).substring(7),
          title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
          messages: [
            {
              id: Math.random().toString(36).substring(7),
              content,
              role,
              timestamp: new Date(),
            },
          ],
          createdAt: new Date(),
        };

        return {
          conversations: [newConversation, ...state.conversations],
          activeConversationId: newConversation.id,
        };
      }

      const updatedConversations = state.conversations.map((conv) =>
        conv.id === state.activeConversationId
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: Math.random().toString(36).substring(7),
                  content,
                  role,
                  timestamp: new Date(),
                },
              ],
            }
          : conv
      );

      return { conversations: updatedConversations };
    });
  },

  setTyping: (typing) => set({ isTyping: typing }),

  createNewChat: () => {
    set((state) => {
      const newChat = {
        id: Math.random().toString(36).substring(7),
        title: "New Conversation",
        messages: [],
        createdAt: new Date(),
      };

      return {
        conversations: [newChat, ...state.conversations],
        activeConversationId: newChat.id,
      };
    });
  },
}));

export default useChatStore;
