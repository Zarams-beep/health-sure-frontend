'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const AnatomyDiagram = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const width = 500, height = 800;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'anatomy-diagram');

    // Background image
    svg.append('image')
      .attr('xlink:href', '/3f9m_27g2_220113.jpg')
      .attr('x', 50)
      .attr('y', 10)
      .attr('width', 400)
      .attr('height', 780);

    const labels = [
      { text: 'Brain Activity', value: 'High', x: 40, y: 50, side: 'left', trend: 'up' },
      { text: 'Blood Pressure', value: '120/80 mmHg', x: 450, y: 120, side: 'right', trend: 'up' },
      { text: 'Heart Rate', value: '72 bpm', x: 50, y: 230, side: 'left', trend: 'down' },
      { text: 'Lung Capacity', value: '5.5L', x: 450, y: 270, side: 'right', trend: 'up' },
      { text: 'Blood Sugar', value: '95 mg/dL', x: 50, y: 360, side: 'left', trend: 'down' },
      { text: 'Gut Health', value: 'Good', x: 450, y: 470, side: 'right', trend: 'down' },
      { text: 'Muscle Strength', value: '85%', x: 50, y: 550, side: 'left', trend: 'up' },
      { text: 'Immune Defense', value: 'Strong', x: 450, y: 670, side: 'right', trend: 'down' },
    ];

    labels.forEach(label => {
      const textX = label.side === 'left' ? label.x + 10 : label.x - 140; 
      const lineX1 = label.side === 'left' ? label.x + 100 : label.x - 100;
      const lineX2 = label.side === 'left' ? label.x + 160 : label.x - 160; 

      // Add text label
      const text = svg.append('text')
        .attr('x', textX)
        .attr('y', label.y)
        .text(label.text)
        .attr('class', 'anatomy-label')
        .style('cursor', 'pointer');

      // Tooltip (hidden initially)
      const tooltip = svg.append('text')
        .attr('x', textX)
        .attr('y', label.y - 20)
        .text(`${label.value} ${label.trend === 'up' ? '📈' : '📉'}`)
        .attr('class', 'tooltip')
        .style('opacity', 0);

      // Add hover effect
      text.on('mouseover', function () {
        tooltip.style('opacity', 1);
      })
        .on('mouseout', function () {
          tooltip.style('opacity', 0);
        });

      // Add simple connecting line
      svg.append('line')
        .attr('x1', lineX1)
        .attr('y1', label.y)
        .attr('x2', lineX2)
        .attr('y2', label.y)
        .attr('class', 'anatomy-line')
        .attr('stroke', 'black')
        .attr('stroke-width', 2);
    });
  }, []);

  return <div className="diagram-container"><svg ref={svgRef}></svg></div>;
};

export default AnatomyDiagram;
