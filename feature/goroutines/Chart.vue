<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps({
  data: { type: Object, default: null }
});
const emit = defineEmits(['select']);

interface Category {
  name: string;
  percentage: number;
  count: number;
}

const categories = computed(() => {
  const categoriesByState = new Map<string, Category>();
  const categories = [] as Category[];

  if (props.data) {
    for (const goroutine of props.data.items) {
      const state = goroutine.state;
      if (!categoriesByState.has(state)) {
        const c = { name: state, count: 0, percentage: 0 } as Category;
        categoriesByState.set(state, c);
        categories.push(c);
      }

      categoriesByState.get(state)!.count++;
    }
  }

  const m = categories.length > 0 ? Math.max(...categories.map((c) => c.count)) : 1;
  for (const c of categories) {
    c.percentage = Math.round((c.count / m) * 100);
  }
  categories.sort((a, b) => b.count - a.count);
  return categories;
});

const data = computed(() => {
  const cs = categories.value;

  const labels = cs.map((c) => c.name);
  const data = cs.map((c) => c.count);

  return {
    labels,
    datasets: [
      {
        label: 'Goroutines',
        backgroundColor: 'rgb(14, 116, 144)',
        data
      }
    ]
  };
});
const options = computed(() => {
  return {
    responsive: true,
    indexAxis: 'y',
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };
});

const onClick = (category: Category) => {
  emit('select', category.name);
  return false;
};
</script>

<template>
  <div class="hidden">
    <Bar :data="data" :options="options" />
  </div>
  <ul class="flex flex-col w-full list-none my-2">
    <li v-for="(c, i) in categories" :key="i" class="flex items">
      <a href="#" class="flex flex-row w-full block mb-1" @click.prevent="onClick(c)">
        <div class="text-xs text-end me-1 text-gray-500 hover:text-cyan-700 content-center" style="width: 300px">
          {{ c.name }}
        </div>
        <div class="flex justify-start w-full">
          <div
            class="bg-cyan-700 hover:bg-cyan-600 text-white text-xs text-center align-baseline p-0.5 rounded-full"
            :style="{ width: c.percentage + '%' }"
          >
            {{ c.count }}
          </div>
        </div>
      </a>
    </li>
  </ul>
</template>
