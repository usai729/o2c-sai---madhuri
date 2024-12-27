document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from localStorage
    const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
    const creditsData = JSON.parse(localStorage.getItem("credits")) || [];

    // Reference to table bodies
    const orderTableBody = document.querySelector(".order tbody");
    const creditTableBody = document.querySelector(".credit tbody");

    // Get query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const specificOrderId = urlParams.get("oid");
    const specificCustomerId = urlParams.get("cid");

    // Function to get orders by orderId
    function getOrdersByOrderId(orderId) {
        return ordersData.filter(order => order.oid === orderId);
    }

    // Function to get credits by customerId
    function getCreditsByCustomerId(customerId) {
        return creditsData.filter(credit => credit.cid === customerId);
    }

    if (specificOrderId) {
        const filteredOrders = getOrdersByOrderId(specificOrderId);
        filteredOrders.forEach((order) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${order.cid || "N/A"}</td>
                <td>${order.cost || "N/A"}</td>
                <td>${order.modeOfPayment || "N/A"}</td>
                <td>${order.orderId || "N/A"}</td>
                <td>${order.pid || "N/A"}</td>
                <td>${order.role || "N/A"}</td>
                <td>${order.status || "N/A"}</td>
            `;
            orderTableBody.appendChild(row);
        });
    }

    ordersData.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${order.cid || "N/A"}</td>
                <td>${order.cost || "N/A"}</td>
                <td>${order.modeOfPayment || "N/A"}</td>
                <td>${order.orderId || "N/A"}</td>
                <td>${order.pid || "N/A"}</td>
                <td>${order.role || "N/A"}</td>
                <td>${order.status || "N/A"}</td>
        `;
        orderTableBody.appendChild(row);
    });

    if (specificCustomerId) {
        const filteredCredits = getCreditsByCustomerId(specificCustomerId);
        filteredCredits.forEach((credit) => {
            const paidAmount = credit.paidAmount || 0;
            const totalAmount = credit.amount || 0;
            const percentageFulfilled = totalAmount > 0 ? ((paidAmount / totalAmount) * 100).toFixed(2) : "0";

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${credit.cid || "N/A"}</td>
                <td>${credit.status || "N/A"}</td>
                <td>${credit.amount || "N/A"}</td>
                <td>${credit.due || "N/A"}</td>
                <td>${credit.paidAmount || "N/A"}</td>
                <td>${percentageFulfilled}%</td>
            `;
            creditTableBody.appendChild(row);
        });
    }
});
