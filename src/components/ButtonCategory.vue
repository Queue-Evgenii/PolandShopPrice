<template>
  <li v-if="category.data !== undefined" class="dropdown__item aaa">
    <q-btn class="dropdown__button" @click="handleClick(category)">
      {{ category.name }}
    </q-btn>
  </li>
</template>

<script setup>

const emitter = defineEmits(["openFile"]);

const handleClick = (category) => {
  emitter("openFile", category, category.data.data);
}

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
});
defineOptions({
  name: "ButtonCategory",
});
</script>
