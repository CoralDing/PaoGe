-- PaoGe Cloudflare D1 初始化数据
-- 说明：这份数据用于首次部署时填充后台账号、分类、页面、友链和默认站点。

-- 后台默认账号仅用于首次登录；deploy.js 会把占位符替换成随机密码，手动执行时请自行替换。
INSERT INTO users (username, password, role) VALUES ('admin', '__PAOGE_ADMIN_PASSWORD__', 'admin');

-- PaoGe 的分类围绕效率、创作、开发和日常使用场景组织，避免旧项目的垂直娱乐导航风格。
INSERT INTO categories (id, name, icon, sort_order, is_active) VALUES
('featured', '精选入口', '✨', 1, 1),
('ai', 'AI 工具', '🤖', 2, 1),
('dev', '开发资源', '⌨️', 3, 1),
('design', '设计灵感', '🎨', 4, 1),
('productivity', '效率协作', '⚡', 5, 1),
('knowledge', '知识学习', '📚', 6, 1),
('media', '内容媒体', '🎬', 7, 1),
('life', '生活服务', '🌿', 8, 1);

-- 站点设置会被前台和后台共同读取，因此这里统一写入 pao.ge 的品牌信息。
INSERT INTO settings (key, value) VALUES
('site_name', 'PaoGe'),
('site_description', '去更远的地方，从 PaoGe 开始'),
('weather_api_key', ''),
('weather_enabled', 'false'),
('weather_location', '101010100'),
('footer_text', 'PaoGe © 2026 · pao.ge'),
('footer_blog_url', 'https://pao.ge'),
('footer_github_url', 'https://github.com/paoge'),
('theme_primary_color', '#45f0c2'),
('theme_secondary_color', '#6c7cff'),
('submission_enabled', 'true'),
('auto_nofollow', 'false');

-- 页面内容保留给 CMS 后台继续编辑，默认文案先体现新品牌定位。
INSERT INTO pages (id, title, content) VALUES
('about', '关于 PaoGe', '<p>PaoGe 是一个面向效率、创作、开发与日常生活的高质量网址导航。我们更关注入口是否长期可靠、是否真的提升效率，而不是简单堆叠链接。</p><p>这里会持续整理值得长期收藏的网站、工具和内容入口，让你减少搜索成本，把时间花在真正重要的事情上。</p>'),
('contribute', '提交收录', '<p>如果你发现了稳定、清爽、有明确价值的网站，欢迎提交给 PaoGe。我们会优先收录长期可用、体验友好、内容健康的资源。</p>'),
('links', '合作伙伴', '<p>这里展示与 PaoGe 气质相近的站点和长期合作伙伴。如果你希望交换链接，请先确保站点内容稳定、无明显广告干扰。</p>');

-- 默认站点数量保持克制，方便上线后通过后台继续扩展，而不是一次性导入大量无关内容。
INSERT INTO sites (name, url, description, icon, category, sort_order, status) VALUES
('PaoGe', 'https://pao.ge', 'PaoGe 官方入口', 'PG', 'featured', 1, 'active'),
('Product Hunt', 'https://www.producthunt.com', '发现新产品和创意工具', 'P', 'featured', 2, 'active'),
('Hacker News', 'https://news.ycombinator.com', '技术创业与开发者社区', 'HN', 'featured', 3, 'active'),
('OpenAI', 'https://openai.com', 'AI 产品与研究入口', '🤖', 'ai', 1, 'active'),
('ChatGPT', 'https://chatgpt.com', '智能对话与创作助手', '💬', 'ai', 2, 'active'),
('Claude', 'https://claude.ai', 'AI 对话与文档处理助手', 'C', 'ai', 3, 'active'),
('Perplexity', 'https://www.perplexity.ai', '答案型 AI 搜索工具', '🔎', 'ai', 4, 'active'),
('GitHub', 'https://github.com', '代码托管与开源协作平台', '⌘', 'dev', 1, 'active'),
('MDN Web Docs', 'https://developer.mozilla.org', 'Web 标准与前端技术文档', '📚', 'dev', 2, 'active'),
('npm', 'https://www.npmjs.com', 'JavaScript 包管理生态入口', '📦', 'dev', 3, 'active'),
('Vercel', 'https://vercel.com', '前端应用部署与托管平台', '▲', 'dev', 4, 'active'),
('Cloudflare', 'https://www.cloudflare.com', '边缘网络、CDN 和安全服务', '☁️', 'dev', 5, 'active'),
('Figma', 'https://figma.com', '协作式界面设计工具', '🎛️', 'design', 1, 'active'),
('Dribbble', 'https://dribbble.com', '设计作品与视觉灵感社区', '🏀', 'design', 2, 'active'),
('Mobbin', 'https://mobbin.com', '产品界面设计参考库', 'M', 'design', 3, 'active'),
('Unsplash', 'https://unsplash.com', '高质量免费图片素材', '📷', 'design', 4, 'active'),
('Notion', 'https://notion.so', '文档、知识库与项目管理工具', 'N', 'productivity', 1, 'active'),
('ProcessOn', 'https://processon.com', '流程图、思维导图与协作白板', '🧭', 'productivity', 2, 'active'),
('飞书', 'https://www.feishu.cn', '团队协作与办公套件', '🪽', 'productivity', 3, 'active'),
('TinyPNG', 'https://tinypng.com', '图片压缩与体积优化工具', '🐼', 'productivity', 4, 'active'),
('Coursera', 'https://www.coursera.org', '系统化在线课程平台', '🎓', 'knowledge', 1, 'active'),
('Khan Academy', 'https://www.khanacademy.org', '免费学习资源平台', 'K', 'knowledge', 2, 'active'),
('Wikipedia', 'https://www.wikipedia.org', '开放百科知识库', 'W', 'knowledge', 3, 'active'),
('YouTube', 'https://youtube.com', '视频内容与知识频道平台', '▶', 'media', 1, 'active'),
('Bilibili', 'https://www.bilibili.com', '中文视频内容与社区平台', 'B', 'media', 2, 'active'),
('Spotify', 'https://open.spotify.com', '音乐与播客内容平台', '♫', 'media', 3, 'active'),
('高德地图', 'https://www.amap.com', '地图导航与出行服务', '🗺️', 'life', 1, 'active'),
('12306', 'https://www.12306.cn', '中国铁路官方购票平台', '🚄', 'life', 2, 'active'),
('国家政务服务平台', 'https://gjzwfw.www.gov.cn', '政务服务统一入口', '🏛️', 'life', 3, 'active');

-- 默认友链只保留自身占位，后续可在后台替换为真实合作伙伴。
INSERT INTO links (name, url, description, icon, sort_order) VALUES
('PaoGe', 'https://pao.ge', '高效、清爽、可持续维护的上网入口', 'PG', 1);
