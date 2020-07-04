  function buildCharts(sample) {
  
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    const sampleDataURL = "/samples/" + sample;
    d3.json(sampleDataURL).then(function(data) {
  
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
      
      // Combine the 3 arrays in "data" into one in order to sort and slice
      result = [];
      for (var i = 0; i < data.otu_ids.length; i++) {
        result.push({"otu_ids": data.otu_ids[i], "otu_labels": data.otu_labels[i], "sample_values": data.sample_values[i]});
      };
      result.sort((a, b) => b.sample_values - a.sample_values);
      result = result.slice(0, 10);
      console.log(result);
  

  
    
      // @TODO: Build a Bubble Chart using the sample data
      var trace2 = {
        x: data.otu_ids,
        y: data.sample_values,
        type: "scatter",
        mode: "markers",
        marker: {
          size: data.sample_values,
          color: data.otu_ids
        },
        text: data.otu_labels
      };
      var bubbleChart = [trace2];
      Plotly.newPlot("bubble", bubbleChart);
  
      // BONUS: Build the Gauge Chart
      const washDataURL = "/wfreq/" + sample;
      d3.json(washDataURL).then(function(data){
        buildGauge(data.WFREQ);
      });
  
    });
  }
  
  
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();


// function buildPlots() {
  
//     //d3.json("data/samples.json").then(function(data) {
//     const sampleDataURL = "/samples/" + sample;
//      d3.json(sampleDataURL).then(function(data) {
      
//     result = [];
//     for (var i = 0; i < data.otu_ids.length; i++) {
//         result.push({"otu_ids": data.otu_ids[i], "otu_labels": data.otu_labels[i], "sample_values": data.sample_values[i]});
//       };

//       result.sort((a, b) => b.sample_values - a.sample_values);
//       result = result.slice(0, 10);
//       console.log(result);
  
//       var trace1 = {
//         x: result.map(row => row.otu_ids),
//         y: result.map(row => row.sample_values),
//          // Use otu_ids for the marker colors.
//         //marker: result.map(row => row.otu_ids),
//         // Use sample_values for the marker size.
//         name: "Bar Chart",
//         hovertext: result.map(row => row.otu_labels),
//         type: "bar",
//       };

//       var barChart = [trace1];

//       Plotly.newPlot("bar", barChart);
    
//         });
//     }

//     buildPlots();



//     function buildMetadata(sample) {

//         const metadataURL = "/metadata/" + sample;
//         d3.json(metadataURL).then(function(data) {
      

//           metadataPanel = d3.select("#sample-metadata");
            
//           metadataPanel.html("");
          
//           Object.entries(data).forEach(([key, value]) => {
//                 var cell = metadataPanel.append("p");
//                 cell.text(key + ": " + value);
//           });
//         });
//       }
      




    