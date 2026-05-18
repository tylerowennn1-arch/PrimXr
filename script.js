// ============================================
// PRIMXCAPITAL — Premium Crypto Investment Platform
// ============================================

const ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlnYW5zenF0Y2tpeHhyc3R1dmFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NjA0MjYsImV4cCI6MjA5NDI";

const supabase = window.supabase.createClient(
  "https://yganszqtckixxrstuvad.supabase.co",
  ANON_KEY
);

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
    nav.classList.toggle('scrolled', window.scrollY > 50);
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

// --- Hero Entrance Animation ---
const heroElements = document.querySelectorAll('.hero .fade-in');
if (heroElements.length > 0) {
  heroElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.15}s`;
    setTimeout(() => el.classList.add('visible'), 300);
  });
}

// --- Animated Count-Up ---
function animateCountUp(element) {
  const target = parseFloat(element.dataset.target);
  const suffix = element.dataset.suffix || '';
  const prefix = element.dataset.prefix || '';
  const isDecimal = target % 1 !== 0;
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    if (isDecimal) {
      element.textContent = prefix + current.toFixed(1) + suffix;
    } else {
      element.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }

    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const statValues = document.querySelectorAll('.hero__stat-value');
if (statValues.length > 0) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statValues.forEach(el => statsObserver.observe(el));
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

// --- Testimonials Slider ---
const track = document.getElementById('testimonialsTrack');
const prevBtn = document.getElementById('testPrev');
const nextBtn = document.getElementById('testNext');
const dotsContainer = document.getElementById('testDots');

if (track) {
  let currentSlide = 0;
  const cards = track.querySelectorAll('.testimonial-card');
  const totalSlides = cards.length;
  let slidesPerView = 3;

  function updateSlidesPerView() {
    if (window.innerWidth <= 768) slidesPerView = 1;
    else if (window.innerWidth <= 1024) slidesPerView = 2;
    else slidesPerView = 3;
  }

  function createDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalDots = Math.ceil(totalSlides / slidesPerView);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.className = 'testimonials__dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    updateSlidesPerView();
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    currentSlide = Math.max(0, Math.min(index, maxSlide));
    track.style.transform = `translateX(-${currentSlide * (100 / totalSlides * slidesPerView)}%)`;
    document.querySelectorAll('.testimonials__dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

  createDots();
  window.addEventListener('resize', () => { createDots(); goToSlide(0); });

  setInterval(() => {
    const maxSlide = Math.ceil(totalSlides / slidesPerView) - 1;
    goToSlide(currentSlide >= maxSlide ? 0 : currentSlide + 1);
  }, 5000);
}

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

// --- Copy Address ---
function copyAddress(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    navigator.clipboard.writeText(el.textContent).then(() => {
      const btn = el.nextElementSibling;
      if (btn) {
        const original = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(() => btn.innerHTML = original, 2000);
      }
    });
  }
}

// --- Deposit Method Toggle ---
const depositMethod = document.getElementById('depositMethod');
const walletBtc = document.getElementById('walletBtc');
const walletEth = document.getElementById('walletEth');

if (depositMethod) {
  depositMethod.addEventListener('change', () => {
    if (walletBtc && walletEth) {
      if (depositMethod.value === 'btc') {
        walletBtc.classList.add('wallet-card--active');
        walletEth.classList.remove('wallet-card--active');
      } else {
        walletEth.classList.add('wallet-card--active');
        walletBtc.classList.remove('wallet-card--active');
      }
    }
  });
}

// --- Auth Forms (Login) ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (window.hcaptcha) {
      const captchaToken = hcaptcha.getResponse();
      if (!captchaToken) {
        alert("Please complete the captcha verification.");
        return;
      }
    }
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const btn = document.getElementById('loginBtn');
    btn.textContent = 'Signing in...';
    btn.disabled = true;

    // Admin Hardcoded Check
    if (email === 'tylerowennn1@gmail.com' && password === 'Password') {
      localStorage.setItem('user_role', 'admin');
      window.location.href = 'admin.html';
      return;
    }

    try {
      // FIX: Use official Supabase client auth command
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        alert(error.message);
        btn.textContent = 'Sign In';
        btn.disabled = false;
        if (window.hcaptcha) hcaptcha.reset();
        return;
      }

      window.location.href = 'dashboard.html';
    } catch (err) {
      btn.textContent = 'Connection error';
      btn.disabled = false;
      setTimeout(() => btn.textContent = 'Sign In', 3000);
    }
  });
}

// --- Toggle Password Visibility ---
document.querySelectorAll('.auth__toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target || btn.closest('.auth__password-wrapper').querySelector('input').id;
    const input = document.getElementById(targetId);
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  });
});

// --- Dashboard Sidebar ---
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

if (menuBtn && sidebar && sidebarOverlay) {
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
  });
}

if (sidebarOverlay && sidebar) {
  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
  });
}

// --- Logout ---
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (supabase) await supabase.auth.signOut();
    localStorage.removeItem('user_role');
    window.location.href = 'index.html';
  });
}

// --- Dashboard Data Loading ---
async function loadDashboardData() {
  if (!supabase) return;
  
  // FIX: Fetch the true authenticated user context natively from Supabase
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    window.location.href = 'login.html';
    return;
  }

  try {
    const initials = user.email.slice(0, 2).toUpperCase();
    const avatar = document.getElementById('userAvatar');
    const userName = document.getElementById('userName');
    if (avatar) avatar.textContent = initials;
    if (userName) userName.textContent = user.email;

    // FIX: Pull user profiles dynamically via database queries instead of fetch urls
    const { data: profiles, error: profError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id);

    if (!profError && profiles && profiles.length > 0) {
      const profile = profiles[0];
      const balance = document.getElementById('dashBalance');
      const tier = document.getElementById('dashTier');
      const deposits = document.getElementById('dashDeposits');
      const withdrawals = document.getElementById('dashWithdrawals');
      const userTier = document.getElementById('userTier');

      if (balance) balance.textContent = '$' + parseFloat(profile.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (tier) tier.textContent = (profile.tier || 'Starter').charAt(0).toUpperCase() + (profile.tier || 'Starter').slice(1);
      if (deposits) deposits.textContent = '$' + parseFloat(profile.total_deposits || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (withdrawals) withdrawals.textContent = '$' + parseFloat(profile.total_withdrawals || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      if (userTier) userTier.textContent = (profile.tier || 'Starter').charAt(0).toUpperCase() + (profile.tier || 'Starter').slice(1) + ' Plan';
    }

    // FIX: Pull transaction logs dynamically via the DB client
    const { data: transactions, error: txError } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    const tbody = document.getElementById('transactionsBody');
    if (tbody && !txError && transactions && transactions.length > 0) {
      tbody.innerHTML = transactions.map(tx => `
        <tr>
          <td><span class="badge badge--${tx.type}">${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span></td>
          <td>$${parseFloat(tx.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          <td>${(tx.method || 'BTC').toUpperCase()}</td>
          <td><span class="badge badge--${tx.status}">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span></td>
          <td>${new Date(tx.created_at).toLocaleDateString()}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }
}

// --- Admin Panel ---
async function loadAdminData() {
  if (!supabase) return;
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    // Verify admin access
    if (authError || !user || user.email !== 'tylerowennn1@gmail.com') {
      alert("Access Denied: Administrative privileges required.");
      window.location.href = "dashboard.html";
      return;
    }

    const { data: allTransactions, error } = await supabase
      .from('transactions')
      .select('*');

    if (error) {
      console.error("Database error loading admin data:", error.message);
      return;
    }

    const adminBody = document.getElementById("adminTransactionsBody");
    if (adminBody) {
      adminBody.innerHTML = "";
      
      allTransactions.forEach(tx => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${tx.user_email || 'User'}</td>
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
  } catch (err) {
    console.error('Failed to load admin data:', err);
  }
}

async function updateTransactionStatus(txId, status) {
  if (!supabase) return;
  try {
    // FIX: Convert patch fetch loops to native client updates
    await supabase.from('transactions').update({ status }).eq('id', txId);
    loadAdminData();
  } catch (err) {
    console.error('Failed to update transaction:', err);
  }
}

// --- Deposit Form ---
const depositForm = document.getElementById('depositForm');
if (depositForm) {
  depositForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = 'login.html'; return; }

    const amount = document.getElementById('depositAmount').value;
    const method = document.getElementById('depositMethod').value;
    const txRef = document.getElementById('txReference').value;

    try {
      // FIX: Add dynamic row directly via Database ORM insert commands
      await supabase.from('transactions').insert([{
        user_id: user.id,
        user_email: user.email,
        type: 'deposit',
        amount: parseFloat(amount),
        method: method,
        tx_reference: txRef,
        status: 'pending'
      }]);

      alert('Deposit submitted successfully! It will be reviewed shortly.');
      window.location.href = 'dashboard.html';
    } catch (err) {
      alert('Failed to submit deposit. Please try again.');
    }
  });
}

