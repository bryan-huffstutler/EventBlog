import Document, { Html, Head, Main, NextScript } from 'next/document'
//Head is not the same Head as from 'next/head'
//customizes all of the HTML of a page
class MyDocument extends Document {
    render() {
        return (
            <Html lang='en'>
                <Head />
                <body>
                {/* //useful for portals */}
                    <div id="overlays"></div> 
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument