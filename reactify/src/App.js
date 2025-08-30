import { useContext, useEffect, useState } from "react";
import { PrefabContext } from "./lib/PrefabContext";
import "./App.css";
import { IntroBanner } from "./ui/IntroBanner";
import { UploadSection } from "./ui/UploadSection";
import { BlueprintReview } from "./ui/BlueprintReview";
import smoothScroll from "./lib/smoothscroll";
import AnalysisReport from "./ui/AnalysisReport";

function App() {
  const { prefabs, error } = useContext(PrefabContext);
  const [uploadedFileContent, setUploadedFileContent] = useState(null); // State to hold the uploaded file content

  // Function to handle the file content
  const handleFileUpload = (fileContent) => {
    setUploadedFileContent(fileContent); // Set the uploaded file content
  };

  // useEffect(() => {
  //   if (uploadedFileContent) {
  //     // Smooth scroll to blueprint review only after content is set
  //     smoothScroll("#blueprintreview");
  //   }
  // }, [uploadedFileContent]); // Dependency array ensures this only runs after content is updated

  const handleClearFile = () => {
    setUploadedFileContent(null); // Clear the file content state
  };

  return (
    <div id="wrapper" className="divided">
      <IntroBanner />

      <UploadSection onFileUpload={handleFileUpload} />
      
      {uploadedFileContent && (
        <>
          <BlueprintReview
            fileContent={uploadedFileContent}
            onClearFile={handleClearFile}
          />
          <AnalysisReport fileContent={uploadedFileContent} />
        </>
      )}
    </div>
  );
}

export default App;