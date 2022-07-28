const request = new XMLHttpRequest();

request.open('GET', './data.json', true);

request.onreadystatechange = function () {
    if (request.readyState == XMLHttpRequest.DONE) {
        if (request.status === 200) {
            const data = JSON.parse(request.responseText);
            main(data);
        }
    }
}

request.send();

// jsonData is an array of objects of the form:
//
// object = {
//     day: String,
//     amount: Int,
// }

function main(jsonData) {
    let labels = jsonData.map(elem => elem.day);
    let data   = jsonData.map(elem => elem.amount);

    let softRed = 'hsl(10, 79%, 65%)';
    let cyan = 'hsl(186, 34%, 60%)';

    const ctx = document.getElementById('spending__chart__bars').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: '',
                data,
                backgroundColor: [
                    softRed,
                    softRed,
                    cyan,
                    softRed,
                    softRed,
                    softRed,
                    softRed,
                ],
                borderRadius: 5,
                borderSkipped: false,
                barPercentage: 1.2,
                categoryPercentage: 0.65,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                    ticks: {
                        font: {
                            family: 'DM Sans',
                        }
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false,
                    }
                }
            }
        }
    });
}