import { conectApi } from "../services/conectApi.js";
import showConfirmModal from "../components/modalConfirm.js";
import showAlertModal from "../components/modalAlert.js";
import { loadProductList } from "./main.js";

// conectar o clique no ícone da lixeira com a função de remover produto, passando o produto que foi clicado
export default function addRemoveButtonListeners(card, name, id) {
	const removeBtn = card.querySelector('.product__card--trash-icon');
	removeBtn.addEventListener('click', e => {
		e.preventDefault();
		removeProduct(name, id);
	})
}

// exibe uma janela de confirmação e aguarda a interação do usuário, se verdadeiro, tenta remover da base de dados o produto passado a partir do id, caso consiga, recarrega a lista de produtos.
async function removeProduct(name, id) {
	try {
		const isDeletionConfirmed = await showConfirmModal();
		if (isDeletionConfirmed) {
			await conectApi.deleteProduct(id);
			showAlertModal("Sucesso!", `${name} foi removido com sucesso!`);
			const productList = document.querySelector('[data-product-list]');
			productList.innerHTML = '';
			loadProductList();
		}
	} catch (error) {
		showAlertModal("Falha", error);
	}
}
