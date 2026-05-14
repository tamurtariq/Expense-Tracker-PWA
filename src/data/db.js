// Database abstraction using localStorage
const STORAGE_KEY = 'expense_tracker_expenses';

export const CATEGORY_ICONS = {
  Food: '🍎', Transport: '🚗', Shopping: '🛍️',
  Bills: '🏠', Entertainment: '🎬', Health: '🏥', Other: '📦'
};

export function loadExpenses() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Failed to load expenses:', e);
    return [];
  }
}

export function saveExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    return true;
  } catch (e) {
    console.error('Failed to save expenses:', e);
    return false;
  }
}

export function addExpense(expense) {
  const expenses = loadExpenses();
  expenses.unshift(expense);
  saveExpenses(expenses);
  return expense;
}

export function updateExpense(id, updates) {
  const expenses = loadExpenses();
  const index = expenses.findIndex(e => e.id === id);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updates };
    saveExpenses(expenses);
    return expenses[index];
  }
  return null;
}

export function deleteExpense(id) {
  const expenses = loadExpenses();
  saveExpenses(expenses.filter(e => e.id !== id));
}

export function getTotalByCategory(expenses) {
  return expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
}

export function seedDemoData() {
  if (loadExpenses().length > 0) return;
  const now = new Date();
  const demoData = [
    { id: Date.now() - 86400000 * 6, title: 'Grocery Shopping', amount: 45.50, category: 'Food', createdAt: new Date(now - 86400000 * 6).toISOString() },
    { id: Date.now() - 86400000 * 5, title: 'Uber Ride', amount: 12.00, category: 'Transport', createdAt: new Date(now - 86400000 * 5).toISOString() },
    { id: Date.now() - 86400000 * 4, title: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', createdAt: new Date(now - 86400000 * 4).toISOString() },
    { id: Date.now() - 86400000 * 3, title: 'Electric Bill', amount: 89.00, category: 'Bills', createdAt: new Date(now - 86400000 * 3).toISOString() },
    { id: Date.now() - 86400000 * 2, title: 'New Shoes', amount: 67.50, category: 'Shopping', createdAt: new Date(now - 86400000 * 2).toISOString() },
    { id: Date.now() - 86400000, title: 'Doctor Visit', amount: 50.00, category: 'Health', createdAt: new Date(now - 86400000).toISOString() },
    { id: Date.now() - 3600000, title: 'Coffee & Snacks', amount: 8.75, category: 'Food', createdAt: new Date(now - 3600000).toISOString() },
  ];
  saveExpenses(demoData);
}
