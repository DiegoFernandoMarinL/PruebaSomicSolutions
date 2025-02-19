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
let sal = document.querySelector("#sal");
let selectNat = document.querySelector("#opcionesNat");
let uni = document.querySelector("#uni");
let cost = document.querySelector("#cost");
let preVenta = document.querySelector("#preVenta");

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
    if (doc != 0) {
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
    }else{
        nom.textContent = "----";
        cupo.textContent = "----";
        plazo.textContent = "----";
        fechaVenc.textContent = "----";
    }
    
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
    if (cod != "0"){
        const fetchcli = async () => {
            try {
              const response = await fetch(`http://localhost:5000/articulo/${cod}`);
              const data = await response.json(); 
              let artNom = data[0].ArtNom;          
              let artLab = data[0].ArtLab;
              let artSal = data[0].ArtSal;
              let artCos = data[0].ArtCos;
              let artPreV = data[0].ArtPve;
              // Costos
              selectNat.addEventListener("change", function(){
                const elemento = cost.querySelector("input, label");
                if (elemento) {
                  elemento.remove();
                }
                if (selectNat.value == "1"){
                  const costo = document.createElement("input");
                  costo.type = "number";
                  costo.classList.add("custom-label");
                  cost.appendChild(costo);
                  costo.value = artCos;
                  preVenta.textContent = `----`;
                }else{
                  const costo = document.createElement("label");
                  costo.classList.add("custom-label");
                  cost.appendChild(costo);
                  costo.textContent = `$ ${artCos}`;
                  preVenta.textContent = `$ ${artPreV}`;
                }  
              });
              nomArt.textContent = artNom;
              lab.textContent = artLab;
              sal.textContent = artSal;
            } catch (error) {
              console.error('Error al obtener el codigo del articulo', error);
            }
          };
        fetchcli();
    }else{
        nomArt.textContent = "----";
        lab.textContent = "----";
        sal.textContent = "----";
        cost.textContent = "----";
    }
});

// Unidades 
selectNat.addEventListener("change", function(){
    if (selectNat.value == "2"){
      if (Number(sal.textContent) < Number(uni.textContent)){
        alert("La naturaleza es negativa, las unidades no pueden exceder el saldo");
        uni.value = 0;
      }  
    }
    uni.addEventListener("input", function() {
      uni.textContent = this.value;
      if (selectNat.value == "2"){
        if (Number(sal.textContent) < Number(uni.textContent)){
          alert("La naturaleza es negativa, las unidades no pueden exceder el saldo");
          uni.value = 0;
        }  
      }
    }); 
});

