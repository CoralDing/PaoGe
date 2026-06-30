# PaoGe

PaoGe 是一个部署在 Cloudflare 上的网址导航站，包含前台导航页面和后台内容管理系统。它适合用来整理常用网站、维护分类、接收用户投稿，并通过后台统一管理站点内容。

> 当前工程以 Cloudflare Workers（Cloudflare 的边缘函数运行环境）+ D1（Cloudflare 提供的 SQLite 数据库）为核心，不再包含旧文档中提到的本地 Express（Node.js 后端框架）服务结构。

## 项目亮点

- **前后台一体**：前台负责展示导航、关于、友链和投稿页面；后台负责管理数据。
- **Cloudflare 原生部署**：静态资源、接口服务和数据库都放在 Cloudflare 体系内，部署链路简单。
- **完整 CMS 能力**：支持站点、分类、标签、页面、友链、用户、日志、统计和备份管理。
- **投稿与反馈闭环**：用户可以提交新站点，也可以上报问题，管理员在后台审核处理。
- **一键部署脚本**：`npm run deploy` 会自动检查登录、创建数据库、初始化数据并发布 Worker。
- **首次密码更安全**：初始化数据库时会生成随机后台密码，避免线上保留固定默认密码。

## 技术组成

| 模块 | 使用技术 | 说明 |
| --- | --- | --- |
| 前台页面 | HTML（网页结构）、CSS（样式）、JavaScript（浏览器脚本） | 位于 `public/`，直接作为静态资源发布 |
| 后台页面 | HTML、CSS、JavaScript | 位于 `public/admin/`，通过接口读写数据 |
| 接口服务 | Hono（轻量 Web 框架） | 位于 `worker/index.js`，运行在 Cloudflare Workers 上 |
| 数据库 | D1（Cloudflare 托管 SQLite 数据库） | 表结构在 `database/schema.sql`，初始数据在 `database/seed.sql` |
| 部署工具 | Wrangler（Cloudflare 官方命令行工具） | 用于本地预览、数据库操作和线上部署 |

## 目录结构

```text
PaoGe/
├── public/                    # 前台和后台静态页面
│   ├── index.html             # 导航首页
│   ├── about.html             # 关于页面
│   ├── links.html             # 友链页面
│   ├── contribute.html        # 投稿页面
│   ├── robots.txt             # 搜索引擎抓取规则
│   ├── sitemap.xml            # 站点地图
│   └── admin/                 # 后台管理页面
│       ├── index.html         # 后台登录页
│       ├── dashboard.html     # 站点管理
│       ├── categories.html    # 分类管理
│       ├── health.html        # 站点检测
│       ├── links.html         # 友链管理
│       ├── pages.html         # 页面管理
│       ├── reports.html       # 问题反馈
│       ├── settings.html      # 系统设置
│       ├── stats.html         # 数据统计
│       ├── submissions.html   # 投稿审核
│       ├── users.html         # 用户管理
│       ├── logs.html          # 操作日志
│       └── backup.html        # 数据备份与恢复
├── worker/
│   └── index.js               # Cloudflare Worker 接口入口
├── database/
│   ├── schema.sql             # 数据库表结构
│   └── seed.sql               # 初始分类、站点、页面和管理员数据
├── scripts/
│   └── deploy-cloudflare.js   # 一键部署脚本
├── wrangler.toml              # Cloudflare 项目配置
├── package.json               # 项目脚本和依赖声明
└── README.md                  # 项目说明文档
```

## 快速开始

### 1. 准备环境

你需要先准备：

- Node.js 18+（JavaScript 运行环境，用来执行部署脚本和安装依赖）
- npm（Node.js 自带的包管理工具，用来安装依赖）
- Cloudflare 账号（用于创建 Worker 和 D1 数据库）

### 2. 安装依赖

```bash
npm install
```

这一步会安装 Hono（接口框架）和 Wrangler（Cloudflare 命令行工具）。

### 3. 本地预览

首页现在使用 Vite（前端构建工具）+ Lit（轻量 Web Components 框架）开发，后台管理页面仍保留在 `public/admin/`。

只调试首页 UI 时，运行：

```bash
npm run dev:app
```

访问地址：

```text
http://127.0.0.1:5173
```

如果你需要同时调试 API（接口）和本地 D1（Cloudflare 本地数据库），先启动 Wrangler：

```bash
npm run dev
```

该命令会启动 Wrangler Dev（Cloudflare 本地开发服务），用于在本地模拟 Worker 和静态资源访问。

默认访问地址是：

