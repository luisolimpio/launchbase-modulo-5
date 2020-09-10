const { date, grade } = require("../../lib/utils")

const Student = require("../models/Student");

module.exports = {
    index(req, res){
        let { limit, page, filter } = req.query

        limit = limit || 2
        page = page || 1
        let offset = limit * (page - 1)

        const params = {
            page,
            limit,
            offset,
            filter,
            callback(students) {
                const pagination = {
                    total: (students[0]) ? Math.ceil(students[0].total / limit) : 0,
                    page
                }

                return res.render("students/index", { students, pagination, filter })
            }
        }
        
        Student.paginate(params)
    },

    create(req, res){
        Student.teacherSelectOptions(function(options) {
            return res.render("students/create", { teacherOptions: options })
        })
    },

    post(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == "")
                return res.send("Please fill all the required fields!")
        }
    
        Student.create(req.body, function(student) {
            return res.redirect(`/students/${student.id}`)
        })
    },

    show(req, res){
        Student.find(req.params.id, function(student) {
            if (!student) return res.send("Student not found!")

            student.birth= date(student.birth_date).birthDay
            student.grade= grade(student.grade)
            student.weeklyWorkload = student.weekly_workload

            return res.render("students/show", { student })
        })    
    },

    edit(req, res){
        Student.find(req.params.id, function(student) {
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth_date).iso
            student.weeklyWorkload = student.weekly_workload

            Student.teacherSelectOptions(function(options) {
                return res.render("students/edit", { student, teacherOptions: options })
            })
        })
    },

    update(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == "")
                return res.send("Please fill all the required fields!")
        }
        
        Student.update(req.body, function() {
            return res.redirect(`students/${req.body.id}`)
        })
    },

    delete(req, res){
        Student.delete(req.body.id, function() {
            return res.redirect("/students")
        })
    }

}