<template>
  <div class="fixed-top-left pdf-wrapper">
    <q-btn
      icon="close"
      flat
      round
      color="white"
      class="pdf-close bg-pink"
      @click="onClose"
    />
    <div v-for="(page, index) in pages" :key="index">
      <canvas class="full-width" :ref="`pdfCanvas${index}`" :id="'canvas-' + index" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, nextTick } from "vue";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

GlobalWorkerOptions.workerSrc = "/price/pdf/pdf.worker.mjs";

export default {
  props: {
    pdfUrl: String,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const pages = ref([]);
    const canvasRefs = ref([]);

    onMounted(async () => {
      try {
        const pdf = await getDocument(props.pdfUrl).promise;
        const totalPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          pages.value.push({ pageNum, viewport });
        }

        await nextTick();

        pages.value.forEach(async (page, index) => {
          const canvas = document.getElementById(`canvas-${index}`);
          if (canvas) {
            const context = canvas.getContext("2d");

            canvas.width = page.viewport.width;
            canvas.height = page.viewport.height;

            const renderContext = {
              canvasContext: context,
              viewport: page.viewport,
            };

            const pdf = await getDocument(props.pdfUrl).promise;
            const pageObj = await pdf.getPage(page.pageNum);
            await pageObj.render(renderContext).promise;

          } else {
            console.error(`Canvas with id canvas-${index} not found`);
          }
        });
      } catch (error) {
        console.error("Ошибка загрузки PDF:", error);
      }
    });

    const onClose = () => {
      emit("close");
    };

    return { pages, canvasRefs, onClose };
  },
};
</script>

<style>
.pdf-wrapper {
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  z-index: 10000000;

  canvas {
    border: 1px solid black;
    margin-bottom: 10px;
    display: block;
    height: auto !important;
  }

  .pdf-close {
    position: fixed;
    top: 50px;
    right: 30px;
    z-index: 10000000;
  }
}
</style>
