document
	.getElementById("invoice-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const orderId = document.getElementById("order-id").value;
		const customerType = document.getElementById("customer-type").value;
		const price = document.getElementById("price").value;
		const credit = document.getElementById("credit").value || "0";
		const paymentMode = document.getElementById("payment-mode").value;

		if (!orderId || !customerType || !price || !paymentMode) {
			alert("Please fill all required fields.");
			return;
		}

		document.getElementById("invoice-order-id").textContent = orderId;
		document.getElementById("invoice-customer-type").textContent = customerType;
		document.getElementById("invoice-price").textContent = price;
		document.getElementById("invoice-credit").textContent = credit;
		document.getElementById("invoice-payment-mode").textContent = paymentMode;

		document.getElementById("invoice-display").style.display = "block";
		document.getElementById("invoice-form").style.display = "none";
	});

function printInvoice() {
	const invoiceContent = document.getElementById("invoice-display").innerHTML;
	const originalContent = document.body.innerHTML;

	document.body.innerHTML = invoiceContent;

	window.print();

	document.body.innerHTML = originalContent;
}

function generateInvoice() {
	const orderId = document.getElementById("order-id").value;

	if (!orderId) {
		alert("Please enter a valid Order ID.");
		return;
	}

	const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
	const orderDetails = storedOrders.find((order) => order.orderId === orderId);

	if (!orderDetails) {
		alert("No order found with that ID.");
		return;
	}

	const storedCredits = JSON.parse(localStorage.getItem("credits")) || [];
	const creditDetails = storedCredits.find(
		(credit) => credit.cid === orderDetails.cid
	);

	document.getElementById("customer-type").value = orderDetails.role;

	let selector = document.getElementById("customer-type").children;

	for (let i = 0; i < selector.length; i++) {
		if (selector[i].value == orderDetails.role.toLowerCase()) {
			selector[i].selected = true;

			break;
		}
	}

	console.log(orderDetails.cost);

	document.getElementById("price").value = orderDetails.cost;
	document.getElementById("credit").value = creditDetails
		? creditDetails.amount
		: 0;
	document.getElementById("payment-mode").value = orderDetails.modeOfPayment;

	console.log(`Order Details for Order ID ${orderId}:`, orderDetails);
	console.log(
		`Credit Details for Customer ID ${orderDetails.cid}:`,
		creditDetails
	);
}
