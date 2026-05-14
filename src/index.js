// Main App Entry Point
import { db } from './data/db.js';
import { formatCurrency, formatDate, getMonthYear } from './data/format.js';
import { showToast } from './utils/notifications.js';
import { animateIn, animateOut, closeModal } from './utils/animations.js';
import { ExpenseForm } from './components/ExpenseForm.js';
import { ExpenseCard } from './components/ExpenseCard.js';
import { CategoryChart } from './components/CategoryChart.js';
import { Dashboard } from './views/Dashboard.js';

let currentDeleteId = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  const app = new Dashboard();
  const form = new ExpenseForm();
  window.app = { refresh: () => app.refresh(), form, openEdit: (id) => app.openEdit(id) };
  app.init();

  // Delete confirmation
  window.showDeleteModal = (id) => { currentDeleteId = id; document.getElementById('deleteOverlay').hidden = false; animateIn(document.getElementById('deleteOverlay')); };
  window.confirmDelete = () => { if (currentDeleteId) { db.deleteExpense(currentDeleteId); showToast('Expense deleted', 'info'); app.refresh(); } closeModal(document.getElementById('deleteOverlay')); currentDeleteId = null; };

  // Offline indicator
  window.addEventListener('online', () => showToast('Back online', 'success'));
  window.addEventListener('offline', () => showToast('You are offline', 'warning'));
});
