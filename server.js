const http = require('http');
const url = require('url');
const server = new http.Server(function(req, res){

    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);

    var userMess = [];

    function getForm() {
        let first_part = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Book</title>
            </head>
            <body>
                <h1>Guest Book</h1>
                <div id='posts'></div>
                <p>Hello, </p>`

        var mess = userMess.join('<br>');

        var second_part = `
                <form action='/get' method='get'>
                    <input type="text" name="username" placeholder="Name"/><br>
                    <input type="submit"/>
                </form>
            </body>
            </html>
            `
        return first_part+mess+second_part;
    }



    if(parsedUrl.pathname === '/echo' && parsedUrl.query.message){
        res.setHeader('Cache-control', 'no-cache');
        res.setHeader("Set-Cookie", "login=ok");
        res.end(parsedUrl.query.message);
    } else if(parsedUrl.pathname === '/form') {
        res.end(getForm());
    } else if (parsedUrl.pathname === '/get') {
        userMess.push(parsedUrl.query.username);
        res.end(getForm());
    } else {
        res.statusCode = 404; // Not Found
        res.end("Page not found");
    }
});


server.listen(3000, '127.0.0.1');