(function ($) {
    'use strict';

    // :::::::::::::::::::: side menu  ::::::::::::::::::::// 
    $(document).ready(function () {

        $('.menu-btn').click(function () {
            $('.side-bar').addClass('active');
        });

        $('.close-btn').click(function () {
            $('.side-bar').removeClass('active');
        });
    });

    // :::::::::::::::::::: side menu  ::::::::::::::::::::// 
    const $window = $(window);
    $window.on('load', function () {

        const $dom = $('html, body');
        const preLoader = $('#loading-area');

        /*========= Preloader =========*/
        $(preLoader).delay('750').fadeOut(1500);

    });

}(jQuery));



// :::::::::::::::::::: ripple effect :::::::::::::::::::: // 
$(document).ready(function () {
    $(document).on('click', '.ripple-button', function (e) {
        $btn = $(this);
        var $offset = $(this).offset();
        $span = $('<span/>');
        var x = e.pageX - $offset.left
        var y = e.pageY - $offset.top;
        $span.addClass('ripple-span');
        $span.css({
            top: y + 'px',
            left: x + 'px',
        });
        $btn.append($span);
        window.setTimeout(function () {
            $span.remove();
        }, 2200);
    });

});



// :::::::::::::::::::: tab :::::::::::::::::::: // 
// Show the first tab and hide the rest
$('#tabs-boxs .tab_btns:first-child ').addClass('tab_active');
$('.tabs_content').hide();
$('.tabs_content:first').show();

// Click function
$('#tabs-boxs .tab_btns').click(function () {
    $('#tabs-boxs .tab_btns').removeClass('tab_active');
    $(this).addClass('tab_active');
    $('.tabs_content').hide();

    var activeTab = $(this).find('a').attr('href');
    $(activeTab).fadeIn(500);
    return false;
});




// :::::::::::::::::::: dropdown :::::::::::::::::::: // 
// Get all the dropdown from document
document.querySelectorAll('.btn_icon_toggle').forEach(dropDownFunc);

// Dropdown Open and Close function
function dropDownFunc(dropDown) {
    console.log(dropDown.classList.contains('dropdown_toggles'));

    if (dropDown.classList.contains('dropdown_toggles') === true) {
        dropDown.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.nextElementSibling.classList.contains('dropdown-active') === true) {
                // Close the clicked dropdown
                this.parentElement.classList.remove('dropdown-open');
                this.nextElementSibling.classList.remove('dropdown-active');

            } else {
                // Close the opend dropdown
                closeDropdown();

                // add the open and active class(Opening the DropDown)
                this.parentElement.classList.add('dropdown-open');
                this.nextElementSibling.classList.add('dropdown-active');
            }
        });
    }

};

// Listen to the doc click
window.addEventListener('click', function (e) {

    // Close the menu if click happen outside menu
    if (e.target.closest('.tabs_plus_btn') === null) {
        // Close the opend dropdown
        closeDropdown();
    }

});

// Close the openend Dropdowns
function closeDropdown() {
    console.log('run');

    // remove the open and active class from other opened Dropdown (Closing the opend DropDown)
    document.querySelectorAll('.tabs_plus_btn').forEach(function (container) {
        container.classList.remove('dropdown-open')
    });

    document.querySelectorAll('.dropdown_list').forEach(function (menu) {
        menu.classList.remove('dropdown-active');
    });
};





// :::::::::::::::::::: selection Work :::::::::::::::::::: //

function addlist_selection(self) {
    let selected_option = null;
    const parentElement = self.parentElement.parentElement;
    let option_s = parentElement.querySelector(".option_s");
    option_s.classList.add("show_sbox");
    option_s.querySelector("#cancel_btn").addEventListener("click", () => {
        hide_sbox(option_s, selected_option);
    })
    option_s.querySelectorAll(".option_list").forEach(option => {
        if (option.getAttribute("data-value").toLowerCase() === self.getAttribute("data-value").toLowerCase()) {
            select_option(option);
            selected_option = option;
        }
        option.addEventListener("click", (event) => {
            event.preventDefault();
            if (selected_option !== null) {
                deselect_prev(selected_option);
            }

            select_option(option);
            selected_option = option;
        })
    })
    option_s.querySelector("#save_btn").addEventListener("click", () => {
        hide_sbox(option_s);
        update_ui(self, selected_option);
    })

}
function update_ui(self, selected_option) {
    self.setAttribute("data-value", selected_option.getAttribute("data-value"));
    self.querySelector("#select_data").textContent = self.getAttribute("data-value");

    deselect_prev(selected_option);
}
function hide_sbox(option_s, selected_option) {
    option_s.classList.remove("show_sbox");
    if (selected_option) {
        deselect_prev(selected_option);
    }
}
function select_option(option) {
    option.classList.add("op_list_active");
}
function deselect_prev(option) {
    option.classList.remove("op_list_active");
};




