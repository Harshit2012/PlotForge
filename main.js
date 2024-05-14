var currentChart;

alert("Create graph using it!")

function populateDropdown() {
    var select = document.getElementById('numInputs');
    for (var i = 5; i <= 50; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.text = i;
        select.appendChild(option);
    }
}

populateDropdown();

function updateInputs() {
    var numberOfInputs = document.getElementById('numInputs').value;
    var container = document.getElementById('inputsContainer');
    container.innerHTML = '';
    for (var i = 1; i <= numberOfInputs; i++) {
        var input = document.createElement('input');
        input.type = 'number';
        input.className = 'data_inpt'
        input.id = 'data' + i;
        input.placeholder = 'Data Point ' + i;
        container.appendChild(input);
    }
}

function colorFromValue(ctx) {
    if (ctx.type !== 'data') {
        return 'transparent';
    }
    const value = ctx.raw.v;
    const alpha = (1 + Math.log(value)) / 5;
    return Chart.helpers.color('green').alpha(alpha).rgbString();
}

function colorFromValue(ctx) {
    if (ctx.type !== 'data') {
        return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    const color = 'green';
    return Chart.helpers.color(color).alpha(alpha).rgbString();
}

function createGraph(graphType) {
    var data = [];
    var numberOfInputs = document.getElementById('numInputs').value || 5;

    for (var i = 1; i <= numberOfInputs; i++) {
        var input = document.getElementById('data' + i);
        if (input && input.value) {
            data.push(parseFloat(input.value));
        }
    }

    var chartType = graphType === 'area' ? 'line' : graphType;

    var config = {
        type: chartType,
        data: {
            labels: data.map((_, index) => 'Data ' + (index + 1)),
            datasets: [{
                label: 'Dataset',
                data: data,
                backgroundColor: graphType === 'area' ? 'rgba(0, 123, 255, 0.5)' : 'rgba(0, 123, 255, 0)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
                fill: graphType === 'area'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    var ctx = document.getElementById('myChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    currentChart = new Chart(ctx, config);
}

document.getElementById('createBarGraph').addEventListener('click', function () {
    createGraph('bar');
});
document.getElementById('createLineGraph').addEventListener('click', function () {
    createGraph('line');
});
document.getElementById('createPieGraph').addEventListener('click', function () {
    createGraph('pie');
});
document.getElementById('createAreaGraph').addEventListener('click', function () {
    createGraph('area');
});
document.getElementById('createTreeMap').addEventListener('click', function () {
    createGraph('treemap');
});
document.getElementById('createRadarChart').addEventListener('click', function () {
    createGraph('radar');
});

function clearGraph() {
    if (currentChart) {
        currentChart.destroy();
    }
    var canvas = document.getElementById('myChart');
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById('clearGraph').addEventListener('click', clearGraph);
document.getElementById('numInputs').addEventListener('change', updateInputs);

document.getElementById('downloadGraph').addEventListener('click', function () {
    var canvas = document.getElementById('myChart');
    var imageURL = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    var tempLink = document.createElement('a');
    tempLink.href = imageURL;
    tempLink.download = 'PlotGraph-Graph.png';
    tempLink.click();
});

function home() {
    window.location = "index.html";
}
