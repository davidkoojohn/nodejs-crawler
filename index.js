
const express = require('express')
const utility = require('utility')
const superagent = require('superagent')
const cheesuperagent = require('superagent-charset')
const cheerio = require('cheerio')

const app = express()

app.get('/', (req, res) => {
    // const q = req.query.q
    // const md5Value = utility.md5(q)
    // res.send(md5Value)
    superagent.get('http://m.zgmht.com/company.html')
        .charset('gbk')
        .end((err, sres) => {
    // superagent.get('https://cnodejs.org/').end((err, sres) => {
        if (err) {
            return next(err)
        }

        const $ = cheerio.load(sres.text, {
            decodeEntities: false
        })
        let items = []
        /*$('#topic_list .topic_title').each(function (idx, element) {
            const $element = $(element);
            console.log(idx)
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            })
        })*/
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
        // console.log(sres.text)
    })
})

app.listen(7777, () => {
    console.log('app is listening at port 7777')
})



