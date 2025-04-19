<template>
  <loader-component v-if="isLoading" />
  <q-page class="flex flex-center main">
    <div class="_container">
      <div class="_sub-container">
        <div class="content">
          <header class="main__header">
            <h2>Sufity Poland Group doskonałość stylu</h2>
          </header>
          <section class="main__dropdown dropdown" v-if="categories">
            <ul class="dropdown__list">
              <template v-for="category in categories" :key="category.id">
                <dropdown-category v-if="Array.isArray(category.data)" :category="category"
                                   @openFile="openFileDelegate" />
                <button-category v-else :category="category" @openFile="openFileDelegate" />
              </template>

              <custom-link href="https://t.me/+aSOZnoJqLyo0ODA8">
                <i class="material-icons">send</i>
                <span>Telegram</span>
              </custom-link>
              <custom-link href="https://www.youtube.com/@sufitynapinane8596">
                <i class="material-icons">play_circle</i>
                <span>YouTube</span>
              </custom-link>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import LoaderComponent from "src/components/LoaderComponent.vue";
import DropdownCategory from "src/components/DropdownCategory.vue";
import ButtonCategory from "src/components/ButtonCategory.vue";
import CustomLink from "src/components/CustomLink.vue";
import { ref } from "vue";
import { getCategories } from "src/data";
import { Capacitor } from "@capacitor/core";

const categories = ref([]);
const isLoading = ref(false);

const openFileDelegate = async (category, target_name) => {
  const isNativeApp = Capacitor.isNativePlatform();

  const pdfUrl = `https://polandgroups.pl/price/public/data/categories/${category.parent_dir}/${target_name}`;

  if (!isNativeApp) {
    window.open(pdfUrl, "_blank");
  } else {
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
    window.location.href = viewerUrl;
  }
};

getCategories().then((data) => {
  data.sort((a, b) => a.id - b.id);
  categories.value = data;
});
</script>
