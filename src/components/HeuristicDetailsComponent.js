import React, { Component, useState, useLayoutEffect  } from 'react';
import { Form, FormGroup, Col, Label, Input,Button, Card, CardTitle, CardBody, CardText, CardImg, Row} from 'reactstrap';
import { LocalForm, Control} from 'react-redux-form';
import {baseUrl} from '../shared/baseUrl';
import ReactStars from "react-rating-stars-component";
import Header from './HeaderComponent';
import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import { Loading } from './LoadingComponent';
import * as am4core from "@amcharts/amcharts4/core";    
import * as am4charts from "@amcharts/amcharts4/charts";    
import am4themes_animated from "@amcharts/amcharts4/themes/animated"; 




/** Please read first the explanation under HeuristicDetails */
function RenderDetailItem({item, type, id}){
    /**Since there are different kind of visualities with respect to heuristic properties,
     * there are different kind of rendering. To do the right rendering, the type variable is used.
     * 
     */
    if (type=== 'dimension'){
        return( 
            <Card className='heuristicDetailsCard align-items-center'>
                <Row className='heuristicDetailsCardBody'>
                    <Col md={6}>
                        <CardImg src= {`${baseUrl}assets/${item.replace(/ /g,'')}.jpg`} className='heuristicDetailsCardImage'/>
                    </Col>
                    <Col md={6}>
                        <CardTitle style={{display: "flex", justifyContent:'center', alignItems:'center', color: "black"}}> <h3><strong>{item}</strong></h3> </CardTitle>                
                    </Col>
                </Row>
            </Card>
        )
    }
    if (type==='positive'){
        return(
            <Card className='justify-content-center' style={{backgroundColor:'#BAEDAD', height: "50px", width: "auto"}}>
                <CardBody >
                    {item}
                </CardBody>
            </Card>
        )
    }
    if (type==='negative'){
        return(
            <Card className='justify-content-center' style={{backgroundColor:'#F7BCB0', height: "50px", width: "auto"}}>
                <CardBody >
                    {item}
                </CardBody>
            </Card>
        )  
    } 
    if (type==='image'){
        return(
            <CardImg className='align-items-center' src={`${baseUrl}assets/${id}/${item}`}>

            </CardImg>
        )  
    }
    if (type==='source'){
        return(
            <div>

                {item}
            </div>
        )  
    } 
    if (type==='comment'){
        return(
            <Card>
                <CardBody className='m-1 align-items-center' >
                    <strong>{item.author.username}</strong>
                    <CardText>
                        {item.comment}
                    </CardText>
                </CardBody>
            </Card>
        )  
    } 
    else
        return(
            <Card className='justify-content-center' style={{ height: "50px", width: "auto"}}>
                <CardBody >
                    {item}
                </CardBody>
            </Card>
        )
    
}





class HeuristicDetails extends Component{   

