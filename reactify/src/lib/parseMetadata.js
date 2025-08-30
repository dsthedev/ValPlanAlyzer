export const parseMetadata = (fileContent) => {
  const lines = fileContent.split("\n");

  let metadata = {
    name: "",
    creator: "",
    description: "",
    category: "",
  };

  lines.forEach((line) => {
    if (line.startsWith("#Name:")) {
      metadata.name = line.split(":")[1].trim();
    }
    if (line.startsWith("#Creator:")) {
      metadata.creator = line.split(":")[1].trim();
    }
    if (line.startsWith("#Description:")) {
      metadata.description = line.split(":")[1].trim().replace(/^"|"$/g, ""); // Clean quotes
    }
    if (line.startsWith("#Category:")) {
      metadata.category = line.split(":")[1].trim();
    }
  });

  return metadata;
};
