import { create } from 'zustand'
import toast from 'react-hot-toast'
import { api } from '../lib/axios'

export const useChatStore = create((set) => ({
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

  setSelectedUser: (selectedUser) => set({ selectedUser })
}))
