/**
 * 文件说明：PaoGe Lit 首页应用，负责高级个人导航首页、资源搜索、分类筛选、天气展示和 CMS 数据接入
 * 作者：Codex
 * 创建时间：2026-06-30
 */
import '@picocss/pico/css/pico.min.css';
import { LitElement, css, html, nothing } from 'lit';

const fallbackCategories = [
  { id: 'featured', name: '精选', icon: '✨', is_active: 1 },
  { id: 'ai', name: 'AI', icon: '🤖', is_active: 1 },
  { id: 'dev', name: '开发', icon: '⌨️', is_active: 1 },
  { id: 'design', name: '设计', icon: '🎨', is_active: 1 },
  { id: 'tools', name: '效率', icon: '⚡', is_active: 1 },
  { id: 'media', name: '内容', icon: '🎬', is_active: 1 }
];

const fallbackSites = [
  { id: 1, name: 'OpenAI', url: 'https://openai.com', description: 'AI 产品与研究入口', icon: 'AI', category: 'ai', is_featured: 1, status: 'active' },
  { id: 2, name: 'ChatGPT', url: 'https://chatgpt.com', description: '智能对话与创作助手', icon: '💬', category: 'ai', is_featured: 1, status: 'active' },
  { id: 3, name: 'GitHub', url: 'https://github.com', description: '代码托管与开源协作平台', icon: '⌘', category: 'dev', is_featured: 1, status: 'active' },
  { id: 4, name: 'MDN', url: 'https://developer.mozilla.org', description: 'Web 标准与前端技术文档', icon: '📚', category: 'dev', status: 'active' },
  { id: 5, name: 'Figma', url: 'https://figma.com', description: '协作式界面设计工具', icon: 'F', category: 'design', status: 'active' },
  { id: 6, name: 'Notion', url: 'https://notion.so', description: '文档、知识库与项目管理工具', icon: 'N', category: 'tools', status: 'active' }
];

