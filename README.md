# FreeText AI 专业版

包含图片上传、手动框选文字区域、可选中文/英文 OCR、OpenAI 图片编辑、PNG 下载，以及 Cloudflare Pages Function 服务端接口。

## 上传 GitHub
解压 ZIP 后，把里面的 `index.html`、`functions` 文件夹、`README.md` 和 `wrangler.toml` 上传到仓库根目录。不要把 API Key 放进仓库。

## Cloudflare 免费部署
1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git，选择 GitHub 仓库 `freetext-ai-pro`。
2. Framework preset 选 None；Build command 留空；Build output directory 填 `.`。
3. 部署后进入项目 Settings → Variables and Secrets → Add，创建加密 Secret：名称 `OPENAI_API_KEY`，值为你的 OpenAI API Key。
4. 重新部署并访问项目的 `*.pages.dev` 网址。

## 说明
- OpenAI API 使用图片编辑接口，可能产生费用；Cloudflare 免费额度不代表 OpenAI API 免费。
- 不要公开 API Key。若曾提交到公开仓库，请立即撤销并重新生成。
- AI 会尽量保留蒙版以外内容，但不能保证字体和背景像素级一致。
- OCR 依赖 Tesseract.js CDN，需要网络。
