<template>
  <div class="container-fluid px-0 flex-shrink-0">
    <global-header :user="currentUser"></global-header>
    <loader v-if="isLoading" text="拼命加载中" background="rgba(0, 0, 0, 0.8)"></loader>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">wdf专栏</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'

import GlobalHeader from './components/GlobalHeader.vue'
import Loader from '@/base/Loading.vue'
import { GlobalDataProps } from '@/declareData'
import createMessage from '@/base/createMessage'
import 'bootstrap/dist/css/bootstrap.min.css'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loader
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)

    const error = computed(() => store.state.error)

    watch(
      () => error.value.status,
      () => {
        const { status, message } = error.value
        if (status && message) {
          createMessage(message, 'error')
        }
      }
    )
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>
<style>
.container {
  width: 100vw;
}
</style>
