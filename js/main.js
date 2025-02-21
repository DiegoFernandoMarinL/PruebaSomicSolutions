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
let totalVen = document.querySelector("#totalVen");
let totalCost = document.querySelector("#totalCost");
let section3 = document.querySelector("#section3");
let buttonAgre = document.querySelector("#buttonAgre");
let formMain = document.querySelector("#formMain");
let buttonSave = document.querySelector("#buttonSave");

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
              cupo.textContent = nitCup;
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
                if (selectNat.value == "1"){
                  cost.value = artCos;
                  cost.disabled = false;
                  preVenta.value = 0;
                  preVenta.disabled = true;
                }else{
                  cost.value = artCos;
                  cost.disabled = true;
                  preVenta.value = artPreV;
                  preVenta.disabled = false;
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

// total venta y total costos
section3.addEventListener("change", function() {
  totalVen.textContent = uni.value * preVenta.value;
  totalCost.textContent = uni.value * cost.value;
})

// boton agregar
let dataAgre = [];
formMain.addEventListener('submit', function(event) {
  let labels = document.querySelectorAll("#formMain label.custom-label");
  let selects = document.querySelectorAll("#formMain select");
  let inputs = document.querySelectorAll("#formMain input");
  let valido = true;
  inputs.forEach(input => {
      if (input.value === "") {
          valido = false;
      }
  });
  selects.forEach(select => {
      if (select.value === "0" || select.value === "----") {
          valido = false;
      }
  });
  labels.forEach(label => {
      if (label.textContent.trim() === "----") {
          valido = false;
      }
  });

  if (!valido) {
      alert("Ningún campo puede tener el valor '----' o vacio. Por favor, complete los datos.");
      event.preventDefault();
  }else{
    if (selectNat.value == "2" && preVenta.value < cost.value) {
      alert("El precio de venta no puede ser menor al costo");
      event.preventDefault();
    } else {
      let newObj =
        {
          "Numfactura": numFact.textContent,
          "NitCli": selectNitCli.value,
          "ArtCod": selectCodArt.value,
          "ArtNom": nomArt.textContent,
          "NatCod": selectNat.value,
          "Uni": uni.value,
          "PreVen": preVenta.value,
          "Cost": cost.value,
          "TotalVen": totalVen.textContent,
          "TotalCos": totalCost.textContent
        }
      dataAgre.push(newObj);
      llenarTabla(dataAgre);
      alert("Producto agregado exitosamente");
      event.preventDefault();
      // Resetear formulario
      document.getElementById("opcionesArt").value = "0";
      document.getElementById("nomArt").textContent = "----";
      document.getElementById("lab").textContent = "----";
      document.getElementById("opcionesNat").value = "0";
      document.getElementById("sal").textContent = "----";
      document.getElementById("uni").value = "";
      document.getElementById("cost").value = "";
      document.getElementById("preVenta").value = "";
      document.getElementById("totalVen").textContent = "----";
      document.getElementById("totalCost").textContent = "----";
    }
  }
})

// tabla
function llenarTabla(dataAgre) {
  const tbody = document.querySelector("#Tabla tbody");
  tbody.innerHTML = "";
  dataAgre.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.NitCli}</td>
          <td>${item.ArtCod}</td>
          <td>${item.ArtNom}</td>
          <td>${item.NatCod}</td>
          <td>${item.Uni}</td>
          <td>${item.PreVen}</td>
          <td>${item.Cost}</td>
          <td>${item.TotalVen}</td>
          <td>${item.TotalCos}</td>
      `;
      tbody.appendChild(row);
  });
}

buttonSave.addEventListener('click', function() {

  const fetchSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/factura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataAgre)
      });
      console.log(dataAgre)
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }     
      alert("Factura guardada exitosamente");
    } catch (error) {
      console.error('Error al guardar la factura', error);
    }
  };
  fetchSave();
})