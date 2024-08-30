import React, { useRef,useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csvParse } from "d3-dsv";
import { setWeatherData } from "./features/weatherSlice";
import { RootState } from "./app/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";
import { FixedSizeList as List } from "react-window";
import "./App.css";

interface WeatherData {
  date: string;
  city: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

function App() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state: RootState) => state.weather.data);
  const [filteredData, setFilteredData] = useState<WeatherData[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("All");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  const [chartWidth, setChartWidth] = useState(0);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/weather_data.csv")
      .then((response) => response.text())
      .then((data) => {
        const parsedData = csvParse(data, (d) => ({
          date: d.Date,
          city: d.City,
          temperature: parseFloat(d.Temperature) || 0,
          precipitation: parseFloat(d.Precipitation) || 0,
          windSpeed: parseFloat(d["Wind Speed"]) || 0,
          humidity: parseFloat(d.Humidity) || 0,
        }));
        dispatch(setWeatherData(parsedData));
      });
  }, [dispatch]);

  useEffect(() => {
    if (chartContainerRef.current) {
      setChartWidth(chartContainerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (chartContainerRef.current) {
        setChartWidth(chartContainerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sortByDate = (data: WeatherData[]) => {
    return [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  useEffect(() => {
    let filtered = weatherData;
    if (selectedCity !== "All") {
      filtered = filtered.filter(
        (item: WeatherData) => item.city === selectedCity
      );
    }
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(
        (item: WeatherData) =>
          item.date >= dateRange.start && item.date <= dateRange.end
      );
    }
    setFilteredData(sortByDate(filtered));
  }, [weatherData, selectedCity, dateRange]);

  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => (
    <div className="row" style={style}>
      <span>{filteredData[index].date}</span>
      <span>{filteredData[index].city}</span>
      <span>{filteredData[index].temperature.toFixed(1)}°C</span>
      <span>{filteredData[index].precipitation.toFixed(1)}mm</span>
      <span>{filteredData[index].windSpeed.toFixed(1)} km/h</span>
      <span>{filteredData[index].humidity.toFixed(1)}%</span>
    </div>
  );

  const cities = [
    "All",
    ...new Set(weatherData.map((item: WeatherData) => item.city)),
  ];

  const getChartData = () => {
    const buffer = 20;
    const start = Math.max(0, visibleRange.start - buffer);
    const end = Math.min(filteredData.length, visibleRange.end + buffer);
    return filteredData.slice(start, end);
  };

  return (
    <div className="App">
      <header>
        <h1>Weather Data</h1>
      </header>
      <main>
        <div className="filters">
          <div>
            <label htmlFor="city">City</label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              id="start-date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              id="end-date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
        </div>
        <div className="charts">
          <div className="chart" ref={chartContainerRef} style={{ width: '100%' }}>
            <h2>Temperature</h2>
            <LineChart width={chartWidth-20} height={300} data={getChartData()}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
            </LineChart>
          </div>
          <div className="chart" ref={chartContainerRef} style={{ width: '100%' }}>
            <h2>Precipitation</h2>
            <BarChart width={chartWidth-20} height={300} data={getChartData()}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Bar dataKey="precipitation" fill="#82ca9d" />
            </BarChart>
          </div>
          <div className="chart" ref={chartContainerRef} style={{ width: '100%' }}>
            <h2>Wind Speed</h2>
            <LineChart width={chartWidth-20} height={300} data={getChartData()}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="windSpeed" stroke="#ffc658" />
            </LineChart>
          </div>
          <div className="chart" ref={chartContainerRef} style={{ width: '100%' }}>
            <h2>Humidity</h2>
            <AreaChart width={chartWidth-20} height={300} data={getChartData()}>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="humidity"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </div>
          <div className="chart" ref={chartContainerRef} style={{ width: '100%' }}>
            <h2>Temperature vs Humidity</h2>
            <ScatterChart
              width={chartWidth-20}
              height={300}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis
                type="number"
                dataKey="temperature"
                name="Temperature"
                unit="°C"
              />
              <YAxis
                type="number"
                dataKey="humidity"
                name="Humidity"
                unit="%"
              />
              <ZAxis type="number" range={[64]} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter
                name="Temperature vs Humidity"
                data={getChartData()}
                fill="#8884d8"
              />
            </ScatterChart>
          </div>
        </div>
        <div className="data-list">
          <h2>Data</h2>
          <div className="list-header">
            <span>Date</span>
            <span>City</span>
            <span>Temperature</span>
            <span>Precipitation</span>
            <span>Wind Speed</span>
            <span>Humidity</span>
          </div>
          <List
            height={300}
            itemCount={filteredData.length}
            itemSize={35}
            width="100%"
            onItemsRendered={({ visibleStartIndex, visibleStopIndex }) => {
              setVisibleRange({
                start: visibleStartIndex,
                end: visibleStopIndex,
              });
            }}
          >
            {Row}
          </List>
        </div>
      </main>
    </div>
  );
}

export default App;
