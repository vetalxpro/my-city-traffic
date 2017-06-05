export function makeSelector( dashedSelector: string ) {
  return dashedSelector.replace(/\-(\w)/g, ( match, par ) => {
    return par.toUpperCase();
  });
}
