export type Category = "laptop" | "pc" | "komponen" | "aksesoris"

export type ProductVariant = {
  label: string
  price: number
}

export type Product = {
  slug: string
  name: string
  brand: string
  category: Category
  price: number
  oldPrice?: number
  image: string
  images?: string[]
  rating: number
  sold: number
  stock: number
  badge?: string
  shortDesc: string
  specs: { label: string; value: string }[]
  variants?: ProductVariant[]
  subcategory?: string
}

export const categories: { id: Category; label: string; desc: string }[] = [
  { id: "laptop", label: "Laptop", desc: "Laptop gaming & produktivitas" },
  { id: "pc", label: "PC Rakitan", desc: "Desktop siap pakai" },
  { id: "komponen", label: "Komponen", desc: "CPU, GPU, & sparepart" },
  { id: "aksesoris", label: "Aksesoris", desc: "Periferal & gear" },
]

export const subcategories: Record<Category, string[]> = {
  laptop: ["Gaming Laptop", "Workstation Laptop", "Ultrabook", "Laptop AIO"],
  pc: ["PC Gaming", "PC Workstation", "Mini PC", "Desktop PC"],
  komponen: ["VGA", "Processor", "RAM", "Storage", "Motherboard", "Cooling", "PSU", "Case"],
  aksesoris: ["Monitor", "Keyboard", "Mouse", "Headset", "Mousepad", "Webcam", "Speaker"],
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export const brandMap: Record<string, string[]> = {
  // Accessories
  Monitor: ["Samsung", "LG", "AOC", "ASUS", "Acer", "BenQ", "ViewSonic", "Philips"],
  Keyboard: ["Logitech", "Razer", "Corsair", "SteelSeries", "HyperX", "Keychron", "Akko"],
  Mouse: ["Logitech", "Razer", "Corsair", "Glorious", "SteelSeries", "Fantech"],
  Headset: ["Logitech", "HyperX", "Razer", "Corsair", "Sennheiser", "SteelSeries"],

  // Laptops / PCs
  "Gaming Laptop": ["Asus", "MSI", "Acer", "Lenovo", "HP", "Dell", "Razer", "Gigabyte"],
  laptop: ["Asus", "MSI", "Acer", "Lenovo", "HP", "Dell", "Razer", "Gigabyte"],
  pc: ["Oniforge", "Corsair", "MSI", "Asus", "Dell", "HP"],
  komponen: ["Intel", "AMD", "Corsair", "Samsung", "Western Digital", "ASUS", "MSI", "Gigabyte", "Noctua", "Seasonic"],
  aksesoris: ["Logitech", "Razer", "Corsair", "SteelSeries", "HyperX", "AOC", "ASUS", "Samsung", "LG", "BenQ", "ViewSonic", "Sennheiser"],

  // Components
  VGA: ["NVIDIA", "AMD", "ASUS", "MSI", "Gigabyte", "Zotac", "Palit"],
  Processor: ["Intel", "AMD"],
  RAM: ["Corsair", "G.SKILL", "Kingston", "ADATA", "Crucial", "TeamGroup"],
  Storage: ["Samsung", "Western Digital", "Seagate", "Crucial", "Kingston"],
  Motherboard: ["ASUS", "MSI", "Gigabyte", "ASRock"],
  Cooling: ["Cooler Master", "Noctua", "be quiet!", "Corsair"],
  PSU: ["Seasonic", "Corsair", "EVGA", "Antec", "Cooler Master"],
  Case: ["NZXT", "Corsair", "Cooler Master", "Fractal", "Lian Li"],
}
