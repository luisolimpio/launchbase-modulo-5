const currentPage = location.pathname
const menuItems = document.querySelectorAll(" header .links a ")

for(let item of menuItems){
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

function paginate(selectedPage, totalPages) {
    let pages = [],
        oldPage
    
    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {
        if(totalPages <= 7) {
            pages.push(currentPage)
        } 
        
        else {
            const firstAndLastPages = currentPage <= 2 || currentPage >= totalPages - 1
            const pageAfterSelectedPage = currentPage <= selectedPage + 1
            const pageBeforeSelectedPage = currentPage >= selectedPage - 1

            if(firstAndLastPages || pageAfterSelectedPage && pageBeforeSelectedPage) {
                if(oldPage && currentPage - oldPage > 2) {
                    pages.push("...")
                }

                if(oldPage && currentPage - oldPage == 2) {
                    pages.push(oldPage + 1)
                }

                pages.push(currentPage)

                oldPage = currentPage
            }
        }
    }

    return pages
}

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const total = +pagination.dataset.total
    const page = +pagination.dataset.page
    const pages = paginate(page, total)
    const pageStartRange = page - 1 > 0 ? page - 1 : 1
    const pageEndRange = page + 1 < pages.length - 1 ? page + 1 : pages.length

    let elements = filter ? 
        `<a href="?page=${pageStartRange}&filter=${filter}"><</a>` :
        `<a href="?page=${pageStartRange}"><</a>`

    for(let page of pages) {
        if(String(page).includes("...")) {
            elements += `<span>${page}</span>`
        } else {
            elements += filter ? 
                `<a href="?page=${page}&filter=${filter}">${page}</a>` :
                `<a href="?page=${page}">${page}</a>`
        }
    }

    elements += filter ? 
        `<a href="?page=${pageEndRange}&filter=${filter}">></a>` :
        `<a href="?page=${pageEndRange}">></a>`
        console.log(elements)

    pagination.innerHTML = elements
}

const pagination = document.querySelector(".pagination")

if(pagination) {
    createPagination(pagination)
}