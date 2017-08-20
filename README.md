# React Server-Side Rendering Walkthrough
### For:<br>[React Router v4](https://github.com/ReactTraining/react-router),<br>[react-router-redux v5](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-redux),<br>[React Router Config v1](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config) 

A fully annotated Demo for SSR with rr@v4 and rrr@v5

<b><i>Currently WIP</i></b>
@TODO: Docs, unit tests

-----
### Installation

1) `git clone https://github.com/jgliner/react-router-v4-redux-ssr`
2) `cd react-router-v4-redux-ssr`
3) Install (`yarn` is recommended, but `npm install` works just as well)

------
### Development

`npm run dev` will start a `webpack-dev-server` on `localhost:3005`

- HMR is enabled

------
### Production

`npm run start` will:
1) Clear the `/dist` folder
2) Build, concat, and optimize the `webpack` bundle for production
3) Start production server on `localhost:3005`

------
### Things to Try

After you're up and running, a good way to see the benefits of SSR is to `curl -v localhost:3005/plusDataDeps` or any other route (with the exception of `/` or `/static`). You should see something very similar to the following:

```html
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3005 (#0)
> GET /plusDataDeps HTTP/1.1
> Host: localhost:3005
> User-Agent: curl/7.54.0
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 2208
< Connection: keep-alive
<

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charSet="utf-8">
        <title>RR+RRR v4 Server-Side</title>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css' />
        <link rel="icon" type="image/png" href="https://reacttraining.com/react-router/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="https://reacttraining.com/react-router/favicon-16x16.png" sizes="16x16">
        <link rel="stylesheet" type="text/css" href="/dist/main.css">
      </head>
      <body>
        <div id="root">
          <div><div data-reactroot="" data-reactid="1" data-react-checksum="1391679768"><div class="app-base" data-reactid="2"><h1 data-reactid="3">Base</h1><div class="static-data-view" data-reactid="4"><h1 data-reactid="5">Static Page + External Data</h1><div data-reactid="6"><p data-reactid="7"><!-- react-text: 8 -->foo<!-- /react-text --><!-- react-text: 9 --> -- <!-- /react-text --><!-- react-text: 10 -->bar<!-- /react-text --></p><p data-reactid="11"><!-- react-text: 12 -->baz<!-- /react-text --><!-- react-text: 13 --> -- <!-- /react-text --><!-- react-text: 14 -->qux<!-- /react-text --></p><p data-reactid="15"><!-- react-text: 16 -->quux<!-- /react-text --><!-- react-text: 17 --> -- <!-- /react-text --><!-- react-text: 18 -->corge<!-- /react-text --></p><p data-reactid="19"><!-- react-text: 20 -->uier<!-- /react-text --><!-- react-text: 21 --> -- <!-- /react-text --><!-- react-text: 22 -->grault<!-- /react-text --></p><p data-reactid="23"><!-- react-text: 24 -->garply<!-- /react-text --><!-- react-text: 25 --> -- <!-- /react-text --><!-- react-text: 26 -->waldo<!-- /react-text --></p></div><br data-reactid="27"/><a href="/" data-reactid="28">&lt; Back Home</a></div></div></div></div>
        </div>
        <script>window.INITIAL_STATE = {"apiData":{"foo":"bar","baz":"qux","quux":"corge","uier":"grault","garply":"waldo"},"apiDataWithParams":{},"currentPage":1,"dynamicApiData":{},"router":{"location":{"pathname":"\u002FplusDataDeps","search":"","hash":"","key":"8zz65g"}}};</script>
        <script src="/dist/main.js"></script>
      </body>
    </html>
* Connection #0 to host localhost left intact
```