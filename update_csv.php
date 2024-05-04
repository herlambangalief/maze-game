<?php
// Baca data POST yang dikirimkan dari JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Nama file CSV yang akan diubah
$filename = 'data.csv';

// Baca isi file CSV
$fileContent = file_get_contents($filename);

// Pisahkan baris-baris CSV
$rows = explode("\n", $fileContent);

// Flag untuk menandai apakah baris kosong sudah ditemukan
$isEmptyRowFound = false;

// Periksa setiap baris
foreach ($rows as $index => $row) {
    // Jika baris kosong ditemukan
    if (empty($row)) {
        // Tambahkan data ke baris yang kosong
        $rows[$index] = implode(';', $data); // Menggunakan delimiter ;
        
        // Tandai bahwa baris kosong sudah ditemukan
        $isEmptyRowFound = true;
        
        // Hentikan pencarian
        break;
    }
}

// Jika tidak ada baris kosong yang ditemukan
if (!$isEmptyRowFound) {
    // Tambahkan data baru sebagai baris baru
    $rows[] = implode(';', $data); // Menggunakan delimiter ;
}

// Gabungkan kembali baris-baris CSV menjadi satu string
$fileContent = implode("\n", $rows);

// Tulis kembali data CSV yang sudah diubah
file_put_contents($filename, $fileContent);

echo "File CSV berhasil diubah tanpa download file baru.";
?>
