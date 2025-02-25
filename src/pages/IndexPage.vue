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
import { openFile } from "src/fileopener";

// ============================================

const isLoading = ref(false);

const openFileDelegate = (category, target_name) => {
  const pending = openFile(category, target_name);
  if (pending === undefined) return;

  isLoading.value = true;
  pending
    .finally(() => {
      isLoading.value = false;
    })
}

// ============================================

const categories = ref([]);

getCategories().then((data) => {
  data.sort((a, b) => a.id - b.id);
  categories.value = data;
});
defineOptions({
  name: "IndexPage",
});
</script>
