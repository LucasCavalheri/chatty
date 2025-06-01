import { create } from 'zustand'
import { api } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await api.get('/auth/check')

      set({ authUser: response.data })
    } catch (error) {
      console.log(error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await api.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success('Conta criada com sucesso!')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await api.post('/auth/login', data)
      set({ authUser: res.data })
      toast.success('Logado com sucesso!')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout')
      set({ authUser: null })
      toast.success('Deslogado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao deslogar')
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await api.put('/auth/update-profile', data)
      set({ authUser: res.data })
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      console.log(error)
      toast.error('Ocorreu um erro ao atualizar o perfil')
    } finally {
      set({ isUpdatingProfile: false })
    }
  }
}))
