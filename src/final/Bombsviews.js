let Bombsviews = [];
for(let i=0; i<10; i++){
  let temp = [];
  for(let j=1; j<11; j++){
    temp.push({id: 10*i + j, status: 'close'});
  }
  Bombsviews.push(temp)
}
export default Bombsviews;