const payment = async (req, res) => {
    try {
      let acc_id = req.body.acc_id;
      let userid = req.body.userid;
      let ref = req.body.ref;
      let amount = req.body.amount;
      var data = qs.stringify({
        amount: amount,
        referenceNo: ref,
        backgroundUrl: "https://www.premo-ro.com/res.php",
        detail: userid,
        customerName: acc_id,
        token:
          "zrrww03dRXySvyek7JCqA+vAE5WMyyYpcXzMGynLYiUL7gjMhNKb9YWjIEZEapYAwDNgd9lm3SEnZpyC52MFUvBqYVcgYsIulXQTpzHu0aFlCGwAJ/3ukJFtlzXKeV3ZEOPvMqj78K1qRWvtYVe0eQdWtEk=",
      });
      var config = {
        method: "post",
        url: "https://api.gbprimepay.com/gbp/gateway/qrcode/",
        responseType: "arraybuffer",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
  
      await axios(config)
        .then(function (response) {
          // console.log(Buffer.from(response.data, "binary").toString("base64"));
          res.json(Buffer.from(response.data, "binary").toString("base64"));
        })
        .catch(function (error) {
          // console.log(error);
          res.json({ message: error.message });
        });
    } catch (error) {
      console.log({ message: error.message });
    }
  };