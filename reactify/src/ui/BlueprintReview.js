import { useEffect, useState } from "react";
import reviewing from "../images/reviewing.jpg";
import { validateBlueprintFile } from "../lib/validators";
import { parseMetadata } from "../lib/parseMetadata";

export const BlueprintReview = ({ fileContent, onClearFile }) => {
  const [validationError, setValidationError] = useState(null);
  const [metadata, setMetadata] = useState(null);

  // Validate and parse metadata when fileContent changes
  useEffect(() => {
    const { isValid, errorMessage } = validateBlueprintFile(fileContent);
    if (isValid) {
      const parsedMetadata = parseMetadata(fileContent);
      setMetadata(parsedMetadata);
    } else {
      setValidationError(errorMessage);
    }
  }, [fileContent]);

  return (
    <section
      className="spotlight style1 orient-left content-align-left image-position-center onscroll-image-fade-in"
      id="upload"
    >
      <div className="content">
        <h2>Review Blueprint</h2>

        {validationError ? (
          <p className="error">{validationError}</p>
        ) : (
          <ul className="alt">
            <li>
              <strong>Name:</strong> {metadata?.name}
            </li>
            <li>
              <strong>Category:</strong> {metadata?.category}
            </li>
            <li>
              <strong>Description:</strong> {metadata?.description}
            </li>
            <hr />
            <ul className="actions fit">
              <li>
                <button className="button small" onClick={onClearFile}>
                  Clear File
                </button>
              </li>
            </ul>
          </ul>
        )}

      </div>
      <div className="image">
        <img
          src={reviewing}
          alt="A bookshelf to represent reviewing, or something"
        />
      </div>
    </section>
  );
};
