import log from '@ajar/marker'; 
import http from 'http';    
import URL from 'url';

const { PORT, HOST } = process.env;

//create an http web server
const server = http.createServer((req, res) => {
    
    const requestURL = URL.parse(`http://${HOST}:${PORT}${req.url}`, true);
    const {href, path: url, host, protocol, pathname, query: querystring } = requestURL
    const payload = { href, url, method: req.method, host, protocol, httpVersion:req.httpVersion, pathname, querystring, ['user-agent']: req.headers['user-agent'], connection:req.headers.connection }

    res.statusCode = 200;    
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('agenda', 'political')
    res.setHeader('anything', 'goes')
    res.end(JSON.stringify(payload));

    log.magenta(req.method,req.url);
});

//have the server listen to a given port
server.listen(PORT,HOST, err => {
    if(err) log.error(err);
    else log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