// :::::::::::::::::::: Counter / card  count_numbers :::::::::::::::::::: //
function Counter(self) {
    inputElement = self.parentElement.querySelector(".count_numbers");
    value = inputElement.value === "" ? 0 : parseInt(inputElement.value);
    if (self.getAttribute("to-do") === "inc") {
        //increase value

        if (value < 50) {
            value += 1;
        }

    }
    if (self.getAttribute("to-do") === "dec") {
        //decrese value in 
        if (value > 0) {
            value -= 1;
        }
    }
    inputElement.value = value;
};





// :::::::::::::::::::: search_area filter :::::::::::::::::::: //

function showModal(self) {
    let parent = self;
    while (true) {
        parent = parent.parentElement;
        if (parent.hasAttribute("data-value") && parent.getAttribute("data-value") === "search_filterArea") {
            break;
        }
    }
    let contain_span = parent.querySelector('#search_bxsF');
    let selected_item = []
    parent.querySelectorAll('.search_opc .search_op_list').forEach(item => {

        if (item.textContent.toLowerCase() === contain_span.textContent.toLowerCase()) {
            item.classList.add("active");
            selected_item.push(item)
        }
        item.addEventListener("click", (e) => {
            e.target.classList.add("active");
            selected_item.forEach(rm => {
                rm.classList.remove("active");
                selected_item = []
            })
            selected_item.push(e.target);
            contain_span.textContent = selected_item[0].textContent;
            parent.querySelector('.search_areaFModel').classList.add("open_searchFilter");
            let search_dataF = parent.querySelector(".search_dataF");
            if (search_dataF.value !== '') {
                search_dataF.value = '';
                parent.querySelectorAll(".search_opc .search_op_list").forEach(item => {
                    item.classList.remove('open_searchFilter');

                })
            }


        })

    })
    parent.querySelector('.search_areaFModel').classList.remove("open_searchFilter");
    parent.querySelector('.close_searchModel').addEventListener("click", () => {
        parent.querySelector('.search_areaFModel').classList.add("open_searchFilter");
        let search_dataF = parent.querySelector(".search_dataF");

        search_dataF.value = '';
        parent.querySelectorAll(".search_opc .search_op_list").forEach(item => {
            item.classList.remove('open_searchFilter');

        })
        parent.querySelector('.search-warning').classList.add('open_searchFilter');
        parent.querySelector('.search_ModelInfo .xmark').classList.add("open_searchFilter");

    })
    //search
    parent.querySelector(".search_dataF").addEventListener("keyup", function (evt) {
        var items = [];
        [].forEach.call(parent.querySelectorAll(".search_opc .search_op_list"), function (subject) {
            if (subject.textContent.indexOf(evt.target.value) === -1) {
                subject.classList.add("open_searchFilter");
            } else {
                subject.classList.remove("open_searchFilter");
                items.push(subject);
            }
        });
        if (items.length === 0) {

            parent.querySelector('.search-warning').classList.remove('open_searchFilter');

        }
        else {

            parent.querySelector('.search-warning').classList.add('open_searchFilter');

        }
        let input_search = parent.querySelector('.search_ModelInfo .search_dataF');
        if (input_search.value === "") {

            parent.querySelector('.search_ModelInfo .xmark').classList.add('open_searchFilter');
        }
        else {
            parent.querySelector('.search_ModelInfo .xmark').classList.remove("open_searchFilter");
        }

    }, false);
    //empty value
    parent.querySelector('.search_ModelInfo .xmark').addEventListener('click', (e) => {
        parent.querySelector('.search_ModelInfo .xmark').classList.add("open_searchFilter");
        parent.querySelector(".search_dataF").value = '';
        parent.querySelectorAll(".search_opc .search_op_list").forEach(item => {
            item.classList.remove('open_searchFilter');

        })
        parent.querySelector('.search-warning').classList.add('open_searchFilter');
    })

};



