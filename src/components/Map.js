import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import * as d3 from 'd3';
import featureCollection from '../data/ne_110m_admin_0_countries.json';

import certificationData from '../data/oshwa-certifications.json';

// https://www.sitepoint.com/d3-js-react-interactive-data-visualizations/

const Legend = ({ color }) => {
  let tickSize = 6;
  let width = 300;
  let height = 40 + tickSize;
  let marginTop = 0;
  let marginBottom = 24 + tickSize;
  let marginLeft = 0;
  let marginRight = 0;
  let tickFormat = d3.format('~s');
  let ticks = width / 64;

  const svgRef = useRef(null);
  const thresholds = color.domain();
  const thresholdFormat = tickFormat;

  const x = d3
    .scaleLinear()
    .domain([-1, color.range().length - 1])
    .rangeRound([marginLeft, width - marginRight]);

  const tickValues = d3.range(thresholds.length - 1);
  tickFormat = i => thresholdFormat(thresholds[i], i);

  useEffect(() => {
    let tickAdjust = g =>
      g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);

    d3.select('.ticks')
      .call(
        d3
          .axisBottom(x)
          .ticks(ticks, tickFormat)
          .tickFormat(tickFormat)
          .tickSize(tickSize)
          .tickValues(tickValues)
      )
      .call(tickAdjust)
      .call(g => g.select('.domain').remove());
  }, [
    height,
    marginBottom,
    marginTop,
    tickFormat,
    tickSize,
    tickValues,
    ticks,
    x,
  ]);

  return (
    <svg id="map-legend" ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g>
        {color.range().map((d, i) => (
          <rect
            key={d}
            x={x(i - 1)}
            y={marginTop}
            width={x(i) - x(i - 1)}
            height={height - marginTop - marginBottom}
            fill={d}
          />
        ))}
      </g>
      <g
        className="ticks"
        transform={`translate(0, ${height - marginBottom})`}
      ></g>
    </svg>
  );
};

const Map = () => {
  const [certificationStats, setCertificationStats] = useState([]);
  const chartRef = useRef(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCertificationStats(certificationData);
    if (certificationStats) {
      setLoading(false);
    }
  }, [certificationStats]);

  const mapAttrs = {
    width: 800,
    height: 500,
    defaultStroke: '#333333',
    defaultFill: '#333333',
    data: featureCollection,
    certificationStats,
  };

  const projection = d3
    .geoNaturalEarth1()
    .scale(mapAttrs.width / 1.6 / Math.PI)
    .translate([mapAttrs.width / 2, mapAttrs.height / 2.5])
    .center([5, 20]);

  const geoPathGenerator = d3.geoPath().projection(projection);

  const legendData = {
    keys: [5, 20, 50, 100, 101],
    colors: ['#8859a5', '#F26C7A', '#FBB040', '#D7DF23', '#56BFAB'],
  };

  const colorScale = d3
    .scaleOrdinal()
    .domain(legendData.keys)
    .range(legendData.colors);

  const getColor = d => {
    return d > 100
      ? '#56BFAB'
      : d > 50
      ? '#D7DF23'
      : d > 20
      ? '#FBB040'
      : d > 5
      ? '#F26C7A'
      : d >= 1
      ? '#8859a5'
      : '#333333';
  };

  const allSvgPaths = mapAttrs.data.features
    .filter(shape => shape.properties.SOV_A3 !== 'ATA')
    .map(shape => {
      const color = getColor(certificationStats[shape.properties.ADMIN]);
      const country = shape.properties.ADMIN;

      const count = certificationStats[shape.properties.ADMIN] || 0;

      return (
        <path
          className={count === 0 ? 'clickable' : ''}
          key={shape.properties.WIKIDATAID}
          d={geoPathGenerator(shape)}
          stroke={color}
          fill={color}
          onMouseEnter={event => {
            setTooltipVisible(true);
          }}
          onPointerUp={event => {
            if (event.pointerType === 'mouse') {
              if (count === 0) {
                navigate(`https://application.oshwa.org/`);
              }
            }
          }}
          onMouseLeave={() => {
            setTooltipVisible(false);
          }}
          onMouseMove={event => {
            const certificationsCount = (count || 0).toLocaleString();

            // get x and y position relative to the chart
            let [x, y] = d3.pointer(event, chartRef.current);

            if (window.innerWidth <= 1400) {
              x = adjustTooltipX(x);
            }

            setTooltipData({
              country,
              certificationsCount,
              left: x,
              top: y - 10,
            });
          }}
        />
      );
    });

  function adjustTooltipX(x) {
    if (x >= 700) {
      return x - 100;
    } else {
      return x - 10;
    }
  }
  return (
    <>
      <div id="map">
        <div className={`loading ${loading ? 'visible' : ''}`}>Loading...</div>
        <Legend color={colorScale} />
        <svg
          id="map-svg"
          ref={chartRef}
          width={mapAttrs.width}
          height={mapAttrs.height}
          viewBox={`0 0 ${mapAttrs.width} ${mapAttrs.height}`}
        >
          {allSvgPaths}
        </svg>
        {/* tooltip  */}
        {tooltipData && (
          <div
            className={`tooltip ${tooltipVisible ? 'visible' : ''}`}
            style={{
              left: tooltipData.left,
              top: tooltipData.top,
            }}
          >
            Country: {tooltipData.country}
            <br />
            Certifications: {tooltipData.certificationsCount}
            {tooltipData.certificationsCount === '0' ? (
              <a className="be-the-first" href="https://application.oshwa.org/">
                Be the first!
              </a>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
