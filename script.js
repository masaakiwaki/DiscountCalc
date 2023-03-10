const hankaku2Zenkaku = (str) => {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
};

const findInteger = (str) => {
    return str.replace(/[^0-9.]/g, "");
};

const dotHankaku2Zenkaku = (str) => {
    return str.replace(/[．０-９]/g, function (wc) {
        var zen = "．。０１２３４５６７８９", han = "..0123456789"; return han[zen.indexOf(wc)];
    });
};

const isIntegerValidation = (str) => {
    str = hankaku2Zenkaku(str);
    str = dotHankaku2Zenkaku(str);
    str = findInteger(str);
    return Number(str);
};



const appdata = {
    data() {
        return {
            sourceAmount: "",
            discountAmount: "",
            differenceAmount: "",
            discountRate: "",
        }
    },
    methods: {
        calcSouceAmout() {
            this.discountAmount = isIntegerValidation(prompt('割引後の価格を入力してください。'))
            this.discountRate = isIntegerValidation(prompt('割引率を入力してください。'))
            this.sourceAmount = this.discountAmount / (100 - this.discountRate) * 100
            this.differenceAmount = this.sourceAmount - this.discountAmount
        },
        calcDiscountAmount() {
            this.sourceAmount = isIntegerValidation(prompt('元値を入力してください。'))
            this.discountRate = isIntegerValidation(prompt('割引率を入力してください。'))
            this.discountAmount = this.sourceAmount * (100 - this.discountRate) / 100      
            this.differenceAmount = this.sourceAmount - this.discountAmount
        },
        calcDiscountRate() {
            this.sourceAmount = isIntegerValidation(prompt('元値を入力してください。'))
            this.discountAmount = isIntegerValidation(prompt('割引後の価格を入力してください。'))
            this.discountRate = 100 - this.discountAmount / this.sourceAmount * 100
            this.differenceAmount = this.sourceAmount - this.discountAmount
        }
    }
}



let app = Vue.createApp(appdata).mount('#app')


