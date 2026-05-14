// Expense Form Component
import { addExpense, updateExpense } from '../data/db.js';
import { formatCurrency } from '../data/format.js';
import { showToast } from '../utils/notifications.js';
import { animateIn, animateOut } from '../utils/animations.js';

export class ExpenseForm {
  constructor() {
    this.form = document.getElementById('expenseForm');
    this.modal = document.getElementById('modalOverlay');
    this.title = document.getElementById('expenseTitle');
    this.amount = document.getElementById('expenseAmount');
    this.category = document.getElementById('expenseCategory');
    this.date = document.getElementById('expenseDate');
    this.editId = document.getElementById('editId');
    this.modalTitle = document.getElementById('modalTitle');
    this.submitBtn = document.getElementById('submitBtn');
    this.bindEvents();
  }

  bindEvents() {
    document.getElementById('fabButton').addEventListener('click', () => {
      this.resetForm();
      animateIn(this.modal);
    });
    document.getElementById('modalClose').addEventListener('click', () => animateOut(this.modal));
    document.getElementById('cancelBtn').addEventListener('click', () => animateOut(this.modal));
    this.form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
    this.modal.addEventListener('click', (e) => { if (e.target === this.modal) animateOut(this.modal); });
  }

  handleSubmit() {
    const title = this.title.value.trim();
    const amount = parseFloat(this.amount.value);
    const category = this.category.value;
    const date = this.date.value;
    const editId = this.editId.value;
    if (!title || !amount || amount <= 0 || !category || !date) {
      showToast('Please fill in all fields', 'error');
      return;
    }
    if (editId) {
      updateExpense(parseInt(editId), { title, amount, category, createdAt: new Date(date).toISOString() });
      showToast(`Updated: ${title} - ${formatCurrency(amount)}`, 'success');
    } else {
      addExpense({ id: Date.now(), title, amount, category, createdAt: new Date(date).toISOString() });
      showToast(`Added: ${title} - ${formatCurrency(amount)}`, 'success');
    }
    animateOut(this.modal);
    if (window.app && typeof window.app.refresh === 'function') setTimeout(() => window.app.refresh(), 300);
  }

  resetForm() {
    this.form.reset();
    this.editId.value = '';
    this.modalTitle.textContent = 'Add Expense';
    this.submitBtn.textContent = 'Add Expense';
    this.date.valueAsDate = new Date();
  }

  openEdit(expense) {
    this.editId.value = expense.id;
    this.title.value = expense.title;
    this.amount.value = expense.amount;
    this.category.value = expense.category;
    this.date.value = expense.createdAt.split('T')[0];
    this.modalTitle.textContent = 'Edit Expense';
    this.submitBtn.textContent = 'Save Changes';
    animateIn(this.modal);
  }
}