    constructor(props){
        super (props);
        this.state = {
            didMount: false
        }

        this.sendComment=this.sendComment.bind(this);
    }
    componentDidMount(){
        this.setState({
            didMount: true
        }
        )


    
 // Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create the radar chart
var chart = am4core.create("chartdiv", am4charts.RadarChart);

// Chart properties
chart.innerRadius = am4core.percent(10);
chart.fontSize = 12;
chart.startAngle= -90;
chart.endAngle = 80 +100;
chart.responsive.enabled = true;


// Create x and y axes for different series
var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
var xAxis2 = chart.xAxes.push(new am4charts.CategoryAxis());
var xAxis3 = chart.xAxes.push(new am4charts.CategoryAxis());

// Define data fields for axes
yAxis.dataFields.category = "title";
xAxis.dataFields.category = "positivelcpeffectCategorySpecification";
xAxis2.dataFields.category = "positivelcppeffectCategorySpecification";
xAxis3.dataFields.category = "positivetecheffectCategorySpecification";



// Customize axis labels and appearance
xAxis.renderer.labels.template.location = 0.5;
xAxis.renderer.labels.template.bent = false;
xAxis.renderer.labels.template.radius = 5; 

// Axis 2 (series2)
xAxis2.renderer.labels.template.location = 0.5;
xAxis2.renderer.labels.template.bent = false;
xAxis2.renderer.labels.template.radius = 5;

// Axis 3 (series3)
xAxis3.renderer.labels.template.location = 0.5;
xAxis3.renderer.labels.template.bent = false;
xAxis3.renderer.labels.template.radius = 5;

// Customize y-axis labels
var categoryAxisRenderer = xAxis.renderer;
var categoryAxisLabel = categoryAxisRenderer.labels.template;
categoryAxisLabel.location = 0.5;
categoryAxisLabel.relativeRotation = 90;
categoryAxisLabel.truncate = true; // Ensure that labels are not truncated
categoryAxisLabel.wrap = true; // Enable wrapping of long labels
categoryAxisLabel.tooltipText = "{positivelcpeffectCategorySpecification2} {children}"
categoryAxisLabel.maxWidth=150;
categoryAxisRenderer.grid.template.location=0;
categoryAxisRenderer.minGridDistance = 10;
categoryAxisRenderer.grid.template.radius = -25;
categoryAxisRenderer.grid.template.strokeOpacity = 1;

// Customize y-axis labels for Axis 2
var categoryAxisRenderer2 = xAxis2.renderer;
var categoryAxisLabel2 = categoryAxisRenderer2.labels.template;
categoryAxisLabel2.location = 0.5;
categoryAxisLabel2.relativeRotation = 90;
categoryAxisLabel2.truncate = true;
categoryAxisLabel2.wrap = true; // Enable wrapping of long labels
categoryAxisLabel2.tooltipText = "{positivelcppeffectCategorySpecification2} {children}"
categoryAxisRenderer2.grid.template.location=0;
categoryAxisRenderer2.minGridDistance = 10;
categoryAxisRenderer2.grid.template.radius = -25;
categoryAxisRenderer2.grid.template.strokeOpacity = 1;



// Customize y-axis labels for Axis 3
var categoryAxisRenderer3 = xAxis3.renderer;
var categoryAxisLabel3 = categoryAxisRenderer3.labels.template;
categoryAxisLabel3.location = 0.5;
categoryAxisLabel3.relativeRotation = 90;
categoryAxisLabel3.truncate = true; 
categoryAxisLabel3.wrap = true;
categoryAxisLabel3.maxWidth=50;
categoryAxisLabel3.tooltipText = "{positivetecheffectCategorySpecification2} {children}"
categoryAxisRenderer3.grid.template.location=0;
categoryAxisRenderer3.minGridDistance = 10;
categoryAxisRenderer3.grid.template.radius = -25;
categoryAxisRenderer3.grid.template.strokeOpacity = 1;

// Customize y-axis properties
yAxis.renderer.grid.template.location = 0;
yAxis.renderer.inversed = true;
yAxis.renderer.grid.template.strokeOpacity = 1;
yAxis.renderer.minGridDistance = 20;
var label = yAxis.renderer.labels.template;
label.truncate = true;
label.maxWidth = 300;
label.dx = -150;
label.tooltipText = "{title}"
label.paddingRight = 8;





//Data Manipulation and Filtering
var similarHeuristics = this.props.heuristics.heuristics.filter(heuristic =>heuristic.embodimentAtrribute === this.props.selectedHeuristic.embodimentAtrribute &&
heuristic.embodimentArtefact === this.props.selectedHeuristic.embodimentArtefact);
var LifeCyclePhaseProperties = "Life Cycle Phase Property"; 
var LifeCycleProperties = "Life Cycle Property"
var TechnicalProperties = "Technical Property"
var neu = this.props.heuristics.heuristics

var flattenedArray2 = neu.flatMap(function(item) {
  var effects2 = [];


  // Flattening positiveEffects with filtering
  effects2.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCyclePhaseProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }
   

        return {
          title2: item.title,
          positivelcppeffectCategory2: effect.effectCategory,
          positivelcppeffectCategorySpecification2: firstPart,
          value: 1,
          children: [extra],
          
        };
      })
  );
  effects2.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === TechnicalProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          positivetecheffectCategory2: effect.effectCategory,
          positivetecheffectCategorySpecification2: firstPart,
          value: 1,
          children: [extra]
        };
      })
  );

  effects2.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCycleProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          positivelcpeffectCategory2: effect.effectCategory,
          positivelcpeffectCategorySpecification2: firstPart,
          value: 1,
          children: [extra]
        };
      })
  );

// Flattening negativeEffects with filtering
effects2.push(
  ...item.negativeEffects
    .filter(function(effect) {
      return effect.effectCategory === LifeCyclePhaseProperties;
    })
    .map(function(effect) {
      var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
      var firstPart, extra;

      if (indexOfDuring >= 0) {
        firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
        extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
      } else {
        firstPart = effect.effectCategorySpecification;
        extra = "";
      }

      return {
        title2: item.title,
        negeffectCategory2: effect.effectCategory,
        positivelcppeffectCategorySpecification2: firstPart,
        value: 2,
        children: [extra]
      };
    })
);


effects2.push(
    ...item.negativeEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCycleProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          negeffectCategory2: effect.effectCategory,
          positivelcppeffectCategorySpecification2: firstPart,
          value: 2,
          children: [extra]
      
        };
      })
  );

  effects2.push(
    ...item.negativeEffects
      .filter(function(effect) {
        return effect.effectCategory === TechnicalProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          negeffectCategory2: effect.effectCategory,
          positivetecheffectCategorySpecification2: firstPart,
          value: 2,
          children: [extra]
          
        };
      })
  );
  return effects2;
});

