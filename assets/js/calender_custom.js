// :::::::::::::::::::: calender :::::::::::::::::::: //

let previous_value = moment().format('LL');
let dateElement = document.querySelector('#datepicker1');
const show_date = document.querySelector("#show_date");
show_date.textContent = previous_value;

dateElement.value = previous_value;

window.onload = function () {

    document.querySelector(".calender_area").addEventListener("click", () => {
        dateElement.click();
        show_date.textContent = previous_value;

        dateElement.addEventListener('datechanged', function (e) {
            if (e.target.value !== "") {
                previous_value = e.target.value;
            }
            if (e.target.value === "") {
                e.target.value = previous_value;
                show_date.textContent = previous_value;

            }
            else {
                show_date.textContent = e.target.value;
            }

        })

        duDatepicker('#datepicker1', {
            format: 'mmmm d, yyyy', range: false, clearBtn: true

        });
        document.querySelector('.dudp__buttons .clear').textContent = "Cancel";
    })


};
