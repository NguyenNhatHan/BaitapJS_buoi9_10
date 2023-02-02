// Danh sách nhân viên
const staffList = [];
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
    console.log(staffList)
    // B2: khởi tạo object
    const staff = new Staff(id, name, email, password, day, salary, position, time);
    // B3: thêm staff vào staffList
    staffList.push(staff);
    //   B4: hiển thị danh sách staffList
    renderTable(staffList);
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
        <td>${staff.position()}</td>
        <td>${staff.totalSalary()}</td>
        <td>${staff.classify()}</td>
        </tr> 
        `;
    }
    getElement("#tableDanhSach").innerHTML = html;
    console.log(html)
    
}
function getElement(selector) {
    return document.querySelector(selector);
}
