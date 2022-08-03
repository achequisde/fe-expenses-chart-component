"use strict";

async function getDataFromJSON() {
    let file = await fetch('./data.json');
    let data = await file.json();

    return data;
}

async function createBarChart() {
    let spendingByDay = await getDataFromJSON();

    let currentDay = new Date().toDateString().split(' ')[0].toLowerCase();

    let currentDayColor = 'hsl(186, 34%, 60%)';  // Cyan
    let dayColor        = 'hsl(10,  79%, 65%)';  // Red

    let chartDiv = document.querySelector('.spending__chart');

    for (let entry of spendingByDay) {
        let newBar = createBar(entry.day, entry.amount);

        newBar.children[1].style.backgroundColor = entry.day == currentDay
            ? currentDayColor
            : dayColor;

        chartDiv.appendChild(newBar);
    }
}

function createBar(day, amount) {
    let containerDiv = document.createElement('div');

    let tooltipDiv   = document.createElement('div');
    let barDiv       = document.createElement('div');
    let labelDiv     = document.createElement('div');

    tooltipDiv.textContent = '$' + amount;
    labelDiv.textContent   = day;

    tooltipDiv.style.bottom = amount * 2.5 + 15 + 'px';

    barDiv.style.height = amount * 2.5 + 'px';
    barDiv.style.width  = '30px';

    containerDiv.classList.add('spending__chart__bar');

    tooltipDiv.classList.add('spending__chart__bar__tooltip');
    barDiv.classList.add('spending__chart__bar__amount');
    labelDiv.classList.add('spending__chart__bar__label');

    containerDiv.append(tooltipDiv, barDiv, labelDiv);

    return containerDiv;
}

createBarChart();
