let views = [];
for(let i=0; i<10; i++){
  let temp = [];
  for(let j=1; j<11; j++){
    temp.push(10*i + j);
  }
  views.push(temp)
}
export default views;