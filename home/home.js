let curr_table = "orders";
let curr_dashToggle = true;

function toggleTables() {
	const ordersTable = document.querySelector(".orders-table");
	const creditsTable = document.querySelector(".credits-table");

	if (curr_table === "orders") {
		ordersTable.style.display = "none";
		creditsTable.style.display = "table";
		curr_table = "credits";
	} else {
		creditsTable.style.display = "none";
		ordersTable.style.display = "table";
		curr_table = "orders";
	}
}

function toggleDashboard() {
	const dashboard = document.querySelector(".dashboard");
	const filteredTable = document.querySelector(".filtered-orders");

	if (curr_dashToggle) {
		dashboard.style.display = "none";
		filteredTable.style.display = "table";
		curr_dashToggle = false;
	} else {
		filteredTable.style.display = "none";
		dashboard.style.display = "block";
		curr_dashToggle = true;
	}
}
function openOrderModal(orderId) {
	document.querySelector(".modal-orders").style.display = "block";
	document.getElementById("order-id").value = orderId;
}

function openCreditModal(cid) {
	document.querySelector(".modal-credits").style.display = "block";
	document.getElementById("cid").value = cid;
}

function closeModal(modalType) {
	if (modalType === "orders") {
		document.querySelector(".modal-orders").style.display = "none";
	} else if (modalType === "credits") {
		document.querySelector(".modal-credits").style.display = "none";
	}
}

window.onload = function () {
	const ordersTable = document.querySelector(".orders-table");
	ordersTable.style.display = "table";
	const creditsTable = document.querySelector(".credits-table");
	creditsTable.style.display = "none";

	const dashboard = document.querySelector(".dashboard");
	dashboard.style.display = "block";

	const filteredTable = document.querySelector(".filtered-orders");
	filteredTable.style.display = "none";
};
