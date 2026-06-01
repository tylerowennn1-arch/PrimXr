let supabase;
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYW5zenF0Y2tpeHhyc3R1dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NjA0MjYsImV4cCI6MjA5NDIzNjQyNn0.Svgyw3nqvKBAYWSI5[...]";
const SUPABASE_URL = "https://yganszqtckixxrstuvad.supabase.co";

function initSupabase() {
  if (window.supabase && !supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
    console.log('✓ Supabase initialized');
  }
}

function waitForSupabase(callback) {
  if (window.supabase) {
    initSupabase();
    callback();
  } else {
    setTimeout(() => waitForSupabase(callback), 100);
  }
}

function runSafe(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

function getSupabase() {
  if (!supabase && window.supabase) {
    supabase = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
  }
  return supabase;
}

const translations = {
  en: {
    nav_login: 'Login', nav_register: 'Get Started',
    hero_badge: 'Trusted by 50,000+ investors worldwide',
    dash_balance: 'Account Balance', dash_tier: 'Active Tier', 
    dash_th_type: 'Type', dash_th_amount: 'Amount', dash_th_method: 'Method', 
    dash_th_status: 'Status', dash_th_date: 'Date',
    dash_history_title: 'Recent Ledger Movements'
  }
};

let currentLang = 'en';

function applyTranslations() {
  const t = translations[currentLang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
}

function calculateReturns() {
  const calcAmount = document.getElementById('calcAmount');
  const calcPlan = document.getElementById('calcPlan');
  if (!calcAmount || !calcPlan) return;
  
  const amount = parseFloat(calcAmount.value) || 0;
  const dailyRate = parseFloat(calcPlan.value) / 100;
  const daily = amount * dailyRate;
  const weekly = daily * 7;
  const monthly = daily * 30;
  const total = amount + monthly;

  const dEl = document.getElementById('dailyReturn');
  const wEl = document.getElementById('weeklyReturn');
  const mEl = document.getElementById('monthlyReturn');
  const tEl = document.getElementById('totalReturn');

  if (dEl) dEl.textContent = '$' + daily.toFixed(2);
  if (wEl) wEl.textContent = '$' + weekly.toFixed(2);
  if (mEl) mEl.textContent = '$' + monthly.toFixed(2);
  if (tEl) tEl.textContent = '$' + total.toFixed(2);
}

runSafe(() => {
  const calcAmount = document.getElementById('calcAmount');
  const calcPlan = document.getElementById('calcPlan');
  const calcBtn = document.getElementById('calcBtn');

  if (calcBtn && calcAmount && calcPlan) {
    calcBtn.addEventListener('click', calculateReturns);
    calcAmount.addEventListener('input', calculateReturns);
    calcPlan.addEventListener('change', calculateReturns);
    calculateReturns();
  }
});

runSafe(() => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;
      const btn = document.getElementById("registerBtn");

      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }

      btn.textContent = "Creating account...";
      btn.disabled = true;

      waitForSupabase(async () => {
        const client = getSupabase();
        if (!client) {
          alert("Supabase not initialized");
          btn.textContent = "Create Account";
          btn.disabled = false;
          return;
        }

        try {
          const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
          });

          if (error) {
            alert("Registration error: " + error.message);
            btn.textContent = "Create Account";
            btn.disabled = false;
            return;
          }

          if (data.user) {
            try {
              await client.from('profiles').insert({
                id: data.user.id,
                name: fullName,
                email: email,
                balance: 0,
                tier: 'Starter',
                total_deposits: 0,
                total_withdrawals: 0,
                created_at: new Date().toISOString()
              });
            } catch (err) {
              console.warn('Profile creation error:', err);
            }

            alert("Account created! Redirecting...");
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 1500);
          }
        } catch (err) {
          console.error('Registration error:', err);
          alert("Error: " + err.message);
          btn.textContent = "Create Account";
          btn.disabled = false;
        }
      });
    });
  }
});

runSafe(() => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const btn = document.getElementById('loginBtn');

      btn.textContent = 'Signing in...';
      btn.disabled = true;

      waitForSupabase(async () => {
        const client = getSupabase();
        if (!client) {
          alert("Supabase not initialized");
          btn.textContent = 'Sign In';
          btn.disabled = false;
          return;
        }

        try {
          const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password,
          });

          if (error) {
            alert("Login error: " + error.message);
            btn.textContent = 'Sign In';
            btn.disabled = false;
            return;
          }

          if (data.user) {
            window.location.href = 'dashboard.html';
          }
        } catch (err) {
          console.error('Login error:', err);
          alert("Error: " + err.message);
          btn.textContent = 'Sign In';
          btn.disabled = false;
        }
      });
    });
  }
});

async function loadDashboardData() {
  const client = getSupabase();
  if (!client) {
    console.error('Supabase not initialized');
    return;
  }

  try {
    const { data: { session }, error: sessionError } = await client.auth.getSession();
    
    if (sessionError || !session) {
      window.location.href = 'login.html';
      return;
    }

    const user = session.user;
    const userEmailDisplay = document.getElementById('userEmailDisplay');
    if (userEmailDisplay) userEmailDisplay.textContent = user.email;

    const { data: profiles } = await client.from('profiles').select('*').eq('id', user.id).single();

    if (profiles) {
      const accountBalance = document.getElementById('accountBalance');
      const tierPlan = document.getElementById('tierPlan');
      const totalDeposit = document.getElementById('totalDeposit');
      const totalWithdrawals = document.getElementById('totalWithdrawals');

      if (accountBalance) accountBalance.textContent = '$' + parseFloat(profiles.balance || 0).toFixed(2);
      if (tierPlan) tierPlan.textContent = (profiles.tier || 'Starter').toUpperCase();
      if (totalDeposit) totalDeposit.textContent = '$' + parseFloat(profiles.total_deposits || 0).toFixed(2);
      if (totalWithdrawals) totalWithdrawals.textContent = '$' + parseFloat(profiles.total_withdrawals || 0).toFixed(2);
    }

    const { data: transactions } = await client.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10);

    const tbody = document.getElementById('transactionsBody');
    if (tbody) {
      if (transactions && transactions.length > 0) {
        tbody.innerHTML = transactions.map(tx => `<tr><td><span class="badge badge--${tx.type}">${tx.type.toUpperCase()}</span></td><td>$${parseFloat(tx.amount).toFixed(2)}</td><td>${(tx.method || 'BTC').toUpperCase()}</td><td><span class="badge badge--${tx.status}">${tx.status}</span></td><td>${new Date(tx.created_at).toLocaleDateString()}</td></tr>`).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">No transactions yet</td></tr>';
      }
    }
  } catch (err) {
    console.error('Dashboard error:', err);
  }
}

const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    waitForSupabase(async () => {
      const client = getSupabase();
      if (client) {
        try {
          await client.auth.signOut();
          window.location.href = 'index.html';
        } catch (err) {
          window.location.href = 'index.html';
        }
      }
    });
  });
}

runSafe(() => {
  if (document.getElementById('accountBalance')) {
    waitForSupabase(() => loadDashboardData());
  }
  applyTranslations();
  waitForSupabase(() => console.log('✓ Ready'));
});