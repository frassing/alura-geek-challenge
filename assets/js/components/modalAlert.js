export default function showAlertModal(title, message) {
	const modalWindow = document.querySelector('[data-modal]');
	const modalTitle = document.querySelector('.modal__title');
	modalTitle.textContent = title;
	const modalMessage = document.querySelector('.modal__message--alert');
	modalMessage.textContent = message
	addCloseModalListeners(modalWindow, modalTitle, modalMessage);
	modalWindow.style.display = 'block';
}


function addCloseModalListeners(modal, title, message) {
	const closeElementList = modal.querySelectorAll('.modal__close');

	closeElementList.forEach(element => {
		element.addEventListener('click', e => {
			e.preventDefault();
			modal.style.display = 'none';
			title.textContent = '';
			message.textContent = '';
		})
	})
}
