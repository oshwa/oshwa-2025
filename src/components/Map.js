import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import featureCollection from '../data/ne_110m_admin_0_countries.json';

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

  const tickValues = d3.range(thresholds.length);
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
    <svg ref={svgRef} width={width} height={height}>
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
    const getCertifications = async (url, headers) => {
      const response = await fetch(url, { headers });
      const data = await response.json();
      return data;
    };

    const getAllCertifications = async (offset = 0, data = []) => {
      let allCertifications = data;

      const headers = {
        Authorization: `Bearer ${process.env.OSHWA_BEARER_TOKEN}`,
      };
      console.log(headers, 'headers');
      const limit = 1000;
      let baseUrl = `https://certificationapi.oshwa.org/api/projects?offset=${offset}&limit=${limit}`;

      let response = await getCertifications(baseUrl, headers);
      console.log(response, 'response');
      if (response.items.length >= limit) {
        allCertifications = allCertifications.concat(response.items);
        return getAllCertifications((offset += limit), allCertifications);
      } else {
        allCertifications = allCertifications.concat(response.items);
      }
      let certificationCountries = allCertifications.map(cert => cert.country);

      let certificationCounts = {};

      certificationCountries.forEach(country => {
        if (certificationCounts[country]) {
          certificationCounts[country] += 1;
        } else {
          certificationCounts[country] = 1;
        }

        setCertificationStats(certificationCounts);
        setLoading(false);
      });
    };

    getAllCertifications();
  }, []);

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
    keys: [1, 5, 10, 20, 50],
    colors: ['#333333', '#D7DF23', '#FBB040', '#F26C7A', '#19ACE2', '#56BFAB'],
  };

  const colorScale = d3
    .scaleOrdinal()
    .domain(legendData.keys)
    .range(legendData.colors);

  const getColor = d => {
    return d > 50
      ? '#56BFAB'
      : d > 20
      ? '#19ACE2'
      : d > 10
      ? '#F26C7A'
      : d > 5
      ? '#FBB040'
      : d > 1
      ? '#D7DF23'
      : '#333333';
  };

  const allSvgPaths = mapAttrs.data.features
    .filter(shape => shape.properties.SOV_A3 !== 'ATA')
    .map(shape => {
      const color = getColor(certificationStats[shape.properties.SOVEREIGNT]);
      const country = shape.properties.SOVEREIGNT;
      const count = certificationStats[shape.properties.SOVEREIGNT] || 'N/A';

      return (
        <path
          key={shape.properties.WIKIDATAID}
          d={geoPathGenerator(shape)}
          stroke={color}
          fill={color}
          onMouseEnter={event => {
            setTooltipVisible(true);
          }}
          onMouseLeave={() => {
            setTooltipVisible(false);
          }}
          onMouseMove={event => {
            const certificationsCount = (count || 'N/A').toLocaleString();

            // get x and y position relative to the chart
            const [x, y] = d3.pointer(event, chartRef.current);

            setTooltipData({
              country,
              certificationsCount,
              left: x,
              top: y,
            });
          }}
        />
      );
    });

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
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
