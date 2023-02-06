// Danh sách nhân viên
let staffList = [];
// Hàm thêm nhân viên
function createStaff() {
    // B1 : Dom
    let id = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let day = getElement("#datepicker").value;
    let salary = getElement("#luongCB").value;
    let position = getElement("#chucvu").value;
    let time = getElement("#gioLam").value;

    // kiểm tra các input có hợp lệ hay không
    let isValid = validate()
    if (!isValid) {
        return;
    }

    // B2: khởi tạo object
    const staff = new Staff(id, name, email, password, day, salary, position, time);
    // B3: thêm staff vào staffList
    staffList.push(staff);
    // B4: hiển thị danh sách staffList
    renderTable(staffList);
    // B5: reset
    resetForm()
}

// Hàm tìm kiếm nhân viên theo xếp loại
function searchStaff() {
    // B1: DOM
    let search = getElement("#searchName").value;
    // B2: lọc những nhân viên theo xếp loại
    let newStaffList = staffList.filter((staff) => {
        let xeploai = staff.classify().toLowerCase();
        search = search.toLowerCase()
        return xeploai.indexOf(search) !== -1;
    })
    // B3: gọi hàm renderTable
    renderTable(newStaffList)
}

// Hàm xóa sinh viên theo id
function deleteStaff(staffId) {
    staffList = staffList.filter((staff) => {
        return staff.id !== staffId
    })

    renderTable(staffList);
}

// Hàm tìm nhân viên theo id để fill thông tin lên form
function selectStaff(staffId) {
    // B1: tìm nv muốn chỉnh sửa
    let selectedStaff = staffList.find((staff) => {
        return staff.id === staffId;
    })
    // B2: lấy thông tin nv tìm đc  để fill lên form
    getElement("#tknv").value = selectedStaff.id;
    getElement("#name").value = selectedStaff.name;
    getElement("#email").value = selectedStaff.email;
    getElement("#password").value = selectedStaff.password;
    getElement("#datepicker").value = selectedStaff.day;
    getElement("#luongCB").value = selectedStaff.salary;
    getElement("#chucvu").value = selectedStaff.position;
    getElement("#gioLam").value = selectedStaff.time;

    getElement("#btnThemNV").disabled = true;
    getElement("#tknv").disabled = true;
}

// Hàm hiển thị danh sách nhân viên ra table
function renderTable(staffList) {
    let html = "";
    for (let i = 0; i < staffList.length; i++) {
        let staff = staffList[i];
        html += `
        <tr>
        <td>${staff.id}</td>
        <td>${staff.name}</td>
        <td>${staff.email}</td>
        <td>${staff.day}</td>
        <td>${staff.rank()}</td>
        <td>${staff.totalSalary()}</td>
        <td>${staff.classify()}</td>
        <td>
            <button class="btn btn-primary" onclick="selectStaff('${staff.id}')">Chỉnh sửa</button>
            <button class="btn btn-danger" onclick="deleteStaff('${staff.id}')">Xóa</button>
        </td>
        </tr> 
        `;
    }
    getElement("#tableDanhSach").innerHTML = html;
    console.log(html)

}

// Hàm cập nhật thông tin nhan viên
function updateStaff() {
    // B1 : Dom
    let id = getElement("#tknv").value;
    let name = getElement("#name").value;
    let email = getElement("#email").value;
    let password = getElement("#password").value;
    let day = getElement("#datepicker").value;
    let salary = getElement("#luongCB").value;
    let position = getElement("#chucvu").value;
    let time = getElement("#gioLam").value;
    // B2: khởi tạo object
    const staff = new Staff(id, name, email, password, day, salary, position, time);
    // B3: cập nhật thông tin mới của student
    let index = staffList.findIndex((Staff) => {
        return staff.id === id
    });
    staffList[index] = staff;
    // B4 : renderTable
    renderTable(staffList)
    // B5: reset
    resetForm();
}

function getElement(selector) {
    return document.querySelector(selector);
}


// Hàm reset giá trị của các input
function resetForm() {
    getElement("#tknv").value = "";
    getElement("#name").value = "";
    getElement("#email").value = "";
    getElement("#password").value = "";
    getElement("#datepicker").value = "";
    getElement("#luongCB").value = "";
    getElement("#chucvu").value = "";
    getElement("#gioLam").value = "";

    getElement("#btnThemNV").disabled = false;
    getElement("#tknv").disabled = false;
}

