
document.getElementById("rzp-button1").onclick = function (e) {
    var options = {
      key: "rzp_test_tOtH8qHPj6xmpL", 
      amount: 300 * 100, 
      currency: "INR",
      name: "MyShop Checkout",
      description: "This is your order", 
      theme: {
        color: "#000",
      },
      image:
        "https://i.pinimg.com/originals/7c/d7/81/7cd781a7a29b266d6efa30b01cd3a238.jpg",
    };
  
    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    // clear mycart - localStorage
    e.preventDefault();
  };