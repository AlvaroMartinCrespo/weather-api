export default function Layout({ title, children }) {
  return (
    <>
      <head>
        <title>{title ? title : 'Weather App'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <main className="bg-slate-200 h-screen">{children}</main>
    </>
  );
}
