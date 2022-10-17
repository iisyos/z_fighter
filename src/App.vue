<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref, Ref } from "vue";
import { Storage } from 'aws-amplify';

const imageFile: Ref<null | File> = ref(null);
const preview: Ref<null | HTMLImageElement> = ref(null)

const onCaptureImage = async (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    const files = e.target.files ?? [];
    if (files.length > 0) {
      const file = files[0]
      imageFile.value = file;
      const dt = new Date();
      const dirName = getDirString(dt);
      const filePath = dirName + "/" + file.name;
      await Storage.put(filePath, file, {
        contentType: 'image/png'
      });
      const url = await Storage.get(filePath);
      if (preview.value instanceof HTMLImageElement) {
        preview.value.src = url
      }
    }
  }
}

const getDirString = (date: Date) => {
  let random: number = date.getTime() + Math.floor(100000 * Math.random());
  random = Math.random() * random;
  return "" +
    ("00" + date.getUTCFullYear()).slice(-2) +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    ("00" + date.getUTCDate()).slice(-2) +
    ("00" + date.getUTCHours()).slice(-2) +
    ("00" + date.getUTCMinutes()).slice(-2) +
    ("00" + date.getUTCSeconds()).slice(-2) +
    "-" + Math.floor(random).toString(16);
}

const getBase64 = async (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
</script>

<template>
  <div class="p-3 row">
    <label class="btn btn-info">
      写真を撮ってアップロードする<br>
      <input type="file" class="d-none" accept="image/*" capture="user" @change="onCaptureImage">
    </label>
  </div>
  <img ref="preview" style="display:block;max-width:100%;">
  <input >
</template>

