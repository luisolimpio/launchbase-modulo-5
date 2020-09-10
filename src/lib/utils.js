module.exports = {
    age: function(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth()

        if((month < 0) || (month == 0 && today.getDate() < birthDate.getDate())){
            age--
        }
        return age
    },

    graduation: function(formation){
        if(formation == "high") return "Ensino Médio Completo"
        if(formation == "college") return "Ensino Superior Completo"
        if(formation == "master") return "Mestrado"
        if(formation == "doctorate") return "Doutorado"
    },    

    grade: function(schoolYear){
        if(schoolYear == "5EF") return "5º Ano do Ensino Fundamental"
        if(schoolYear == "6EF") return "6º Ano do Ensino Fundamental"
        if(schoolYear == "7EF") return "7º Ano do Ensino Fundamental"
        if(schoolYear == "8EF") return "8º Ano do Ensino Fundamental"
        if(schoolYear == "9EF") return "9º Ano do Ensino Fundamental"
        if(schoolYear == "1EM") return "1º Ano do Ensino Médio"
        if(schoolYear == "2EM") return "2º Ano do Ensino Médio"
        if(schoolYear == "3EM") return "3º Ano do Ensino Médio"
    },

    date: function(timestamp){
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day: `${day}`,
            month: `${month}`,
            year: `${year}`,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    }
}