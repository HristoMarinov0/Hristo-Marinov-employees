import "./App.css";
import { useState } from "react";
import { parseCsvFile } from "./utils/readCsv";
import { divideEmployeesByProject, getLongestPair } from "./utils/pairsHelpers";
import { PairTable } from "./components/PairTable";

function App() {
  const [longestPair, setLongestPair] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = async (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split(".").pop();

    if (fileExtension !== "csv") {
      setError("Please upload CSV file!");
      return;
    }
    try {
      setIsLoading(true);
	  setError(null);
      const parsedCsvFile = await parseCsvFile(file);

      const dividedByProject = divideEmployeesByProject(parsedCsvFile);

      const longestPairData = getLongestPair(dividedByProject);

      setLongestPair(longestPairData);
    } catch (e) {
      setError(e.message)
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="App">
      <h2>Please upload a CSV File</h2>
      <div>
      <label htmlFor="file" className="file-label">
          <input type="file" name="file" id="file" onChange={onChange} />
        </label>
      </div>
	  {longestPair && <PairTable pairTableData={longestPair}/>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default App;
