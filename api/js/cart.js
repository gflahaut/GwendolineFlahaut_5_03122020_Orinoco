
(function () {
    let teddyIds = JSON.parse(localStorage.getItem('_id'));

    let yourCart = document.createElement('div');
    yourCart.setAttribute('class', 'container col-md-12 yourCart block-center text-center');
    document.body.appendChild(yourCart);

    let tableCart = document.createElement('table');
    tableCart.setAttribute('class', 'mAuto tableCart1');
    yourCart.appendChild(tableCart);

    let tableCartHead = document.createElement('thead');
    tableCartHead.setAttribute('class', 'title');
    tableCart.appendChild(tableCartHead);

    let tableCartHeadTr = document.createElement('tr');
    tableCartHead.appendChild(tableCartHeadTr);

    let tableCartHeadTrTh = document.createElement('th');
    tableCartHeadTrTh.setAttribute('class', 'nameid text-center');
    tableCartHeadTrTh.setAttribute('scope', 'col');
    tableCartHeadTrTh.innerText = 'Identifiant';
    tableCartHeadTr.appendChild(tableCartHeadTrTh);

    let tableCartHeadTrTh1 = document.createElement('th');
    tableCartHeadTrTh1.innerText = 'Produits';
    tableCartHeadTrTh1.setAttribute('scope', 'col');
    tableCartHeadTrTh1.setAttribute('class', 'text-center');
    tableCartHeadTr.appendChild(tableCartHeadTrTh1);

    let tableCartHeadTrTh2 = document.createElement('th');
    tableCartHeadTrTh2.innerText = 'Nom';
    tableCartHeadTrTh2.setAttribute('scope', 'col');
    tableCartHeadTrTh2.setAttribute('class', 'text-center');
    tableCartHeadTr.appendChild(tableCartHeadTrTh2);

    let tableCartHeadTrTh3 = document.createElement('th');
    tableCartHeadTrTh3.innerText = 'Prix';
    tableCartHeadTrTh3.setAttribute('scope', 'col');
    tableCartHeadTrTh3.setAttribute('class', 'text-center');
    tableCartHeadTr.appendChild(tableCartHeadTrTh3);

    let tableCartHeadTrTh4 = document.createElement('th');
    tableCartHeadTrTh4.innerText = 'Quantité';
    tableCartHeadTrTh4.setAttribute('scope', 'col');
    tableCartHeadTrTh4.setAttribute('class', 'text-center');
    tableCartHeadTr.appendChild(tableCartHeadTrTh4);

    let tableCartHeadTrTh5 = document.createElement('th');
    tableCartHeadTrTh5.innerText = 'Total';
    tableCartHeadTrTh5.setAttribute('scope', 'col')
    tableCartHeadTrTh5.setAttribute('class', 'text-center');
    tableCartHeadTr.appendChild(tableCartHeadTrTh5);

    let tableCartBody = document.createElement('tbody');
    tableCartBody.setAttribute('class', 'tableCartBody');
    tableCart.appendChild(tableCartBody);

    for (let i = 0; i < teddyIds.length; i++) {
        if (localStorage.getItem('teddy_' + teddyIds[i])) {
            let teddies = JSON.parse(localStorage.getItem('teddy_' + teddyIds[i]));
            let teddiesQuantity = localStorage.getItem('teddy_' + teddyIds[i] + "_qte");
            productCart(teddies, teddiesQuantity);
        }
    }
    showTotalProduct();
    document.getElementById('btnValidateForm').addEventListener('click', validateForm);
})();
/**
 * fonction pour afficher les produits présents dans le panier
 * @param { objet } teddies
 * @param { number } teddiesQuantity
 * @return { void } Nothing
 */
