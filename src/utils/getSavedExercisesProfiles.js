const getSavedExercises = () => {
  const savedExercises = localStorage.getItem("exercisesProfiles");
  if (savedExercises) {
    try {
      return JSON.parse(savedExercises);
    } catch (err) {}
  }
  return {};
};

export default getSavedExercises;
