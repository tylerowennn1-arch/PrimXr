// ============================================
// PRIMXCAPITAL — Premium Crypto Investment Platform
// ============================================

// --- Global API & Supabase Configuration Context ---
const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYW5zenF0Y2tpeHhyc3R1dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NjA0MjYsImV4cCI6MjA5NDIzNjQyNn0.Svgyw3nqvKBAYWSI5hIFsM0z3GW-KUiC6xLTuWRCQ7A";
const SUPABASE_URL = "https://yganszqtckixxrstuvad.supabase.co";

// Initialize Supabase Client immediately
let _supabaseInstance = null;

function getSupabase() {
  if (!_supabaseInstance && window.supabase) {
    _supabaseInstance = window.supabase.createClient(SUPABASE_URL, ANON_KEY);
  }
  return _supabaseInstance;
}
// Timing-proof helper function
function runSafe(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

// --- Translations ---
const translations = {
  en: {
    nav_login: 'Login', nav_register: 'Get Started',
    hero_badge: 'Trusted by 50,000+ investors worldwide',
    hero_title_1: 'Advanced Digital', hero_title_2: 'Asset Platform',
    hero_subtitle: 'Securely manage and monitor your digital financial activity with institutional-grade tools and real-time analytics.',
    hero_cta_1: 'Get Started', hero_cta_2: 'Login',
    stat_users: 'Active Users', stat_volume: 'Trading Volume', stat_uptime: 'Uptime',
    logos_title: 'Featured in leading financial publications',
    hiw_tag: 'Getting Started', hiw_title: 'How It Works', hiw_subtitle: 'Start your investment journey in four simple steps',
    hiw_step1_title: 'Create Your Account', hiw_step1_desc: 'Sign up with your email and complete our streamlined verification process in minutes.',
    hiw_step2_title: 'Choose Account Tier', hiw_step2_desc: 'Select the investment plan that matches your financial goals and risk appetite.',
    hiw_step3_title: 'Fund Your Account', hiw_step3_desc: 'Deposit funds using cryptocurrency or bank transfer with instant processing.',
    hiw_step4_title: 'Monitor Dashboard', hiw_step4_desc: 'Track your portfolio performance, earnings, and transactions in real-time.',
    tiers_tag: 'Investment Plans', tiers_title: 'Choose Your Investment Tier', tiers_subtitle: 'Flexible plans designed for every level of investor',
    tier_starter: 'Starter', tier_basic: 'Basic', tier_standard: 'Standard', tier_premium: 'Premium',
    tier_daily_roi: 'Daily ROI', tier_popular: 'Most Popular',
    tier_feat_1: 'Basic portfolio tracking', tier_feat_2: 'Email support', tier_feat_3: 'Weekly reports',
    tier_feat_4: 'Advanced analytics', tier_feat_5: 'Priority support', tier_feat_6: 'Daily reports',
    tier_feat_7: 'Full analytics suite', tier_feat_8: '24/7 dedicated support', tier_feat_9: 'Real-time alerts', tier_feat_10: 'Tax optimization',
    tier_feat_11: 'Institutional tools', tier_feat_12: 'Personal account manager', tier_feat_13: 'API access', tier_feat_14: 'Custom strategies', tier_feat_15: 'VIP events',
    tier_get_started: 'Get Started',
    calc_tag: 'ROI Calculator', calc_title: 'Investment Calculator', calc_subtitle: 'See your projected returns based on your investment amount',
    calc_amount: 'Investment Amount ($)', calc_plan: 'Select Plan', calc_button: 'Calculate Returns',
    calc_daily: 'Daily Return', calc_weekly: 'Weekly Return', calc_monthly: 'Monthly Return', calc_total: 'Total (30 days)',
    feat_tag: 'Why PrimXcapital', feat_title: 'Platform Features', feat_subtitle: 'Everything you need for a secure and profitable investment experience',
    feat_1_title: 'Secure Infrastructure', feat_1_desc: '256-bit encryption, cold storage, and multi-signature wallets protect your assets.',
    feat_2_title: 'Fast Processing', feat_2_desc: 'Instant deposits and withdrawals processed within minutes, not days.',
    feat_3_title: '24/7 Support', feat_3_desc: 'Round-the-clock customer support via live chat, email, and phone.',
    feat_4_title: 'Advanced Monitoring', feat_4_desc: 'Real-time portfolio tracking with advanced analytics and performance metrics.',
    feat_5_title: 'Real-Time Dashboard', feat_5_desc: 'Comprehensive dashboard with live data, charts, and transaction history.',
    feat_6_title: 'Multi-Language', feat_6_desc: 'Platform available in English, Spanish, French, German, Portuguese, and Arabic.',
    trust_tag: 'Trust & Compliance', trust_subtitle: 'Established 2008 — Registered Digital Asset Platform',
    trust_desc: 'PrimXcapital is a registered digital asset management platform operating under international financial regulations. Our platform has been serving investors worldwide since 2008, maintaining the highest standards of security, transparency, and regulatory compliance.',
    trust_badge_1: 'SSL Secured', trust_badge_2: 'KYC Verified', trust_badge_3: 'Regulated',
    test_tag: 'Client Stories', test_title: 'What Our Investors Say',
    test_1_quote: '"PrimXcapital has completely transformed my investment portfolio. The returns have been consistent and the platform is incredibly easy to use."',
    test_2_quote: '"The Standard plan has exceeded all my expectations. Daily returns are processed promptly and the support team is always available."',
    test_3_quote: '"I\'ve been using PrimXcapital for over 2 years now. The Premium tier offers exceptional value with personalized account management."',
    test_4_quote: '"Security and transparency are my top priorities. PrimXcapital delivers on both fronts with their robust infrastructure."',
    faq_tag: 'FAQ', faq_title: 'Frequently Asked Questions',
    faq_q1: 'How do I create an account?', faq_a1: 'Click the "Get Started" button and fill in your details. Verification takes less than 5 minutes. Once verified, you can immediately fund your account and start investing.',
    faq_q2: 'How do I fund my account?', faq_a2: 'Navigate to the Deposit page in your dashboard. You can fund your account using Bitcoin (BTC), Ethereum (ETH), or USDT. Simply copy the wallet address, send your funds, and submit the transaction reference.',
    faq_q3: 'How long does processing take?', faq_a3: 'Cryptocurrency deposits are typically confirmed within 10-30 minutes depending on network congestion. Withdrawals are processed within 24 hours after approval.',
    faq_q4: 'Is the platform secure?', faq_a4: 'Absolutely. We use 256-bit SSL encryption, cold storage for digital assets, multi-signature wallets, and two-factor authentication. Our infrastructure is monitored 24/7 by security professionals.',
    faq_q5: 'How do I contact support?', faq_a5: 'You can reach our support team 24/7 via live chat on the platform, email at support@primxcapital.com, or through the contact form in your dashboard settings.',
    cta_title: 'Ready to Start Investing?', cta_subtitle: 'Join 50,000+ investors who trust PrimXcapital with their digital assets.', cta_button: 'Create Free Account',
    footer_desc: 'Advanced digital asset platform established in 2008. Secure, transparent, and profitable.',
    footer_platform: 'Platform', footer_how: 'How It Works', footer_plans: 'Investment Plans', footer_calc: 'ROI Calculator', footer_features: 'Features',
    footer_company: 'Company', footer_about: 'About Us', footer_careers: 'Careers', footer_press: 'Press', footer_contact: 'Contact',
    footer_legal: 'Legal', footer_privacy: 'Privacy Policy', footer_terms: 'Terms of Service', footer_disclosures: 'Disclosures', footer_cookies: 'Cookie Policy',
    footer_contact_title: 'Contact', footer_disclaimer: 'Digital asset investments carry risk. Past performance does not guarantee future results.',
    login_title: 'Welcome Back', login_subtitle: 'Sign in to your PrimXcapital account',
    login_email: 'Email Address', login_password: 'Password', login_remember: 'Remember me', login_forgot: 'Forgot password?',
    login_button: 'Sign In', login_no_account: "Don't have an account?", login_register: 'Create one',
    register_title: 'Create Account', register_subtitle: 'Start your investment journey today',
    register_name: 'Full Name', register_email: 'Email Address', register_password: 'Password', register_confirm: 'Confirm Password',
    register_button: 'Create Account', register_have_account: 'Already have an account?', register_login: 'Sign in',
    dash_nav_dashboard: 'Dashboard', dash_nav_deposit: 'Deposits', dash_nav_withdraw: 'Withdrawals',
    dash_nav_activity: 'Activity', dash_nav_settings: 'Settings', dash_nav_logout: 'Logout',
    dash_balance: 'Account Balance', dash_tier: 'Active Tier', dash_deposits: 'Total Deposits', dash_withdrawals: 'Total Withdrawals',
    dash_all_time: 'All time', dash_wallet_title: 'Deposit Wallet Addresses',
    dash_chart_title: 'Portfolio Performance', dash_trans_title: 'Recent Transactions', dash_view_all: 'View All',
    dash_th_type: 'Type', dash_th_amount: 'Amount', dash_th_method: 'Method', dash_th_status: 'Status', dash_th_date: 'Date'
  }
};

let currentLang = 'en';

// --- Navigation Scroll Effect ---
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.pageYOffset > 50);
  });
}

// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// --- Password Visibility Toggle ---
runSafe(() => {
  document.querySelectorAll('.auth__toggle-password').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          button.classList.add('visible');
        } else {
          input.type = 'password';
          button.classList.remove('visible');
        }
      }
    });
  });
});

// --- Language Selector ---
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

if (langBtn && langDropdown) {
  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('active');
  });

  langDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = a.dataset.lang;
      const curEl = document.getElementById('currentLang');
      if (curEl) curEl.textContent = currentLang.toUpperCase();
      langDropdown.classList.remove('active');
      applyTranslations();
      localStorage.setItem('primx_lang', currentLang);
    });
  });

  document.addEventListener('click', () => langDropdown.classList.remove('active'));
}

function applyTranslations() {
  const t = translations[currentLang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });
}

// --- Fade In Animations ---
const fadeElements = document.querySelectorAll('.fade-in');
if (fadeElements.length > 0) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  fadeElements.forEach(el => fadeObserver.observe(el));
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq__item').forEach(item => {
  const q = item.querySelector('.faq__question');
  if (q) {
    q.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  }
});

// --- Investment Calculator ---
const calcAmount = document.getElementById('calcAmount');
const calcPlan = document.getElementById('calcPlan');
const calcBtn = document.getElementById('calcBtn');