var flattenedArray = similarHeuristics.flatMap(function(item) {
  var effects = [];

  // Flattening positiveEffects with filtering
  effects.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCyclePhaseProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title: item.title,
          positivelcppeffectCategory: effect.effectCategory,
          positivelcppeffectCategorySpecification: firstPart,
          value: 1,
          children: [extra]
        
        };
      })
  );

  effects.push(
      ...item.positiveEffects
        .filter(function(effect) {
          return effect.effectCategory === TechnicalProperties;
        })
        .map(function(effect) {
          var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
          var firstPart, extra;
  
          if (indexOfDuring >= 0) {
            firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
            extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
          } else {
            firstPart = effect.effectCategorySpecification;
            extra = "";
          }
  
          return {
            title: item.title,
            positivetecheffectCategory: effect.effectCategory,
            positivetecheffectCategorySpecification: firstPart,
            value: 1,
            children: [extra]
          };
        })
    );

    effects.push(
      ...item.positiveEffects
        .filter(function(effect) {
          return effect.effectCategory === LifeCycleProperties;
        })
        .map(function(effect) {
          var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
          var firstPart, extra;
  
          if (indexOfDuring >= 0) {
            firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
            extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
          } else {
            firstPart = effect.effectCategorySpecification;
            extra = "";
          }
  
          return {
            title: item.title,
            positivelcpeffectCategory: effect.effectCategory,
            positivelcpeffectCategorySpecification: firstPart,
            value: 1,
            children: [extra]
          };
        })
    );

  // Flattening negativeEffects with filtering
  effects.push(
    ...item.negativeEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCyclePhaseProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title: item.title,
          negeffectCategory: effect.effectCategory,
          positivelcppeffectCategorySpecification: firstPart,
          value: 2,
          children: [extra]
        };
      })
  );


  effects.push(
      ...item.negativeEffects
        .filter(function(effect) {
          return effect.effectCategory === LifeCycleProperties;
        })
        .map(function(effect) {
          var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
          var firstPart, extra;
  
          if (indexOfDuring >= 0) {
            firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
            extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
          } else {
            firstPart = effect.effectCategorySpecification;
            extra = "";
          }
  
          return {
            title: item.title,
            negeffectCategory: effect.effectCategory,
            positivelcppeffectCategorySpecification: firstPart,
            value: 2,
            children: [extra]
        
          };
        })
    );

    effects.push(
      ...item.negativeEffects
        .filter(function(effect) {
          return effect.effectCategory === TechnicalProperties;
        })
        .map(function(effect) {
          var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
          var firstPart, extra;
  
          if (indexOfDuring >= 0) {
            firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
            extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
          } else {
            firstPart = effect.effectCategorySpecification;
            extra = "";
          }
  
          return {
            title: item.title,
            negeffectCategory: effect.effectCategory,
            positivetecheffectCategorySpecification: firstPart,
            value: 2,
            children: [extra]
          };
        })
    );
    return effects;
  });

  var mergedArray = flattenedArray.concat(flattenedArray2);

//Assign the chart the data
chart.data = mergedArray



//Legend
 chart.legend = new am4charts.Legend();
 chart.legend.position = "right";


 var selectedSeries = "series1";

//Series1
var series1 = chart.series.push(new am4charts.RadarColumnSeries());
series1.dataFields.categoryX = "positivelcpeffectCategorySpecification";
series1.dataFields.categoryY = "title";
series1.dataFields.value = "value";
series1.xAxis = xAxis;
series1.sequencedInterpolation = true;
series1.columns.template.propertyFields.fill = "color"; // Specify the fill color property field
series1.noDataColor = am4core.color("#0000FF"); // Blue color
series1.tooltip.background.fill = am4core.color("#FF0000")
series1.name = "Life Cycle Properties"

var columnTemplate1 = series1.columns.template;
columnTemplate1.strokeWidth = 0.5;
columnTemplate1.strokeOpacity = 0.5;
columnTemplate1.stroke = am4core.color("#000000");
columnTemplate1.fill= am4core.color("#FFFFFF"); 
columnTemplate1.tooltipText = "Design Heuristic: {title} \n Effect: {positivelcpeffectCategorySpecification}  {children}"
columnTemplate1.width = am4core.percent(100);
columnTemplate1.height = am4core.percent(100);
chart.seriesContainer.zIndex = -5;
columnTemplate1.hiddenState.properties.opacity = 0;


series1.heatRules.push({  target: columnTemplate1, property: "fill",  min:am4core.color("#A8E4A0"), 
max:am4core.color("#f69697"),
minValue: 1,
maxValue: 2 });


//Series2
var series2 = chart.series.push(new am4charts.RadarColumnSeries());
series2.dataFields.categoryX = "positivelcppeffectCategorySpecification";
series2.dataFields.categoryY = "title";
series2.dataFields.value = "value";
series2.sequencedInterpolation = true;
series2.xAxis = xAxis2;
series2.columns.template.propertyFields.fill = "color"; // Specify the fill color property field
series2.name = "Life Cycle Phase Properties"

