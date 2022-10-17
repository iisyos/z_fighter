<script setup lang="ts">
import { ref, Ref } from "vue";
import { Storage } from 'aws-amplify';
import *  as repository from "./repository";

const imageFile: Ref<null | File> = ref(null);
const preview: Ref<null | HTMLImageElement> = ref(null)
let uploadedImage = ref(false)
let imageUrl = ref('')

const onClickPredict = async () => {
  console.log(imageUrl.value)
  const modifiedUrl = imageUrl.value.split('?')[0]
  const response = await repository.getZfighterSimilarity(modifiedUrl)
  console.log(response)
}

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
        imageUrl.value = url
        uploadedImage.value = true
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

</script>

<template>
  <div class="p-3 row">
    <label class="btn btn-info">
      写真を撮ってアップロードする<br>
      <input type="file" class="d-none" accept="image/*" capture="user" @change="onCaptureImage">
    </label>
  </div>
  <img ref="preview" style="display:block;max-width:100%;height:50vh;">
  <button v-if="uploadedImage" @click="onClickPredict()">診断する</button>
</template>
