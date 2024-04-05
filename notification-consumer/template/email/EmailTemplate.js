class EmailTemplate{

    static async build(data, subject, appName){
        return `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" dir="ltr">
            <head>
            <style type="text/css">
                .link:link, .link:active, .link:visited {
                    color:#2672ec !important;
                    text-decoration:none !important;
                }
    
                .link:hover {
                    color:#4284ee !important;
                    text-decoration:none !important;
                }
            </style>
            <title></title>
        </head>
        <body>
        <table dir="ltr">
            <tr><td id="i1" style="padding:0; font-family:'Segoe UI Semibold', 'Segoe UI Bold', 'Segoe UI', 'Helvetica Neue Medium', Arial, sans-serif; font-size:17px; color:#707070;">${appName}</td></tr>
            <tr><td id="i2" style="padding:0; font-family:'Segoe UI Light', 'Segoe UI', 'Helvetica Neue Medium', Arial, sans-serif; font-size:41px; color:#2672ec;">${subject}</td></tr>
            <tr><td id="i3" style="padding:0; padding-top:25px; font-family:'Segoe UI', Tahoma, Verdana, Arial, sans-serif; font-size:14px; color:#2a2a2a;">${data}</td></tr>
            <tr><td id="i15" style="padding:0; padding-top:25px; font-family:'Segoe UI', Tahoma, Verdana, Arial, sans-serif; font-size:14px; color:#2a2a2a;">Thanks,</td></tr>
            <tr><td id="i16" style="padding:0; font-family:'Segoe UI', Tahoma, Verdana, Arial, sans-serif; font-size:14px; color:#2a2a2a;">The ${appName} Dev Team</td></tr>
        </table>
        </body>
        </html> `
    };
}

module.exports = EmailTemplate;