//Use d3.json() to read the data from samples.json
//The data will be named rawData
d3.json("samples.json").then((rawData) => {
// console.log(rawData)

let data = rawData;

let nameID = data.names;

// console.log(nameID);

nameID.forEach((member) => {
// console.log(member)

let section = d3.select("#selDataset");

section.append("option").text(member);
})

//first plot ID 940
function init() {

let filteredID = data.samples.filter(name => name.id === "940")[0];
// console.log(filteredID);

let sampleValues = filteredID.sample_values;
// console.log(sampleValues);

let otuIDs = filteredID.otu_ids;
// console.log(otuIDs);

let otuLabels = filteredID.otu_labels;
// console.log(otuLabels);

let top10SampleValues = sampleValues.slice(0, 10).reverse();
// console.log(top10SampleValues);

let top10OtuIDs = otuIDs.slice(0, 10).reverse();
// console.log(top10OtuIDs);

let top10OtuLabels = otuLabels.slice(0, 10).reverse();
// console.log(top10OtuLabels);

//horizontal bar graph
trace = {
x: top10SampleValues,
y: top10OtuIDs.map(id => `OTU ${id}`),
text: top10OtuLabels,
type: "bar",
orientation: "h"
}

let traceData = [trace]

let layout = {
title: "Top 10 Microbial Species",
yaxis: { title: "OTU ID" },
xaxis: { title: "Sample Value" },
margin: {
l: 100,
r: 100,
t: 100,
b: 100
}
}

Plotly.newPlot("bar", traceData, layout);

//Bubble graph
let trace2 = {
x: otuIDs,
y: sampleValues,
text: otuLabels,
mode: 'markers',
marker: {
color: otuIDs,
size: sampleValues
}
};

var trace2Data = [trace2];

var layout2 = {
showlegend: false,
height: 600,
width: 1200,
xaxis: { title: "OTU ID" },
yaxis: {title: "Sample Value"},
title: "Microbial Species Found In Each Sample"
};

Plotly.newPlot('bubble', trace2Data, layout2);

//demographic info ID 940
let filterMetadata = data.metadata[0]
// console.log(filterMetadata);

// Use `Object.entries` to add each key and value pair
Object.entries(filterMetadata).forEach(([key, value]) => {

d3.select("#sample-metadata")
.append("p")
.text(`${key}:${value}`)
})

// updatePlotly() runs when there is a change on DOM
d3.selectAll("#selDataset").on("change", optionChanged);

//dropdown menu item is selected
function optionChanged() {

let dropdownMenu = d3.select("#selDataset");
// console.log(dropdownMenu)

//dropdown menu value option to a variable
let dataset = dropdownMenu.node().value;
// console.log(dataset)

let filteredID = data.samples.filter(name => name.id === dataset)[0];
// console.log(filteredID);

let sampleValues = filteredID.sample_values;
// console.log(sampleValues);

let otuIDs = filteredID.otu_ids;
// console.log(otuIDs);

let otuLabels = filteredID.otu_labels;
// console.log(otuLabels);

let top10SampleValues = sampleValues.slice(0, 10).reverse();
// console.log(top10SampleValues);

let top10OtuIDs = otuIDs.slice(0, 10).reverse();
// console.log(top10OtuIDs);

let top10OtuLabels = otuLabels.slice(0, 10).reverse();
// console.log(top10OtuLabels);

//bar graph restyle
Plotly.restyle("bar", "x", [top10SampleValues]);
Plotly.restyle("bar", "y", [top10OtuIDs.map(id => `OTU ${id}`)]);
Plotly.restyle("bar", "text", [top10OtuLabels]);

//Restyle the bubble graph
Plotly.restyle("bubble", "x", [otuIDs]);
Plotly.restyle("bubble", "y", [sampleValues]);
Plotly.restyle("bubble", "text", [otuLabels]);
Plotly.restyle("bubble", "marker.color", [otuIDs]);
Plotly.restyle("bubble", "marker.size", [sampleValues]);


let filterMetadata = data.metadata.filter(name => name.id == dataset)[0];
// console.log(filterMetadata);

//clear any existing metadata
d3.select("#sample-metadata").html("");

// Use `Object.entries` to add each key and value pair to the panel
Object.entries(filterMetadata).forEach(([key, value]) => {
// console.log(`${key}: ${value}`);
d3.select("#sample-metadata")
.append("p")
.text(`${key}:${value}`)
})

