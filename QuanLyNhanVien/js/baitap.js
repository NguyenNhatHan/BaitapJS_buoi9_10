function Staff(id, name, email, password, day, salary, position, time) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.day = day;
    this.salary = salary;
    this.position = position;
    this.time = time;
}

Staff.prototype.position = function () {
    if (this.position === "boss") {
        return "Sếp";
    } else if (this.position === "manager") {
        return "Trưởng phòng";
    } else if (this.position === "staff") {
        return "Nhân viên";
    }
}

Staff.prototype.totalSalary = function () {
    if (this.position === "boss") {
        return this.salary * 3;
    } else if (this.position === "manager") {
        return this.salary * 2;
    } else if (this.position === "staff") {
        return this.salary;
    }
};
Staff.prototype.classify = function () {
    if (this.time >= 192) {
        return "Xuất sắc";
    }
    if (this.time >= 176) {
        return "Giỏi";
    }
    if (this.time >= 160) {
        return "Khá";
    } else {
        return "Trung bình";
    }

};