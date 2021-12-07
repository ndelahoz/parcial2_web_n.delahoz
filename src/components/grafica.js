import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Grafica(props) {
  const {
    data,
    outerRadius,
    innerRadius,
  } = props;

  const margin = {
    top: 50, right: 50, bottom: 50, left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

  const colorScale = d3     
    .scaleSequential()      
    .interpolator(d3.interpolateRdGy)      
    .domain([0, data!=null? data.length:0]);

  useEffect(() => {
    if(data!=null){
      drawChart();
    }else{
      eliminateChart();
    } 
    
  }, [data]);

  function eliminateChart(){
    d3.select('#pie-container')
      .select('svg')
      .remove();
  }

  function drawChart() {
    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.powerUsage.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(data))
      .enter();

      var div = d3.select("body").append("div")
     .attr("class", "tooltip-donut")
     .style("opacity", 0);

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0)
      .on('mouseover', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '.85');
          div.transition()
               .duration(50)
               .style("opacity", 1);
               console.log((d3.pointer(d)))
          let num=i.data.name+": " +i.data.powerUsage.value +i.data.powerUsage.unit;
          div.html(num)
               .style("left", (d3.pointer(d)[0]+350) + "px")
               .style("top", (d3.pointer(d)[1]+1100) + "px");
     })
     .on('mouseout', function (d, i) {
          d3.select(this).transition()
               .duration('50')
               .attr('opacity', '1');
          div.transition()
               .duration('50')
               .style("opacity", 0);
     });

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.name+" "+d.data.powerUsage.unit)
      .style('fill', (_, i) => colorScale(data.length +i-1))
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }    

  return <div id="pie-container" />;
}

export default Grafica;
