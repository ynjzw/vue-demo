<template>
  <div class="upload-page">
    <h2>上传 CSV 并导入 MySQL</h2>
    <input type="file" accept=".csv" @change="onFileChange" />
    <div style="margin-top: 12px;">
      <button :disabled="!file || uploading" @click="upload">上传并导入</button>
      <button v-if="file && !uploading" @click="clear">清除</button>
    </div>

    <div v-if="uploading" style="margin-top: 12px;">上传中... {{progress}}%</div>
    <div v-if="result" style="margin-top: 12px; white-space: pre-wrap;">{{ result }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const file = ref(null)
const uploading = ref(false)
const progress = ref(0)
const result = ref('')

function onFileChange(e) {
  const f = e.target.files[0]
  if (f && f.name.endsWith('.csv')) {
    file.value = f
    result.value = ''
  } else {
    alert('请选择一个 CSV 文件')
    e.target.value = ''
    file.value = null
  }
}

function clear() {
  file.value = null
  result.value = ''
}

async function upload() {
  if (!file.value) return
  uploading.value = true
  progress.value = 0
  result.value = ''

  try {
    const form = new FormData()
    form.append('file', file.value)

    const resp = await axios.post('/api/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (ev) => {
        if (ev.lengthComputable) {
          progress.value = Math.round((ev.loaded / ev.total) * 100)
        }
      }
    })

    result.value = JSON.stringify(resp.data, null, 2)
  } catch (err) {
    console.error(err)
    result.value = err?.response?.data?.message || err.message || '上传失败'
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
.upload-page {
  padding: 16px;
}
</style>