var columnTemplate2 = series2.columns.template;
columnTemplate2.strokeWidth = 0.5;
columnTemplate2.strokeOpacity = 0.5;
columnTemplate2.stroke = am4core.color("#000000");
columnTemplate2.tooltipText =  "Design Heuristic: {title} \n Effect: {positivelcppeffectCategorySpecification}  {children}"
columnTemplate2.tooltipTemplate= 100
columnTemplate2.width = am4core.percent(100);
columnTemplate2.height = am4core.percent(100);
columnTemplate2.fill= am4core.color("#FFFFFF"); 
chart.seriesContainer.zIndex = -5;
columnTemplate2.hiddenState.properties.opacity = 0;


series2.heatRules.push({  target: columnTemplate2, property: "fill",  min:am4core.color("#A8E4A0"), 
max:am4core.color("#f69697"),
minValue: 1,
maxValue: 2 });


//Series3
var series3 = chart.series.push(new am4charts.RadarColumnSeries());
series3.dataFields.categoryX = "positivetecheffectCategorySpecification";
series3.dataFields.categoryY = "title";
series3.dataFields.value = "value";
series3.sequencedInterpolation = true;
series3.columns.template.propertyFields.fill = "color"; // Specify the fill color property field
series3.xAxis = xAxis3;
series3.name = "Technical Properties"


var columnTemplate3 = series3.columns.template;
columnTemplate3.strokeWidth = 0.5;
columnTemplate3.strokeOpacity = 0.5;
columnTemplate3.stroke = am4core.color("#000000");
columnTemplate3.tooltipText =  "Design Heuristic: {title} \n Effect: {positivetecheffectCategorySpecification}  {children}"
columnTemplate3.width = am4core.percent(100);
columnTemplate3.height = am4core.percent(100);
columnTemplate3.fill= am4core.color("#FFFFFF"); 
chart.seriesContainer.zIndex = -5;
columnTemplate3.hiddenState.properties.opacity = 0;


series3.heatRules.push({ target: columnTemplate3, property: "fill",  min:am4core.color("#A8E4A0"), 
max:am4core.color("#f69697"),
minValue: 1,
maxValue: 2 });
 
 



//SHow only one series at a time 
series1.events.on("shown", function() {
    handleSeriesChange("series1");
    //handleSeriesChange2("series1");
    series2.hide();
    series3.hide();
    xAxis2.hide();
    xAxis3.hide();
    xAxis.show()
  });
  
  series2.events.on("shown", function() {
    handleSeriesChange("series2");
    //handleSeriesChange2("series2");
    series1.hide();
    series3.hide();
      // Show chart2 when series2 is shown
  //chart2.hiddenState.properties.opacity = 1;
  xAxis.hide();
  xAxis3.hide();
  xAxis2.show()
 
  });


  series3.events.on("shown", function() {
    handleSeriesChange("series3");
    //handleSeriesChange2("series3");
    series1.hide();
    series2.hide();
    xAxis2.hide();
    xAxis.hide()
    xAxis3.show()

  });
  
 






// Function to handle the series change
function handleSeriesChange(series) {
    selectedSeries = series; // Update the selected series variable
  
    // Update the xAxis.dataFields.category based on the selected series
    if (selectedSeries === "series1") {
      xAxis.dataFields.category = "positivelcpeffectCategorySpecification2";
      yAxis.dataFields.category = "title";
  
  

    } else if (selectedSeries === "series2") {
      xAxis2.dataFields.category = "positivelcppeffectCategorySpecification2";
      yAxis.dataFields.category = "title";
    

    } else if (selectedSeries === "series3") {
      xAxis3.dataFields.category = "positivetecheffectCategorySpecification2";
    }

    chart.invalidateData();
  } 
 

  //Scrollbar 
  chart.scrollbarY = new am4core.Scrollbar();
  chart.scrollbarY.thumb.background.fill = am4core.color("#FFFFFF"); // Set the color of the scrollbar thumb

  var myData=similarHeuristics.length
  // Set the range of the scrollbar
if(myData>11){
chart.scrollbarY.events.on("rangechanged", function () {
  chart.scrollbarY.start = 0;
  chart.scrollbarY.end = 7/myData
   // Get the scrollbar's range
 /*  var range = chart.scrollbarY.end - chart.scrollbarY.start;

  // Define the threshold range
  var threshold = 9/myData; // Adjust the threshold value as needed

  // Hide or show the y-axis labels based on the range
  if (range > threshold) {
    yAxis.renderer.labels.template.hide();
  } else {
    yAxis.renderer.labels.template.show();
  }  */
});}else {
  yAxis.renderer.labels.template.show();
  chart.scrollbarY.start = 0;
  chart.scrollbarY.end =1;  
} 
 
  
/*   // Hide the grips to prevent resizing of the scrollbar range
   chart.scrollbarY.startGrip.hide();
  chart.scrollbarY.endGrip.hide(); 
   */
  

//Drop down menu 

  var filterDropdown = document.getElementById("filterDropdown");
  var filteredData = this.props.heuristics.heuristics.filter(heuristic => heuristic.embodimentArtefact === this.props.selectedHeuristic.embodimentArtefact);
  var uniqueAttributesSet = new Set(filteredData.map(heuristic => heuristic.embodimentAtrribute));
  var uniqueAttributes = Array.from(uniqueAttributesSet).filter(attribute => attribute !== undefined);
  filterDropdown.innerHTML = "";
  
