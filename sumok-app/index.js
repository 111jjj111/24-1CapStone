const axiso = require("axios")
const gps = require("./data.json")

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
   }

async function put_data() {
    for (let index = 0; index < gps.length; index++) {
      const putdata = {
        data: {
            gps: gps[index]
        }
      }
      await axiso.put("http://113.198.229.225:1337/api/get-gps1s/1",putdata)
      console.log("위치 전송 완료 데이터 \n" + JSON.stringify(putdata));
      await sleep(2000)
    }

}
 put_data();