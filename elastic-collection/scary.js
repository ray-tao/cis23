function renderItems(stoops) {
	const stoopsElement = document.getElementById('stoops')

	stoops.forEach(function (stoop) {
		if (stoop.category === 'scary') {
			const itemDetails = `
		<section class="stoop-container" onclick="showStoopInfo(this)">
		<img class="stoop-img" src="./images/${stoop.img}" />
		<div class="stoop-info">
			<div class="stoop-headers">
				<h1>${stoop.heading}</h1>
				<h3>${stoop.subheading}</h3>
			</div>
			<div class="stoop-date-location">
				<h3>${stoop.location}</h3>
				<h3>${stoop.date}</h3>
			</div>
			<ul class="stoop-comments">
			${stoop.comment
				.split('\n')
				.map(function (comment, index) {
					return `
				<li>
					<div>${comment}</div>${stoop.user.split('\n')[index]}
				</li>`
				})
				.join('')}
			</ul>
		</div>
	</section>
			`
			stoopsElement.insertAdjacentHTML('beforeend', itemDetails)
		}
	})
}

fetch('./assets/stoops.json')
	.then(function (response) {
		return response.json()
	})
	.then(function (collection) {
		renderItems(collection)
	})