var defaultOption = document.createElement("option");
defaultOption.value = "Flattened Array";
defaultOption.textContent = this.props.selectedHeuristic.embodimentAtrribute;
defaultOption.selected = true;
filterDropdown.appendChild(defaultOption);

  uniqueAttributes.forEach(attribute => {
    var option = document.createElement("option");
    option.value = attribute;
    option.textContent = attribute;
    filterDropdown.appendChild(option);
  });
  

var noDataMessage = document.createElement("div");
noDataMessage.innerHTML = "No data available for the selected filter.";
noDataMessage.style.fontSize = "16px";
noDataMessage.style.textAlign = "center";
noDataMessage.style.paddingTop = "20px";
noDataMessage.style.display = "none"; // Initially hide the message

document.getElementById("chartdiv").appendChild(noDataMessage); // Append the message to the chart container



  const handleFilterChange = () => {
    var selectedFilter = filterDropdown.value;
  
  
  
  
    if (selectedFilter === "Flattened Array") {
      // If "Flattened Array" is selected, set the chart data to the flattenedArray
      chart.data = mergedArray;
      noDataMessage.style.display = "none"; 
    } else {
  var similarHeuristics1 = this.props.heuristics.heuristics.filter(heuristic =>heuristic.embodimentAtrribute === selectedFilter &&
    heuristic.embodimentArtefact === this.props.selectedHeuristic.embodimentArtefact);
  
  
  var LifeCyclePhaseProperties = "Life Cycle Phase Property"; 
  var LifeCycleProperties = "Life Cycle Property"
  var TechnicalProperties = "Technical Property"
  
  var filteredHeuristics= similarHeuristics1.flatMap(function(item) {
    var effects = [];
  
    // Flattening positiveEffects with filtering
    effects.push(
      ...item.positiveEffects
        .filter(function(effect) {
          return effect.effectCategory === LifeCyclePhaseProperties;
        })
        .map(function(effect) {
          var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
          var firstPart, extra;
  
          if (indexOfDuring >= 0) {
            firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
            extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
          } else {
            firstPart = effect.effectCategorySpecification;
            extra = "";
          }
  
          return {
            title: item.title,
            positivelcppeffectCategory: effect.effectCategory,
            positivelcppeffectCategorySpecification: firstPart,
            value: 1,
            children: [extra]
          
          };
        })
    );
  
    effects.push(
        ...item.positiveEffects
          .filter(function(effect) {
            return effect.effectCategory === TechnicalProperties;
          })
          .map(function(effect) {
            var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
            var firstPart, extra;
    
            if (indexOfDuring >= 0) {
              firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
              extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
            } else {
              firstPart = effect.effectCategorySpecification;
              extra = "";
            }
    
            return {
              title: item.title,
              positivetecheffectCategory: effect.effectCategory,
              positivetecheffectCategorySpecification: firstPart,
              value: 1,
              children: [extra]
            };
          })
      );
  
      effects.push(
        ...item.positiveEffects
          .filter(function(effect) {
            return effect.effectCategory === LifeCycleProperties;
          })
          .map(function(effect) {
            var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
            var firstPart, extra;
    
            if (indexOfDuring >= 0) {
              firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
              extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
            } else {
              firstPart = effect.effectCategorySpecification;
              extra = "";
            }
    
            return {
              title: item.title,
              positivelcpeffectCategory: effect.effectCategory,
              positivelcpeffectCategorySpecification: firstPart,
              value: 1,
              children: [extra]
            };
          })
      );
  
    // Flattening negativeEffects with filtering
    effects.push(
      ...item.negativeEffects
        .filter(function(effect) {
          return effect.effectCategory === LifeCyclePhaseProperties;
        })
        .map(function(effect) {
          var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
          var firstPart, extra;
  
          if (indexOfDuring >= 0) {
            firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
            extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
          } else {
            firstPart = effect.effectCategorySpecification;
            extra = "";
          }
  
          return {
            title: item.title,
            negeffectCategory: effect.effectCategory,
            positivelcppeffectCategorySpecification: firstPart,
            value: 2,
            children: [extra]
          };
        })
    );
  
  
    effects.push(
        ...item.negativeEffects
          .filter(function(effect) {
            return effect.effectCategory === LifeCycleProperties;
          })
          .map(function(effect) {
            var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
            var firstPart, extra;
    
            if (indexOfDuring >= 0) {
              firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
              extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
            } else {
              firstPart = effect.effectCategorySpecification;
              extra = "";
            }
    
            return {
              title: item.title,
              negeffectCategory: effect.effectCategory,
              positivelcppeffectCategorySpecification: firstPart,
              value: 2,
              children: [extra]
          
            };
          })
      );
  
      effects.push(
        ...item.negativeEffects
          .filter(function(effect) {
            return effect.effectCategory === TechnicalProperties;
          })
          .map(function(effect) {
            var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
            var firstPart, extra;
    
            if (indexOfDuring >= 0) {
              firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
              extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
            } else {
              firstPart = effect.effectCategorySpecification;
              extra = "";
            }
    
            return {
              title: item.title,
              negeffectCategory: effect.effectCategory,
              positivetecheffectCategorySpecification: firstPart,
              value: 2,
              children: [extra]
            };
          })
      );
      return effects;
    });

var neu = this.props.heuristics.heuristics

var flattenedArray2 = neu.flatMap(function(item) {
  var effects2 = [];


  // Flattening positiveEffects with filtering
  effects2.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCyclePhaseProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }
   

        return {
          title2: item.title,
          positivelcppeffectCategory2: effect.effectCategory,
          positivelcppeffectCategorySpecification2: firstPart,
          value: 1,
          children: [extra],
          
        };
      })
  );
  effects2.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === TechnicalProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          positivetecheffectCategory2: effect.effectCategory,
          positivetecheffectCategorySpecification2: firstPart,
          value: 1,
          children: [extra]
        };
      })
  );

  effects2.push(
    ...item.positiveEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCycleProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          positivelcpeffectCategory2: effect.effectCategory,
          positivelcpeffectCategorySpecification2: firstPart,
          value: 1,
          children: [extra]
        };
      })
  );

