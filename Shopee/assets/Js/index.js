const removeVK = function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  return str;
}

const getProductApi = () => {
  let data = [];
  let listData = document.querySelector(".list-data");

  const mapDatas = (data) => {
    const datas = data.map((item) => {
      
      return `
          <h3>
            ${item.name}
          </h3>
        `;
      });

    return datas;
  }
  
  
  const respon = fetch('https://63311c61cff0e7bf70e64c8e.mockapi.io/product/api/seach/products')
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      for (var i of response) { 
        data.push(i)
      }
      listData.innerHTML = "";
      const element = document.createElement("div");
      element.classList.add("data-item");
        const mapData = mapDatas(data);
        // element.innerHTML = mapData;
          listData.appendChild(element);
          let search = document.getElementById('search');
          
          if(search) {
            search.onchange = (event) => {
              const {name, value} = event.target;
              const valueNew = removeVK(value.toLowerCase());
              const filterData = data.filter((item =>
                removeVK(item.name).toLowerCase().includes(valueNew)));
              // console.log("abc",filterData);
              const displayData = mapDatas(filterData);
              element.innerHTML = value ? displayData : " ";
            };
          }
          
      })
}

getProductApi();

const getProductsToCart = () => {
  const cart = [];
  // const cartLink = document.getElementsByClassName('.header__cart-link')
  const cancel = document.getElementsByClassName('.cancel-order')
  const btns = document.querySelectorAll('.addToCart');
  btns.forEach(function (btn,index) {
    btn.addEventListener('click', function (e) {
      const btnItems = e.target;
      const element = btnItems.parentElement.children;
      const imgProduct = element[0].children[1].src;
      const nameProduct = element[1].children[0].innerText;
      const priceProduct = element[1].children[2].children[0].children[0].innerText;
      let obj = {
        name : nameProduct,
        img : imgProduct,
        price : priceProduct
      }
      cart.push(obj);
      // console.log(cart);
      if(cart.length > 0){
        // cartLink.style.display = 'none';
        const displayCart = document.getElementById('cart-list');
        displayCart.innerHTML = "";
        const product = document.createElement("div");
        product.classList.add("cart-element");
        product.innerHTML = cart.map((item => {
          return `
          <div style="display :flex;margin :20px auto;align-item :center">
          <img style="width :70px;margin-left:20px" src="${item.img}">
          <span style ="color :red;font-size :1.5rem;margin:2rem " >${item.name}</span>
          <span style ="color :red;font-size :1.5rem;margin :2rem">${item.price}</span>
          <button style ="color :red;font-size :1.5rem;margin :2rem;border :none; background :transperent" class="cancel-order" >Hủy đơn</button>
         </div>`;
        }))
        displayCart.appendChild(product);
        // const mapElements = mapElement(cart);
        // console.log(mapElements);
        // for( let i = 0; i < cart.length;i++){
        //     cancel.onclick = (event) =>{
        //     const element = event.target;
        //     cart[i].splice(i,1);
        //   }
        // }
      }
    })
  })
  

  // if(cart.length > 0){
  //   const displayCart = document.getElementById('cart-list');
  //   displayCart.innerHTML = "";
  //   const product = document.createElement("div");
  //   product.classList.add("cart-element");
  //   product.innerHTML = cart.map((item => {
  //     return `
  //     <img src="${item.imgProduct}">
  //     <span>${item.nameProduct}</span>
  //     <span>${item.priceProduct}</span>
  //    `;
  //   }))
  //   displayCart.appendChild(product);
  //   // const mapElements = mapElement(cart);
  //   // console.log(mapElements);
  // }
}


getProductsToCart();

// // console.log("getProductsToCart", result);

// //get element and push to array

// const btns = document.querySelectorAll('.addToCart');
// btns.forEach(function (btn,index) {
//   btn.addEventListener('click', function (e) {
//     const btnItems = e.target;
//     const element = btnItems.parentElement.children;
//     const imgProduct = element[0].children[1].src;
//     const nameProduct = element[1].children[0].innerText;
//     const priceProduct = element[1].children[2].children[0].children[0].innerText;
//     getProductsToCart(imgProduct, nameProduct, priceProduct);
//   })
// })

// const getProductsToCart = (imgProduct, nameProduct, priceProduct) =>{
//   const cartList = document.getElementsByClassName("cart__container")
//   cartList.innerHTML = "";
//   const getProducts = '<div style="display: flex; align-items: center;"><img style="width:60px;" src="'+imgProduct+'"><span style="font-size:1.2rem;color:red;">'+nameProduct+'</span><span style="font-size:1.2rem;color:red;">'+priceProduct+'</span></div>'
//   const productItem = document.createElement("div");
//   productItem.innerHTML = getProducts ;
//   cartList.appendChild(productItem);
// }

// getProductsToCart();