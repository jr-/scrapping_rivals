const jsonExample = { name: 'COREY\nGIBBS',
  rank: '99',
  position: 'PF',
  location: 'Lithonia, GA\nRedan',
  commitCollege: 'Georgia\n7/9/03\nSIGNED' };

console.log(jsonExample);

jsonExample.name = jsonExample.name.replace(/\n/g, ' ');
jsonExample.location = jsonExample.location.replace(/\n/g, ' ');
const charPos = jsonExample.commitCollege.indexOf('\n');
console.log(charPos);
if (charPos > 0) {
    jsonExample.commitCollege = jsonExample.commitCollege.substring(0, charPos);
}


console.log(jsonExample);


// format text
  // name \n => espaço
  // location \n => espaço
  // commitCollege pegar até a primeira \