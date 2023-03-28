const naviurl = "/hardware_pos_system/util/path_config/get_link.php";
let geturl = async (urlname) => {
    let url;
    let formData = new FormData();
    formData.append("url_name", urlname);

    await fetch(naviurl, { method: "POST", body: formData })
        .then((res) => res.text())
        .then((text) => {
            url = text;
        });

    return url;
};

const loadDescripions = async () => {
    let url = await geturl("expenses_load_description");
    let description = [];
    await fetch(url, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
            description = data;
        })
    console.log(description)
    return description;



}


const data = await loadDescripions();
const description = document.querySelector("#description");
const resultsHTML = document.querySelector("#results");
const category = document.querySelector("#category");
const amount = document.querySelector("#amount");
const add_expenses_btn = document.querySelector("#add_expenses_btn");

category.addEventListener('change', () => {

    changeCategoryValue(description.value);
})
description.addEventListener('input', () => {
    let results = [];
    const userInput = description.value;
    resultsHTML.innerHTML = "";
    if (userInput.length > 0) {
        results = getResults(userInput);
        resultsHTML.style.display = "block";
        for (let i = 0; i < results.length; i++) {
            resultsHTML.innerHTML += "<ul>" + results[i] + "</ul>";
        }
    }


})

description.addEventListener('blur', () => {
    changeCategoryValue(description.value);
})

function getResults(input) {
    const results = [];
    for (let i = 0; i < data.length; i++) {
        if (input === data[i].slice(0, input.length)) {
            results.push(data[i]);
        }
    }
    return results;
}


resultsHTML.addEventListener('click', (event) => {

    const setValue = event.target.innerText;
    description.value = setValue;
    changeCategoryValue(setValue);
    this.innerHTML = "";
}
)

const changeCategoryValue = async (description) => {
    let url = await geturl("match_category_description");
    const form = new FormData();
    form.append("description", description);
    await fetch(url, { method: "POST", body: form })
        .then((res) => res.text())
        .then((data) => {
            if (data !== "new one") {
                console.log("not new one ");
                document.querySelector("#category").value = data;
            }
        })


}
let addExpenses = async () => {
    let url = await geturl("add_expenses");
    const form = new FormData();
    form.append("amount", amount.value);
    form.append("description", description.value);
    form.append("category", category.value);
    await fetch(url, { method: "POST", body: form })
        .then((res) => res.text())
        .then((data) => {
            console.log(data);
        })

}
add_expenses_btn.addEventListener('click', () => {
    addExpenses();
});