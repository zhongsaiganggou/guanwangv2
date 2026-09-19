# Bulk Redirect Pilot - Dashboard Import Instructions

## Prerequisites
- Cloudflare dashboard access to the zhongsai-steelstructure.com zone
- The CSV file: `seo-redirects/bulk-redirects-pilot.csv`

## Step 1: Create Bulk Redirect List
1. Go to Cloudflare Dashboard → select **zhongsai-steelstructure.com** zone
2. Left sidebar → **Rules** → **Redirect Rules**
3. Click the **Bulk Redirects** tab (top of page)
4. Click **Create a bulk redirect**
5. Name: `zhongsai-legacy-seo-redirects`
6. Under "Source URL", select **Import in CSV format**
7. Upload `bulk-redirects-pilot.csv`
8. Verify the preview shows 8 entries
9. Click **Add destinations** / **Save**

## Step 2: Create Redirect Rule
1. Still in **Redirect Rules** → **Bulk Redirects** tab
2. Click **Create rule**
3. Rule name: `legacy-seo-redirect-rule`
4. When incoming requests match:
   - Field: **URI Path**
   - Operator: **is in list**
   - Value: select `zhongsai-legacy-seo-redirects`
5. Then:
   - Action: **Redirect to**
   - Select **Bulk Redirects**
   - List: `zhongsai-legacy-seo-redirects`
   - Status code: **301**
   - Preserve query string: **Off**
6. Click **Deploy**

## Step 3: Verify (do NOT delete _redirects rules yet)
Test all 8 URLs after rule is live:
- Each should return **301** to the expected URL
- Final destination should return **200**

## Step 4: Remove duplicates from _redirects
ONLY after all 8 verified via Bulk:
1. Remove these 8 lines from `public/_redirects`:
   - `/en/products/materials/cz-purlin.html`
   - `/en/blog/steel-structure-corrosion-protection-guide/`
   - `/en/blog/steel-structure-supplier-malaysia-guide/`
   - `/en/products/materials/sandwich-panel.html`
   - `/zh/products/materials/cz-purlin`
   - `/en/projects.html`
   - `/en/steel-warehouse-logistics.html`
   - `/en/blog/steel-structure-supplier-thailand-guide/`
2. Build and deploy
3. Re-verify all 8 still return 301→200

## Rollback
If anything breaks:
1. Disable the `legacy-seo-redirect-rule` in Cloudflare Dashboard
2. Restore `_redirects` from git
3. Redeploy
