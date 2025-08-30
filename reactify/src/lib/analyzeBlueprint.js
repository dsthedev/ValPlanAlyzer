// utils/analyzeBlueprint.js
export const parsePieces = (fileContent) => {
  // Use regular expression to handle different types of line breaks
  const lines = fileContent.split(/\r?\n/);
  
  // Trim and compare line with "#Pieces"
  const piecesIndex = lines.findIndex((line) => line.trim() === "#Pieces");

  if (piecesIndex === -1) return []; // If not found, return an empty array
  
  // Process the lines after "#Pieces"
  return lines
    .slice(piecesIndex + 1)
    .filter((line) => line && !line.startsWith("#")) // Exclude lines that start with "#"
    .map((line) => line.split(";")[0].trim()); // Extract the piece name
};


export const getResourcesForPiece = (prefabData, pieceName) => {
  const entry = prefabData[pieceName] || prefabData[pieceName.toLowerCase()];
    console.log(entry)

  if (!entry) return null;

  return entry.resource_cost || entry.resources || {}; // Depending on the structure of your prefab data
};

export const analyzeBlueprint = (fileContent, prefabData) => {
  const pieces = parsePieces(fileContent);
  const pieceCounts = pieces.reduce((counts, piece) => {
    counts[piece] = (counts[piece] || 0) + 1;
    return counts;
  }, {});

  const resourceCounts = Object.entries(pieceCounts).reduce((counts, [piece, count]) => {
    const resources = getResourcesForPiece(prefabData, piece);
    console.log(resources)
    if (resources) {
      for (const [resource, amount] of Object.entries(resources)) {
        counts[resource] = (counts[resource] || 0) + amount * count;
      }
    }
    return counts;
  }, {});

  return { pieceCounts, resourceCounts };
};
