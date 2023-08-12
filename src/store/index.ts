import { createStore, Commit } from 'vuex'
import { currentUser, ColumnProps, PostProps, UserProps } from '@/store/testData'
import axios from '@/libs/http'
import { StorageType, StorageHandler } from '@/libs/storage'
const storageType = StorageType.Local
const storageHandler = new StorageHandler()

export interface GlobalErrorProps {
  status: boolean
  message?: string
}
export interface GlobalDataProps {
  error: GlobalErrorProps
  token: string
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
  return data
}
const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axios.post(url, payload)
  commit(mutationName, data)
  return data
}
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    token: storageHandler.getItem(storageType, 'token') || '',
    loading: false,
    columns: [],
    posts: [],
    user: currentUser
  },
  mutations: {
    createPost(state, newPost) {
      state.posts.push(newPost)
    },
    fetchColumns(state, rawData) {
      console.log(rawData.data.list)
      state.columns = rawData.data.list
    },
    fetchColumn(state, rawData) {
      console.log(rawData.data)
      state.columns = [rawData.data]
    },
    fetchPosts(state, rawData) {
      console.log(rawData.data.list)
      state.posts = rawData.data.list
    },
    fetchCurrentUser(state, rawData) {
      state.user = { isLogin: true, ...rawData.data }
    },
    setLoading(state, status) {
      state.loading = status
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e
    },
    login(state, rawData) {
      const { token } = rawData.data
      state.token = token
      storageHandler.setItem(storageType, 'token', token)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    },
    logout(state) {
      state.token = ''
      storageHandler.remove(storageType, 'token')
      delete axios.defaults.headers.common.Authorization
    }
  },
  actions: {
    fetchColumns({ commit }) {
      return getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    fetchColumn({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      return getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
    },
    fetchCurrentUser({ commit }) {
      return getAndCommit('/api/user/current', 'fetchCurrentUser', commit)
    },
    login({ commit }, payload) {
      return postAndCommit('/api/user/login', 'login', commit, payload)
    },
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('fetchCurrentUser')
      })
    },
    register({ commit }, payload) {
      return postAndCommit('/api/auth/signup/using-email', 'register', commit, payload)
    },
    createPost({ commit }, payload) {
      return postAndCommit('/api/posts', 'createPost', commit, payload)
    }
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => c._id === id)
    },
    getPostsById: (state) => (cid: string) => {
      return state.posts.filter((post) => post.column === cid)
    }
  }
})
export default store
