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
              <dropdown-item
                v-for="category in categories"
                :key="category.id"
                :data="category"
              />
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
                  href="https://youtube.com"
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
  categories.value = data;
});
defineOptions({
  name: "IndexPage",
});
</script>
