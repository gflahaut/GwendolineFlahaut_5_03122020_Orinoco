/**
 * fonction utilisant une promesse
 *  permettant d'attendre de récupérer les produits de l'api présente dans le serveur
 * avant de continuer
 * @param  { string }   url url d'accés à l'API
 * @return { Object }   l'objet contenant les informations sur les produits
 */
//

async function apicall(url) {
    try {
      const response = await fetch(url);
      const object = response.json();
      return object;
    } catch (error) {
      alert(error)
    }   
  }
/**
 * fonction anonyme s'éxécutant au bon chargement de la page
 * @return { void }   Nothing
 */
//
(function() {
let productId= new URLSearchParams(window.location.search).get('product');
const url = 'https://gwendolineflahaut-5-03122020-serveur.onrender.com/api/teddies/'+productId;
apicall(url).then((object) => { 
    showOneTeddy(object);
})

/**
 * fonction pour amener le client au clique sur la modal vers l'index sur la liste des produits
 * @return { void } Nothing
 */
//

// btncontinue.addEventListener.onclick = function() {
//     console.log('ok');
//         document.location.href='./index.html';
//     };
document.addEventListener('click', function (event){
    if(!event.target.matches('.continue'))return;
    event.preventDefault();
    document.location.href='./index.html';
    console.log(event.target);

}, false);
/**
 * fonction pour amener le client au clique sur la modal vers le panier
 * @return { void } Nothing
 */
//
document.addEventListener('click', function (event){
    if(!event.target.matches('.addCart'))return;
    event.preventDefault();
    document.location.href='./cart.html';
    console.log(event.target);

}, false);
// document.querySelector('.addCart').addEventListener('click',function(){
//         document.location.href='./cart.html';
//     });
})(); 

/**
 * fonction pour afficher le produit surlequel on a préalablement cliqué
 * @return { void } Nothing
 */
//

function showOneTeddy(teddy){
    let container =
    `<div class="row">
        <figure class="col-md-12 center-block"> 
            <img src="${teddy.imageUrl}" class="img-responsive rounded presentation col-sm-6 center-block">
            <figcaption class="col-md-6 text-center center-block">
                <div class="invisible col-md-6">${teddy._id}</div>
                <h1 class="text-center col-md-6">${teddy.name}</h1>
                <p class="productDescription h4 col-sm-8 text-center"> description : <br>${teddy.description}</p>
                <p class="productPrice h3 col-sm-4 text-center"> prix : ${teddy.price/ 100 + "€"}</p>
                <select class="optionColors col-sm-4 text-center">
                `;
                for (let j = 0; j < teddy.colors.length; j++) {
                    container +=`<option class="optionColors">${teddy.colors[j]}</option>`;
                }
                container +=
                `</select>
                <button class="btn btn-lg btn-block cartbtn text-center" data-toggle="modal" data-target="#myModal">ajouter au panier</button>
            </figcaption>
        </figure>
    </div>`;
    document.body.innerHTML+= container+= `
    <footer class="col-md-12 block-center footer mt-auto py-3">
        <div class="text-center">
            Orinoco - 249 avenue du Président Wilson 93210 La Plaine Saint Denis
        </div>
    </footer>
    `;
    
     //ajout au panier au clic 
     document.querySelector('.cartbtn').addEventListener('click',function(){
        //stockage des infos produits dans le localstorage peu importe le nombre 
        if(localStorage.getItem('teddy_'+teddy._id)){
            let qte= localStorage.getItem('teddy_'+teddy._id+'_qte');
            qte++;
            localStorage.setItem('teddy_'+teddy._id+'_qte',qte);
        }else{
            localStorage.setItem('teddy_'+teddy._id,JSON.stringify(teddy));
            localStorage.setItem('teddy_'+teddy._id+'_qte',1);
        }
       
    })

}

