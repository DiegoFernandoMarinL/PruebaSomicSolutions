let numFact = document.querySelector("#numFact");
let fechaToday = document.querySelector("#fecha");
let fechaVenc = document.querySelector("#fechaVenc");
let selectNitCli = document.querySelector("#opcionesCli");
let nom = document.querySelector("#nom")
let cupo = document.querySelector("#cupo");
let plazo = document.querySelector("#plazo");
let selectCodArt = document.querySelector("#opcionesArt");
let nomArt = document.querySelector("#nomArt");
let lab = document.querySelector("#lab");

// Numero de factura
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

// Nit del cliente
const fetchNitDoc = async () => {
    try {
      const response = await fetch('http://localhost:5000/cliente');
      const data = await response.json(); 

      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.NitDoc;
        option.textContent = item.NitDoc;
        selectNitCli.appendChild(option);
      });
    } catch (error) {
      console.error('Error al obtener los nit de clientes', error);
    }
  };
  fetchNitDoc();

// Carga de datos del cliente
selectNitCli.addEventListener("change", function(){
    const doc = this.value;
    const fetchcli = async () => {
        try {
          const response = await fetch(`http://localhost:5000/cliente/${doc}`);
          const data = await response.json(); 
          let nitNom = data[0].NitNom;          
          let nitCup = data[0].NitCup;
          let nitPla = data[0].NitPla;
          nom.textContent = nitNom;
          cupo.textContent = `$ ${nitCup}`;
          plazo.textContent = nitPla;

          // Fecha vencimiento
          const vencimiento = new Date(today);
          vencimiento.setDate(vencimiento.getDate() + nitPla);
          const formattedVencimiento = `${vencimiento.getDate().toString().padStart(2, '0')}-${(vencimiento.getMonth() + 1).toString().padStart(2, '0')}-${vencimiento.getFullYear()}`;
          fechaVenc.textContent = formattedVencimiento;
        } catch (error) {
          console.error('Error al obtener el codigo del articulo', error);
        }
      };
    fetchcli();
});

// Codigo del articulo
const fetchCodArt = async () => {
    try {
      const response = await fetch('http://localhost:5000/articulo');
      const data = await response.json(); 

      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ArtCod;
        option.textContent = item.ArtCod;
        selectCodArt.appendChild(option);
      });
    } catch (error) {
      console.error('Error al obtener los codigos de articulo', error);
    }
  };
  fetchCodArt();

// Carga datos del articulo
selectCodArt.addEventListener("change", function(){
    const cod = this.value;
    const fetchcli = async () => {
        try {
          const response = await fetch(`http://localhost:5000/articulo/${cod}`);
          const data = await response.json(); 
          let artNom = data[0].ArtNom;          
          let artLab = data[0].ArtLab;
          nomArt.textContent = artNom;
          lab.textContent = artLab;
        } catch (error) {
          console.error('Error al obtener el codigo del articulo', error);
        }
      };
    fetchcli();
});