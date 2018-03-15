
const express = require('express')
const utility = require('utility')
const superagent = require('superagent')
const cheesuperagent = require('superagent-charset')
const cheerio = require('cheerio')

const app = express()

app.get('/', (req, res) => {
    superagent.get('http://m.zgmht.com/company.html')
        .charset('gbk')
        .end((err, sres) => {

            if (err) {
                return next(err)
            }
            const $ = cheerio.load(sres.text, {
                decodeEntities: false
            })
            let items = []

            $('#moreList li').each(function (idx, element) {
                const $tit1 = $('#moreList li .tit1').eq(idx);
                const $contact_person = $('#moreList li .contact_person').eq(idx);
                const $tel = $('#moreList li .tel').eq(idx);
                items.push({
                    cName: $tit1.text(),
                    name: $contact_person.text(),
                    tel: $tel.text()
                })
            })

            res.send(items)
        })
})

app.listen(7777, () => {
    console.log('app is listening at port 7777')
})