// :::::::::::::::::::: Add+ Remove- :::::::::::::::::::: //
//scroll div
function scroll(scrollDiv) {
    window.scrollTo({ top: scrollDiv.offsetTop, behavior: 'smooth' });
};
//clone content
function cloneMe(self) {
    let clone_item = self;

    while (true) {
        clone_item = clone_item.parentElement;
        if (clone_item.hasAttribute("data-value") && clone_item.getAttribute("data-value") === "clone-item") {
            break;
        }
    }
    parent_element = clone_item.parentElement;
    if (parent_element.children.length < 3) {
        let div = document.createElement('div');
        div.setAttribute("class", "sc_bx_area");
        div.setAttribute("data-value", 'clone-item');
        div.innerHTML = clone_item.innerHTML;
        div.querySelector(".minusBtn").classList.remove("showbtn_plus");
        let preview_img = div.querySelector('.image_up');
        if (preview_img !== null && preview_img.src !== "") {
            div.querySelector('.add_imgs').classList.add("show_img");
            div.querySelector(".img_upIcon").classList.remove("show_img");
        }
        parent_element.append(div);
        parent_element_children_length = parent_element.children.length;


        if (parent_element_children_length == 2) {
            clone_item.querySelector(".addBtn").classList.add("showbtn_plus");
        }
        else {
            clone_item.querySelector(".minusBtn").classList.add("showbtn_plus");
            clone_item.querySelector(".addBtn").classList.add("showbtn_plus");
            div.querySelector(".addBtn").classList.add("showbtn_plus");

        }
        // scroll(div);
    }


};
//remove clone 
function removeClone(self) {
    let clone_item = self;

    while (true) {
        clone_item = clone_item.parentElement;
        if (clone_item.hasAttribute("data-value") && clone_item.getAttribute("data-value") === "clone-item") {
            break;
        }
    }
    const parent_element = clone_item.parentElement;
    parent_element.removeChild(parent_element.lastElementChild)
    let content = parent_element.children;
    if (content.length == 2) {
        content[content.length - 1].querySelector('.plus_btnsc').classList.toggle('showbtn_plus');
        content[content.length - 1].querySelector(".minusBtn").classList.toggle("showbtn_plus");

    }
    else if (content.length == 1) {
        content[content.length - 1].querySelector('.plus_btnsc').classList.toggle('showbtn_plus');
    }
    // scroll(content[content.length - 1]);
};



// :::::::::::::::::::: image Upload :::::::::::::::::::: //

//show imag Pop up
function showImgPopup(self) {
    //alert_img_which
    let clone_item = self;

    while (true) {
        clone_item = clone_item.parentElement;
        if (clone_item.hasAttribute("data-value") && clone_item.getAttribute("data-value") === "clone-item") {
            break;
        }
    }

    clone_item.querySelector(".alert_img_which").classList.toggle("alert_modalimg");
    //remove popup
    clone_item.querySelector(".alert_img_which").addEventListener("click", (e) => {
        e.target.classList.remove("alert_modalimg");
    })

}
//executeInput self
function executeInput(self) {
    //<input type="file" id="img-upload" accept="image/*" hidden>
    const inputImg = document.createElement("input");
    inputImg.setAttribute("type", "file");
    inputImg.setAttribute("id", "img-upload");
    inputImg.setAttribute("accept", "image/*");
    inputImg.setAttribute("hidden", true);
    self.parentElement.append(inputImg);
    //update
    let parent = self.parentElement.parentElement.parentElement.parentElement;
    console.log(parent);
    parent.querySelector("#img-upload").click();



    parent.querySelector("#img-upload").addEventListener("change", (event) => {
        let img_div = parent.querySelector('.add_imgs');

        parent.querySelector('.alert_img_which').classList.remove('alert_modalimg');

        var output = parent.querySelector(".image_up");
        var reader = new FileReader();
        reader.onload = function () {
            output.src = reader.result;
            console.log(" I am in reader onload")
        };
        reader.onloadend = function () {
            let icon = parent.querySelector(".img_upIcon");
            img_div.classList.remove("show_img");
            icon.classList.add("show_img");
            console.log("I am in onloadend")
        }
        reader.readAsDataURL(event.target.files[0]);
        parent.querySelector(".img_deleted_btn").addEventListener("click", (e) => {
            event.target.value = null;
            let img_div = parent.querySelector('.add_imgs');
            let icon = parent.querySelector(".img_upIcon");
            icon.classList.remove("show_img");
            img_div.classList.add("show_img");
            output.src = "";
        })

    })

};



////Devolucion_Add Check and Uncheck 

document.querySelectorAll('.return-check-uncheck').forEach(content => {
    content.querySelector('.check_then44').addEventListener('click', (event) => {

        content.querySelector('.check_open').classList.toggle("show44");

    })
})