if (calcBtn && calcAmount && calcPlan) {
  function calculateReturns() {
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

  calcBtn.addEventListener('click', calculateReturns);
  calcAmount.addEventListener('input', calculateReturns);
  calcPlan.addEventListener('change', calculateReturns);
  calculateReturns();
}

// --- Native Supabase Registration System ---
runSafe(() => {
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("regName").value;
      const selectedTier = document.getElementById("regTier").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;
      const btn = document.getElementById("registerBtn");

      if (window.hcaptcha && !hcaptcha.getResponse()) {
        alert("Please complete the captcha verification.");
        return;
      }

      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }

      btn.textContent = "Creating account...";
      btn.disabled = true;

      const client = getSupabase();
      if (!client) {
        alert("Supabase library initialization pending. Try again in a second.");
        btn.textContent = "Create Account";
        btn.disabled = false;
        return;
      }

      const signUpOptions = {};
      if (window.hcaptcha) {
        const token = hcaptcha.getResponse();
        if (token) {
          signUpOptions.captchaToken = token;
        }
      }

      const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
        options: signUpOptions,
      });

      if (error) {
        alert(error.message);
        btn.textContent = "Create Account";
        btn.disabled = false;
        return;
      }

      // Create profile entry for the new user (using upsert to prevent unique key violations if DB trigger also runs)
      if (data.user) {
        await client.from('profiles').upsert([
          {
  id: data.user.id,
  name: fullName,
  balance: 10,
  interest_wallet: 0,
  total_invest: 0,
  total_deposits: 0,
  total_withdrawals: 0,
  total_interest: 0,
  profit: 0,
  tier: selectedTier
            }
          ]);
      // Check if email confirmation is required (prevents redirect loop)
      if (!data.session) {
        alert("Account created! Please check your email to confirm your account before logging in.");
        window.location.href = 'login.html';
      } else {
        alert("Account created successfully!");
        window.location.href = 'dashboard.html';
      }
    });
  }
});

// --- Native Supabase Authentication Login System ---
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

      if (window.hcaptcha && !hcaptcha.getResponse()) {
        alert("Please complete the captcha verification.");
        btn.textContent = 'Sign In';
        btn.disabled = false;
        return;
      }

      const client = getSupabase();
      if (!client) {
        alert("Supabase initialization error.");
        btn.textContent = 'Sign In';
        btn.disabled = false;
        return;
      }

      const signInOptions = {};
      if (window.hcaptcha) {
        const token = hcaptcha.getResponse();
        if (token) {
          signInOptions.captchaToken = token;
        }
      }

      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password,
        options: signInOptions,
      });

      if (error) {
        alert(error.message);
        btn.textContent = 'Sign In';
        btn.disabled = false;
        if (window.hcaptcha) hcaptcha.reset();
        return;
      }

      // Check for admin role (ideally from database, but keeping your logic with safety)
      if (data.user.email === 'tylerowennn1@gmail.com') {
        window.location.href = 'admin.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    });
  }
});

