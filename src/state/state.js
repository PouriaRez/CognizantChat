import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const chatState = create(
  persist((set) => ({
    chats: [],
    activeChatId: null,

    createChat: () => {
      const chat = {
        id: crypto.randomUUID(),
        title: 'New Chat',
        messages: [
          {
            role: 'system',
            content: `You are here to help the user with anything they ask for within reason.
          Respond using Markdown. Assume that you are returning to a dark background.
          Use headings, lists, code blocks, and emphasis where appropriate.`,
          },
        ],
        input: '',
        createdAt: Date.now(),
      };

      set((state) => ({
        chats: [chat, ...state.chats],
        activeChatId: chat.id,
      }));
    },

    removeChat: (chatId) => {
      set((state) => {
        const updatedChats = state.chats.filter((chat) => chat.id !== chatId);
        return {
          chats: updatedChats,
          activeChatId:
            state.activeChatId === chatId
              ? updatedChats[0]?.id
              : state.activeChatId,
        };
      });
    },

    setActiveChat: (chatId) => {
      set({ activeChatId: chatId });
    },

    setChatTitle: (chatId, newTitle) => {
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === chatId ? { ...chat, title: newTitle } : chat,
        ),
      }));
    },

    setNewInput: (chatId, input) => {
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                input: input,
              }
            : chat,
        ),
      }));
    },

    addMessage: (chatId, message) => {
      set((state) => ({
        chats: state.chats.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, message],
              }
            : chat,
        ),
      }));
    },
  })),
  { name: 'chat-session-state' },
);
