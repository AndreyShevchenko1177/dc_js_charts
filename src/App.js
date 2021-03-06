import * as dc from 'dc';
import * as d3 from 'd3';
import './App.scss';
import crossfilter from 'crossfilter2';
import ccssvv from './people.csv'



function App() {

  var barChart = dc.barChart('#line'); // , 'myChartGroup');
         var pieChart = dc.pieChart('#pie'); //, 'myChartGroup');
         var countChart = dc.dataCount("#mystats");
         var gridChart = dc.dataGrid("#mygrid");

         d3.csv("./people.csv", function(errors, people) {
            var mycrossfilter = crossfilter(people);

            console.log(mycrossfilter);

            // age dimension
            var ageDimension = mycrossfilter.dimension(function(data) { 
               return ~~((Date.now() - new Date(data.DOB)) / (31557600000)) 
            });
            var ageGroup = ageDimension.group().reduceCount();

            // gender dimension
            var genderDimension = mycrossfilter.dimension(function(data) { 
               return data.gender; 
            });
            var genderGroup = genderDimension.group().reduceCount();

         barChart
            .width(400)
            .height(200)
            .x(d3.scaleLinear().domain([15,70]))
            .yAxisLabel("Count")
            .xAxisLabel("Age")
            .elasticY(true)
            .elasticX(true)
            .dimension(ageDimension)
            .group(ageGroup);

         pieChart
            .width(200)
            .height(100)
            .dimension(genderDimension)
            .group(genderGroup);

         countChart
            .dimension(mycrossfilter)
            .group(mycrossfilter.groupAll());

         gridChart
            .dimension(ageDimension)
            .group(function (data) {
               return ~~((Date.now() - new Date(data.DOB)) / (31557600000));
            })
            .size(100)
            .htmlGroup (function(d) { 
               return 'Age: ' + d.key +
               '; Count: ' + d.values.length +
               ' people'
            })
            .html (function(d) { return d.name; })
            .sortBy(function (d) {
               return d.name;
            })
            .order(d3.ascending);

         barChart.render();
         pieChart.render();
         countChart.render();
         gridChart.render();
      });


  // console.log(mycrossfilter);

  return (
    <>
    {/* <div>
         <div style = {{width: '600px;'}}>
            <div id = "mystats" className = "dc-data-count" style = {{float: "right"}}>
               <span className = "filter-count"></span> selected out of <span
                  className = "total-count"></span> | <a href = "javascript:dc.filterAll();dc.renderAll();">Reset All</a>
            </div>
         </div>

         <div style = {{clear: 'both', paddingTop: '20px'}}>
            <div>
               <div id = "line"></div>
               <div id = "pie"></div>
            </div>
         </div>

         <div style = {{clear: 'both'}}>
            <div className = "dc-data-grid" id = "mygrid"></div>
         </div>
      </div> */}
      </>
  );
  
}

export default App;
