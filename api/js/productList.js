
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
    console.log(object);
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
    const url = 'https://gwendolineflahaut-5-03122020-serveur.onrender.com/api/teddies';
    apicall(url).then((object) => {
        let allIds=[];
        for(let y=0; y<object.length; y++){
            allIds.push(object[y]._id);
        }
        localStorage.setItem('_id',JSON.stringify(allIds));
        showProduct(object);
        showDetails();
    })
 })(); 
/**
 * rendre les éléments cliquables pour chaque produits la fonction affiche une figure 
 * dans l'index et change le chemin de la page au clique sur l'une des figures
 * @return { void } Nothing
 */
//
function showDetails(){
    document.querySelectorAll('figure').forEach(function(element){
        let productId = element.querySelectorAll('.hiddenid')[0].value;
        element.addEventListener('click',function(){
            document.location.href='./product-details.html?product='+productId;
        });
    });
}
/**
/**
 * fonction affichant les produits dans les éléments HTML
 * @param { objet } teddy
 * @return { void } Nothing
 */
//
function showProduct(teddy) {

    const body = document.querySelector('body');

    for (let i = 0; i < teddy.length; i++) {
        document.body.innerHTML+=
            `
            <div class="row">
                <figure class="center-block cards col">
                    <img class="img-rounded col-md-6 center-block" src="${teddy[i].imageUrl}">
                    <figcaption class="text-center row col-md-6">
                        <h1>${teddy[i].name}</h1>
                        <p>${teddy[i].description}</p>
                        <p class="h3">${teddy[i].price / 100 + "€"}</p>
                        <input type="hidden" class="hiddenid" value="${teddy[i]._id}"/>
                    </figcaption>
                </figure>
            </div>
            `;
    }
    document.body.innerHTML += 
    `
    <footer class="col-md-12 block-center footer mt-auto py-3">
        <div class="text-center">
            Orinoco - 249 avenue du Président Wilson 93210 La Plaine Saint Denis
        </div>
    </footer>`;
}





