-- Add advanced option columns to leads table
ALTER TABLE leads ADD COLUMN wind_load TEXT;
ALTER TABLE leads ADD COLUMN snow_load TEXT;
ALTER TABLE leads ADD COLUMN seismic_requirement TEXT;
ALTER TABLE leads ADD COLUMN crane_capacity TEXT;
ALTER TABLE leads ADD COLUMN equipment_load TEXT;
