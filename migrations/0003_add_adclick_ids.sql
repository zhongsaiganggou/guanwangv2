-- Phase 12: Persist Google Ads click IDs (gclid/gbraid/wbraid) on leads.
-- Click IDs arrive on the ad landing URL, are stored in a first-party cookie
-- by the frontend, and submitted with every inquiry. Existing rows are left
-- untouched (columns default to NULL).

ALTER TABLE leads ADD COLUMN gclid TEXT;
ALTER TABLE leads ADD COLUMN gbraid TEXT;
ALTER TABLE leads ADD COLUMN wbraid TEXT;
