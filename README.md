# Dynasties Capital Landing (Frontend + Backend)

这个项目根据你给的版式素材实现：
- 前端：单页 Landing + Contact 表单（Name/Email/Message）
- 后端：仅记录 Email（SQLite）

## 1) 启动后端
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app:app --reload --port 8000
```

## 2) 启动前端
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 3) 提交邮箱
前端点击 Submit 后，会 POST 到：
`POST http://localhost:8000/api/emails`
Body: `{"email":"xxx@yyy.com"}`

## 数据库
默认生成在 `backend/emails.db`
