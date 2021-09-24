
var seriesChart = dc.seriesChart('#line2');

d3.csv("data/people_hw.csv", function (people, errors) {
   if (people.gender == 'Male') {
      people.newdata = 1;
   } else {
      people.newdata = 2;
   }
   var mycrossfilter = crossfilter([people]);

   var hwDimension = mycrossfilter.dimension(function (data) {
      return [data.gender, data.height];
   });

   var hwGroup = hwDimension.group().reduceCount();


   seriesChart
      .width(800)
      .height(600)
      .elasticY(true)
      .elasticX(true)
      .chart(function (c) {
         return dc.lineChart(c).interpolate('cardinal').evadeDomainFilter(true);
      })

      .x(d3.scaleLinear().domain([145, 180]))
      .elasticY(true)
      .brushOn(false)
      .xAxisLabel("Height")
      .yAxisLabel("Count")
      .dimension(hwDimension)
      .group(hwGroup)
      .seriesAccessor(function (d) { return d.key[0]; })
      .keyAccessor(function (d) { return +d.key[1]; })
      .valueAccessor(function (d) { return +d.value; })
   .legend(dc.legend().x(350).y(500).itemHeight(13).gap(5).horizontal(1).legendWidth(120)
      .itemWidth(60));
})





//  =====================================================================================
var pieChart = dc.pieChart('#pie');
var chart = dc.lineChart('#line');
var chartBar = dc.barChart('#bar');
var chartComposite = dc.compositeChart('#composite');

var mycrossfilter = crossfilter();
var ndx = crossfilter();

d3.csv("data/people.csv", function (people, errors,) {
   mycrossfilter.add([people]);

   ndx.add([people].map(function (data) {
      return {
         age: ~~((Date.now() - new Date(data.DOB)) / (31557600000)),
         male: data.gender == 'Male' ? 1 : 0,
         female: data.gender == 'Male' ? 0 : 1
      };
   }));

   var dim = ndx.dimension(dc.pluck('age')),

      grp1 = dim.group().reduceSum(dc.pluck('male')),
      grp2 = dim.group().reduceSum(dc.pluck('female'));

   {
      chartComposite
         .width(800)
         .height(200)
         .x(d3.scaleLinear().domain([15, 80]))
         .elasticY(true)
         .elasticX(true)
         .yAxisLabel("Count")
         .xAxisLabel("Age")
         .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
         .renderHorizontalGridLines(true)
         .compose([
            dc.lineChart(chartComposite)
               .dimension(dim)
               .colors('red')
               .group(grp1, "Male")
               .dashStyle([2, 2]),
            dc.lineChart(chartComposite)
               .dimension(dim)
               .colors('blue')
               .group(grp2, "Female")
               .dashStyle([5, 5])
         ])
   }










   var genderDimension = mycrossfilter.dimension(function (data) {
      return data.gender;
   });

   var genderGroup = genderDimension.group().reduceCount();

   {
      pieChart
         .width(800)
         .height(200)
         .dimension(genderDimension)
         .group(genderGroup)
         .on('renderlet', function (chart) {
            chart.selectAll('rect').on('click', function (d) {
               console.log('click!', d);
            });
         });
   }









   var ageDimension = mycrossfilter.dimension(function (data) {
      // console.log(~~((Date.now() - new Date(data.DOB)) / (31557600000)));
      return ~~((Date.now() - new Date(data.DOB)) / (31557600000))
   });

   var ageGroup = ageDimension.group().reduceCount();

   {
      chart
         .width(800)
         .height(200)
         .x(d3.scaleLinear().domain([15, 80]))
         .elasticY(true)
         .elasticX(true)
         // .brushOn(false)
         .yAxisLabel("Count")
         .xAxisLabel("Age")
         .dimension(ageDimension)
         .group(ageGroup)
         .on('renderlet', function (chart) {
            chart.selectAll('rect').on('click', function (d) {
               console.log('click!', d);
            });
         });
   }



   {
      chartBar
         .width(800)
         .height(200)
         .x(d3.scaleLinear().domain([15, 80]))
         .elasticY(true)
         .elasticX(true)
         // .brushOn(false)
         .yAxisLabel("Count")
         .xAxisLabel("Age")
         .dimension(ageDimension)
         .group(ageGroup)
         .on('renderlet', function (chart) {
            chart.selectAll('rect').on('click', function (d) {
               console.log('click!', d);
            });
         });
   }





   dc.renderAll();
});