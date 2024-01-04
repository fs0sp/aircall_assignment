
export const useArchiveCall = () => {

  const archiveCall = async(payload) => {
    const { id, data } = payload;
    
    try {
      const response = await fetch("https://cerulean-marlin-wig.cyclic.app/activities/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update call. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating call:", error.message);
    }
  }

  return { archiveCall };

}