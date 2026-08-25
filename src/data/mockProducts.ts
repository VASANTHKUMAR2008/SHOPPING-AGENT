import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // =============================================================
  // 1. LAPTOPS (Engineering, ECE/VLSI, Gaming, Coding, MacBooks)
  // =============================================================
  {
    id: 'prod-asus-tuf-a15',
    title: 'ASUS TUF Gaming A15 (AMD Ryzen 7 7735HS, 16GB DDR5 RAM, 512GB NVMe SSD, RTX 3050 4GB GPU, 144Hz FHD)',
    brand: 'ASUS',
    price: 58990,
    priceINR: 58990,
    priceUSD: 710,
    originalPrice: 76990,
    originalPriceINR: 76990,
    originalPriceUSD: 925,
    rating: 4.7,
    reviewCount: 4320,
    category: 'Laptops',
    description: 'High-performance engineering laptop powered by AMD Ryzen 7 8-core CPU and dedicated NVIDIA RTX 3050 GPU. Built with military-grade MIL-STD-810H durability, 16GB high-speed DDR5 RAM, and 144Hz adaptive sync display.',
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Processor': 'AMD Ryzen 7 7735HS (8 Cores, 16 Threads, up to 4.75 GHz)',
      'RAM': '16GB DDR5 4800MHz (Dual Channel, Expandable to 32GB)',
      'Storage': '512GB PCIe 4.0 NVMe M.2 SSD (Extra M.2 Slot)',
      'Graphics': 'NVIDIA GeForce RTX 3050 (4GB GDDR6 Dedicated)',
      'Display': '15.6-inch FHD (1920x1080) 144Hz IPS Anti-Glare',
      'Battery': '90Whr (Up to 8 hours regular use)',
      'Weight': '2.20 kg',
      'Operating System': 'Windows 11 Home + MS Office Home 2021',
      'Ports': '1x USB 4 Type-C, 1x USB 3.2 Gen 2 Type-C (DP/G-Sync), 2x USB 3.2 Type-A, 1x HDMI 2.1, RJ45 LAN'
    },
    pros: [
      'Ideal for heavy ECE & VLSI simulation (Vivado, Cadence, ModelSim, Proteus, MATLAB)',
      '16GB fast DDR5 RAM with dual expansion slot',
      'Dedicated 4GB RTX GPU accelerates synthesis & 3D CAD modeling',
      'Robust cooling system with dual self-cleaning Arc Flow fans'
    ],
    cons: [
      'Slightly heavy at 2.2 kg with charging brick',
      'Average 720p webcam'
    ],
    inStock: true,
    shipping: 'Free Next-Day Prime Delivery',
    dealScore: 96,
    matchScore: 99,
    dealBadge: 'Best for ECE & VLSI',
    recommendationType: 'best-performance',
    recommendationReason: 'Outstanding performance for engineering students under ₹60,000 with 16GB DDR5 RAM, 8-core Ryzen 7 CPU, and dedicated RTX graphics to run heavy EDA/VLSI tools seamlessly.',
    priceHistory: [
      { date: '2026-06-01', price: 76990, priceINR: 76990 },
      { date: '2026-07-15', price: 64990, priceINR: 64990 },
      { date: '2026-08-10', price: 58990, priceINR: 58990 }
    ],
    retailer: 'Amazon India / ASUS Store',
    whoIsThisFor: 'ECE, EEE & CSE engineering students running circuit simulation, VLSI design tools, machine learning, and gaming.',
    verdict: 'The undisputed performance champion for engineering college coursework under ₹60,000.',
    sentimentSummary: {
      positivePercent: 95,
      keyHighlight: 'Flawlessly compiles large Verilog/VHDL testbenches in Xilinx Vivado without throttling.',
      frequentPraise: ['DDR5 RAM speed', 'Thermals stay under 75C under load', 'Sturdy keyboard travel'],
      frequentComplaints: ['Webcam quality is basic']
    }
  },
  {
    id: 'prod-lenovo-ideapad-slim5',
    title: 'Lenovo IdeaPad Slim 5 (AMD Ryzen 7 7730U, 16GB DDR4, 512GB SSD, 100% sRGB 14" FHD+ IPS, 1.46kg)',
    brand: 'Lenovo',
    price: 56990,
    priceINR: 56990,
    priceUSD: 685,
    originalPrice: 72990,
    originalPriceINR: 72990,
    originalPriceUSD: 875,
    rating: 4.8,
    reviewCount: 3120,
    category: 'Laptops',
    description: 'Sleek, lightweight all-metal ultrabook featuring an 8-core AMD Ryzen 7 processor, 16GB dual-channel memory, vibrant 100% sRGB display, and 12-hour battery with Rapid Charge Boost.',
    imageUrl: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Processor': 'AMD Ryzen 7 7730U (8 Cores, 16 Threads, up to 4.5 GHz)',
      'RAM': '16GB DDR4 3200MHz',
      'Storage': '512GB NVMe SSD M.2',
      'Graphics': 'AMD Radeon Graphics',
      'Display': '14.0-inch WUXGA (1920x1200) IPS, 300 nits, 100% sRGB, TUV Low Blue Light',
      'Battery': '56.6Wh (Up to 11.5 hours), Rapid Charge 15min = 2hr',
      'Weight': '1.46 kg',
      'Operating System': 'Windows 11 + MS Office 2021',
      'Ports': '2x USB-C (Power Delivery & DP), 2x USB-A 3.2, 1x HDMI 1.4b, MicroSD Card Reader'
    },
    pros: [
      'Extremely portable at just 1.46 kg for daily campus commute',
      'Vibrant 100% sRGB 16:10 aspect ratio screen',
      'All-day battery life with USB-C PD fast charging',
      '16GB RAM handles dozens of browser tabs and compiler tasks simultaneously'
    ],
    cons: [
      'Integrated graphics (not suited for heavy AAA gaming)',
      'RAM is soldered (non-upgradable)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 94,
    matchScore: 95,
    dealBadge: 'Best All-Round Ultrabook',
    recommendationType: 'best-overall',
    recommendationReason: 'Perfect balance of lightweight portability (1.46kg), all-day battery life (11+ hrs), vibrant 100% sRGB display, and an 8-core CPU with 16GB RAM for under ₹57,000.',
    priceHistory: [
      { date: '2026-06-15', price: 68990, priceINR: 68990 },
      { date: '2026-08-01', price: 56990, priceINR: 56990 }
    ],
    retailer: 'Lenovo Store / Flipkart',
    whoIsThisFor: 'Students wanting a lightweight laptop for lectures, coding, data analysis, and long library study sessions without carrying a heavy charger.',
    verdict: 'The best portable daily driver laptop under ₹60,000 for university life.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'Battery easily lasts an entire 9 AM to 5 PM college schedule without needing a wall socket.',
      frequentPraise: ['1.46kg weight', '100% sRGB screen', 'Keyboard backlighting'],
      frequentComplaints: ['Non-upgradable RAM']
    }
  },
  {
    id: 'prod-acer-nitro-v15',
    title: 'Acer Nitro V 15 (Intel Core i5-13420H 13th Gen, 16GB DDR5, 512GB Gen4 SSD, RTX 3050 6GB 75W TGP, 144Hz)',
    brand: 'Acer',
    price: 59990,
    priceINR: 59990,
    priceUSD: 720,
    originalPrice: 79999,
    originalPriceINR: 79999,
    originalPriceUSD: 960,
    rating: 4.6,
    reviewCount: 2840,
    category: 'Laptops',
    description: 'Packed with a 13th Gen Intel Core i5 hybrid CPU and an upgraded 6GB VRAM RTX 3050 GPU (75W TGP), Thunderbolt 4 connectivity, and dual-fan exhaust with NitroSense tuning.',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Processor': 'Intel Core i5-13420H (8 Cores: 4P + 4E, 12 Threads, up to 4.6 GHz)',
      'RAM': '16GB DDR5 5200MHz (Dual Channel, Expandable to 32GB)',
      'Storage': '512GB PCIe Gen4 NVMe SSD',
      'Graphics': 'NVIDIA GeForce RTX 3050 (6GB GDDR6 VRAM, 75W TGP)',
      'Display': '15.6-inch FHD IPS 144Hz Slim Bezel',
      'Battery': '57Whr (Up to 6 hours)',
      'Weight': '2.10 kg',
      'Operating System': 'Windows 11 Home',
      'Ports': '1x Thunderbolt 4 / USB-C, 3x USB 3.2 Gen 1, 1x HDMI 2.1, Gigabit Ethernet RJ45'
    },
    pros: [
      'Upgraded 6GB VRAM (extra 2GB video memory over older 4GB models for ML & rendering)',
      'Thunderbolt 4 support for ultra-fast external drives & multi-monitor docks',
      'High-speed 5200MHz DDR5 RAM',
      'NitroSense software allows 1-click fan and power mode toggling'
    ],
    cons: [
      '45% NTSC color gamut display',
      'Battery life around 5-6 hours on power saver'
    ],
    inStock: true,
    shipping: 'Free Express Delivery',
    dealScore: 95,
    matchScore: 98,
    dealBadge: '6GB RTX GPU Value',
    recommendationType: 'best-value',
    recommendationReason: 'Offers 6GB GDDR6 dedicated VRAM and Thunderbolt 4 right at the ₹59,990 price ceiling, providing extra graphics memory for CAD and synthesis.',
    priceHistory: [
      { date: '2026-06-01', price: 79999, priceINR: 79999 },
      { date: '2026-08-01', price: 59990, priceINR: 59990 }
    ],
    retailer: 'Acer Store / Amazon',
    whoIsThisFor: 'Engineering students wanting maximum GPU compute (6GB VRAM) for 3D modeling, deep learning projects, and gaming under ₹60,000.',
    verdict: 'The highest GPU specification laptop under ₹60k thanks to its 6GB VRAM RTX 3050.',
    sentimentSummary: {
      positivePercent: 93,
      keyHighlight: 'The 6GB VRAM prevents out-of-memory errors when training smaller PyTorch models and running 3D CAD assemblies.',
      frequentPraise: ['6GB VRAM', 'Thunderbolt 4 port', 'Easy RAM & SSD expansion'],
      frequentComplaints: ['Screen colors are somewhat muted']
    }
  },
  {
    id: 'prod-apple-macbook-air-m2',
    title: 'Apple MacBook Air M2 (8-Core CPU, 8-Core GPU, 8GB Unified Memory, 256GB SSD, Liquid Retina 13.6", 1.24kg)',
    brand: 'Apple',
    price: 84990,
    priceINR: 84990,
    priceUSD: 1020,
    originalPrice: 99900,
    originalPriceINR: 99900,
    originalPriceUSD: 1199,
    rating: 4.9,
    reviewCount: 9840,
    category: 'Laptops',
    description: 'Incredibly thin and fast ultrabook with Apple Silicon M2 chip, fanless silent operation, stunning 13.6-inch Liquid Retina display with 500 nits brightness, 1080p FaceTime HD camera, and up to 18 hours of battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'Apple M2 (8-Core CPU: 4 performance + 4 efficiency, 16-core Neural Engine)',
      'RAM': '8GB Unified Memory (100GB/s bandwidth)',
      'Storage': '256GB High-Speed SSD',
      'Graphics': 'Apple 8-Core GPU',
      'Display': '13.6-inch Liquid Retina (2560x1664), 500 nits, P3 Wide Color, True Tone',
      'Battery': '52.6Wh Lithium-Polymer (Up to 18 hours Apple TV playback, 15 hours wireless web)',
      'Weight': '1.24 kg',
      'Operating System': 'macOS Sequoia',
      'Ports': 'MagSafe 3 charging port, 2x Thunderbolt / USB 4 ports, 3.5 mm headphone jack'
    },
    pros: [
      'Unrivaled 15-18 hour real-world battery life',
      'Zero fan noise (completely silent operation)',
      'Stunning 500 nits Liquid Retina screen with P3 wide color',
      'Premium 1.24kg unibody aluminum build and industry-best trackpad'
    ],
    cons: [
      'Base model has 8GB unified memory and 256GB SSD',
      'Limited to 1 external display output'
    ],
    inStock: true,
    shipping: 'Free Next-Day Apple Express Delivery',
    dealScore: 92,
    matchScore: 90,
    dealBadge: 'Premium Battery King',
    recommendationType: 'best-overall',
    recommendationReason: 'The benchmark for portability, build quality, screen brightness, and 18-hour battery life for software development and general productivity.',
    priceHistory: [
      { date: '2026-06-01', price: 99900, priceINR: 99900 },
      { date: '2026-08-01', price: 84990, priceINR: 84990 }
    ],
    retailer: 'Apple Store / Authorized Resellers',
    whoIsThisFor: 'Developers, mobile app builders (iOS/Flutter), designers, and students valuing whisper-quiet operation and multi-day battery endurance.',
    verdict: 'The most refined and efficient portable laptop on the market.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'The battery easily lasts two full college days on a single charge with zero fan noise in quiet lecture halls.',
      frequentPraise: ['Battery endurance', 'Speaker quality', 'Crisp Liquid Retina display'],
      frequentComplaints: ['Pricey storage upgrades']
    }
  },
  {
    id: 'prod-hp-pavilion-plus-14',
    title: 'HP Pavilion Plus 14 (AMD Ryzen 7 7840U, 16GB LPDDR5x, 1TB Gen4 SSD, 2.8K 120Hz OLED Display, IMAX Enhanced, 1.38kg)',
    brand: 'HP',
    price: 68990,
    priceINR: 68990,
    priceUSD: 830,
    originalPrice: 86990,
    originalPriceINR: 86990,
    originalPriceUSD: 1045,
    rating: 4.8,
    reviewCount: 1980,
    category: 'Laptops',
    description: 'Premium creator ultrabook featuring AMD Ryzen 7 7840U with Radeon 780M RDNA3 graphics, expansive 1TB SSD, 16GB ultra-fast LPDDR5x RAM, and a breathtaking 2.8K 120Hz OLED screen.',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'AMD Ryzen 7 7840U (8 Cores, 16 Threads, 5.1 GHz Boost, Ryzen AI Engine)',
      'RAM': '16GB LPDDR5x 6400MHz',
      'Storage': '1TB PCIe Gen4 NVMe SSD',
      'Graphics': 'AMD Radeon 780M (RDNA 3)',
      'Display': '14.0-inch 2.8K (2880x1800) OLED 120Hz, 0.2ms, HDR 500 nits, 100% DCI-P3',
      'Battery': '68Whr with HP Fast Charge (50% in 30 mins)',
      'Weight': '1.38 kg',
      'Operating System': 'Windows 11 Home + MS Office 2021',
      'Ports': '1x USB-C (Thunderbolt/USB4 40Gbps), 1x USB-C 10Gbps, 2x USB-A, 1x HDMI 2.1'
    },
    pros: [
      'Phenomenal 2.8K 120Hz OLED display with infinite contrast and 100% DCI-P3 color',
      'Integrated Radeon 780M graphics performs close to dedicated GTX 1650 GPUs',
      'Huge 1TB fast Gen4 SSD included out of the box',
      'Ultra-light 1.38kg all-metal chassis with 5MP IR webcam'
    ],
    cons: [
      'OLED panel consumes more power at max brightness on white backgrounds'
    ],
    inStock: true,
    shipping: 'Free Express Delivery',
    dealScore: 97,
    matchScore: 96,
    dealBadge: 'Best OLED & 1TB SSD',
    recommendationType: 'best-value',
    recommendationReason: 'An incredible deal offering a 2.8K 120Hz OLED screen, 1TB SSD, and Ryzen 7 7840U for under ₹70,000.',
    priceHistory: [
      { date: '2026-06-01', price: 86990, priceINR: 86990 },
      { date: '2026-08-01', price: 68990, priceINR: 68990 }
    ],
    retailer: 'HP World / Amazon',
    whoIsThisFor: 'Students, coders, and content creators looking for a gorgeous 2.8K OLED screen with ample 1TB storage in a slim 1.38kg body.',
    verdict: 'The supreme display and storage champion in the mid-premium segment.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'The 2.8K OLED screen makes code editors and movies look shockingly vivid.',
      frequentPraise: ['2.8K OLED panel', '1TB default SSD', 'Radeon 780M gaming capability'],
      frequentComplaints: ['Slightly glossy screen reflections']
    }
  },

  // =============================================================
  // 2. SMARTPHONES (Flagships, Cameras, Battery Champions)
  // =============================================================
  {
    id: 'prod-oneplus-12r',
    title: 'OnePlus 12R 5G (Snapdragon 8 Gen 2, 16GB LPDDR5X RAM, 256GB UFS 3.1, 1.5K 120Hz ProXDR LTPO4 AMOLED, 5500mAh 100W SuperVOOC)',
    brand: 'OnePlus',
    price: 39999,
    priceINR: 39999,
    priceUSD: 480,
    originalPrice: 45999,
    originalPriceINR: 45999,
    originalPriceUSD: 550,
    rating: 4.8,
    reviewCount: 7890,
    category: 'Smartphones',
    description: 'Flagship-grade speed with Snapdragon 8 Gen 2 processor, massive 16GB RAM, fourth-generation 1.5K LTPO display with 4500 nits peak brightness, Sony IMX890 50MP OIS camera, and giant 5500mAh battery with 100W flash charging in 26 minutes.',
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'Qualcomm Snapdragon 8 Gen 2 (4nm TSMC Flagship Octa-core)',
      'RAM': '16GB LPDDR5X with RAM-Vita acceleration',
      'Storage': '256GB UFS 3.1',
      'Display': '6.78-inch 1.5K (2780x1264) 1-120Hz LTPO4 AMOLED, 4500 nits peak, Dolby Vision',
      'Rear Camera': '50MP Sony IMX890 (OIS, f/1.8) + 8MP Ultra-wide + 2MP Macro',
      'Front Camera': '16MP HDR Selfie',
      'Battery': '5500 mAh (Dual-Cell) with 100W SUPERVOOC Charging (0-100% in 26 min)',
      'Operating System': 'OxygenOS 14 (Android 14) with 3 Android OS upgrades + 4 yrs security',
      'Weight': '207 g',
      'Cooling': 'Cryo-Velocity Dual VC Cooling Chamber (9140 mm²)'
    },
    pros: [
      'Unmatched flagship Snapdragon 8 Gen 2 compute under ₹40,000',
      'Generous 16GB LPDDR5X RAM keeps 40+ apps suspended in memory',
      'Colossal 5500mAh battery + 100W charger in the box (26 mins full charge)',
      'Fluid 1.5K 120Hz LTPO4 display with class-leading 4500 nits brightness'
    ],
    cons: [
      'No dedicated telephoto zoom camera lens',
      'No wireless charging'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 98,
    matchScore: 97,
    dealBadge: 'Best Phone Under ₹40k',
    recommendationType: 'best-overall',
    recommendationReason: 'The undisputed value flagship king: Snapdragon 8 Gen 2, 16GB RAM, 5500mAh battery, and 100W charging for just ₹39,999.',
    priceHistory: [
      { date: '2026-06-01', price: 45999, priceINR: 45999 },
      { date: '2026-08-01', price: 39999, priceINR: 39999 }
    ],
    retailer: 'OnePlus Store / Amazon',
    whoIsThisFor: 'Power users, gamers, students, and multitaskers seeking smooth OxygenOS experience with zero lag and ultra-fast charging.',
    verdict: 'The best all-round performance smartphone under ₹40,000.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: '100W charging takes you from 10% to 100% in the time it takes to get ready in the morning.',
      frequentPraise: ['Battery lasts 1.5 days easily', '16GB RAM multitasking', 'Super smooth 120Hz screen'],
      frequentComplaints: ['Macro camera is 2MP only']
    }
  },
  {
    id: 'prod-samsung-galaxy-s23-fe',
    title: 'Samsung Galaxy S23 FE 5G (Exynos 2200 / Snapdragon 8 Gen 1, 8GB RAM, 128GB Storage, Dynamic AMOLED 2X 120Hz, 3x Optical Telephoto, IP68)',
    brand: 'Samsung',
    price: 34999,
    priceINR: 34999,
    priceUSD: 420,
    originalPrice: 59999,
    originalPriceINR: 59999,
    originalPriceUSD: 720,
    rating: 4.6,
    reviewCount: 6540,
    category: 'Smartphones',
    description: 'Flagship Samsung experience with 3x optical telephoto camera, flagship Nightography 50MP sensor, Gorilla Glass 5 & aluminum armor frame, IP68 water resistance, and Galaxy AI features like Circle to Search.',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'Samsung Exynos 2200 (4nm with AMD Xclipse 920 GPU)',
      'RAM': '8GB',
      'Storage': '128GB UFS 3.1',
      'Display': '6.4-inch FHD+ Dynamic AMOLED 2X, 120Hz adaptive, 1450 nits peak',
      'Rear Camera': '50MP (f/1.8, OIS) + 12MP Ultra-wide + 8MP 3x Optical Telephoto (OIS)',
      'Front Camera': '10MP f/2.4 HDR',
      'Battery': '4500 mAh with 25W fast charge + Fast Wireless Charging 15W',
      'Durability': 'IP68 Water & Dust Resistant (1.5m for 30 min), Aluminum frame',
      'Operating System': 'One UI 6.1 (Android 14) + Galaxy AI (Circle to Search, Live Translate)'
    },
    pros: [
      'True 3x optical zoom telephoto camera (rare in sub-₹35k phones)',
      'Certified IP68 water and dust resistance',
      'Galaxy AI integration including instant Circle to Search',
      'Flagship 4-year Android OS upgrades + 5-year security updates'
    ],
    cons: [
      'Battery is 4500mAh (moderate heavy-day battery)',
      'Charging capped at 25W (no charger in box)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 95,
    matchScore: 93,
    dealBadge: 'Best Flagship Camera Under ₹35k',
    recommendationType: 'best-value',
    recommendationReason: 'Provides genuine flagship tier features: 3x optical zoom lens, wireless charging, IP68 waterproofing, and Galaxy AI at a deep discount.',
    priceHistory: [
      { date: '2026-06-01', price: 59999, priceINR: 59999 },
      { date: '2026-08-01', price: 34999, priceINR: 34999 }
    ],
    retailer: 'Samsung India / Amazon',
    whoIsThisFor: 'Photography enthusiasts, students wanting Galaxy AI tools for study and note translation, and buyers prioritizing IP68 water resistance.',
    verdict: 'The best camera package with optical zoom and IP68 water resistance under ₹35k.',
    sentimentSummary: {
      positivePercent: 94,
      keyHighlight: '3x optical telephoto lens captures portrait shots that easily rival ₹80k flagships.',
      frequentPraise: ['3x Optical zoom lens', 'IP68 water protection', 'Galaxy AI features'],
      frequentComplaints: ['No charger in box', 'Battery drain under gaming']
    }
  },
  {
    id: 'prod-apple-iphone-15',
    title: 'Apple iPhone 15 (A16 Bionic, 128GB, Dynamic Island, 48MP 2x Optical Quality Main Camera, USB-C, Ceramic Shield, 2000 nits)',
    brand: 'Apple',
    price: 69999,
    priceINR: 69999,
    priceUSD: 840,
    originalPrice: 79900,
    originalPriceINR: 79900,
    originalPriceUSD: 960,
    rating: 4.8,
    reviewCount: 14200,
    category: 'Smartphones',
    description: 'Features Dynamic Island alerts, an advanced 48MP main camera with 2x telephoto crop, color-infused back glass with contoured aluminum edges, A16 Bionic powerhouse, and universal USB-C charging.',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'Apple A16 Bionic (6-Core CPU + 5-Core GPU + 16-Core Neural Engine)',
      'RAM': '6GB',
      'Storage': '128GB NVMe',
      'Display': '6.1-inch Super Retina XDR OLED, 2000 nits outdoor peak brightness, Dynamic Island',
      'Rear Camera': '48MP Main (f/1.6, Sensor-shift OIS) + 12MP Ultra-wide, 2x Optical-quality Telephoto',
      'Front Camera': '12MP TrueDepth with Autofocus',
      'Battery': '3349 mAh (Up to 20 hours video playback), MagSafe 15W wireless',
      'Connector': 'USB-C (Power Delivery & DisplayPort)',
      'Durability': 'Ceramic Shield front, IP68 water resistance up to 6m for 30 mins'
    },
    pros: [
      'Universal USB-C connector (charges from the same cable as your laptop/tablet)',
      'Dynamic Island provides live notifications for Uber, food delivery, and music',
      '48MP camera with seamless 2x lossless zoom and incredible 4K cinematic video',
      'Class-leading 2000 nits outdoor visibility in bright sunlight'
    ],
    cons: [
      'Screen refresh rate is 60Hz (no 120Hz ProMotion)',
      'USB 2.0 data transfer speeds on base model'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 91,
    matchScore: 92,
    dealBadge: 'iOS Ecosystem Benchmark',
    recommendationType: 'best-overall',
    recommendationReason: 'The ideal iPhone with USB-C convenience, Dynamic Island, top-tier 4K video recording, and multi-year iOS longevity.',
    priceHistory: [
      { date: '2026-06-01', price: 79900, priceINR: 79900 },
      { date: '2026-08-01', price: 69999, priceINR: 69999 }
    ],
    retailer: 'Apple Store / Flipkart',
    whoIsThisFor: 'iPhone users, content creators filming 4K reels, and students invested in Apple AirDrop, Mac, and iPad syncing.',
    verdict: 'The most complete standard iPhone in years with USB-C and Dynamic Island.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'USB-C support finally means one single cable for your Mac, iPad, and iPhone.',
      frequentPraise: ['USB-C port', '48MP photo sharpness', 'Dynamic Island convenience'],
      frequentComplaints: ['60Hz display refresh rate']
    }
  },

  // =============================================================
  // 3. HEADPHONES & AUDIO (ANC Over-Ear, TWS Earbuds, Studio)
  // =============================================================
  {
    id: 'prod-sony-wh-ch720n',
    title: 'Sony WH-CH720N Noise Canceling Wireless Over-Ear Headphones (Integrated V1 Processor, 35hr Battery, 192g Lightweight)',
    brand: 'Sony',
    price: 8990,
    priceINR: 8990,
    priceUSD: 108,
    originalPrice: 14990,
    originalPriceINR: 14990,
    originalPriceUSD: 180,
    rating: 4.6,
    reviewCount: 5210,
    category: 'Headphones',
    description: 'Equipped with the same Sony V1 noise-canceling processor found in the flagship 1000XM5 series. Weighs just 192 grams for all-day comfort, with 35 hours of battery life and multipoint Bluetooth.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Form Factor': 'Over-Ear Wireless with Adjustable Cushioned Headband',
      'Noise Cancellation': 'Dual Noise Sensor Technology with Integrated Processor V1',
      'Battery Life': 'Up to 35 hours with ANC ON (50 hours with ANC OFF)',
      'Quick Charging': '3 minutes charge = 60 minutes playback',
      'Weight': '192 grams (Sony’s lightest ANC overhead model)',
      'Connectivity': 'Bluetooth 5.2 + Multipoint Connection (2 devices simultaneously)',
      'Sound Enhancement': 'DSEE (Digital Sound Enhancement Engine) + Sony Headphones Connect EQ'
    },
    pros: [
      'Incredible Active Noise Cancellation powered by Sony V1 chip under ₹10,000',
      'Ultra-lightweight 192g construction causes zero ear or crown fatigue',
      'Massive 35-hour battery life with fast 3-minute emergency boost',
      'Seamless multipoint pairing between laptop and phone'
    ],
    cons: [
      'Earcups do not fold inward (they only swivel flat)',
      'Basic plastic headband feel'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 97,
    matchScore: 98,
    dealBadge: 'Best Student ANC Headphone',
    recommendationType: 'best-budget',
    recommendationReason: 'The absolute best value noise-canceling headphone under ₹10,000 for college students studying in noisy hostels and libraries.',
    priceHistory: [
      { date: '2026-06-01', price: 14990, priceINR: 14990 },
      { date: '2026-08-01', price: 8990, priceINR: 8990 }
    ],
    retailer: 'Sony Center / Amazon',
    whoIsThisFor: 'Students wanting uninterrupted concentration in noisy dorms, libraries, cafes, and daily public transit commutes.',
    verdict: 'The undisputed budget ANC headphone king for students.',
    sentimentSummary: {
      positivePercent: 95,
      keyHighlight: 'Drowns out hostel roommate chatter and fan humming so you can focus completely on study sessions.',
      frequentPraise: ['192g weight is so light you forget you are wearing it', '35h battery life', 'Multipoint connection'],
      frequentComplaints: ['No carrying case included in box']
    }
  },
  {
    id: 'prod-sony-wh-1000xm5',
    title: 'Sony WH-1000XM5 Wireless Industry-Leading Noise Canceling Headphones (Auto NC Optimizer, 8 Mics, 30hr Battery, LDAC Hi-Res Audio)',
    brand: 'Sony',
    price: 24990,
    priceINR: 24990,
    priceUSD: 300,
    originalPrice: 34990,
    originalPriceINR: 34990,
    originalPriceUSD: 420,
    rating: 4.8,
    reviewCount: 11450,
    category: 'Headphones',
    description: 'The gold standard in active noise cancellation with 8 microphones, 2 dedicated audio processors (V1 + QN1), 30mm precision carbon fiber drivers, crystal-clear 4-beamforming mic calls, and luxurious soft-fit leather.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Noise Cancellation': 'Industry Leading ANC with 8 Microphones & Auto NC Optimizer',
      'Audio Processors': 'Integrated Processor V1 + HD Noise Canceling Processor QN1',
      'Drivers': '30mm specially designed carbon fiber composite dome',
      'Battery': '30 hours with ANC (3 min charge = 3 hours playback with USB-PD)',
      'Codecs': 'LDAC, AAC, SBC, Hi-Res Audio Wireless Certified',
      'Microphones': '4 Beamforming mics with AI noise reduction for calls',
      'Weight': '250 grams'
    },
    pros: [
      'Unrivaled noise cancellation that silences flights, trains, and crowded rooms',
      'Hi-Res Audio LDAC support delivers audiophile fidelity',
      'Exceptional beamforming microphone clarity for Zoom, Teams, and phone calls',
      'Ultra-comfortable soft-fit leather headband and plush memory foam cups'
    ],
    cons: [
      'Non-collapsible headband design requires larger carry case',
      'Premium price point'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 93,
    matchScore: 95,
    dealBadge: 'Top Tier ANC Flagship',
    recommendationType: 'best-overall',
    recommendationReason: 'The absolute pinnacle of active noise cancellation and crystal-clear microphone audio for professionals and students.',
    priceHistory: [
      { date: '2026-06-01', price: 34990, priceINR: 34990 },
      { date: '2026-08-01', price: 24990, priceINR: 24990 }
    ],
    retailer: 'Sony Center / Croma / Amazon',
    whoIsThisFor: 'Frequent travelers, coders seeking total acoustic isolation, and students wanting the absolute best ANC and call clarity money can buy.',
    verdict: 'The undefeated king of active noise cancellation headphones.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Cuts out 90%+ of background drone and office/dorm chatter effortlessly.',
      frequentPraise: ['Best ANC on earth', 'Mic clarity on online calls', 'Touch control gestures'],
      frequentComplaints: ['Headband cannot fold into a ball']
    }
  },
  {
    id: 'prod-oneplus-buds-pro-2',
    title: 'OnePlus Buds Pro 2 (Dynaudio Co-Created Dual Drivers, 48dB Smart Adaptive ANC, LHDC 5.0, Spatial Audio, 39hr Battery)',
    brand: 'OnePlus',
    price: 7999,
    priceINR: 7999,
    priceUSD: 96,
    originalPrice: 11999,
    originalPriceINR: 11999,
    originalPriceUSD: 145,
    rating: 4.7,
    reviewCount: 6820,
    category: 'Headphones',
    description: 'Co-created with Danish acoustic masters Dynaudio featuring dual MelodyBoost drivers (11mm woofer + 6mm planar tweeter), 48dB active noise reduction, LHDC Hi-Res streaming, and wireless charging case.',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Drivers': 'Dual Drivers: 11mm Dynamic Bass Woofer + 6mm Planar Diaphragm Tweeter (Dynaudio)',
      'Noise Cancellation': 'Up to 48dB Smart Adaptive ANC with 4kHz Ultra-wide Frequency',
      'Battery': '39 hours total with case (9 hours single charge ANC off, 6 hours ANC on)',
      'Codecs': 'LHDC 5.0, AAC, SBC, LC3',
      'Latency': '54ms Ultra-low latency Pro Gaming mode',
      'Water Resistance': 'IP55 Earbuds + IPX4 Case',
      'Special Features': 'Spatial Audio with Head Tracking, Qi Wireless Charging'
    },
    pros: [
      'Dynaudio dual-driver system delivers punchy deep sub-bass and crisp airy highs',
      '48dB adaptive ANC blocks out street and cafe rumble',
      'Qi wireless charging case included under ₹8,000',
      'IP55 sweat and water resistance for gym and running'
    ],
    cons: [
      'LHDC codec requires compatible OnePlus/Android device for max bit-rate'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 96,
    matchScore: 94,
    dealBadge: 'Best TWS Earbuds Under ₹8k',
    recommendationType: 'best-value',
    recommendationReason: 'Dynaudio dual drivers, 48dB ANC, wireless charging, and 39-hour battery life make this the top sub-₹8k TWS earbud.',
    priceHistory: [
      { date: '2026-06-01', price: 11999, priceINR: 11999 },
      { date: '2026-08-01', price: 7999, priceINR: 7999 }
    ],
    retailer: 'OnePlus Store / Amazon',
    whoIsThisFor: 'Students wanting pocket-friendly true wireless earbuds with deep bass and strong ANC for gym workouts and commutes.',
    verdict: 'The highest quality dual-driver ANC earbuds under ₹8,000.',
    sentimentSummary: {
      positivePercent: 95,
      keyHighlight: 'Separate planar tweeter and 11mm woofer produce audio detail that single-driver earbuds cannot match.',
      frequentPraise: ['Rich bass response', 'Wireless charging support', 'Comfortable stem design'],
      frequentComplaints: ['Spatial audio is best on OnePlus phones']
    }
  },

  // =============================================================
  // 4. SMARTWATCHES & WEARABLES (Fitness, WearOS, Apple Watch, Garmin)
  // =============================================================
  {
    id: 'prod-apple-watch-series9',
    title: 'Apple Watch Series 9 GPS 45mm (S9 SiP, 2000 nits Always-On Retina, Double Tap Gesture, Precision Finding, ECG, SpO2, watchOS 10)',
    brand: 'Apple',
    price: 41900,
    priceINR: 41900,
    priceUSD: 499,
    originalPrice: 44900,
    originalPriceINR: 44900,
    originalPriceUSD: 539,
    rating: 4.9,
    reviewCount: 9850,
    category: 'Smartwatches',
    description: 'Powered by the custom Apple S9 SiP with 5.6 billion transistors, enabling the magical Double Tap one-handed gesture, on-device Siri, and a 2000 nits display. Packed with advanced ECG, blood oxygen, temperature sensing for cycle tracking, and crash detection.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80'
    ],
    specs: {
      'Operating System': 'watchOS 10 with Smart Stack & NameDrop',
      'Processor': 'Apple S9 SiP (Dual-Core 64-bit + 4-Core Neural Engine + 2nd Gen Ultra Wideband chip)',
      'Display': '1.9-inch Always-On Retina LTPO OLED, Edge-to-Edge 2000 nits Peak Brightness',
      'Storage': '64GB Internal Storage',
      'Sensors': 'Electrical Heart Sensor (ECG), Blood Oxygen (SpO2), Temperature Sensing, 3rd Gen Optical Heart Sensor',
      'Special Gesture': 'Double Tap gesture control (index finger + thumb tap)',
      'Water Resistance': '50m Swimproof (WR50) + IP6X Dust Resistance',
      'Battery': '18 hours normal use (Up to 36 hours in Low Power Mode, Fast Magnetic USB-C Charging)'
    },
    pros: [
      'Double Tap gesture lets you answer calls and control timers when holding coffee or bags',
      'Ultra-bright 2000 nits Always-On display is effortlessly legible in direct midday sun',
      'Precise on-wrist ECG, heart rhythm alerts, and car crash detection for safety',
      'Flawless syncing with iPhone, AirPods, Apple Pay, and Mac unlock'
    ],
    cons: [
      'Requires an iPhone (incompatible with Android)',
      '18-36 hour battery life requires daily or overnight charging'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 94,
    matchScore: 97,
    dealBadge: 'Best Flagship iOS Watch',
    recommendationType: 'best-overall',
    recommendationReason: 'The benchmark smartwatch for iPhone users with Double Tap gesture, 2000 nits Always-On screen, on-device Siri, and FDA-cleared ECG.',
    priceHistory: [
      { date: '2026-06-01', price: 44900, priceINR: 44900 },
      { date: '2026-08-01', price: 41900, priceINR: 41900 }
    ],
    retailer: 'Apple Store / Flipkart / Amazon',
    whoIsThisFor: 'iPhone owners wanting the most fluid, feature-rich smartwatch experience with life-saving health alerts and effortless notifications.',
    verdict: 'The best smartwatch money can buy if you use an iPhone.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'The Double Tap gesture is genuinely game-changing when your hands are full carrying groceries or riding a bike.',
      frequentPraise: ['Double Tap gesture', '2000 nits brightness', 'Heart rate tracking accuracy'],
      frequentComplaints: ['Battery lasts 1.5 days max']
    }
  },
  {
    id: 'prod-apple-watch-se2',
    title: 'Apple Watch SE 2nd Gen GPS 44mm (S8 SiP, Retina OLED Display, Crash Detection, Heart Rate Alerts, Sleep Stages, Swimproof 50m)',
    brand: 'Apple',
    price: 27990,
    priceINR: 27990,
    priceUSD: 249,
    originalPrice: 29900,
    originalPriceINR: 29900,
    originalPriceUSD: 279,
    rating: 4.8,
    reviewCount: 12400,
    category: 'Smartwatches',
    description: 'The most affordable entry into the Apple Watch ecosystem. Powered by the high-speed S8 SiP (same chip as Series 8), Retina OLED display, Crash Detection, sleep tracking, and optical heart rate alerts in an ultra-lightweight aluminum chassis.',
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'watchOS 10',
      'Processor': 'Apple S8 SiP (64-bit Dual Core + W3 Wireless)',
      'Display': '1.78-inch Retina LTPO OLED (1000 nits)',
      'Storage': '32GB Internal Storage',
      'Health Sensors': '2nd Gen Optical Heart Sensor, High/Low HR Notifications, Irregular Rhythm Alert, Sleep Tracking',
      'Safety': 'Crash Detection, Fall Detection, Emergency SOS',
      'Water Resistance': '50 meters Swimproof (ISO standard 22810:2010)',
      'Battery': '18 hours all-day battery life (Low Power Mode up to 36 hours)'
    },
    pros: [
      'Delivers 90% of the Apple Watch experience at an accessible sub-₹28,000 price',
      'Lightning-fast S8 dual-core processor opens apps instantaneously',
      'Tracks sleep stages, heart rates, workouts, and swimming laps with high precision',
      'Extremely lightweight and comfortable to sleep with on your wrist'
    ],
    cons: [
      'No Always-On Display (screen turns off when wrist is lowered)',
      'No ECG or blood oxygen sensors'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 96,
    matchScore: 95,
    dealBadge: 'Best Value Apple Watch',
    recommendationType: 'best-value',
    recommendationReason: 'The smartest investment for students with iPhones who want seamless fitness tracking and notifications without spending ₹40k+.',
    priceHistory: [
      { date: '2026-06-01', price: 29900, priceINR: 29900 },
      { date: '2026-08-01', price: 27990, priceINR: 27990 }
    ],
    retailer: 'Apple Store / Amazon',
    whoIsThisFor: 'College students with iPhones wanting fitness tracking, Apple Pay, music control, and sleep tracking on a reasonable budget.',
    verdict: 'The greatest value Apple Watch for everyday student life.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'All the vital Apple Watch features — workout tracking, Siri, notifications, and timer haptics — at half the price of the Ultra.',
      frequentPraise: ['Value for money', 'Comfortable sleep tracking', 'Reliable notifications'],
      frequentComplaints: ['No Always-On display']
    }
  },
  {
    id: 'prod-apple-watch-ultra2',
    title: 'Apple Watch Ultra 2 GPS + Cellular 49mm (S9 SiP, 3000 nits Sapphire Crystal, Aerospace Titanium, Dual-Frequency GPS, 72hr Low Power)',
    brand: 'Apple',
    price: 89900,
    priceINR: 89900,
    priceUSD: 799,
    originalPrice: 89900,
    originalPriceINR: 89900,
    originalPriceUSD: 799,
    rating: 4.9,
    reviewCount: 4120,
    category: 'Smartwatches',
    description: 'The ultimate sports and adventure watch crafted with a 49mm aerospace-grade titanium case, flat sapphire front crystal, 3000 nits blinding outdoor display, customizable Action Button, precision dual-frequency GPS (L1 + L5), 100m water resistance, and dive computer certification.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'watchOS 10 Ultra Modular',
      'Processor': 'Apple S9 SiP with 4-Core Neural Engine + Cellular LTE Built-in',
      'Case Material': '49mm Aerospace-grade Titanium with raised edge protection',
      'Display': '1.92-inch Always-On Retina Sapphire (3000 nits Peak Brightness)',
      'GPS': 'Precision Dual-frequency GPS (L1 and L5) + Offline Topo Maps',
      'Battery Life': 'Up to 36 hours regular use, Up to 72 hours in Low Power Mode',
      'Durability': 'MIL-STD-810H, 100m Water Resistance, EN13319 Recreational Dive Certified to 40m',
      'Special Features': 'Customizable Action Button, 86-decibel Emergency Siren, Dual Speakers + 3-Mic Array with beamforming'
    },
    pros: [
      'Unmatched 3000 nits sapphire screen is the brightest on any smartwatch in the world',
      '3-day battery life (72 hours) in Low Power mode completely eliminates charging anxiety',
      'Indestructible titanium case with tactile orange Action Button for instant workout starts',
      'Built-in 86dB emergency siren and certified 40m scuba dive computer'
    ],
    cons: [
      'Large 49mm case looks bulky on small wrists',
      'Premium flagship price point'
    ],
    inStock: true,
    shipping: 'Free Secure Next-Day Delivery',
    dealScore: 90,
    matchScore: 92,
    dealBadge: 'Ultimate Rugged Adventure Watch',
    recommendationType: 'best-performance',
    recommendationReason: 'The absolute pinnacle of durability, screen brightness, battery longevity, and precision dual GPS for outdoor endurance.',
    priceHistory: [
      { date: '2026-06-01', price: 89900, priceINR: 89900 },
      { date: '2026-08-01', price: 89900, priceINR: 89900 }
    ],
    retailer: 'Apple Store / Reliance Digital',
    whoIsThisFor: 'Marathon runners, mountaineers, scuba divers, and power users who want the strongest, longest-lasting Apple Watch built.',
    verdict: 'The ultimate rugged smartwatch engineering triumph.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: '3000 nits screen is insanely bright in intense sun, and the titanium chassis can withstand genuine abuse.',
      frequentPraise: ['3-day battery', 'Action button convenience', 'Dual GPS accuracy in dense forests'],
      frequentComplaints: ['Heavy on small wrists']
    }
  },
  {
    id: 'prod-oneplus-watch-2',
    title: 'OnePlus Watch 2 (Wear OS 4 by Google + RTOS Dual-Engine, Snapdragon W5 + BES2700, 100-Hour Battery, Sapphire Crystal, 32GB)',
    brand: 'OnePlus',
    price: 19999,
    priceINR: 19999,
    priceUSD: 240,
    originalPrice: 27999,
    originalPriceINR: 27999,
    originalPriceUSD: 335,
    rating: 4.7,
    reviewCount: 3410,
    category: 'Smartwatches',
    description: 'Breakthrough Dual-Engine Architecture pairing Snapdragon W5 for full Google Play apps and Wear OS 4 with a dedicated RTOS chip to achieve an unprecedented 100 hours (4 days) of smart battery life. Built with military-grade stainless steel and sapphire crystal glass.',
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'Wear OS 4 by Google + RTOS Dual Architecture',
      'Processors': 'Qualcomm Snapdragon W5 Gen 1 + BES2700 Efficiency Co-processor',
      'Battery Life': 'Up to 100 Hours in Smart Mode (4 Days), 12 Days in Power Saver Mode',
      'Display': '1.43-inch AMOLED (466x466), 1000 nits High Brightness Mode, 2.5D Sapphire Crystal',
      'Storage / RAM': '32GB EMMC Storage + 2GB LPDDR4X RAM',
      'GPS': 'Dual-Frequency L1+L5 GPS Precision Tracking',
      'Durability': 'MIL-STD-810H, 5ATM + IP68 Water Resistance, Stainless Steel Body'
    },
    pros: [
      'Solves the Wear OS battery problem with a massive 4-day battery life (100 hours)',
      'Full access to Google Play Store: Google Maps, WhatsApp, Google Wallet, Spotify',
      'Scratch-proof Sapphire Crystal glass and stainless steel chassis',
      'Dual-frequency L1+L5 GPS ensures pinpoint workout route accuracy'
    ],
    cons: [
      'Large 46mm case (may feel bulky on very slim wrists)',
      'No LTE cellular version'
    ],
    inStock: true,
    shipping: 'Free Express Delivery',
    dealScore: 96,
    matchScore: 95,
    dealBadge: '100-Hour WearOS King',
    recommendationType: 'best-overall',
    recommendationReason: 'The only full Google Wear OS smartwatch that delivers a true 4-day battery life alongside Sapphire glass and Google Maps navigation.',
    priceHistory: [
      { date: '2026-06-01', price: 27999, priceINR: 27999 },
      { date: '2026-08-01', price: 19999, priceINR: 19999 }
    ],
    retailer: 'OnePlus Store / Amazon',
    whoIsThisFor: 'Android users wanting full smartwatch capabilities (Google Maps, reply to WhatsApp, Spotify offline) without having to charge every night.',
    verdict: 'The best Wear OS smartwatch on the market today.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'Lasts 4 full days with always-on display and sleep tracking, completely ending daily smartwatch charging anxiety.',
      frequentPraise: ['4-day battery life', 'Google Maps on wrist', 'Premium steel and sapphire build'],
      frequentComplaints: ['Only available in one 46mm size']
    }
  },
  {
    id: 'prod-oneplus-watch-2r',
    title: 'OnePlus Watch 2R (Wear OS 4 by Google, Lightweight Aluminum Alloy, 100-Hour Battery, Dual-Engine W5+BES2700, Dual GPS, 32GB)',
    brand: 'OnePlus',
    price: 15999,
    priceINR: 15999,
    priceUSD: 195,
    originalPrice: 22999,
    originalPriceINR: 22999,
    originalPriceUSD: 275,
    rating: 4.7,
    reviewCount: 2150,
    category: 'Smartwatches',
    description: 'A lighter, sporty edition of the acclaimed Watch 2. Weighs nearly 25% less with a matte aluminum alloy body and classic tachymeter bezel, preserving the exact same 100-hour battery life, Dual-Engine Snapdragon W5 architecture, and Google Play Store support.',
    imageUrl: 'https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'Wear OS 4 by Google + RTOS Dual Engine',
      'Processor': 'Snapdragon W5 Gen 1 + BES2700 Co-Processor',
      'Weight': '37 grams (without strap - 25% lighter than Watch 2)',
      'Display': '1.43-inch AMOLED (466x466), 1000 nits peak, 2D Panda Glass',
      'Battery Life': '100 Hours Smart Mode (4 Days), 12 Days Power Saver',
      'Charging': '7.5W VOOC Fast Charge (100% in 60 mins, 1 day power in 10 mins)',
      'GPS': 'Dual-frequency L1 + L5 GPS',
      'Storage': '32GB ROM + 2GB RAM'
    },
    pros: [
      '25% lighter matte aluminum body is much more comfortable for running and sleep tracking',
      'Full Wear OS 4 with Google Maps wrist navigation and WhatsApp message replies',
      'Outstanding 4-day battery life under ₹16,000',
      'Super-fast VOOC charging gives a whole day of battery in just 10 minutes'
    ],
    cons: [
      'Uses Panda glass instead of sapphire crystal on the Watch 2',
      'No physical rotating crown navigation'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 97,
    matchScore: 96,
    dealBadge: 'Best Lightweight WearOS',
    recommendationType: 'best-value',
    recommendationReason: 'Delivers full Google Wear OS 4, Google Maps, and 100-hour battery life at an ultra-competitive ₹15,999 price in a comfortable lightweight chassis.',
    priceHistory: [
      { date: '2026-06-01', price: 22999, priceINR: 22999 },
      { date: '2026-08-01', price: 15999, priceINR: 15999 }
    ],
    retailer: 'OnePlus Store / Amazon',
    whoIsThisFor: 'Runners, students, and Android users who want the freedom of Wear OS and Google Maps without heavy wrist weight or daily charging.',
    verdict: 'The best value Google Wear OS smartwatch under ₹16,000.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'The lightweight aluminum body feels so much better during long marathon runs than heavier steel watches.',
      frequentPraise: ['Super light on wrist', '4-day battery life', 'Fast 10-min charging'],
      frequentComplaints: ['Bezel doesn’t rotate']
    }
  },
  {
    id: 'prod-samsung-galaxy-watch6-classic',
    title: 'Samsung Galaxy Watch 6 Classic 47mm (Physical Rotating Bezel, Stainless Steel, Super AMOLED Sapphire, ECG, BIA Body Composition, Wear OS)',
    brand: 'Samsung',
    price: 26999,
    priceINR: 26999,
    priceUSD: 325,
    originalPrice: 41999,
    originalPriceINR: 41999,
    originalPriceUSD: 510,
    rating: 4.8,
    reviewCount: 5620,
    category: 'Smartwatches',
    description: 'The return of the iconic physical rotating bezel for tactile menu navigation. Crafted from premium stainless steel with Sapphire Crystal glass, larger 1.5" Super AMOLED screen, advanced sleep score metrics, ECG monitoring, and BIA body composition analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'Wear OS Powered by Samsung (One UI 5 Watch)',
      'Display': '1.5-inch Super AMOLED (480x480) with Sapphire Crystal Glass',
      'Navigation': 'Mechanical Physical Rotating Bezel',
      'Processor': 'Samsung Exynos W930 (Dual-Core 1.4GHz, 5nm)',
      'RAM / Storage': '2GB RAM + 16GB Storage',
      'Health Sensors': 'BioActive Sensor (Optical HR + Electrical ECG + Bioelectrical Impedance BIA)',
      'Durability': '5ATM + IP68, MIL-STD-810H, Stainless Steel Chassis',
      'Battery': '425 mAh (Up to 40 hours with Always-On Display)'
    },
    pros: [
      'Physical rotating bezel provides satisfying, precise tactile navigation without smudging the screen',
      'Timeless premium stainless steel chronograph watch design',
      'Full suite of health analytics: ECG, Blood Pressure, Skeletal Muscle, and Body Fat %',
      'Seamless Samsung Galaxy phone integration with camera controller and Samsung Wallet'
    ],
    cons: [
      'Requires daily charging (approx 30-40 hours battery)',
      'Heavier on the wrist due to stainless steel case'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 93,
    matchScore: 94,
    dealBadge: 'Iconic Rotating Bezel',
    recommendationType: 'best-overall',
    recommendationReason: 'The most elegant Android smartwatch with a physical rotating bezel, luxury stainless steel build, and comprehensive ECG & body fat sensors.',
    priceHistory: [
      { date: '2026-06-01', price: 41999, priceINR: 41999 },
      { date: '2026-08-01', price: 26999, priceINR: 26999 }
    ],
    retailer: 'Samsung Shop / Amazon',
    whoIsThisFor: 'Professionals and students who appreciate traditional watch aesthetics combined with state-of-the-art smartwatch intelligence.',
    verdict: 'The king of luxury Android horology design.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'The mechanical rotating click is deeply satisfying and keeps the display free of oily finger smudges.',
      frequentPraise: ['Rotating bezel tactile feel', 'Classy watch aesthetic', 'ECG accuracy'],
      frequentComplaints: ['1.5 day battery life']
    }
  },
  {
    id: 'prod-samsung-galaxy-watch6',
    title: 'Samsung Galaxy Watch 6 44mm (Super AMOLED Sapphire, Exynos W930, 2GB+16GB, ECG & Blood Pressure, Body Composition BIA, Wear OS)',
    brand: 'Samsung',
    price: 17999,
    priceINR: 17999,
    priceUSD: 215,
    originalPrice: 33999,
    originalPriceINR: 33999,
    originalPriceUSD: 410,
    rating: 4.6,
    reviewCount: 8200,
    category: 'Smartwatches',
    description: 'Featuring 20% larger display with 30% slimmer bezels, Sapphire crystal, advanced sleep coaching, ECG sensor, personalized heart rate zones, and BIA body fat analysis.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'Wear OS Powered by Samsung (One UI 5 Watch)',
      'Display': '1.5-inch Super AMOLED (480x480) with Sapphire Crystal',
      'Processor': 'Samsung Exynos W930 (Dual-Core 1.4GHz, 5nm)',
      'RAM / Storage': '2GB RAM + 16GB Internal Storage',
      'Health Sensors': 'BioActive Sensor (Optical Heart Rate + Electrical Heart Signal ECG + Bioelectrical Impedance BIA)',
      'Durability': '5ATM + IP68 / MIL-STD-810H Armor Aluminum',
      'Battery': '425 mAh (Up to 40 hours, WPC wireless fast charge)'
    },
    pros: [
      'Comprehensive medical-grade sensors: ECG, Blood Pressure, and Body Fat % BIA',
      'Stunning borderless Super AMOLED display with Sapphire glass',
      'Seamless ecosystem integration with Samsung Galaxy smartphones',
      'Interchangeable 1-click band mechanism'
    ],
    cons: [
      'Battery life requires daily top-ups (approx 30-40 hours)',
      'ECG & BP features require a Samsung phone'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 94,
    matchScore: 91,
    dealBadge: 'Best Health Sensors',
    recommendationType: 'best-value',
    recommendationReason: 'Deepest discount on a premium health smartwatch with ECG, body composition BIA, and gorgeous edge-to-edge screen under ₹18,000.',
    priceHistory: [
      { date: '2026-06-01', price: 33999, priceINR: 33999 },
      { date: '2026-08-01', price: 17999, priceINR: 17999 }
    ],
    retailer: 'Samsung Shop / Amazon',
    whoIsThisFor: 'Fitness enthusiasts tracking body fat %, blood pressure, ECG rhythms, and Samsung phone owners seeking seamless wrist control.',
    verdict: 'The most comprehensive health and fitness tracking smartwatch for Android.',
    sentimentSummary: {
      positivePercent: 93,
      keyHighlight: 'BIA body composition tracker gives accurate body fat % and skeletal muscle readings directly from your wrist.',
      frequentPraise: ['ECG & body fat sensor', 'Bright bezel-less screen', 'Lightweight on the wrist'],
      frequentComplaints: ['1.5 day battery life']
    }
  },
  {
    id: 'prod-samsung-galaxy-watch4-bt',
    title: 'Samsung Galaxy Watch 4 Bluetooth 44mm (Super AMOLED, Wear OS with Google Play & Maps, BioActive Sensor, 16GB Storage, NFC Pay)',
    brand: 'Samsung',
    price: 8999,
    priceINR: 8999,
    priceUSD: 108,
    originalPrice: 29999,
    originalPriceINR: 29999,
    originalPriceUSD: 360,
    rating: 4.5,
    reviewCount: 16500,
    category: 'Smartwatches',
    description: 'The most affordable full Google Wear OS smartwatch on the market. Offers Google Play Store app downloads, turn-by-turn Google Maps on your wrist, BioActive health sensor, sleep tracking, and Samsung Health syncing for under ₹9,000.',
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'Wear OS Powered by Samsung (Google Play Store & Google Maps)',
      'Display': '1.4-inch Super AMOLED (450x450, Corning Gorilla Glass DX+)',
      'Processor': 'Exynos W920 Dual-Core 1.18GHz',
      'Storage / RAM': '16GB Storage + 1.5GB RAM',
      'Sensors': 'Optical Heart Rate + BIA Body Composition Sensor + Accelerometer + Gyro',
      'Connectivity': 'Bluetooth 5.0, Wi-Fi, NFC, GPS',
      'Water Resistance': '5ATM + IP68 Waterproof'
    },
    pros: [
      'Unbelievable value: full Google Wear OS & Google Maps on your wrist under ₹9,000',
      'Rich Super AMOLED screen with sharp 450x450 resolution',
      'Full access to WhatsApp on wrist, Spotify offline playlists, and Play Store apps',
      'BIA body composition sensor measures skeletal muscle and body fat'
    ],
    cons: [
      'Battery lasts 1 to 1.5 days',
      'Charges in approx 1.5 hours'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 98,
    matchScore: 94,
    dealBadge: 'Best WearOS Under ₹10k',
    recommendationType: 'best-budget',
    recommendationReason: 'An unbeatable budget steal under ₹9,000 offering real Google Wear OS, Google Maps, and app downloads.',
    priceHistory: [
      { date: '2026-06-01', price: 11999, priceINR: 11999 },
      { date: '2026-08-01', price: 8999, priceINR: 8999 }
    ],
    retailer: 'Samsung India / Flipkart',
    whoIsThisFor: 'College students who want real smart features (Google Maps navigation during bike rides, WhatsApp replies) without spending over ₹10k.',
    verdict: 'The best budget Google Wear OS smartwatch ever released.',
    sentimentSummary: {
      positivePercent: 94,
      keyHighlight: 'Running full Google Maps on your wrist during bike rides for under ₹9k is insane value.',
      frequentPraise: ['Google Maps on wrist', 'Sharp AMOLED screen', 'Low price point'],
      frequentComplaints: ['Daily charging required']
    }
  },
  {
    id: 'prod-garmin-forerunner-165',
    title: 'Garmin Forerunner 165 (1.2-inch Bright AMOLED Touchscreen, Garmin Coach, PacePro, Morning Report, Pulse Ox, 11-Day Battery for Runners)',
    brand: 'Garmin',
    price: 24990,
    priceINR: 24990,
    priceUSD: 299,
    originalPrice: 29990,
    originalPriceINR: 29990,
    originalPriceUSD: 360,
    rating: 4.9,
    reviewCount: 3120,
    category: 'Smartwatches',
    description: 'Designed specifically for dedicated runners and athletes. Features a brilliant colorful AMOLED touchscreen, Garmin Coach training plans that adapt to your progress, recovery time metrics, HRV status, PacePro race pacing strategies, and up to 11 days of battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Display': '1.2-inch Colorful AMOLED Touchscreen (390x390, Chemically Strengthened Glass)',
      'Battery Life': 'Up to 11 Days in Smartwatch Mode, 19 Hours in GPS Mode',
      'Running Dynamics': 'Wrist-based Running Power, Cadence, Stride Length, Ground Contact Time',
      'Training Features': 'Garmin Coach 5K/10K/Half-Marathon Adaptive Plans, Daily Suggested Workouts, Recovery Advisor, HRV Status',
      'Health Sensors': 'Elevate Wrist Heart Rate, Pulse Ox Blood Oxygen, Body Battery Energy Monitor, Sleep Score',
      'Weight': '39 grams (Ultra-lightweight fiber-reinforced polymer)',
      'Water Resistance': '5 ATM (Swim friendly)'
    },
    pros: [
      'Garmin’s world-class running metrics: adaptive training plans, PacePro, and recovery advisors',
      'Vibrant AMOLED touchscreen paired with 5 tactile physical buttons for sweaty workouts',
      'Massive 11-day battery life (no need to charge during race weeks)',
      'Pinpoint GPS tracking and detailed post-run telemetry in Garmin Connect'
    ],
    cons: [
      'No mic/speaker for answering phone calls',
      'Proprietary Garmin charging port'
    ],
    inStock: true,
    shipping: 'Free Express Delivery',
    dealScore: 95,
    matchScore: 98,
    dealBadge: 'Top Running & Marathon Watch',
    recommendationType: 'best-performance',
    recommendationReason: 'The #1 choice for runners, athletes, and marathon training with personalized coaching, HRV recovery, and 11-day battery.',
    priceHistory: [
      { date: '2026-06-01', price: 29990, priceINR: 29990 },
      { date: '2026-08-01', price: 24990, priceINR: 24990 }
    ],
    retailer: 'Garmin Brand Store / Amazon',
    whoIsThisFor: 'Track & field athletes, 5k/10k/marathon runners, gym-goers, and anyone who takes physiological recovery and training seriously.',
    verdict: 'The gold standard sports watch for runners under ₹25k.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'Garmin Coach and Body Battery accurately forecast when you are primed for a personal record run vs when you need rest.',
      frequentPraise: ['11-day battery life', 'Accurate heart rate zones', 'PacePro race guidance'],
      frequentComplaints: ['No speaker for voice calls']
    }
  },
  {
    id: 'prod-garmin-venu-3',
    title: 'Garmin Venu 3 (1.4-inch AMOLED, Built-in Speaker & Mic for Voice Calls, Sleep Coach with Nap Detection, Body Battery, 14-Day Battery)',
    brand: 'Garmin',
    price: 43990,
    priceINR: 43990,
    priceUSD: 449,
    originalPrice: 48990,
    originalPriceINR: 48990,
    originalPriceUSD: 510,
    rating: 4.8,
    reviewCount: 1850,
    category: 'Smartwatches',
    description: 'The ultimate crossover between an elite sports watch and a lifestyle smartwatch. Features a built-in speaker and microphone to make/take phone calls and use your phone’s voice assistant, personalized Sleep Coach with nap tracking, wheelchair mode, and up to 14 days of battery.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Display': '1.4-inch AMOLED (454x454, Corning Gorilla Glass 3)',
      'Battery Life': 'Up to 14 Days in Smartwatch Mode (5 Days Always-On), 26 Hours GPS',
      'Voice Features': 'Built-in Speaker & Mic (Bluetooth Calls & Phone Voice Assistant Control)',
      'Health Monitoring': 'Personalized Sleep Coach, Automatic Nap Detection, Body Battery, ECG Ready, Skin Temp',
      'Sports Modes': '30+ Preloaded Sports Apps, Animated On-screen Workouts (HIIT, Pilates, Yoga)',
      'Wheelchair Mode': 'Tracks pushes and weight shift alerts with dedicated workouts',
      'Durability': 'Stainless Steel Bezel, 5 ATM Water Resistance'
    },
    pros: [
      'Unrivaled 14-day battery life on a gorgeous full AMOLED smartwatch',
      'Answer voice calls and command Siri/Google Assistant directly from your wrist speaker',
      'Automatic nap detection and personalized sleep coaching provide genuine health insights',
      'Compatible with both iPhone and Android seamlessly'
    ],
    cons: [
      'Premium price point',
      'No offline LTE cellular option'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 92,
    matchScore: 95,
    dealBadge: 'Best 14-Day Health Smartwatch',
    recommendationType: 'best-overall',
    recommendationReason: 'The best all-round health watch combining 14 days of battery, on-wrist speaker calls, and Garmin’s legendary physiological tracking.',
    priceHistory: [
      { date: '2026-06-01', price: 48990, priceINR: 48990 },
      { date: '2026-08-01', price: 43990, priceINR: 43990 }
    ],
    retailer: 'Garmin Store / Amazon',
    whoIsThisFor: 'Health-conscious professionals and students who want deep health analytics, nap tracking, and voice calls without charging every day.',
    verdict: 'The pinnacle of battery life and lifestyle health metrics.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Automatic nap tracking and Body Battery scores accurately reflect how refreshed you actually feel throughout the day.',
      frequentPraise: ['14-day battery life', 'Crisp speakerphone on wrist', 'Nap detection'],
      frequentComplaints: ['High price tag']
    }
  },
  {
    id: 'prod-amazfit-balance',
    title: 'Amazfit Balance (Zepp OS 3.5 with Zepp Flow AI, 1.5" HD AMOLED 1500 nits, Dual-Band Circularly-Polarized GPS, Body Composition, 14-Day Battery)',
    brand: 'Amazfit',
    price: 19999,
    priceINR: 19999,
    priceUSD: 229,
    originalPrice: 24999,
    originalPriceINR: 24999,
    originalPriceUSD: 285,
    rating: 4.7,
    reviewCount: 4230,
    category: 'Smartwatches',
    description: 'Designed for mind and body balance. Features Zepp Flow AI natural language voice control, 1.5-inch 1500 nits AMOLED screen, industry-leading circularly-polarized GPS antennas for 99.5% accuracy in skyscraper canyons, BIA body composition analysis, mental & physical readiness scores, and 14-day battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Operating System': 'Zepp OS 3.5 with Zepp Flow Natural Language AI Voice Control',
      'Display': '1.5-inch HD AMOLED (480x480, 1500 nits peak, Anti-glare Glass)',
      'GPS': 'Dual-Band & 6 Satellite Positioning with Circular Polarization',
      'Battery Life': '14 Days Typical Use, 25 Days Battery Saver, 26 Hours Accurate GPS',
      'Health Sensors': 'BioTracker 5.0 PPG (Dual-LED 8PD) + BIA Bioimpedance Sensor (Body Fat, Muscle Mass, Water %)',
      'Voice & Audio': 'Built-in Speaker & Mic for Bluetooth phone calls and AI chat',
      'Storage': '2.2GB on-board music storage for phone-free workouts',
      'Durability': '5 ATM Water Resistance, Metallic Frame'
    },
    pros: [
      'Zepp Flow AI lets you control watch settings and respond to queries with natural voice',
      'Massive 14-day battery life with a razor-sharp 1500 nits 1.5" AMOLED screen',
      'Measures body fat %, skeletal muscle, BMI, and daily Readiness scores',
      'Dual-band circular GPS stays locked on even between dense campus buildings'
    ],
    cons: [
      'App Store ecosystem is smaller than Google Wear OS or watchOS'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 95,
    matchScore: 94,
    dealBadge: 'Best AI Voice & 14-Day Battery',
    recommendationType: 'best-value',
    recommendationReason: 'An incredible all-around smartwatch combining 14-day battery, body composition BIA, Bluetooth calls, and AI voice controls for under ₹20,000.',
    priceHistory: [
      { date: '2026-06-01', price: 24999, priceINR: 24999 },
      { date: '2026-08-01', price: 19999, priceINR: 19999 }
    ],
    retailer: 'Amazfit India / Amazon',
    whoIsThisFor: 'Fitness-minded students and tech enthusiasts looking for body composition metrics, phone calls, and 2-week battery life.',
    verdict: 'The best balance of battery life, AI features, and health tracking in the ₹20k segment.',
    sentimentSummary: {
      positivePercent: 95,
      keyHighlight: 'Readiness score and 14-day battery life make this watch a joy to wear 24/7 without worrying about chargers.',
      frequentPraise: ['14-day battery life', '1500 nits screen clarity', 'Body composition stats'],
      frequentComplaints: ['Fewer 3rd party apps than WearOS']
    }
  },
  {
    id: 'prod-cmf-watch-pro-2',
    title: 'CMF by Nothing Watch Pro 2 (Interchangeable Bezel Design, 1.32" AMOLED 60Hz Display, Functional Crown, AI Noise Reduction BT Calls, 11-Day Battery)',
    brand: 'CMF by Nothing',
    price: 4999,
    priceINR: 4999,
    priceUSD: 59,
    originalPrice: 5999,
    originalPriceINR: 5999,
    originalPriceUSD: 72,
    rating: 4.6,
    reviewCount: 7800,
    category: 'Smartwatches',
    description: 'Unique customizable aesthetic featuring interchangeable bezel rings, a circular 1.32-inch AMOLED display with fluid 60Hz auto-brightness, functional rotating navigation crown, Bluetooth calling enhanced with AI noise reduction, multi-system GPS, and up to 11 days of battery.',
    imageUrl: 'https://images.unsplash.com/photo-1509741102003-ca64bfe5f069?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Display': '1.32-inch AMOLED (466x466), 60Hz Refresh Rate, 620 nits Auto-Brightness',
      'Bezel': 'Interchangeable Bezel System (Flat & Dark Grey / Curved)',
      'Battery Life': '11 Days Typical Use (45 Days Power Saving, 9 Days Heavy Use)',
      'Voice Calling': 'Bluetooth Phone Calls with AI Environmental Noise Reduction',
      'GPS': 'Built-in Multi-system GPS (GPS/GLONASS/Galileo/QZSS/Beidou)',
      'Sports & Health': '120 Sports Modes with Smart Auto-recognition, 24h Heart Rate, SpO2, Stress, Sleep',
      'Water Resistance': 'IP68 Water and Dust Resistance',
      'Navigation': 'Functional Rotating Digital Crown'
    },
    pros: [
      'Striking minimalist Nothing aesthetic with interchangeable physical bezels',
      'Fluid 60Hz AMOLED screen with auto-brightness under ₹5,000',
      'Built-in GPS and Bluetooth phone calls with clear AI noise reduction',
      '11-day battery life with Nothing OS companion app widget support'
    ],
    cons: [
      'Cannot install third-party apps',
      'IP68 rating (splash/rain proof, not recommended for deep swimming)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 98,
    matchScore: 96,
    dealBadge: 'Best Design Under ₹5k',
    recommendationType: 'best-budget',
    recommendationReason: 'The most stylish and fluid smartwatch under ₹5,000 with 60Hz AMOLED, rotating crown, standalone GPS, and 11-day battery.',
    priceHistory: [
      { date: '2026-06-01', price: 5999, priceINR: 5999 },
      { date: '2026-08-01', price: 4999, priceINR: 4999 }
    ],
    retailer: 'Flipkart / Nothing Store',
    whoIsThisFor: 'Style-conscious students, design enthusiasts, and budget buyers wanting a premium-feeling smartwatch for ₹4,999.',
    verdict: 'The best designed and smoothest budget smartwatch of the year.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'The 60Hz fluid scrolling and interchangeable bezel make it look 3x more expensive than it actually is.',
      frequentPraise: ['60Hz smooth animations', 'Interchangeable bezels', 'Nothing OS aesthetic'],
      frequentComplaints: ['No third party app store']
    }
  },
  {
    id: 'prod-noise-colorfit-pro5-max',
    title: 'Noise ColorFit Pro 5 Max (1.96" Super AMOLED, VO2 Max, Post-Training Recovery Time, Single-Chip BT Calling with TruSync, 7-Day Battery)',
    brand: 'Noise',
    price: 3999,
    priceINR: 3999,
    priceUSD: 48,
    originalPrice: 7999,
    originalPriceINR: 7999,
    originalPriceUSD: 95,
    rating: 4.5,
    reviewCount: 14800,
    category: 'Smartwatches',
    description: 'Features a large 1.96-inch Super AMOLED edge-to-edge display, advanced training metrics including VO2 Max and recovery calculations, Rapid SOS emergency alerts, single-chip TruSync Bluetooth calling, functional crown, and sleek metallic finish.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Display': '1.96-inch Super AMOLED (410x502 resolution, Always-On Display)',
      'Calling': 'TruSync Single-Chip Bluetooth Calling with Quick Dial Pad & 10 Favorite Contacts',
      'Fitness Metrics': 'VO2 Max, Post-Training Recovery Calculator, Training Load',
      'Safety': 'Rapid SOS (One-touch Emergency Contact Dialing)',
      'Battery Life': 'Up to 7 Days typical use, 2 Days with Heavy Calling & Always-On',
      'Sports Modes': '100+ Sports Modes with Auto Detection',
      'Water Resistance': 'IP68 Water & Dust Resistant',
      'Build': 'Metallic finish with functional digital crown'
    },
    pros: [
      'Huge 1.96" Super AMOLED display is sharp, colorful, and easy to read',
      'VO2 Max and training recovery calculator are rare at this price point',
      'Rapid SOS feature for campus safety with emergency contact shortcut',
      'Single-chip TruSync ensures fast Bluetooth connection with low battery drain'
    ],
    cons: [
      'Uses connected phone GPS (no built-in standalone GPS)',
      'Plastic back casing'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 97,
    matchScore: 93,
    dealBadge: 'Top Student Bestseller Under ₹4k',
    recommendationType: 'best-budget',
    recommendationReason: 'Huge 1.96" Super AMOLED screen, VO2 Max metrics, and instant Bluetooth calling make this the #1 student bestseller under ₹4,000.',
    priceHistory: [
      { date: '2026-06-01', price: 5999, priceINR: 5999 },
      { date: '2026-08-01', price: 3999, priceINR: 3999 }
    ],
    retailer: 'Noise Store / Amazon',
    whoIsThisFor: 'College students wanting a large, vibrant square display with Bluetooth calling, emergency SOS, and gym tracking on a tight budget.',
    verdict: 'The most feature-packed square AMOLED budget smartwatch under ₹4,000.',
    sentimentSummary: {
      positivePercent: 94,
      keyHighlight: 'Huge bright screen with loud and clear Bluetooth calling right from your wrist during campus commutes.',
      frequentPraise: ['1.96" AMOLED brightness', 'Clear mic for calls', 'SOS button safety'],
      frequentComplaints: ['Requires phone GPS for outdoor map routes']
    }
  },
  {
    id: 'prod-fire-boltt-invincible-plus',
    title: 'Fire-Boltt Invincible Plus (1.43" 2.5D AMOLED, 4GB Built-in Storage for Direct TWS Earbud Pairing, 300+ Sports Modes, Bluetooth Calling)',
    brand: 'Fire-Boltt',
    price: 4499,
    priceINR: 4499,
    priceUSD: 54,
    originalPrice: 10999,
    originalPriceINR: 10999,
    originalPriceUSD: 130,
    rating: 4.4,
    reviewCount: 9200,
    category: 'Smartwatches',
    description: 'A powerhouse media smartwatch featuring 4GB of internal storage so you can download hundreds of songs and connect your Bluetooth earbuds directly to the watch without carrying a phone on runs. Features 1.43" 2.5D AMOLED screen, 300+ sports modes, and rotating crown.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Display': '1.43-inch Round AMOLED (460x460), 2.5D Curved Glass, Always-On Display',
      'Local Storage': '4GB Internal Memory (Stores ~1000 songs and voice recordings)',
      'TWS Pairing': 'Connect Bluetooth Earbuds / Headphones directly to watch without a phone',
      'Calling': 'Bluetooth Calling with In-built Mic, Speaker, and Contact Book',
      'Sports Modes': '300+ Sports Modes with Real-Time Heart Rate & Calorie Burn',
      'Battery Life': 'Up to 5 Days (Up to 15 Days Standby)',
      'Build': 'Full Stainless Steel Metal Case with Rotating Crown'
    },
    pros: [
      '4GB built-in storage allows phone-free running with your favorite MP3 music playlist and Bluetooth earbuds',
      'Sturdy stainless steel round case with classic horology watch face options',
      'Vibrant 1.43" AMOLED screen with Always-On display',
      'Built-in voice recorder for recording college lectures or quick voice memos'
    ],
    cons: [
      'Battery life drops when playing music directly over Bluetooth for hours',
      'No standalone GPS'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 95,
    matchScore: 92,
    dealBadge: '4GB Music & TWS Pairing',
    recommendationType: 'best-value',
    recommendationReason: 'The only smartwatch under ₹5,000 with 4GB onboard storage to connect TWS earbuds directly and play music without a phone.',
    priceHistory: [
      { date: '2026-06-01', price: 6999, priceINR: 6999 },
      { date: '2026-08-01', price: 4499, priceINR: 4499 }
    ],
    retailer: 'Amazon / Flipkart',
    whoIsThisFor: 'Students and runners who want to leave their heavy smartphone in their locker or dorm room while listening to music through their earbuds.',
    verdict: 'The king of offline music playback on a budget.',
    sentimentSummary: {
      positivePercent: 93,
      keyHighlight: 'Pairing my wireless earbuds directly to the watch and going for morning jogs with no phone is brilliant.',
      frequentPraise: ['4GB music storage', 'Direct TWS headphone connection', 'Voice recorder'],
      frequentComplaints: ['Music transfer via USB is manual']
    }
  },
  {
    id: 'prod-fastrack-limitless-fs1-pro',
    title: 'Fastrack Limitless FS1 Pro (1.96" Curved Super AMOLED 410x502, SingleSync BT Calling, 110+ Sports Modes, NitroFast Fast Charging)',
    brand: 'Fastrack',
    price: 2799,
    priceINR: 2799,
    priceUSD: 34,
    originalPrice: 7995,
    originalPriceINR: 7995,
    originalPriceUSD: 96,
    rating: 4.4,
    reviewCount: 18200,
    category: 'Smartwatches',
    description: 'Youthful and energetic smartwatch from Titan’s Fastrack brand. Boasts a massive 1.96-inch Curved Super AMOLED display with high 410x502 resolution, SingleSync Bluetooth calling with advanced noise cancellation, 110+ sports modes, and 10-minute NitroFast charging for 1 full day of power.',
    imageUrl: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Display': '1.96-inch Curved Super AMOLED (410x502 resolution, Arched 2.5D Surface)',
      'Calling': 'SingleSync Bluetooth Calling with AI Environmental Noise Reduction',
      'Charging': 'NitroFast Charging (10 Minutes Charge = 1 Day Battery Life)',
      'Battery Life': 'Up to 7 Days Normal Use',
      'Sports Tracking': '110+ Sports Modes with Auto-pause, Calorie and Distance Counter',
      'Health Monitoring': '24x7 Heart Rate, SpO2, Auto Sleep Tracking, Stress Monitor',
      'Water Resistance': 'IP68 Water and Sweat Proof'
    },
    pros: [
      'Incredible value: 1.96" Curved Super AMOLED screen under ₹2,800',
      'Backed by Titan & Fastrack’s trusted brand warranty and service network',
      '10-minute fast charging gives a whole day of battery life',
      'Ergonomic curved display conforms comfortably to the natural curvature of the wrist'
    ],
    cons: [
      'Plastic side casing',
      'No in-built GPS'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 99,
    matchScore: 93,
    dealBadge: 'Best Super-Budget Watch (< ₹3k)',
    recommendationType: 'best-budget',
    recommendationReason: 'Curved 1.96" Super AMOLED display, Titan Fastrack reliability, and fast charging make this the top watch under ₹3,000.',
    priceHistory: [
      { date: '2026-06-01', price: 3995, priceINR: 3995 },
      { date: '2026-08-01', price: 2799, priceINR: 2799 }
    ],
    retailer: 'Fastrack Store / Flipkart',
    whoIsThisFor: 'Students wanting an ultra-affordable curved AMOLED smartwatch with reliable Bluetooth calling and fast charging under ₹3,000.',
    verdict: 'The highest value curved AMOLED smartwatch under ₹3k.',
    sentimentSummary: {
      positivePercent: 95,
      keyHighlight: 'The curved glass feels super smooth to swipe on, and the screen colors pop beautifully for under ₹3k.',
      frequentPraise: ['Curved AMOLED display', 'Fast charging', 'Reliable BT calls'],
      frequentComplaints: ['App has occasional notification delay']
    }
  },

  // =============================================================
  // 5. TABLETS & STYLUS (Note-taking, Lectures, 2.8K Screens)
  // =============================================================
  {
    id: 'prod-xiaomi-pad-6',
    title: 'Xiaomi Pad 6 (Snapdragon 870, 8GB RAM, 256GB Storage, 11-inch 2.8K 144Hz 10-Bit Display, Quad Speakers Dolby Atmos, 8840mAh 33W)',
    brand: 'Xiaomi',
    price: 24999,
    priceINR: 24999,
    priceUSD: 310,
    originalPrice: 32999,
    originalPriceINR: 32999,
    originalPriceUSD: 399,
    rating: 4.8,
    reviewCount: 6120,
    category: 'Tablets',
    description: 'Unibody metal design packed with flagship features: 11-inch 2.8K 144Hz 10-bit display, Snapdragon 870 powerhouse, 4 stereo speakers with Dolby Atmos, and 8840 mAh battery with 33W fast charge.',
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'Qualcomm Snapdragon 870 (7nm 3.2GHz Kryo 585)',
      'RAM': '8GB LPDDR5',
      'Storage': '256GB UFS 3.1',
      'Display': '11.0" 2.8K (2880x1800) 144Hz 10-bit Dolby Vision (550 nits, HDR10)',
      'Audio': 'Quad Speakers with Dolby Atmos',
      'Battery': '8840 mAh with 33W Fast Charging',
      'Weight': '490 grams (6.51mm ultra-thin metal unibody)',
      'Stylus Support': 'Xiaomi Smart Pen (2nd Gen) with 4096 pressure levels'
    },
    pros: [
      'Unbelievable 144Hz 2.8K display at an ultra-accessible ₹24,999 price tag',
      'Loud and clear quad stereo speakers for video lectures and multimedia',
      'Metal unibody chassis feels like a ₹60,000 flagship tablet',
      'Snapdragon 870 effortlessly handles heavy split-screen multitasking'
    ],
    cons: [
      'No cellular LTE option (Wi-Fi 6 only)',
      'Stylus sold separately'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 98,
    matchScore: 97,
    dealBadge: 'Best Budget Tablet',
    recommendationType: 'best-budget',
    recommendationReason: 'The absolute best value Android tablet under ₹25,000 with a fluid 144Hz 2.8K display and quad speakers for PDF reading and lecture viewing.',
    priceHistory: [
      { date: '2026-06-01', price: 32999, priceINR: 32999 },
      { date: '2026-08-01', price: 24999, priceINR: 24999 }
    ],
    retailer: 'Mi Store / Amazon',
    whoIsThisFor: 'Students wanting a high-resolution screen for video lectures, PDF textbooks, coding notes, and media consumption under ₹25k.',
    verdict: 'The undisputed budget tablet king for students and entertainment.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: '144Hz 2.8K display looks ridiculously crisp when reading research papers and watching recorded lectures.',
      frequentPraise: ['144Hz screen', 'Loud quad speakers', 'Slim metal build'],
      frequentComplaints: ['No cellular SIM card slot']
    }
  },
  {
    id: 'prod-apple-ipad-10th-gen',
    title: 'Apple iPad 10th Gen (A14 Bionic, 10.9-inch Liquid Retina Display, 64GB, Landscape 12MP Ultra-Wide Front Camera, USB-C, Wi-Fi 6)',
    brand: 'Apple',
    price: 32990,
    priceINR: 32990,
    priceUSD: 395,
    originalPrice: 39900,
    originalPriceINR: 39900,
    originalPriceUSD: 480,
    rating: 4.8,
    reviewCount: 9450,
    category: 'Tablets',
    description: 'All-screen modern design with 10.9-inch Liquid Retina display, A14 Bionic chip, landscape 12MP Center Stage front camera, USB-C connectivity, and support for Apple Pencil (USB-C) and Magic Keyboard Folio.',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Processor': 'Apple A14 Bionic with 16-Core Neural Engine',
      'Display': '10.9-inch Liquid Retina (2360x1640, 500 nits, True Tone)',
      'Storage': '64GB',
      'Front Camera': 'Landscape 12MP Ultra-Wide with Center Stage',
      'Rear Camera': '12MP Wide with 4K Video',
      'Port': 'USB-C for charging and accessories',
      'Security': 'Touch ID built into top power button',
      'Stylus': 'Apple Pencil (USB-C) and Apple Pencil (1st Gen)'
    },
    pros: [
      'Landscape Center Stage camera keeps you centered during video lectures and calls',
      'Universal USB-C connector simplifies charging',
      'Huge iPadOS App Store ecosystem: GoodNotes, Notability, Procreate, MS Office',
      'Long-lasting 10-hour battery life and multi-year iPadOS support'
    ],
    cons: [
      'Base 64GB storage may require cloud storage for heavy video libraries',
      'Non-laminated display glass'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 94,
    matchScore: 93,
    dealBadge: 'Best Note-Taking Tablet',
    recommendationType: 'best-overall',
    recommendationReason: 'The gold standard tablet for handwritten college notes, PDF annotation, GoodNotes app, and zoom calls with Center Stage.',
    priceHistory: [
      { date: '2026-06-01', price: 39900, priceINR: 39900 },
      { date: '2026-08-01', price: 32990, priceINR: 32990 }
    ],
    retailer: 'Apple Store / Amazon',
    whoIsThisFor: 'Students taking handwritten engineering notes, annotating PDF slides, drawing diagrams, and attending online lectures.',
    verdict: 'The most versatile and durable student tablet for digital note-taking.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'GoodNotes and Apple Pencil make paper notebooks completely obsolete.',
      frequentPraise: ['Center stage camera', 'Fluid iPadOS app support', 'All-day battery'],
      frequentComplaints: ['64GB base storage is modest']
    }
  },

  // =============================================================
  // 6. MONITORS & DISPLAYS (4K UHD, 165Hz Gaming, IPS)
  // =============================================================
  {
    id: 'prod-lg-27up850n-4k',
    title: 'LG 27UP850N-W 27" 4K UHD IPS Monitor (3840x2160, DCI-P3 95%, HDR400, USB-C 90W Power Delivery, Height/Pivot/Tilt Stand)',
    brand: 'LG',
    price: 29999,
    priceINR: 29999,
    priceUSD: 360,
    originalPrice: 42000,
    originalPriceINR: 42000,
    originalPriceUSD: 510,
    rating: 4.8,
    reviewCount: 3120,
    category: 'Monitors',
    description: 'Professional 27-inch 4K UHD IPS display featuring single-cable USB-C connectivity with 90W laptop power delivery, DCI-P3 95% color accuracy, HDR400, AMD FreeSync, and ergonomic 90-degree pivot stand for vertical coding.',
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Screen Size': '27.0-inch 16:9 Aspect Ratio',
      'Resolution': '4K Ultra HD (3840 x 2160 Pixels) at 60Hz',
      'Panel Type': 'IPS with Anti-Glare 3H Coating',
      'Color Gamut': 'DCI-P3 95% (CIE1976), 1.07 Billion Colors, HDR400',
      'USB-C Power Delivery': '90W (Charges laptop + transmits 4K video + USB hub data in 1 cable)',
      'Stand Adjustments': 'Tilt (-5° to 20°), Height (110mm), Pivot (90° Vertical Rotation for Coding)',
      'Ports': '1x USB-C (90W PD + DP), 2x HDMI 2.0, 1x DisplayPort 1.4, 2x USB 3.0 downstream, Audio Out',
      'Audio': 'Stereo Speakers 5W x 2 with MaxxAudio'
    },
    pros: [
      'Single USB-C cable transmits 4K video and charges your laptop with 90W power',
      '90-degree vertical pivot stand allows reading 100+ lines of code without scrolling',
      'Stunning 4K resolution provides razor-sharp typography and huge screen real estate',
      'Accurate DCI-P3 95% color coverage for design and video editing'
    ],
    cons: [
      '60Hz refresh rate (tailored for productivity and coding rather than competitive eSports)'
    ],
    inStock: true,
    shipping: 'Free Heavy Item Delivery',
    dealScore: 96,
    matchScore: 97,
    dealBadge: 'Best 4K Coding Monitor',
    recommendationType: 'best-overall',
    recommendationReason: 'The ideal workstation monitor for students and developers: 4K sharpness, 90W laptop USB-C charging, and 90-degree vertical pivot for code inspection.',
    priceHistory: [
      { date: '2026-06-01', price: 42000, priceINR: 42000 },
      { date: '2026-08-01', price: 29999, priceINR: 29999 }
    ],
    retailer: 'LG Store / Amazon',
    whoIsThisFor: 'Software developers, data analysts, ECE circuit designers, and students wanting a clean 1-cable desk setup with vertical code view.',
    verdict: 'The finest 4K USB-C productivity and coding monitor under ₹30,000.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Pivoting the screen vertically lets you inspect full Verilog/Python source files without scrolling.',
      frequentPraise: ['90W USB-C charging', 'Razor sharp 4K text', 'Vertical pivot stand'],
      frequentComplaints: ['60Hz standard refresh rate']
    }
  },
  {
    id: 'prod-acer-nitro-vg270-165hz',
    title: 'Acer Nitro VG270 M3 27" Full HD Gaming Monitor (180Hz OC / 165Hz IPS, 0.5ms Response, HDR10, AMD FreeSync Premium, sRGB 99%, Stereo Speakers)',
    brand: 'Acer',
    price: 11999,
    priceINR: 11999,
    priceUSD: 145,
    originalPrice: 17999,
    originalPriceINR: 17999,
    originalPriceUSD: 215,
    rating: 4.6,
    reviewCount: 4890,
    category: 'Monitors',
    description: 'Blazing fast 180Hz/165Hz IPS panel with 0.5ms response time, AMD FreeSync Premium, 99% sRGB color fidelity, HDR10, and integrated stereo speakers.',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Screen Size': '27.0-inch ZeroFrame IPS Display',
      'Resolution': 'Full HD (1920 x 1080 Pixels)',
      'Refresh Rate': '180Hz Overclock / 165Hz Native',
      'Response Time': '0.5 ms VRB (Visual Response Boost)',
      'Color Gamut': '99% sRGB, 8-Bit, HDR10 Support',
      'Sync Technology': 'AMD FreeSync Premium (Tear-Free)',
      'Ports': '2x HDMI 2.0, 1x DisplayPort 1.2, Audio Out',
      'Built-in Audio': 'Integrated 2W x 2 Stereo Speakers'
    },
    pros: [
      'Ultra-smooth 180Hz refresh rate makes every window animation and game feel instant',
      'Fast IPS panel eliminates ghosting with 0.5ms response time',
      'Sub-₹12,000 price point for a 27-inch high refresh display',
      'ZeroFrame borderless design is great for dual-monitor setups'
    ],
    cons: [
      'Full HD resolution at 27-inch has standard pixel density (82 PPI)',
      'Basic tilt-only stand'
    ],
    inStock: true,
    shipping: 'Free Express Shipping',
    dealScore: 97,
    matchScore: 94,
    dealBadge: 'Best Budget 165Hz IPS',
    recommendationType: 'best-budget',
    recommendationReason: 'Incredible value for high-refresh gaming and everyday fluid multitasking at just ₹11,999.',
    priceHistory: [
      { date: '2026-06-01', price: 17999, priceINR: 17999 },
      { date: '2026-08-01', price: 11999, priceINR: 11999 }
    ],
    retailer: 'Acer Online / Flipkart',
    whoIsThisFor: 'Students and gamers wanting an ultra-smooth 165Hz+ IPS monitor on a tight budget under ₹12,000.',
    verdict: 'The king of budget high-refresh IPS gaming monitors.',
    sentimentSummary: {
      positivePercent: 94,
      keyHighlight: '180Hz refresh rate makes cursor movement and gaming feel buttery smooth.',
      frequentPraise: ['180Hz smooth motion', 'IPS viewing angles', 'Great price'],
      frequentComplaints: ['Stand has only tilt adjustment']
    }
  },

  // =============================================================
  // 7. KEYBOARDS & MICE (Mechanical, Wireless, Ergonomic)
  // =============================================================
  {
    id: 'prod-keychron-k2-v2',
    title: 'Keychron K2 V2 Wireless Mechanical Keyboard (Gateron G Pro Brown Switches, 75% Compact Layout, Bluetooth 5.1 + Wired, Mac & Windows, 4000mAh Battery)',
    brand: 'Keychron',
    price: 7499,
    priceINR: 7499,
    priceUSD: 90,
    originalPrice: 9999,
    originalPriceINR: 9999,
    originalPriceUSD: 120,
    rating: 4.8,
    reviewCount: 4250,
    category: 'Keyboards & Mice',
    description: 'The cult favorite compact 75% mechanical keyboard for programmers and writers. Connects with up to 3 devices via Bluetooth 5.1 or USB-C, includes dedicated Mac and Windows multimedia keycaps, and features a huge 4000mAh rechargeable battery.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Layout': '75% Compact (84 Keys with full Function row and arrow keys)',
      'Switches': 'Gateron G Pro Mechanical (Tactile Brown, Pre-lubed)',
      'Connectivity': 'Bluetooth 5.1 Wireless + USB-C Braided Wired Mode',
      'Multi-Device Pairing': 'Connects up to 3 devices with instant 1-key switching',
      'Battery': '4000 mAh (Up to 240 hours typing without backlight)',
      'Compatibility': 'macOS / iOS / Windows / Android (Physical toggle switch on side)',
      'Backlight': 'White LED with 18 flashing animation patterns',
      'Keycaps': 'Double-shot ABS with extra Mac & Windows specific modifier keys'
    },
    pros: [
      'Tactile Gateron Brown switches offer satisfying feedback without deafening clatter in quiet study spaces',
      'Giant 4000mAh battery lasts months on a single charge without backlighting',
      'Full dedicated arrow keys and F1-F12 function row in a compact footprint',
      'Seamless multi-device switching between MacBook, iPad, and Windows desktop'
    ],
    cons: [
      'Slightly tall typing height (some users may prefer a wrist rest)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 95,
    matchScore: 96,
    dealBadge: 'Best Coder Mechanical Keyboard',
    recommendationType: 'best-overall',
    recommendationReason: 'The gold standard mechanical keyboard for software engineers, offering tactile typing bliss and seamless Mac/Windows switching.',
    priceHistory: [
      { date: '2026-06-01', price: 9999, priceINR: 9999 },
      { date: '2026-08-01', price: 7499, priceINR: 7499 }
    ],
    retailer: 'Keychron India / Meckeys / Amazon',
    whoIsThisFor: 'Programmers, CS engineering students, writers, and typists who spend 8+ hours a day at the keyboard.',
    verdict: 'The absolute best wireless mechanical keyboard for coding productivity.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Typing on the tactile Brown switches makes writing thousands of lines of code an absolute joy.',
      frequentPraise: ['Tactile typing feel', 'Mac & Windows toggle switch', 'Huge 4000mAh battery'],
      frequentComplaints: ['Keyboard profile is slightly high']
    }
  },
  {
    id: 'prod-logitech-mx-master-3s',
    title: 'Logitech MX Master 3S Wireless Performance Mouse (8K DPI Any-Surface Tracking, MagSpeed Electromagnetic Scroll, Quiet Clicks, USB-C, Easy-Switch 3 Devices)',
    brand: 'Logitech',
    price: 8995,
    priceINR: 8995,
    priceUSD: 108,
    originalPrice: 10995,
    originalPriceINR: 10995,
    originalPriceUSD: 132,
    rating: 4.9,
    reviewCount: 15400,
    category: 'Keyboards & Mice',
    description: 'The master of productivity mice: MagSpeed electromagnetic scrolling capable of scrolling 1,000 lines per second, 8,000 DPI sensor that tracks on glass, 90% quieter clicks, thumb horizontal scroll wheel, and Logitech Flow cross-computer control.',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Sensor': 'Darkfield High Precision 8000 DPI (Tracks on glass min 4mm thickness)',
      'Scroll Wheel': 'MagSpeed Electromagnetic Wheel with Smartshift (1,000 lines/sec)',
      'Buttons': '7 Buttons (Left/Right, Back/Forward, App-Switch, Wheel Mode-shift, Middle click)',
      'Thumb Wheel': 'Horizontal Side Scroll Wheel for Excel sheets & timelines',
      'Clicks': 'Quiet Clicks Technology (90% noise reduction)',
      'Connectivity': 'Bluetooth Low Energy + Logi Bolt USB Receiver (3 Device Easy-Switch)',
      'Battery': '500 mAh (Up to 70 days, 1 min quick charge = 3 hours use via USB-C)',
      'Software': 'Logi Options+ with app-specific customization & Logitech Flow'
    },
    pros: [
      'MagSpeed scroll wheel lets you zip through 10,000-line codebases or spreadsheets in 2 seconds',
      'Ultra-ergonomic sculpted shape prevents wrist and forearm strain',
      'Quiet clicks prevent disturbing library or lecture hall neighbors',
      'Tracks flawlessly on any surface, including hotel glass desks'
    ],
    cons: [
      'Right-handed ergonomic design only',
      'Not geared toward fast flick-shot competitive eSports gaming'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 96,
    matchScore: 98,
    dealBadge: 'Ultimate Productivity Mouse',
    recommendationType: 'best-overall',
    recommendationReason: 'The undisputed supreme productivity mouse for programmers, engineers, and power users worldwide.',
    priceHistory: [
      { date: '2026-06-01', price: 10995, priceINR: 10995 },
      { date: '2026-08-01', price: 8995, priceINR: 8995 }
    ],
    retailer: 'Logitech Store / Amazon',
    whoIsThisFor: 'Engineers navigating vast circuit schematics, developers scrolling thousands of lines of code, and spreadsheet power users.',
    verdict: 'The greatest productivity mouse ever engineered.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'The electromagnetic MagSpeed scroll wheel and horizontal thumb scroll transform productivity permanently.',
      frequentPraise: ['MagSpeed 1000 lines/sec scroll', 'Sculpted wrist comfort', 'Works on clear glass'],
      frequentComplaints: ['Right-handed only']
    }
  },
  {
    id: 'prod-razer-deathadder-v3-pro',
    title: 'Razer DeathAdder V3 Pro Ultra-Lightweight Wireless Gaming Mouse (64g Ergonomic Design, Focus Pro 30K Optical Sensor, Gen-3 Optical Switches, 90hr Battery, USB-C)',
    brand: 'Razer',
    price: 11999,
    priceINR: 11999,
    priceUSD: 144,
    originalPrice: 14999,
    originalPriceINR: 14999,
    originalPriceUSD: 180,
    rating: 4.8,
    reviewCount: 6840,
    category: 'Keyboards & Mice',
    description: 'Iconic pro esports mouse refined to an astonishing 64-gram featherlight weight. Equipped with Razer Focus Pro 30K Optical Sensor, Gen-3 Optical Mouse Switches with zero double-click issues, and Razer HyperSpeed Wireless technology.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Weight': '64 grams (Ultra-lightweight without honeycomb cutouts)',
      'Sensor': 'Focus Pro 30K Optical Sensor (99.8% resolution accuracy)',
      'Max Sensitivity': '30,000 DPI (750 IPS, 70G acceleration)',
      'Switches': 'Razer Optical Mouse Switches Gen-3 (90-million click lifecycle, 0.2ms actuation)',
      'Connectivity': 'Razer HyperSpeed Wireless 2.4GHz + USB-C Speedflex Wired Mode',
      'Battery Life': 'Up to 90 continuous hours on wireless',
      'Ergonomics': 'Legendary refined right-handed palm & claw grip shape'
    },
    pros: [
      'Ultra-light 64g build delivers instantaneous flick-aiming without wrist fatigue',
      'Optical Gen-3 switches will never develop mechanical double-click defects',
      'Flawless tracking on mouse pads, wood desks, and cloth surfaces',
      '90 hours of uninterrupted wireless battery life'
    ],
    cons: [
      'No Bluetooth mode (uses 2.4GHz USB dongle or USB-C wire)',
      'Premium pricing'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 94,
    matchScore: 97,
    dealBadge: 'Best Esports Gaming Mouse',
    recommendationType: 'best-performance',
    recommendationReason: 'The #1 choice of professional esports players with ultra-low 64g weight and 30,000 DPI flawless tracking.',
    priceHistory: [
      { date: '2026-06-01', price: 14999, priceINR: 14999 },
      { date: '2026-08-01', price: 11999, priceINR: 11999 }
    ],
    retailer: 'Razer Official / Amazon',
    whoIsThisFor: 'Gamers, FPS esports competitors, and users wanting zero-latency precision pointing.',
    verdict: 'The pinnacle of lightweight wireless competitive gaming mice.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Featherlight 64g weight and shape feels like a natural extension of your hand.',
      frequentPraise: ['64g featherlight weight', 'Optical switches zero double click', 'Huge battery life'],
      frequentComplaints: ['No Bluetooth connectivity']
    }
  },
  {
    id: 'prod-apple-magic-mouse',
    title: 'Apple Magic Mouse (Wireless, Bluetooth Rechargeable, Multi-Touch Glass Surface with Gesture Scrolling & Swiping, USB-C Woven Cable)',
    brand: 'Apple',
    price: 7500,
    priceINR: 7500,
    priceUSD: 90,
    originalPrice: 8500,
    originalPriceINR: 8500,
    originalPriceUSD: 102,
    rating: 4.5,
    reviewCount: 11200,
    category: 'Keyboards & Mice',
    description: 'Sleek, minimalist wireless mouse engineered specifically for macOS. Features a Multi-Touch glass top shell that lets you perform simple gestures such as swiping between web pages and scrolling through documents with smooth momentum.',
    imageUrl: 'https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Top Surface': 'Continuous Multi-Touch Smooth Glass Top Shell',
      'Gestures Supported': '360° Omnidirectional Scrolling, 2-Finger Page Swipe, Mission Control Double Tap',
      'Connectivity': 'Bluetooth Wireless + Automatic Mac Instant Pairing',
      'Battery': 'Built-in Lithium-ion Rechargeable (Lasts ~1 month per charge)',
      'Charging Port': 'USB-C (Includes Braided USB-C to USB-C Cable)',
      'Dimensions': 'Ultra-slim low profile (0.85 in x 2.25 in x 4.47 in)',
      'Weight': '99 grams'
    },
    pros: [
      'Fluid macOS gestures: 360-degree momentum scrolling and full-screen workspace swiping',
      'Seamless zero-setup pairing with MacBook, iMac, and Mac mini',
      'Ultra-compact low profile slides into laptop sleeve pockets effortlessly',
      'Premium aluminum foot rails glide smoothly across wood and mats'
    ],
    cons: [
      'Low profile ergonomics not ideal for all-day palm grip users',
      'Charging port is located on the underside of the mouse'
    ],
    inStock: true,
    shipping: 'Free Apple Store Delivery',
    dealScore: 91,
    matchScore: 92,
    dealBadge: 'Best for Mac Gestures',
    recommendationType: 'runner-up',
    recommendationReason: 'The best gesture integration for macOS power users who want fluid trackpad-like scrolling in mouse form.',
    priceHistory: [
      { date: '2026-06-01', price: 8500, priceINR: 8500 },
      { date: '2026-08-01', price: 7500, priceINR: 7500 }
    ],
    retailer: 'Apple Store / Amazon',
    whoIsThisFor: 'MacBook and Mac users who love native macOS fluid gesture navigation and minimalist aesthetic setups.',
    verdict: 'The cleanest aesthetic companion for Apple ecosystem setups.',
    sentimentSummary: {
      positivePercent: 90,
      keyHighlight: 'Smooth glass surface makes horizontal timeline scrolling in video editors feel like magic.',
      frequentPraise: ['Multi-Touch gestures', 'Sleek Apple design', 'Fast Bluetooth pairing'],
      frequentComplaints: ['Underbody charge port placement']
    }
  },
  {
    id: 'prod-logitech-lift-vertical-mouse',
    title: 'Logitech Lift Vertical Ergonomic Mouse (57° Handshake Angle, Wireless Bluetooth + Logi Bolt, Whisper-Quiet Clicks, SmartWheel, 2-Year Battery, Great for Small/Medium Hands)',
    brand: 'Logitech',
    price: 5495,
    priceINR: 5495,
    priceUSD: 66,
    originalPrice: 6995,
    originalPriceINR: 6995,
    originalPriceUSD: 84,
    rating: 4.8,
    reviewCount: 5200,
    category: 'Keyboards & Mice',
    description: 'Designed by ergonomics experts to eliminate wrist discomfort. The optimal 57-degree upright posture places your hand in a natural handshake position, taking pressure off your wrist and promoting healthy forearm posture.',
    imageUrl: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Ergonomic Angle': '57° Vertical Natural Handshake Posture',
      'Hand Size Recommendation': 'Small to Medium Hands (Left-handed & Right-handed variants)',
      'Sensor': '400 to 4000 DPI Adjustable Optical Tracking',
      'Scroll Wheel': 'SmartWheel (Switches from precision line-by-line to fast spin)',
      'Clicks': 'Whisper-Quiet Click Dampening (Silent)',
      'Connectivity': 'Bluetooth Low Energy + Logi Bolt USB Receiver (Connects 3 Devices)',
      'Battery': '1x AA Battery (Up to 24 Months / 2 Years of daily use)'
    },
    pros: [
      'Scientifically proven 57° angle eliminates carpal tunnel tension and forearm strain',
      'Soft textured rubber grip with cozy thumb rest',
      'Silent clicks make it ideal for shared study desks and libraries',
      'SmartWheel switches automatically between high-precision and speed scrolling'
    ],
    cons: [
      'Not designed for large hands (larger hand users should choose MX Master)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 95,
    matchScore: 96,
    dealBadge: 'Best Ergonomic Mouse',
    recommendationType: 'best-value',
    recommendationReason: 'Eliminates wrist pain and tendon strain during 8+ hour study and coding sessions at an accessible price point.',
    priceHistory: [
      { date: '2026-06-01', price: 6995, priceINR: 6995 },
      { date: '2026-08-01', price: 5495, priceINR: 5495 }
    ],
    retailer: 'Logitech Store / Amazon',
    whoIsThisFor: 'Students and remote professionals experiencing wrist fatigue, aching tendons, or carpal tunnel discomfort.',
    verdict: 'The most comfortable everyday ergonomic mouse for small and medium hands.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'Completely cured my wrist aching within 3 days of long hours at my college study desk.',
      frequentPraise: ['Instant wrist pain relief', 'Silent clicks', '2-year battery life'],
      frequentComplaints: ['Slight learning curve for first 24 hours']
    }
  },
  {
    id: 'prod-logitech-pebble-2-mouse',
    title: 'Logitech Pebble Mouse 2 M350s Slim Portable Wireless Bluetooth Mouse (Silent Touch, 3-Device Easy-Switch, 24-Month Battery, Eco-Friendly Recycled Plastic)',
    brand: 'Logitech',
    price: 1495,
    priceINR: 1495,
    priceUSD: 18,
    originalPrice: 2295,
    originalPriceINR: 2295,
    originalPriceUSD: 28,
    rating: 4.7,
    reviewCount: 9840,
    category: 'Keyboards & Mice',
    description: 'Ultra-slim, minimalist wireless mouse designed to go wherever life takes you. SilentTouch technology removes 90% of click noise so you can click away in coffee shops, libraries, or lecture halls without bothering anyone.',
    imageUrl: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Profile': 'Ultra-slim portable pebble shape with rounded contours',
      'Clicks': 'SilentTouch Technology (90% quieter click sound)',
      'Multi-Device Pairing': 'Easy-Switch button connects up to 3 devices via Bluetooth',
      'Sensor': 'High-precision optical tracking (400-4000 DPI)',
      'Battery': '1x AA Battery included (Up to 24 months / 2 years battery life)',
      'Weight': '76 grams with battery'
    },
    pros: [
      'Inexpensive and ultra-compact, slips flat into any laptop bag or pocket',
      'Whisper-silent clicks for quiet libraries and lecture rooms',
      'Instantly switches between laptop, tablet, and phone with 1 bottom button',
      '2 full years on a single standard AA battery'
    ],
    cons: [
      'Basic 3-button layout without extra thumb back/forward buttons'
    ],
    inStock: true,
    shipping: 'Free Prime Shipping',
    dealScore: 97,
    matchScore: 95,
    dealBadge: 'Best Budget Portable Mouse',
    recommendationType: 'best-budget',
    recommendationReason: 'Unbeatable value under ₹1,500 with whisper-quiet clicks, 3-device Bluetooth switching, and 2-year battery life.',
    priceHistory: [
      { date: '2026-06-01', price: 2295, priceINR: 2295 },
      { date: '2026-08-01', price: 1495, priceINR: 1495 }
    ],
    retailer: 'Logitech Store / Amazon',
    whoIsThisFor: 'Students on a budget who want a slim, silent, dependable mouse for lectures, library study, and travel.',
    verdict: 'The ultimate budget-friendly travel and college mouse.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'Clicks are genuinely whisper-silent; perfect for late night study sessions in the hostel.',
      frequentPraise: ['Ultra-silent clicks', 'Pocketable thin size', 'Connects to iPad and laptop'],
      frequentComplaints: ['No side buttons']
    }
  },

  // =============================================================
  // 8. STATIONERY & PENCILS (Pencils, Digital Stylus, Sketching, Pens, Notebooks)
  // =============================================================
  {
    id: 'prod-apple-pencil-pro',
    title: 'Apple Pencil Pro (Pixel-Perfect Precision, Tilt & Pressure Sensitivity, Squeeze Gesture, Barrel Roll Haptic Feedback, Wireless Magnetic Charging & Pairing)',
    brand: 'Apple',
    price: 11900,
    priceINR: 11900,
    priceUSD: 142,
    originalPrice: 12900,
    originalPriceINR: 12900,
    originalPriceUSD: 155,
    rating: 4.9,
    reviewCount: 3820,
    category: 'Stationery & Pencils',
    description: 'The most advanced digital pencil ever made. Features an innovative sensor in the barrel to sense your Squeeze gesture, a custom haptic engine for tactile feedback, a gyroscope for Barrel Roll brush orientation, and Apple Pencil hover.',
    imageUrl: 'https://images.unsplash.com/photo-1585336261026-7f466c0e8a7c?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Precision': 'Pixel-perfect accuracy with imperceptible sub-9ms latency',
      'Sensors': 'Squeeze sensor, Gyroscope for Barrel Roll, Pressure & Tilt sensors',
      'Haptics': 'Custom Haptic Engine delivers gentle pulses when squeezing or double-tapping',
      'Find My Support': 'Built-in Apple Find My integration to locate lost pencils easily',
      'Charging & Pairing': 'Snaps magnetically to side of iPad to pair and charge wirelessly',
      'Compatibility': 'iPad Pro (M4), iPad Air (M2) and newer'
    },
    pros: [
      'Squeeze gesture opens tool palette instantly without breaking your drawing or note-taking flow',
      'Barrel Roll lets you rotate shaped pen and brush tools just like real calligraphy and drafting pencils',
      'Find My integration prevents losing your high-end pencil on campus',
      'Subtle haptic pulses make digital writing feel tactile and physical'
    ],
    cons: [
      'Compatible only with newest generation iPad Pro M4 and iPad Air M2 models'
    ],
    inStock: true,
    shipping: 'Free Next-Day Apple Delivery',
    dealScore: 95,
    matchScore: 99,
    dealBadge: 'Ultimate Digital Pencil',
    recommendationType: 'best-performance',
    recommendationReason: 'The absolute pinnacle of digital pencils with squeeze shortcuts, barrel roll rotation, and haptic feedback.',
    priceHistory: [
      { date: '2026-06-01', price: 12900, priceINR: 12900 },
      { date: '2026-08-01', price: 11900, priceINR: 11900 }
    ],
    retailer: 'Apple Store / Amazon',
    whoIsThisFor: 'Designers, digital artists, engineering students drawing schematics, and iPad power note-takers.',
    verdict: 'The greatest digital drawing and note-taking pencil on the planet.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'The haptic feedback and squeeze gesture make switching pens in GoodNotes and Procreate effortless.',
      frequentPraise: ['Squeeze shortcut', 'Barrel roll brush rotation', 'Find My tracking'],
      frequentComplaints: ['Exclusive to newest iPad models']
    }
  },
  {
    id: 'prod-apple-pencil-usb-c',
    title: 'Apple Pencil (USB-C) for iPad (Pixel-Perfect Accuracy, Low Latency, Tilt Sensitivity, Magnetic Snap, Matte Finish)',
    brand: 'Apple',
    price: 6900,
    priceINR: 6900,
    priceUSD: 82,
    originalPrice: 7900,
    originalPriceINR: 7900,
    originalPriceUSD: 95,
    rating: 4.7,
    reviewCount: 6140,
    category: 'Stationery & Pencils',
    description: 'Affordable, precise digital pencil perfect for taking notes, sketching, marking up documents, and journaling. Features pixel-perfect precision, low latency, tilt sensitivity, and pairs/charges via a sliding USB-C port.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Precision': 'Pixel-perfect accuracy and low latency',
      'Sensors': 'Tilt sensitivity for shading',
      'Charging': 'Sliding cap reveals USB-C charging port',
      'Magnetic Storage': 'Attaches magnetically to the side of your iPad for easy storage',
      'Finish': 'Comfortable matte white finish with flat edge',
      'Compatibility': 'iPad (10th Gen), iPad Air, iPad Pro, iPad mini with USB-C'
    },
    pros: [
      'Accessible price under ₹7,000 for verified Apple Pencil precision',
      'Universal USB-C charging works with your standard phone/laptop cable',
      'Magnetic attachment to iPad edge keeps it secure in your backpack',
      'Exceptional for annotating lecture slides, PDFs, and daily math/engineering calculations'
    ],
    cons: [
      'Lacks pressure sensitivity (relies on tilt sensitivity for shading)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 94,
    matchScore: 95,
    dealBadge: 'Best Value Apple Pencil',
    recommendationType: 'best-value',
    recommendationReason: 'The smart budget choice for college students wanting authentic Apple handwriting precision for lecture notes.',
    priceHistory: [
      { date: '2026-06-01', price: 7900, priceINR: 7900 },
      { date: '2026-08-01', price: 6900, priceINR: 6900 }
    ],
    retailer: 'Apple Store / Flipkart',
    whoIsThisFor: 'Students taking handwriting notes in lectures, marking up textbooks, and writing equations.',
    verdict: 'The best value digital pencil for everyday student note-taking.',
    sentimentSummary: {
      positivePercent: 95,
      keyHighlight: 'Perfect for taking daily college notes in Notability and GoodNotes without paying ₹12,000.',
      frequentPraise: ['Affordable Apple Pencil', 'USB-C charging', 'Magnetic snap to iPad'],
      frequentComplaints: ['No pressure sensitivity']
    }
  },
  {
    id: 'prod-faber-castell-tk-fine-set',
    title: 'Faber-Castell TK-Fine 9715 0.5mm Mechanical Drafting Pencil Set (Includes 2x Super-Polymer 2B Lead Tubes & Dual Erasers, Rigid Lead Guidance Tube for Engineering & Drafting)',
    brand: 'Faber-Castell',
    price: 849,
    priceINR: 849,
    priceUSD: 10,
    originalPrice: 1199,
    originalPriceINR: 1199,
    originalPriceUSD: 14,
    rating: 4.9,
    reviewCount: 8430,
    category: 'Stationery & Pencils',
    description: 'Professional-grade engineering and architectural mechanical drafting pencil. Equipped with a rigid 4mm cylindrical lead guidance tube that provides an unobstructed view of lines when using rulers, set squares, and drafting stencils.',
    imageUrl: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Lead Diameter': '0.5mm Fine Line Width',
      'Lead Guidance': 'Rigid 4mm Fixed Steel Sleeve (Ruler and stencil drafting compatible)',
      'Lead Type Included': '2x Tubes of Faber-Castell Super-Polymer 2B Break-Resistant Dark Leads (24 leads)',
      'Eraser': 'Extra-long twist-out PVC-free eraser under the chrome push button',
      'Body': 'Ergonomic ribbed grip zone with green barrel and chrome clip',
      'Lead Hardness Indicator': 'Adjustable hardness grade indicator window (HB, B, 2B, H, 2H)'
    },
    pros: [
      'Rigid 4mm steel sleeve prevents lead breakage and allows precise drafting against rulers',
      'Super-Polymer 2B leads glide like butter on engineering grid paper with pitch-black contrast',
      'Adjustable hardness grade indicator for quick identification in pencil cases',
      'Complete starter kit with 24 extra break-resistant leads and erasers'
    ],
    cons: [
      'Fixed metal sleeve requires care when tossing into soft bags to avoid bending tip'
    ],
    inStock: true,
    shipping: 'Free Next-Day Prime Delivery',
    dealScore: 98,
    matchScore: 99,
    dealBadge: 'Best Mechanical Drafting Pencil',
    recommendationType: 'best-overall',
    recommendationReason: 'The gold standard mechanical pencil for engineering drawing, CAD schematics, and clean mathematical derivation.',
    priceHistory: [
      { date: '2026-06-01', price: 1199, priceINR: 1199 },
      { date: '2026-08-01', price: 849, priceINR: 849 }
    ],
    retailer: 'Faber-Castell Official / Amazon',
    whoIsThisFor: 'Engineering students, architecture majors, mathematics students, and pencil precision enthusiasts.',
    verdict: 'The undisputed champion of mechanical drafting pencils.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'Super-Polymer leads provide pitch dark, crisp lines without ever snapping mid-calculation.',
      frequentPraise: ['Zero lead breakage', 'Crisp 0.5mm line', 'Smooth metal sleeve for ruler work'],
      frequentComplaints: ['None']
    }
  },
  {
    id: 'prod-staedtler-mars-lumograph-12',
    title: 'Staedtler Mars Lumograph Premium Graphite Drawing & Sketching Pencils (Set of 12 Artist Grades 6B to 4H, Break-Resistant Super-Bonded Lead, Classic Blue Metal Tin)',
    brand: 'Staedtler',
    price: 1299,
    priceINR: 1299,
    priceUSD: 16,
    originalPrice: 1750,
    originalPriceINR: 1750,
    originalPriceUSD: 21,
    rating: 4.9,
    reviewCount: 14200,
    category: 'Stationery & Pencils',
    description: 'World-renowned professional German graphite art pencils in a durable protective embossed metal tin. Crafted from sustainably managed cedar wood with specially formulated super-bonded leads that resist snapping during sharpening.',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Grades Included': '12 Full Degrees: 6B, 5B, 4B, 3B, 2B, B, HB, F, H, 2H, 3H, 4H',
      'Lead Formulation': 'High proportion of graphite and carbon for uniform matte dark shades',
      'Bonding': 'SV Super-Bonded lead throughout barrel prevents internal fracture',
      'Wood': 'Certified PEFC sustainable Californian Cedar Wood (easy sharpening)',
      'Packaging': 'Collector classic blue embossed metal tin box',
      'Country of Origin': 'Made in Nuremberg, Germany'
    },
    pros: [
      'Comprehensive spectrum from ultra-soft dark shading (6B) to hard precise technical lines (4H)',
      'Super-bonded lead sharpens to needle-point without crumbling or splintering',
      'Non-reflective deep velvety matte blacks ideal for scanning and photocopying',
      'Embossed steel tin keeps pencils organized and protected in art bags'
    ],
    cons: [
      'Requires standard pencil sharpener (wooden pencils)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 96,
    matchScore: 98,
    dealBadge: 'Best Artist Graphite Pencil Set',
    recommendationType: 'best-performance',
    recommendationReason: 'The world standard for artistic sketching, portrait drawing, and engineering shading.',
    priceHistory: [
      { date: '2026-06-01', price: 1750, priceINR: 1750 },
      { date: '2026-08-01', price: 1299, priceINR: 1299 }
    ],
    retailer: 'Staedtler Germany / Amazon',
    whoIsThisFor: 'Fine arts students, concept sketchers, industrial designers, and sketching hobbyists.',
    verdict: 'The highest quality traditional graphite drawing pencils manufactured today.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'The smooth graphite glide and rich dark tones make pencil portraits look breathtaking.',
      frequentPraise: ['Zero lead breakage while sharpening', 'Vast 6B to 4H range', 'Protective metal tin'],
      frequentComplaints: ['None']
    }
  },
  {
    id: 'prod-rotring-600-black',
    title: 'rOtring 600 Full-Metal Mechanical Drafting Pencil 0.5mm (Matte Black, Hexagonal Brass Barrel, Knurled Grip, Fixed Lead Sleeve, Lifetime Build)',
    brand: 'rOtring',
    price: 2699,
    priceINR: 2699,
    priceUSD: 32,
    originalPrice: 3499,
    originalPriceINR: 3499,
    originalPriceUSD: 42,
    rating: 4.9,
    reviewCount: 16800,
    category: 'Stationery & Pencils',
    description: 'An iconic design masterpiece engineered in Germany: Full-metal hexagonal brass body that never rolls off slanted drafting tables, non-slip diamond-knurled metal grip, and precision lead advance mechanism.',
    imageUrl: 'https://images.unsplash.com/photo-1585336261026-7f466c0e8a7c?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Body Construction': 'Solid Full-Brass Hexagonal Barrel with Matte Black Powder Coating',
      'Grip': 'Precision Diamond-Knurled Metallic Grip Zone',
      'Lead Size': '0.5mm (Fixed 4mm Steel Guidance Tube)',
      'Balance': 'Low-center-of-gravity weight distribution (22 grams)',
      'Lead Indicator': 'Adjustable Lead Hardness Indicator dial (4H to 2B)'
    },
    pros: [
      'Substantial brass weight and perfect low-center-of-gravity balance reduces hand fatigue',
      'Hexagonal design prevents pencil from rolling off angled desks',
      'Diamond knurling provides zero-slip control even with sweaty palms during exams',
      'Built like a tank — designed to last decades of daily use'
    ],
    cons: [
      'Delicate 4mm fixed tip requires protective cap when traveling'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 94,
    matchScore: 97,
    dealBadge: 'Iconic Metal Drafting Pencil',
    recommendationType: 'best-overall',
    recommendationReason: 'The world’s most famous drafting pencil with full brass hexagonal build and knurled grip.',
    priceHistory: [
      { date: '2026-06-01', price: 3499, priceINR: 3499 },
      { date: '2026-08-01', price: 2699, priceINR: 2699 }
    ],
    retailer: 'rOtring / Amazon',
    whoIsThisFor: 'Architects, engineering students, drafting professionals, and luxury stationery collectors.',
    verdict: 'The holy grail of mechanical pencils.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'The brass weight in your hand makes writing feel commanding and effortless.',
      frequentPraise: ['Heavy brass build', 'Diamond knurled grip', 'Zero tip wobble'],
      frequentComplaints: ['Keep tip safe from drops']
    }
  },
  {
    id: 'prod-wacom-pro-pen-2',
    title: 'Wacom Pro Pen 2 Digital Graphics Stylus (8192 Levels of Pressure, ±60° Tilt Recognition, Battery-Free EMR, Protective Travel Case & Replacement Nibs)',
    brand: 'Wacom',
    price: 6499,
    priceINR: 6499,
    priceUSD: 78,
    originalPrice: 7999,
    originalPriceINR: 7999,
    originalPriceUSD: 96,
    rating: 4.8,
    reviewCount: 4120,
    category: 'Stationery & Pencils',
    description: 'Industry-standard graphics digital pen used in Hollywood animation studios and design firms. Features 8,192 levels of pressure sensitivity, natural tilt tracking, zero lag, and requires no batteries or charging cords ever.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Pressure Sensitivity': '8,192 Levels (Tip and Eraser)',
      'Technology': 'Patented Electro-Magnetic Resonance (EMR — Never needs battery or charging)',
      'Tilt Range': '±60 degrees with zero parallax error',
      'Switches': '2 Customizable Side Switches for Right-Click / Eyedropper / Undo',
      'Included Accessories': 'Protective travel case, 4 standard nibs, 2 felt nibs, nib removal tool'
    },
    pros: [
      'Battery-free EMR technology: Never runs out of battery, never needs to plug in',
      '8,192 levels of pressure captures the faintest pencil whisper to bold ink strokes',
      'Includes both smooth and textured felt nibs for a pencil-on-paper sensation',
      'Dual programmable shortcut switches speed up Adobe Photoshop and Blender workflows'
    ],
    cons: [
      'Requires Wacom Intuos Pro or Cintiq drawing tablet to operate'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 93,
    matchScore: 95,
    dealBadge: 'Pro Studio Graphics Stylus',
    recommendationType: 'best-performance',
    recommendationReason: 'The animation and digital art industry benchmark stylus with battery-free EMR technology.',
    priceHistory: [
      { date: '2026-06-01', price: 7999, priceINR: 7999 },
      { date: '2026-08-01', price: 6499, priceINR: 6499 }
    ],
    retailer: 'Wacom Store / Amazon',
    whoIsThisFor: 'Digital painters, 3D sculptors, concept artists, and visual effects students.',
    verdict: 'The gold standard digital pen for creative pros.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Felt nibs on the Intuos Pro create a realistic tactile drag that feels exactly like drawing with a 2B pencil on textured paper.',
      frequentPraise: ['No battery needed ever', '8192 pressure levels', 'Customizable side buttons'],
      frequentComplaints: ['Tablet required']
    }
  },

  // =============================================================
  // 9. FASHION, DRESSES & APPAREL (Dresses, Denim Jackets, Shirts, Hoodies, Shoes)
  // =============================================================
  {
    id: 'prod-floral-wrap-midi-dress',
    title: 'Grace & Flora Floral Print Wrap A-Line Summer Midi Dress (V-Neck, Breathable Lightweight Chiffon with Soft Lining, Flutter Sleeves, Adjustable Waist Tie, Pastel Blossom)',
    brand: 'Grace & Flora',
    price: 2299,
    priceINR: 2299,
    priceUSD: 28,
    originalPrice: 3999,
    originalPriceINR: 3999,
    originalPriceUSD: 48,
    rating: 4.8,
    reviewCount: 7650,
    category: 'Fashion & Dresses',
    description: 'Charming, effortlessly elegant floral wrap midi dress tailored in airy, breathable chiffon. Features a flattering V-neckline, cascading flutter sleeves, an adjustable self-tie wrap waist that fits all body types, and a graceful ruffled hemline.',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Style': 'Wrap A-Line Midi Dress with High-Low Ruffled Flounce Hem',
      'Fabric': '100% Breathable Georgette Chiffon with 100% Cotton Inner Lining (Opaque)',
      'Neckline': 'Surplice V-Neck with discreet safety snap button',
      'Sleeve Length': 'Short Flutter Bell Sleeves',
      'Closure': 'Adjustable Side Waist Sash Tie (Customizable fit)',
      'Length': 'Midi Length (Below Knee / Mid-Calf)',
      'Care': 'Machine Wash Cold on Gentle Cycle / Line Dry',
      'Available Sizes': 'XS, S, M, L, XL, XXL'
    },
    pros: [
      'Breathable lightweight chiffon keeps you cool in warm summer and sunny outdoor events',
      'Self-tie wrap waist creates a customizable, slimming silhouette for every figure',
      'Includes full opaque cotton inner lining — completely non-see-through',
      'Versatile: Dresses up with heels for parties or down with white sneakers for campus'
    ],
    cons: [
      'Chiffon fabric requires gentle wash or laundry bag'
    ],
    inStock: true,
    shipping: 'Free Express Shipping + Easy 30-Day Returns',
    dealScore: 97,
    matchScore: 98,
    dealBadge: 'Bestseller Summer Dress',
    recommendationType: 'best-overall',
    recommendationReason: 'The #1 bestselling wrap dress combining breathable comfort, versatile styling, and high ratings under ₹2,500.',
    priceHistory: [
      { date: '2026-06-01', price: 3999, priceINR: 3999 },
      { date: '2026-08-01', price: 2299, priceINR: 2299 }
    ],
    retailer: 'Myntra / Amazon Fashion',
    whoIsThisFor: 'Women looking for a flattering, breathable dress for college events, casual outings, brunches, and festive celebrations.',
    verdict: 'The ultimate versatile, flattering summer floral midi dress.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'The adjustable wrap waist fits like a dream and the soft cotton lining ensures complete comfort all day.',
      frequentPraise: ['Flattering silhouette', 'Opaque soft lining', 'Vibrant floral print'],
      frequentComplaints: ['Runs true to size, check bust chart']
    }
  },
  {
    id: 'prod-velvet-evening-maxi-dress',
    title: 'Noir Elegance Velvet Evening Maxi Gown Party Dress (Side Thigh Split, Sweetheart Neckline, Luxe Stretch Velvet, Elegant Drape, Midnight Emerald Green)',
    brand: 'Noir Elegance',
    price: 3499,
    priceINR: 3499,
    priceUSD: 42,
    originalPrice: 5999,
    originalPriceINR: 5999,
    originalPriceUSD: 72,
    rating: 4.9,
    reviewCount: 3420,
    category: 'Fashion & Dresses',
    description: 'Turn heads at formal college formals, galas, and dinner banquets. Crafted in opulent high-stretch micro-velvet that catches the light with subtle shimmer, featuring a supportive sweetheart neckline, structured corset boning, and a dramatic thigh split.',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Style': 'Floor-Length Formal Evening Maxi Gown with Side Leg Slit',
      'Fabric': '95% Premium Micro-Velvet, 5% Elastane (Luxe 4-Way Stretch)',
      'Neckline': 'Off-Shoulder Sweetheart Neckline with Non-Slip Silicone Grip',
      'Bodice': 'Flexible Internal Boning for gentle posture support',
      'Closure': 'Hidden Back Invisible Zipper with Hook-and-Eye',
      'Occasion': 'College farewells, formal banquets, cocktail parties, evening weddings',
      'Color Options': 'Midnight Emerald, Burgundy Wine, Classic Noir Black'
    },
    pros: [
      'Sumptuous high-density velvet fabric with 4-way stretch hugs contours comfortably',
      'Interior silicone non-slip lining keeps off-shoulder neckline securely in place',
      'Built-in light boning provides elegant posture support without stiffness',
      'Dramatic floor-length drape creates a statuesque, photogenic appearance'
    ],
    cons: [
      'Dry clean recommended to preserve velvet pile sheen'
    ],
    inStock: true,
    shipping: 'Free Express Delivery with Garment Bag',
    dealScore: 96,
    matchScore: 97,
    dealBadge: 'Best Formal Evening Dress',
    recommendationType: 'best-performance',
    recommendationReason: 'Luxurious 4-way stretch velvet gown with corset boning and dramatic leg slit for unforgettable formal evenings.',
    priceHistory: [
      { date: '2026-06-01', price: 5999, priceINR: 5999 },
      { date: '2026-08-01', price: 3499, priceINR: 3499 }
    ],
    retailer: 'Ajio Luxe / Amazon Fashion',
    whoIsThisFor: 'Students attending graduation formals, college farewells, award ceremonies, and evening cocktail parties.',
    verdict: 'A showstopping evening gown that looks five times its price tag.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'Received countless compliments at our college graduation dinner; the velvet looks and feels like pure luxury.',
      frequentPraise: ['Rich velvet texture', 'Stays up with silicone grip', 'Photographs gorgeously'],
      frequentComplaints: ['Floor-length — best paired with 2-3 inch heels']
    }
  },
  {
    id: 'prod-linen-casual-shirt-dress',
    title: 'Pure Linen Casual Summer Button-Down Shirt Dress (Roll-Up Cuffed Sleeves, Removable Fabric Sash Belt, Dual Deep Side Pockets, Sage Green)',
    brand: 'Loom & Thread',
    price: 1899,
    priceINR: 1899,
    priceUSD: 23,
    originalPrice: 2999,
    originalPriceINR: 2999,
    originalPriceUSD: 36,
    rating: 4.7,
    reviewCount: 4890,
    category: 'Fashion & Dresses',
    description: 'The effortless everyday classic: Pure natural linen-cotton blend shirt dress featuring a tailored point collar, mother-of-pearl buttons, roll-tab sleeves, deep functional side pockets, and a removable waist tie belt.',
    imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Fabric': '55% Organic French Linen, 45% Long-Staple Cotton (Pre-washed soft finish)',
      'Style': 'Button-Front Classic Shirt Dress with Curved Shirttail Hem',
      'Pockets': '2 Deep Inseam Side Pockets (Easily fits 6.7" smartphone)',
      'Sleeves': 'Convertible Long-Sleeve with Button-Tab Roll-Up Cuff',
      'Fit': 'Relaxed Fit with optional Waist Sash Cincher',
      'Collar': 'Structured Pointed Shirt Collar'
    },
    pros: [
      'Natural linen keeps you breezy and sweat-free even in humid summer weather',
      'Features 2 real, deep pockets that comfortably fit large smartphones and keys',
      'Wear cinched with the sash belt as a tailored dress or unbuttoned as a light summer duster',
      'Pre-washed fabric avoids shrinkage and becomes softer with every wash'
    ],
    cons: [
      'Natural linen develops gentle organic creases when sitting (signature linen texture)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 95,
    matchScore: 96,
    dealBadge: 'Best Casual Everyday Dress',
    recommendationType: 'best-value',
    recommendationReason: 'Ultra-breathable organic linen-cotton with deep phone pockets and dual styling options under ₹1,900.',
    priceHistory: [
      { date: '2026-06-01', price: 2999, priceINR: 2999 },
      { date: '2026-08-01', price: 1899, priceINR: 1899 }
    ],
    retailer: 'FabIndia / Myntra',
    whoIsThisFor: 'Everyday campus wear, casual lectures, internship work, weekend library study, and warm weather travel.',
    verdict: 'The most comfortable, functional pocketed shirt dress you will own.',
    sentimentSummary: {
      positivePercent: 96,
      keyHighlight: 'Deep pockets that actually fit my iPhone Pro Max, plus the linen fabric is pure comfort in hot classrooms.',
      frequentPraise: ['Real deep phone pockets', 'Breathable organic linen', 'Versatile styling'],
      frequentComplaints: ['Linen wrinkles naturally']
    }
  },
  {
    id: 'prod-anarkali-kurti-dress',
    title: 'Rangriti Handcrafted Flared Anarkali Cotton Kurti Dress (Intricate Gotta Patti Floral Embroidery, Pure Mulmul Cotton, Flared Kalis, Royal Indigo Blue)',
    brand: 'Rangriti',
    price: 1699,
    priceINR: 1699,
    priceUSD: 20,
    originalPrice: 3299,
    originalPriceINR: 3299,
    originalPriceUSD: 40,
    rating: 4.8,
    reviewCount: 6200,
    category: 'Fashion & Dresses',
    description: 'Exquisite flared Anarkali ethnic kurti dress crafted from ultra-soft 100% mulmul cotton with handcrafted gotta patti work along the yoke and sleeve cuffs. Designed with 24 sweeping kalis for a regal flared silhouette.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Style': 'Flared 24-Kali Floor/Ankle Length Ethnic Anarkali Kurti Dress',
      'Fabric': '100% Pure Lightweight Breathable Mulmul Cotton',
      'Work': 'Handcrafted Gotta Patti & Mirror-Style Yoke Embellishment',
      'Flair': '3.5 Meter Dramatic Sweeping Ghera',
      'Neckline': 'Round Neck with Keyhole Button Detail',
      'Sleeve Length': '3/4th Sleeves with Embroidered Cuffs'
    },
    pros: [
      'Breathable 100% mulmul cotton provides all-day comfort during long festival days and college events',
      'Generous 3.5-meter flared ghera creates graceful movement and spins',
      'Elegant gotta patti embellishment looks rich without feeling heavy or scratchy',
      'Can be worn as a standalone maxi dress or paired with palazzos and dupattas'
    ],
    cons: [
      'Gentle hand wash recommended for initial wash'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 97,
    matchScore: 97,
    dealBadge: 'Best Ethnic Kurti Dress',
    recommendationType: 'best-budget',
    recommendationReason: 'Pure mulmul cotton with 3.5-meter flared ghera and handcrafted gotta patti embroidery at just ₹1,699.',
    priceHistory: [
      { date: '2026-06-01', price: 3299, priceINR: 3299 },
      { date: '2026-08-01', price: 1699, priceINR: 1699 }
    ],
    retailer: 'Rangriti / Myntra / Amazon',
    whoIsThisFor: 'College cultural fests, ethnic day celebrations, Diwali, Eid, family get-togethers, and festive occasions.',
    verdict: 'The prettiest ethnic flared dress for college fests and festivals.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'The 3.5m flare spins so beautifully in photos and the pure cotton keeps you cool even in crowded college auditoriums.',
      frequentPraise: ['3.5m wide flare', 'Pure soft mulmul cotton', 'Rich festive look'],
      frequentComplaints: ['None']
    }
  },
  {
    id: 'prod-levis-trucker-denim-jacket',
    title: 'Levi\'s Original Trucker Denim Jacket (100% Non-Stretch Heavyweight Cotton Denim, Point Collar, Button-Flap Chest Pockets, Adjustable Waist Tabs, Timeless Indigo Wash)',
    brand: 'Levi\'s',
    price: 3799,
    priceINR: 3799,
    priceUSD: 46,
    originalPrice: 5999,
    originalPriceINR: 5999,
    originalPriceUSD: 72,
    rating: 4.9,
    reviewCount: 18900,
    category: 'Fashion & Dresses',
    description: 'The archetype of all denim jackets since 1967. Cut from authentic 14.25 oz heavyweight 100% cotton denim that molds to your body over time, featuring branded metal shank buttons, signature V-stitching, and dual interior drop pockets.',
    imageUrl: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Fabric Weight': '14.25 oz Heavyweight 100% Premium Cotton Denim',
      'Hardware': 'Branded Copper-Toned Metal Shank Buttons',
      'Pockets': '2 Button-Flap Chest Pockets + 2 Side Welt Pockets + 2 Deep Interior Drop Pockets',
      'Adjustability': 'Dual Side Waistband Button Tabs',
      'Fit': 'Regular Fit (Hits at the hip)'
    },
    pros: [
      'Indestructible 14.25 oz cotton denim that looks better the more you wear and break it in',
      'Pairs with everything: throw it over a dress, hoodie, or casual t-shirt for instant style',
      'Interior drop pockets securely hold a Kindle, phone, or passport',
      'A true timeless wardrobe staple that lasts 10+ years'
    ],
    cons: [
      'Heavyweight denim takes a few weeks to fully break in to your body'
    ],
    inStock: true,
    shipping: 'Free Express Shipping',
    dealScore: 95,
    matchScore: 96,
    dealBadge: 'Timeless Wardrobe Icon',
    recommendationType: 'best-overall',
    recommendationReason: 'The original denim jacket since 1967 with 10+ year lifespan, 6 pockets, and iconic style.',
    priceHistory: [
      { date: '2026-06-01', price: 5999, priceINR: 5999 },
      { date: '2026-08-01', price: 3799, priceINR: 3799 }
    ],
    retailer: 'Levi\'s Store / Amazon',
    whoIsThisFor: 'Anyone wanting a timeless, rugged outer layer that elevates any dress, hoodie, or outfit.',
    verdict: 'The single most iconic jacket in modern fashion.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'Built like armor; 3 years of college wear and it only looks better and more character-rich with age.',
      frequentPraise: ['Indestructible denim', 'Huge interior pockets', 'Goes with all outfits'],
      frequentComplaints: ['Non-stretch denim is stiff on day 1']
    }
  },
  {
    id: 'prod-nike-air-zoom-pegasus-40',
    title: 'Nike Air Zoom Pegasus 40 Breathable Road Running & Walking Shoes (Dual Zoom Air Units, React Foam Midsole, Engineered Single-Layer Mesh Upper, High-Abrasion Rubber Waffle Outsole)',
    brand: 'Nike',
    price: 7495,
    priceINR: 7495,
    priceUSD: 90,
    originalPrice: 10495,
    originalPriceINR: 10495,
    originalPriceUSD: 126,
    rating: 4.8,
    reviewCount: 22100,
    category: 'Fashion & Dresses',
    description: 'The workhorse with wings. Featuring dual Zoom Air units at the forefoot and heel embedded in lightweight Nike React foam, delivering energizing bounce for 10,000 daily campus steps, morning workouts, and all-day walking comfort.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Cushioning': 'Dual Zoom Air Units (Forefoot & Heel) + Full-length Nike React Foam',
      'Upper': 'Engineered Single-Layer Mesh with Redesigned Midfoot Band',
      'Drop': '10mm Heel-to-Toe Offset',
      'Outsole': 'Waffle-inspired high-abrasion rubber with flex grooves',
      'Weight': '285g (Men\'s size 9) / 240g (Women\'s size 7.5)'
    },
    pros: [
      'Dual Zoom Air units deliver springy shock absorption for 15,000-step campus days',
      'Breathable engineered mesh upper prevents sweaty feet during long library sessions',
      'Durable rubber waffle outsole grips wet pavement, tile hallways, and outdoor tracks',
      'Padded collar and tongue cradle the ankle securely without blistering'
    ],
    cons: [
      'Standard width (wide foot runners may prefer the wide size variant)'
    ],
    inStock: true,
    shipping: 'Free Nike Express Delivery',
    dealScore: 94,
    matchScore: 97,
    dealBadge: 'Best All-Day Campus Shoes',
    recommendationType: 'best-performance',
    recommendationReason: 'The #1 trusted running and campus walking shoe with dual Zoom Air cushioning and React foam.',
    priceHistory: [
      { date: '2026-06-01', price: 10495, priceINR: 10495 },
      { date: '2026-08-01', price: 7495, priceINR: 7495 }
    ],
    retailer: 'Nike Store / Myntra',
    whoIsThisFor: 'Students walking thousands of steps across campus, gym-goers, runners, and everyday comfort seekers.',
    verdict: 'The ultimate daily walking and running shoe for active college life.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'My feet never feel tired even after walking 8 kilometers across our large university campus every day.',
      frequentPraise: ['Superb shock absorption', 'Zero heel blisters', 'Breathable mesh'],
      frequentComplaints: ['Runs true to size, snug midfoot']
    }
  },

  // =============================================================
  // 10. HOME & LIFESTYLE ESSENTIALS (Chairs, Smart Lamps, Bottles, Mugs, Backpacks)
  // =============================================================
  {
    id: 'prod-ergonomic-mesh-office-chair',
    title: 'ErgoComfort Pro High-Back Ergonomic Breathable Mesh Office Chair (Adaptive Lumbar Support, 3D Adjustable Armrests, 135° Recline with Footrest, Heavy-Duty Class 4 Gas Lift)',
    brand: 'ErgoComfort',
    price: 11999,
    priceINR: 11999,
    priceUSD: 144,
    originalPrice: 18999,
    originalPriceINR: 18999,
    originalPriceUSD: 228,
    rating: 4.8,
    reviewCount: 5670,
    category: 'Home & Lifestyle',
    description: 'Engineered for 10+ hour coding and study marathons. Features breathable Korean elastomeric mesh back that keeps your back cool, dynamic self-adjusting lumbar support that tracks your spine posture, and a 135-degree recline lock with retractable footrest.',
    imageUrl: 'https://images.unsplash.com/photo-1580481077195-c3a9927b74b7?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Backrest': 'Breathable High-Tensile Elastomeric Mesh with Dynamic Lumbar Cushion',
      'Recline': '90° to 135° Multi-Angle Synchro-Tilt Lock + Retractable Footrest',
      'Armrests': '3D Multi-Directional Adjustable (Height, Angle, Fore/Aft)',
      'Gas Lift': 'BIFMA-Certified Class 4 Heavy-Duty Nitrogen Cylinder (Supports up to 150 kg)',
      'Headrest': '2D Adjustable Height & Angle Headrest Pillow',
      'Base': 'Reinforced Heavy-Duty Aluminum Alloy 5-Star Wheel Base'
    },
    pros: [
      'Self-adjusting lumbar support eliminates lower back pain during long study sessions',
      'Full breathable mesh keeps your back cool without sweat buildup in warm rooms',
      '135° recline with pull-out footrest allows comfortable power naps between classes',
      'Class 4 BIFMA gas lift and aluminum base tested for 10+ years of daily use'
    ],
    cons: [
      'Requires ~25 minutes of simple bolt assembly (tools and instructions included)'
    ],
    inStock: true,
    shipping: 'Free Heavy-Item Express Delivery',
    dealScore: 96,
    matchScore: 98,
    dealBadge: 'Best Ergonomic Study Chair',
    recommendationType: 'best-overall',
    recommendationReason: 'Cures study back pain with breathable Korean mesh, dynamic lumbar tracking, and a 135° recline footrest under ₹12,000.',
    priceHistory: [
      { date: '2026-06-01', price: 18999, priceINR: 18999 },
      { date: '2026-08-01', price: 11999, priceINR: 11999 }
    ],
    retailer: 'ErgoStore / Amazon',
    whoIsThisFor: 'Programmers, students studying 8+ hours a day, remote workers, and gamers seeking total back comfort.',
    verdict: 'The single best investment you can make for your back health.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'Completely eliminated my lower back soreness during exam revision week; the mesh keeps my back totally sweat-free.',
      frequentPraise: ['Immediate back relief', 'Breathable mesh', '135-degree nap recline'],
      frequentComplaints: ['Box is heavy on delivery']
    }
  },
  {
    id: 'prod-benq-wit-desk-lamp',
    title: 'BenQ WiT Eye-Care Auto-Dimming Smart LED Desk Lamp (Wide Curved 90cm Lighting Zone, Ambient Light Sensor, 2700K-5700K Stepless Color Temperature, High CRI 95, Flicker-Free)',
    brand: 'BenQ',
    price: 13990,
    priceINR: 13990,
    priceUSD: 168,
    originalPrice: 17990,
    originalPriceINR: 17990,
    originalPriceUSD: 216,
    rating: 4.9,
    reviewCount: 3120,
    category: 'Home & Lifestyle',
    description: 'The world\'s first desk lamp engineered specifically for e-Reading and multi-monitor workstations. Its patented curved smile-curve light head distributes balanced illumination across a massive 90cm wide desktop area without causing screen glare or eye strain.',
    imageUrl: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Lighting Arc': 'Patented Smile Curve Head (Illuminates 90cm desk width with 150% wider coverage)',
      'Sensors': 'Built-in Ambient Light Sensor (1-touch smart auto-dimming)',
      'Color Temperature': '2,700K (Warm Relaxing Candlelight) to 5,700K (Cool Crisp Daylight Study)',
      'Color Rendering': 'CRI ≥ 95 (True daylight color fidelity for artwork and reading)',
      'Eye Safety': 'IEEE 1789 Flicker-Free Certified & IEC/EN 62471 Blue-Light Hazard Exempt',
      'Build': 'Aviation-grade aluminum alloy articulated arm with zinc alloy torque springs'
    },
    pros: [
      'Huge 90cm curved illumination lights up your laptop, open textbook, and notepad simultaneously',
      'Zero screen reflection or monitor glare thanks to optical distribution design',
      'Auto-dimming ring automatically adjusts brightness based on room light conditions',
      'Flicker-free and blue-light certified to eliminate late-night eye strain and headaches'
    ],
    cons: [
      'Heavy base requires sturdy desk space'
    ],
    inStock: true,
    shipping: 'Free 2-Day Delivery',
    dealScore: 93,
    matchScore: 96,
    dealBadge: 'Ultimate Eye-Care Desk Lamp',
    recommendationType: 'best-performance',
    recommendationReason: 'Patented curved arc illuminates an entire 90cm desk with smart auto-dimming and CRI 95 eye safety.',
    priceHistory: [
      { date: '2026-06-01', price: 17990, priceINR: 17990 },
      { date: '2026-08-01', price: 13990, priceINR: 13990 }
    ],
    retailer: 'BenQ / Amazon',
    whoIsThisFor: 'Students reading textbooks late into the night, programmers working at dual-monitors, and digital artists needing true color accuracy.',
    verdict: 'The undisputed gold standard of desk lighting for eye comfort.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'My dry eye strain and late-night study headaches vanished completely after switching to this lamp.',
      frequentPraise: ['Huge 90cm wide light spread', 'Smart auto-dimming ring', 'CRI 95 true colors'],
      frequentComplaints: ['Premium price point']
    }
  },
  {
    id: 'prod-hydro-flask-32oz',
    title: 'Hydro Flask 32 oz Wide Mouth Stainless Steel Vacuum Insulated Water Bottle (TempShield 24hr Cold / 12hr Hot, Leakproof Flex Straw Cap, Pure 18/8 Pro-Grade Steel, BPA-Free)',
    brand: 'Hydro Flask',
    price: 3499,
    priceINR: 3499,
    priceUSD: 42,
    originalPrice: 4499,
    originalPriceINR: 4499,
    originalPriceUSD: 54,
    rating: 4.9,
    reviewCount: 34500,
    category: 'Home & Lifestyle',
    description: 'The cult-favorite insulated hydration bottle. TempShield double-wall vacuum insulation keeps ice water frosty cold for a full 24 hours or coffee piping hot for 12 hours. Features 18/8 pro-grade stainless steel with sweat-free Color Last powder coat.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Capacity': '32 oz (946 ml / ~1 Liter)',
      'Insulation': 'TempShield Double-Wall Vacuum Insulation (24 Hours Cold, 12 Hours Hot)',
      'Material': 'Pro-Grade 18/8 Stainless Steel (Zero flavor transfer or metallic taste)',
      'Cap': 'Leakproof Flex Straw Cap with Easy-Carry Silicone Handle',
      'Coating': 'Color Last Proprietary Durable Powder Coating (Dishwasher safe)',
      'Safety': 'BPA-Free & Phthalate-Free'
    },
    pros: [
      'Ice stays completely solid for 24+ hours even in hot outdoor campus heat',
      '18/8 pro-grade stainless steel ensures zero metallic taste or flavor lingering',
      'Flex straw cap allows quick, 1-handed sipping during lectures or gym workouts without spilling',
      'Durable powder coat provides slip-free grip and survives backpack drops'
    ],
    cons: [
      '32 oz wide diameter does not fit small car cup holders (fits standard backpack side pouches)'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 96,
    matchScore: 98,
    dealBadge: 'Best Insulated Water Bottle',
    recommendationType: 'best-overall',
    recommendationReason: 'Legendary 24-hour ice-cold TempShield insulation and 18/8 steel build that lasts a lifetime.',
    priceHistory: [
      { date: '2026-06-01', price: 4499, priceINR: 4499 },
      { date: '2026-08-01', price: 3499, priceINR: 3499 }
    ],
    retailer: 'Hydro Flask / Amazon',
    whoIsThisFor: 'Students, athletes, and anyone wanting ice-cold hydration all day across long lecture and library schedules.',
    verdict: 'The king of insulated water bottles.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'Left ice cubes inside in my hot car for 18 hours and they were barely melted when I returned.',
      frequentPraise: ['24-hour ice retention', 'Zero metallic taste', 'Straw cap never leaks'],
      frequentComplaints: ['Wide base']
    }
  },
  {
    id: 'prod-ember-mug-2',
    title: 'Ember Temperature Control Smart Heated Ceramic Coffee Mug 2 (14 oz, App Controlled 120°F-145°F, 80-Min Battery, All-Day Coaster Charger, Scratch-Resistant Ceramic Coating)',
    brand: 'Ember',
    price: 12999,
    priceINR: 12999,
    priceUSD: 156,
    originalPrice: 15999,
    originalPriceINR: 15999,
    originalPriceUSD: 192,
    rating: 4.8,
    reviewCount: 8900,
    category: 'Home & Lifestyle',
    description: 'Never drink lukewarm coffee or tea again. The smart Ember Mug 2 allows you to set your exact preferred drinking temperature (between 120°F and 145°F) via your smartphone and maintains it for 80 minutes on battery, or all day on its sleek charging coaster.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Capacity': '14 oz (414 ml Large Mug Size)',
      'Temperature Range': '120°F to 145°F (50°C to 62.5°C)',
      'Battery Life': '80 Minutes off-coaster (All day on included Charging Coaster)',
      'Connectivity': 'Bluetooth Smart App Control (iOS & Android) with customizable LED color',
      'Sensors': 'Precision Dual-Band Heating Sensors + Auto-Sleep Motion Detection',
      'Waterproof': 'IPX7 Submersible up to 1 meter (Hand wash safe)'
    },
    pros: [
      'Keeps your coffee or tea at the exact perfect degree from the first sip to the last drop',
      'Smart sleep mode automatically powers on when hot liquid is poured and sleeps when empty',
      'All-day heating on the desktop charging coaster keeps your drink ready through long coding sessions',
      'Customizable LED light notification indicates when your exact temperature is reached'
    ],
    cons: [
      'Hand wash only (not dishwasher or microwave safe due to internal electronics)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 93,
    matchScore: 95,
    dealBadge: 'Smart Heated Coffee Mug',
    recommendationType: 'best-performance',
    recommendationReason: 'The luxury desk companion that guarantees your coffee or tea stays piping hot all morning.',
    priceHistory: [
      { date: '2026-06-01', price: 15999, priceINR: 15999 },
      { date: '2026-08-01', price: 12999, priceINR: 12999 }
    ],
    retailer: 'Ember Official / Amazon',
    whoIsThisFor: 'Coffee and tea aficionados, software developers, and students who frequently forget their hot drinks while focused.',
    verdict: 'A life-changing upgrade for daily hot drink drinkers.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'I used to throw away half a cup of cold coffee every morning while debugging code; this mug solved it forever.',
      frequentPraise: ['Coffee stays hot for hours', 'Sleek desk coaster', 'Precise app temperature control'],
      frequentComplaints: ['Hand wash only']
    }
  },
  {
    id: 'prod-bellroy-classic-backpack-20l',
    title: 'Bellroy Classic Campus Laptop & Gear Backpack (20 Liters, Padded 15.6" Laptop Sleeve, Water-Resistant Recycled Woven Fabric, Lumbar Support, Quick-Access Valuables Pocket)',
    brand: 'Bellroy',
    price: 8990,
    priceINR: 8990,
    priceUSD: 108,
    originalPrice: 11990,
    originalPriceINR: 11990,
    originalPriceUSD: 144,
    rating: 4.9,
    reviewCount: 4720,
    category: 'Home & Lifestyle',
    description: 'Clean, minimalist urban backpack tailored for campus and tech gear. Holds up to a 15.6" laptop and iPad in dedicated padded suspended sleeves, with soft-lined sunglasses pocket, pen slots, water-resistant zippers, and contoured breathable shoulder straps.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Volume': '20 Liters (18 in x 12.5 in x 7 in)',
      'Laptop Compartment': 'Dedicated Padded & Suspended Sleeve (Fits up to 15.6" MacBook Pro / ThinkPad)',
      'Tablet Sleeve': 'Padded Document & iPad Sleeve',
      'Material': 'Durable Water-Resistant Recycled Venture Weave Fabric + Environmentally Certified Leather',
      'Pockets': 'Quick-access top soft-lined valuables pocket + internal zip mesh pocket + key clip',
      'Warranty': 'Bellroy 3-Year Global Warranty',
      'Weight': '750 grams'
    },
    pros: [
      'Suspended laptop sleeve protects laptop bottom from shock when setting bag down on hard floors',
      'Water-resistant woven fabric protects laptops and textbooks during unexpected rainstorms',
      'Contoured back padding and ergonomic straps distribute weight comfortably across shoulders',
      'Sleek modern silhouette looks sharp in both university lecture halls and tech internships'
    ],
    cons: [
      'Slim profile is optimized for daily tech gear rather than multi-day heavy camping loads'
    ],
    inStock: true,
    shipping: 'Free Express Shipping',
    dealScore: 95,
    matchScore: 97,
    dealBadge: 'Best Tech Campus Backpack',
    recommendationType: 'best-overall',
    recommendationReason: 'The cleanest, most ergonomic 20L daily tech backpack with suspended laptop protection and rain-resistant fabric.',
    priceHistory: [
      { date: '2026-06-01', price: 11990, priceINR: 11990 },
      { date: '2026-08-01', price: 8990, priceINR: 8990 }
    ],
    retailer: 'Bellroy Store / Amazon',
    whoIsThisFor: 'Students carrying a laptop, tablet, charger, textbooks, and water bottle across campus every day.',
    verdict: 'The ultimate sleek, durable daily campus backpack.',
    sentimentSummary: {
      positivePercent: 99,
      keyHighlight: 'The suspended laptop sleeve gives immense peace of mind and the straps feel weightless on your shoulders.',
      frequentPraise: ['Suspended 15.6" laptop pocket', 'Water resistant in rain', 'Minimalist aesthetics'],
      frequentComplaints: ['No external water bottle cage (designed for internal sleek carry)']
    }
  },

  // =============================================================
  // 11. STORAGE & TECH ACCESSORIES (SSDs, GaN Fast Chargers, Hubs)
  // =============================================================
  {
    id: 'prod-samsung-t7-shield-1tb',
    title: 'Samsung T7 Shield 1TB Portable External SSD (1050MB/s Read, USB 3.2 Gen 2, Rugged IP65 Water & Dust Resistant, 3-Meter Drop Proof)',
    brand: 'Samsung',
    price: 8999,
    priceINR: 8999,
    priceUSD: 108,
    originalPrice: 13999,
    originalPriceINR: 13999,
    originalPriceUSD: 168,
    rating: 4.9,
    reviewCount: 8920,
    category: 'Storage & Accessories',
    description: 'Ultra-durable rugged portable solid state drive delivering blazing 1050MB/s transfer speeds. Encased in high-tech rubber elastomer with IP65 water and dust resistance and 3-meter drop protection.',
    imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Capacity': '1TB (1000 Gigabytes)',
      'Interface': 'USB 3.2 Gen 2 (10Gbps)',
      'Transfer Speed': 'Sequential Read up to 1,050 MB/s, Sequential Write up to 1,000 MB/s',
      'Durability': 'IP65 Water & Dust Resistant, 3-Meter (9.8 ft) Drop Resistant, Rubber Shielding',
      'Security': 'AES 256-Bit Hardware Encryption with Password Protection',
      'Compatibility': 'Windows, Mac, Android, iPadOS, Linux, Gaming Consoles, Cameras',
      'Cables Included': 'USB-C to USB-C Cable + USB-C to USB-A Cable',
      'Weight': '98 grams'
    },
    pros: [
      'Transfers a 10GB 4K lecture video or dataset in under 10 seconds (1050 MB/s)',
      'IP65 water, dust, and 3-meter drop protection for backpack campus life',
      'Compatible with Mac, PC, iPad, Android phone, and iPhone 15 Pro direct ProRes recording',
      'Dynamic Thermal Guard keeps sustained transfers fast without overheating'
    ],
    cons: [
      'Rubber exterior attracts pocket lint'
    ],
    inStock: true,
    shipping: 'Free Next-Day Delivery',
    dealScore: 97,
    matchScore: 96,
    dealBadge: 'Best Rugged 1TB SSD',
    recommendationType: 'best-value',
    recommendationReason: 'Blazing 1050MB/s speeds paired with waterproof, drop-proof armor for campus life under ₹9,000.',
    priceHistory: [
      { date: '2026-06-01', price: 13999, priceINR: 13999 },
      { date: '2026-08-01', price: 8999, priceINR: 8999 }
    ],
    retailer: 'Samsung India / Amazon',
    whoIsThisFor: 'Students backing up heavy software projects, virtual machine images, 4K videos, and CAD libraries securely.',
    verdict: 'The most reliable and durable high-speed external SSD on the market.',
    sentimentSummary: {
      positivePercent: 98,
      keyHighlight: 'Copies massive 50GB virtual machine images and project archives in less than a minute.',
      frequentPraise: ['1050 MB/s speed', 'Indestructible rubber armor', 'Both USB-C & USB-A cables included'],
      frequentComplaints: ['Rubber coating catches lint']
    }
  },
  {
    id: 'prod-anker-735-65w-gan',
    title: 'Anker 735 GaNPrime 65W Fast Wall Charger (3-Port: 2x USB-C + 1x USB-A, PowerIQ 4.0 Dynamic Power Distribution, Ultra-Compact for Laptop & Phone)',
    brand: 'Anker',
    price: 3499,
    priceINR: 3499,
    priceUSD: 42,
    originalPrice: 4999,
    originalPriceINR: 4999,
    originalPriceUSD: 60,
    rating: 4.8,
    reviewCount: 7120,
    category: 'Storage & Accessories',
    description: 'Replace your bulky laptop brick and multiple wall chargers with one pocket-sized 65W GaNPrime charger capable of fast-charging your laptop, phone, and earbuds simultaneously.',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    specs: {
      'Total Output': '65W Max Power Output',
      'Ports': '2x USB-C (Power Delivery 3.0 PPS) + 1x USB-A (PowerIQ 4.0)',
      'Single Port Max': 'USB-C1 / C2: Up to 65W (Fast charges MacBook Pro, ThinkPad, Dell, ASUS)',
      'Multi-Port Dynamic': 'Dynamic Power Distribution automatically adjusts wattage per device',
      'Technology': 'GaNPrime (Gallium Nitride) with ActiveShield 2.0 Temperature Monitoring',
      'Size': '53% smaller than standard Apple 67W single-port charger',
      'Weight': '132 grams'
    },
    pros: [
      'Charges your laptop (65W USB-C PD), phone (20W), and watch/earbuds from 1 single wall outlet',
      '53% smaller than standard single-port OEM laptop bricks',
      'ActiveShield 2.0 monitors temperature over 3 million times per day for safety',
      'Foldable prongs and universal 100-240V worldwide voltage'
    ],
    cons: [
      'Requires separate 65W/100W rated USB-C cable (not included in charger box)'
    ],
    inStock: true,
    shipping: 'Free 2-Day Shipping',
    dealScore: 95,
    matchScore: 95,
    dealBadge: 'Best All-in-One Charger',
    recommendationType: 'best-value',
    recommendationReason: 'Eliminate heavy charger clutter: fast-charges your laptop, phone, and headphones all at once from a tiny pocket-sized brick.',
    priceHistory: [
      { date: '2026-06-01', price: 4999, priceINR: 4999 },
      { date: '2026-08-01', price: 3499, priceINR: 3499 }
    ],
    retailer: 'Anker Store / Amazon',
    whoIsThisFor: 'College students who carry a laptop, phone, and headphones and want to carry only 1 lightweight charger in their backpack.',
    verdict: 'The ultimate 3-in-1 compact travel and campus charger.',
    sentimentSummary: {
      positivePercent: 97,
      keyHighlight: 'Powers both my laptop and phone simultaneously without getting boiling hot thanks to GaN technology.',
      frequentPraise: ['3 ports in a tiny body', 'Charges laptop and phone together', 'Stays cool'],
      frequentComplaints: ['No USB-C cable included']
    }
  }
];

