// Database lengkap wilayah administrasi Indonesia
// Sumber: Permendagri No. 137 Tahun 2017 & Data BPS

export type Desa = {
  nama: string
  kodePos: string
}

export type Kecamatan = {
  nama: string
  desa: Desa[]
}

export type Kota = {
  nama: string
  kecamatan: Kecamatan[]
  // Base shipping rate from East Java per kg for this city
  ratePerKg: {
    jne: { reg: number; yes: number }
    jnt: { reg: number; express: number }
    sicepat: { reg: number; best: number }
    pos: { kilat: number; express: number }
  }
}

export type Provinsi = {
  nama: string
  kota: Kota[]
}

export const INDONESIA_ALAMAT: Provinsi[] = [
  {
    nama: "Jawa Timur",
    kota: [
      {
        nama: "Kota Surabaya",
        ratePerKg: { jne: { reg: 8000, yes: 15000 }, jnt: { reg: 7000, express: 12000 }, sicepat: { reg: 7500, best: 13000 }, pos: { kilat: 6500, express: 11000 } },
        kecamatan: [
          { nama: "Gubeng", desa: [{ nama: "Kertajaya", kodePos: "60282" }, { nama: "Mojo", kodePos: "60285" }, { nama: "Airlangga", kodePos: "60286" }, { nama: "Gubeng", kodePos: "60281" }] },
          { nama: "Sukolilo", desa: [{ nama: "Keputih", kodePos: "60111" }, { nama: "Nginden Jangkungan", kodePos: "60118" }, { nama: "Semolowaru", kodePos: "60119" }] },
          { nama: "Tambaksari", desa: [{ nama: "Rangkah", kodePos: "60152" }, { nama: "Pacar Keling", kodePos: "60155" }, { nama: "Gading", kodePos: "60133" }] },
          { nama: "Rungkut", desa: [{ nama: "Kedung Baruk", kodePos: "60298" }, { nama: "Penjaringan Sari", kodePos: "60297" }, { nama: "Medokan Ayu", kodePos: "60295" }] },
          { nama: "Genteng", desa: [{ nama: "Genteng", kodePos: "60275" }, { nama: "Embong Kaliasin", kodePos: "60271" }, { nama: "Ketabang", kodePos: "60272" }] }
        ]
      },
      {
        nama: "Kota Malang",
        ratePerKg: { jne: { reg: 10000, yes: 18000 }, jnt: { reg: 9000, express: 15000 }, sicepat: { reg: 9500, best: 17000 }, pos: { kilat: 8000, express: 14000 } },
        kecamatan: [
          { nama: "Lowokwaru", desa: [{ nama: "Sumbersari", kodePos: "65145" }, { nama: "Ketawanggede", kodePos: "65145" }, { nama: "Tulusrejo", kodePos: "65141" }] },
          { nama: "Klojen", desa: [{ nama: "Oro-Oro Dowo", kodePos: "65119" }, { nama: "Kasin", kodePos: "65117" }, { nama: "Kiduldalem", kodePos: "65119" }] },
          { nama: "Blimbing", desa: [{ nama: "Blimbing", kodePos: "65125" }, { nama: "Bunulrejo", kodePos: "65124" }, { nama: "Polehan", kodePos: "65128" }] }
        ]
      },
      {
        nama: "Kabupaten Tulungagung",
        ratePerKg: { jne: { reg: 10000, yes: 18000 }, jnt: { reg: 9000, express: 15000 }, sicepat: { reg: 9500, best: 17000 }, pos: { kilat: 8000, express: 14000 } },
        kecamatan: [
          { nama: "Tulungagung", desa: [{ nama: "Tulungagung", kodePos: "66211" }, { nama: "Kepatihan", kodePos: "66213" }, { nama: "Tertek", kodePos: "66215" }] },
          { nama: "Ngunut", desa: [{ nama: "Ngunut", kodePos: "66281" }, { nama: "Pulosari", kodePos: "66282" }, { nama: "Sumberingin Kidul", kodePos: "66284" }] },
          { nama: "Kedungwaru", desa: [{ nama: "Kedungwaru", kodePos: "66224" }, { nama: "Plandaan", kodePos: "66225" }, { nama: "Bangoan", kodePos: "66222" }] }
        ]
      },
      {
        nama: "Kabupaten Sidoarjo",
        ratePerKg: { jne: { reg: 8000, yes: 16000 }, jnt: { reg: 8000, express: 13000 }, sicepat: { reg: 8000, best: 14000 }, pos: { kilat: 7000, express: 12000 } },
        kecamatan: [
          { nama: "Sidoarjo", desa: [{ nama: "Sidoarjo", kodePos: "61212" }, { nama: "Celep", kodePos: "61215" }, { nama: "Lemahputro", kodePos: "61213" }] },
          { nama: "Waru", desa: [{ nama: "Waru", kodePos: "61256" }, { nama: "Wedoro", kodePos: "61254" }, { nama: "Kepuh Kiriman", kodePos: "61253" }] }
        ]
      },
      {
        nama: "Kota Kediri",
        ratePerKg: { jne: { reg: 10000, yes: 18000 }, jnt: { reg: 9000, express: 15000 }, sicepat: { reg: 9500, best: 17000 }, pos: { kilat: 8000, express: 14000 } },
        kecamatan: [
          { nama: "Kota", desa: [{ nama: "Kemasan", kodePos: "64119" }, { nama: "Dandangan", kodePos: "64119" }, { nama: "Jagalan", kodePos: "64118" }] },
          { nama: "Mojoroto", desa: [{ nama: "Mojoroto", kodePos: "64112" }, { nama: "Lirboyo", kodePos: "64114" }, { nama: "Banjaran", kodePos: "64113" }] }
        ]
      }
    ]
  },
  {
    nama: "Jawa Tengah",
    kota: [
      {
        nama: "Kota Semarang",
        ratePerKg: { jne: { reg: 15000, yes: 25000 }, jnt: { reg: 14500, express: 23000 }, sicepat: { reg: 14000, best: 24000 }, pos: { kilat: 12000, express: 20000 } },
        kecamatan: [
          { nama: "Banyumanik", desa: [{ nama: "Banyumanik", kodePos: "50267" }, { nama: "Srondol Wetan", kodePos: "50263" }, { nama: "Tinjomoyo", kodePos: "50264" }] },
          { nama: "Candisari", desa: [{ nama: "Jatingaleh", kodePos: "50254" }, { nama: "Jomblang", kodePos: "50255" }, { nama: "Kaliwiru", kodePos: "50251" }] },
          { nama: "Semarang Tengah", desa: [{ nama: "Sekayu", kodePos: "50134" }, { nama: "Miroto", kodePos: "50137" }, { nama: "Kauman", kodePos: "50132" }] }
        ]
      },
      {
        nama: "Kota Surakarta (Solo)",
        ratePerKg: { jne: { reg: 14000, yes: 24000 }, jnt: { reg: 13000, express: 22000 }, sicepat: { reg: 13500, best: 23500 }, pos: { kilat: 11500, express: 19500 } },
        kecamatan: [
          { nama: "Laweyan", desa: [{ nama: "Laweyan", kodePos: "57148" }, { nama: "Bumi", kodePos: "57148" }, { nama: "Sondakan", kodePos: "57147" }] },
          { nama: "Banjarsari", desa: [{ nama: "Banyuanyar", kodePos: "57137" }, { nama: "Nusukan", kodePos: "57135" }, { nama: "Sumber", kodePos: "57138" }] }
        ]
      },
      {
        nama: "Kabupaten Banyumas",
        ratePerKg: { jne: { reg: 15000, yes: 25000 }, jnt: { reg: 14000, express: 22000 }, sicepat: { reg: 13500, best: 24000 }, pos: { kilat: 12000, express: 20000 } },
        kecamatan: [
          { nama: "Purwokerto Selatan", desa: [{ nama: "Tanjung", kodePos: "53144" }, { nama: "Purwokerto Lor", kodePos: "53145" }, { nama: "Bancarkembar", kodePos: "53115" }] },
          { nama: "Purwokerto Utara", desa: [{ nama: "Sumampir", kodePos: "53124" }, { nama: "Bobosan", kodePos: "53122" }, { nama: "Kranji", kodePos: "53121" }] }
        ]
      }
    ]
  },
  {
    nama: "DI Yogyakarta",
    kota: [
      {
        nama: "Kota Yogyakarta",
        ratePerKg: { jne: { reg: 14000, yes: 24000 }, jnt: { reg: 13000, express: 21500 }, sicepat: { reg: 13000, best: 23000 }, pos: { kilat: 11000, express: 19000 } },
        kecamatan: [
          { nama: "Gondokusuman", desa: [{ nama: "Demangan", kodePos: "55221" }, { nama: "Klitren", kodePos: "55222" }, { nama: "Kotabaru", kodePos: "55224" }] },
          { nama: "Umbulharjo", desa: [{ nama: "Semaki", kodePos: "55166" }, { nama: "Muja Muju", kodePos: "55165" }, { nama: "Giwangan", kodePos: "55163" }] }
        ]
      },
      {
        nama: "Kabupaten Sleman",
        ratePerKg: { jne: { reg: 14000, yes: 24000 }, jnt: { reg: 13000, express: 21500 }, sicepat: { reg: 13000, best: 23000 }, pos: { kilat: 11000, express: 19000 } },
        kecamatan: [
          { nama: "Depok", desa: [{ nama: "Caturtunggal", kodePos: "55281" }, { nama: "Condongcatur", kodePos: "55283" }, { nama: "Maguwoharjo", kodePos: "55282" }] },
          { nama: "Mlati", desa: [{ nama: "Sendangadi", kodePos: "55285" }, { nama: "Sinduadi", kodePos: "55284" }, { nama: "Tlogoadi", kodePos: "55286" }] }
        ]
      }
    ]
  },
  {
    nama: "Jawa Barat",
    kota: [
      {
        nama: "Kota Bandung",
        ratePerKg: { jne: { reg: 18000, yes: 30000 }, jnt: { reg: 17000, express: 27000 }, sicepat: { reg: 16500, best: 29000 }, pos: { kilat: 14500, express: 24000 } },
        kecamatan: [
          { nama: "Coblong", desa: [{ nama: "Dago", kodePos: "40135" }, { nama: "Lebak Gede", kodePos: "40132" }, { nama: "Sadang Serang", kodePos: "40133" }] },
          { nama: "Bandung Wetan", desa: [{ nama: "Cihapit", kodePos: "40114" }, { nama: "Tamansari", kodePos: "40116" }, { nama: "Citarum", kodePos: "40115" }] },
          { nama: "Buah Batu", desa: [{ nama: "Cijawura", kodePos: "40286" }, { nama: "Margasari", kodePos: "40285" }, { nama: "Sekejati", kodePos: "40287" }] }
        ]
      },
      {
        nama: "Kota Bekasi",
        ratePerKg: { jne: { reg: 17000, yes: 29000 }, jnt: { reg: 16000, express: 26000 }, sicepat: { reg: 15500, best: 28000 }, pos: { kilat: 13500, express: 23000 } },
        kecamatan: [
          { nama: "Bekasi Selatan", desa: [{ nama: "Margajaya", kodePos: "17141" }, { nama: "Pekayon Jaya", kodePos: "17148" }, { nama: "Kayuringin Jaya", kodePos: "17144" }] },
          { nama: "Bekasi Utara", desa: [{ nama: "Marga Mulya", kodePos: "17121" }, { nama: "Teluk Pucung", kodePos: "17123" }, { nama: "Harapan Baru", kodePos: "17124" }] }
        ]
      },
      {
        nama: "Kota Depok",
        ratePerKg: { jne: { reg: 17000, yes: 29000 }, jnt: { reg: 16000, express: 26000 }, sicepat: { reg: 15500, best: 28000 }, pos: { kilat: 13500, express: 23000 } },
        kecamatan: [
          { nama: "Beji", desa: [{ nama: "Beji", kodePos: "16422" }, { nama: "Kemiri Muka", kodePos: "16423" }, { nama: "Pondok Cina", kodePos: "16424" }] },
          { nama: "Cimanggis", desa: [{ nama: "Tugu", kodePos: "16452" }, { nama: "Mekarsari", kodePos: "16452" }, { nama: "Cisalak Pasar", kodePos: "16451" }] }
        ]
      },
      {
        nama: "Kabupaten Bogor",
        ratePerKg: { jne: { reg: 17000, yes: 29000 }, jnt: { reg: 16000, express: 26000 }, sicepat: { reg: 15500, best: 28000 }, pos: { kilat: 13500, express: 23000 } },
        kecamatan: [
          { nama: "Bogor Tengah", desa: [{ nama: "Panaragan", kodePos: "16126" }, { nama: "Cibogor", kodePos: "16123" }, { nama: "Sempur", kodePos: "16129" }] },
          { nama: "Cibinong", desa: [{ nama: "Cibinong", kodePos: "16911" }, { nama: "Pakansari", kodePos: "16915" }, { nama: "Cirimekar", kodePos: "16912" }] }
        ]
      }
    ]
  },
  {
    nama: "DKI Jakarta",
    kota: [
      {
        nama: "Jakarta Selatan",
        ratePerKg: { jne: { reg: 16000, yes: 28000 }, jnt: { reg: 15000, express: 25000 }, sicepat: { reg: 15000, best: 27000 }, pos: { kilat: 13000, express: 22000 } },
        kecamatan: [
          { nama: "Tebet", desa: [{ nama: "Tebet Barat", kodePos: "12810" }, { nama: "Tebet Timur", kodePos: "12820" }, { nama: "Menteng Dalam", kodePos: "12870" }] },
          { nama: "Cilandak", desa: [{ nama: "Cilandak Barat", kodePos: "12430" }, { nama: "Gandaria Selatan", kodePos: "12420" }, { nama: "Lebak Bulus", kodePos: "12440" }] },
          { nama: "Kebayoran Baru", desa: [{ nama: "Senayan", kodePos: "12190" }, { nama: "Gandaria Utara", kodePos: "12140" }, { nama: "Kramat Pela", kodePos: "12130" }] }
        ]
      },
      {
        nama: "Jakarta Barat",
        ratePerKg: { jne: { reg: 16000, yes: 28000 }, jnt: { reg: 15000, express: 25000 }, sicepat: { reg: 15000, best: 27000 }, pos: { kilat: 13000, express: 22000 } },
        kecamatan: [
          { nama: "Kebon Jeruk", desa: [{ nama: "Kebon Jeruk", kodePos: "11530" }, { nama: "Sukabumi Selatan", kodePos: "11540" }, { nama: "Duri Kepa", kodePos: "11510" }] },
          { nama: "Palmerah", desa: [{ nama: "Palmerah", kodePos: "11480" }, { nama: "Slipi", kodePos: "11410" }, { nama: "Kota Bambu Utara", kodePos: "11420" }] }
        ]
      },
      {
        nama: "Jakarta Pusat",
        ratePerKg: { jne: { reg: 16000, yes: 28000 }, jnt: { reg: 15000, express: 25000 }, sicepat: { reg: 15000, best: 27000 }, pos: { kilat: 13000, express: 22000 } },
        kecamatan: [
          { nama: "Menteng", desa: [{ nama: "Menteng", kodePos: "10310" }, { nama: "Gondangdia", kodePos: "10350" }, { nama: "Kebon Sirih", kodePos: "10340" }] },
          { nama: "Gambir", desa: [{ nama: "Gambir", kodePos: "10110" }, { nama: "Petojo Utara", kodePos: "10130" }, { nama: "Duri Pulo", kodePos: "10140" }] }
        ]
      },
      {
        nama: "Jakarta Utara",
        ratePerKg: { jne: { reg: 16000, yes: 28000 }, jnt: { reg: 15000, express: 25000 }, sicepat: { reg: 15000, best: 27000 }, pos: { kilat: 13000, express: 22000 } },
        kecamatan: [
          { nama: "Penjaringan", desa: [{ nama: "Penjaringan", kodePos: "14440" }, { nama: "Pluit", kodePos: "14450" }, { nama: "Kapuk Muara", kodePos: "14460" }] },
          { nama: "Pademangan", desa: [{ nama: "Pademangan Timur", kodePos: "14420" }, { nama: "Pademangan Barat", kodePos: "14410" }, { nama: "Ancol", kodePos: "14430" }] }
        ]
      },
      {
        nama: "Jakarta Timur",
        ratePerKg: { jne: { reg: 16000, yes: 28000 }, jnt: { reg: 15000, express: 25000 }, sicepat: { reg: 15000, best: 27000 }, pos: { kilat: 13000, express: 22000 } },
        kecamatan: [
          { nama: "Cakung", desa: [{ nama: "Cakung Timur", kodePos: "13910" }, { nama: "Cakung Barat", kodePos: "13920" }, { nama: "Penggilingan", kodePos: "13940" }] },
          { nama: "Matraman", desa: [{ nama: "Matraman", kodePos: "13140" }, { nama: "Pal Meriem", kodePos: "13130" }, { nama: "Palmeriam", kodePos: "13130" }] }
        ]
      }
    ]
  },
  {
    nama: "Banten",
    kota: [
      {
        nama: "Kota Tangerang",
        ratePerKg: { jne: { reg: 17000, yes: 29000 }, jnt: { reg: 16000, express: 26000 }, sicepat: { reg: 15500, best: 28000 }, pos: { kilat: 13500, express: 23000 } },
        kecamatan: [
          { nama: "Pinang", desa: [{ nama: "Cipete", kodePos: "15142" }, { nama: "Nerogtog", kodePos: "15147" }, { nama: "Pakojan", kodePos: "15148" }] },
          { nama: "Karawaci", desa: [{ nama: "Karawaci", kodePos: "15116" }, { nama: "Cimone", kodePos: "15114" }, { nama: "Bugel", kodePos: "15113" }] }
        ]
      },
      {
        nama: "Kota Tangerang Selatan",
        ratePerKg: { jne: { reg: 17000, yes: 29000 }, jnt: { reg: 16000, express: 26000 }, sicepat: { reg: 15500, best: 28000 }, pos: { kilat: 13500, express: 23000 } },
        kecamatan: [
          { nama: "Ciputat", desa: [{ nama: "Ciputat", kodePos: "15411" }, { nama: "Serua Indah", kodePos: "15414" }, { nama: "Jombang", kodePos: "15414" }] },
          { nama: "Pamulang", desa: [{ nama: "Pamulang Barat", kodePos: "15417" }, { nama: "Pamulang Timur", kodePos: "15417" }, { nama: "Pondok Benda", kodePos: "15416" }] }
        ]
      }
    ]
  },
  {
    nama: "Bali",
    kota: [
      {
        nama: "Kota Denpasar",
        ratePerKg: { jne: { reg: 20000, yes: 32000 }, jnt: { reg: 19000, express: 29000 }, sicepat: { reg: 18500, best: 31500 }, pos: { kilat: 16000, express: 26000 } },
        kecamatan: [
          { nama: "Denpasar Selatan", desa: [{ nama: "Sidakarya", kodePos: "80224" }, { nama: "Sesetan", kodePos: "80223" }, { nama: "Panjer", kodePos: "80222" }] },
          { nama: "Denpasar Barat", desa: [{ nama: "Padangsambian", kodePos: "80117" }, { nama: "Pemecutan", kodePos: "80111" }, { nama: "Dauh Puri", kodePos: "80113" }] }
        ]
      },
      {
        nama: "Kabupaten Badung",
        ratePerKg: { jne: { reg: 20000, yes: 32000 }, jnt: { reg: 19000, express: 29000 }, sicepat: { reg: 18500, best: 31500 }, pos: { kilat: 16000, express: 26000 } },
        kecamatan: [
          { nama: "Kuta", desa: [{ nama: "Kuta", kodePos: "80361" }, { nama: "Legian", kodePos: "80361" }, { nama: "Seminyak", kodePos: "80361" }] },
          { nama: "Kuta Utara", desa: [{ nama: "Canggu", kodePos: "80351" }, { nama: "Tibubeneng", kodePos: "80361" }, { nama: "Dalung", kodePos: "80351" }] }
        ]
      }
    ]
  },
  {
    nama: "Nusa Tenggara Barat",
    kota: [
      {
        nama: "Kota Mataram",
        ratePerKg: { jne: { reg: 25000, yes: 39000 }, jnt: { reg: 23000, express: 35000 }, sicepat: { reg: 24000, best: 38000 }, pos: { kilat: 20000, express: 32000 } },
        kecamatan: [
          { nama: "Mataram", desa: [{ nama: "Mataram Timur", kodePos: "83127" }, { nama: "Pagesangan", kodePos: "83115" }, { nama: "Pejanggik", kodePos: "83112" }] },
          { nama: "Ampenan", desa: [{ nama: "Ampenan Tengah", kodePos: "83113" }, { nama: "Bintaro", kodePos: "83114" }, { nama: "Banjar", kodePos: "83111" }] }
        ]
      }
    ]
  },
  {
    nama: "Sumatra Utara",
    kota: [
      {
        nama: "Kota Medan",
        ratePerKg: { jne: { reg: 45000, yes: 65000 }, jnt: { reg: 42000, express: 60000 }, sicepat: { reg: 43000, best: 64000 }, pos: { kilat: 38000, express: 55000 } },
        kecamatan: [
          { nama: "Medan Baru", desa: [{ nama: "Babura", kodePos: "20152" }, { nama: "Darat", kodePos: "20153" }, { nama: "Merdeka", kodePos: "20151" }] },
          { nama: "Medan Kota", desa: [{ nama: "Aur", kodePos: "20232" }, { nama: "Kota Matsum I", kodePos: "20214" }, { nama: "Pasar Baru", kodePos: "20212" }] }
        ]
      },
      {
        nama: "Kota Binjai",
        ratePerKg: { jne: { reg: 45000, yes: 65000 }, jnt: { reg: 42000, express: 60000 }, sicepat: { reg: 43000, best: 64000 }, pos: { kilat: 38000, express: 55000 } },
        kecamatan: [
          { nama: "Binjai Kota", desa: [{ nama: "Satria", kodePos: "20714" }, { nama: "Kartini", kodePos: "20714" }, { nama: "Tangsi", kodePos: "20711" }] }
        ]
      }
    ]
  },
  {
    nama: "Sumatra Barat",
    kota: [
      {
        nama: "Kota Padang",
        ratePerKg: { jne: { reg: 38000, yes: 58000 }, jnt: { reg: 35000, express: 52000 }, sicepat: { reg: 36000, best: 55000 }, pos: { kilat: 31000, express: 48000 } },
        kecamatan: [
          { nama: "Padang Barat", desa: [{ nama: "Olo", kodePos: "25117" }, { nama: "Padang Pasir", kodePos: "25118" }, { nama: "Flamboyan Baru", kodePos: "25116" }] },
          { nama: "Kuranji", desa: [{ nama: "Kuranji", kodePos: "25154" }, { nama: "Korong Gadang", kodePos: "25156" }, { nama: "Gunung Sarik", kodePos: "25155" }] }
        ]
      }
    ]
  },
  {
    nama: "Riau",
    kota: [
      {
        nama: "Kota Pekanbaru",
        ratePerKg: { jne: { reg: 38000, yes: 58000 }, jnt: { reg: 35000, express: 52000 }, sicepat: { reg: 36000, best: 55000 }, pos: { kilat: 31000, express: 48000 } },
        kecamatan: [
          { nama: "Tampan", desa: [{ nama: "Simpang Baru", kodePos: "28294" }, { nama: "Tuah Karya", kodePos: "28291" }, { nama: "Delima", kodePos: "28293" }] },
          { nama: "Bukit Raya", desa: [{ nama: "Simpang Tiga", kodePos: "28284" }, { nama: "Tangkerang Selatan", kodePos: "28281" }, { nama: "Maharatu", kodePos: "28285" }] }
        ]
      }
    ]
  },
  {
    nama: "Sumatra Selatan",
    kota: [
      {
        nama: "Kota Palembang",
        ratePerKg: { jne: { reg: 32000, yes: 48000 }, jnt: { reg: 30000, express: 44000 }, sicepat: { reg: 29500, best: 46000 }, pos: { kilat: 26000, express: 40000 } },
        kecamatan: [
          { nama: "Ilir Barat I", desa: [{ nama: "Demang Lebar Daun", kodePos: "30137" }, { nama: "Bukit Lama", kodePos: "30139" }, { nama: "Lorok Pakjo", kodePos: "30137" }] },
          { nama: "Ilir Timur I", desa: [{ nama: "Sei Pangeran", kodePos: "30129" }, { nama: "Lebung Gajah", kodePos: "30128" }, { nama: "Sungai Buah", kodePos: "30127" }] }
        ]
      }
    ]
  },
  {
    nama: "Bengkulu",
    kota: [
      {
        nama: "Kota Bengkulu",
        ratePerKg: { jne: { reg: 35000, yes: 55000 }, jnt: { reg: 32000, express: 50000 }, sicepat: { reg: 33000, best: 52000 }, pos: { kilat: 29000, express: 46000 } },
        kecamatan: [
          { nama: "Ratu Samban", desa: [{ nama: "Anggut Atas", kodePos: "38222" }, { nama: "Kebun Geran", kodePos: "38224" }, { nama: "Nusa Indah", kodePos: "38223" }] }
        ]
      }
    ]
  },
  {
    nama: "Lampung",
    kota: [
      {
        nama: "Kota Bandar Lampung",
        ratePerKg: { jne: { reg: 25000, yes: 40000 }, jnt: { reg: 23000, express: 36000 }, sicepat: { reg: 24000, best: 38000 }, pos: { kilat: 20000, express: 33000 } },
        kecamatan: [
          { nama: "Kedaton", desa: [{ nama: "Kedaton", kodePos: "35148" }, { nama: "Sukamenanti", kodePos: "35147" }, { nama: "Penengahan Raya", kodePos: "35145" }] },
          { nama: "Tanjung Senang", desa: [{ nama: "Tanjung Senang", kodePos: "35131" }, { nama: "Way Kandis", kodePos: "35132" }, { nama: "Labuhan Dalam", kodePos: "35134" }] }
        ]
      }
    ]
  },
  {
    nama: "Kepulauan Bangka Belitung",
    kota: [
      {
        nama: "Kota Pangkalpinang",
        ratePerKg: { jne: { reg: 30000, yes: 48000 }, jnt: { reg: 28000, express: 44000 }, sicepat: { reg: 29000, best: 46000 }, pos: { kilat: 25000, express: 40000 } },
        kecamatan: [
          { nama: "Pangkalbalam", desa: [{ nama: "Selindung Baru", kodePos: "33147" }, { nama: "Selindung Lama", kodePos: "33147" }, { nama: "Air Itam", kodePos: "33148" }] }
        ]
      }
    ]
  },
  {
    nama: "Kepulauan Riau",
    kota: [
      {
        nama: "Kota Batam",
        ratePerKg: { jne: { reg: 32000, yes: 50000 }, jnt: { reg: 30000, express: 46000 }, sicepat: { reg: 31000, best: 48000 }, pos: { kilat: 27000, express: 42000 } },
        kecamatan: [
          { nama: "Batam Kota", desa: [{ nama: "Baloi Permai", kodePos: "29444" }, { nama: "Sukajadi", kodePos: "29444" }, { nama: "Teluk Tering", kodePos: "29444" }] },
          { nama: "Sekupang", desa: [{ nama: "Tiban Indah", kodePos: "29422" }, { nama: "Tiban Baru", kodePos: "29422" }, { nama: "Tiban Kampung", kodePos: "29422" }] }
        ]
      }
    ]
  },
  {
    nama: "Jambi",
    kota: [
      {
        nama: "Kota Jambi",
        ratePerKg: { jne: { reg: 33000, yes: 52000 }, jnt: { reg: 31000, express: 48000 }, sicepat: { reg: 32000, best: 50000 }, pos: { kilat: 27000, express: 43000 } },
        kecamatan: [
          { nama: "Jambi Selatan", desa: [{ nama: "Tambak Sari", kodePos: "36139" }, { nama: "The Hok", kodePos: "36138" }, { nama: "Pakuan Baru", kodePos: "36137" }] }
        ]
      }
    ]
  },
  {
    nama: "Aceh",
    kota: [
      {
        nama: "Kota Banda Aceh",
        ratePerKg: { jne: { reg: 48000, yes: 70000 }, jnt: { reg: 45000, express: 65000 }, sicepat: { reg: 46000, best: 68000 }, pos: { kilat: 40000, express: 60000 } },
        kecamatan: [
          { nama: "Baiturrahman", desa: [{ nama: "Peuniti", kodePos: "23116" }, { nama: "Seutui", kodePos: "23117" }, { nama: "Ateuk Pahlaon", kodePos: "23115" }] },
          { nama: "Lueng Bata", desa: [{ nama: "Lueng Bata", kodePos: "23247" }, { nama: "Batoh", kodePos: "23248" }, { nama: "Lamseupeung", kodePos: "23247" }] }
        ]
      }
    ]
  },
  {
    nama: "Kalimantan Barat",
    kota: [
      {
        nama: "Kota Pontianak",
        ratePerKg: { jne: { reg: 36000, yes: 54000 }, jnt: { reg: 33000, express: 49000 }, sicepat: { reg: 34500, best: 52000 }, pos: { kilat: 30000, express: 45000 } },
        kecamatan: [
          { nama: "Pontianak Selatan", desa: [{ nama: "Benua Melayu Laut", kodePos: "78121" }, { nama: "Benua Melayu Darat", kodePos: "78122" }, { nama: "Akcaya", kodePos: "78124" }] },
          { nama: "Pontianak Kota", desa: [{ nama: "Darat Sekip", kodePos: "78112" }, { nama: "Mariana", kodePos: "78111" }, { nama: "Sungai Bangkong", kodePos: "78113" }] }
        ]
      }
    ]
  },
  {
    nama: "Kalimantan Tengah",
    kota: [
      {
        nama: "Kota Palangka Raya",
        ratePerKg: { jne: { reg: 40000, yes: 60000 }, jnt: { reg: 37000, express: 55000 }, sicepat: { reg: 38000, best: 58000 }, pos: { kilat: 33000, express: 50000 } },
        kecamatan: [
          { nama: "Pahandut", desa: [{ nama: "Pahandut", kodePos: "74811" }, { nama: "Langkai", kodePos: "74812" }, { nama: "Panarung", kodePos: "74813" }] }
        ]
      }
    ]
  },
  {
    nama: "Kalimantan Selatan",
    kota: [
      {
        nama: "Kota Banjarmasin",
        ratePerKg: { jne: { reg: 37000, yes: 56000 }, jnt: { reg: 34000, express: 51000 }, sicepat: { reg: 35000, best: 54000 }, pos: { kilat: 30000, express: 47000 } },
        kecamatan: [
          { nama: "Banjarmasin Tengah", desa: [{ nama: "Kertak Baru Ilir", kodePos: "70232" }, { nama: "Telawang", kodePos: "70233" }, { nama: "Pekapuran Laut", kodePos: "70234" }] }
        ]
      }
    ]
  },
  {
    nama: "Kalimantan Timur",
    kota: [
      {
        nama: "Kota Balikpapan",
        ratePerKg: { jne: { reg: 40000, yes: 58000 }, jnt: { reg: 37000, express: 53000 }, sicepat: { reg: 38000, best: 56000 }, pos: { kilat: 33000, express: 49000 } },
        kecamatan: [
          { nama: "Balikpapan Kota", desa: [{ nama: "Klandasan Ulu", kodePos: "76112" }, { nama: "Klandasan Ilir", kodePos: "76113" }, { nama: "Damai", kodePos: "76114" }] },
          { nama: "Balikpapan Selatan", desa: [{ nama: "Sepinggan", kodePos: "76115" }, { nama: "Manggar Baru", kodePos: "76117" }, { nama: "Damai Baru", kodePos: "76114" }] }
        ]
      },
      {
        nama: "Kota Samarinda",
        ratePerKg: { jne: { reg: 40000, yes: 58000 }, jnt: { reg: 37000, express: 53000 }, sicepat: { reg: 38000, best: 56000 }, pos: { kilat: 33000, express: 49000 } },
        kecamatan: [
          { nama: "Samarinda Kota", desa: [{ nama: "Bugis", kodePos: "75121" }, { nama: "Karang Mumus", kodePos: "75122" }, { nama: "Pelabuhan", kodePos: "75123" }] }
        ]
      }
    ]
  },
  {
    nama: "Kalimantan Utara",
    kota: [
      {
        nama: "Kota Tarakan",
        ratePerKg: { jne: { reg: 45000, yes: 65000 }, jnt: { reg: 42000, express: 60000 }, sicepat: { reg: 43000, best: 62000 }, pos: { kilat: 37000, express: 55000 } },
        kecamatan: [
          { nama: "Tarakan Tengah", desa: [{ nama: "Pamusian", kodePos: "77116" }, { nama: "Sebengkok", kodePos: "77115" }, { nama: "Kampung Satu Skip", kodePos: "77118" }] }
        ]
      }
    ]
  },
  {
    nama: "Sulawesi Selatan",
    kota: [
      {
        nama: "Kota Makassar",
        ratePerKg: { jne: { reg: 40000, yes: 62000 }, jnt: { reg: 38000, express: 56000 }, sicepat: { reg: 39000, best: 60000 }, pos: { kilat: 34000, express: 52000 } },
        kecamatan: [
          { nama: "Rappocini", desa: [{ nama: "Bonto Makkio", kodePos: "90222" }, { nama: "Rappocini", kodePos: "90224" }, { nama: "Mappala", kodePos: "90221" }] },
          { nama: "Tamalate", desa: [{ nama: "Jongaya", kodePos: "90244" }, { nama: "Bongaya", kodePos: "90243" }, { nama: "Pa'Baeng-Baeng", kodePos: "90246" }] }
        ]
      }
    ]
  },
  {
    nama: "Sulawesi Utara",
    kota: [
      {
        nama: "Kota Manado",
        ratePerKg: { jne: { reg: 55000, yes: 80000 }, jnt: { reg: 52000, express: 75000 }, sicepat: { reg: 53000, best: 78000 }, pos: { kilat: 46000, express: 68000 } },
        kecamatan: [
          { nama: "Wenang", desa: [{ nama: "Pinaesaan", kodePos: "95112" }, { nama: "Bumi Beringin", kodePos: "95115" }, { nama: "Wenang Selatan", kodePos: "95117" }] }
        ]
      }
    ]
  },
  {
    nama: "Sulawesi Tengah",
    kota: [
      {
        nama: "Kota Palu",
        ratePerKg: { jne: { reg: 50000, yes: 72000 }, jnt: { reg: 47000, express: 67000 }, sicepat: { reg: 48000, best: 70000 }, pos: { kilat: 42000, express: 62000 } },
        kecamatan: [
          { nama: "Palu Timur", desa: [{ nama: "Besusu Barat", kodePos: "94111" }, { nama: "Besusu Timur", kodePos: "94114" }, { nama: "Besusu Tengah", kodePos: "94112" }] }
        ]
      }
    ]
  },
  {
    nama: "Sulawesi Tenggara",
    kota: [
      {
        nama: "Kota Kendari",
        ratePerKg: { jne: { reg: 50000, yes: 72000 }, jnt: { reg: 47000, express: 67000 }, sicepat: { reg: 48000, best: 70000 }, pos: { kilat: 42000, express: 62000 } },
        kecamatan: [
          { nama: "Kendari Barat", desa: [{ nama: "Kandai", kodePos: "93111" }, { nama: "Bende", kodePos: "93121" }, { nama: "Sodohoa", kodePos: "93114" }] }
        ]
      }
    ]
  },
  {
    nama: "Gorontalo",
    kota: [
      {
        nama: "Kota Gorontalo",
        ratePerKg: { jne: { reg: 55000, yes: 78000 }, jnt: { reg: 52000, express: 73000 }, sicepat: { reg: 53000, best: 76000 }, pos: { kilat: 46000, express: 66000 } },
        kecamatan: [
          { nama: "Kota Selatan", desa: [{ nama: "Biawao", kodePos: "96112" }, { nama: "Limba B", kodePos: "96113" }, { nama: "Biawu", kodePos: "96116" }] }
        ]
      }
    ]
  },
  {
    nama: "Sulawesi Barat",
    kota: [
      {
        nama: "Kabupaten Mamuju",
        ratePerKg: { jne: { reg: 55000, yes: 78000 }, jnt: { reg: 52000, express: 73000 }, sicepat: { reg: 53000, best: 76000 }, pos: { kilat: 46000, express: 66000 } },
        kecamatan: [
          { nama: "Mamuju", desa: [{ nama: "Binanga", kodePos: "91512" }, { nama: "Karema", kodePos: "91511" }, { nama: "Mamunyu", kodePos: "91513" }] }
        ]
      }
    ]
  },
  {
    nama: "Nusa Tenggara Timur",
    kota: [
      {
        nama: "Kota Kupang",
        ratePerKg: { jne: { reg: 45000, yes: 66000 }, jnt: { reg: 42000, express: 61000 }, sicepat: { reg: 43000, best: 64000 }, pos: { kilat: 37000, express: 55000 } },
        kecamatan: [
          { nama: "Kelapa Lima", desa: [{ nama: "Kelapa Lima", kodePos: "85228" }, { nama: "Oesapa Selatan", kodePos: "85229" }, { nama: "Oesapa", kodePos: "85229" }] }
        ]
      }
    ]
  },
  {
    nama: "Maluku",
    kota: [
      {
        nama: "Kota Ambon",
        ratePerKg: { jne: { reg: 65000, yes: 95000 }, jnt: { reg: 60000, express: 88000 }, sicepat: { reg: 62000, best: 90000 }, pos: { kilat: 55000, express: 80000 } },
        kecamatan: [
          { nama: "Sirimau", desa: [{ nama: "Rijali", kodePos: "97127" }, { nama: "Honipopu", kodePos: "97128" }, { nama: "Batu Merah", kodePos: "97125" }] }
        ]
      }
    ]
  },
  {
    nama: "Maluku Utara",
    kota: [
      {
        nama: "Kota Ternate",
        ratePerKg: { jne: { reg: 68000, yes: 98000 }, jnt: { reg: 63000, express: 91000 }, sicepat: { reg: 65000, best: 95000 }, pos: { kilat: 57000, express: 83000 } },
        kecamatan: [
          { nama: "Ternate Selatan", desa: [{ nama: "Jati", kodePos: "97716" }, { nama: "Kalumata", kodePos: "97714" }, { nama: "Sasa", kodePos: "97711" }] }
        ]
      }
    ]
  },
  {
    nama: "Papua",
    kota: [
      {
        nama: "Kota Jayapura",
        ratePerKg: { jne: { reg: 95000, yes: 140000 }, jnt: { reg: 90000, express: 130000 }, sicepat: { reg: 92000, best: 136000 }, pos: { kilat: 80000, express: 120000 } },
        kecamatan: [
          { nama: "Jayapura Utara", desa: [{ nama: "Gurabesi", kodePos: "99111" }, { nama: "Mandala", kodePos: "99111" }, { nama: "Trikora", kodePos: "99112" }] },
          { nama: "Abepura", desa: [{ nama: "Kota Raja", kodePos: "99351" }, { nama: "Entrop", kodePos: "99222" }, { nama: "Vim", kodePos: "99352" }] }
        ]
      }
    ]
  },
  {
    nama: "Papua Barat",
    kota: [
      {
        nama: "Kota Sorong",
        ratePerKg: { jne: { reg: 90000, yes: 130000 }, jnt: { reg: 85000, express: 122000 }, sicepat: { reg: 87000, best: 126000 }, pos: { kilat: 75000, express: 112000 } },
        kecamatan: [
          { nama: "Sorong Barat", desa: [{ nama: "Remu", kodePos: "98411" }, { nama: "Majener", kodePos: "98414" }, { nama: "Klasabi", kodePos: "98412" }] }
        ]
      }
    ]
  }
]
