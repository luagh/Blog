import { createStore } from 'vuex'
import { testColumns, testPosts, currentUser, ColumnProps, PostProps, UserProps } from '../testData'
export interface GlobalDataProps {
  columns: ColumnProps[]
  posts: PostProps[]
  user: UserProps
}
const store = createStore({
  state: {
    columns: testColumns,
    posts: testPosts,
    user: currentUser
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: '咬楼猪' }
    },
    createPost(state, newPost) {
      state.posts.push(newPost)
    }
  },
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter((c) => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find((c) => c.id === id)
    },
    getPostsById: (state) => (cid: number) => {
      return state.posts.filter((post) => post.columnId === cid)
    }
  }
})

export default store
