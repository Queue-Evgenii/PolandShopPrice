<template>
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
                <li v-if="category.data == undefined" class="dropdown__item">
                  <q-btn class="dropdown__button">
                    {{ category.name }}
                  </q-btn>
                </li>
                <dropdown-item
                  v-else-if="Array.isArray(category.data)"
                  :data="category"
                />
                <li v-else class="dropdown__item">
                  <q-btn
                    class="dropdown__button"
                    :href="`/price/data/categories/${category.parent_dir}/${category.data.data}`"
                    target="_blank"
                  >
                    {{ category.name }}
                  </q-btn>
                </li>
              </template>

              <li class="dropdown__item">
                <q-btn
                  class="dropdown__button"
                  href="https://t.me"
                  target="_blank"
                >
                  <div class="btn-link__content">
                    <i class="material-icons">send</i>
                    <span>Telegram</span>
                  </div>
                </q-btn>
              </li>
              <li class="dropdown__item">
                <q-btn
                  class="dropdown__button"
                  href="https://www.youtube.com/@sufitynapinane8596"
                  target="_blank"
                >
                  <div class="btn-link__content">
                    <i class="material-icons">play_circle</i>
                    <span>YouTube</span>
                  </div>
                </q-btn>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import DropdownItem from "src/components/DropdownItem.vue";
import { getCategories } from "src/data";

const categories = ref([]);

getCategories().then((data) => {
  data.sort((a, b) => a.id - b.id);
  categories.value = data;
});
defineOptions({
  name: "IndexPage",
});
</script>
