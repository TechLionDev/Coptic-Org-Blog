const CHead = ({ title }) => {
    return (
        <>
            <title>{title} | Copts.Org Blog</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#ffbb00" />
            <meta name="apple-mobile-web-app-title" content="Copts.Org" />
            <meta name="application-name" content="Copts.Org" />
            <meta name="msapplication-TileColor" content="#ffbb00" />
            <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
            <meta name="theme-color" content="#ffffff" />       
        </>
    );
}

export default CHead;