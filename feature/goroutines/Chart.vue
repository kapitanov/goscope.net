<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps({
  data: { type: Object, default: null }
});

interface Category {
  name: string;
  count: number;
}

const data = computed(() => {
  const categoriesByState = new Map<string, Category>();
  const categories = [] as Category[];

  if (props.data) {
    for (const goroutine of props.data.items) {
      const state = goroutine.state;
      if (!categoriesByState.has(state)) {
        const c = { name: state, count: 0 } as Category;
        categoriesByState.set(state, c);
        categories.push(c);
      }

      categoriesByState.get(state)!.count++;
    }
  }

  categories.sort((a, b) => b.count - a.count);

  const labels = categories.map((c) => c.name);
  const data = categories.map((c) => c.count);

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
</script>

<template>
  <div>
    <Bar :data="data" :options="options" />
  </div>
</template>
