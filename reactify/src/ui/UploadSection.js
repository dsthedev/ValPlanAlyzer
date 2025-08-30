import { useRef, useState } from "react";
import blueprint from "../images/blueprint.png";
import smoothScroll from "../lib/smoothscroll";

export const UploadSection = ({ onFileUpload }) => {

  // Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  // Trigger file input when button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection and pass the file content to the parent component
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Pass the file content back to parent
        onFileUpload(e.target.result);
      };
      reader.onerror = (err) => console.error("Error reading file", err);
      reader.readAsText(file); // Read the file as text
    }
  };

  return (
    <section
      className="spotlight style1 orient-right content-align-left image-position-center onscroll-image-fade-in"
      id="upload"
    >
      <div className="content">
        <h2>Upload a Blueprint</h2>
        <p>
          PlanBuild stores blueprint files in{" "}
          <code>{"[GameDirectory]/BepInEx/config/PlanBuild/blueprints"}</code>{" "}
          by default. For more information about the plugin, please check the{" "}
          <a href="https://github.com/sirskunkalot/PlanBuild/blob/master/README.md">
            documentation
          </a>
          .
        </p>
        <ul className="actions stacked">
          <li>
            <button className="large" onClick={handleButtonClick}>
              Upload Blueprint
            </button>
          </li>
        </ul>
        {/* Hidden file input */}
        <input
          type="file"
          accept=".blueprint,.txt"
          style={{ display: "none" }} // Hide file input
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className="image">
        <img src={blueprint} alt="An unfinished PlanBuild blueprint" />
      </div>
    </section>
  );
};
