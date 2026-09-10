// ZhongSai V2 - Projects Data (12 Domestic Projects)
// Source: https://zhongsai-steelstructure.com/zh/projects (DOMESTIC PROJECTS)
// Only migrated confirmed data from old site. No fabricated data.
// Image types: rendering | site | component | installation

export interface GalleryImage {
  src: string;
  type: 'rendering' | 'site' | 'component' | 'installation';
  label: { zh: string; en: string };
}

export interface ProjectData {
  slug: string;
  category: { zh: string; en: string };
  name: { zh: string; en: string };
  location: { zh: string; en: string };
  image: string;
  heroImageType: 'rendering' | 'site' | 'component' | 'installation';
  galleryImages: GalleryImage[];
  overview: { zh: string; en: string };
  params: {
    label: { zh: string; en: string };
    value: { zh: string; en: string };
  }[];
  // href 为语言根相对路径（不含 /en/ 或 /zh/ 前缀），由组件按当前 lang 拼接 `/${lang}/${href}`
  relatedLinks: { href: string; label: { zh: string; en: string } }[];
  capabilities: { zh: string; en: string }[];
}

const P = '/images/projects/';

export const projects: ProjectData[] = [
  {
    slug: 'zhanjiang-logistics-port',
    category: { zh: '物流仓储', en: 'Logistics & Warehousing' },
    name: { zh: '深国际湛江综合物流港项目', en: 'Shenzhen International Zhanjiang Comprehensive Logistics Port Project' },
    location: { zh: '广东湛江', en: 'Zhanjiang, Guangdong' },
    image: `${P}shenzhen-international-zhanjiang-logistics-port-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}shenzhen-international-zhanjiang-logistics-port-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}shenzhen-international-zhanjiang-logistics-port.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}shenzhen-international-zhanjiang-logistics-port-construction-site-1.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}shenzhen-international-zhanjiang-logistics-port-construction-site-2.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}shenzhen-international-zhanjiang-logistics-port-structure-analysis-2.jpg`, type: 'rendering', label: { zh: '结构分析图', en: 'Structure Analysis' } },
    ],
    overview: {
      zh: '大型综合物流仓储项目，采用FM认证围护屋顶系统，涵盖物流仓储、分拣配送及配套设施。',
      en: 'A large-scale comprehensive logistics and warehousing project with FM-certified roof cladding systems, covering logistics storage, sorting and distribution facilities.'
    },
    params: [
      { label: { zh: '总建筑面积', en: 'Total Building Area' }, value: { zh: '约10.07万㎡', en: 'Approx. 100,700 m²' } },
      { label: { zh: '建筑高度', en: 'Building Height' }, value: { zh: '22.6米', en: '22.6 m' } },
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '22米', en: '22 m' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约3160吨', en: 'Approx. 3,160 tonnes' } },
    ],
    capabilities: [
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
    ],
    relatedLinks: [
      { href: 'steel-warehouse/', label: { zh: '钢结构仓库', en: 'Steel Warehouse' } },
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
    ]
  },
  {
    slug: 'dongguan-huarun-center',
    category: { zh: '商业住宅', en: 'Commercial & Residential' },
    name: { zh: '东莞华润置地中心商业、住宅楼项目', en: 'Dongguan Huarun Land Center Commercial & Residential Building Project' },
    location: { zh: '广东东莞', en: 'Dongguan, Guangdong' },
    image: `${P}huarun-center-commercial-residential-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}huarun-center-commercial-residential-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}huarun-center-commercial-residential-completed-building.jpg`, type: 'site', label: { zh: '完工实景', en: 'Completed View' } },
      { src: `${P}huarun-center-commercial-residential-construction-panorama.jpg`, type: 'site', label: { zh: '施工全景', en: 'Construction Panorama' } },
      { src: `${P}huarun-center-commercial-residential-construction-site.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}huarun-center-commercial-residential-steel-structure-detail.jpg`, type: 'component', label: { zh: '钢结构细节', en: 'Steel Structure Detail' } },
      { src: `${P}huarun-center-commercial-residential-structure-analysis.jpg`, type: 'rendering', label: { zh: '结构分析图', en: 'Structure Analysis' } },
    ],
    overview: {
      zh: '位于东莞市南城街道国际商务区，超高层商业住宅综合体，采用劲性钢结构体系。',
      en: 'Located in the International Business District of Nancheng Subdistrict, Dongguan. A super high-rise commercial and residential complex utilizing steel-reinforced concrete structural systems.'
    },
    params: [
      { label: { zh: '总建筑面积', en: 'Total Building Area' }, value: { zh: '83.81万㎡', en: '838,100 m²' } },
      { label: { zh: '建筑高度', en: 'Building Height' }, value: { zh: '249.10米', en: '249.10 m' } },
      { label: { zh: '结构形式', en: 'Structural System' }, value: { zh: '劲性结构', en: 'Steel-Reinforced Concrete' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约2380吨', en: 'Approx. 2,380 tonnes' } },
    ],
    capabilities: [
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '钢结构深化配合', en: 'Structural Detailing Coordination' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },
  {
    slug: 'xiegang-aviation-manufacturing',
    category: { zh: '工业制造', en: 'Industrial Manufacturing' },
    name: { zh: '上海宝冶谢岗通用航空制造及供应链项目', en: 'Shanghai Baoye Xiegang General Aviation Manufacturing & Supply Chain Project' },
    location: { zh: '广东东莞', en: 'Dongguan, Guangdong' },
    image: `${P}shanghai-baoye-xiegang-aviation-manufacturing-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}shanghai-baoye-xiegang-aviation-manufacturing-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}shanghai-baoye-xiegang-aviation-manufacturing-building-rendering.jpg`, type: 'rendering', label: { zh: '建筑效果图', en: 'Building Rendering' } },
      { src: `${P}shanghai-baoye-xiegang-aviation-manufacturing-construction-site-1.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}shanghai-baoye-xiegang-aviation-manufacturing-construction-site-2.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}shanghai-baoye-xiegang-aviation-manufacturing-detail-view.jpg`, type: 'component', label: { zh: '钢结构细节', en: 'Steel Structure Detail' } },
    ],
    overview: {
      zh: '位于东莞市谢岗镇，大型通用航空制造厂房，大跨度钢结构体系，适用于航空制造及供应链产业。',
      en: 'Located in Xiegang Town, Dongguan. A large-scale general aviation manufacturing facility with long-span steel structure, suitable for aviation manufacturing and supply chain industries.'
    },
    params: [
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '40米', en: '40 m' } },
      { label: { zh: '长度', en: 'Length' }, value: { zh: '136.8米', en: '136.8 m' } },
      { label: { zh: '高度', en: 'Height' }, value: { zh: '34.5米', en: '34.5 m' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约8300吨', en: 'Approx. 8,300 tonnes' } },
    ],
    capabilities: [
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
      { zh: '按项目图纸加工', en: 'Fabrication to Project Drawings' },
    ],
    relatedLinks: [
      { href: 'steel-workshop/', label: { zh: '工业厂房', en: 'Steel Workshop' } },
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
    ]
  },
  {
    slug: 'guangzhou-high-end-equipment-base',
    category: { zh: '工业制造', en: 'Industrial Manufacturing' },
    name: { zh: '广州工控大湾区现代高端装备研发生产基地', en: 'Guangzhou Gongkong Greater Bay Area Modern High-End Equipment R&D and Production Base' },
    location: { zh: '广东广州', en: 'Guangzhou, Guangdong' },
    image: `${P}guangzhou-gongkong-high-end-equipment-base-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}guangzhou-gongkong-high-end-equipment-base-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}guangzhou-gongkong-high-end-equipment-base-construction-site-1.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}guangzhou-gongkong-high-end-equipment-base-construction-site-2.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}guangzhou-gongkong-high-end-equipment-base-detail-view.jpg`, type: 'component', label: { zh: '钢结构细节', en: 'Steel Structure Detail' } },
    ],
    overview: {
      zh: '位于广州市南沙区，现代高端装备研发生产基地，大跨度大高度钢结构厂房，适用于重型装备制造。',
      en: 'Located in Nansha District, Guangzhou. A modern high-end equipment R&D and production base with large-span and high-height steel structure workshops, suitable for heavy equipment manufacturing.'
    },
    params: [
      { label: { zh: '建筑高度', en: 'Building Height' }, value: { zh: '42米', en: '42 m' } },
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '60米', en: '60 m' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约9800吨', en: 'Approx. 9,800 tonnes' } },
    ],
    capabilities: [
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
    ],
    relatedLinks: [
      { href: 'steel-workshop/', label: { zh: '工业厂房', en: 'Steel Workshop' } },
      { href: 'products/custom-engineering/', label: { zh: '定制加工', en: 'Custom Engineering' } },
    ]
  },
  {
    slug: 'shantou-luxshare-electronics-center',
    category: { zh: '产业园区', en: 'Industrial / Business Parks' },
    name: { zh: '汕头立讯精密全球电子信息产业中心项目', en: 'Shantou Luxshare Precision Global Electronic Information Industry Center Project' },
    location: { zh: '广东汕头', en: 'Shantou, Guangdong' },
    image: `${P}shantou-luxshare-precision-electronics-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}shantou-luxshare-precision-electronics-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}shantou-luxshare-precision-electronics-construction-aerial.jpg`, type: 'site', label: { zh: '施工航拍', en: 'Construction Aerial' } },
      { src: `${P}shantou-luxshare-precision-electronics-project-panorama.jpg`, type: 'site', label: { zh: '项目全景', en: 'Project Panorama' } },
      { src: `${P}shantou-luxshare-precision-electronics-street-view.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
    ],
    overview: {
      zh: '大型电子信息产业综合体项目，立讯精密（股票代码：002475）全球电子信息产业中心，涵盖研发、生产及配套设施。',
      en: 'A large-scale electronic information industry complex project. Luxshare Precision (Stock Code: 002475) Global Electronic Information Industry Center, covering R&D, production and supporting facilities.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约4700吨', en: 'Approx. 4,700 tonnes' } },
    ],
    capabilities: [
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '钢结构深化配合', en: 'Structural Detailing Coordination' },
    ],
    relatedLinks: [
      { href: 'steel-workshop/', label: { zh: '工业厂房', en: 'Steel Workshop' } },
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
    ]
  },
  {
    slug: 'futian-bonded-zone-customs',
    category: { zh: '公共建筑', en: 'Public Building' },
    name: { zh: '深圳福田保税区海关基础设施升级改造工程', en: 'Shenzhen Futian Bonded Zone Customs Infrastructure Upgrade and Renovation Project' },
    location: { zh: '广东深圳', en: 'Shenzhen, Guangdong' },
    image: `${P}futian-bonded-zone-customs-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}futian-bonded-zone-customs-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}futian-bonded-zone-customs-construction-site.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}futian-bonded-zone-customs-interior-view.jpg`, type: 'site', label: { zh: '内部视图', en: 'Interior View' } },
      { src: `${P}futian-bonded-zone-customs-street-view.jpg`, type: 'rendering', label: { zh: '项目模型图', en: 'Project Model' } },
    ],
    overview: {
      zh: '深圳福田保税区海关监管基础设施项目，包含海关办公、监管仓库及配套设施，钢结构框架体系。',
      en: 'A customs supervision infrastructure project in Shenzhen Futian Bonded Zone, including customs offices, supervised warehouses and supporting facilities with steel frame structure.'
    },
    params: [
      { label: { zh: '建筑面积', en: 'Building Area' }, value: { zh: '约9388㎡', en: 'Approx. 9,388 m²' } },
      { label: { zh: '长度', en: 'Length' }, value: { zh: '167米', en: '167 m' } },
      { label: { zh: '宽度', en: 'Width' }, value: { zh: '48米', en: '48 m' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约2100吨', en: 'Approx. 2,100 tonnes' } },
    ],
    capabilities: [
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
      { zh: '按项目图纸加工', en: 'Fabrication to Project Drawings' },
    ],
    relatedLinks: [
      { href: 'steel-warehouse/', label: { zh: '钢结构仓库', en: 'Steel Warehouse' } },
      { href: 'components/', label: { zh: '构件与材料', en: 'Components' } },
    ]
  },
  {
    slug: 'qianhai-dreamfactory',
    category: { zh: '商业产业', en: 'Commercial & Industrial' },
    name: { zh: '深圳前海深港青年梦工厂项目', en: 'Shenzhen Qianhai Shenzhen-Hong Kong Youth Dream Factory Project' },
    location: { zh: '广东深圳', en: 'Shenzhen, Guangdong' },
    image: `${P}shenzhen-qianhai-dreamfactory-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}shenzhen-qianhai-dreamfactory-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}shenzhen-qianhai-dreamfactory-construction-site-1.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}shenzhen-qianhai-dreamfactory-construction-site-2.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}shenzhen-qianhai-dreamfactory-detail-view.jpg`, type: 'component', label: { zh: '钢结构细节', en: 'Steel Structure Detail' } },
    ],
    overview: {
      zh: '位于深圳市前海，多层钢结构产业园区，涵盖青年创业、办公及配套设施，大跨度多层钢构体系。',
      en: 'Located in Qianhai, Shenzhen. A multi-story steel structure industrial park covering youth entrepreneurship, office and supporting facilities with large-span multi-story steel structure system.'
    },
    params: [
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '26米', en: '26 m' } },
      { label: { zh: '长度', en: 'Length' }, value: { zh: '98米', en: '98 m' } },
      { label: { zh: '高度', en: 'Height' }, value: { zh: '28米', en: '28 m' } },
      { label: { zh: '层数', en: 'Floors' }, value: { zh: '6层钢构', en: '6-story steel structure' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约3600吨', en: 'Approx. 3,600 tonnes' } },
    ],
    capabilities: [
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '钢结构深化配合', en: 'Structural Detailing Coordination' },
    ],
    relatedLinks: [
      { href: 'steel-workshop/', label: { zh: '工业厂房', en: 'Steel Workshop' } },
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
    ]
  },
  {
    slug: 'cnpc-cracking-furnace',
    category: { zh: '石化能源', en: 'Energy & Petrochemical' },
    name: { zh: '中油六建裂解炉项目', en: 'CNPC Sixth Construction Cracking Furnace Project' },
    location: { zh: '广东', en: 'Guangdong' },
    image: `${P}cnpc-sixth-construction-cracking-furnace-aerial-view.jpg`,
    heroImageType: 'site',
    galleryImages: [
      { src: `${P}cnpc-sixth-construction-cracking-furnace-aerial-view.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}cnpc-sixth-construction-cracking-furnace-construction-site.jpg`, type: 'site', label: { zh: '项目现场', en: 'Construction Site' } },
      { src: `${P}cnpc-sixth-construction-cracking-furnace-equipment-detail.jpg`, type: 'component', label: { zh: '设备细节', en: 'Equipment Detail' } },
      { src: `${P}cnpc-sixth-construction-cracking-furnace-installation-view.jpg`, type: 'installation', label: { zh: '安装阶段', en: 'Installation Stage' } },
    ],
    overview: {
      zh: '大型石油化工裂解炉钢结构项目，包含裂解炉主框架、设备平台及支撑系统，多层设备平台钢结构体系。',
      en: 'A large-scale petrochemical cracking furnace steel structure project, including cracking furnace main frame, equipment platforms and support systems with multi-level equipment platform steel structure.'
    },
    params: [
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '17.3米', en: '17.3 m' } },
      { label: { zh: '长度', en: 'Length' }, value: { zh: '40.7米', en: '40.7 m' } },
      { label: { zh: '高度', en: 'Height' }, value: { zh: '77.7米', en: '77.7 m' } },
      { label: { zh: '设备平台', en: 'Equipment Platforms' }, value: { zh: '22层', en: '22 levels' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约6000吨', en: 'Approx. 6,000 tonnes' } },
    ],
    capabilities: [
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '复杂连接节点加工', en: 'Complex Connection Fabrication' },
    ],
    relatedLinks: [
      { href: 'products/custom-engineering/', label: { zh: '定制加工', en: 'Custom Engineering' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },
  {
    slug: 'cnpc-liquid-furnace',
    category: { zh: '石化能源', en: 'Energy & Petrochemical' },
    name: { zh: '中油六建液体炉项目', en: 'CNPC Sixth Construction Liquid Furnace Project' },
    location: { zh: '广东', en: 'Guangdong' },
    image: `${P}cnpc-sixth-construction-liquid-furnace-aerial-view.jpg`,
    heroImageType: 'site',
    galleryImages: [
      { src: `${P}cnpc-sixth-construction-liquid-furnace-aerial-view.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}cnpc-sixth-construction-liquid-furnace-construction-site.jpg`, type: 'site', label: { zh: '项目现场', en: 'Construction Site' } },
      { src: `${P}cnpc-sixth-construction-liquid-furnace-equipment-detail.jpg`, type: 'component', label: { zh: '设备细节', en: 'Equipment Detail' } },
      { src: `${P}cnpc-sixth-construction-liquid-furnace-installation-view.jpg`, type: 'installation', label: { zh: '安装阶段', en: 'Installation Stage' } },
    ],
    overview: {
      zh: '大型石油化工液体炉钢结构项目，包含液体炉主框架、设备平台及支撑系统，多层设备平台钢结构体系。',
      en: 'A large-scale petrochemical liquid furnace steel structure project, including liquid furnace main frame, equipment platforms and support systems with multi-level equipment platform steel structure.'
    },
    params: [
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '14米', en: '14 m' } },
      { label: { zh: '长度', en: 'Length' }, value: { zh: '35.3米', en: '35.3 m' } },
      { label: { zh: '高度', en: 'Height' }, value: { zh: '70.7米', en: '70.7 m' } },
      { label: { zh: '设备平台', en: 'Equipment Platforms' }, value: { zh: '20层', en: '20 levels' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约4100吨', en: 'Approx. 4,100 tonnes' } },
    ],
    capabilities: [
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '复杂连接节点加工', en: 'Complex Connection Fabrication' },
    ],
    relatedLinks: [
      { href: 'products/custom-engineering/', label: { zh: '定制加工', en: 'Custom Engineering' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },
  {
    slug: 'yixian-biotech-manufacturing',
    category: { zh: '工业制造', en: 'Industrial Manufacturing' },
    name: { zh: '广东逸仙生物科技高端制造厂房项目', en: 'Guangdong Yixian Biotechnology High-End Manufacturing Plant Project' },
    location: { zh: '广东', en: 'Guangdong' },
    image: `${P}guangdong-yixian-biotech-manufacturing-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}guangdong-yixian-biotech-manufacturing-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}guangdong-yixian-biotech-manufacturing-construction-site-1.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}guangdong-yixian-biotech-manufacturing-construction-site-2.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}guangdong-yixian-biotech-manufacturing-detail-view.jpg`, type: 'component', label: { zh: '钢结构细节', en: 'Steel Structure Detail' } },
    ],
    overview: {
      zh: '完美日记（逸仙电商）高端制造厂房项目，大型生物科技及美妆产品制造厂房，钢结构工业建筑体系。',
      en: 'Perfect Diary (Yixian E-commerce) high-end manufacturing plant project. A large-scale biotechnology and beauty product manufacturing facility with steel structure industrial building system.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约9000吨', en: 'Approx. 9,000 tonnes' } },
    ],
    capabilities: [
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '按项目图纸加工', en: 'Fabrication to Project Drawings' },
    ],
    relatedLinks: [
      { href: 'steel-workshop/', label: { zh: '工业厂房', en: 'Steel Workshop' } },
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
    ]
  },
  {
    slug: 'luohu-mixc-skybridge',
    category: { zh: '商业公共', en: 'Commercial & Public' },
    name: { zh: '深圳罗湖万象城商业中心天桥项目', en: 'Shenzhen Luohu Mixc Commercial Center Skybridge Project' },
    location: { zh: '广东深圳', en: 'Shenzhen, Guangdong' },
    image: `${P}luohu-mixc-commercial-skybridge-aerial-rendering.jpg`,
    heroImageType: 'rendering',
    galleryImages: [
      { src: `${P}luohu-mixc-commercial-skybridge-aerial-rendering.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}luohu-mixc-commercial-skybridge-completed-view.jpg`, type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
      { src: `${P}luohu-mixc-commercial-skybridge-construction-site.jpg`, type: 'site', label: { zh: '项目现场', en: 'Construction Site' } },
      { src: `${P}luohu-mixc-commercial-skybridge-street-view.jpg`, type: 'site', label: { zh: '项目现场', en: 'Street View' } },
    ],
    overview: {
      zh: '深圳罗湖万象城商业中心人行天桥项目，连接商业中心各建筑的钢结构人行天桥，大跨度钢结构连廊体系。',
      en: 'A pedestrian skybridge project at Shenzhen Luohu Mixc Commercial Center. Steel structure pedestrian skybridge connecting various buildings of the commercial center with long-span steel corridor system.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约500吨', en: 'Approx. 500 tonnes' } },
    ],
    capabilities: [
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '复杂连接节点加工', en: 'Complex Connection Fabrication' },
    ],
    relatedLinks: [
      { href: 'products/custom-engineering/', label: { zh: '定制加工', en: 'Custom Engineering' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },
  {
    slug: 'cnooc-pr6-pipe-rack',
    category: { zh: '石化能源', en: 'Energy & Petrochemical' },
    name: { zh: '中海油PR6管廊4-SS2框架项目', en: 'CNOOC PR6 Pipe Rack 4-SS2 Frame Project' },
    location: { zh: '广东惠州', en: 'Huizhou, Guangdong' },
    image: `${P}cnooc-pr6-pipe-rack-frame-aerial-rendering.jpg`,
    heroImageType: 'site',
    galleryImages: [
      { src: `${P}cnooc-pr6-pipe-rack-frame-aerial-rendering.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}cnooc-pr6-pipe-rack-frame-construction-site-1.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}cnooc-pr6-pipe-rack-frame-construction-site-2.jpg`, type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
      { src: `${P}cnooc-pr6-pipe-rack-frame-detail-view.jpg`, type: 'component', label: { zh: '钢结构细节', en: 'Steel Structure Detail' } },
    ],
    overview: {
      zh: '位于惠州大亚湾石化区，大型石化管廊钢结构框架项目，包含管廊主框架、支撑系统及配套设施，大跨度管廊钢结构体系。',
      en: 'Located in Daya Bay Petrochemical Zone, Huizhou. A large-scale petrochemical pipe rack steel structure frame project, including pipe rack main frame, support systems and supporting facilities with long-span pipe rack steel structure.'
    },
    params: [
      { label: { zh: '建筑面积', en: 'Building Area' }, value: { zh: '约3万㎡', en: 'Approx. 30,000 m²' } },
      { label: { zh: '跨度', en: 'Span' }, value: { zh: '20米', en: '20 m' } },
      { label: { zh: '长度', en: 'Length' }, value: { zh: '150米', en: '150 m' } },
      { label: { zh: '高度', en: 'Height' }, value: { zh: '23米', en: '23 m' } },
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约5000吨', en: 'Approx. 5,000 tonnes' } },
    ],
    capabilities: [
      { zh: '大跨度钢结构加工', en: 'Large-Span Steel Fabrication' },
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '复杂连接节点加工', en: 'Complex Connection Fabrication' },
    ],
    relatedLinks: [
      { href: 'products/custom-engineering/', label: { zh: '定制加工', en: 'Custom Engineering' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },

  // ========== OVERSEAS PROJECTS (钢结构设计深化制作供应) ==========
  {
    slug: 'singapore-j102-mrt-station',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '新加坡LTA J102地铁站', en: 'Singapore LTA J102 MRT Station' },
    location: { zh: '新加坡', en: 'Singapore' },
    image: '/images/projects/overseas/singapore-cr101-depot.jpg',
    heroImageType: 'site',
    galleryImages: [
      { src: '/images/projects/overseas/singapore-cr101-depot.jpg', type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
    ],
    overview: {
      zh: '新加坡LTA J102地铁站项目，总用钢量约1900吨，采用外法兰节点，节点复杂，共有15000个法兰。采用三维全站仪控制节点尺寸，全程RTO驻厂监造，ITA全过程监督质量。',
      en: 'Singapore LTA J102 MRT Station project with total steel tonnage of approximately 1,900 tonnes. Utilizing external flange connections with complex nodes, totaling 15,000 flanges. 3D total station used for precise node dimension control. RTO stationed at factory for entire fabrication process, ITA supervises quality throughout.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约1900吨', en: 'Approx. 1,900 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '地铁站', en: 'MRT Station' } },
      { label: { zh: '节点数量', en: 'Flange Count' }, value: { zh: '15000个法兰', en: '15,000 Flanges' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
    ],
    capabilities: [
      { zh: '复杂连接节点加工', en: 'Complex Connection Fabrication' },
      { zh: '高精度尺寸控制', en: 'High-Precision Dimension Control' },
      { zh: '钢结构深化配合', en: 'Structural Detailing Coordination' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/steel-trusses/', label: { zh: '钢桁架', en: 'Steel Trusses' } },
    ]
  },
  {
    slug: 'singapore-j107-mrt-station',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '新加坡LTA J107地铁站', en: 'Singapore LTA J107 MRT Station' },
    location: { zh: '新加坡', en: 'Singapore' },
    image: '/images/projects/overseas/singapore-j102-station.jpg',
    heroImageType: 'rendering',
    galleryImages: [
      { src: '/images/projects/overseas/singapore-j102-station.jpg', type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
    ],
    overview: {
      zh: '新加坡LTA J107地铁站项目，总用钢量约1300吨，LTA验厂通过，项目严格按照LTA要求执行，RTO驻厂检查，ITA全程监督制造，项目顺利交付中。',
      en: 'Singapore LTA J107 MRT Station project with total steel tonnage of approximately 1,300 tonnes. Passed LTA factory inspection. Project strictly executed in accordance with LTA requirements. RTO stationed on-site for inspections, ITA supervising entire manufacturing process. Project successfully delivered.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约1300吨', en: 'Approx. 1,300 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '地铁站', en: 'MRT Station' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
      { label: { zh: '质量标准', en: 'Quality Standard' }, value: { zh: 'LTA严格标准', en: 'LTA Strict Standards' } },
    ],
    capabilities: [
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '按项目图纸加工', en: 'Fabrication to Project Drawings' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },
  {
    slug: 'macau-londoner',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '澳门伦敦人项目', en: 'Macau Londoner Project' },
    location: { zh: '中国澳门', en: 'Macau, China' },
    image: '/images/projects/overseas/macau-londoner.jpg',
    heroImageType: 'rendering',
    galleryImages: [
      { src: '/images/projects/overseas/macau-londoner.jpg', type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
    ],
    overview: {
      zh: '澳门伦敦人项目，总用钢量约8000吨，包括VIP大堂雨篷、水晶宫屋面、GRC背负钢架、演艺馆等钢结构。项目历时2年，属旧改新项目，具有结构复杂、精度要求高、外观成型漂亮等特点，现已成为游客必打卡之地。',
      en: 'Macau Londoner project with total steel tonnage of approximately 8,000 tonnes. Includes VIP lobby canopy, Crystal Palace roof, GRC-supported steel frame, performance hall, and other steel structures. Project spanned 2 years, a renovation project characterized by complex structure, high precision requirements, and aesthetically appealing design. Now a must-visit tourist destination.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约8000吨', en: 'Approx. 8,000 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '综合娱乐建筑', en: 'Integrated Entertainment Building' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
      { label: { zh: '项目周期', en: 'Project Duration' }, value: { zh: '2年', en: '2 Years' } },
    ],
    capabilities: [
      { zh: '复杂钢构件加工', en: 'Complex Component Fabrication' },
      { zh: '高精度尺寸控制', en: 'High-Precision Dimension Control' },
      { zh: '异形钢结构加工', en: 'Irregular Steel Structure Fabrication' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/steel-trusses/', label: { zh: '钢桁架', en: 'Steel Trusses' } },
    ]
  },
  {
    slug: 'macau-city-of-dreams-phase2',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '澳门新濠影汇二期', en: 'Macau City of Dreams Phase 2' },
    location: { zh: '中国澳门', en: 'Macau, China' },
    image: '/images/projects/overseas/macau-city-of-dreams.jpg',
    heroImageType: 'rendering',
    galleryImages: [
      { src: '/images/projects/overseas/macau-city-of-dreams.jpg', type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
    ],
    overview: {
      zh: '澳门新濠影汇二期项目（水上乐园主体及幕墙、剧院），总用钢量约5000吨，是建筑界女魔王"扎哈·哈迪德"团队的作品。项目特点：节点复杂，复杂的节点有40多个不同方向相贯线钢管组成，所有构件没有一个相同，为控制精度，工厂采用了三维全站仪测量技术，实时测量所有构件尺寸。',
      en: 'Macau City of Dreams Phase 2 project (water park main structure and curtain wall, theater) with total steel tonnage of approximately 5,000 tonnes. A work of the legendary architect Zaha Hadid team. Project features: highly complex nodes with over 40 intersecting steel pipes in different directions. No two components are identical. To ensure precision, the factory utilizes 3D total station measurement technology for real-time measurement of all component dimensions.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约5000吨', en: 'Approx. 5,000 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '水上乐园及剧院', en: 'Water Park & Theater' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
      { label: { zh: '建筑设计', en: 'Architect' }, value: { zh: '扎哈·哈迪德团队', en: 'Zaha Hadid Team' } },
    ],
    capabilities: [
      { zh: '复杂空间管桁架加工', en: 'Complex Spatial Pipe Truss Fabrication' },
      { zh: '高精度三维测量', en: 'High-Precision 3D Measurement' },
      { zh: '异形钢结构加工', en: 'Irregular Steel Structure Fabrication' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/steel-trusses/', label: { zh: '钢桁架', en: 'Steel Trusses' } },
    ]
  },
  {
    slug: 'singapore-sats-bup-centre',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '新加坡樟宜机场SATS货运中心', en: 'Singapore Changi Airport SATS BUP Centre' },
    location: { zh: '新加坡', en: 'Singapore' },
    image: '/images/projects/overseas/singapore-mcc-innocentre.jpg',
    heroImageType: 'site',
    galleryImages: [
      { src: '/images/projects/overseas/singapore-mcc-innocentre.jpg', type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
    ],
    overview: {
      zh: '新加坡樟宜机场SATS新货运中心项目，采用工厂整体制作，分段装箱的方法，确保尺寸精准。项目已完工交付。',
      en: 'Singapore Changi Airport SATS new cargo center project. Manufactured as a whole in the factory and packed in sections to ensure accurate dimensions. Project completed and delivered.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约200吨', en: 'Approx. 200 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '机场货运中心', en: 'Airport Cargo Centre' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
      { label: { zh: '制作方式', en: 'Fabrication Method' }, value: { zh: '整体制作分段装箱', en: 'Whole Fabrication, Sectional Packing' } },
    ],
    capabilities: [
      { zh: '高精度钢结构加工', en: 'High-Precision Steel Fabrication' },
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
      { zh: '按项目图纸加工', en: 'Fabrication to Project Drawings' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'export-delivery/', label: { zh: '出口交付', en: 'Export Delivery' } },
    ]
  },
  {
    slug: 'singapore-mcc-innocentre',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '新加坡MCC Innocentre', en: 'Singapore MCC Innocentre' },
    location: { zh: '新加坡', en: 'Singapore' },
    image: '/images/projects/overseas/singapore-j107-station.jpg',
    heroImageType: 'rendering',
    galleryImages: [
      { src: '/images/projects/overseas/singapore-j107-station.jpg', type: 'rendering', label: { zh: '项目效果图', en: 'Project Rendering' } },
    ],
    overview: {
      zh: '新加坡MCC Innocentre项目，总用钢量约650吨，多层工业建筑钢结构，已完工交付。',
      en: 'Singapore MCC Innocentre project with total steel tonnage of approximately 650 tonnes. Multi-story industrial building steel structure. Completed and delivered.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约650吨', en: 'Approx. 650 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '多层工业建筑', en: 'Multi-story Industrial Building' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
      { label: { zh: '项目状态', en: 'Project Status' }, value: { zh: '已完工交付', en: 'Completed & Delivered' } },
    ],
    capabilities: [
      { zh: '多层钢结构加工', en: 'Multi-story Steel Fabrication' },
      { zh: '工业钢结构供货能力', en: 'Industrial Steel Structure Supply' },
      { zh: '按项目图纸加工', en: 'Fabrication to Project Drawings' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },


  {
    slug: 'singapore-airport-t2-connect',
    category: { zh: '海外项目', en: 'Overseas Projects' },
    name: { zh: '新加坡樟宜机场T2连接', en: 'Singapore Changi Airport T2 Connect' },
    location: { zh: '新加坡', en: 'Singapore' },
    image: '/images/projects/overseas/singapore-airport-t2-connect.jpg',
    heroImageType: 'site',
    galleryImages: [
      { src: '/images/projects/overseas/singapore-airport-t2-connect.jpg', type: 'site', label: { zh: '项目现场', en: 'Project Site' } },
    ],
    overview: {
      zh: '新加坡樟宜机场T2连接(T2C)项目，T2C-Kingpost共209支，总用钢量约4600吨，采用CHS50*50mm、UB914*419*446.4等材料，共用11万颗D25*100的栓钉。项目属于机场扩建工程，结构复杂，精度要求高。',
      en: 'Singapore Changi Airport Terminal 2 Connect (T2C) project. T2C-Kingpost consists of 209 units with total steel tonnage of approximately 4,600 tonnes. Utilizing CHS50*50mm, UB914*419*446.4 and other materials, with a total of 110,000 D25*100 shear studs. Airport expansion project with complex structure and high precision requirements.'
    },
    params: [
      { label: { zh: '用钢量', en: 'Steel Tonnage' }, value: { zh: '约4600吨', en: 'Approx. 4,600 tonnes' } },
      { label: { zh: '项目类型', en: 'Project Type' }, value: { zh: '机场扩建', en: 'Airport Expansion' } },
      { label: { zh: '构件数量', en: 'Component Count' }, value: { zh: '209支Kingpost', en: '209 Kingpost Units' } },
      { label: { zh: '工作范围', en: 'Scope of Work' }, value: { zh: '钢结构设计深化制作供应', en: 'Steel Structure Detailing, Fabrication & Supply' } },
    ],
    capabilities: [
      { zh: '重型钢结构加工', en: 'Heavy Structural Steel Fabrication' },
      { zh: '复杂连接节点加工', en: 'Complex Connection Fabrication' },
      { zh: '高精度尺寸控制', en: 'High-Precision Dimension Control' },
    ],
    relatedLinks: [
      { href: 'manufacturing-quality/', label: { zh: '制造能力', en: 'Manufacturing' } },
      { href: 'components/fabricated-steel-beams-columns/', label: { zh: '钢梁钢柱', en: 'Beams & Columns' } },
    ]
  },

];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find(p => p.slug === slug);
}