// --- Native Dashboard SDK Performance Processing Engine ---
async function loadDashboardData() {
  const client = getSupabase();
  if (!client) return;

  // Use getUser for better security on protected pages
  const { data: { user }, error: authError } = await client.auth.getUser();
  if (authError || !user) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const initials = user.email.slice(0, 2).toUpperCase();
    const avatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userNameDisplay');
    if (avatar) avatar.textContent = initials;
    if (userName) userName.textContent = profile.name || user.email;

    const { data: profiles, error: profError } = await client
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single(); // Use single() if you expect one row

    if (profiles) {
      const profile = profiles;
      const balance = document.getElementById('accountBalance');
      const tier = document.getElementById('tierplan');
      const deposits = document.getElementById('totalDeposit');
      const withdrawals = document.getElementById('totalWithdrawals');
      const interestWallet = document.getElementById('interestWallet');
      
      if (balance) balance.textContent = '$' + parseFloat(profile.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (tier) tier.textContent = (profile.tier || 'Starter').toUpperCase();
      if (deposits) deposits.textContent = '$' + parseFloat(profile.total_deposits || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (withdrawals) withdrawals.textContent = '$' + parseFloat(profile.total_withdrawals || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (interestWallet)
interestWallet.textContent =
'$' + parseFloat(profile.interest_wallet || 0)
.toLocaleString('en-US', { minimumFractionDigits: 2 });
    }

    const { data: transactions } = await client
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    const tbody = document.getElementById('transactionsBody');
    if (tbody && transactions && transactions.length > 0) {
      tbody.innerHTML = transactions.map(tx => `
        <tr>
          <td><span class="badge badge--${tx.type}">${tx.type.toUpperCase()}</span></td>
          <td>$${parseFloat(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          <td>${(tx.method || 'BTC').toUpperCase()}</td>
          <td><span class="badge badge--${tx.status}">${tx.status}</span></td>
          <td>${new Date(tx.created_at).toLocaleDateString()}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to parse active elements metrics context:', err);
  }
}

// --- Native Administrative Security Dashboard Loader ---
async function loadAdminData() {
  const client = getSupabase();
  if (!client) return;

  const { data: { user }, error: authError } = await client.auth.getUser();

  if (authError || !user || user.email !== 'tylerowennn1@gmail.com') {
    alert("Access Denied: Administrative credentials required.");
    window.location.href = "dashboard.html";
    return;
  }

  const { data: allTransactions, error } = await client.from('transactions').select('*');
  if (error) return;

  const adminBody = document.getElementById("adminTransactionsBody");
  if (adminBody) {
    adminBody.innerHTML = "";
    allTransactions.forEach(tx => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${tx.user_id}</td>
        <td><span class="badge badge--${tx.type}">${tx.type.toUpperCase()}</span></td>
        <td>$${parseFloat(tx.amount).toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td>${tx.method}</td>
        <td><span class="badge badge--${tx.status}">${tx.status}</span></td>
        <td>${new Date(tx.created_at).toLocaleDateString()}</td>
        <td>
          <button class="btn btn--small" onclick="updateTransactionStatus('${tx.id}', 'approved')">Approve</button>
          <button class="btn btn--small btn--danger" onclick="updateTransactionStatus('${tx.id}', 'rejected')">Reject</button>
        </td>
      `;
      adminBody.appendChild(row);
    });
  }
}

async function updateTransactionStatus(txId, status) {
  const client = getSupabase();
  if (client) {
    await client.from('transactions').update({ status }).eq('id', txId);
    loadAdminData();
  }
}

// --- Logout Session Purge Hook ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const client = getSupabase();
    if (client) {
      await client.auth.signOut();
      window.location.href = 'index.html';
    }
  });
}

// --- Live Real-Time Crypto Dynamic Metric Tracker ---
runSafe(() => {
  const chartCanvas = document.getElementById('liveMarketChart');
  if (!chartCanvas || typeof Chart === 'undefined') return;

  const ctx = chartCanvas.getContext('2d');
  const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['12:00', '12:05', '12:10', '12:15', '12:20', '12:25'],
      datasets: [{
        label: 'Bitcoin (BTC/USD)',
        data: [64250, 64320, 64180, 64450, 64620, 64500],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 132, 246, 0.05)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
        y: { grid: { color: 'rgba(148, 163, 184, 0.05)' }, ticks: { color: '#94a3b8' } }
      }
    }
  });

  setInterval(() => {
    const now = new Date();
    const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
    
    const lastPrice = liveChart.data.datasets[0].data[liveChart.data.datasets[0].data.length - 1];
    const percentageVariance = (Math.random() - 0.48) * 400; 
    const cleanNextPrice = Math.round(lastPrice + percentageVariance);

    liveChart.data.labels.push(timeStr);
    liveChart.data.datasets[0].data.push(cleanNextPrice);

    if (liveChart.data.labels.length > 10) {
      liveChart.data.labels.shift();
      liveChart.data.datasets[0].data.shift();
    }

    liveChart.update();
  }, 4000);
});

// --- BULLETPROOF PAGE INITIALIZATION HOOK ---
runSafe(() => {
  if (document.getElementById('dashBalance') || document.getElementById('transactionsBody')) {
    loadDashboardData();
  }

  if (document.getElementById('adminTransactionsBody')) {
    loadAdminData();
  }

  const savedLang = localStorage.getItem('primx_lang');
  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
    const curEl = document.getElementById('currentLang');
    if (curEl) curEl.textContent = currentLang.toUpperCase();
  }
  applyTranslations();
});
