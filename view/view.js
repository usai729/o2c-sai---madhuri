document.addEventListener("DOMContentLoaded", function () {
	// Fetch data from localStorage
	const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
	const creditsData = JSON.parse(localStorage.getItem("credits")) || [];

	// Reference to table bodies
	const orderTableBody = document.querySelector(".order tbody");
	const creditTableBody = document.querySelector(".credit tbody");

	// Populate Orders Table
	ordersData.forEach((order) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${order.orderId || "N/A"}</td>
			<td>${order.cost || "N/A"}</td>
			<td>${order.cid || "N/A"}</td>
			<td>${order.credit || "N/A"}</td>
		`;
		orderTableBody.appendChild(row);
	});

	// Populate Credit Table
	creditsData.forEach((credit) => {
		const paidAmount = credit.paidAmount || 0;
		const totalAmount = credit.amount || 0;
		const percentageFulfilled = totalAmount > 0 ? ((paidAmount / totalAmount) * 100).toFixed(2) : "0";

		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${credit.status || "N/A"}</td>
			<td>${paidAmount}</td>
			<td>${credit.due || "0"}</td>
			<td>${percentageFulfilled}%</td>
		`;
		creditTableBody.appendChild(row);
	});
});
