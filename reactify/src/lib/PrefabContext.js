import { createContext, useContext, useState, useEffect } from 'react';

// Create context to provide prefab data globally
export const PrefabContext = createContext();

// Hook to access prefab data
export const usePrefab = () => {
  return useContext(PrefabContext);
};

export const PrefabProvider = ({ children }) => {
  const [prefabs, setPrefabs] = useState(null); // Stores the prefab data
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    // Check if the prefab data is already set, otherwise proceed to fetch
    // if (prefabs !== null) return; // Prevent refetching if prefabs are already set

    const fetchPrefabList = async () => {
      try {
        // First attempt: Fetch from GitHub
        const response = await fetch(
          'https://gist.githubusercontent.com/dsthedev/2beea417f614975d68fd2c2ded3c6baf/raw/0728213d50a9a8c19885ad3a2af879d8a47c365b/all_pieces_and_recipes.json'
        );
        if (!response.ok) {
          throw new Error('GitHub URL failed.');
        }
        const data = await response.json();
        setPrefabs(data);  // Store the data from GitHub
        // console.log('Prefab data loaded from GitHub:', data);
      } catch (err) {
        // If GitHub fetch fails, try the fallback (local JSON)
        console.error('GitHub fetch failed, attempting fallback:', err);
        setError(err.message); // Set error message
        try {
          const fallbackResponse = await fetch('/all_pieces_and_recipes.json'); // Local fallback file
          const fallbackData = await fallbackResponse.json();
          setPrefabs(fallbackData);  // Store the fallback data
          console.log('Fallback prefab data loaded from local JSON:', fallbackData);
        } catch (fallbackErr) {
          setError(`Both fetches failed: ${fallbackErr.message}`);
        }
      }
    };

    fetchPrefabList();
  }, []); // Adding prefabs as a dependency, but only fetch if prefabs is null

  return (
    <PrefabContext.Provider value={{ prefabs, error }}>
      {children} {/* This will pass the data to the rest of your app */}
    </PrefabContext.Provider>
  );
};
