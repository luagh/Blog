<template>
  <div class="home-page">
    <column-list :list="list"></column-list>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
    const list = computed(() => store.state.columns)
    const biggerColumnLen = computed(() => store.getters.biggerColumnsLen)
    return {
      list: list,
      biggerColumnLen
    }
  }
})
</script>

<style scoped></style>
