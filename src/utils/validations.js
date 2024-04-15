export const isEmptyString = (data) => {
    return (
        data === '' || 
        data === undefined || 
        data === null
    );
}


export const titleCase = (str) => {
    return str.toLowerCase().split(' ').map(function(word) {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}