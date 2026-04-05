// Exemplo:
// haystack = 'sadbutsad' (tamanho 9 → índices de 0 a 8)
// needle   = 'sad'       (tamanho 3)

var strStr = function (haystack = 'sadbutsad', needle = 'sad') {
  // se needle for uma string vazia, retorna 0
  if (needle === '') return 0;
  let indexarray = [];
  // inicia no 0 ,condiçao i menor ou igual tamanho da palavra  - tamanho da palavra a ser encontrada, e incrementa o i

  //loop for no caso até 6 pois o tamanho do haystack é 9 e o tamanho do needle é 3, então 9 - 3 = 6

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    let j = 0;

    //console.log('i', i);
    // loop while enquanto j for menor que o tamanho da palavra ser encontrada  e a letra do palavra na posição i + j for igual a letra do needle na posição j, incrementa o j

    // menor que 3 e a haystack[1 + 0] = 'a' for igual a needle[1} =  'a' incrementa o j
    while (j < needle.length && haystack[i + j] === needle[j]) {
      j++;
      // console.log('j', j);
    }
    // se j for igual ao tamanho do needle, significa que encontramos a palavra, então adicionamos o índice i ao array de índices
    if (j === needle.length) {
      indexarray.push(i);
    }
  }

  return indexarray.length ? indexarray : -1;
};

console.log(strStr());
/**

i 0
j 1
j 2
j 3

haystack[i + j] === needle[j]
haystack[6] = 's' needle[0] = 's'
haystack[7] = 'a' needle[1] = 'a'
haystack[8] = 'd' needle[2] = 'd'

j 0 + 6 = 6
j 1 + 6 = 7
j 2 + 6 = 8

-1
*/
