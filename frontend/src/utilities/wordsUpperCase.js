const wordsToExclude = ['id', 'example', 'test'];

const wordsUpperCase = input => {
  if (!input) {
    return '';
  }
  
  return input
    .replace(/[^a-zA-Z0-9\s]/g, ' ')  
    .split(' ')                        
    .filter(word => word.length > 0 && !wordsToExclude.includes(word.toLowerCase()))  
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
    .join(' ');
}

export default wordsUpperCase;