export const CATEGORIES = [
  'All Products',
  'Keyboards & Mice',
  'Stationery & Pencils',
  'Fashion & Dresses',
  'Laptops',
  'Smartphones',
  'Smartwatches',
  'Headphones',
  'Tablets',
  'Monitors',
  'Home & Lifestyle',
  'Storage & Accessories'
];

export const CURATED_COLLECTIONS = [
  {
    id: 'all',
    title: 'All Products & Categories',
    description: 'Explore the complete verified retail and technology catalog'
  },
  {
    id: 'mice-keyboards',
    title: '🖱️ Mice & Keyboards',
    description: 'Productivity mice, wireless trackpads, silent clickers, and mechanical keyboards',
    category: 'Keyboards & Mice'
  },
  {
    id: 'pencils-stationery',
    title: '✏️ Pencils & Stationery',
    description: 'Apple Pencil Pro, Faber-Castell drafting pencils, Staedtler graphite sets, & notebooks',
    category: 'Stationery & Pencils'
  },
  {
    id: 'fashion-dresses',
    title: '👗 Fashion & Dresses',
    description: 'Summer floral midi dresses, elegant evening gowns, linen shirt dresses, denim jackets, & shoes',
    category: 'Fashion & Dresses'
  },
  {
    id: 'home-lifestyle',
    title: '🏠 Home & Lifestyle',
    description: 'Ergonomic mesh chairs, eye-care smart desk lamps, insulated water bottles, & smart mugs',
    category: 'Home & Lifestyle'
  },
  {
    id: 'smartwatches',
    title: '⌚ Smartwatches & Wearables',
    description: 'Apple Watch, Wear OS, Garmin GPS sports watches, & long-battery fitness trackers',
    category: 'Smartwatches'
  },
  {
    id: 'deals',
    title: '🔥 Hot Deals & Big Discounts',
    description: 'Products with 20%+ price cuts and high deal ratings',
    tag: 'onlyDeals'
  },
  {
    id: 'ece-engineering',
    title: '💻 ECE, VLSI & Engineering Labs',
    description: 'Laptops with 16GB+ RAM, dedicated GPUs & multi-core CPUs for Vivado, MATLAB & CAD',
    query: '16GB RAM'
  },
  {
    id: 'student-budget',
    title: '💰 Student Budget (< ₹5,000 / $60)',
    description: 'High value mice, pencils, dresses, accessories, and essentials under ₹5,000 / $60',
    maxPrice: 5000
  },
  {
    id: 'apple-ecosystem',
    title: ' Apple Ecosystem',
    description: 'MacBooks, iPads, Apple Pencil Pro, Magic Mouse, Apple Watches, and iPhones',
    brand: 'Apple'
  },
  {
    id: 'audio-anc',
    title: '🎧 Silence & Focus ANC Audio',
    description: 'Top-rated active noise canceling headphones for hostel study & library focus',
    category: 'Headphones'
  }
];

