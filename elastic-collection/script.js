function showSidebar() {
	let menu = document.querySelector('.sidebar')
	if (menu.classList.contains('show-sidebar')) {
		menu.classList.remove('show-sidebar')
	} else {
		menu.classList.add('show-sidebar')
	}
}

function showStoopInfo(element) {
	if (
		element.parentElement.id === 'show-stoop' &&
		element.classList.contains('x-icon')
	) {
		element.parentElement.id = ''
	} else {
		element.id = 'show-stoop'
	}
}
