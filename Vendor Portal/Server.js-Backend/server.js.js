const express = require('express');
const unirest = require('unirest');
const cors = require('cors');
var xml2js = require("xml2js");
const bodyparser = require("body-parser");
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const app = express();const port = 2000;
app.use(bodyparser.json());app.use(cors());
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
app.use(function (req, res, next) 
{
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin,X-Requested-with,Content-Type,Accept");
     next();
    });
    app.listen(port, () => { console.log("running at 2000");
})

app.post('/pr',async function(req,res){
    var USERID = req.body.USERID;
    var PASSWORD = req.body.PASSWORD;
    console.log(USERID);
    var req = unirest('POST', 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_PROFILESS&receiverParty=&receiverService=&interface=SI_VP_PROFILESS&interfaceNamespace=http://vendorportalss.com')

    .headers({
    'Content-Type': 'text/xml;charset=UTF-8',
    'soap-action': 'http://sap.com/xi/WebService/soap1.1',
    'Authorization': 'Basic cG91c2VyQDI6MjAyMkBUZWNo',
    'Cookie': 'MYSAPSSO2=AjExMDAgAA9wb3J0YWw6cG91c2VyQDKIAAdkZWZhdWx0AQAIUE9VU0VSQDICAAMwMDADAANLUE8EAAwyMDIzMDEyOTA3NDUFAAQAAAAICgAIUE9VU0VSQDL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjMwMTI5MDc0NTE5WjAjBgkqhkiG9w0BCQQxFgQUMQbu5D9IWqlls2vtRWvdIO5T72wwCQYHKoZIzjgEAwQvMC0CFQDb8Ra8XVbKTiGSrW1UVxcm2WIdmQIUEs67AEsDun9J9v4V56ESt%2FHL1Oo%3D; JSESSIONID=hY_dzOMHjxM0bofelEd5-jiL3Hz8hQF-Y2kA_SAPzvMbNzlbkR9gWBvnS2HFYKQP; saplb_*=(J2EE6906720)6906750'
})
    .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_PROFILE_SS><!--You may enter the following 2 items in any order--><CUSTOMERID>0000000005</CUSTOMERID><CUST_INFO><!--Zero or more repetitions:--></CUST_INFO></urn:ZFM_VP_PROFILE_SS></soapenv:Body></soapenv:Envelope>')
    .end(function (result) {
      if (result.error) {
        console.log(result.error);
        }
      else {
        VENDORID = result.body;
        var result;
        var parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(VENDORID, function (err, result) {
            if (err) {
                console.error('xml2js.parseString: Error occurred: ', err);
            } 
              result1 = JSON.stringify(result['SOAP:Envelope']['SOAP:Body']['ns0:ZFM_VP_PROFILE_SS.Response']["CUST_INFO"]["item"]);
                 //console.log(JSON.stringify(result["env:Envelope"]["env:Body"]["n0:ZRRC_FGResponse"]["STATUS"]));
            //console.log(this.res);
        });
    }
    console.log(this.result1);
    res.send(this.result1);
})
})


    app.post('/user', (req, res) => {
        var USERID = req.body.USERID;
        var PASSWORD = req.body.PASSWORD;
        console.log(USERID);
    
        var req = unirest('POST', 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_LOGINSS_SS&receiverParty=&receiverService=&interface=SI_VP_LOGIN_SS&interfaceNamespace=http://vendorportalss.com')
            .header({
                'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
                'Content-Type': 'application/soap+xml'
            })
            .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_LOGIN_SS><!--You may enter the following 2 items in any order--><IM_CUSTOMER_ID>' +USERID+ '</IM_CUSTOMER_ID><IM_PASSWORD>' +PASSWORD+ '</IM_PASSWORD></urn:ZFM_VP_LOGIN_SS></soapenv:Body></soapenv:Envelope>')
            .end(function (result) {
                if (result.error) {
                    console.log(result.error);
                }
                else {
                    USERID = result.body;
                    var result;
                    var parser = new xml2js.Parser({ explicitArray: false });
                    parser.parseString(USERID, function (err, result) {
                        if (err) {
                            console.error('xml2js.parseString: Error occurred: ', err);
                        } 
                            result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_LOGIN_SS.Response"]["RESULT"]);
                            // console.log(JSON.stringify(result["env:Envelope"]["env:Body"]["n0:ZFM_CUSTOMERResponse"]["RESULT"]));
                        // console.log(this.res);
                    });
                }
                console.log(this.result1);
                res.json(this.result1);
            })
    });

    
app.post('/payage', (req, res) => {
    const USERID = req.body.USERID;
    // const USERID = 1;
    console.log(USERID);
    unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_PAYAGE_SS&receiverParty=&receiverService=&interface=SI_VP_PAYAGE_SS&interfaceNamespace=http://vendorportalss.com')
    .headers({
    'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
    'Content-Type': 'application/soap+xml'
    })
    .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_PAYAGE_SS><USERID>' +USERID+ '</USERID></urn:ZFM_VP_PAYAGE_SS></soapenv:Body></soapenv:Envelope>')
    .end((result) => {
    if (result.error) {
    console.log(result.error);
    } else {
    let result1;
    const parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(result.body, (err, result) => {
    if (err) {
    console.error('xml2js.parseString: Error occurred: ', err);
    }
    result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_PAYAGE_SS.Response"]["PAYAGE"]["item"]);
    });
    console.log(result1);
    res.send(result1);
    }
    });
    });

app.post('/po', (req, res) => {
        const USERID = req.body.USERID;
        // const USERID = 1;
        console.log(USERID);
        unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VPURCHASE_SS&receiverParty=&receiverService=&interface=SI_VP_PURCHASE_SS&interfaceNamespace=http://vendorportalss.com')
        .headers({
        'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
        'Content-Type': 'application/soap+xml'
        })
        .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_PURCHAE_SS><!--You may enter the following 2 items in any order--><USERID>5</USERID><PO><!--Zero or more repetitions:--></PO></urn:ZFM_VP_PURCHAE_SS></soapenv:Body></soapenv:Envelope>')
        .end((result) => {
        if (result.error) {
        console.log(result.error);
        } else {
        let result1;
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(result.body, (err, result) => {
        if (err) {
        console.error('xml2js.parseString: Error occurred: ', err);
        }
        result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_PURCHAE_SS.Response"]["PO"]["item"]);
        });
        console.log(result1);
        res.send(result1);
        }
        });
        })

app.post('/cred', (req, res) => {
            const USERID = req.body.USERID;
            // const USERID = 1;
            console.log(USERID);
            unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_CREDIT_SS&receiverParty=&receiverService=&interface=SI_VP_CREDIT_SS&interfaceNamespace=http://vendorportalss.com')
            .headers({
            'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
            'Content-Type': 'application/soap+xml'
            })
            .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_CREDITDEBIT_SS><!--You may enter the following 3 items in any order--><USERID>' +USERID+ '</USERID><CREDIT><!--Zero or more repetitions:--></CREDIT><DEBIT><!--Zero or more repetitions:--></DEBIT></urn:ZFM_VP_CREDITDEBIT_SS></soapenv:Body></soapenv:Envelope>')
            .end((result) => {
            if (result.error) {
            console.log(result.error);
            } else {
            let result1;
            const parser = new xml2js.Parser({ explicitArray: false });
            parser.parseString(result.body, (err, result) => {
            if (err) {
            console.error('xml2js.parseString: Error occurred: ', err);
            }
            result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_CREDITDEBIT_SS.Response"]["CREDIT"]["item"]);
            });
            console.log(result1);
            res.send(result1);
            }
            });
            })


app.post('/debit', (req, res) => {
    const USERID = req.body.USERID;
    // const USERID = 1;
    console.log(USERID);
    unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_CREDIT_SS&receiverParty=&receiverService=&interface=SI_VP_CREDIT_SS&interfaceNamespace=http://vendorportalss.com')
    .headers({
    'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
    'Content-Type': 'application/soap+xml'
    })
    .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_CREDITDEBIT_SS><!--You may enter the following 3 items in any order--><USERID>' +USERID+ '</USERID><CREDIT><!--Zero or more repetitions:--></CREDIT><DEBIT><!--Zero or more repetitions:--></DEBIT></urn:ZFM_VP_CREDITDEBIT_SS></soapenv:Body></soapenv:Envelope>')
    .end((result) => {
    if (result.error) {
    console.log(result.error);
    } else {
    let result1;
    const parser = new xml2js.Parser({ explicitArray: false });
    parser.parseString(result.body, (err, result) => {
    if (err) {
    console.error('xml2js.parseString: Error occurred: ', err);
    }
    result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_CREDITDEBIT_SS.Response"]["DEBIT"]["item"]);
    });
    console.log(result1);
    res.send(result1);
    }
    });
    })



    app.post('/goods', (req, res) => {
        const USERID = req.body.USERID;
        // const USERID = 1;
        console.log(USERID);
        unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_GOODS_SS&receiverParty=&receiverService=&interface=SI_VP_GOODS_SS&interfaceNamespace=http://vendorportalss.com')
        .headers({
        'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
        'Content-Type': 'application/soap+xml'
        })
        .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_GOODSRECEIPT_SS><!--You may enter the following 4 items in any order--><USERID>' +USERID+ '</USERID><GOODS_HEAD><!--Zero or more repetitions:--></GOODS_HEAD><GOODS_ITEM><!--Zero or more repetitions:--></GOODS_ITEM><RECEIPT><!--Zero or more repetitions:--></RECEIPT></urn:ZFM_VP_GOODSRECEIPT_SS></soapenv:Body></soapenv:Envelope>')
        .end((result) => {
        if (result.error) {
        console.log(result.error);
        } else {
        let result1;
        const parser = new xml2js.Parser({ explicitArray: false });
        parser.parseString(result.body, (err, result) => {
        if (err) {
        console.error('xml2js.parseString: Error occurred: ', err);
        }
        result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_GOODSRECEIPT_SS.Response"]["GOODS_ITEM"]["item"]);
        });
        console.log(result1);
        res.send(result1);
        }
        });
        })
        

            
        app.post('/vinv', (req, res) => {
            const USERID = req.body.USERID;
            // const USERID = 1;
            console.log(USERID);
            unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_INVENTORY_SS&receiverParty=&receiverService=&interface=SI_VP_INVENTORY_SS&interfaceNamespace=http://vendorportalss.com')
            .headers({
            'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
            'Content-Type': 'application/soap+xml'
            })
            .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_INVENTORY_SS><USERID>5</USERID></urn:ZFM_VP_INVENTORY_SS></soapenv:Body></soapenv:Envelope>')
            .end((result) => {
            if (result.error) {
            console.log(result.error);
            } else {
            let result1;
            const parser = new xml2js.Parser({ explicitArray: false });
            parser.parseString(result.body, (err, result) => {
            if (err) {
            console.error('xml2js.parseString: Error occurred: ', err);
            }
            result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_INVENTORY_SS.Response"]["INVOICE_ITEM"]["item"]);
            });
            console.log(result1);
            res.send(result1);
            }
            });
            })

            app.post('/vrfq', (req, res) => {
                const USERID = req.body.USERID;
                // const USERID = 1;
                console.log(USERID);
                unirest.post('http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VP_RFQS&receiverParty=&receiverService=&interface=SI_VP_RFQ_SS&interfaceNamespace=http://vendorportalss.com')
                .headers({
                'Authorization': 'Basic cG91c2VyQDE6MjAyMkBUZWNo',
                'Content-Type': 'application/soap+xml'
                })
                .send('<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions"><soapenv:Header/><soapenv:Body><urn:ZFM_VP_RFQ_SS><!--You may enter the following 2 items in any order--><USERID>' +USERID+ '</USERID><QUOTATION><!--Zero or more repetitions:--></QUOTATION></urn:ZFM_VP_RFQ_SS></soapenv:Body></soapenv:Envelope>')
                .end((result) => {
                if (result.error) {
                console.log(result.error);
                } else {
                let result1;
                const parser = new xml2js.Parser({ explicitArray: false });
                parser.parseString(result.body, (err, result) => {
                if (err) {
                console.error('xml2js.parseString: Error occurred: ', err);
                }
                result1 = JSON.stringify(result["SOAP:Envelope"]["SOAP:Body"]["ns0:ZFM_VP_RFQ_SS.Response"]["QUOTATION"]["item"]);
                });
                console.log(result1);
                res.send(result1);
                }
                });
                })

     