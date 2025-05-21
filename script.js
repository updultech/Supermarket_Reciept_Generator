document.addEventListener('DOMContentLoaded', function() {
    const addItemBtn = document.getElementById('add-item-btn');
    const itemsContainer = document.getElementById('items-container');
    const receiptForm = document.getElementById('receipt-form');
    const receiptOutput = document.getElementById('receipt-output');
    const receiptDate = document.getElementById('receipt-date');
    const receiptCustomer = document.getElementById('receipt-customer');
    const receiptItemsTableBody = document.querySelector('#receipt-items-table tbody');
    const totalAmount = document.getElementById('total-amount');

    // Handle adding new item entry
    addItemBtn.addEventListener('click', function() {
        const itemEntry = document.createElement('div');
        itemEntry.classList.add('item-entry');
        itemEntry.innerHTML = `
            <input type="text" class="item-name" placeholder="Item Name" required />
            <input type="number" class="item-qty" placeholder="Qty" min="1" value="1" required />
            <input type="number" class="item-price" placeholder="Price per Unit ($)" min="0" step="0.01" value="0" required />
        `;
        itemsContainer.appendChild(itemEntry);
    });

    // Handle form submission to generate receipt
    receiptForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Validate customer name and purchase date inputs
        const customerNameInput = document.getElementById('customer-name');
        const purchaseDateInput = document.getElementById('purchase-date');
        if (!customerNameInput.checkValidity() || !purchaseDateInput.checkValidity()) {
            receiptOutput.style.display = 'none';
            receiptForm.reportValidity();
            return;
        }

        const customerName = customerNameInput.value.trim();
        const purchaseDate = purchaseDateInput.value;

        if (!customerName) {
            alert("Please enter a customer name.");
            receiptOutput.style.display = 'none';
            return;
        }
        if (!purchaseDate) {
            alert("Please select the date of purchase.");
            receiptOutput.style.display = 'none';
            return;
        }

        receiptCustomer.textContent = `Customer: ${customerName}`;
        receiptDate.textContent = `Date: ${purchaseDate}`;
        receiptItemsTableBody.innerHTML = '';
        let total = 0;

        // Gather all item entries
        const itemEntries = document.querySelectorAll('.item-entry');
        for (const entry of itemEntries) {
            const itemNameInput = entry.querySelector('.item-name');
            const itemQtyInput = entry.querySelector('.item-qty');
            const itemPriceInput = entry.querySelector('.item-price');

            // Validate item inputs
            if (!itemNameInput.checkValidity() || !itemQtyInput.checkValidity() || !itemPriceInput.checkValidity()) {
                alert('Please fill all item fields correctly.');
                receiptOutput.style.display = 'none';
                return;
            }

            const itemName = itemNameInput.value.trim();
            const itemQty = parseFloat(itemQtyInput.value);
            const itemPrice = parseFloat(itemPriceInput.value);

            if (!itemName) {
                alert('Item name cannot be empty.');
                receiptOutput.style.display = 'none';
                return;
            }
            if (itemQty <= 0 || isNaN(itemQty)) {
                alert('Quantity must be a positive number.');
                receiptOutput.style.display = 'none';
                return;
            }
            if (itemPrice < 0 || isNaN(itemPrice)) {
                alert('Price per unit must be zero or more.');
                receiptOutput.style.display = 'none';
                return;
            }

            const itemTotal = itemQty * itemPrice;
            total += itemTotal;

            // Create table row for the item
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${itemName}</td>
                <td>${itemQty}</td>
                <td>${itemPrice.toFixed(2)}</td>
                <td class="text-right">${itemTotal.toFixed(2)}</td>
            `;
            receiptItemsTableBody.appendChild(row);
        }

        totalAmount.textContent = total.toFixed(2);
        receiptOutput.style.display = 'block';
    });
});

