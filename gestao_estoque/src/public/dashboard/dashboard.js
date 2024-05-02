/* globals Chart:false */

(() => {
  'use strict'

  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'FITA HELLERMAN 140X2,5mm',
        'FITA HELLERMAN 151X3,7mm',
        'FITA HELLERMAN 238X4,8mm',
        'FITA HELLERMAN 400X4,8mm',
        'ABRAÇADEIRA METÁLICA DE 10 mm',
        'FITA HELLERMAN 104,7X2,2mm',
        'CONTROLADOR SPARK MAX',
      ],
      datasets: [{
        data: [
          100,
          100,
          100,
          100,
          1,
          100,
          9
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 3
        }
      }
    }
  })

  const goToPage = document.getElementById('goToPage');

  goToPage.addEventListener('click', () => {
    window.location.href = 'dashboard.html';
  });
})()
