/*
  CASE STUDIES: file ini satu-satunya yang perlu kamu edit untuk menambah studi kasus.
  Halaman utama dan halaman detail otomatis ikut berubah.

  Cara tambah: salin satu blok { ... } di bawah ke dalam daftar window.CASES,
  hapus tanda // di depannya, lalu isi. Pisahkan antar blok dengan koma.

  Aturan:
  - id     : unik, huruf kecil, tanpa spasi (dipakai di link: project-detail.html?id=ram-ssd-upgrade)
  - code   : label singkat untuk daftar (opsional), misal "HW-01"
  - status : jujur. Misal "Home lab" untuk praktik sendiri, "Real case" untuk kejadian nyata
  - sections: bebas jumlahnya. Tiap section punya heading dan boleh punya:
      text    : daftar paragraf
      list    : daftar poin
      ordered : true kalau list-nya langkah berurutan
      image   : { src: "Picture/nama-file.png", alt: "...", caption: "..." }
  - Pakai tanda kutip ganda "..." dan jangan lupa koma di akhir tiap baris.
*/
window.CASES = [
  // {
  //   id: "contoh-id",
  //   code: "XX-01",
  //   title: "Judul studi kasus",
  //   category: "Hardware",
  //   date: "October 2026",
  //   status: "Home lab",
  //   tools: ["Tool 1", "Tool 2"],
  //   summary: "Satu atau dua kalimat tentang masalah dan hasilnya.",
  //   sections: [
  //     { heading: "Problem",   text: ["Apa masalahnya?"] },
  //     { heading: "Diagnosis", text: ["Apa yang dicek dan apa temuannya?"] },
  //     { heading: "Solution",  ordered: true, list: ["Langkah 1", "Langkah 2"] },
  //     { heading: "Result",    text: ["Apa hasilnya?"],
  //       image: { src: "Picture/contoh.png", alt: "Deskripsi gambar", caption: "Keterangan gambar" } }
  //   ]
  // },
];
