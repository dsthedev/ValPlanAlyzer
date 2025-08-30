import { useState } from "react";
import { useContext } from "react";
import { PrefabContext } from "../lib/PrefabContext"; // Import the context
import { analyzeBlueprint } from "../lib/analyzeBlueprint"; // Import analyze function

const AnalysisReport = ({ fileContent }) => {
  const [analysisResults, setAnalysisResults] = useState(null);
  const { prefabs } = useContext(PrefabContext); // Access prefab data from context

  const handleAnalysis = () => {
    if (!fileContent || !prefabs) return;

    const { pieceCounts, resourceCounts } = analyzeBlueprint(
      fileContent,
      prefabs
    );
    setAnalysisResults({ pieceCounts, resourceCounts });
  };

  return (
    <section className="wrapper style1 align-center">
      <div className="inner">
        <div className="index">
          <section>
            <header>
              <h3>Analysis</h3>
              <button className="primary large" onClick={handleAnalysis}>
                Analyze Blueprint
              </button>
            </header>

            <div className="content">
              {analysisResults && (
                <div>

                  <h4>Resource Breakdown</h4>
                  <ul>
                    {Object.entries(analysisResults.resourceCounts).map(
                      ([resource, count]) => (
                        <li key={resource}>
                          {resource}: {count}
                        </li>
                      )
                    )}
                  </ul>
                  <hr />
                  <h4>Piece Breakdown</h4>
                  <ul>
                    {Object.entries(analysisResults.pieceCounts).map(
                      ([piece, count]) => (
                        <li key={piece}>
                          {piece}: {count}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AnalysisReport;
