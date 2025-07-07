<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
} from "chart.js";
import type { Chart } from "chart.js";
import { getChartData, chartOptions } from "../components/chartConfig";

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

const totalContent = ref(0);
const totalUsers = ref(0);
const totalCategories = ref(0);

let contentInterval: ReturnType<typeof setInterval> | null = null;
let userInterval: ReturnType<typeof setInterval> | null = null;
let categoryInterval: ReturnType<typeof setInterval> | null = null;

const fetchTotalContents = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    const res = await axios.get(
      `http://localhost:3333/api/admin/total-content`,
      {
        headers: { Authorization: token },
      }
    );
    totalContent.value = res.data.totalContents;
  } catch (err) {
    console.error("Fetch content error:", err);
  }
};

const fetchTotalUsers = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    const res = await axios.get(`http://localhost:3333/api/admin/total-users`, {
      headers: { Authorization: token },
    });
    totalUsers.value = res.data.totalUsers;
  } catch (err) {
    console.error("Fetch users error:", err);
  }
};

const fetchTotalCategories = async () => {
  try {
    const token = localStorage.getItem("Authorization");
    const res = await axios.get(
      `http://localhost:3333/api/admin/total-categories`,
      {
        headers: { Authorization: token },
      }
    );
    totalCategories.value = res.data.totalCategories;
  } catch (err) {
    console.error("Fetch categories error:", err);
  }
};

const renderChart = () => {
  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartCanvas.value?.getContext("2d");
  if (!ctx) return;

  chartInstance = new ChartJS(ctx, {
    type: "doughnut",
    data: getChartData(totalUsers.value, totalContent.value),
    options: chartOptions,
  });
};

onMounted(() => {
  void fetchTotalContents();
  void fetchTotalUsers();
  void fetchTotalCategories();

  contentInterval = setInterval(() => void fetchTotalContents(), 10000);
  userInterval = setInterval(() => void fetchTotalUsers(), 10000);
  categoryInterval = setInterval(() => void fetchTotalCategories(), 10000);

  watch([totalUsers, totalContent], () => {
    renderChart();
  });

  renderChart();
});

onUnmounted(() => {
  if (contentInterval) clearInterval(contentInterval);
  if (userInterval) clearInterval(userInterval);
  if (categoryInterval) clearInterval(categoryInterval);
  if (chartInstance) chartInstance.destroy();
});
</script>

<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4">
        <q-card class="bg-primary text-white q-pa-sm" flat bordered>
          <q-card-section class="text-center">
            <div class="text-h6">Total Users</div>
            <div class="text-h4 q-mt-sm">{{ totalUsers }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-card class="bg-secondary text-white q-pa-sm" flat bordered>
          <q-card-section class="text-center">
            <div class="text-h6">Total Contents</div>
            <div class="text-h4 q-mt-sm">{{ totalContent }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-card class="bg-accent text-white q-pa-sm" flat bordered>
          <q-card-section class="text-center">
            <div class="text-h6">Total Categories</div>
            <div class="text-h4 q-mt-sm">{{ totalCategories }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-mt-xl">
      <q-card
        flat
        bordered
        class="q-pa-md"
        style="max-width: 600px; margin: auto"
      >
        <q-card-section class="text-center">
          <div class="text-h6 q-mb-md">Users vs Contents</div>
          <div style="height: 300px">
            <canvas ref="chartCanvas"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