//
function productCart(teddies, teddiesQuantity) {

    let container = document.querySelector('.tableCartBody');

    let tableCartBodyTr = document.createElement('tr');
    tableCartBodyTr.setAttribute('class', 'tableCartBodyTr');


    let tableCartBodyTd = document.createElement('td');
    tableCartBodyTd.innerText = teddies._id;
    tableCartBodyTd.setAttribute('class', 'id text-center');

    let tdImg = document.createElement('td');
    tdImg.setAttribute('class', 'text-center');
    tableCartBodyTr.appendChild(tdImg);

    let img1 = document.createElement('img');
    img1.setAttribute('src', teddies.imageUrl);
    img1.setAttribute('class', 'rounded cartImg');


    let td1 = document.createElement('td');
    td1.innerText = teddies.name;
    td1.setAttribute('class', 'text-center');


    let td2 = document.createElement('td');
    td2.innerText = teddies.price / 100 + "€";
    td2.setAttribute('class', 'text-center');


    let td3 = document.createElement('td');
    td3.innerText = teddiesQuantity;
    td3.setAttribute('class', 'text-center qty');


    let td4 = document.createElement('td');
    td4.setAttribute('class', 'text-center');

    let eachProductPriceTot = document.createElement('button');
    eachProductPriceTot.innerText = teddiesQuantity * teddies.price / 100 + "€";
    eachProductPriceTot.setAttribute('class', 'btn btn-success eachProductPriceTot');

    td4.appendChild(eachProductPriceTot);
    tdImg.appendChild(img1);
    tableCartBodyTr.appendChild(tdImg);
    tableCartBodyTr.appendChild(td1);
    tableCartBodyTr.appendChild(td2);
    tableCartBodyTr.appendChild(td3);
    tableCartBodyTr.appendChild(td4);
    tableCartBodyTr.appendChild(tableCartBodyTd);
    container.appendChild(tableCartBodyTr);

}
/**
 * fonction pour afficher les sous-total et le total des produits présents dans le panier dans un tableau
 * mais aussi pour mettre le formulaire dans une modal au clique sur le bouton de la validation du panier 
 * @return { void } Nothing
 */
//
function showTotalProduct() {
    let sousTotal = document.querySelectorAll('.eachProductPriceTot');
    let total = 0;
    for (let i = 0; i < sousTotal.length; i++) {
        total += parseInt(sousTotal[i].innerText.slice(0, -1));
    }
    let content = total + "€";


    let container = document.querySelector('.tableCartBody');

    let tableCartBodyTr = document.createElement('tr');
    tableCartBodyTr.setAttribute('class', 'tableCartBodyTr total');
    container.appendChild(tableCartBodyTr);

    let td1 = document.createElement('td');
    td1.innerText = 'Montant du panier';
    tableCartBodyTr.appendChild(td1);

    let td2 = document.createElement('td');
    tableCartBodyTr.appendChild(td2);

    let td3 = document.createElement('td');
    tableCartBodyTr.appendChild(td3);

    let td4 = document.createElement('td');
    tableCartBodyTr.appendChild(td4);

    let td5 = document.createElement('td');
    tableCartBodyTr.appendChild(td5);

    let button1 = document.createElement('button');
    button1.innerText = content;
    button1.setAttribute('class', 'text-center totalPrice btn btn-danger');
    td5.appendChild(button1);

    document.body.innerHTML += `
    <footer class="col-md-12 block-center footer mt-auto py-3">
        <div class="text-center">
            Orinoco - 249 avenue du Président Wilson 93210 La Plaine Saint Denis
        </div>
    </footer>
    `;


    let validCartBtn = '';

    if (total > 0) {
        validCartBtn = document.createElement('button');
        validCartBtn.setAttribute('class', 'btn btn-info center-block');
        validCartBtn.setAttribute('data-toggle','modal')
        validCartBtn.setAttribute('data-target','#myModal')
        validCartBtn.innerText = 'Valider votre panier';
        let container = document.querySelector('.container');
        container.appendChild(validCartBtn);
    } else if (total == 0) {
        alert('Votre panier est vide !');
    }
}

/**
 * fonction pour vérifier si les inputs du formulaire présent dans ma modal ne sont pas vides 
 * mais aussi le contenu des inputs, savoir s'ils contiennent bien les bonnes informations à savoir 
 * ajoute aussi des classes au champs du formulaire selon le booléens en réponse
 *  * @param  { HTMLElement}  x les inputs du formulaires
 * @return { void } Nothing
 */
