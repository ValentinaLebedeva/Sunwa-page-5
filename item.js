
const categoryItems = document.querySelectorAll(".category-item");
const product = document.querySelector(".item-row");
const itemsRow = document.querySelector(".item-row-add-img");
const itemsProduct = document.querySelectorAll(".item-add")
let mainImg = document.querySelector(".item-main-img");
const itemAddImages = document.querySelectorAll(".item-add-img");

const leftSlideBtn = document.querySelector(".arrow-link--prev");
const rightSlideBtn = document.querySelector(".arrow-link--next");

let itemInSlide = document.querySelector(".item-add");
let wrapperItems = document.querySelector(".item-row--img")

const downBtn = document.querySelector(".number-btn--down");
const upBtn = document.querySelector(".number-btn--up");
const itemAmount = document.querySelector(".item-number-input");


let pickedImgSrc, itemProduct, imgInSlide, chosenItemImg, pickedItem, mainImgSrc;

/* additing active class on side menu by item product brand */

categoryItems.forEach(function (item) {
    if (item.dataset.category == product.dataset.brand) {
        item.classList.add("category-item--active");
    }
})

/* change main picture by click on small ones in slide */

itemAddImages.forEach(function (item) {
    item.addEventListener("click", function () {
        pickedImgSrc = item.getAttribute("src");
        mainImg.setAttribute("src", pickedImgSrc);
        itemInSlide = this.closest(".item-add");

    })

})

/* click on image side btns */

/* click on next btn */

rightSlideBtn.addEventListener("click", nextBtn)

function nextBtn() {

    if (itemInSlide.nextElementSibling === null) {
        itemInSlide = document.querySelector(".item-add");
        imgInSlide = itemInSlide.firstElementChild;
    } else {
        itemInSlide = itemInSlide.nextElementSibling;
        imgInSlide = itemInSlide.firstElementChild;
    }
    pickedImgSrc = imgInSlide.getAttribute("src");
    mainImg.setAttribute("src", pickedImgSrc);
}

/* click on prev btn */

leftSlideBtn.addEventListener("click", prevBtn);

function prevBtn() {
    console.log()
    if (itemInSlide.previousElementSibling === null) {
        itemInSlide = itemsRow.lastElementChild;
        imgInSlide = itemInSlide.lastElementChild;
    } else {
        itemInSlide = itemInSlide.previousElementSibling;
        imgInSlide = itemInSlide.lastElementChild;
    }
    pickedImgSrc = imgInSlide.getAttribute("src");
    mainImg.setAttribute("src", pickedImgSrc);
}


/* additing active frame on slide picture */
/* changing active color frame */
wrapperItems.addEventListener("click", function (e) {

    chosenItemImg = document.querySelectorAll(`img[src="${pickedImgSrc}"]`)

    mainImgSrc = mainImg.getAttribute("src")
    itemAddImages.forEach(function (item) {
        pickedItem = item.getAttribute("src");

        if (mainImgSrc == pickedItem) {
            item.closest(".item-add").classList.add("item-add--active")
        } else {
            item.closest(".item-add").classList.remove("item-add--active")
        }
    })
})



/* amount btn, chaning total price and quantity of items */
/* changing total price depends on item amount */

let itemAmountValue = parseInt(itemAmount.value);
let totalAmountPriceText = document.querySelector(".total-amount-price");
let totalAmountPrice = parseInt(totalAmountPriceText.innerText.replace(/,/g, ""));
let itemPrice = parseInt(document.querySelector(".item-price--new-amount").innerText.replace(/,/g, ""))

upBtn.addEventListener("click", increaseAmount);
downBtn.addEventListener("click", decreaseAmount);

function increaseAmount() {
    itemAmountValue++;
    itemAmount.value = itemAmountValue;
    totalAmountPrice = totalAmountPrice + itemPrice;
    totalAmountPriceText.innerText = totalAmountPrice;

    totalAmountPriceText.innerText = totalAmountPriceText.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function decreaseAmount() {
    if (itemAmountValue <= 0) {
        itemAmount.value = 0;
        totalAmountPrice = 0;
    } else {
        itemAmountValue--;
        itemAmount.value = itemAmountValue;
        totalAmountPrice = totalAmountPrice - itemPrice;
    }

    totalAmountPriceText.innerText = totalAmountPrice;
    totalAmountPriceText.innerText = totalAmountPriceText.innerText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* getting item info */

const itemRow = document.querySelector(".item-row");
itemRow.setAttribute("data-cart", "added");
itemRow.setAttribute("data-number", 1);

let addedItemInfo;

brandName = itemRow.dataset.brand;
itemTitle = itemRow.querySelector(".item-title").innerText;
itemImg = itemRow.querySelector(".item-main-img").getAttribute("src");
itemCartValue = itemRow.dataset.cart;
itemNumber = parseInt(itemRow.dataset.number);
itemQuantity = itemAmountValue;
itemLink = "./item1.html";


/* add to the cart btn */
/* adding item to localStorage */

let dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));
let addedDataItem = dataAddedItemFromLocalStorage || [];

const addToCartBtn = document.querySelector(".add-cart-btn");

addToCartBtn.addEventListener("click", addToCart);

function addToCart() {

    addedItemInfo = {
        brandName: brandName,
        itemTitle: itemTitle,
        itemPrice: totalAmountPrice,
        itemImg: itemImg,
        itemCartValue: itemCartValue,
        itemNumber: itemNumber,
        itemQuantityCount: itemAmountValue,
        itemLink: itemLink
    }


    /* checking if item was already added then changing the amount in local Storage */
    if (addedDataItem.length != 0) {
        for (let item in addedDataItem) {
            if (addedDataItem[item].itemNumber == addedItemInfo.itemNumber) {
                addedDataItem[item].itemQuantityCount = addedDataItem[item].itemQuantityCount + addedItemInfo.itemQuantityCount;
            }
        }
    } else {
        addedDataItem.push(addedItemInfo);
    }

    console.log(addedDataItem)

    let dataToLocalStorage = JSON.stringify(addedDataItem)
    localStorage.setItem("addedItemtoStorage", dataToLocalStorage);
    dataAddedItemFromLocalStorage = JSON.parse(localStorage.getItem("addedItemtoStorage"));

    /* changing number in the cart header */

    cartNumberAmount = cartNumberAmount + addedItemInfo.itemQuantityCount;
    cartNumber.innerText = cartNumberAmount;

    console.log(cartNumberAmount)
    cartNumberAmountJSON = JSON.stringify(cartNumberAmount);

    localStorage.setItem("addedItemCartNumber", cartNumberAmountJSON);
    cartNumberAmount = parseInt(JSON.parse(localStorage.getItem("addedItemCartNumber")));
}

/* buy now btn */
const buyNowBtn = document.querySelector(".buy-btn");

buyNowBtn.addEventListener("click", buyNowFn);

function buyNowFn() {
    addToCart();
    window.open("cart.html", "_blank")
}

/* download files - chaning icon color */

const downloadLinkAll = document.querySelectorAll(".tech-doc-link");

downloadLinkAll.forEach(function (item) {

    item.addEventListener("mouseover", function () {
        for (let child of item.children) {
            if (child.hasAttribute("src")) {
                child.setAttribute("src", "./img/item/icon/download-icon-active.svg");
            }
        }
    });

    item.addEventListener("mouseout", function () {
        for (let child of item.children) {
            if (child.hasAttribute("src")) {
                if (child.getAttribute("src") == "./img/item/icon/download-icon-active.svg") {
                    child.setAttribute("src", "./img/item/icon/download-icon.svg");
                }
            }
        }
    });
});