```text
http://127.0.0.1:8787
```

如果提示 `Address already in use (127.0.0.1:8787)`，说明 `8787` 端口已经被其他本地服务占用。可以改用备用端口：

```bash
npm run dev:alt
```

备用访问地址是：

```text
http://127.0.0.1:8799
```

也可以查看是谁占用了端口：

```bash
lsof -nP -iTCP:8787 -sTCP:LISTEN
```

本地 D1 数据库和线上 D1 数据库是分开的。第一次本地开发时，需要先创建本地表结构：

```bash
npm run db:local:schema
```

如果需要本地后台账号，可以执行下面的 SQL（数据库语句）设置临时密码：

```bash
npx wrangler d1 execute paoge --local --command="INSERT INTO users (username, password, role, is_active) VALUES ('admin', 'PaoGe@2026', 'admin', 1) ON CONFLICT(username) DO UPDATE SET password='PaoGe@2026', role='admin', is_active=1;"
```

本地后台地址：

```text
http://127.0.0.1:8799/admin/
```

本地后台账号：`admin` / `PaoGe@2026`

修改首页源码后，需要执行构建，把 Vite 产物写入 `public/`，这样 Cloudflare Worker 才能发布最新页面：

```bash
npm run build
```

### 4. 推荐方式：本地一键部署到 Cloudflare

```bash
npm run deploy
```

部署脚本会自动完成下面几件事：

1. 检查 Wrangler 是否可用；
2. 引导登录 Cloudflare；
3. 创建或复用名为 `paoge` 的 D1 数据库；
4. 将数据库 ID 写入 `wrangler.toml`；
5. 执行 `database/schema.sql` 创建表；
6. 如果数据库为空，执行 `database/seed.sql` 导入初始数据；
7. 部署 Worker 和 `public/` 目录下的静态资源。

部署成功后，终端会输出：

- 网站地址：`https://paoge.workers.dev`
- 后台地址：`https://paoge.workers.dev/admin`
- 首次账号：`admin`
- 首次密码：由部署脚本随机生成，请保存终端输出

> 首次登录后台后，建议立刻修改管理员密码。

### 5. Cloudflare 控制台直接部署

如果你是在 Cloudflare 控制台里连接 Git 仓库并直接部署，需要先处理 D1 数据库绑定。

控制台部署通常只会执行 `npx wrangler deploy`，它不会自动帮你创建 D1 数据库。如果 `wrangler.toml` 里写的是别人账号下的 `database_id`，就会出现类似错误：

```text
D1 binding 'DB' references database '...' which was not found
```

解决步骤：

1. 进入 Cloudflare 控制台；
2. 打开 `Workers & Pages` → `D1 SQL Database`；
3. 创建一个 D1 数据库，建议名称使用 `paoge`；
4. 复制新数据库的 `database_id`；
5. 回到项目的 `wrangler.toml`，把占位符替换成你自己的数据库 ID：

```toml
database_id = "你的 D1 数据库 ID"
```

项目里默认写的是 `REPLACE_WITH_YOUR_D1_DATABASE_ID`，它只是提醒你要替换，不是可直接部署的真实 ID。

6. 在 Cloudflare 控制台的构建配置中确认部署命令是：

```bash
npx wrangler deploy
```

7. 数据库首次创建后，还需要执行表结构和初始数据。可以在本地执行：

```bash
npx wrangler d1 execute paoge --remote --file=./database/schema.sql
```

8. 再复制一份初始化数据文件，把管理员密码占位符换成你自己的临时密码：

```bash
cp database/seed.sql database/.seed.local.sql
sed -i.bak "s/__PAOGE_ADMIN_PASSWORD__/你的临时密码/g" database/.seed.local.sql
npx wrangler d1 execute paoge --remote --file=./database/.seed.local.sql
rm -f database/.seed.local.sql database/.seed.local.sql.bak
```

> 注意：`database/seed.sql` 里的管理员密码是占位符，不能原样用于正式部署。更推荐使用 `npm run deploy`，它会自动生成随机首次密码，并避免线上保留固定默认密码。

## 后台功能

| 页面 | 能做什么 |
| --- | --- |
| 站点管理 | 新增、编辑、删除、批量更新导航站点 |
| 分类管理 | 管理导航分类、图标和排序 |
| 标签管理 | 为站点维护标签关系 |
| 投稿审核 | 查看用户投稿，审核后转为正式站点 |
| 问题反馈 | 处理用户上报的错误链接或站点问题 |
| 页面管理 | 编辑关于、友链、投稿等内容页 |
| 友链管理 | 维护友情链接列表 |
| 站点检测 | 批量检查站点可访问状态 |
| 数据统计 | 查看站点数量、分类分布和热门点击 |
| 用户管理 | 管理后台用户和启用状态 |
| 操作日志 | 查看管理员关键操作记录 |
| 备份恢复 | 导出或导入站点核心数据 |
| 系统设置 | 修改站点名称、描述、图标等配置 |

