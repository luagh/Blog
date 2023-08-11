import { createStore, Commit } from 'vuex'
import { currentUser, ColumnProps, PostProps, UserProps } from '@/store/testData'
import axios from '@/libs/http'
export interface GlobalDataProps {
  loading: boolean
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url)
  commit(mutationName, data)
}
const store = createStore<GlobalDataProps>({
  state: {
    loading: false,
    columns: [],
    posts: [],
    user: currentUser
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'wdf' }
    },
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
    setLoading(state, status) {
      state.loading = status
    }
  },
  actions: {
    fetchColumns({ commit }) {
      getAndCommit('/api/columns', 'fetchColumns', commit)
    },
    // async fetchColumn({ commit }, cid) {
    //   const { data } = await axios.get(`/api/columns/${cid}`)
    //   commit('fetchColumn', data)
    // },
    // async fetchPosts({ commit }, cid) {
    //   const { data } = await axios.get(`/api/columns/${cid}/posts`)
    //   commit('fetchPosts', data)
    // }
    fetchColumn({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}`, 'fetchColumn', commit)
    },
    fetchPosts({ commit }, cid) {
      getAndCommit(`/api/columns/${cid}/posts`, 'fetchPosts', commit)
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
