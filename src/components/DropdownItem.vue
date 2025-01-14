<template>
  <li class="dropdown__item">
    <q-btn @click="isOpen = !isOpen" class="dropdown__button">
      {{ data.name }}
    </q-btn>
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <q-card v-if="isOpen" class="dropdown__body card">
        <q-tabs
          v-model="tab"
          dense
          align="justify"
          class="card__tabs"
          narrow-indicator
          :vertical="isSmallScreen"
        >
          <q-tab
            v-for="(item, index) in data.data"
            :key="index"
            :name="index"
            :label="item.name"
            @click="handleTabClick(data, item, index)"
          />
        </q-tabs>

        <q-tab-panels v-model="tab" animated class="card__content">
          <q-tab-panel
            v-for="(item, index) in data.data"
            :key="index"
            :name="index"
          >
            {{ item.type === "text" ? item.data : "" }}
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </transition>
  </li>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isOpen = ref(false);
const tab = ref(0);
let lastTab = 0;

// ================================

const handleTabClick = async (data, item, index) => {
  if (item.type === "link") window.open(item.data, "_blank");
  if (item.type === "file") {
    const filePath = `/data/categories/${data.parent_dir}/${item.data}`;
    window.open("/price" + filePath, "_blank");
    tab.value = lastTab;
    return;
  }
  lastTab = tab.value;
};

// ================================

const beforeEnter = (el) => {
  el.style.height = "0";
};
const enter = (el) => {
  const height = isSmallScreen.value ? "initial" : el.scrollHeight + "px";
  el.style.transition = "height 0.3s ease";
  el.style.height = height;
  el.style.overflow = "hidden";
};
const leave = (el) => {
  el.style.transition = "height 0.3s ease";
  el.style.height = "0";
};

// ===============================

const conditionalWidth = 768;
const isSmallScreen = ref(window.innerWidth < conditionalWidth);

const updateScreenWidth = () => {
  isSmallScreen.value = window.innerWidth < conditionalWidth;
  console.log(isSmallScreen.value);
};

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenWidth);
});

// ==============================

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
defineOptions({
  name: "DropdownItem",
});
</script>
