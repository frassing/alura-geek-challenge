// função responsável por criar o elemento de modal (estrutura visual)
function createConfirmModal() {
	const modal = document.createElement("div");
	modal.setAttribute('data-modal-confirm', '');
	modal.classList.add('modal__overlay');
	const modalWindow = document.createElement("div");
	modalWindow.classList.add('modal__popup');
	modalWindow.innerHTML = `
		<div class="modal__container">				
			<header class="modal__header">
				<h3 class="modal__title">Confirme a exclusão</h3>
				<span class="modal__close" title="Fechar">&#120;</span>
			</header>
			<section class="modal__content">
				<p class="modal__message--confirm"></p>
				<div class="modal__buttons">
					<button type="button" title="Confirmar" class="modal__button modal__button--primary" data-confirm-btn>Confirmar</button>
					<button type="button" title="Cancelar" class="modal__button modal__button--secundary modal__close">Cancelar</button>
				</div>
			</section>
		</div>
	`
	modal.appendChild(modalWindow);
	document.body.appendChild(modal);
}

// função para exibir a modal e esperar por uma ação do usuário, devolve true/false para onde foi chamada
export default function showConfirmModal() {
	return new Promise((resolve) => {
		createConfirmModal();
		const modal = document.querySelector('[data-modal-confirm]');
		const modalMessage = document.querySelector('.modal__message--confirm');
		modalMessage.textContent = "Deseja mesmo remover este produto?";

		const confirmButton = modal.querySelector('[data-confirm-btn]');
		confirmButton.addEventListener('click', event => {
			event.preventDefault();
			document.body.removeChild(modal);
			resolve(true);
		})

		const closeElementList = modal.querySelectorAll('.modal__close');
		closeElementList.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault();
				document.body.removeChild(modal);
				resolve(false);
			})
		})
	})
}
