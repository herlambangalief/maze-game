<?php
// Baca data POST yang dikirimkan dari JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Nama file CSV yang akan diubah
$filename = 'data.csv';

// Baca isi file CSV
$fileContent = file_get_contents($filename);

// Tambahkan hasil akhir baru ke dalam data CSV
$newResult = implode(',', $data); // Menggunakan data yang dikirimkan dari JavaScript
$fileContent .= "\n" . $newResult;

// Tulis kembali data CSV yang sudah diubah
file_put_contents($filename, $fileContent);

echo "File CSV berhasil diubah tanpa download file baru.";
?>