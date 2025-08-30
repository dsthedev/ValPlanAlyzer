export const validateBlueprintFile = (fileContent) => {
  // Check if the file content exists
  if (!fileContent) return { isValid: false, errorMessage: "No file content." };

  // Split the content by lines
  const lines = fileContent.split("\n");

  // Check for required metadata
  const metadataSections = ['#Name', '#Creator', '#Description', '#Category'];
  let missingMetadata = metadataSections.filter(section => 
    !lines.some(line => line.startsWith(section))
  );

  if (missingMetadata.length > 0) {
    return { isValid: false, errorMessage: `Missing metadata: ${missingMetadata.join(", ")}` };
  }

  // Check if '#Pieces' section exists
  if (!lines.some(line => line.startsWith('#Pieces'))) {
    return { isValid: false, errorMessage: "Missing #Pieces section." };
  }

  return { isValid: true };
};
