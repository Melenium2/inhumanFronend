export default {
    userChart: {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: false },
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: (tooltipItem, data)  => {
                        let label = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString() || ''
                        if (tooltipItem.datasetIndex == 0) return `Requests: ${label}`
                        return `Points: ${label}`
                    }
                }
            },
            hover: {
                mode: 'index',
                intersect: true
            },
            scales: {
                yAxes: [
                    {
                        id: 'y',
                        type: 'linear',
                        position: 'left',
                        ticks: {
                            fontColor: "#8094ae",
                        }
                    },
                    {
                        id: 'y1',
                        type: 'linear',
                        position: 'right',
                        ticks: {
                            fontColor: "#8094ae",
                        }
                    }
                ],
                xAxes: [{
                    ticks: {
                        fontColor: "#8094ae"
                    }
                }]
            },
        }
    }
}