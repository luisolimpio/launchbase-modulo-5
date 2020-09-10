const { age, graduation, date } = require("../../lib/utils")

const Teacher = require("../models/Teacher");

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
            callback(teachers) {
                const pagination = {
                    total: (teachers[0]) ? Math.ceil(teachers[0].total / limit) : 0,
                    page
                }

                return res.render("teachers/index", { teachers, pagination, filter })
            }
        }
        
        Teacher.paginate(params)
    },

    create(req, res){
        return res.render("teachers/create")
    },

    post(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == "")
                return res.send("Please fill all the required fields!")
        }
    
        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },

    show(req, res){
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found!")

            teacher.age = age(teacher.birth_date)
            teacher.subjects = teacher.subjects_taught.split(",")
            teacher.formation = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
        })    
    },

    edit(req, res){
        Teacher.find(req.params.id, function(teacher) {
            if (!teacher) return res.send("Teacher not found!")

            teacher.birth = date(teacher.birth_date).iso
            teacher.formation = teacher.education_level
            teacher.subjects = teacher.subjects_taught

            return res.render("teachers/edit", { teacher })
        })
    },

    update(req, res){
        const keys = Object.keys(req.body)
    
        for(key of keys){
            if(req.body[key] == "")
                return res.send("Please fill all the required fields!")
        }
        
        Teacher.update(req.body, function() {
            return res.redirect(`teachers/${req.body.id}`)
        })
    },

    delete(req, res){
        Teacher.delete(req.body.id, function() {
            return res.redirect("/teachers")
        })
    }

}