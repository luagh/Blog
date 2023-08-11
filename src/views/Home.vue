<template>
  <div class="home-page">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store/index'
import ColumnList from '../components/ColumnList.vue'

export default defineComponent({
  name: 'HomeList',
  components: {
    ColumnList
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
      store.dispatch('fetchColumns')
    })
    const list = computed(() => store.state.columns)
    return {
      list: list
    }
  }
})
</script>

<style scoped></style>
