
const express = require('express')
const utility = require('utility')
const superagent = require('superagent')
const cheesuperagent = require('superagent-charset')
const cheerio = require('cheerio')

const app = express()

const targetUrl = 'http://m.zgmht.com/company-26.html'

app.get('/', (req, res) => {
    superagent.get(targetUrl)
        .charset('gbk')
        .end((err, sres) => {

            if (err) {
                return next(err)
            }
            const $ = cheerio.load(sres.text, {
                decodeEntities: false
            })

            let str = ''

            $('#moreList li').each(function (idx, element) {
                const $tit1 = $('#moreList li .tit1').eq(idx);
                const $contact_person = $('#moreList li .contact_person').eq(idx);
                const $tel = $('#moreList li .tel').eq(idx);

                str += `${idx + 1}. ${$tit1.text()} - ${$contact_person.text()} - ${$tel.text()}<br/>`
            })

            res.send(str)
        })
})

app.listen(7777, () => {
    console.log('app is listening at port 7777')
})



