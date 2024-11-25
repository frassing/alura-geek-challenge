import {conectApi} from "../services/conectApi.js"
import { createCard } from "./createCard.js";
import showAlertModal from "../components/modalAlert.js";

// tenta carregar a lista de produtos da base de dados e exibir em formato de cards
export async function loadProductList() {
	const productList = document.querySelector("[data-product-list]");
	try {
		const apiProductList = await conectApi.getProducts();
		apiProductList.forEach(product => {
			const productCard = createCard(product.name, product.price, product.image, product.id);
			productList.appendChild(productCard);
		});
	} catch(error) {
		showAlertModal("Falha", error);
		productList.innerHTML = `<h3 class="main__empty_list--message">Nenhum produto adicionado.</h3>`;
	}	
}
loadProductList();