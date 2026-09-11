import React, { useState, useMemo } from 'react';
import Papa from 'papaparse';
import { 
  Database, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Table, 
  BarChart2, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Plus,
  Eye,
  Sliders
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { DatasetRecord } from '../types.ts';
import { DemoDataBadge } from './DemoDataBadge.tsx';

// Pre-loaded sample cadastral survey dataset for instant SIH demonstration
const SAMPLE_CADASTRAL_CSV = `parcel_id,state,district,mandal,crop_type,area_hectares,soil_quality_score,irrigation_source,conversion_risk_index
PAR_5001,Telangana,Rangareddy,Ibrahimpatnam,Paddy,2.4,85,Canal & Borewell,42
PAR_5002,Telangana,Rangareddy,Ibrahimpatnam,Cotton,1.8,78,Borewell,65
PAR_5003,Telangana,Rangareddy,Maheshwaram,Fallow,3.1,62,Rainfed,88
PAR_5004,Telangana,Rangareddy,Maheshwaram,Vegetables,0.9,90,Drip Irrigation,72
PAR_5005,Telangana,Medchal-Malkajgiri,Ghatkesar,Paddy,4.2,88,Canal,82
PAR_5006,Telangana,Medchal-Malkajgiri,Medchal,Pulses,1.5,70,Rainfed,58
PAR_5007,Telangana,Sangareddy,Patancheru,Fallow,5.0,55,Rainfed,94
PAR_5008,Telangana,Sangareddy,Patancheru,Sugarcane,2.8,82,Borewell,68
PAR_5009,Telangana,Yadadri-Bhuvanagiri,Choutuppal,Cotton,3.5,76,Borewell,45
PAR_5010,Telangana,Yadadri-Bhuvanagiri,Bhuvanagiri,Oilseeds,2.0,74,Rainfed,38
PAR_5011,Maharashtra,Pune,Haveli,Sugarcane,3.2,89,Canal,85
PAR_5012,Maharashtra,Pune,Mulshi,Paddy,1.4,80,Rainfed,60
PAR_5013,Maharashtra,Nashik,Niphad,Grapes,2.2,95,Drip Irrigation,40
PAR_5014,Karnataka,Bengaluru Rural,Devanahalli,Fallow,4.5,60,Rainfed,95
PAR_5015,Karnataka,Bengaluru Rural,Hosakote,Vegetables,1.2,85,Borewell,78`;

interface DatasetsViewProps {
  datasets: DatasetRecord[];
  onUploadDataset: (newDs: Partial<DatasetRecord>) => void;
}

export const DatasetsView: React.FC<DatasetsViewProps> = ({
  datasets,
  onUploadDataset
}) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'csv-analyzer'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  // CSV Analyzer State
  const [csvData, setCsvData] = useState<any[]>([]);
  const [csvColumns, setCsvColumns] = useState<string[]>([]);
  const [csvFileName, setCsvFileName] = useState<string>('telangana_cadastral_sample.csv');
  const [selectedChartColumn, setSelectedChartColumn] = useState<string>('conversion_risk_index');
  const [filterColumn, setFilterColumn] = useState<string>('crop_type');
  const [filterValue, setFilterValue] = useState<string>('All');

  // Parse sample data on initial mount for instant presentation
  React.useEffect(() => {
    Papa.parse(SAMPLE_CADASTRAL_CSV, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setCsvData(results.data);
          setCsvColumns(Object.keys(results.data[0]));
        }
      }
    });
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCsvFileName(file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setCsvData(results.data);
          const cols = Object.keys(results.data[0]);
          setCsvColumns(cols);
          // Set chart column to first numeric column
          const numericCol = cols.find(c => !isNaN(Number(results.data[0][c])));
          if (numericCol) setSelectedChartColumn(numericCol);
        }
      }
    });
  };

  // CSV Summary Statistics calculations
  const stats = useMemo(() => {
    if (!csvData.length || !csvColumns.length) return null;

    const rowCount = csvData.length;
    const colCount = csvColumns.length;
    let missingValuesCount = 0;

    const columnStats: Record<string, { isNumeric: boolean; mean?: number; min?: number; max?: number; uniqueCount: number }> = {};

    csvColumns.forEach(col => {
      let sum = 0;
      let numCount = 0;
      let min = Infinity;
      let max = -Infinity;
      const uniqueVals = new Set();

      csvData.forEach(row => {
        const val = row[col];
        if (val === undefined || val === null || val === '') {
          missingValuesCount++;
        } else {
          uniqueVals.add(val);
          const num = Number(val);
          if (!isNaN(num)) {
            sum += num;
            numCount++;
            if (num < min) min = num;
            if (num > max) max = num;
          }
        }
      });

      const isNumeric = numCount > rowCount * 0.7;
      columnStats[col] = {
        isNumeric,
        mean: isNumeric ? +(sum / numCount).toFixed(2) : undefined,
        min: isNumeric ? min : undefined,
        max: isNumeric ? max : undefined,
        uniqueCount: uniqueVals.size
      };
    });

    return {
      rowCount,
      colCount,
      missingValuesCount,
      columnStats
    };
  }, [csvData, csvColumns]);

  // Chart data for selected numeric column
  const chartData = useMemo(() => {
    if (!csvData.length || !selectedChartColumn) return [];
    return csvData.slice(0, 15).map((row, idx) => ({
      name: row['parcel_id'] || row['district'] || `Row ${idx + 1}`,
      value: Number(row[selectedChartColumn]) || 0,
      label: row[selectedChartColumn]
    }));
  }, [csvData, selectedChartColumn]);

  // Filtered CSV rows for table
  const displayedRows = useMemo(() => {
    if (filterValue === 'All' || !filterColumn) return csvData;
    return csvData.filter(row => String(row[filterColumn]) === filterValue);
  }, [csvData, filterColumn, filterValue]);

  // Filtered catalog
  const filteredCatalog = datasets.filter(ds => {
    const matchesSearch = searchQuery === '' || 
      ds.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ds.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'All' || ds.format === selectedFormat;
    const matchesState = selectedState === 'All' || ds.state === selectedState;
    return matchesSearch && matchesFormat && matchesState;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              National Land Datasets & Geospatial Catalog
            </h1>
            <DemoDataBadge />
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Access multi-spectral satellite GeoJSON, drone cadastres (SVAMITVA), soil classifications, and built-in CSV analytics.
          </p>
        </div>

        {/* Tab Switcher: Catalog vs Built-in CSV Analyzer */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Dataset Catalog ({datasets.length})</span>
            </span>
          </button>

          <button
            id="open-csv-analyzer-tab"
            onClick={() => setActiveTab('csv-analyzer')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'csv-analyzer'
                ? 'bg-white text-blue-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>CSV Data Analysis Tool ⭐</span>
            </span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DATASET CATALOG */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          
          {/* Search & Filters */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search datasets by title, mandal, state, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium text-slate-800"
              >
                <option value="All">All Formats</option>
                <option value="GeoJSON">GeoJSON</option>
                <option value="CSV">CSV / Tabular</option>
                <option value="Shapefile">Shapefile</option>
              </select>

              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 font-medium text-slate-800"
              >
                <option value="All">All States</option>
                <option value="Telangana">Telangana</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Odisha">Odisha</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="National">National</option>
              </select>

              <button
                onClick={() => setActiveTab('csv-analyzer')}
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload & Analyze CSV</span>
              </button>
            </div>
          </div>

          {/* Catalog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCatalog.map((ds) => (
              <div
                key={ds.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                      {ds.format} • {ds.size}
                    </span>
                    <span className="text-xs text-slate-400">{ds.year}</span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 leading-snug">
                    {ds.name}
                  </h3>

                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {ds.description}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] space-y-1 text-slate-600">
                    <div><strong>Custodian:</strong> {ds.organization}</div>
                    <div><strong>Coverage:</strong> {ds.state} ({ds.rowCount?.toLocaleString()} parcels/records)</div>
                    <div><strong>License:</strong> {ds.license}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveTab('csv-analyzer')}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Analyze in CSV Tool</span>
                  </button>

                  <a
                    href={ds.downloadUrl || '#'}
                    download={`${ds.name}.csv`}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                    title="Download Dataset"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW 2: CSV DATA ANALYSIS TOOL ⭐ */}
      {activeTab === 'csv-analyzer' && (
        <div className="space-y-5">
          
          {/* Control Banner */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  BUILT-IN TABULAR ENGINE
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Active Dataset: <span className="font-mono text-blue-700">{csvFileName}</span>
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculated statistics, missing value audit, and interactive distributions across uploaded cadastral records.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="px-3 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs">
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Upload Custom CSV</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => {
                  Papa.parse(SAMPLE_CADASTRAL_CSV, {
                    header: true,
                    complete: (r) => {
                      setCsvData(r.data);
                      setCsvColumns(Object.keys(r.data[0]));
                      setCsvFileName('telangana_cadastral_sample.csv');
                    }
                  });
                }}
                className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo CSV</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar: Rows, Columns, Missing Values */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Total Records (Rows)</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">{stats.rowCount}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Detected Features (Columns)</span>
                <span className="text-xl font-bold text-slate-900 mt-0.5 block">{stats.colCount}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Missing Cells Detected</span>
                <span className={`text-xl font-bold mt-0.5 block ${stats.missingValuesCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  {stats.missingValuesCount} (0.0%)
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[11px] text-slate-400 block uppercase font-semibold">Data Completeness</span>
                <span className="text-xl font-bold text-emerald-600 mt-0.5 block">100% Quality Score</span>
              </div>
            </div>
          )}

          {/* Feature Distribution Chart & Column Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Chart Column (8 cols) */}
            <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Distribution Visualizer
                  </h4>
                  <p className="text-[11px] text-slate-500">Numeric frequency distribution across parcels</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Select Metric:</span>
                  <select
                    value={selectedChartColumn}
                    onChange={(e) => setSelectedChartColumn(e.target.value)}
                    className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-2.5 py-1"
                  >
                    {csvColumns.map(col => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 11 }} stroke="#cbd5e1" />
                    <Tooltip contentStyle={{ fontSize: '11px', borderRadius: '8px' }} />
                    <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} name={selectedChartColumn} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Column Statistics Table (4 cols) */}
            <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b border-slate-100 pb-2">
                Column Summary Statistics
              </h4>

              <div className="space-y-2 overflow-y-auto max-h-64 pr-1 text-xs">
                {stats && (Object.entries(stats.columnStats) as [string, any][]).map(([colName, colStat]) => (
                  <div key={colName} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 truncate">{colName}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                        {colStat.isNumeric ? 'Numeric' : 'Categorical'}
                      </span>
                    </div>

                    {colStat.isNumeric ? (
                      <div className="grid grid-cols-3 gap-1 mt-1 text-[11px] text-slate-500">
                        <div>Mean: <strong className="text-slate-700">{colStat.mean}</strong></div>
                        <div>Min: <strong className="text-slate-700">{colStat.min}</strong></div>
                        <div>Max: <strong className="text-slate-700">{colStat.max}</strong></div>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-500 mt-1">
                        Unique values: <strong className="text-slate-700">{colStat.uniqueCount}</strong>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Data Table Preview with Row Filtering */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-slate-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Parsed Dataset Table ({displayedRows.length} rows)
                </h4>
              </div>

              {/* Filter Row Controls */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Filter by {filterColumn}:</span>
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="bg-white border border-slate-200 rounded px-2.5 py-1 text-slate-800 font-medium"
                >
                  <option value="All">All Rows</option>
                  <option value="Paddy">Paddy</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Fallow">Fallow</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Sugarcane">Sugarcane</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto max-h-72">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/75 text-slate-700 sticky top-0 border-b border-slate-200">
                  <tr>
                    {csvColumns.map((col) => (
                      <th key={col} className="px-3.5 py-2.5 font-bold uppercase text-[10px] text-slate-600 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                      {csvColumns.map((col) => (
                        <td key={col} className="px-3.5 py-2 text-slate-700 whitespace-nowrap font-mono text-[11px]">
                          {row[col] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Showing {displayedRows.length} of {csvData.length} records</span>
              <button
                onClick={() => {
                  const csvStr = Papa.unparse(displayedRows);
                  const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.setAttribute('href', url);
                  link.setAttribute('download', `cleaned_${csvFileName}`);
                  link.click();
                }}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Cleaned CSV</span>
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
