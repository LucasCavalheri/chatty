import { create } from 'zustand'
import toast from 'react-hot-toast'
import { api } from '../lib/axios'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const res = await api.get('/messages/users')
      set({ users: res.data })
    } catch (error) {
      console.log(error)
      toast.error('Erro ao buscar usuários')
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true })
    try {
      const res = await api.get(`/messages/${userId}`)
      set({ messages: res.data })
    } catch (error) {
      console.log(error)
      toast.error('Erro ao buscar mensagens')
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get()

    try {
      const res = await api.post(`/messages/send/${selectedUser._id}`, messageData)
      set({ messages: [...messages, res.data] })
    } catch (error) {
      console.log(error)
      toast.error('Erro ao enviar mensagem')
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get()
    if (!selectedUser) return

    const socket = useAuthStore.getState().socket

    socket.on('newMessage', (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
      if (!isMessageSentFromSelectedUser) return

      set({ messages: [...get().messages, newMessage] })
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket

    socket.off('newMessage')
  },

  setSelectedUser: (selectedUser) => set({ selectedUser })
}))
