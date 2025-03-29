import React, { useState } from "react";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loaiGiaoAn, setLoaiGiaoAn] = useState("ly_thuyet");
  const [ketQua, setKetQua] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLoaiChange = (event) => {
    setLoaiGiaoAn(event.target.value);
  };

  const handleSubmit = () => {
    setKetQua(`Đã tạo giáo án ${loaiGiaoAn.replace("_", " ")} từ file ${selectedFile?.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-center mb-4">Tạo Giáo Án Tự Động</h1>
          <div className="flex space-x-4 justify-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Lý thuyết</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Thực hành</button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded">Tích hợp</button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4">
          <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded cursor-pointer">Choose Files</label>
          <select className="bg-black text-white px-4 py-2 rounded" value={loaiGiaoAn} onChange={handleLoaiChange}>
            <option value="ly_thuyet">Lý thuyết</option>
            <option value="thuc_hanh">Thực hành</option>
            <option value="tich_hop">Tích hợp</option>
          </select>
          <button onClick={handleSubmit} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Tạo giáo án</button>
        </div>

        {selectedFile && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Đã chọn: <strong>{selectedFile.name}</strong>
          </div>
        )}

        {ketQua && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded shadow">
            {ketQua}
          </div>
        )}
      </div>
    </div>
  );
}
