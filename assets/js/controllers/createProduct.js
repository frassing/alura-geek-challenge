import { conectApi } from "../services/conectApi.js";
import { createCard } from "./createCard.js";
import showAlertModal from "../components/modalAlert.js";

const form = document.querySelector(".form__container");

/* transformar o formato do preço em notação monetária 00,00 
Retira qualquer caractere que não seja dígito, ponto (.) ou vírgula (,), fixa o valor com duas casas decimais  */
function formatPrice(value) {
	let price = value.replace(/[^0-9,.]/g,'');
	price = price.replace(",", ".");
	let priceFormated = parseFloat(price).toFixed(2);
	priceFormated = priceFormated.replace(".", ",");
	return priceFormated;
}

// função responsável por pegar dados do formulário e mandar adicionar um produto na base de dados, em seguida criar um card do produto criado
async function addNewProduct(event) {
	event.preventDefault();
	const name = document.querySelector("[data-name-input]").value;
	const price = document.querySelector("[data-price-input]").value;
	const image = document.querySelector("[data-image-input]").value;

	const nameNormalized = name.toLowerCase().trim();
	const priceFormated = formatPrice(price); 

	const productList = document.querySelector("[data-product-list]");

	try {
		const product = await conectApi.addProduct(nameNormalized, priceFormated, image);
		const productCard = createCard(product.name, product.price, product.image, product.id);

		productList.appendChild(productCard);
		form.reset();
		showAlertModal("Sucesso!", "Produto adicionado com sucesso!");
	} catch (error) {
		showAlertModal("Falha", error);
	}
}

form.addEventListener("submit", event => addNewProduct(event));
