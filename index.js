function calculateResult() {
  const Toan = parseFloat(document.getElementById("Toan").value);
  const Ly = parseFloat(document.getElementById("Ly").value);
  const Hoa = parseFloat(document.getElementById("Hoa").value);
  const region = parseFloat(document.getElementById("region").value);
  const priority = parseFloat(document.getElementById("priority").value);
  const standardScore = parseFloat(
    document.getElementById("standardScore").value
  );

  // Check if any subject score is zero
  if (Toan === 0 || Ly === 0 || Hoa === 0) {
    document.getElementById("result").innerText = "Rớt vì có môn bị điểm 0.";
    return;
  }

  //   tính tổng điểm bằng cách cộng điểm của ba môn, điểm khu vực và điểm ưu tiên.
  const totalScore = Toan + Ly + Hoa + region + priority;

  //   kiểm tra nếu tổng điểm (totalScore) lớn hơn hoặc bằng điểm chuẩn (standardScore). Nếu đúng, hiển thị thông báo "Đậu với tổng điểm: X" (trong đó X là tổng điểm). Nếu không, hiển thị thông báo "Rớt với tổng điểm: X".
  if (totalScore >= standardScore) {
    document.getElementById(
      "result"
    ).innerText = `Đậu với tổng điểm: ${totalScore}`;
  } else {
    document.getElementById(
      "result"
    ).innerText = `Rớt với tổng điểm: ${totalScore}`;
  }
}

//tính thuế
function calculateTax() {
  const name = document.getElementById("name").value;
  const tongThuNhapNam = parseFloat(document.getElementById("income").value);
  const soNguoiPhuThuoc = parseInt(document.getElementById("dependents").value);

  if (!name || isNaN(tongThuNhapNam) || isNaN(soNguoiPhuThuoc)) {
    document.getElementById("taxResult").innerText =
      "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  const giamTruBanThan = 11e6 * 12; // 11 triệu đồng/tháng
  const giamTruNguoiPhuThuoc = 4.4e6 * 12; // 4.4 triệu đồng/người/tháng

  const tongGiamTru = giamTruBanThan + soNguoiPhuThuoc * giamTruNguoiPhuThuoc;
  const thuNhapChiuThue = tongThuNhapNam - tongGiamTru;

  if (thuNhapChiuThue <= 0) {
    document.getElementById(
      "taxResult"
    ).innerText = `${name}, số tiền thu nhập không hợp lệ`;
    return;
  }

  let thuePhaiNop = 0;
  const bacThue = [5e6, 10e6, 18e6, 32e6, 52e6, 80e6];
  const thueSuat = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35];

  let thuNhapTinhThue = thuNhapChiuThue;
  for (let i = 0; i < bacThue.length; i++) {
    if (thuNhapTinhThue > bacThue[i]) {
      thuePhaiNop += bacThue[i] * thueSuat[i];
      thuNhapTinhThue -= bacThue[i];
    } else {
      thuePhaiNop += thuNhapTinhThue * thueSuat[i];
      break;
    }
  }
  if (thuNhapTinhThue > 0) {
    thuePhaiNop += thuNhapTinhThue * thueSuat[thueSuat.length - 1];
  }

  document.getElementById(
    "taxResult"
  ).innerText = `${name}, thuế thu nhập cá nhân phải nộp là: ${thuePhaiNop.toLocaleString(
    "vi-VN"
  )} đồng.`;
}

// tính tiền cap
function toggleConnections() {
  const customerType = document.getElementById("customerType").value;
  const connectionsDiv = document.getElementById("connectionsDiv");

  if (customerType === "doanhnghiep") {
    connectionsDiv.style.display = "block";
  } else {
    connectionsDiv.style.display = "none";
  }
}

function calculateCableBill() {
  const customerType = document.getElementById("customerType").value;
  const customerCode = document.getElementById("customerCode").value;
  const connections =
    parseInt(document.getElementById("connections").value) || 0;
  const premiumChannels =
    parseInt(document.getElementById("premiumChannels").value) || 0;

  if (!customerType || !customerCode || isNaN(premiumChannels)) {
    document.getElementById("billResult").innerText =
      "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  let totalBill = 0;

  if (customerType === "nhadan") {
    totalBill = 45000 + 205000 + 75000 * premiumChannels;
  } else if (customerType === "doanhnghiep") {
    totalBill = 150000 + 50000 * premiumChannels;
    if (connections > 10) {
      totalBill += 750000 + (connections - 10) * 50000;
    } else {
      totalBill += 750000;
    }
  }

  document.getElementById(
    "billResult"
  ).innerText = `Mã Khách Hàng ${customerCode}, tiền cáp phải trả là: ${totalBill.toLocaleString(
    "vi-VN",
    { style: "currency", currency: "VND" }
  )}`;
}
