function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
    // DELIVERABLE 1

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var sampleArray = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var dataArray = sampleArray.filter(sampleObj => sampleObj.id == sample);

      // D3 - 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var secondData = data.metadata
    var gaugeArray = secondData.filter(metaObj => metaObj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = dataArray[0];
  
     // D3 - 2. Create a variable that holds the first sample in the metadata array.
     var firstGauge = gaugeArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = firstSample.otu_ids;
    var otuLabels = firstSample.otu_labels;
    var sampleValues = firstSample.sample_values;

     // D3 - 3. Create a variable that holds the washing frequency.
    var wash = parseFloat(firstGauge.wfreq).toFixed(2);
    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var yticks = otuIds.map(ids => "OTU " + ids).slice(0,10).reverse();
  
    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: "bar", 
      orientation: "h",
      marker: {color: "rgb(255, 102, 102)"}
    }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: {
        text: "<b>Top 10 Bacteria Cultures Found</b>",
        font: {size: 22}
      },
      width: 1150,
      height: 500,
      paper_bgcolor: "lightgrey",
      plot_bgcolor: "lightgrey"
    };

    var config = {responsive: true
    }
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout, config);

        // DELIVERABLE 2

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      }
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: {
        text: "<b>Bacteria Cultures Per Sample</b>", 
        font: {size: 22}
      },
      xaxis: {
        title: "OTU ID"},
      hovermode: "closest",
      width: 1150,
      height: 500,
      paper_bgcolor: "#b3b3b3",
      plot_bgcolor: "#b3b3b3"
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

      // DELIVERABLE 3

    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      type: "indicator",
      mode: "gauge+number",
      value: wash,
      gauge: {
        axis: {range: [null, 10], tickwidth: 1, tickcolor: "black"},
        bar: {color: "black"},
        bordercolor: "black",
        steps: [
          {range: [0, 2], color: "red"},
          {range: [2, 4], color: "orange"},
          {range: [4, 6], color: "yellow"},
          {range: [6, 8], color: "limegreen"},
          {range: [8, 10], color: "green"}
        ],
        dtick: wash
      }
    }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = {
      title: {
        text: "<b>Belly Button Washing Frequency</b> <br>Scrubs per Week",
        font: {size: 22}},
      width: 1150,
      height: 400,
      paper_bgcolor: "grey",
      plot_bgcolor: "grey"
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout)
  });
};