// Flattening negativeEffects with filtering
effects2.push(
  ...item.negativeEffects
    .filter(function(effect) {
      return effect.effectCategory === LifeCyclePhaseProperties;
    })
    .map(function(effect) {
      var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
      var firstPart, extra;

      if (indexOfDuring >= 0) {
        firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
        extra = effect.effectCategorySpecification.slice(indexOfDuring).trim();
      } else {
        firstPart = effect.effectCategorySpecification;
        extra = "";
      }

      return {
        title2: item.title,
        negeffectCategory2: effect.effectCategory,
        positivelcppeffectCategorySpecification2: firstPart,
        value: 2,
        children: [extra]
      };
    })
);


effects2.push(
    ...item.negativeEffects
      .filter(function(effect) {
        return effect.effectCategory === LifeCycleProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          negeffectCategory2: effect.effectCategory,
          positivelcppeffectCategorySpecification2: firstPart,
          value: 2,
          children: [extra]
      
        };
      })
  );

  effects2.push(
    ...item.negativeEffects
      .filter(function(effect) {
        return effect.effectCategory === TechnicalProperties;
      })
      .map(function(effect) {
        var indexOfDuring = effect.effectCategorySpecification.indexOf("during");
        var firstPart, extra;

        if (indexOfDuring >= 0) {
          firstPart = effect.effectCategorySpecification.slice(0, indexOfDuring).trim();
          extra = effect.effectCategorySpecification.slice(indexOfDuring ).trim();
        } else {
          firstPart = effect.effectCategorySpecification;
          extra = "";
        }

        return {
          title2: item.title,
          negeffectCategory2: effect.effectCategory,
          positivetecheffectCategorySpecification2: firstPart,
          value: 2,
          children: [extra]
          
        };
      })
  );
  return effects2;
});



  var mergedArray2 = filteredHeuristics.concat(flattenedArray2);
  chart.data = mergedArray2;


  
    // Do something with the filtered heuristics data
   // Check if the 'positivelcppeffectCategorySpecification' is empty in the filtered data
   var hasData = mergedArray2.some(
    item => item.positivelcppeffectCategorySpecification !== ""
  );

  if (!hasData) {
    // If 'positivelcppeffectCategorySpecification' is empty, show the message and hide the chart
    chart.data = []; // Set the chart data to an empty array to hide the chart
    noDataMessage.style.display = "block"; // Show the no data message
  } else {
    // Set the chart's data and hide the no data message
    chart.data = mergedArray2;
    noDataMessage.style.display = "none";
  }


    chart.invalidateData();
  
  }
  
}
  
  filterDropdown.addEventListener("change", handleFilterChange); 
  




// Get a reference to the yAxis's label template
var labelTemplate = chart.yAxes.getIndex(0).renderer.labels.template;

var TurnToRectangle= chart.createChild(am4core.Container);
TurnToRectangle.layout = "vertical";
TurnToRectangle.padding(0, 50, 0, 50);
TurnToRectangle.width = am4core.percent(100);

var slider = TurnToRectangle.createChild(am4core.Slider);

