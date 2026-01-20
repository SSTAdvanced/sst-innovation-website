# WebCraft Pro (Next.js + Tailwind)

## วิธีรัน

```bash
npm install
npm run dev
```

## วิธี build

```bash
npm run build
```

## หมายเหตุ

- อนุญาตโดเมนรูปภาพ `static.photos` ผ่าน `next.config.mjs`
- ใช้ Supabase ผ่านค่า env `NEXT_PUBLIC_SUPABASE_URL` และ `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Supabase Setup

1) สร้างไฟล์ `.env.local` จาก `.env.local.example` แล้วใส่ค่า:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2) สร้างตาราง `leads` และเปิด RLS พร้อม policy ให้ anon insert ได้อย่างปลอดภัย (ตัวอย่าง):

```sql
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null,
  message text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

create policy "Allow anon inserts" on public.leads
for insert to anon
with check (auth.role() = 'anon');
```

3) ทดสอบ:
   - `npm run dev`
   - กรอกฟอร์มในหน้าเว็บ แล้วตรวจว่ามีข้อมูลเข้าในตาราง `leads`

หรือยิง API โดยตรง (PowerShell):

```powershell
$body = @{
  name = "ทดสอบ"
  phone = "0999999999"
  email = "test@example.com"
  message = "ส่งจาก curl/PowerShell"
} | ConvertTo-Json

Invoke-RestMethod -Method Post -Uri http://localhost:3000/api/leads -ContentType "application/json" -Body $body
```

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <repo_url>
git push -u origin main
```

