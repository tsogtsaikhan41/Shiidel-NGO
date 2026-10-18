# Шийдэл вэб сайт

Static site, no build step. Pages: `index.html`, `services.html`, `academy.html`, `insights.html`, `blog.html`, `post.html`, `admin.html`.
Everything you'd normally change is in **`config.js`**.

```
config.js            ← email, phone, address, Supabase keys, optional photo/video
assets/data.js       ← 5 management areas, academy modules, sample posts
assets/site.js       ← header, footer (About + contact), forms, diagram animation
assets/styles.css
supabase-setup.sql   ← run once in Supabase for the admin panel
vercel.json
```

## 1. Deploy (GitHub + Vercel)
1. Upload this whole folder to a GitHub repository (keep the folder structure).
2. Vercel → **Add New → Project → Import** the repo. Framework preset: **Other**. Deploy.
3. Each push to GitHub redeploys automatically.
4. Name/domain: Vercel project → **Settings → Domains**. Rename the `*.vercel.app` address or add your own domain (e.g. `shiidel.mn`) any time.

## 2. Forms → solutionngo976@gmail.com
All forms (footer contact, the 3-step challenge form, every "Мэдээлэл авах / Үнийн санал авах" button) send through FormSubmit to the email in `config.js`.

**One-time activation:** after the site is live, submit the contact form once yourself. FormSubmit sends an email to solutionngo976@gmail.com with an **Activate Form** button. Click it. From then on every request arrives in that inbox. (Forms only work on the live site, not when opening the file directly on your computer.)

## 3. Админ тохируулах (Supabase, free)
1. Create a free account at **supabase.com** → **New project**.
2. **SQL Editor → New query** → paste all of `supabase-setup.sql` → **Run**.
3. **Project Settings → API**: copy **Project URL** and the **anon public** key into `config.js` (`supabaseUrl`, `supabaseAnonKey`). The anon key is meant to be public; the database rules only let a logged-in admin write.
4. **Authentication → Sign In / Providers**: turn **off** "Allow new users to sign up" so nobody else can create an account.
5. **Authentication → Users → Add user → Create new user**:
   - Email: `shiideladmin2026@admin.shiidel.mn`
   - Password: your admin password
   - Tick **Auto Confirm User**
6. Push to GitHub. Open `yoursite/admin`, log in with:
   - Нэвтрэх нэр: `shiiDELadMIN2026` (case doesn't matter; it becomes the email above)
   - Нууц үг: the password you set in step 5

The password is stored only in Supabase, never in this code. To add another admin, create another user the same way (`newname@admin.shiidel.mn`).

**In the admin panel:** choose **Блог нэмэх** or **Судалгаа нэмэх** → title, summary, area, cover image → add **Текст / Зураг / Видео** blocks in any order → **Нийтлэх**. Posts appear on the site immediately, no redeploy. Videos up to 50MB can be uploaded; for longer videos paste a YouTube link. Published posts can be deleted from the admin home.

Until Supabase is connected, the site shows the 6 sample posts from `assets/data.js`. After connecting, only admin posts show.

## 4. Other edits
- **Team photo in About:** put the image in `images/` and set `aboutImage: "images/team.jpg"` in `config.js`.
- **Intro video on Home:** set `introVideo` to a YouTube link.
- **Academy modules:** edit `MODULES` in `assets/data.js`. Add Team Collab / Legacy of Leadership modules the same way when ready.