slider.exportable = false;
slider.events.on("rangechanged", function () {
    var start = slider.start;

    chart.startAngle = 360- start * 89 - 1;
    chart.endAngle = 360+ start * 179 + 1;

 // Check if the slider is at its starting position (e.g., slider.start equals 0)
    if (start === 0) {
        // Set a different y-axis label position when the slider is at the beginning
        labelTemplate.y = am4core.percent(10); // You can adjust this value as needed
    } else {
        // Set the default y-axis label position for other slider positions
        labelTemplate.y = am4core.percent(10); // You can adjust this value as needed
    }
        // Adjust the y-axis label rotation to align with the chart's end angle
      

      
});
slider.start = 1;
slider.width = 700; 





}




    sendComment(values){
        /** After the user submits the feedback, this function will be called to dispatch the input
        * being the heuristic which the user sends a feedback for, user's name and comment to the server.
        */
       // this.setState({ comments: [...this.state.comments, this.props.postComment(this.props.selectedOne._id, values.author, values.comment)]})
       this.props.postComment(this.props.heuristics._id, values.author, values.comment);
       window.location.reload(false);
        
    }  
    render() {
        if (!this.props.heuristicsLoading){
                    /**To set the selected heuristic as the selected one, it is defined to avoid writing more codes */
            const selectedHeuristic= this.props.selectedHeuristic;
            const id = selectedHeuristic._id;
            /**Since each property of the seleceted heuristic has a different kind of visuality,
             * the type of these properties has been defined in each variable to improve the simplicity and
             * avoid more coding!
             * 
             * Each item or property will be rendered via the function defined above (RenderDetailItem)
             * The functions seeks for two property: item that should be rendered, and the type of that */

            const positiveInfluence= selectedHeuristic.positiveEffects.map((effect)=>{
                
                let type= 'positive';
                return(
                    <Col md={4} className="text-center">
                        <RenderDetailItem item={effect.effectCategorySpecification} type={type}/>
                        <br/>
                    </Col>
                )
            })

            var rating = {
                size: 30,
                count: 5,
                activeColor: "yellow",
                value: selectedHeuristic.rating,
                isHalf: false,
                emptyIcon: <i className="fa fa-star" />,
                halfIcon: <i className="fa fa-star-half-alt" />,
                filledIcon: <i className="fa fa-star" />
            };
            
            const negativeInfluence= (selectedHeuristic.negativeEffects.length>0 ? selectedHeuristic.negativeEffects.map((effect)=>{
                
                let type= 'negative';
                return(
                    <Col md={4} className="text-center">
                        <RenderDetailItem item={effect.effectCategorySpecification} type={type}/>
                    </Col>
                )
            }) :<Col md={5} className="text-center">
                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                        <CardBody >
                        <strong>Currently, no known negative influence property</strong>
                        </CardBody>
                    </Card>
                </Col>
            )

            const applicableIndustry = selectedHeuristic.industry.map((industry)=>{
                let type= 'industry';
                return(
                    <Col >
                        <RenderDetailItem item={industry} type={type}/>
                    </Col>
                )
            })

            const images= (selectedHeuristic.image.length>0 ? selectedHeuristic.image.map((image)=>{
              let type= 'image';
              return(
                  <Col md={5} className='text-center ' >
                      <RenderDetailItem item={image} type={type} id={id}/>
                  </Col>
              )
            }) :<Col md={5} className="text-center">
                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                        <CardBody >
                            <strong>Currently, no known graphic property</strong>
                        </CardBody>
                    </Card>
                </Col>
            )

            const sources= selectedHeuristic.sources.map((source)=>{
                let type= 'source';
                return(
                    <Col>
                        <RenderDetailItem item={source} type={type}/>
                    </Col>
                )
            })
            const comments= (selectedHeuristic.comments.length>0 ? selectedHeuristic.comments.map((comment)=>{
              let type= 'comment';
              return(
                  <Col key={comment._id}>
                      <RenderDetailItem item={comment} type={type}/>
                  </Col> 
              )
            }) :<Col md={5} className="text-center">
                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                        <CardBody >
                            <strong>Currently, no comment has been posted yet!</strong>
                        </CardBody>
                    </Card>
                </Col>
            )

            const secondExample = {
                size: 30,
                count: 5,
                activeColor: "yellow",
                value: 0,
                isHalf: false,
                emptyIcon: <i className="fa fa-star" />,
                halfIcon: <i className="fa fa-star-half-alt" />,
                filledIcon: <i className="fa fa-star" />,
                onChange: newValue => {
                    console.log(`Example 2: new value is ${newValue}`);
                }
            };
            if (this.props.heuristicsLoading) {
                return(
                    <div className='container'>
                        <div className='row'>
                            <Loading/>
                        </div>
                    </div>
                )
            }
            else if (this.props.heuristiscErrMess){
                return(
                    <div className='container'>
                        <div className='row'>
                            <h4>{this.props.heuristiscErrMess}</h4>
                        </div>
                    </div>
                )
            }
            else
                return (
                    <>
                        <Header auth={this.props.auth}
                            logoutUser={this.props.logoutUser}/>
                        <div className='container'>
                            <div className='row row-header align-items-center'>
                              <Row>
                                <Col md={4}>
                                    <h3>Design Advice</h3>
                                </Col>
                                <Col md= {6} >
                                    <Card style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                        <CardBody style={{border: 0, paddingInline: "20px"}}>
                                            {selectedHeuristic.title}
                                        </CardBody>
                                    </Card>
                                </Col>
                              </Row>
                              {/* <Row style={{marginTop: '20px'}}>
                                <Col md={{offset:4, size:2}} style={{ height: "auto", width: 'auto', borderRadius: "10px"}}>
                                    <Card style={{ height: "auto", width: 'auto', borderRadius: "10px"}}>
                                        <CardBody style={{border: 0, paddingInline: "20px"}}>
                                            <strong>Add to library</strong>
                                        </CardBody>
                                    </Card>
                                </Col>
                              </Row> */}
                            </div>
                            <div className='row row-content' style={{rowGap: "60px"}}>
                              {/** After defining how to render each property of the corresponding heuristic,
                               * there will be rendered below.
                               */}
                              <Row>
                                  <h4><b>Affected System Level </b></h4>
                                  <Col md= {6} style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                      <Card style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                          <CardBody style={{border: 0, paddingInline: "20px"}}>
                                              {selectedHeuristic.adressedSystemLevel}
                                          </CardBody>
                                      </Card>
                                  </Col>
                              </Row>
                              <Row>
                                  <h4><b>Affected Artefact Categorization</b></h4> 
                                  <Col md= {6} style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                      <Card style={{ height: "50px", width: "auto", borderRadius: "10px"}}>
                                          <CardBody style={{border: 0, paddingInline: "20px"}}>
                                              {selectedHeuristic.artefactCategorization}
                                          </CardBody>
                                      </Card>
                                  </Col>
                              </Row>
                              <Row>
                                  <h4><b>Possible positive influence </b></h4> 
                                  {positiveInfluence}
                              </Row>
                              <Row>
                                  <h4><b>Possible negative influence </b></h4> 
                                  {negativeInfluence}
                              </Row>
                              <Row>
                                  <h4><b>Rating</b></h4> 
                                  <ReactStars {...rating} />
                              </Row>
                              <Row>
                                <h4><b>Design heuristic for</b></h4> 
                                  <Col md= {4}>
                                    <Card style={{ height: '50px', textAlign: 'center' , paddingTop: '15px' }}>
                                      {selectedHeuristic.embodimentArtefact}
                                    </Card>
                                  </Col>
                                  <Col md= {4}>
                                    <Card >
                                      <select id="filterDropdown" style={{ height: '50px', textAlign: 'center' ,paddingTop: '5px'  }}>
                                        <option  value="">{selectedHeuristic.embodimentAtrribute}  </option>
                                      </select>
                                    </Card>
                                  </Col>
                                    <div>  
                                      <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>  
                                    </div> 
                              </Row>
                              <Row>
                                <h4><b>Applicable industry</b></h4>
                                
                                <Col md= {6} style={{ height: "auto", width: "auto", borderRadius: "10px"}}>
                                  {applicableIndustry}
                                </Col>
                              </Row>
                              <Row>
                                <h4><b>Description</b></h4>
                                {selectedHeuristic.description?
                                <Col md= {6} style={{ height: "auto", width: "auto", borderRadius: "10px"}}>
                                    <Card style={{ height: "auto", width: "auto", borderRadius: "10px"}}>
                                        <CardBody style={{border: 0, paddingInline: "20px"}} className='m-1 align-items-center' >
                                            <CardText>
                                                {selectedHeuristic.description}
                                            </CardText>
                                        </CardBody>
                                    </Card>
                                </Col>
                                :
                                <Col md={5} className="text-center">
                                    <Card className='justify-content-center' style={{ height: "auto", width: "auto", borderRadius: "10px", width: "auto",paddingInline: '20px'}}>
                                        <CardBody >
                                            <strong>Currently, no description is available</strong>
                                        </CardBody>
                                    </Card>
                                </Col>
                                }
                              </Row>
                              <Row>
                                  <h4><b>Graphics</b></h4> 
                                  {images}
                              </Row>
                              <Row>
                                  <h4><b>Sources</b></h4> 
                                  {sources}
                              </Row>
                              <Row>
                                  <h4><b>Comments</b></h4> 
                                  {comments}
                              </Row>
                              <Row style={{fontFamily: "sans-serif"}}>
                                  <h4><b>Rate the heuristic</b></h4>
                                  <ReactStars {...secondExample} />
                              </Row>
                              <LocalForm onSubmit={(values)=>{this.sendComment(values)}}>
                                  <Row className='form-group'>
                                      <Col>
                                          <Label htmlFor="author"></Label>
                                          <Control.text model=".author" id="author" name="author" 
                                              className= "form-control" placeholder="Your Name" 
                                              style={{width:"400px"}}  />
                                      </Col>
                                  </Row>
                                  <Row className='form-group'>
                                      <Col>
                                          <Label htmlFor="comment"></Label>
                                          <Control.text model=".comment" id="comment" name="comment"
                                              className= "form-control" placeholder="Your Feedback"
                                              style={{width:"400px", marginBottom:"20px"}}  />
                                      </Col>
                                  </Row>
                                  <Row className='form-group'>
                                      <Col>
                                          <Button type="submit"  value="submit" color="light"> Send comment</Button>
                                      </Col>
                                  </Row>
                              </LocalForm>
                            </div>
                        </div>
                    </>
                );

        }
    }
}
export default HeuristicDetails;