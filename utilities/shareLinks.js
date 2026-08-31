export const createItriShareLink = ({
    type,
    id,
  }) => {
    if (!type) {
      throw new Error("Share type is required");
    }
  
    if (!id) {
      throw new Error("Share ID is required");
    }
  
    return `itri://${type}/${id}`;
  };

  
  export const createShareMessage = ({
    type,
    name,
    id,
  }) => {
  
    const link = createItriShareLink({
      type,
      id,
    });
  
    switch (type) {
  
      case "arena":
        return `Check out this Arena on Itri: ${name}\n\n${link}`;
  
      case "stage":
        return `Check out this Stage on Itri: ${name}\n\n${link}`;
  
      case "performance":
        return `Check out this Performance on Itri: ${name}\n\n${link}`;
  
      case "profile":
        return `Check out this profile on Itri: ${name}\n\n${link}`;
  
      default:
        return `Check this out on Itri: ${name}\n\n${link}`;
    }
  };