const searchEngines = [
  { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
  { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'baidu', name: '百度', url: 'https://www.baidu.com/s?wd=' },
  { id: 'duck', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' }
];

/**
 * PaoGe 首页根组件。
 * 这里用 Lit 管理状态和模板，避免继续维护大段字符串拼接的纯静态页面。
 */
class PaogeApp extends LitElement {
  static properties = {
    categories: { state: true },
    sites: { state: true },
    activeCategory: { state: true },
    keyword: { state: true },
    activeEngine: { state: true },
    theme: { state: true },
    weather: { state: true },
    loading: { state: true }
  };

  static styles = css`
    :host {
      --font: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
      display: block;
      min-height: 100vh;
      font-family: var(--font);
    }

    :host([data-theme="dark"]) {
      --bg: #07080d;
      --bg-soft: #0d1018;
      --panel: rgba(15, 18, 27, .78);
      --panel-solid: #111522;
      --card: rgba(255, 255, 255, .065);
      --card-strong: rgba(255, 255, 255, .105);
      --line: rgba(255, 255, 255, .105);
      --line-strong: rgba(255, 255, 255, .18);
      --text: #f8fafc;
      --muted: rgba(248, 250, 252, .68);
      --weak: rgba(248, 250, 252, .42);
      --brand: #6effc9;
      --brand-2: #8e7dff;
      --accent: #ffd27d;
      --shadow: 0 26px 90px rgba(0, 0, 0, .36);
    }

    :host([data-theme="light"]) {
      --bg: #f4f6fb;
      --bg-soft: #edf2f7;
      --panel: rgba(255, 255, 255, .82);
      --panel-solid: #ffffff;
      --card: rgba(255, 255, 255, .72);
      --card-strong: #ffffff;
      --line: rgba(15, 23, 42, .1);
      --line-strong: rgba(15, 23, 42, .16);
      --text: #111827;
      --muted: rgba(17, 24, 39, .68);
      --weak: rgba(17, 24, 39, .42);
      --brand: #00a878;
      --brand-2: #5b5ff6;
      --accent: #b7791f;
      --shadow: 0 24px 70px rgba(15, 23, 42, .11);
    }

    * { box-sizing: border-box; }
    a { color: inherit; text-decoration: none; }
    button, input { font: inherit; }

    .page {
      position: relative;
      min-height: 100vh;
      color: var(--text);
      background:
        radial-gradient(circle at 16% 0%, color-mix(in srgb, var(--brand), transparent 78%), transparent 30rem),
        radial-gradient(circle at 86% 4%, color-mix(in srgb, var(--brand-2), transparent 82%), transparent 34rem),
        linear-gradient(180deg, var(--bg), var(--bg-soft));
      overflow: hidden;
    }

    .page::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      opacity: .13;
      background-image:
        linear-gradient(var(--line) 1px, transparent 1px),
        linear-gradient(90deg, var(--line) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: linear-gradient(to bottom, #000, transparent 76%);
    }

    .shell {
      position: relative;
      z-index: 1;
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 22px 0 34px;
    }

    .topbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 34px;
    }

    .brand {
      display: inline-flex;
      align-items: center;
      gap: 12px;
    }

    .brand-mark {
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 15px;
      color: #06110d;
      font-weight: 950;
      letter-spacing: -.04em;
      background: linear-gradient(135deg, var(--brand), #e8fff5 68%, var(--accent));
      box-shadow: 0 14px 36px color-mix(in srgb, var(--brand), transparent 74%);
    }

    .brand-name { font-size: 1.08rem; font-weight: 900; letter-spacing: -.04em; }
    .brand-desc { margin-top: 1px; color: var(--weak); font-size: .76rem; }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-actions a,
    .nav-actions button {
      display: inline-grid;
      place-items: center;
      min-height: 38px;
      padding: 0 13px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      background: var(--card);
      cursor: pointer;
      transition: .18s ease;
    }

    .nav-actions a:hover,
    .nav-actions button:hover {
      color: var(--text);
      border-color: var(--line-strong);
      background: var(--card-strong);
    }

    .hero {
      display: grid;
      gap: 22px;
      max-width: 900px;
      margin: 0 auto 26px;
      text-align: center;
    }

    .eyebrow {
      justify-self: center;
      padding: 7px 12px;
      border: 1px solid color-mix(in srgb, var(--brand), transparent 68%);
      border-radius: 999px;
      color: color-mix(in srgb, var(--brand), var(--text) 24%);
      background: color-mix(in srgb, var(--brand), transparent 91%);
      font-size: .72rem;
      font-weight: 900;
      letter-spacing: .16em;
    }

    .hero h1 {
      margin: 0;
      font-size: clamp(2.8rem, 7vw, 6.2rem);
      line-height: .92;
      letter-spacing: -.09em;
    }

    .hero h1 span {
      color: transparent;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      -webkit-background-clip: text;
      background-clip: text;
    }

    .hero p {
      max-width: 640px;
      margin: 0 auto;
      color: var(--muted);
      font-size: 1.02rem;
      line-height: 1.8;
    }

    .search-card {
      max-width: 880px;
      margin: 0 auto 18px;
      padding: 12px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: var(--shadow);
      backdrop-filter: blur(24px);
    }

    .search-form {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      margin: 0;
    }

    .search-wrap { position: relative; }
    .search-wrap::before {
      content: "⌘";
      position: absolute;
      left: 18px;
      top: 50%;
      color: var(--weak);
      transform: translateY(-50%);
    }

    input[type="search"] {
      width: 100%;
      min-height: 62px;
      margin: 0;
      padding: 0 18px 0 48px;
      border: 1px solid var(--line);
      border-radius: 20px;
      outline: 0;
      color: var(--text);
      background: color-mix(in srgb, var(--panel-solid), transparent 8%);
      box-shadow: none;
      transition: .18s ease;
    }

    input[type="search"]:focus {
      border-color: color-mix(in srgb, var(--brand), transparent 45%);
      box-shadow: 0 0 0 4px color-mix(in srgb, var(--brand), transparent 88%);
    }

    .search-button {
      min-width: 118px;
      min-height: 62px;
      border: 0;
      border-radius: 20px;
      color: #06110d;
      font-weight: 950;
      background: linear-gradient(135deg, var(--brand), #e8fff5 68%, var(--accent));
      cursor: pointer;
      box-shadow: 0 14px 34px color-mix(in srgb, var(--brand), transparent 78%);
    }

    .engine-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    }

    .engine-button {
      padding: 7px 11px;
      border: 1px solid transparent;
      border-radius: 999px;
      color: var(--weak);
      background: transparent;
      cursor: pointer;
    }

    .engine-button.active {
      color: var(--text);
      border-color: var(--line);
      background: var(--card);
    }

    .status-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin: 18px 0 22px;
    }

    .status-card {
      min-height: 82px;
      padding: 15px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: var(--panel);
      box-shadow: 0 16px 44px rgba(0, 0, 0, .12);
      backdrop-filter: blur(18px);
    }

    .status-card strong {
      display: block;
      font-size: 1.35rem;
      letter-spacing: -.04em;
    }

    .status-card span {
      color: var(--weak);
      font-size: .78rem;
    }

    .weather-card {
      grid-column: span 2;
    }

    .category-bar {
      position: sticky;
      top: 12px;
      z-index: 20;
      display: flex;
      gap: 9px;
      overflow-x: auto;
      margin: 0 0 16px;
      padding: 10px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: color-mix(in srgb, var(--panel-solid), transparent 12%);
      box-shadow: var(--shadow);
      backdrop-filter: blur(22px);
      scrollbar-width: none;
    }

    .category-bar::-webkit-scrollbar { display: none; }

    .category-button {
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-height: 42px;
      padding: 0 14px;
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--muted);
      background: var(--card);
      cursor: pointer;
      transition: .18s ease;
    }

    .category-button:hover {
      color: var(--text);
      border-color: var(--line-strong);
      background: var(--card-strong);
    }

    .category-button.active {
      color: #06110d;
      border-color: transparent;
      font-weight: 900;
      background: linear-gradient(135deg, var(--brand), #e8fff5);
    }

    .category-count {
      padding: 2px 7px;
      border-radius: 999px;
      background: color-mix(in srgb, currentColor, transparent 88%);
      font-size: .74rem;
    }

    .featured-section,
    .resource-section {
      margin-top: 16px;
    }

    .section-head {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 14px;
      margin: 0 0 12px;
    }

    .section-head h2 {
      margin: 0;
      font-size: 1.35rem;
      letter-spacing: -.05em;
    }

    .section-head p {
      margin: 5px 0 0;
      color: var(--weak);
      font-size: .9rem;
    }

    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 12px;
    }

    .featured-card {
      position: relative;
      min-height: 142px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 26px;
      background:
        radial-gradient(circle at top right, color-mix(in srgb, var(--brand), transparent 76%), transparent 42%),
        var(--panel);
      box-shadow: var(--shadow);
      overflow: hidden;
      transition: .18s ease;
    }

    .featured-card:hover {
      transform: translateY(-3px);
      border-color: color-mix(in srgb, var(--brand), transparent 48%);
    }

    .featured-icon {
      width: 44px;
      height: 44px;
      display: grid;
      place-items: center;
      margin-bottom: 18px;
      border-radius: 16px;
      color: #06110d;
      font-weight: 950;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      overflow: hidden;
    }

    .featured-card h3,
    .site-card h3 {
      margin: 0 0 6px;
      letter-spacing: -.03em;
    }

    .featured-card p,
    .site-card p {
      display: -webkit-box;
      margin: 0;
      overflow: hidden;
      color: var(--muted);
      font-size: .88rem;
      line-height: 1.55;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .group-card {
      margin-bottom: 14px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 28px;
      background: var(--panel);
      box-shadow: 0 18px 54px rgba(0, 0, 0, .14);
      backdrop-filter: blur(18px);
    }

    .group-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 13px;
    }

    .group-title {
      display: inline-flex;
      align-items: center;
      gap: 10px;
    }

    .group-title h2 {
      margin: 0;
      font-size: 1.18rem;
      letter-spacing: -.04em;
    }

    .group-count {
      color: var(--weak);
      font-size: .84rem;
    }

    .site-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 10px;
    }

    .site-card {
      display: grid;
      grid-template-columns: 40px 1fr;
      gap: 11px;
      min-height: 104px;
      padding: 13px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: color-mix(in srgb, var(--panel-solid), transparent 24%);
      transition: .18s ease;
    }

    .site-card:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--brand), transparent 55%);
      background: var(--card-strong);
    }

    .site-icon {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border-radius: 14px;
      color: #06110d;
      font-weight: 950;
      background: linear-gradient(135deg, var(--brand), var(--brand-2));
      overflow: hidden;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,.24);
    }

    .site-icon img,
    .featured-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .site-meta {
      margin-top: 8px;
      color: var(--weak);
      font-size: .74rem;
    }

    .empty-state {
      padding: 56px 20px;
      border: 1px dashed var(--line-strong);
      border-radius: 24px;
      color: var(--muted);
      text-align: center;
      background: var(--card);
    }

    @media (max-width: 860px) {
      .shell { width: min(100% - 20px, 1180px); padding-top: 14px; }
      .topbar { align-items: flex-start; flex-direction: column; margin-bottom: 24px; }
      .nav-actions { width: 100%; overflow-x: auto; }
      .hero { text-align: left; }
      .eyebrow { justify-self: start; }
      .search-form { grid-template-columns: 1fr; }
      .search-button { min-height: 52px; }
      .status-row { grid-template-columns: repeat(2, 1fr); }
      .weather-card { grid-column: span 2; }
      .site-grid, .featured-grid { grid-template-columns: 1fr; }
    }
  `;

  constructor() {
    super();
    this.categories = [...fallbackCategories];
    this.sites = [...fallbackSites];
    this.activeCategory = 'all';
    this.keyword = '';
    this.activeEngine = localStorage.getItem('paoge-engine') || 'bing';
    this.theme = localStorage.getItem('paoge-theme') || 'dark';
    this.weather = null;
    this.loading = true;
    this.setAttribute('data-theme', this.theme);
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadCmsData();
    this.loadWeather();
  }

  updated(changedProperties) {
    // 主题状态同步到宿主属性，CSS 变量会立即切换整站视觉。
    if (changedProperties.has('theme')) this.setAttribute('data-theme', this.theme);
  }

  activeSites() {
    return this.sites.filter(site => site.status !== 'inactive');
  }

  visibleSites() {
    const query = this.keyword.trim().toLowerCase();
    return this.activeSites().filter(site => {
      const category = this.categories.find(item => item.id === site.category);
      const matchCategory = this.activeCategory === 'all' || site.category === this.activeCategory;
      const matchKeyword = !query || [site.name, site.description, site.url, category?.name]
        .filter(Boolean)
        .some(value => String(value).toLowerCase().includes(query));
      return matchCategory && matchKeyword;
    });
  }

  featuredSites() {
    const featured = this.activeSites().filter(site => Number(site.is_featured) === 1 || site.category === 'featured');
    return (featured.length ? featured : this.activeSites()).slice(0, 4);
  }

  visibleCategories() {
    return this.categories.filter(category => category.is_active !== 0);
  }

  countByCategory(categoryId) {
    return this.activeSites().filter(site => categoryId === 'all' || site.category === categoryId).length;
  }

  groupedSites() {
    const list = this.visibleSites();
    if (this.activeCategory !== 'all') {
      const category = this.visibleCategories().find(item => item.id === this.activeCategory) || { id: this.activeCategory, name: '当前分类', icon: '📁' };
      return [{ category, sites: list }];
    }
    return this.visibleCategories()
      .map(category => ({ category, sites: list.filter(site => site.category === category.id) }))
      .filter(group => group.sites.length);
  }

  renderIcon(site) {
    const icon = site.icon || site.ico || site.name?.[0] || '↗';
    if (/^https?:\/\//.test(icon) || icon.startsWith('/')) {
      return html`<img src=${icon} alt=${site.name} loading="lazy" @error=${event => { event.currentTarget.replaceWith(document.createTextNode(site.name?.[0] || '↗')); }}>`;
    }
    return icon;
  }

  setCategory(categoryId) {
    this.activeCategory = categoryId;
  }

  setEngine(engineId) {
    this.activeEngine = engineId;
    localStorage.setItem('paoge-engine', engineId);
  }

  updateKeyword(event) {
    this.keyword = event.target.value;
  }

  toggleTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('paoge-theme', this.theme);
  }

  submitSearch(event) {
    event.preventDefault();
    const value = this.keyword.trim();
    if (!value) return;

    const looksLikeUrl = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}/i.test(value);
    if (looksLikeUrl) {
      window.open(value.startsWith('http') ? value : `https://${value}`, '_blank', 'noopener');
      return;
    }

    const engine = searchEngines.find(item => item.id === this.activeEngine) || searchEngines[0];
    window.open(engine.url + encodeURIComponent(value), '_blank', 'noopener');
  }

  trackClick(siteId) {
    if (siteId) fetch(`/api/sites/${siteId}/click`, { method: 'POST' }).catch(() => {});
  }

  async loadCmsData() {
    try {
      const [siteRes, catRes, settingsRes] = await Promise.all([
        fetch('/api/sites').catch(() => null),
        fetch('/api/categories').catch(() => null),
        fetch('/api/settings').catch(() => null)
      ]);

      if (siteRes?.ok) {
        const apiSites = await siteRes.json();
        if (Array.isArray(apiSites) && apiSites.length) this.sites = apiSites;
      }
      if (catRes?.ok) {
        const apiCategories = await catRes.json();
        if (Array.isArray(apiCategories) && apiCategories.length) this.categories = apiCategories;
      }
      if (settingsRes?.ok) {
        const settings = await settingsRes.json();
        if (settings.site_icon) {
          const icon = document.querySelector('link[rel="icon"]');
          if (icon) icon.href = settings.site_icon;
        }
      }
    } finally {
      this.loading = false;
    }
  }

  async loadWeather() {
    try {
      const res = await fetch('/api/weather').catch(() => null);
      if (!res?.ok) return;
      const data = await res.json();
      if (!data.enabled || !data.now) return;
      this.weather = data;
    } catch (err) {
      this.weather = null;
    }
  }

  renderEngines() {
    return html`
      <div class="engine-row" aria-label="搜索引擎">
        ${searchEngines.map(engine => html`
          <button class="engine-button ${engine.id === this.activeEngine ? 'active' : ''}" type="button" @click=${() => this.setEngine(engine.id)}>${engine.name}</button>
        `)}
      </div>
    `;
  }

  renderWeatherCard() {
    if (!this.weather?.now) {
      return html`<div class="status-card weather-card"><strong>--</strong><span>天气未启用</span></div>`;
    }
    const now = this.weather.now;
    const place = this.weather.city || this.weather.region || this.weather.country || '当前位置';
    return html`<div class="status-card weather-card"><strong>${now.text || '天气'} · ${now.temp || '--'}℃</strong><span>${place} · IP 自动定位</span></div>`;
  }

  renderCategoryBar() {
    const categories = [{ id: 'all', name: '全部', icon: '🌐' }, ...this.visibleCategories()];
    return html`
      <div class="category-bar">
        ${categories.map(category => html`
          <button class="category-button ${category.id === this.activeCategory ? 'active' : ''}" type="button" @click=${() => this.setCategory(category.id)}>
            <span>${category.icon || '📁'}</span>
            <span>${category.name}</span>
            <span class="category-count">${this.countByCategory(category.id)}</span>
          </button>
        `)}
      </div>
    `;
  }

  renderFeatured() {
    return html`
      <section class="featured-section">
        <div class="section-head">
          <div>
            <h2>精选入口</h2>
            <p>个人导航站最常用的一组快捷访问。</p>
          </div>
        </div>
        <div class="featured-grid">
          ${this.featuredSites().map(site => html`
            <a class="featured-card" href=${site.url} target="_blank" rel=${`noopener${site.nofollow ? ' nofollow' : ''}`} @click=${() => this.trackClick(site.id)}>
              <div class="featured-icon">${this.renderIcon(site)}</div>
              <h3>${site.name}</h3>
              <p>${site.description || site.desc || '值得收藏的网络入口'}</p>
            </a>
          `)}
        </div>
      </section>
    `;
  }

  renderSiteCard(site) {
    const categoryName = this.categories.find(category => category.id === site.category)?.name || '未分类';
    return html`
      <a class="site-card" href=${site.url} target="_blank" rel=${`noopener${site.nofollow ? ' nofollow' : ''}`} @click=${() => this.trackClick(site.id)}>
        <div class="site-icon">${this.renderIcon(site)}</div>
        <div>
          <h3>${site.name}</h3>
          <p>${site.description || site.desc || '值得收藏的网络入口'}</p>
          <div class="site-meta">${categoryName} · 打开资源</div>
        </div>
      </a>
    `;
  }

  renderGroups() {
    if (this.loading) return html`<div class="empty-state">正在加载资源...</div>`;
    const list = this.visibleSites();
    if (!list.length) return html`<div class="empty-state">没有找到匹配资源。可以换个关键词，或到后台补充站点。</div>`;

    return html`
      ${this.groupedSites().map(group => html`
        <section class="group-card">
          <div class="group-head">
            <div class="group-title">
              <span>${group.category.icon || '📁'}</span>
              <h2>${group.category.name}</h2>
            </div>
            <div class="group-count">${group.sites.length} 个资源</div>
          </div>
          <div class="site-grid">${group.sites.map(site => this.renderSiteCard(site))}</div>
        </section>
      `)}
    `;
  }

  render() {
    const activeCount = this.activeSites().length;
    const visibleCount = this.visibleSites().length;

    return html`
      <div class="page">
        <div class="shell">
          <header class="topbar">
            <a class="brand" href="/" aria-label="PaoGe 首页">
              <div class="brand-mark">PG</div>
              <div>
                <div class="brand-name">PaoGe</div>
                <div class="brand-desc">personal navigation</div>
              </div>
            </a>
            <div class="nav-actions">
              <a href="about.html">关于</a>
              <a href="links.html">友链</a>
              <a href="contribute.html">提交</a>
              <button type="button" @click=${this.toggleTheme}>主题</button>
              <a href="/admin">后台</a>
            </div>
          </header>

          <section class="hero">
            <div class="eyebrow">PAOGE NAVIGATION</div>
            <h1>更清爽的<br><span>个人导航</span></h1>
            <p>把常用网站、AI 工具、开发资源和效率入口放在一个高级、直观、可维护的页面里。</p>
          </section>

          <section class="search-card">
            <form class="search-form" @submit=${this.submitSearch}>
              <div class="search-wrap">
                <input type="search" .value=${this.keyword} placeholder="搜索站内资源，或输入网址 / 关键词" autocomplete="off" @input=${this.updateKeyword}>
              </div>
              <button class="search-button" type="submit">搜索</button>
            </form>
            ${this.renderEngines()}
          </section>

          <section class="status-row" aria-label="站点概览">
            <div class="status-card"><strong>${activeCount}</strong><span>收录资源</span></div>
            <div class="status-card"><strong>${this.visibleCategories().length}</strong><span>资源分类</span></div>
            <div class="status-card"><strong>${visibleCount}</strong><span>当前显示</span></div>
            ${this.renderWeatherCard()}
          </section>

          ${this.renderCategoryBar()}
          ${this.activeCategory === 'all' && !this.keyword ? this.renderFeatured() : nothing}

          <section class="resource-section">
            <div class="section-head">
              <div>
                <h2>资源列表</h2>
                <p>按分类整理，一眼找到并打开。</p>
              </div>
            </div>
            ${this.renderGroups()}
          </section>
        </div>
      </div>
    `;
  }
}

customElements.define('paoge-app', PaogeApp);
