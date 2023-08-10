<template>
  <div class="contarner">
    <global-header :user="currentUser"></global-header>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          type="text"
          placeholder="请输入邮箱地址"
          ref="inputRef"
        ></validate-input>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <validate-input
          v-model="passwordVal"
          :rules="passwordRules"
          id="exampleInputPassword1"
          placeholder="请输入密码"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-primary">提交</span>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from './components/ValidateInput.vue'
import GlobalHeader, { userProps } from './components/GlobalHeader.vue'
import ValidateForm, { emitter } from './components/ValidateForm.vue'
// const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const currentUser: userProps = {
  isLogin: true,
  name: 'wdf'
}
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList, { type ColumnProps } from './components/ColumnList.vue'

export default defineComponent({
  name: 'App',
  components: {
    // ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup() {
    const inputRef = ref<any>()
    const emailVal = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]

    const passwordVal = ref('')
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }]
    const onFormSubmit = (result: boolean) => {
      console.log(result)
      emitter.emit('clear-input', result)
    }
    return {
      currentUser,
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit,
      inputRef
    }
  }
})
</script>
