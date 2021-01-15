const canvas = document.getElementById('canvas');
const range = document.getElementById('range');
const vetorLabel = document.getElementById('vetorOriginal');
const resultado = document.getElementById("resultado");
const labelTempo = document.getElementById('labelTempo');
const speedButton = document.getElementById('speed');

let array = [];
let graph = null;
let speed = 0;
let isRun = false;

(function inil() {
    canvas.width = 2 * canvas.width;
    canvas.height = 2 * canvas.height;
    graph = new Graph(
        canvas.getContext('2d'),
        canvas.width,
        canvas.height
    );
    reset();
})();

function start(btn) {
    
    isRun = true;
    speed = speedButton.value;
    btn.disabled = true;
    const startTime = Date.now();
    
    
    mergeSort(array, 0, array.length - 1).then(() => {
        
        resultado.innerText = "[" + array + "]";
        
    }).catch((e) => {
        
        resultado.innerText = e;
        reset();
        
    }).finally(() => {
        
        btn.disabled = false;
        labelTempo.innerText = (Date.now() - startTime) + " ms";
        isRun = false;
        
    });
}

function reset() {
    array = [];
    
    if(isRun === true) {
        isRun = false;
        return;
    }
    
    for(let i = 1; i <= range.value; i++) {
        array.push(i);
    }
    
    shuffle(array);
    
    vetorOriginal.innerText = "[" + array + "]";
    resultado.innerText = "";
    labelTempo.innerText = "";
    
    graph.drawRects(array);
}

function shuffle(vetor){
	
   const n = vetor.length;
  
   for(let i = (n-1); i>0; i--){
	
       let j = Math.floor(Math.random() * (i+1));
		
       let aux = vetor[i];
       vetor[i] = vetor[j];
       vetor[j] = aux;
    }
}

async function sleep(ms) {
    let time = 0;
    do {
        await new Promise(r => setTimeout(r, 1));
        time += 1;
    } while(time < ms);
}

/*
 *
 * **** Algoritmo Merge Sort *****
 *
*/

async function mergeSort(vetor, start, end){
    
   if(start < end && isRun === true){
      const middle = Math.floor((start + end)/2);
      await mergeSort(vetor,start,middle);
      await mergeSort(vetor,middle+1,end);
      await merge(vetor,start,middle,end);
   }
}

async function merge(vetor,start,middle,end){
	
   const ms = (speed === "max") ? 0 : 400 / speed;
   
   const sizeLeft = middle - start + 1;
   const sizeRight = end - middle;
   const l = [];
   const r = [];
	
   let indexL = 0;
   let indexR = 0;
   let k = start;
   
    if(isRun === false) {
        throw("concelado!");
    }
	
   for(let i = 0; i < sizeLeft; i++)
      l[i] = vetor[start + i];
	
   for(let j = 0; j < sizeRight; j++)
      r[j] = vetor[middle + 1 + j];
	
   while(indexL < sizeLeft && indexR < sizeRight){
      if(l[indexL] < r[indexR]){
         vetor[k] = l[indexL];
         indexL++;
      }else{
         vetor[k] = r[indexR];
         indexR++;
      }
      k++;
      
      if(isRun === false) {
        throw("concelado!");
      }
      
      graph.drawRects(vetor);
      await sleep(ms);
   }
	
   while(indexL < sizeLeft){
      vetor[k] = l[indexL];
      indexL++;
      k++;
      
      if(isRun === false) {
        throw("concelado!");
      }
      graph.drawRects(vetor);
      await sleep(ms);
      
   }
	
   while(indexR < sizeRight){
      vetor[k] = r[indexR];
      indexR++;
      k++;
      
      if(isRun === false) {
        throw("concelado!");
      }
      graph.drawRects(vetor);
      await sleep(ms);
   }
}