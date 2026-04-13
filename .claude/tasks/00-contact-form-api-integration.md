# Task: Replace mailto with API Contact Endpoint

**Repo:** iqs-flow-marketing
**Branch:** claude/contact-api
**Depends on:** API `POST /api/contact` endpoint deployed

## What

Replace the `mailto:` hack in the contact form with a real fetch to `https://api.iqsflow.com/api/contact`. Add a honeypot field for spam protection.

## Files

- Modify: `src/app/contact/page.tsx`

## Implementation

### Replace handleSubmit function

Replace the existing `handleSubmit` (which uses `window.location.href = mailto:...`) with:

```typescript
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSending(true);
  const form = e.currentTarget;
  const data = new FormData(form);
  try {
    const res = await fetch("https://api.iqsflow.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        company: data.get("company"),
        message: data.get("message"),
        website: data.get("website"),
      }),
    });
    if (!res.ok) throw new Error("Failed");
    setSubmitted(true);
  } catch {
    alert("Failed to send. Please email info@iqsflow.com directly.");
  } finally {
    setSending(false);
  }
}
```

### Add honeypot field

Add a hidden field inside the form (bots fill it, humans don't see it):

```html
<input name="website" type="text" style={{ position: "absolute", left: "-9999px" }} tabIndex={-1} autoComplete="off" />
```

### Update success message

Replace the current success text ("Your email client should have opened...") with:

```
"We received your message and will get back to you within one business day."
```

Remove the fallback text about emailing directly.

## Verification

```bash
npm run build
```