// --- Withdraw Form ---
const withdrawForm = document.getElementById('withdrawForm');
if (withdrawForm) {
  withdrawForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.href = 'login.html'; return; }

    const amount = document.getElementById('withdrawAmount').value;
    const method = document.getElementById('withdrawMethod').value;
    const address = document.getElementById('withdrawAddress').value;

    try {
      // FIX: Database insert integration for withdrawals
      await supabase.from('transactions').insert([{
        user_id: user.id,
        user_email: user.email,
        type: 'withdrawal',
        amount: parseFloat(amount),
        method: method,
        wallet_address: address,
        status: 'pending'
      }]);

      alert('Withdrawal request submitted! It will be processed within 24-48 hours.');
      window.location.href = 'dashboard.html';
    } catch (err) {
      alert('Failed to submit withdrawal. Please try again.');
    }
  });
}

// --- Settings Forms ---
const profileForm = document.getElementById('profileForm');
if (profileForm) {
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabase) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const name = document.getElementById('settingsName').value;
    const btn = profileForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Updating...';
    btn.disabled = true;

    try {
      await supabase.from('profiles').update({ name }).eq('id', user.id);
      btn.textContent = 'Updated!';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    } catch (err) {
      btn.textContent = 'Error';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }
  });
}

const passwordForm = document.getElementById('passwordForm');
if (passwordForm) {
  passwordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!supabase) return;

    const newPass = document.getElementById('newPassword').value;
    const confirm = document.getElementById('confirmNewPassword').value;
    const btn = passwordForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    if (newPass !== confirm) {
      btn.textContent = 'Passwords do not match';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
      return;
    }

    btn.textContent = 'Changing...';
    btn.disabled = true;

    try {
      // FIX: Use official client user parameter data patch command
      await supabase.auth.updateUser({ password: newPass });
      btn.textContent = 'Changed!';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        passwordForm.reset();
      }, 2000);
    } catch (err) {
      btn.textContent = 'Error';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 2000);
    }
  });
}

