export const combineClasses = (...classes: string | any): any => {
  let result = {};

  for (const c of classes) {
    if (typeof c === 'string') {
      result = { ...result, [c]: true };
    } else {
      result = { ...result, ...c };
    }
  }


  return result;
};
