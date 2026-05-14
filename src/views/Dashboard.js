// Dashboard View
import { loadExpenses, seedDemoData } from '../data/db.js';
import { formatCurrency, startOfMonth, startOfWeek } from '../data/format.js';
import { renderExpenseCard } from '../components/ExpenseCard.js';
import { renderCategoryBreakdown } from '../components/CategoryChart.js';
import { showToast } from '../utils/notifications.js';

export class Dashboard {
  constructor() { this.expenses = []; this.filteredExpenses = []; }

  init() {
    seedDemoData();
    this.refresh();
    this.bindEvents();
    document.getElementById('expenseDate').valueAsDate = new Date();
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') { document.body.classList.add('light-theme'); document.getElementById('themeIcon').textContent = '☀️'; }
  }

  bindEvents() {
    document.getElementById('searchInput').addEventListener('input', () => this.filter());
    document.getElementById('filterCategory').addEventListener('change', () => this.filter());
    document.getElementById('sortBy').addEventListener('change', () => this.filter());
    document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
    document.getElementById('deleteConfirmBtn').addEventListener('click', () => { if (window.confirmDelete) window.confirmDelete(); });
    document.getElementById('deleteCancelBtn').addEventListener('click', () => { document.getElementById('deleteOverlay').hidden = true; });
  }

  refresh() {
    this.expenses = loadExpenses();
    this.filter();
    this.updateStats();
    this.updateBalance();
    renderCategoryBreakdown(this.filteredExpenses);
  }

  filter() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    const sort = document.getElementById('sortBy').value;
    this.filteredExpenses = this.expenses.filter(e => {
      const matchSearch = !search || e.title.toLowerCase().includes(search) || e.category.toLowerCase().includes(search);
      const matchCategory = !category || e.category === category;
      return matchSearch && matchCategory;
    });
    switch (sort) {
      case 'newest': this.filteredExpenses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
      case 'oldest': this.filteredExpenses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); break;
      case 'highest': this.filteredExpenses.sort((a, b) => b.amount - a.amount); break;
      case 'lowest': this.filteredExpenses.sort((a, b) => a.amount - b.amount); break;
    }
    this.renderTransactions();
  }

  renderTransactions() {
    const list = document.getElementById('transactionList');
    const empty = document.getElementById('emptyState');
    list.innerHTML = '';
    if (this.filteredExpenses.length === 0) { empty.hidden = false; return; }
    empty.hidden = true;
    this.filteredExpenses.slice(0, 20).forEach(expense => list.appendChild(renderExpenseCard(expense)));
  }

  updateStats() {
    const total = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    const monthStart = startOfMonth();
    const monthly = this.expenses.filter(e => new Date(e.createdAt) >= monthStart).reduce((sum, e) => sum + e.amount, 0);
    const weekStart = startOfWeek();
    const weekly = this.expenses.filter(e => new Date(e.createdAt) >= weekStart).reduce((sum, e) => sum + e.amount, 0);
    document.getElementById('monthlyTotal').textContent = formatCurrency(monthly);
    document.getElementById('weeklyTotal').textContent = formatCurrency(weekly);
    document.getElementById('transactionCount').textContent = this.expenses.length;
  }

  updateBalance() {
    const total = this.expenses.reduce((sum, e) => sum + e.amount, 0);
    document.getElementById('totalExpenses').textContent = formatCurrency(total);
    document.getElementById('balanceAmount').textContent = formatCurrency(total);
  }

  openEdit(id) {
    const expense = this.expenses.find(e => e.id === id);
    if (expense && window.app && window.app.form) window.app.form.openEdit(expense);
  }

  toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    document.getElementById('themeIcon').textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }
}
