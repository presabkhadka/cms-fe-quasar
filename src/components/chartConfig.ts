export function getChartData(users: number, contents: number) {
  return {
    labels: ["Users", "Contents"],
    datasets: [
      {
        backgroundColor: ["#41B883", "#E46651"],
        data: [users, contents],
      },
    ],
  };
}

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};
