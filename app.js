function buildPlots(id){
    d3.json("samples.json").then((importedData) => {
    // console.log(importedData);
    var topValues = importedData.samples[0].sample_values.slice(0,10).reverse();
    // console.log(topValues);
    var otuLabels = importedData.samples[0].otu_labels.slice(0,10);
    //console.log(otuLabels);

    var otu_id = (importedData.samples[0].otu_ids.slice(0,10)).reverse().map(number => "Otu " + number);;
  
  //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    var trace1 = {
      x: topValues,
      y: otu_id,
      text: otuLabels,
      type: "bar",
      orientation: "h",
      };

      var barData = [trace1];
    
    Plotly.newPlot("bar", barData);
    
  //Create a bubble chart that displays each sample.
      var trace2 = {
        x:importedData.samples[0].otu_ids,
        y: importedData.samples[0].sample_values,
        mode: "markers",
        marker: {
          size: importedData.samples[0].sample_values,
          color: importedData.samples[0].otu_ids,
        }
      }

      var bubbledata = [trace2];

    Plotly.newPlot("bubble", bubbledata);
 });
}

//Display the sample metadata, i.e., an individual's demographic information.
function Demographics(id) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;

    var result = metadata.filter(metadata => metadata.id.toString()=== id)[0];
    var demographicInfo = d3.select("#sample-metadata").html("");
    
    Object.entries(result).forEach((key) => {
      demographicInfo.append("h5").text(`${key[0]}:${key[1]}`);
    });
  });
}

function init() {
  var dropdownmenu = d3.select("#selDataset");
  d3.json("samples.json").then((data)=> {
    data.names.forEach(function(name){
      dropdownmenu.append("option").text(name).property("value");
    });

    buildPlots(data.names[0]);
    Demographics(data.names[0]);
  });
}

//Update all of the plots any time that a new sample is selected.
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildPlots(newSample);
    Demographics(newSample);
  }

init();