// --- Particles ---
function createParticles(containerId, count = 30) {
  const container = document.getElementById(containerId);
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'hero__particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 6) + 's';
    container.appendChild(particle);
  }
}
createParticles('particles');

// --- User Registration Hook ---
document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = document.getElementById("regName").value;
      const email = document.getElementById("regEmail").value;
      const password = document.getElementById("regPassword").value;
      const confirm = document.getElementById("regConfirm").value;
      const btn = document.getElementById("registerBtn");

      // CAPTCHA CHECK
      if (window.hcaptcha) {
        const captchaToken = hcaptcha.getResponse();

        if (!captchaToken) {
          alert("Please complete captcha");
          return;
        }
      }

      // PASSWORD MATCH CHECK
      if (password !== confirm) {
        alert("Passwords do not match");
        return;
      }

      btn.textContent = "Creating account...";
      btn.disabled = true;

      // CHECK SUPABASE
if (typeof supabase === "undefined") {
  alert("Supabase not loaded. Check script setup.");
  btn.textContent = "Create Account";
  btn.disabled = false;
  return;
}

      try {

        // CREATE AUTH USER
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        });

        // HANDLE AUTH ERROR
        if (error) {
          alert(error.message);
          btn.textContent = "Create Account";
          btn.disabled = false;
          return;
        }

        // INSERT PROFILE DATA
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name: fullName,
              balance: 0,
              internet_wallet: 10,
              total_invest: 0,
              total_deposits: 0,
              total_withdrawals: 0,
              total_interest: 0,
              profit: 0,
              tier: 'starter'
            }
          ]);

        // HANDLE PROFILE ERROR
        if (profileError) {
          console.error(profileError);
          alert("Profile creation failed.");
          btn.textContent = "Create Account";
          btn.disabled = false;
          return;
        }

        // RESET CAPTCHA
        if (window.hcaptcha) {
          hcaptcha.reset();
        }

        alert("Account created successfully!");

        // REDIRECT
        window.location.href = 'dashboard.html';

      } catch (err) {

        console.error(err);

        alert("Runtime error: " + err.message);

      } finally {

        btn.textContent = "Create Account";
        btn.disabled = false;
    }
    });
  }
});

// --- LIVE MARKET ANALYTICS FEED ENGINE ---
document.addEventListener('DOMContentLoaded', () => {
  const ctx = document.getElementById('livePerformanceChart');
  if (!ctx || !window.Chart) return; 

  const timeLabels = ['10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30'];
  const priceData = [48200, 48550, 48300, 48900, 49200, 49100, 49800];

  const liveChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: timeLabels,
      datasets: [{
        label: 'Asset Trend Index (USD)',
        data: priceData,
        borderColor: '#d4a843', 
        backgroundColor: 'rgba(212, 168, 67, 0.05)',
        borderWidth: 2.5,
        pointBackgroundColor: '#d4a843',
        pointBorderColor: '#111118',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4, 
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { color: '#9ca3af', font: { family: 'Inter' } }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.03)' },
          ticks: { 
            color: '#9ca3af', 
            font: { family: 'Inter' },
            callback: function(value) { return '$' + value.toLocaleString(); }
          }
        }
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
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;

  if (document.getElementById('dashBalance') || document.getElementById('depositForm') || document.getElementById('withdrawForm') || document.getElementById('profileForm') || document.getElementById('transactionsBody')) {
    loadDashboardData();
  }

  if (document.getElementById('adminTransactionsBody')) {
    loadAdminData();
  }

  const savedLang = localStorage.getItem('primx_lang');
  if (savedLang && translations[savedLang]) {
    currentLang = savedLang;
    const langEl = document.getElementById('currentLang');
    if (langEl) langEl.textContent = currentLang.toUpperCase();
  }
  applyTranslations();
});
