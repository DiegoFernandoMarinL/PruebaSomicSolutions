let numFact = document.querySelector("#numFact");
let fechaToday = document.querySelector("#fecha");
let fechaVenc = document.querySelector("#fechaVenc")

// Numerp de factura
const fetchNumFact = async () => {
    try {
      const response = await fetch('http://localhost:5000/numFact');
      const data = await response.json(); 
      let numberFact = data[0].numFact+1;           
      numFact.textContent = numberFact;
    } catch (error) {
      console.error('Error al obtener el numero de factura', error);
    }
  };
  fetchNumFact();

// Fecha actual
const today = new Date();
const formattedDate = `${today.getDate().toString().padStart(2, '0')}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getFullYear()}`;
fechaToday.textContent = formattedDate; 

// Fecha vencimiento
const vencimiento = new Date(today);
vencimiento.setDate(vencimiento.getDate() + 10);
const formattedVencimiento = `${vencimiento.getDate().toString().padStart(2, '0')}-${(vencimiento.getMonth() + 1).toString().padStart(2, '0')}-${vencimiento.getFullYear()}`;
fechaVenc.textContent = formattedVencimiento;