// Validate trước khi  cho phép thêm, cập nhận nhân viên
function validate() {
    let isValidate = true;
    // ktra tai khoan id 
    let id = getElement("#tknv").value;
    if (!id.trim()) {
        isValidate = false;
        getElement("#tbTKNV").innerHTML = " Tài khoản không được để trống"
        getElement("#tbTKNV").style.display = "block";
    } else if (!/^[A-Za-z0-9]+$/.test(id) || id.length < 4 || id.length > 6) {
        isValidate = false;
        getElement("#tbTKNV").innerHTML = " Tài khoản không hợp lệ"
    } else {
        getElement("#tbTKNV").innerHTML = "";
    }
    // ktra ten
    let name = getElement("#name").value;
    if (!name.trim()) {
        isValidate = false;
        getElement("#tbTen").innerHTML = " Họ và tên không được để trống"
        getElement("#tbTen").style.display = "block";
    } else if (!/[a-z]|[A-Z]|\s/.test(name)) {
        isValid = false;
        getElement("#tbTen").innerHTML = "Tên nhân viên không hợp lệ";
        getElement("#tbTen").style.display = "block";
    } else {
        getElement("#tbTen").innerHTML = "";
    }
    // ktra email
    let email = getElement("#email").value;
    if (!email.trim()) {
        isValid = false;
        getElement("#tbEmail").innerHTML = "email nhân viên không được để trống";
        getElement("#tbEmail").style.display = "block";
    } else if (!/^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
        isValid = false;
        getElement("#tbEmail").innerHTML = "email nhân viên không hợp lệ";
    } else {
        getElement("#tbEmail").innerHTML = "";
    }
    // ktra password
    let password = getElement("#password").value;
    if (!password.trim()) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "Mật khẩu nhân viên không được để trống";
        getElement("#tbMatKhau").style.display = "block";
    } else if (
        !/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,10})/.test(password)) {
        isValid = false;
        getElement("#tbMatKhau").innerHTML = "Mật khẩu nhân viên không hợp lệ";
    }
    else {
        getElement("#tbMatKhau").innerHTML = "";
    }
    //Kiểm tra ngày làm
    let date = getElement("#datepicker").value;
    if (!date.trim()) {
        isValid = false;
        getElement("#tbNgay").style.display = "block";
        getElement("#tbNgay").innerHTML = "Ngày làm nhân viên không được để trống";
    } else if (
        !/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/.test(date)
    ) {
        isValid = false;
        getElement("#tbNgay").style.display = "block";
        getElement("#tbNgay").innerHTML = "Ngày làm nhân viên không hợp lệ";
    } else {
        getElement("#tbNgay").innerHTML = "";
    }
    //Kiểm tra lương cơ bản
    let salary = getElement("#luongCB").value;

    if (!salary.trim()) {
        isValid = false;
        getElement("#tbLuongCB").innerHTML = "Lương cơ bản không được để trống";
        getElement("#tbLuongCB").style.display = "block";
    }
    else if (!(salary >= 1_000_000 && salary <= 20_000_000)) {
        isValid = false;
        getElement("#tbLuongCB").innerHTML = "Lương cơ bản không hợp lệ";
        getElement("#tbLuongCB").style.display = "block";
    }
    else {
        getElement("#tbLuongCB").innerHTML = "";
    }
    // Ktra chức vụ
    let service = getElement("#chucvu").value;
    if (service === "Chọn chức vụ") {
        isValid = false;
        getElement("#tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
        getElement("#tbChucVu").style.display = "block";
    }
    else {
        getElement("#tbChucVu").innerHTML = "";
    }
    // ktra giờ làm
    let time = getElement("#gioLam").value;
    getElement("#tbGiolam").style.display = "block";

    if (!time.trim()) {
        isValid = false;
        getElement("#tbGiolam").innerHTML = "Số giờ làm không được để trống";
    }
    else if (!(time >= 80 && time <= 200)) {
        isValid = false;
        getElement("#tbGiolam").innerHTML = "Số giờ làm không hợp lệ";
    }
    else {
        getElement("#tbGiolam").innerHTML = "";
    }

    return isValidate;
}