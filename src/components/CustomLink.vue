<template>
  <li class="dropdown__item">
    <q-btn class="dropdown__button" :href="href" target="_blank">
      <div class="btn-link__content">
        <slot></slot>
      </div>
    </q-btn>
  </li>
</template>

<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true,
  },
});
defineOptions({
  name: "CustomLink",
});
</script>
