export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <p>Main Layout</p>
      {children}
    </>
  );
}
