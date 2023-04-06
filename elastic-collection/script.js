function showMenu() {
	let menu = document.querySelector('.menu-background')
	if (menu.classList.contains('show-menu')) {
		menu.classList.remove('show-menu')
	} else {
		menu.classList.add('show-menu')
	}
}

function showStoopInfo(stoop) {
	if (stoop.id === 'show-stoop') {
		stoop.id = ''
	} else {
		stoop.id = 'show-stoop'
	}
}
