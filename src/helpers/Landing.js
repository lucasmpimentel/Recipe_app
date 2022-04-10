const landing = (ingredients, landingIngs, setFinishButtonDisabled) => {
  // console.log('dentro do landing');
  // console.log(ingredients?.length);
  // console.log(landingIngs?.length);
  if (ingredients?.length === landingIngs.length
      && ingredients.length !== 0 && landingIngs.length !== 0) {
    // console.log('dentro do false do landing');
    return setFinishButtonDisabled(false);
  }
  return setFinishButtonDisabled(true);
};

export default landing;