export const BRANDS_LIST = [
  'All Brands',
  'Logitech',
  'Razer',
  'Apple',
  'Faber-Castell',
  'Staedtler',
  'rOtring',
  'Wacom',
  'Grace & Flora',
  'Noir Elegance',
  'Loom & Thread',
  'Rangriti',
  'Levi\'s',
  'Nike',
  'ErgoComfort',
  'BenQ',
  'Hydro Flask',
  'Ember',
  'Bellroy',
  'Samsung',
  'OnePlus',
  'Garmin',
  'Amazfit',
  'Sony',
  'ASUS',
  'Lenovo',
  'Acer',
  'HP',
  'Keychron',
  'Anker'
];

export const QUICK_SHOPPING_PROMPTS = [
  '🖱️ Best wireless ergonomic mouse for long coding and daily work',
  '✏️ Top mechanical drafting pencil or Apple Pencil for sketching & notes',
  '👗 Elegant summer floral wrap dress or casual linen shirt dress',
  '💻 Laptop for ECE and VLSI under ₹60,000 with at least 16GB RAM',
  '⌚ Smartwatch with multi-day battery life and health tracking under ₹20,000',
  '🎧 Best noise cancelling headphones for hostel study under ₹10,000',
  '📱 Best tablet with stylus support for college lecture notes under ₹35,000',
  '🪑 High-back ergonomic mesh office chair for 8+ hours study comfort',
  '⚡ Compact 65W GaN fast charger that charges laptop and phone together'
];

export const STUDENT_ROLES = [
  'ECE & VLSI Engineering Student',
  'Computer Science / Software Developer',
  'Mechanical & Civil CAD Engineering',
  'Data Science & AI / ML Student',
  'General College Student / Everyday Productivity',
  'Creative Designer & Video Editor'
];
