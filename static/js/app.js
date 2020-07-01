
function buildPlots() {
  
    d3.json("data/samples.json").then(function(data) {

    result = [];
    for (var i = 0; i < data.otu_ids.length; i++) {
        result.push({"otu_ids": data.otu_ids[i], "otu_labels": data.otu_labels[i], "sample_values": data.sample_values[i]});
      };

      result.sort((a, b) => b.sample_values - a.sample_values);
      result = result.slice(0, 10);
      console.log(result);
  
      var trace1 = {
        x: result.map(row => row.otu_ids),
        y: result.map(row => row.sample_values),
         // Use otu_ids for the marker colors.
        marker: result.map(row => row.otu_ids),
        // Use sample_values for the marker size.
        name: "Bar Chart",
        hovertext: result.map(row => row.otu_labels),
        type: "bar",
      };

      var barChart = [trace1];

      Plotly.newPlot("bar", barChart);
    
    });
}

    buildPlots();


    