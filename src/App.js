import React, { useState } from "react";
import "./index.css";

const API_URL = "https://backend-giaoan-gdnn.onrender.com";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaiGiaoAn, setLoaiGiaoAn] = useState("lythuyet");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file đề cương.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("loai", loaiGiaoAn);

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/generate-docx`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Không thể tạo file .docx");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "giao_an_output.docx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Xuất file thất bại: " + error.message);
      console.error("Lỗi khi gọi API:", error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Tạo Giáo Án Tự Động</h1>

      <div className="flex justify-center gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            loaiGiaoAn === "lythuyet" ? "bg-blue-500 text-white" : "bg-white border"
          }`}
          onClick={() => setLoaiGiaoAn("lythuyet")}
        >
          Lý thuyết
        </button>
        <button
          className={`px-4 py-2 rounded ${
            loaiGiaoAn === "thuchanh" ? "bg-green-500 text-white" : "bg-white border"
          }`}
          onClick={() => setLoaiGiaoAn("thuchanh")}
        >
          Thực hành
        </button>
        <button
          className={`px-4 py-2 rounded ${
            loaiGiaoAn === "tichhop" ? "bg-orange-500 text-white" : "bg-white border"
          }`}
          onClick={() => setLoaiGiaoAn("tichhop")}
        >
          Tích hợp
        </button>
      </div>

      <div className="flex justify-center gap-2 mb-4">
        <input type="file" onChange={handleFileChange} className="border p-2" />
        <button
          onClick={handleSubmit}
          disabled={loading || !selectedFile}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Đang xử lý..." : "Tạo giáo án"}
        </button>
      </div>

      {selectedFile && (
        <p className="text-center text-sm text-gray-600">
          Đã chọn: <strong>{selectedFile.name}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
