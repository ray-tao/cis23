function renderItems(stoops) {
    const stoopsElement = document.getElementById("stoops");

    stoops.forEach(function (stoop) {
        if (stoop.category === "questionable") {
            const itemDetails = `
		<section class="stoop-container" onclick="event.stopPropagation(); showStoopInfo(this)">
		<svg class="x-icon" onclick="event.stopPropagation(); showStoopInfo(this)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
		<img class="stoop-img" src="./images/questionable/${stoop.img.replace(
            ".jpg",
            ".png"
        )}" />
		<img class="stoop-full-img" src="./images/questionable/${stoop.img}" />
		<div class="stoop-info">
			<div class="stoop-headers">
				<h1>${stoop.heading}</h1>
				<h3>${stoop.subheading}</h3>
			</div>
			<div class="stoop-date-location">
				<h3>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
					${stoop.location}
				</h3>
				<h3>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
					</svg>
					${stoop.date}
				</h3>
			</div>
			<ul class="stoop-comments">
			${stoop.comment
                .split("\n")
                .slice(0, 3)
                .map(function (comment, index) {
                    return `
				<li>
					<div>${comment}</div>${stoop.user.split("\n")[index]}
				</li>`;
                })
                .join("")}
			</ul>
		</div>
	</section>
			`;
            stoopsElement.insertAdjacentHTML("beforeend", itemDetails);
        }
    });
}

fetch("./assets/stoops.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (collection) {
        renderItems(collection);
    });
