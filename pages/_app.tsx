import	React, {ReactElement}				from	'react';
import	Head								from	'next/head';
import	Link								from	'next/link';
import	{AppProps}							from	'next/app';
import	{DefaultSeo}						from	'next-seo';
import	{Header}							from	'@yearn-finance/web-lib/layouts';
import	{WithYearn}							from	'@yearn-finance/web-lib/contexts';
import	{useBalance}						from	'@yearn-finance/web-lib/hooks';
import	LogoYearn							from	'components/icons/LogoYearn';
import	Footer								from	'components/StandardFooter';

import	'../style.css';

function	AppHead(): ReactElement {
	return (
		<>
			<Head>
				<title>{process.env.WEBSITE_NAME}</title>
				<meta httpEquiv={'X-UA-Compatible'} content={'IE=edge'} />
				<meta name={'viewport'} content={'width=device-width, initial-scale=1'} />
				<meta name={'description'} content={process.env.WEBSITE_NAME} />
				<meta name={'msapplication-TileColor'} content={'#000000'} />
				<meta name={'theme-color'} content={'#FF90A1'} />

				<link rel={'shortcut icon'} type={'image/x-icon'} href={'/favicons/favicon.ico'} />
				<link rel={'apple-touch-icon'} sizes={'180x180'} href={'/favicons/apple-touch-icon.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'32x32'} href={'/favicons/favicon-32x32.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'16x16'} href={'/favicons/favicon-16x16.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'192x192'} href={'/favicons/android-chrome-192x192.png'} />
				<link rel={'icon'} type={'image/png'} sizes={'512x512'} href={'/favicons/android-chrome-512x512.png'} />

				<meta name={'robots'} content={'index,nofollow'} />
				<meta name={'googlebot'} content={'index,nofollow'} />
				<meta charSet={'utf-8'} />
			</Head>
			<DefaultSeo
				title={process.env.WEBSITE_NAME}
				defaultTitle={process.env.WEBSITE_NAME}
				description={process.env.WEBSITE_DESCRIPTION}
				openGraph={{
					type: 'website',
					locale: 'en_US',
					url: process.env.WEBSITE_URI,
					site_name: process.env.WEBSITE_NAME,
					title: process.env.WEBSITE_NAME,
					description: process.env.WEBSITE_DESCRIPTION,
					images: [
						{
							url: `${process.env.WEBSITE_URI}og.jpeg`,
							width: 1200,
							height: 675,
							alt: 'Yearn'
						}
					]
				}}
				twitter={{
					handle: '@iearnfinance',
					site: '@iearnfinance',
					cardType: 'summary_large_image'
				}} />
		</>
	);
}

function	AppHeader(): ReactElement {
	const	[shouldDisplayPrice, set_shouldDisplayPrice] = React.useState(true);
	const	{data: YFIBalance} = useBalance({
		for: '0x7a1057e6e9093da9c1d4c1d049609b6889fc4c67',
		token: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e'
	});

	return (
		<Header>
			<div className={'justify-between pr-4 w-full flex-row-center'}>
				<Link href={'/'}>
					<div className={'flex flex-row items-center space-x-4 cursor-pointer'}>
						<LogoYearn />
						<h1>{process.env.WEBSITE_TITLE}</h1>
					</div>
				</Link>
				<div className={'hidden flex-row items-center space-x-6 md:flex'}>
					<div
						className={'cursor-pointer'}
						onClick={(): void => set_shouldDisplayPrice(!shouldDisplayPrice)}>
						{shouldDisplayPrice ? (
							<p className={'text-primary-500'}>
								{`YFI $ ${YFIBalance.normalizedPrice}`}
							</p>
						) : (
							<p className={'text-primary-500'}>
								{`Balance: ${YFIBalance.normalized} YFI`}
							</p>
						)}
					</div>
				</div>
			</div>
		</Header>
	);
}

function	AppWrapper(props: AppProps): ReactElement {
	const	{Component, pageProps, router} = props;

	return (
		<>
			<AppHead />
			<div id={'app'} className={'grid flex-col grid-cols-12 gap-x-4 mx-auto mb-0 max-w-6xl md:flex-row'}>
				<div className={'flex flex-col col-span-12 px-4 w-full min-h-[100vh]'}>
					<AppHeader />
					<Component
						key={router.route}
						router={props.router}
						{...pageProps} />
					<Footer />
				</div>
			</div>
		</>
	);
}

function	MyApp(props: AppProps): ReactElement {
	const	{Component, pageProps} = props;
	
	return (
		<WithYearn
			options={{
				web3: {
					shouldUseWallets: true,
					shouldUseStrictChainMode: false,
					defaultChainID: 1,
					supportedChainID: [1, 250, 42161, 1337, 31337]
				}
			}}>
			<AppWrapper
				Component={Component}
				pageProps={pageProps}
				router={props.router} />
		</WithYearn>
	);
}

export default MyApp;
