let numFact = document.querySelector("#numFact");
let fechaToday = document.querySelector("#fecha");

// Numerp de factura
const fetchNumFact = async () => {
    try {
      const response = await fetch('http://localhost:5000/numFact');
      const data = await response.json(); 
      let numberFact = data[0].numFact;           
      numFact.textContent = numberFact;
    } catch (error) {
      console.error('Error al obtener el numero de factura', error);
    }
  };
  fetchNumFact();

// Fecha actuall
fechaToday.textContent = new Date().toISOString().split('T')[0];  