## 数据库说明

项目会创建以下核心数据表：

| 表名 | 作用 |
| --- | --- |
| `sites` | 导航站点数据 |
| `categories` | 站点分类 |
| `tags` | 标签信息 |
| `site_tags` | 站点和标签的关联关系 |
| `users` | 后台用户 |
| `sessions` | 登录会话 |
| `settings` | 系统配置 |
| `pages` | 内容页面 |
| `links` | 友情链接 |
| `submissions` | 用户投稿 |
| `reports` | 用户问题反馈 |
| `logs` | 后台操作日志 |
| `stats` | 访问和点击统计 |

## 常用命令

```bash
# 安装依赖
npm install

# 本地开发预览
npm run dev

# 只开发首页 UI
npm run dev:app

# 构建首页到 public 目录
npm run build

# 8787 端口被占用时，使用备用端口 8799
npm run dev:alt

# 初始化本地 D1 表结构
npm run db:local:schema

# 一键部署到 Cloudflare
npm run deploy

# 只执行 Wrangler 部署
npm run deploy:manual
```

## 配置说明

主要配置文件是 `wrangler.toml`：

```toml
name = "pao-ge"
main = "worker/index.js"
compatibility_date = "2025-06-25"

[assets]
directory = "./public"

[[d1_databases]]
binding = "DB"
database_name = "paoge"
database_id = "你的 D1 数据库 ID"
```

字段含义：

- `name`：Worker 项目名称，影响默认访问域名；如果 Cloudflare 控制台项目名是 `pao-ge`，这里也应保持一致。
- `main`：Worker 入口文件。
- `compatibility_date`：Cloudflare Workers 的兼容日期，用来固定运行时行为。
- `assets.directory`：静态资源目录。
- `binding`：代码中访问数据库时使用的变量名，本项目固定为 `DB`。
- `database_name`：D1 数据库名称。
- `database_id`：D1 数据库唯一 ID，必须属于你当前登录的 Cloudflare 账号；本地一键部署脚本会自动写入。

如果你看到 `Failed to match Worker name`，说明 Cloudflare 控制台里的 Worker 名称和 `wrangler.toml` 的 `name` 不一致。把两边改成同一个名称即可。

## 接口概览

接口统一由 `worker/index.js` 提供，前台和后台都通过 `/api/...` 访问。

| 接口分类 | 代表接口 |
| --- | --- |
| 登录认证 | `POST /api/auth/login`、`PUT /api/auth/password` |
| 站点管理 | `GET /api/sites`、`POST /api/sites`、`PUT /api/sites/:id`、`DELETE /api/sites/:id` |
| 分类管理 | `GET /api/categories`、`POST /api/categories`、`PUT /api/categories/:id` |
| 投稿反馈 | `POST /api/submissions`、`GET /api/submissions`、`POST /api/reports` |
| 页面友链 | `GET /api/pages`、`PUT /api/pages/:id`、`GET /api/links` |
| 统计日志 | `GET /api/stats/overview`、`GET /api/logs` |
| 备份恢复 | `GET /api/export`、`POST /api/import` |
| 工具能力 | `GET /api/fetch-icon`、`POST /api/health-check`、`POST /api/upload` |

需要后台权限的接口会校验登录 Token（登录令牌）。普通用户可访问前台展示、投稿、反馈等公开接口。

## 部署注意事项

- `npm run deploy` 会修改 `wrangler.toml` 中的 `database_id`，这是正常行为。
- 初始化数据只会在 `sites` 表为空时导入，避免覆盖已有线上数据。
- 部署脚本生成的临时 SQL 文件会自动删除，防止首次密码残留在项目目录。
- 如果你更换了 Worker 名称，默认访问地址也会随之变化。
- 如果绑定自定义域名，需要到 Cloudflare 控制台中额外配置路由或域名。

## 适合的使用场景

- 个人网址收藏导航；
- 团队内部工具入口；
- AI、设计、开发等垂直资源目录；
- 可投稿、可审核的资源推荐站；
- 轻量 CMS（内容管理系统）练习项目。

## License

本项目基于 MIT License（宽松开源协议）发布。
