// ZhongSai V2 - Shipment Evidence Data Source
// Central data source for Recent Shipments & Container Loading.
// Drives: Shipment Hub, Homepage module, Export Delivery module.
// DO NOT hardcode shipment records into individual pages.
// Update this file + add optimized images to update all three locations.

export type ShipmentImageType =
  | 'components-ready'
  | 'marking'
  | 'packing'
  | 'loading'
  | 'container-inside'
  | 'departure';

export interface ShipmentImage {
  src: string;
  alt: { en: string; zh: string };
  type: ShipmentImageType;
}

export interface ShipmentRecord {
  id: string;
  date: string; // YYYY-MM-DD
  year: number;
  month: number; // 1-12
  destinationCountry?: string;
  destinationRegion?: string;
  application?: string;
  shipmentType?: string;
  containerType?: string;
  scope: string[]; // ZhongSai scope tags
  enTitle: string;
  zhTitle: string;
  enDescription: string;
  zhDescription: string;
  images: ShipmentImage[];
  publish: boolean;
  featured: boolean;
  privacyChecked: boolean;
  /** Mark DEV SAMPLE DATA — must be removed before Production */
  isSample?: boolean;
}

const E = '/images/export/';

// ============================================================
// DEV SAMPLE DATA — clearly marked. Replace with real records.
// These use real ZhongSai export photos but generic metadata.
// Production deploy requires isSample = false on all records.
// ============================================================

export const shipments: ShipmentRecord[] = [
  {
    id: 'sample-2026-09-southeast-asia-workshop-01',
    date: '2026-09-15',
    year: 2026,
    month: 9,
    destinationRegion: 'Southeast Asia',
    application: 'Industrial Workshop',
    shipmentType: 'Structural Steel Components',
    containerType: '40HQ',
    scope: ['Fabrication', 'Component Marking', 'Packing', 'Container Loading'],
    enTitle: 'Structural Steel Components for Industrial Workshop',
    zhTitle: '工业厂房钢结构构件发货',
    enDescription:
      'Fabricated steel components were marked, packed and loaded into 40HQ containers for overseas delivery. Components are identified by project-specific marking matching shop drawings and packing lists.',
    zhDescription:
      '钢结构构件完成编号、打包并装入 40HQ 集装箱，准备出口交付。构件按项目编号系统标识，与加工图和装箱单一一对应。',
    images: [
      {
        src: `${E}container-loading-256_web.jpg`,
        alt: { en: 'Steel components being loaded into a shipping container', zh: '钢结构构件装入集装箱' },
        type: 'loading',
      },
      {
        src: `${E}heavy-member-prep-308_web.jpg`,
        alt: { en: 'Heavy steel members prepared for shipment', zh: '重型钢构件准备发运' },
        type: 'components-ready',
      },
      {
        src: `${E}loading-truck_web.jpg`,
        alt: { en: 'Container truck loaded with steel components', zh: '集装箱卡车装载钢结构构件' },
        type: 'departure',
      },
    ],
    publish: true,
    featured: true,
    privacyChecked: true,
    isSample: true,
  },
  {
    id: 'sample-2026-08-middle-east-warehouse-01',
    date: '2026-08-20',
    year: 2026,
    month: 8,
    destinationRegion: 'Middle East',
    application: 'Warehouse & Logistics',
    shipmentType: 'Structural Steel + Cladding',
    containerType: '40HQ',
    scope: ['Fabrication', 'Component Marking', 'Packing', 'Container Loading'],
    enTitle: 'Warehouse Structural Steel and Cladding Shipment',
    zhTitle: '仓库钢结构及围护系统发货',
    enDescription:
      'Main frame members, purlins and roof/wall cladding were packed and loaded for a warehouse project. Loading sequence was planned to support logical unloading and erection order at site.',
    zhDescription:
      '主框架构件、檩条及屋面墙面围护板完成打包装柜，用于仓库项目。装柜顺序按现场卸货和安装顺序规划。',
    images: [
      {
        src: `${E}container-loading-310_web.jpg`,
        alt: { en: 'Container loading operation for steel structure shipment', zh: '钢结构发货装柜作业' },
        type: 'container-inside',
      },
      {
        src: `${E}container-loading-256_web.jpg`,
        alt: { en: 'Steel components loaded into container', zh: '钢构件装入集装箱' },
        type: 'loading',
      },
    ],
    publish: true,
    featured: true,
    privacyChecked: true,
    isSample: true,
  },
  {
    id: 'sample-2026-07-africa-workshop-01',
    date: '2026-07-10',
    year: 2026,
    month: 7,
    destinationRegion: 'Africa',
    application: 'Industrial Workshop',
    shipmentType: 'Structural Steel Components',
    containerType: '40GP',
    scope: ['Fabrication', 'Component Marking', 'Packing', 'Container Loading'],
    enTitle: 'Industrial Workshop Steel Components Shipment',
    zhTitle: '工业厂房钢结构构件发运',
    enDescription:
      'Columns, beams and bracing members for an industrial workshop were marked, packed and loaded. Each component carries a unique identifier linking to shop drawings and the packing list.',
    zhDescription:
      '工业厂房的柱、梁和支撑构件完成编号、打包和装柜。每件构件带有唯一标识，与加工图和装箱单对应。',
    images: [
      {
        src: `${E}heavy-member-prep-308_web.jpg`,
        alt: { en: 'Heavy steel members prepared for container loading', zh: '重型钢构件准备装柜' },
        type: 'components-ready',
      },
      {
        src: `${E}loading-truck_web.jpg`,
        alt: { en: 'Loaded container truck departing for port', zh: '装柜完成的卡车发往港口' },
        type: 'departure',
      },
    ],
    publish: true,
    featured: false,
    privacyChecked: true,
    isSample: true,
  },
];

// ============================================================
// Helper functions
// ============================================================

/** All published shipments, sorted date DESC (newest first) */
export function getPublishedShipments(): ShipmentRecord[] {
  return shipments
    .filter((s) => s.publish)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Featured + published shipments, limited to count */
export function getFeaturedShipments(count = 3): ShipmentRecord[] {
  return getPublishedShipments().filter((s) => s.featured).slice(0, count);
}

/** Latest published shipments, limited to count */
export function getLatestShipments(count = 6): ShipmentRecord[] {
  return getPublishedShipments().slice(0, count);
}

/** Group shipments by year for archive display */
export function getShipmentsByYear(): Record<number, ShipmentRecord[]> {
  const grouped: Record<number, ShipmentRecord[]> = {};
  for (const s of getPublishedShipments()) {
    if (!grouped[s.year]) grouped[s.year] = [];
    grouped[s.year].push(s);
  }
  return grouped;
}

/** Check if any sample data remains (for Production gate) */
export function hasSampleData(): boolean {
  return shipments.some((s) => s.isSample);
}
