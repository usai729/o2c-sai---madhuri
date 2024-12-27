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

function saveOrders(event) {
	event.preventDefault();

	const orderId = document.getElementById("order-id").value;
	const pid = document.getElementById("pid").value;
	const cid = document.getElementById("cid").value;
	const role = document.getElementById("role").value;
	const cost = document.getElementById("cost").value;
	const modeOfPayment = document.getElementById("modeofpayment").value;

	let orders = {
		orderId,
		pid,
		cid,
		role,
		cost,
		modeOfPayment,
	};

	let storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

	const existingOrderIndex = storedOrders.findIndex(
		(order) => order.orderId === orderId
	);

	if (existingOrderIndex !== -1) {
		storedOrders[existingOrderIndex] = orders;
	} else {
		storedOrders.push(orders);
	}

	localStorage.setItem("orders", JSON.stringify(storedOrders));

	console.log(localStorage.getItem("orders"));
}

function save(event) {
	event.preventDefault();
	const cid = document.getElementById("cid").value;
	const amount = document.getElementById("amount").value;
	const status = document.getElementById("status").value;
	const due = document.getElementById("due").value;
	let credits = { cid, amount, status, due };
	let storedCredits = JSON.parse(localStorage.getItem("credits")) || [];
	const existIndex = storedCredits.findIndex((credit) => credit.cid === cid);
	if (existIndex !== -1) {
		storedCredits[existIndex] = credits;
	} else {
		storedCredits.push(credits);
	}
	localStorage.setItem("credits", JSON.stringify(storedCredits));
	console.log(localStorage.getItem("credits"));
}
