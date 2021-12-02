
const product = {
    plainBurger: {
        name: 'GAMBURGER',
        price: 10000,
        kkal: 200,
        amount: 0,
        get sum() {
            return this.price * this.amount
        },
        get kkalSum() {
            return this.kkal * this.amount
        }
    },
    freshBurger: {
        name: 'GAMBURGER FRESH',
        price: 20500,
        kkal: 300,
        amount: 0,
        get sum() {
            return this.price * this.amount
        },
        get kkalSum() {
            return this.kkal * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kkal: 500,
        amount: 0,
        get sum() {
            return this.price * this.amount
        },
        get kkalSum() {
            return this.kkal * this.amount
        }
    }
}

const btn = document.querySelectorAll('.main__product-btn')

for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
        plusOrMinus(this)
    })
}

function plusOrMinus(el) {
    const parent = el.closest('.main__product'),
        num = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kkal = parent.querySelector('.main__product-kcall span'),
        parentId = parent.getAttribute('id'),
        attribute = el.getAttribute('data-symbol')

    if (attribute == '+' && product[parentId].amount < 10) {
        product[parentId].amount++
    } else if (attribute == '-' && product[parentId].amount > 0) {
        product[parentId].amount--
    }

    num.innerHTML = product[parentId].amount
    price.innerHTML = product[parentId].sum
    kkal.innerHTML = product[parentId].kkalSum
}

// LVL Counter
const lvlCount = document.querySelector('.header__timer-extra')
lvlCount.style.display = 'inline-block'
lvlCount.style.width = '85px'
lvlCount.style.textAlign = 'center'
lvlCount.style.fontWeight = '600'
lvlCount.style.transition = '300ms ease'


function randColor() {
    const letters = '0123456789ABCDEF'.split('')
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 14)]
    }
    return color
}

function counter(min, max) {
    lvlCount.innerHTML++
    lvlCount.style.color = `${randColor()}`
    if (lvlCount.innerHTML != max) {
        if (lvlCount.innerHTML >= (max - 10)) {
            setTimeout(() => {
                counter(0, 100)
                if (lvlCount.innerHTML == max) {
                    lvlCount.style.color = 'white'
                }
            }, 80 + (lvlCount.innerHTML * 1.5));
        } else {
            setTimeout(() => {
                counter(0, 100)
            }, 80);
        }

    }
}

counter(0, 100)

// Pic view
const view = document.querySelector('.view'),
    viewClose = view.querySelector('.view__close'),
    imagesInfo = document.querySelectorAll('.main__product-info')

for (let i = 0; i < imagesInfo.length; i++) {
    imagesInfo[i].addEventListener('dblclick', function () {
        showPic(this)
    })
}

function showPic(el) {
    const imgSrc = el.querySelector('.main__product-img').getAttribute('src')
    view.querySelector('img').setAttribute('src', imgSrc)
    view.classList.add('active')
    viewClose.addEventListener('click', () => view.classList.remove('active'))
}

// Bill

const addCartBtn = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = receipt.querySelector('.receipt__window'),
    receiptWindowOut = receipt.querySelector('.receipt__window-out'),
    receiptWindowBtn = receipt.querySelector('.receipt__window-btn'),
    mainProductNum = document.querySelectorAll('.main__product-num')
addCartBtn.addEventListener('click', () => {
    if (mainProductNum[0].innerHTML == 0 && mainProductNum[1].innerHTML == 0 && mainProductNum[2].innerHTML == 0) {
        alert('Siz hech nimani belgilamadingiz')
    } else {
        receipt.classList.add('active')
        bill()
    }
})

function bill() {
    const main = document.querySelectorAll('.main__product')
    let sum = 0

    receipt.style.display = 'block'
    setTimeout(() => {
        receipt.style.opacity = '1'
        receiptWindow.style.top = '35%'
    }, 500)
    for (let i = 0; i < main.length; i++) {
        let element = main[i],
            mainId = element.getAttribute('id'),
            amount = element.querySelector('.main__product-num').innerHTML,
            price = element.querySelector('.main__product-price span').innerHTML
        if (amount > 0) {
            receiptWindowOut.innerHTML += `<p><span class="text-left">${product[mainId].name}</span> <span class="text-right">${amount} * ${product[mainId].price} = ${price}</span></p>`
            sum += product[mainId].price * amount
        }
        if (i == main.length - 1) {
            receiptWindowOut.innerHTML += `<hr><p><span class="text-left">Jami</span> <span class="text-right">${sum} so'm</span></p>`
        }
    }


    console.log(receiptWindowOut);
}

receiptWindowBtn.addEventListener('click', () => window.location.reload());