document.addEventListener('DOMContentLoaded', () => {

    const expenseForm = document.getElementById('expense-form');
    const expenseNameIn = document.getElementById('expense-name');
    const expenseAmountIn = document.getElementById('expense-amount');
    const expenseList = document.getElementById('expense-list');
    const totalExpense = document.getElementById('total-expense');

    let expense = JSON.parse(localStorage.getItem('expense')) || [];
    let totalAmount = calculateTotal();

    expenseItems();

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let name = expenseNameIn.value.trim();
        let amount = parseFloat(expenseAmountIn.value.trim());

        if (name != "" && amount > 0 && !isNaN(amount)) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            };

            expense.push(newExpense);
            saveTolocalStorage();
            expenseItems();
            updateTotal();

            expenseNameIn.value = ""
            expenseAmountIn.value = ""
        }else{
            alert("Oops!! Enter Name and Amount correct")
        }
    });

    function calculateTotal() {
        return expense.reduce((sum, expense) => sum + expense.amount, 0)
    }

    function saveTolocalStorage() {
        localStorage.setItem('expense', JSON.stringify(expense));
    }

    function expenseItems() {
        expenseList.innerHTML = ""
        expense.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
            ${expense.name} -- ${expense.amount}
            <button data-id=${expense.id} class="li-btn">Delete</button>
        `;
            expenseList.appendChild(li)
        })
    }

    function updateTotal() {
        totalAmount = calculateTotal();
        totalExpense.innerText = totalAmount;
    }

    expenseList.addEventListener('click', (e) =>{
        if(e.target.tagName === 'BUTTON'){
            const id = parseInt(e.target.getAttribute('data-id'));
            expense = expense.filter(expense => expense.id !== id);

            saveTolocalStorage();
            expenseItems();
            updateTotal();

        }
    })

});