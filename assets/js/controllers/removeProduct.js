import { conectApi } from "../services/conectApi.js";
import showConfirmModal from "../components/modalConfirm.js";
import showAlertModal from "../components/modalAlert.js";

// conectar clique na lixeira com a função de remover produto
export default function addRemoveButtonListeners(card, name, id) {
	const removeBtn = card.querySelector('.product__card--trash-icon');
	removeBtn.addEventListener('click', e => {
		e.preventDefault();
		removeProduct(name, id);
	})
}

async function removeProduct(name, id) {
	try {
		const isDeletionConfirmed = await showConfirmModal();
		if (isDeletionConfirmed) {
			await conectApi.deleteProduct(id);
			showAlertModal("Sucesso!", `${name} foi removido com sucesso!`);
		}
	} catch (error) {
		showAlertModal("Falha", error);
	}
}
