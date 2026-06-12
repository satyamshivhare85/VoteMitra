export const euclideanDistance = (arr1, arr2) => {
  return Math.sqrt(
    arr1.reduce((sum, val, i) => {
      return sum + Math.pow(val - arr2[i], 2);
    }, 0)
  );
};

export const findMatchingUser = (users, incomingFace) => {
  let bestMatch = null;
  let minDistance = Infinity;

  for (const user of users) {
    for (const embedding of user.embeddings) {
      const distance = euclideanDistance(
        embedding,
        incomingFace
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = user;
      }
    }
  }

  return {
    user: bestMatch,
    distance: minDistance,
  };
};