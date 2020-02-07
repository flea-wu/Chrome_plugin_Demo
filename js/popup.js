var vm = new Vue({
    el: '#app',
    data: {
        msg: "hello",
        ipaddr: '',
        mytime: this.mytime = moment(new Date()).format('YYYY-MM-DD  hh:mm:ss')
    },
    methods: {
        clickme() {
            console.log("9999")
            // var bg = chrome.extension.getBackgroundPage();
            // bg.getWebCookies()

            console.log(this.ipaddr)
            let url = 'http://ip.taobao.com/service/getIpInfo.php?ip=47.103.25.180'
            axios.get(url).then(resp => {
                console.log(resp)
            }).catch(reason => {
                console.log(reason)
            })

        }
    }
})



// chrome.runtime.sendMessage("hello",resp => {
//     console.log(resp)
// })