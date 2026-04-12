# Task: Polish copy, add Venice Collier testimonial, link blog

**Branch:** claude/marketing-refresh (same branch)
Do NOT stop to ask questions.
When done, run /check-tasks.

## Actions

### 1. Fix redundant login copy

If the login page is in this repo, find:
- "Sign in to your portal" + "Sign in to your IQS Flow portal"
- Keep only one. Preferred: "Sign in to your portal"

If login is in iqs-flow-web only, skip this and note in .done.md.

### 2. Add Venice Collier testimonial to homepage

Venice Collier is a real co-founder with a real photo on /about (`venice-collier.jpg`).

Add a testimonial section on the homepage (use the large testimonial layout from task 03):
- Photo: Venice Collier
- Title: "Venice Collier, Co-Founder & COO"
- Background: "20+ years in facility management, former VP at ABM Industries"
- Quote: Pull a real quote from the about page or use: "We built IQS Flow because we lived the problem. When you manage cleaning for an airline, you need proof that the work happened - not a vendor's word for it."
- Use Source Serif 4 for the quote text

### 3. Link blog posts where relevant

Check if blog posts exist:
```bash
ls src/app/resources/ src/app/blog/ 2>/dev/null
```

If blog/resources pages exist with real content, add "Learn more" links from relevant feature sections to related blog posts.

### 4. Add credibility line

On the homepage, near the CTA or in the hero area, add a brief credibility signal:
- "Founded by facility management veterans with 40+ combined years in airport operations"
- Or: "Built by the team behind Ubiquity Resources Group"
- Keep it one line, subtle, factual

### 5. Remove any "coming soon" sections

```bash
rg -i "coming soon|under construction|stay tuned|launching soon" src/
```

If found, remove the section entirely. Don't promise features that aren't built.

## Verify

1. `npm run build` - clean
2. Venice Collier testimonial visible on homepage with real photo
3. No redundant copy on login
4. No "coming soon" text anywhere
5. Credibility line present
