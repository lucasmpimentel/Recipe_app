import { useState, useEffect } from 'react';
import Context from '../context/Context';

const useReduceComplexity = () => {
  const {
    recipeDetails,
    // setFinishButtonDisabled,
  } = useContext(Context);

  const [ingredients, setIngredients] = useState([]);
  const landingIngs = recipeDetails.ingredients
    .filter((recipe) => recipe !== '')
    .filter((recipe) => recipe !== null);

  useEffect(() => {
    const getitem = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setIngredients(getitem[typeRecipe][recipeID]);
  }, [recipeDetails]);

  useEffect(() => {
    if (ingredients?.length === landingIngs.length
        && ingredients.length !== 0 && landingIngs.length !== 0) {
      const flag = false;
      return flag;
    }
    const flag = true;
    return flag;
  }, [recipeDetails]);

  //   const landing = () => {
  //     if (ingredients?.length === landingIngs.length
  //       && ingredients.length !== 0 && landingIngs.length !== 0) {
  //       return setFinishButtonDisabled(false);
  //     }
  //     return setFinishButtonDisabled(true);
  //   };
  //   landing();

  //   useEffect(() => {
  //     (async () => {
  //       setIsLoading(true);
  //       try {
  //         const response = await fetch(url);
  //         const results = await response.json();
  //         setData(results);
  //       } catch (error) {
  //         setErrorMessage(error.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }, [url]);

  //   return { data, isLoading, errorMessage };
  return { flag };
};

export default useReduceComplexity;
