// Category breakdown visualization
import { getTotalByCategory } from '../data/db.js';
import { formatCurrency, getCategoryColor } from '../data/format.js';

export function renderCategoryBreakdown(expenses) {
  const container = document.getElementById('categoryBreakdown');
  const section = document.getElementById('categorySection');
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  if (expenses.length === 0) { section.hidden = true; return; }
  section.hidden = false;
  const categoryTotals = getTotalByCategory(expenses);
  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  container.innerHTML = sorted.map(([category, amount]) => {
    const percentage = total > 0 ? (amount / total * 100) : 0;
    const color = getCategoryColor(category);
    const icons = { Food: '🍎', Transport: '🚗', Shopping: '🛍️', Bills: '🏠', Entertainment: '🎬', Health: '🏥', Other: '📦' };
    return `
      <div class="category-bar">
        <div class="category-bar-header">
          <span class="category-bar-label"><span class="category-bar-icon">${icons[category] || '📦'}</span>${category}</span>
          <span class="category-bar-amount">${formatCurrency(amount)}</span>
        </div>
        <div class="category-bar-track"><div class="category-bar-fill" style="width: ${percentage}%; background: ${color}"></div></div>
        <span class="category-bar-percent">${Math.round(percentage)}%</span>
      </div>
    `;
  }).join('');
}
