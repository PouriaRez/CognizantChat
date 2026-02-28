/*
state.js functionality:
  - Creates states that are globally accessible
  - Functions allow for states to be changed as need be
  - Uses persist to automatically create an instance in localstorage
  - AI is given it's initial prompt here

Last edited: 2/27/2026

------------------------------------------------
Types:
  chats = [{
          id: crypto.randomUUID(),
          title: string,
          messages: [
            {
              role: 'system' | 'user' ,
              content: string,
            },
          ],
          input: string,
          createdAt: Date.now(),
        }]

  activeChatId: string
  err: string
  typing = {id: chatId, state: True | False}
  
*/

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const chatState = create(
  persist((set) => ({
    chats: [],
    activeChatId: null,
    err: null,
    typing: {},

    createChat: () => {
      const chat = {
        id: crypto.randomUUID(),
        title: 'New Chat',
        messages: [
          {
            role: 'system',
            content: `You are here to help the user with anything they ask for within reason.
            Follow the guidelines below:
              - Respond using Markdown. Assume that you are returning to a dark background.
              - Use all Markdown syntax to make it and easy to read.
              - Make sure spacing is well respected and every new line is clearly a new line and new paragraphs are easy to distinguish.
              - make it easy to read.
              - Have clear spacing between ideas, topics, lists, etc.
              - Use headings, lists, code blocks, and emphasis where appropriate.`,
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

    setErr: (message) => {
      set({ err: message });
    },

    setTyping: (typingState) => {
      set({ typing: typingState });
    },
  })),
  { name: 'chat-session-state' },
);