function validateForm() {
    let x = document.querySelectorAll('.modal input');
    let ok = true;
    let isFilled = true;

    for (let i = 0; i < x.length; i++) {
        //dispose bien d'une valeur dans le champs
        if (x[i].value == "") {
            isFilled = false;
            x[i].className = 'form-control has-error';
        } else {
            isFilled = true;
            x[i].className = 'form-control has-success';
        }
        if (x[i].type == "text" && x[i].name != "address" && x[i].name != "compaddress") {
            if (onlyCharacters(x[i].value)) {
                ok = true;
            } else {
                ok = false;
            }
        }
        if (x[i].name == "address" || x[i].name == "compaddress") {
            if (alphanumeric(x[i].value)) {
                ok = true;
            } else {
                ok = false;

            }
        }
        if (x[i].type == "email") {
            if (onlyEmail(x[i].value)) {
                ok = true;
            } else {
                ok = false;

            }
        }
        if (ok && isFilled) {
            x[i].className = 'form-control has-success';
            x[i].nextElementSibling.className = 'feedback message-success text-center';
        } else if (!ok && isFilled) {
            x[i].className = 'form-control has-error';
            x[i].nextElementSibling.className = 'feedback message-error-content text-center';
        } else if (ok && !isFilled) {
            x[i].className = 'form-control has-error';
            x[i].nextElementSibling.className = 'feedback message-error-empty text-center';
        } else {
            x[i].className = 'form-control has-error';
            x[i].nextElementSibling.className = 'feedback message-error text-center';

        }
    }
    if (document.querySelectorAll('.has-error').length == 0) {
        sendForm();
    }
}
/**
 * fonction pour vérifier si le champs ne contient que des caractères alphabétiques
 * @param { string } o le contenu du champs
 * @return { boolean } correct ou incorrect 
 */
//
function onlyCharacters(o) {
    let letters = /^[a-zA-Z]+$/;
    if (o.match(letters)) {
        return true;
    } else {
        return false;
    }
}
/**
 * fonction pour vérifier si le champs ne contient que des caractères alphanumériques
 * @param { string } o le contenu du champs
 * @return { boolean } correct ou incorrect 
 */
//
function alphanumeric(o) {
    let letters = /^[a-z0-9 .,]{10,}$/i;
    if (o.match(letters)) {
        return true;
    } else {
        return false;
    }
}
/**
* fonction pour vérifier si le champs ne contient que des caractères alphanumeriques avec le symbole arobase et des points
* @param { string } o le contenu du champs
* @return { boolean } correct ou incorrect 
*/
//
function onlyEmail(o) {
    let letters = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/i;
    if (o.match(letters)) {
        return true;
    } else {
        return false;
    }
}
/**
* fonction pour l'envoi du formulaire on récupère chacunes des valeurs des inputs du formulaire , les identifiants des produits et leurs quantités
* les quantités et les id's sont réunis dans un tableau 
* puis lors du post vers le serveur on les transforme en chaîne de caractère une fois la réponse correct on envoie le client sur la page de confirmation de commande
* @return { void } Nothing
* @param  { object } contact
*/
//
function sendForm() {
    const contact = { firstName: document.querySelector('#inputFirstName').value, lastName: document.querySelector('#inputLastName').value, address: document.querySelector('#inputAddress').value, city: document.querySelector('#inputCity').value, email: document.querySelector('#inputMail').value };
    const product_id = document.querySelectorAll('.id');
    const product_quantity = document.querySelectorAll('.qty');
    let arrayProductId = []
    for (let i = 0; i < product_id.length; i++) {
        for (let y = 0; y < product_quantity[i].innerText; y++) {
            arrayProductId.push(product_id[i].innerText);
        }
    }
    send(contact, arrayProductId).then((response) =>{
        const containerProductTableHtml = document.querySelector('.tableCart1').innerHTML;
        document.location.href = './order.html?answer=' + JSON.stringify(response) + '&productTableHtml=' + JSON.stringify(containerProductTableHtml);
    })
}

/**
* 
* 
* 
* @return { void } 
* @param  { string } url
*/
async function send(contact, arrayProductId){
        try{
            const url = 'https://gwendolineflahaut-5-03122020-serveur.onrender.com/api/teddies/order';
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contact: contact, products: arrayProductId })
            });
            const object = response.json();
            return object;
        }catch(error){
            alert(error)
        }
}


