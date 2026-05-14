// Expense Card Component
import { CATEGORY_ICONS } from '../data/db.js';
import { formatCurrency, formatDate, getCategoryColor } from '../data/format.js';
import { slideInElement } from '../utils/animations.js';
import { showDeleteModal } from '../index.js';

export function renderExpenseCard(expense) {
  const card = document.createElement('div');
  card.className = 'expense-card';
  card.setAttribute('role', 'article');
  card.setAttribute('aria-label', `${expense.title}, ${formatCurrency(expense.amount)}`);
  const color = getCategoryColor(expense.category);
  const icon = CATEGORY_ICONS[expense.category] || '📦';
  card.innerHTML = `
    <div class="card-left" style="border-left: 3px solid ${color}"><span class="card-icon">${icon}</span></div>
    <div class="card-content">
      <h4 class="card-title">${expense.title}</h4>
      <div class="card-meta"><span class="card-category" style="color: ${color}">${expense.category}</span><span class="card-date">${formatDate(expense.createdAt)}</span></div>
    </div>
    <div class="card-right">
      <span class="card-amount">-${formatCurrency(expense.amount)}</span>
      <div class="card-actions">
        <button class="action-btn edit-btn" data-id="${expense.id}" aria-label="Edit ${expense.title}">✏️</button>
        <button class="action-btn delete-btn" data-id="${expense.id}" aria-label="Delete ${expense.title}">🗑️</button>
      </div>
    </div>
  `;
  card.querySelector('.edit-btn').addEventListener('click', () => { if (window.app && window.app.openEdit) window.app.openEdit(parseInt(expense.id)); });
  card.querySelector('.delete-btn').addEventListener('click', () => showDeleteModal(expense.id));
  slideInElement(card);
  return card;
}
