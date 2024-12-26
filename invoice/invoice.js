function generateInvoice() {
	const orderId = document.getElementById("order-id").value;
	if (!orderId) {
		alert("Please enter a valid Order ID.");
		return;
	}
	console.log(`Generating invoice for Order ID: ${orderId}`);
}
document
	.getElementById("invoice-form")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		const orderId = document.getElementById("order-id").value;
		const customerType = document.getElementById("customer-type").value;
		const price = document.getElementById("price").value;
		const credit = document.getElementById("credit").value;
		const paymentMode = document.getElementById("payment-mode").value;

		if (!orderId || !customerType || !price || !paymentMode) {
			alert("Please fill all required fields.");
			return;
		}

		console.log({
			orderId,
			customerType,
			price,
			credit,
			paymentMode,
		});

		alert("Invoice saved successfully!");
	});

function printInvoice() {
	const invoiceContent = document.querySelector(".container").innerHTML;
	const originalContent = document.body.innerHTML;

	document.body.innerHTML = invoiceContent;
	window.print();
	document.body.innerHTML = originalContent;
}
