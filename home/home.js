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
	const status = document.getElementById("status").value;

	let orders = {
		orderId,
		pid,
		cid,
		role,
		cost,
		modeOfPayment,
		status, // Add status to the order object
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

	get_ordersAndCredits();
	closeModal("orders");
}

function save(event) {
	event.preventDefault();
	const cid = document.getElementById("cid_credits").value;
	const amount = document.getElementById("amount_credits").value;
	const status = document.getElementById("status_credits").value;
	const due = document.getElementById("due_credits").value;

	let credits = { cid, amount, status, due };

	let storedCredits = JSON.parse(localStorage.getItem("credits")) || [];

	storedCredits.push(credits);

	localStorage.setItem("credits", JSON.stringify(storedCredits));

	get_ordersAndCredits();
	closeModal("credits");
}

function get_ordersAndCredits() {
	const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
	const storedCredits = JSON.parse(localStorage.getItem("credits")) || [];

	const ordersTableBody = document.querySelector(".orders-table tbody");
	const creditsTableBody = document.querySelector(".credits-table tbody");

	ordersTableBody.innerHTML = "";
	creditsTableBody.innerHTML = "";

	storedOrders.forEach((order) => {
		const row = document.createElement("tr");
		row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.pid}</td>
            <td>${order.cid}</td>
            <td>${order.role}</td>
            <td>${order.cost}</td>
            <td>${order.modeOfPayment}</td>
            <td>
                <button onclick="openOrderModal('${order.orderId}')">Edit</button>
                <a href='../view/view.html?cid=${order.cid}&oid=${order.orderId}'>
                    <Button>View</Button>
                </a>
            </td>
        `;
		ordersTableBody.appendChild(row);
	});

	storedCredits.forEach((credit) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>$${credit.amount}</td>
            <td>${credit.cid}</td>
            <td>$${credit.paidAmount || 0}</td>  <!-- Show paid amount -->
            <td>${credit.status}</td>
            <td>${credit.due}</td>
            <td>${
							credit.percentageFulfilled || 0
						}%</td>  <!-- Show percentage fulfilled -->
            <td><button onclick="openCreditModal('${
							credit.cid
						}')">Edit</button></td>
        `;
		creditsTableBody.appendChild(row);
	});
}

function applyFilters() {
	const orderStatus = document.getElementById("order-status").value;
	const customerRole = document.getElementById("customer-role").value;
	const paymentMode = document.getElementById("payment-mode").value;
	const orderDate = document.getElementById("order-date").value;

	const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
	const storedCredits = JSON.parse(localStorage.getItem("credits")) || [];

	const filteredOrders = storedOrders.filter((order) => {
		return (
			(orderStatus === "" || order.status === orderStatus) &&
			(customerRole === "" || order.role === customerRole) &&
			(paymentMode === "" || order.modeOfPayment === paymentMode) &&
			(orderDate === "" || order.orderDate === orderDate)
		);
	});

	const filteredCredits = storedCredits.filter((credit) => {
		return (
			(orderStatus === "" || credit.status === orderStatus) &&
			(paymentMode === "" || credit.paymentMode === paymentMode)
		);
	});

	displayFilteredData(filteredOrders, filteredCredits);
}

function displayFilteredData(filteredOrders, filteredCredits) {
	const filteredTableBody = document.querySelector(".filtered-orders tbody");
	filteredTableBody.innerHTML = "";

	filteredOrders.forEach((order) => {
		const row = document.createElement("tr");
		row.innerHTML = `
            <td>${order.cost || "N/A"}</td>
            <td>${order.cid || "N/A"}</td>
            <td>${order.paidAmount || "N/A"}</td>
            <td>${order.status || "N/A"}</td>
            <td>${order.dueDate || "N/A"}</td>
            <td>${order.percentageFulfilled || "0%"}%</td>
            <td>
                <a href="../view/view.html?oid=${order.orderId}&cid=${
			order.cid
		}">
                    <button>View</button>
                </a>
                <button onclick="openOrderModal('${
									order.orderId
								}')">Edit</button>
            </td>
        `;
		filteredTableBody.appendChild(row);
	});

	filteredCredits.forEach((credit) => {
		const row = document.createElement("tr");
		row.innerHTML = `
            <td>${credit.amount || "N/A"}</td>
            <td>${credit.cid || "N/A"}</td>
            <td>${credit.paidAmount || "N/A"}</td>
            <td>${credit.status || "N/A"}</td>
            <td>${credit.due || "N/A"}</td>
            <td>${credit.percentageFulfilled || "0%"}%</td>
            <td>
                <a href="../view/view.html?id=${credit.cid}">
                    <button>View</button>
                </a>
                <button onclick="openCreditModal('${credit.cid}')">Edit</button>
            </td>
        `;
		filteredTableBody.appendChild(row);
	});
}

function updateDashboard() {
	const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
	const storedCredits = JSON.parse(localStorage.getItem("credits")) || [];

	const totalOrders = storedOrders.length;
	const pendingOrders = storedOrders.filter(
		(order) => order.status === "placed"
	).length;
	const ordersPendingPercentage =
		totalOrders > 0 ? ((pendingOrders / totalOrders) * 100).toFixed(2) : 0;

	const totalCustomers = storedOrders.length;
	const businessCustomers = storedOrders.filter(
		(order) => order.role === "Business"
	).length;
	const retailCustomers = totalCustomers - businessCustomers;
	const customerSegregation =
		totalCustomers > 0
			? `${((businessCustomers / totalCustomers) * 100).toFixed(
					2
			  )}% Businesses<br />${(
					(retailCustomers / totalCustomers) *
					100
			  ).toFixed(2)}% Retail Buyers`
			: "0% Businesses<br />0% Retail Buyers";

	const totalCredits = storedCredits.length;
	const customersWithCreditDues = storedCredits.filter(
		(credit) => credit.status === "pending" || credit.status === "partial"
	).length;
	const creditDuesPercentage =
		totalCredits > 0
			? ((customersWithCreditDues / totalCredits) * 100).toFixed(2)
			: 0;

	const newOrders = storedOrders.filter(
		(order) => new Date(order.date) > new Date() - 30 * 24 * 60 * 60 * 1000
	);
	const oldOrders = totalOrders - newOrders.length;
	const newVsOldRatio =
		totalOrders > 0
			? `New Orders: ${((newOrders.length / totalOrders) * 100).toFixed(
					2
			  )}%<br />Old Orders: ${((oldOrders / totalOrders) * 100).toFixed(2)}%`
			: "0% New Orders<br />0% Old Orders";

	document.getElementById(
		"orders-pending"
	).innerText = `${ordersPendingPercentage}%`;
	document.getElementById("customer-segregation").innerHTML =
		customerSegregation;
	document.getElementById(
		"credit-dues"
	).innerText = `${creditDuesPercentage}% Customers`;
	document.getElementById("new-vs-old").innerHTML = newVsOldRatio;
}

document
	.querySelector(".filters-container")
	.addEventListener("change", applyFilters);

window.onload = function () {
	get_ordersAndCredits();
	applyFilters();
	updateDashboard();
};
